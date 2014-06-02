/**
*
*	APP
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
		express = require( 'express' ),

		// Bootable:
		bootable = require( 'bootable' ),

		// HTTP server:
		server = require( './utils/server.js' ),

		// App routes:
		routes = require( './routes.js' );


	// APP //

	// [0] Create the application:
	var app = bootable( express() );

	// [1] Execute the initializers:
	app.phase( bootable.initializers( path.resolve( __dirname, '../etc/init' ) ), app );

	// [2] Bind the application routes:
	app.phase( routes );

	// [3] Create the server:
	app.phase( server );
	

	// EXPORTS //

	// Expose the application:
	module.exports = app;

})();

