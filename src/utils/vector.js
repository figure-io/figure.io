

// VECTOR //

/**
* @namespace Vector
*/
var Vector = {
		'version': '0.0.0' // semvar
	};

/**
* METHOD: mean( vector )
*	Calculates the mean value of an input vector.
*
* @param {array} vector - 1d array of numeric values
* @returns {number} mean value
*/
Vector.mean = function( vector ) {
	var sum = 0;
	for ( var i = 0; i < vector.length; i++ ) {
		sum += vector[ i ];
	}
	return sum / vector.length;
}; // end METHOD mean()

/**
* METHOD: variance( vector )
*	Calculates the sample variance of an input vector.
*
* @param {array} vector - 1d array of numeric values
* @returns {number} variance
*/
Vector.variance = function( vector ) {
	var sum = 0, sum_of_squares = 0,
		value1, value2,
		N = vector.length;
	for ( var i = 0; i < N; i++ ) {
		sum += vector[ i ];
		sum_of_squares += vector[ i ]*vector[ i ];
	}
	value1 = sum_of_squares / ( N-1 );
	value2 = sum*sum / ( N*(N-1) );
	return value1 - value2;
}; // end METHOD variance()

/**
* METHOD: stdev( vector )
*	Calculates the sample standard deviation of an input vector.
*
* @param {array} vector - 1d array of numeric values
* @returns {number} standard deviation
*/
Vector.stdev = function( vector ) {
	var sum = 0, sum_of_squares = 0,
		value1, value2,
		N = vector.length;
	for ( var i = 0; i < N; i++ ) {
		sum += vector[ i ];
		sum_of_squares += vector[ i ]*vector[ i ];
	}
	value1 = sum_of_squares / ( N-1 );
	value2 = sum*sum / ( N*(N-1) );
	return Math.sqrt( value1 - value2 );
}; // end METHOD stdev()

/**
* METHOD: median( vector )
*	Calculates the median value of an input vector.
*
* @param {array} vector - 1d array of numeric values
* @returns {number} median value
*/
Vector.median = function( vector ) {
	var id, vec;

	// Create a copy of the input vector:
	vec = vector.slice();

	// Sort the input vector:
	vec.sort( function ( a, b ) {
		return a - b;
	});

	// Get the middle index:
	id = Math.floor( vec.length / 2 );

	if ( vec.length % 2 ) {
		// The number of elements is not evenly divisible by two, hence we have a middle index:
		return vec[ id ];
	}

	// Even number of elements, so must take the mean of the two middle values:
	return ( vec[ id-1 ] + vec[ id ] ) / 2.0;
}; // end METHOD median()

/**
* METHOD: sum( vector )
*	Calculates the sum of an input vector.
*
* @param {array} vector - 1d array of numeric values
* @returns {number} sum value
*/
Vector.sum = function( vector ) {
	var value = 0;
	for ( var i = 0; i < vector.length; i++ ) {
		value += vector[ i ];
	}
	return value;
}; // end METHOD sum()

/**
* METHOD: min( vector )
*	Calculates the min of an input vector.
*
* @param {array} vector - 1d array of numeric values
* @returns {number} min value
*/
Vector.min = function( vector ) {
	var value = Number.POSITIVE_INFINITY;
	for ( var i = 0; i < vector.length; i++ ) {
		if ( vector[ i ] < value ) {
			value = vector[ i ];
		}
	}
	return value;
}; // end METHOD min()

/**
* METHOD: max( vector )
*	Calculates the max of an input vector.
*
* @param {array} vector - 1d array of numeric values
* @returns {number} max value
*/
Vector.max = function( vector ) {
	var value = Number.NEGATIVE_INFINITY;
	for ( var i = 0; i < vector.length; i++ ) {
		if ( vector[ i ] > value ) {
			value = vector[ i ];
		}
	}
	return value;
}; // end METHOD max()

/**
* METHOD: linspace( min, max, increment )
*	Generate a linearly spaced vector.
*
* @param {number} min - min defines the vector lower bound
* @param {number} max - max defines the vector upper bound
* @param {number} increment - distance between successive vector elements
* @returns {array} a 1-dimensional array
*/
Vector.linspace = function( min, max, increment ) {
	var numElements, vec = [];

	numElements = Math.round( ( ( max - min ) / increment ) ) + 1;

	vec[ 0 ] = min;
	vec[ numElements - 1] = max;

	for ( var i = 1; i < numElements - 1; i++ ) {
		vec[ i ] = min + increment*i;
	}
	return vec;
}; // end METHOD linspace()