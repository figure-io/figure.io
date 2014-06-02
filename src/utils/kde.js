

// KDE //

/**
* FUNCTION: KDE()
*	KDE constructor. Creates a new KDE instance.
*
* @constructor
* @returns {object} KDE instance
*/
function KDE() {

	this._kernel = pdf.normal( 0, 1 ); // standard normal
	this._config = {
		'domain': {
			'min': 0,
			'max': 1,
			'pts': Math.pow( 2, 14 ) // 2^14
		},
		'bandwidth': [ 1.06 ] // Silverman's Rule of Thumb (n=1,sigma=1)
	};

	// ACCESSORS //
	this._xValue = function ( d ) {
		return d;
	};

	return this;
} // end FUNCTION KDE()

/**
* METHOD: kernel( fcn )
*	KDE kernel setter and getter. If a kernel is provided, sets the instance kernel. If no kernel is provided, returns the instance kernel.
*
* @param {function} fcn - probability density function serving as the KDE kernel
* @returns {object|function} instance object or instance kernel
*/
KDE.prototype.kernel = function( fcn ) {
	var self = this,
		rules = 'function';

	if ( !arguments.length ) {
		return this._kernel;
	}
	
	Validator( fcn, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'kernel()::invalid input argument.' );
		}
		self._kernel = fcn;
	});

	return this;
}; // end METHOD kernel()

/**
* METHOD: bandwidth( arr )
*	KDE bandwidth setter and getter. If a value is provided, sets the instance bandwidth. If no value is provided, returns the instance bandwidth.
*
* @param {array} arr - desired instance bandwidth provided as an array; if arr is length 1, then same bandwidth is used across datasets. If arr length > 1, each element is used as the bandwidth for its corresponding dataset
* @returns {object|array} instance object or instance bandwidth
*/
KDE.prototype.bandwidth = function( arr ) {
	var self = this,
		rules = 'array';

	if ( !arguments.length ) {
		return this._config.bandwidth;
	}
	
	Validator( arr, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'bandwidth()::invalid input argument.' );
		}
		self._config.bandwidth = arr;
	});

	return this;
}; // end METHOD bandwidth()

/**
* METHOD: estimator( data, method )
*	Computes bandwidth estimates from input data. NOTE: the estimates will override the current bandwidth value.
*
* @param {array} data - array of arrays where each nested array is a dataset over which to calculate a bandwidth estimator
* @param {string} method - estimator method; methods include: Silverman.
* @returns {object} instance object
*/
KDE.prototype.estimator = function( data, method ) {
	var xValue = this._xValue,
		methods = {
			'silverman': kde_estimator_silverman
		};

	if ( arguments.length !== 2 ) {
		throw new Error( 'estimator()::incorrect number of input arguments. Provide data and an estimator method.' );
	}

	method = method.toLowerCase();

	if ( !methods.hasOwnProperty( method ) ) {
		throw new Error( 'estimator()::unrecognized estimator method: ' + method );
	}

	// Extract the data:
	data = data.map( function ( dataset ) {
		return dataset.map( function ( d ) {
			return xValue( d );
		});
	});

	this._config.bandwidth = data.map( function ( dataset ) {
		return methods[ method ]( dataset );
	});

	return this;
}; // end METHOD estimator()

/**
* FUNCTION: kde_estimator_silverman( vector )
*	Use's Silverman's rule of thumb to derive an empirical estimate for an optimal KDE bandwidth selection.
* Source:
*	Silverman, B.W. (1998). Density Estimation for Statistics and Data Analysis. London: Chapman & Hall/CRC. p. 48. ISBN 0-412-24620-1.
*
* @param {array} vector - 1d array over which to compute the estimate
* @returns {number} bandwidth estimate
*/
function kde_estimator_silverman( vector ) {
	var stdev, N = vector.length, A;

	// [0] Calculate the sample standard deviation:
	stdev = Vector.stdev( vector );

	// [1] Calculate the estimator:
	A = Math.pow( ( 4/(3*N) ), 0.2 );
	return A * stdev;
} // end FUNCTION kde_estimator_silverman

