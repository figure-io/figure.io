/**
*
*	LAYER: Figure
*
*
*	DESCRIPTION:
*		- Creates a new Figure instance.
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
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

(function() {
	'use strict';

	// MODULES //

	var Layer = require( 'figure-layer' );


	// EXPORTS //

	module.exports = function createLayer() {
		return new Layer();
	};

})();