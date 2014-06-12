
// DATA //

/**
* FUNCTION: Data( data )
*	Data constructor. Creates a new data instance.
*
* @constructor
* @param {array} data - input data is expected to be an array of arrays; e.g., [[[0,0],[1,1],...,[N,N]]] or [[{x:0,y:0},{x:1,y:1},...{x:N,y:N}]]. Elements in the outer array are treated as separate datasets.
* @returns {object} data instance
*/
function Data( data ) {

	// INSTANCE ATTRIBUTES //

	this._config = {};
	this._data = data;

	// ACCESSORS //

	// Opinionated defaults...
	this._accessors = {
		x: function( d ) {
			return d[ 0 ];
		},
		y: function( d ) {
			return d[ 1 ];
		},
		z: function( d ) {
			return d[ 2 ];
		}
	};

	return this;
} // end FUNCTION Data()

/**
* METHOD: format( keys )
*	Format raw data into a form amenable to graph generation.
*
* @param {array} keys - accessor keys defining dimensionality; .e.g, ['y' ] formats the data as a one dimensional array using the 'y' accessor. [ 'x', 'y', 'z' ] formats the data as a three dimensional array using the 'x', 'y', 'z' accessors.
* @returns {object} data instance
*/
Data.prototype.format = function( keys ) {
	var data = this._data,
		accessors = this._accessors,
		names = Object.keys( accessors ),
		arr = [];

	if ( !arguments.length ) {
		throw new Error( 'format()::insufficient input arguments. The number of dimensions to format must be provided.' );
	}
	if ( keys.length > names.length ) {
		throw new Error( 'format()::invalid input argument. Requested dimensionality is greater than total accessors. Accessors: ' + JSON.stringify( names ) + '; Dim: ' + keys.length + '.' );
	}
	for ( var i = 0; i < keys.length; i++ ) {
		if ( !accessors.hasOwnProperty( keys[ i ] ) ) {
			throw new Error( 'format()::invalid input argument. Accessor name not found: ' + keys[ i ] + '. Available accessors: ' + JSON.stringify( names ) + '.' );
		}
	}
	data = d3.range( data.length ).map( function ( id ) {
		return data[ id ].map( function ( d, i ) {
			arr = [];
			for ( var n = 0; n < keys.length; n++ ) {
				arr.push( accessors[ keys[ n ] ].call( data[ id ], d, i ) );
			}
			return arr;
		});
	});

	this._data = data;

	return this;
}; // end METHOD format()

/**
* METHOD: min( accessor )
*	Determines the min data value.
*
* @param {function} accessor - data accessor specifying how to access data values
* @returns {number} min data value
*/
Data.prototype.min = function( accessor ) {
	return d3.min( this._data, function ( dataset ) {
		return d3.min( dataset, function ( d ) {
			return accessor( d );
		});
	});
}; // end METHOD min()

/**
* METHOD: max( accessor )
*	Determines the max data value.
*
* @param {function} accessor - data accessor specifying how to access data values
* @returns {number} max data value
*/
Data.prototype.max = function( accessor ) {
	return d3.max( this._data, function ( dataset ) {
		return d3.max( dataset, function ( d ) {
			return accessor( d );
		});
	});
}; // end METHOD max()

/**
* METHOD: mean( accessor )
*	Calculates the mean values for an array of arrays.
*
* @param {function} accessor - data accessor specifying how to access data values
* @returns {array} 1d array of mean values
*/
Data.prototype.mean = function( accessor ) {
	var d = this._data.map( function ( dataset ) {
		return dataset.map( function ( d ) {
			return accessor( d );
		});
	});
	return d.map( function ( dataset ) {
		return Vector.mean( dataset );
	});
}; // end METHOD mean()

/**
* METHOD: variance( accessor )
*	Calculates sample variance values for an array of arrays.
*
* @param {function} accessor - data accessor specifying how to access data values
* @returns {array} 1d array of variance values
*/
Data.prototype.variance = function( accessor ) {
	var d = this._data.map( function ( dataset ) {
		return dataset.map( function ( d ) {
			return accessor( d );
		});
	});
	return d.map( function ( dataset ) {
		return Vector.variance( dataset );
	});
}; // end METHOD variance()

