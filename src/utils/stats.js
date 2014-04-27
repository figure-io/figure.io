



/**
* FUNCTION: mean( vector )
*	Calculates the mean value of an input vector.
*
* @param {array} vector - 1d array of numeric values
* @returns {number} mean value
*/
function mean( vector ) {
	var sum = 0;
	for ( var i = 0; i < vector.length; i++ ) {
		sum += vector[ i ];
	}
	return sum / vector.length;
} // end FUNCTION mean()

/**
* FUNCTION: variance( vector )
*	Calculates the sample variance of an input vector.
*
* @param {array} vector - 1d array of numeric values
* @returns {number} variance
*/
function variance( vector ) {
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
} // end FUNCTION variance()

/**
* FUNCTION: stdev( vector )
*	Calculates the sample standard deviation of an input vector.
*
* @param {array} vector - 1d array of numeric values
* @returns {number} standard deviation
*/
function stdev( vector ) {
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
} // end FUNCTION stdev()

/**
* FUNCTION: median( vector )
*	Calculates the median value of an input vector.
*
* @param {array} vector - 1d array of numeric values
* @returns {number} median value
*/
function median( vector ) {
	var value, id, vec;

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

} // end FUNCTION median()

/**
* FUNCTION: sum( vector )
*	Calculates the sum of an input vector.
*
* @param {array} vector - 1d array of numeric values
* @returns {number} sum value
*/
function sum( vector ) {
	var value = 0;
	for ( var i = 0; i < vector.length; i++ ) {
		value += vector[ i ];
	}
	return value;
} // end FUNCTION sum()

/**
* FUNCTION: min( vector )
*	Calculates the min of an input vector.
*
* @param {array} vector - 1d array of numeric values
* @returns {number} min value
*/
function min( vector ) {
	var value = Number.POSITIVE_INFINITY;
	for ( var i = 0; i < vector.length; i++ ) {
		if ( vector[ i ] < value ) {
			value = vector[ i ];
		}
	}
	return value;
} // end FUNCTION min()

/**
* FUNCTION: max( vector )
*	Calculates the max of an input vector.
*
* @param {array} vector - 1d array of numeric values
* @returns {number} max value
*/
function max( vector ) {
	var value = Number.NEGATIVE_INFINITY;
	for ( var i = 0; i < vector.length; i++ ) {
		if ( vector[ i ] > value ) {
			value = vector[ i ];
		}
	}
	return value;
} // end FUNCTION max()