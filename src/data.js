/**
*
*	FIGURE: data
*
*
*
*	DESCRIPTION:
*		- 
*
*
*	API:
*		- 
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	HISTORY:
*		- 2014/04/13: Created. [AReines].
*
*
*	DEPENDENCIES:
*		[1] validate.js
*		[2] histc.js
*		[3] hist2c.js
*
*
*	LICENSE:
*		MIT. http://opensource.org/licenses/MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. athan@nodeprime.com. 2014
*
*
*/


// DATA //

/**
* FUNCTION: Data( data )
*	Data constructor. Creates a new data instance.
*
* @param {array} data - input data is expected to be an array of arrays; e.g., [[[0,0],[1,1],...,[N,N]]] or [[{x:0,y:0},{x:1,y:1},...{x:N,y:N}]]. Elements in the outer array are treated as separate datasets.
*
*/
var Data = function( data ) {

	// INSTANCE ATTRIBUTES //

	this._config = {};
	this._data = data;

	// ACCESSORS:
	this._xValue = function( d ) { return d[ 0 ]; };
	this._yValue = function( d ) { return d[ 1 ]; };
	this._zValue = function( d ) { return d[ 2 ]; };

	return this;

}; // end FUNCTION Data()

/**
* METHOD: transform( dim )
*	Transform raw data into a format amenable to graph generation.
*
* @param {number} dim - data dimensionality; e.g., if 1-dimensional, say, for a histogram, then dim=1.
*/
Data.prototype.transform = function( dim ) {

	var data = this._data,
		fcns = [
			this._xValue,
			this._yValue,
			this._zValue
		],
		arr = [];

	if ( !arguments.length ) {
		throw new Error( 'insufficient input arguments. The number of dimensions to transform must be provided.' );
	}
	if ( dim < 1 || dim > 3 ) {
		throw new Error( 'invalid input argument. Dimensionality must be an integer on the interval: [1,3].' );
	}
	data = d3.range( data.length ).map( function ( id ) {
		return data[ id ].map( function ( d, i ) {
			arr = [];
			for ( var n = 0; n < dim; n++ ) {
				arr.push( fcns[ n ].call( data[ id ], d, i ) );
			}
			return arr;
		});
	});

	this._data = data;

	return this;

}; // end METHOD transform()

/**
* METHOD: linspace( min, max, increment )
*	Generate a linearly spaced vector.
*
* @param {number} min - min defines the vector lower bound
* @param {number} max - max defines the vector upper bound
* @param {number} increment - distance between successive vector elements
*
* @returns {array} a 1-dimensional array
*/
Data.prototype.linspace = function ( min, max, increment ) {
	var numElements, vec = [];

	numElements = Math.round( ( ( max - min ) / increment ) ) + 1;

	vec[ 0 ] = min;
	vec[ numElements - 1] = max;

	for ( var i = 1; i < numElements - 1; i++ ) {
		vec[ i ] = min + increment*i;
	}

	return vec;
}; // end METHOD linspace()

/**
* METHOD: histc( accessor, edges )
*	Generates a counts vector where a count represents the number of data points falling in a bin defined by a pair of edges in the edge vector.
*
* @param {function} accessor - data accessor specifying the data to bin
* @param {array} edges - (optional) 1d vector of edges defining bins; if not provided, a default edge vector is created of 21 bins where the start and end edge are defined by the data.
*
*/
Data.prototype.histc = function( accessor, edges ) {

	var data = this._data,
		min, max, numEdges = 21, binWidth;

	if ( !accessor ) {
		throw new Error( 'insufficient input arguments. An data value accessor must be provided.' );
	}

	// Convert data to standard representation; needed for non-deterministic accessors:
	data = d3.range( data.length ).map( function ( id ) {
		return data[ id ].map( function ( d, i ) {
			return accessor.call( data[ id ], d, i );
		});
	});

	if ( !edges.length ) {
		
		min = d3.min( data, function ( dataset ) {
			return d3.min( dataset, function ( d ) {
				return d;
			});
		});

		max = d3.max( data, function ( dataset ) {
			return d3.max( dataset, function ( d ) {
				return d;
			});
		});

		binWidth = ( max - min ) / ( numEdges - 1 );

		edges = this.linspace( min, max+1e-16, binWidth );

	} // end IF (edges)

	// Histogram the data:
	data = d3.range( data.length ).map( function ( id ) {

		var counts;

		counts = histc( data[ id ], edges );

		// Augment counts to include the edge and binWidth (binWidth is needed in the event of variable bin width ):
		counts = counts.map( function ( d, i ) {
			return [
				edges[ i-1 ],
				counts[ i ],
				edges[ i ]
			];
		});

		// Drop the first and last bins as these include values which exceeded the lower and upper bounds:
		return counts.slice( 1, counts.length-1 );

	});

	this._data = data;

	return this;

}; // end METHOD histc()