/**
* METHOD: stdev( accessor )
*	Calculates sample standard deviation values for an array of arrays.
*
* @param {function} accessor - data accessor specifying how to access data values
* @returns {array} 1d array of standard deviation values
*/
Data.prototype.stdev = function( accessor ) {
	var d = this._data.map( function ( dataset ) {
		return dataset.map( function ( d ) {
			return accessor( d );
		});
	});
	return d.map( function ( dataset ) {
		return Vector.stdev( dataset );
	});
}; // end METHOD stdev()

/**
* METHOD: median( accessor )
*	Calculates the median values for an array of arrays.
*
* @param {function} accessor - data accessor specifying how to access data values
* @returns {array} 1d array of median values
*/
Data.prototype.median = function( accessor ) {
	var d = this._data.map( function ( dataset ) {
		return dataset.map( function ( d ) {
			return accessor( d );
		});
	});
	return d.map( function ( dataset ) {
		return Vector.median( dataset );
	});
}; // end METHOD median()

/**
* METHOD: sum( accessor )
*	Calculates sums for an array of arrays.
*
* @param {function} accessor - data accessor specifying how to access data values
* @returns {array} 1d array of sums
*/
Data.prototype.sum = function( accessor ) {
	var d = this._data.map( function ( dataset ) {
		return dataset.map( function ( d ) {
			return accessor( d );
		});
	});
	return d.map( function ( dataset ) {
		return Vector.sum( dataset );
	});
}; // end METHOD sum()

/**
* METHOD: reorder( vector )
*	Reorders the data based on an index vector.
*
* @param {array} vector - 1d array of indices
* @returns {object} instance object
*/
Data.prototype.reorder = function( vector ) {
	var self = this;
	if ( this._data.length !== vector.length ) {
		throw new Error( 'reorder()::invalid input argument. Vector length must equal data length.' );
	}
	this._data = vector.map( function ( id ) {
		return self._data[ id ];
	});
	return this;
}; // end METHOD reorder()

/**
* METHOD: extract( accessor )
*	Reduce data dimensionality by extracting data feature(s).
*
* @param {function} accessor - data accessor specifying how to access data values
* @returns {object} instance object
*/
Data.prototype.extract = function( accessor ) {
	this._data = this._data.map( function ( dataset ) {
		return dataset.map( function ( d ) {
			return accessor( d );
		});
	});
	return this;
}; // end METHOD extract()

/**
* METHOD: concat()
*	Concats each dataset in a multidimensional dataset array into a single dataset array.
*/
Data.prototype.concat = function() {
	var data = [[]], numData = this._data.length;
	for ( var i = 0; i < numData; i++ ) {
		for ( var j = 0; j < this._data[ i ].length; j++ ) {
			data[ 0 ].push( this._data[ i ][ j ] );
		}
	}
	this._data = data;
	return this;
}; // end METHOD concat()

/**
* METHOD: amean( accessor )
*	Aggregate mean across datasets. The resulting dataset is an array comprising a single vector who length is equal to the length of the first original dataset. NOTE: we assume that the data is a homogeneous data array.
*
* @param {function} accessor - accessor function used to extract the data to be aggregated
* @returns {object} instance object
*/
Data.prototype.amean = function( accessor ) {
	var data = this._data, d = [[]], sum = 0,
		numData = data.length,
		numDatum = data[ 0 ].length;

	for ( var j = 0; j < numDatum; j++ ) {
		sum = 0;
		for ( var i = 0; i < numData; i++ ) {
			sum += accessor( data[ i ][ j ] );
		}
		d[ 0 ].push( sum / numDatum );
	}
	this._data = d;
	return this;
}; // end METHOD amean()

