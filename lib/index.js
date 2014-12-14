/**
*
*	FIGURE.IO
*
*
*	DESCRIPTION:
*		- Figure library.
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

	/**
	* Context: Node or Browser.
	*/
	var FLG = ( typeof require !== 'undefined' );
	

	/**
	* Dependencies.
	*/
	var d3 = this.d3;

	if ( typeof d3 === 'undefined' ) {
		if ( FLG ) {
			d3 = require( 'd3' );
		} else {
			throw new Error( 'xfig::missing dependency. xfig requires D3; see http://d3js.org.' );
		}
	}


	// XFIG //

	/**
	* XFIG.
	*/
	var xfig = {};

	
	// LAYERS //

	var Figure = require( 'figure-layer' );


	/**
	* Figure layer.
	*/
	xfig.figure = function createLayer() {
		return new Figure();
	};



	// EXPORTS //

	module.exports = xfig;

})();