/**
* METHOD: hist2c( xValue, yValue, xEdges, yEdges )
*	Generates a counts array where a count represents the number of data points falling in a pixel defined by a pair of x-edges and a pair of y-edges.
*
* @param {function} xValue - data accessor specifying the data to bin along the first dimension
* @param {function} yValue - data accessor specifying the data to bin along the second dimension
* @param {array} xEdges - (optional) 1d vector of edges defining bins along the first dimesion; if not provided, a default edge vector is created of 100 bins where the start and end edge are defined by the data.
* @param {array} yEdges - (optional) 1d vector of edges defining bins along the second dimesion; if not provided, a default edge vector is created of 100 bins where the start and end edge are defined by the data.
*
*/
Data.prototype.hist2c = function( xValue, yValue, xEdges, yEdges ) {

	var data = this._data,
		xNumEdges = 101,
		yNumEdges = 101,
		min, max;

	if ( !xValue || !yValue ) {
		throw new Error( 'insufficient input arguments. Both an x-value and y-value accessor must be supplied.' );
	}

	// Convert data to standard representation; needed for non-deterministic accessors:
	data = d3.range( data.length ).map( function ( id ) {
		return data[ id ].map( function ( d, i ) {
			return [
				xValue.call( data[ id ], d, i ),
				yValue.call( data[ id ], d, i )
			];
		});
	});

	if ( !xEdges.length ) {
		
		min = d3.min( data, function ( dataset ) {
			return d3.min( dataset, function ( d ) {
				return d[ 0 ];
			});
		});

		max = d3.max( data, function ( dataset ) {
			return d3.max( dataset, function ( d ) {
				return d[ 0 ];
			});
		});

		binWidth = ( max - min ) / ( xNumEdges - 1 );

		xEdges = this.linspace( min, max+1e-16, binWidth );

	} // end IF (xEdges)

	if ( !yEdges.length ) {
		
		min = d3.min( data, function ( dataset ) {
			return d3.min( dataset, function ( d ) {
				return d[ 1 ];
			});
		});

		max = d3.max( data, function ( dataset ) {
			return d3.max( dataset, function ( d ) {
				return d[ 1 ];
			});
		});

		binWidth = ( max - min ) / ( yNumEdges - 1 );

		yEdges = this.linspace( min, max+1e-16, binWidth );

	} // end IF (yEdges)

	// Histogram the data:
	data = hist2c( data, xEdges, yEdges );

	// Drop the first and last bins as these include values which exceeded the lower and upper bounds:
	data = data.map( function ( d, i ) {
		return data[ i ].slice( 1, data[ i ].length - 1 );
	});

	this._data = data.slice( 1, data.length-1 );

	return this;

}; // end METHOD hist2c()

/**
* METHOD: data()
*	Retrieve instance data.
*
* @returns {array} an array of arrays. 
*/
Data.prototype.data = function() {
	return this._data;
}; // end METHOD data()

/**
* METHOD: x( fcn )
*	x-value accessor setter and getter. If a function is supplied, sets the x-value accessor. If no function is supplied, returns the x-value accessor.
*
* @param {function} fcn - x-value accessor
* 
* @returns {function} x-value accessor
*/
Data.prototype.x = function( fcn ) {
	var self = this,
		rules = 'function';

	if ( !arguments.length ) {
		return this._xValue;
	}
	
	Validator( fcn, rules, set );

	return this;

	function set( errors ) {
		if ( errors ) {
			console.error( errors );
			return;
		}
		self._xValue = fcn;
	}
};

/**
* METHOD: y( fcn )
*	y-value accessor setter and getter. If a function is supplied, sets the y-value accessor. If no function is supplied, returns the y-value accessor.
*
* @param {function} fcn - y-value accessor
* 
* @returns {function} y-value accessor
*/
Data.prototype.y = function( fcn ) {
	var self = this,
		rules = 'function';

	if ( !arguments.length ) {
		return this._yValue;
	}
	
	Validator( fcn, rules, set );

	return this;

	function set( errors ) {
		if ( errors ) {
			console.error( errors );
			return;
		}
		self._yValue = fcn;
	}
};

/**
* METHOD: z( fcn )
*	z-value accessor setter and getter. If a function is supplied, sets the z-value accessor. If no function is supplied, returns the z-value accessor.
*
* @param {function} fcn - z-value accessor
* 
* @returns {function} z-value accessor
*/
Data.prototype.z = function( fcn ) {
	var self = this,
		rules = 'function';

	if ( !arguments.length ) {
		return this._zValue;
	}
	
	Validator( fcn, rules, set );

	return this;

	function set( errors ) {
		if ( errors ) {
			console.error( errors );
			return;
		}
		self._zValue = fcn;
	}
};

/**
* METHOD: config()
*	Returns the data configuration as a JSON blob.
*/
Data.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()


