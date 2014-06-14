/**
*
*	ETC: middleware
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

	var // Express middleware, used for launching servers and handling requests:
		express = require( 'express' );


	// INIT //

	function init() {

		// NOTE: the 'this' context is the application.

		// Make explicit what middleware the application should use...

		this.use( express.compress() );
		this.use( express.urlencoded() );
		this.use( express.json() );
		this.use( this.router );
		this.use( express.errorHandler() );
	  
	} // end FUNCTION init();


	// EXPORTS //

	module.exports = init;

})();

