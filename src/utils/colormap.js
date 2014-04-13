/**
*
*	COLORMAP
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
*		[1] Based on the work of Joseph Kirk and his vivid colormap: http://www.mathworks.com/matlabcentral/fileexchange/20848-vivid-colormap
*
*
*	TODO:
*		[1] 
*
*
*	HISTORY:
*		- 2014/03/13: Created. [AReines].
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

var Colormap;

(function() {
	'use strict';

	// VARIABLES //

	var colormap;


	// FUNCTIONS //

	// FUNCTION: replicate( value, length )
	//
	function replicate( value, length ) {
		//
		//
		//
		//

		var _array = [];

		for ( var i = 0; i < length; i++ ) {
			_array.push( value );
		} // end FOR i

		return _array;

	}

	// FUNCTION: linspace( a, b, increment )
	//
	function linspace( a, b, increment ) {
		//
		//	NOTES:
		//		- Does not include 'b'
		//

		var vec = [],
			length = Math.floor( (b-a) / increment );

		vec.push( a );

		for ( var i = 1; i < length; i++) {
			vec.push( a + increment*i );
		} // end FOR i

		return vec;

	} // end FUNCTION linspace()

	// FUNCTION: max( vector, comparator )
	//
	// Calculate the maximum value of an input vector.
	function max( vector, comparator ) {
		//
		//
		//
		//

		if ( !arguments.length ) {
			console.error('ERROR:no input vector provided.');
			return;
		}

		var _max = Number.NEGATIVE_INFINITY;

		if ( comparator ) {

			for ( var j = 0; j < vector.length; j++ ) {
				if ( comparator < vector[ j ] ) {
					vector[ j ] = comparator;
				}
			}

			return vector;

		}

		for ( var i = 0; i < vector.length; i++ ) {
			if ( _max < vector[i] ) {
				_max = vector[i];
			}
		}

		return _max;

	} // end FUNCTION max()


	// FUNCTION: min( vector, comparator )
	//
	// Calculate the minumum value of an input vector.
	function min( vector, comparator ) {
		//
		//
		//
		//

		if ( !arguments.length ) {
			console.error('ERROR:no input vector provided.');
			return;
		}

		var _min = Number.POSITIVE_INFINITY;

		if ( comparator ) {

			for ( var j = 0; j < vector.length; j++ ) {
				if ( comparator < vector[ j ] ) {
					vector[ j ] = comparator;
				}
			}

			return vector;

		}

		for ( var i = 0; i < vector.length; i++ ) {
			if ( _min > vector[i] ) {
				_min = vector[i];
			}
		}

		return _min;

	} // end FUNCTION min()



	// COLORMAP //

	colormap = function() {

		// DEFAULTS //

		var // Which colors do we want in our colormap?
			_colors = [
				[ 1, 1, 1, 1 ], // White
				[ 0, 0, 1, 1 ], // Blue
				[ 0, 1, 0, 1 ], // Green
				[ 1, 1, 0, 1 ], // Yellow
				[ 1, 0.5, 0, 1 ], // Orange
				[ 1, 0, 0, 1 ]  // Red
			],

			// What intensity range do we want each color to span?
			_intensityRange = [ 0.4, 0.6 ],

			// How many colors should we include in the colormap?
			_numColors = 64;


		return function ( numColors, intensityRange, colors ){

			var nColors, nShades, totalColors, diff, sup, sub, high, low, _high, _low, i, j;

			// Set the colormap generation parameters:
			numColors = numColors || _numColors;
			intensityRange = intensityRange || _intensityRange;
			colors = colors || _colors;

			// Calculate generation parameters:
			nColors = colors.length; // number of spectrum colors
			nShades = Math.ceil( numColors / nColors ); // number of shades per color
			totalColors = nColors * nShades;
			diff = totalColors - numColors;

			// Scale the intensity:
			sup = [ 2*intensityRange[0], 2*intensityRange[1] ];
			sub = [ 2*intensityRange[0]-1, 2*intensityRange[1]-1 ];

			if ( nShades === 1 ) {

				_high = min( [ 1, 0.5*high[0] + 0.5*high[1] ] );
				_low = max( [ 0, 0.5*low[0] + 0.5*low[1] ] );
				
				// Tile a matrix: (array of arrays)
				high = replicate( replicate( _high, 3).push( 1 ), numColors );
				low = replicate( replicate( _low, 3).push( 1 ), numColors );

			} else {

				_high = linspace( sup[0], sup[1], (sup[1]-sup[0])/nShades );
				_low = linspace( sub[0], sub[1], (sub[1]-sub[0])/nShades );

				_high = min( _high, 1 );
				_low = max( _low, 0 );

				// Tile a matrix: (array of arrays)
				

			} // end IF/ELSE (nShades==1)

		};

	}; // end COLORMAP


	// EXPORTS //
	Colormap = colormap;

})();