/**
* METHOD: asum( accessor )
*	Aggregate sum across datasets. The resulting dataset is an array comprising a single vector who length is equal to the length of the first original dataset. NOTE: we assume that the data is a homogeneous data array.
*
* @param {function} accessor - accessor function used to extract the data to be aggregated
* @returns {object} instance object
*/
Data.prototype.asum = function( accessor ) {
	var data = this._data, d = [[]], sum = 0,
		numData = data.length,
		numDatum = data[ 0 ].length;

	for ( var j = 0; j < numDatum; j++ ) {
		sum = 0;
		for ( var i = 0; i < numData; i++ ) {
			sum += accessor( data[ i ][ j ] );
		}
		d[ 0 ].push( sum );
	}
	this._data = d;
	return this;
}; // end METHOD asum()

/**
* METHOD: amin( accessor )
*	Aggregate min across datasets. The resulting dataset is an array comprising a single vector who length is equal to the length of the first original dataset. NOTE: we assume that the data is a homogeneous data array.
*
* @param {function} accessor - accessor function used to extract the data to be aggregated
* @returns {object} instance object
*/
Data.prototype.amin = function( accessor ) {
	var data = this._data, d = [[]], val, min = Number.POSITIVE_INFINITY,
		numData = data.length,
		numDatum = data[ 0 ].length;

	for ( var j = 0; j < numDatum; j++ ) {
		min = Number.POSITIVE_INFINITY;
		for ( var i = 0; i < numData; i++ ) {
			val = accessor( data[ i ][ j ] );
			if ( val < min ) {
				min = val;
			}
		}
		d[ 0 ].push( min );
	}
	this._data = d;
	return this;
}; // end METHOD amin()

/**
* METHOD: amax( accessor )
*	Aggregate max across datasets. The resulting dataset is an array comprising a single vector who length is equal to the length of the first original dataset. NOTE: we assume that the data is a homogeneous data array.
*
* @param {function} accessor - accessor function used to extract the data to be aggregated
* @returns {object} instance object
*/
Data.prototype.amax = function( accessor ) {
	var data = this._data, d = [[]], val, max = Number.NEGATIVE_INFINITY,
		numData = data.length,
		numDatum = data[ 0 ].length;

	for ( var j = 0; j < numDatum; j++ ) {
		max = Number.NEGATIVE_INFINITY;
		for ( var i = 0; i < numData; i++ ) {
			val = accessor( data[ i ][ j ] );
			if ( val > max ) {
				max = val;
			}
		}
		d[ 0 ].push( max );
	}
	this._data = d;
	return this;
}; // end METHOD amax()

/**
* METHOD: size()
*	Determine instance data size. (NOTE: we assume homogenous 2d data array)
*
* @returns {array} data size: [1d,2d]
*/
Data.prototype.size = function() {
	var size = [];
	size.push( this._data.length );
	size.push( this._data[ 0 ].length );
	return size;
}; // end METHOD size()

