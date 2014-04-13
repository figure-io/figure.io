/**
*
*	HIST2C
*
*
*
*	DESCRIPTION:
*		- Bin an input array according to two input vectors defining bin edges. Returns a count array.
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
*		- 2014/03/11: Created. [AReines].
*
*
*	DEPENDENCIES:
*		[1] 
*
*
*	LICENSE:
*		
*
*	Copyright (c) Athan Reines. 2014.
*
*
*	AUTHOR:
*		Athan Reines. athan@nodeprime.com. 2014.
*
*
*/

var hist2c;

(function() {
	'use strict';

	// VARIABLES //

	var _hist2c;


	// FUNCTIONS //

	function binarysearch( vector, value ) {
		//
		//	NOTES:
		//		- This is a variation of the binary search algorithm, in which we are not seeking equality, per se, but to find that index at which the supplied value equals or exceeds the value at that index but is less than the value at the next index. We are looking for the right 'bin'.
		//

		var lower = 0,
			upper = vector.length,
			id;

		// Initial checks:
		if ( value < vector[ lower ] ) {
			// Value is below the lower bound:
			return -1;
		} // end IF
		if ( value > vector[ upper-1 ] ) {
			//  Value exceeds the upper bound:
			return upper-1;
		} // end IF

		// We know that the value resides somewhere within our vector...okay to proceed:

		// console.log(lower, id, upper);
		while ( lower <= upper ) {

			// Use a bitwise operator to return: Math.floor( (lower + upper) / 2), which is the middle value:
			id = (lower + upper) >> 1;

			// If the value is greater than the mid point, increase our lower bound index:
			if (value > vector[ id ]) {
				lower = id + 1;
			} else {
			// Does the value equal the upper bound? If yes, exit the loop; else decrement our lower bound index and tighten the bounds:
				upper = ( value === vector[ id ] ) ? -2 : id - 1;
			}

			// console.log(lower, id, upper);

		}

		// Recall the following: 1) if a perfect match has been found, then upper is -2 and the current id is the upper bound at which the match occurred. In this case, we want to return that id. 2) if a perfect match has not been found, we have two scenarios: i) if the value is less than the value at the upper bound index, we want the previous id. ii) if the value is greater than or equal to the value at the upper bound index, we found our id.
		return ( value < vector[id] ) ? id-1 : id;

	} // end FUNCTION binary_search()


	// HIST2C //

	_hist2c = function( data, xEdges, yEdges ) {

		var id1, id2, counts = [];

		// Initialize our counts array: (all zeros):
		for ( var i = -1; i < xEdges.length; i++ ) {
			counts[ i+1 ] = [];
			for ( var j = -1; j < yEdges.length; j++ ) {
				counts[ i+1 ][ j+1 ] = 0;
			} // end FOR i
		} // end FOR j

		// For each value in the data array, find where the value resides along the edge vector in each dimension:
		for ( var k = 0; k < data.length; k++ ) {

			for ( var n = 0; n < data[ k ].length; n++ ) {

				// Perform a binary search along each dimension to find the index where the value equals or exceeds the corresponding value in the edge vector:
				id1 = binarysearch( xEdges, data[ k ][ n ][ 0 ] );
				id2 = binarysearch( yEdges, data[ k ][ n ][ 1 ] );

				// Update the counts for the bin:
				counts[ id1+1 ][ id2+1 ] += 1;

			} // end FOR n

		} // end FOR k

		// Return the counts:
		return counts;

	}; // end FUNCTION histc()


	// EXPORTS //

	hist2c = _hist2c;

})();