/**
* METHOD: x( fcn )
*	x-value accessor setter and getter. If a function is supplied, sets the x-value accessor. If no function is supplied, returns the x-value accessor.
*
* @param {function} fcn - x-value accessor
* @returns {object|function} instance object or x-value accessor
*/
KDE.prototype.x = function( fcn ) {
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
* METHOD: min( value )
*	Domain min setter and getter. If a value is supplied, defines the instance domain min. If no value is supplied, returns the instance domain min.
*
* @param {number} min - desired instance domain min.
* @returns {object|number} instance object or instance domain min.
*/
KDE.prototype.min = function( value ) {
	var domain = this._config.domain,
		rules = 'number';

	if ( !arguments.length ) {
		return domain.min;
	}

	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'min()::invalid input argument. ' );
		}
		domain.min = value;
	});
	
	return this;
}; // end METHOD min()

/**
* METHOD: max( value )
*	Domain max setter and getter. If a value is supplied, defines the instance domain max. If no value is supplied, returns the instance domain max.
*
* @param {number} max - desired instance domain max.
* @returns {object|number} instance object or instance domain max.
*/
KDE.prototype.max = function( value ) {
	var domain = this._config.domain,
		rules = 'number';

	if ( !arguments.length ) {
		return domain.max;
	}

	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'max()::invalid input argument. ' );
		}
		domain.max = value;
	});
	
	return this;
}; // end METHOD max()

/**
* METHOD: domain( arr )
*	Domain setter and getter. If an array is supplied, sets the instance domain. If no argument is supplied, gets the instance domain.
*
* @param {array} arr - 2-element array defining the domain
* @returns {object|array} instance object or domain
*/
KDE.prototype.domain = function( arr ) {
	var self = this,
		domain = this._config.domain,
		rules = 'array';

	if ( !arguments.length ) {
		return [ domain.min, domain.max ];
	}

	Validator( arr, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'domain()::invalid input argument. ' );
		}
		domain.min = arr[ 0 ];
		domain.max = arr[ 1 ];
	});
	
	return this;
}; // end METHOD domain()

/**
* METHOD: points( value )
*	Number of points along the KDE domain setter and getter. If a value is supplied, defines the number of points on the instance domain. If no value is supplied, returns the number of points on the instance domain. Note: the number of points should be a power of 2. If not a power of 2, pts = 2^ceil(log2(pts)).
*
* @param {number} value - desired number of points on the KDE domain.
* @returns {object|number} instance object or number of points.
*/
KDE.prototype.points = function( value ) {
	var domain = this._config.domain,
		rules = 'number',
		power;

	if ( !arguments.length ) {
		return domain.pts;
	}

	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'pts()::invalid input argument. ' );
		}
		power = Math.ceil( Math.log( value ) / Math.log( 2 ) );
		domain.pts = Math.pow( 2, power );
	});
	
	return this;
}; // end METHOD points()

// TODO: use dfft to speed KDE calculation.

/**
* METHOD: eval( data )
*	Computes the kernel density estimate.
*
* @param {array} data - array of arrays where each nested array is a dataset over which to calculate a KDE
* @returns {array} array of arrays where each nested array is the KDE for a dataset. Note: the output datasets are NOT guaranteed to be the same length as the input datasets. Density length depends on the number of mesh points over which the density is evaluated.
*/
KDE.prototype.eval = function( data ) {
	var kde = [], density = [], val,
		x = this._xValue,
		pdf = this._kernel,
		bw = this._config.bandwidth,
		N = this._config.domain.pts,
		min = this._config.domain.min,
		max = this._config.domain.max,
		edges, interval;

	// Create a sampling vector:
	interval = (max-min) / (N-1);
	edges = Vector.linspace( min, max, interval );

	// Check if the number of bandwidths matches the data length:
	if ( data.length !== bw.length ) {
		for ( var b = 0; b < data.length; b++ ) {
			bw.push( bw[ 0 ] );
		}
	}

	for ( var i = 0; i < data.length; i++ ) {

		// Reset the density for the new dataset:
		density = new Array( N );

		// Compute a density estimate:
		for ( var n = 0; n < N; n++ ) {

			// Initialize the density to zero for this interval point:
			density[ n ] = [ edges[n], 0 ];

			// Given a sampling vector, build the density by evaluating the PDF for each datum and summing:
			for ( var j = 0; j < data[ i ].length; j++ ) {
				val = ( x( data[i][j] ) - edges[n] ) / bw[ i ];
				density[ n ][ 1 ] += pdf( val );
			}
			density[ n ][ 1 ] /= ( bw[ i ] * N );

		} // end FOR j

		// Push the dataset density into our KDE array:
		kde.push( density );

	} // end FOR i

	return kde;
}; // end METHOD eval()

/**
* METHOD: config()
*	Returns the KDE configuration as a JSON blob.
* 
* @returns {object} configuration blob
*/
KDE.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()

