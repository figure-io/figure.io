
// DATA //

/**
* FUNCTION: Data( data )
*	Data constructor. Creates a new data instance.
*
* @param {array} data - input data is expected to be an array of arrays; e.g., [[[0,0],[1,1],...,[N,N]]] or [[{x:0,y:0},{x:1,y:1},...{x:N,y:N}]]. Elements in the outer array are treated as separate datasets.
* @returns {object} data instance
*/
var Data = function( data ) {

	// INSTANCE ATTRIBUTES //

	this._config = {};
	this._data = data;

	this._xMin = null;
	this._xMax = null;
	this._yMin = null;
	this._yMax = null;
	this._zMin = null;
	this._zMax = null;

	// ACCESSORS:
	this._xValue = function( d ) { return d[ 0 ]; };
	this._yValue = function( d ) { return d[ 1 ]; };
	this._zValue = function( d ) { return d[ 2 ]; };

	return this;

}; // end FUNCTION Data()

/**
* METHOD: format( dim )
*	Format raw data into a form amenable to graph generation.
*
* @param {number} dim - data dimensionality; e.g., if 1-dimensional, say, for a histogram, then dim=1.
* @returns {object} data instance
*/
Data.prototype.format = function( dim ) {

	var data = this._data,
		fcns = [
			this._xValue,
			this._yValue,
			this._zValue
		],
		arr = [];

	if ( !arguments.length ) {
		throw new Error( 'format()::insufficient input arguments. The number of dimensions to format must be provided.' );
	}
	if ( dim < 1 || dim > 3 ) {
		throw new Error( 'format()::invalid input argument. Dimensionality must be an integer on the interval: [1,3].' );
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

	var data = this._data,
		min, max, numEdges = 21, binWidth;

	if ( !accessor ) {
		throw new Error( 'histc()::insufficient input arguments. An data value accessor must be provided.' );
	}

	// Convert data to standard representation; needed for non-deterministic accessors:
	data = d3.range( data.length ).map( function ( id ) {
		return data[ id ].map( function ( d, i ) {
			return accessor.call( data[ id ], d, i );
		});
	});

	if ( !edges.length ) {
		
		min = this.min( data, function ( d ) {
				return d;
			});

		max = this.max( data, function ( d ) {
				return d;
			});

		binWidth = ( max - min ) / ( numEdges - 1 );

		edges = Vector.linspace( min, max+1e-16, binWidth );

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
* @returns {object} data instance
*/
Data.prototype.hist2c = function( xValue, yValue, xEdges, yEdges ) {

	var data = this._data,
		xNumEdges = 101,
		yNumEdges = 101,
		min, max;

	if ( !xValue || !yValue ) {
		throw new Error( 'hist2c()::insufficient input arguments. Both an x-value and y-value accessor must be supplied.' );
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
		
		min = this.min( data, function ( d ) {
				return d[ 0 ];
			});

		max = this.max( data, function ( d ) {
				return d[ 0 ];
			});

		binWidth = ( max - min ) / ( xNumEdges - 1 );

		xEdges = Vector.linspace( min, max+1e-16, binWidth );

	} // end IF (xEdges)

	if ( !yEdges.length ) {
		
		min = this.min( data, function ( d ) {
				return d[ 1 ];
			});

		max = this.max( data, function ( d ) {
				return d[ 1 ];
			});

		binWidth = ( max - min ) / ( yNumEdges - 1 );

		yEdges = Vector.linspace( min, max+1e-16, binWidth );

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
* @returns {function} x-value accessor
*/
Data.prototype.x = function( fcn ) {
	var self = this,
		rules = 'function';

	if ( !arguments.length ) {
		return this._xValue;
	}
	
	Validator( fcn, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'x()::invalid input argument.' );
		}
		self._xValue = fcn;
	});

	return this;

}; // end METHOD x()

/**
* METHOD: y( fcn )
*	y-value accessor setter and getter. If a function is supplied, sets the y-value accessor. If no function is supplied, returns the y-value accessor.
*
* @param {function} fcn - y-value accessor
* @returns {function} y-value accessor
*/
Data.prototype.y = function( fcn ) {
	var self = this,
		rules = 'function';

	if ( !arguments.length ) {
		return this._yValue;
	}
	
	Validator( fcn, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'y()::invalid input argument.' );
		}
		self._yValue = fcn;
	});

	return this;

}; // end METHOD y()

/**
* METHOD: z( fcn )
*	z-value accessor setter and getter. If a function is supplied, sets the z-value accessor. If no function is supplied, returns the z-value accessor.
*
* @param {function} fcn - z-value accessor
* @returns {function} z-value accessor
*/
Data.prototype.z = function( fcn ) {
	var self = this,
		rules = 'function';

	if ( !arguments.length ) {
		return this._zValue;
	}
	
	Validator( fcn, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'z()::invalid input argument.' );
		}
		self._zValue = fcn;
	});

	return this;

}; // end METHOD z()

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


