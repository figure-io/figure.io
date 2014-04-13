/**
*
*	FIGURE: canvas
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
*		- 2014/04/12: Created. [AReines].
*
*
*	DEPENDENCIES:
*		[1] d3.js
*		[2] 
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

(function ( Figure, d3 ) {
	'use strict';

	if ( !Figure ) {
		Figure = function() {};
	}

	// CANVAS //

	Figure.prototype.canvas = function( selection, type, clbk ){

		var self = this,
			canvas;

		if ( !type ) {
			type = 'svg';
		}

		switch ( type ) {
			case 'svg':
				canvas = svg();
				break;
		}

		if ( clbk ) {
			clbk( canvas );
			return;
		}

		return canvas;


		// FUNCTIONS //

		/**
		* FUNCTION: svg()
		*	Append an SVG canvas to a selection.
		*
		* @returns {object} SVG element as a D3 selection.
		*/
		function svg() {
			var canvas = d3.select( selection ).append( 'svg:svg' )
				.attr( 'property', 'canvas' )
				.attr( 'class', 'canvas' )
				.attr( 'width', self.width )
				.attr( 'height', self.height )
				.attr( 'viewBox', '0 0 ' + self.width + ' ' + self.height )
				.attr( 'preserveAspectRatio', 'xMidYMid' )
				.attr( 'data-aspect', self.width / self.height );
			return canvas;
		} // end FUNCTION svg()

	}; // end PROTOTYPE canvas()


})( Figure, d3 );