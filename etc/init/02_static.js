/**
*
*	ETC: static
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
*		- 2014/04/21: Created. [AReines].
*
*
*	DEPENDENCIES:
*		[1] 
*
*
*	LICENSE:
*		
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. athan@nodeprime.com. 2014.
*
*
*/

(function() {
	'use strict';

	// MODULES //

	var // Path module:
		path = require( 'path' ),

		// Express middleware:
		express = require( 'express' );


	// INIT //

	function init() {

		// NOTE: the 'this' context is the application.

		// Where do the static routes for the application live?
		this.use( express.static( path.resolve( __dirname, '../../public' ) ) );

	} // end FUNCTION init()


	// EXPORTS //

	module.exports = init;

})();

