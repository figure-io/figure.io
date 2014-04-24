/**
*
*	SERVER
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
*	AUTHOR:
*		Athan Reines. athan@nodeprime.com. 2014.
*
*
*/

(function() {
	'use strict';

	// MODULES //

	var // Main application:
		app = require( './app' );

	// PROCESS //

	console.info( 'INFO:node process id: ' + process.pid + '...' );

	// BOOT //

	// Boot the application...
	app.boot( function ( error ) {

		// Check if we encountered an error while booting...
		if ( error ) {

			console.log( error.message );
			console.log( error.stack );

			return process.exit( -1 );

		}

	});

})();