/**
* METHOD: histc( accessor, edges )
*	Generates a counts vector where a count represents the number of data points falling in a bin defined by a pair of edges in the edge vector.
*
* @param {function} accessor - data accessor specifying the data to bin
* @param {array} edges - (optional) 1d vector of edges defining bins; if not provided, a default edge vector is created of 21 bins where the start and end edge are defined by the data.
* @returns {object} data instance
*/
Data.prototype.histc = function( accessor, edges ) {
	var self = this,
		min, max, numEdges = 21, binWidth;

	if ( !accessor ) {
		throw new Error( 'histc()::insufficient input arguments. An data value accessor must be provided.' );
	}

	// Convert data to standard representation; needed for non-deterministic accessors:
	this._data = d3.range( this._data.length ).map( function ( id ) {
		return self._data[ id ].map( function ( d, i ) {
			return accessor.call( self._data[ id ], d, i );
		});
	});

	if ( !edges.length ) {
		
		min = this.min( function ( d ) {
				return d;
			});

		max = this.max( function ( d ) {
				return d;
			});

		binWidth = ( max - min ) / ( numEdges - 1 );

		edges = Vector.linspace( min, max+1e-16, binWidth );

	} // end IF (edges)

	// Histogram the data:
	this._data = d3.range( this._data.length ).map( function ( id ) {

		var counts;

		counts = histc( self._data[ id ], edges );

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
* @returns {object} data instance
*/
Data.prototype.hist2c = function( xValue, yValue, xEdges, yEdges ) {

	var self = this,
		xNumEdges = 101,
		yNumEdges = 101,
		min, max;

	if ( !xValue || !yValue ) {
		throw new Error( 'hist2c()::insufficient input arguments. Both an x-value and y-value accessor must be supplied.' );
	}

	// Convert data to standard representation; needed for non-deterministic accessors:
	this._data = d3.range( this._data.length ).map( function ( id ) {
		return self._data[ id ].map( function ( d, i ) {
			return [
				xValue.call( self._data[ id ], d, i ),
				yValue.call( self._data[ id ], d, i )
			];
		});
	});

	if ( !xEdges.length ) {
		
		min = this.min( function ( d ) {
				return d[ 0 ];
			});

		max = this.max( function ( d ) {
				return d[ 0 ];
			});

		binWidth = ( max - min ) / ( xNumEdges - 1 );

		xEdges = Vector.linspace( min, max+1e-16, binWidth );

	} // end IF (xEdges)

	if ( !yEdges.length ) {
		
		min = this.min( function ( d ) {
				return d[ 1 ];
			});

		max = this.max( function ( d ) {
				return d[ 1 ];
			});

		binWidth = ( max - min ) / ( yNumEdges - 1 );

		yEdges = Vector.linspace( min, max+1e-16, binWidth );

	} // end IF (yEdges)

	// Histogram the data:
	this._data = hist2c( this._data, xEdges, yEdges );

	// Drop the first and last bins as these include values which exceeded the lower and upper bounds:
	this._data = this._data.map( function ( d, i ) {
		return self._data[ i ].slice( 1, self._data[ i ].length - 1 );
	});

	this._data = this._data.slice( 1, this._data.length-1 );

	return this;
}; // end METHOD hist2c()

// TODO: permit other kernels; ability to specify number of points; ability to specify estimator.

/**
* METHOD: kde( accessor )
*	Calculates the kernel density estimate for each dataset.
*
* @param {function} accessor - data accessor specifying the data over which to calculate the KDE
* @param {number} min - value defining the lower bound for the interval over which to calculate the KDE
* @param {number} max - value defining the upper bound for the interval over which to calculate the KDE
*/
Data.prototype.kde = function( accessor, min, max ) {
	var data = this._data,
		kde = new KDE();

	// Configure the KDE generator:
	kde.kernel( pdf.normal( 0, 1 ) )
		.x( accessor )
		.min( min )
		.max( max )
		.points( Math.pow( 2, 10 ) );

	// Calculate the bandwidth estimator and evaluate the density:
	this._data = kde.estimator( data, 'silverman' )
		.eval( data );

	return this;
}; // end METHOD kde()

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
* METHOD: accessors( name, fcn )
*	Value accessor setter and getter. If an accessor name and function are supplied, sets the value accessor. If no function is supplied, returns the value accessor. If neither a name or function are supplied, returns all accessors.
*
* @param {string} name - accessor name
* @param {function} fcn - value accessor
* @returns {object|function|object} instance object, value accessor, or accessors
*/
Data.prototype.accessors = function( name, fcn ) {
	var self = this,
		names = Object.keys( this._accessors ),
		accessors = {},
		rules = ['string', 'function'];

	if ( !arguments.length ) {
		for ( var i = 0; i < names.length; i++ ) {
			accessors[ names[ i ] ] = this._accessors[ names[ i ] ];
		}
		return accessors;
	}
	if ( arguments.length === 1 ) {
		return this._accessors[ name ];
	}
	Validator( name, rules[ 0 ], function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'accessors()::invalid input argument. First argument is not a string.' );
		}
		Validator( fcn, rules[ 1 ], function set( errors ) {
			if ( errors ) {
				console.error( errors );
				throw new Error( 'accessors()::invalid input argument. Second argument is not a function.' );
			}
			self._accessors[ name ] = fcn;
		});
	});

	return this;
}; // end METHOD accessors()

/**
* METHOD: config()
*	Returns the data configuration as a JSON blob.
* 
* @returns {object} configuration blob
*/
Data.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()


