/**
*
*	UTILS: server
*
*
*
*	DESCRIPTION:
*		- Create a web server.
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

	var // Module to create a simple HTTP server:
		http = require( 'http' );


	// VARIABLES //

	var PORT = 7331;


	// SERVER //

	/**
	* FUNCTION: createServer( clbk )
	*	Creates a simple HTTP server.
	*
	* @param {function} clbk - callback to run after initializing the server
	*/
	var createServer = function ( clbk ) {

		// Note: the 'this' context is the application.

		var // Create the HTTP server:
			server = http.createServer( this );

		// Begin listening for HTTP requests:
		server.listen( PORT, function onError( error ) {

			// Check for an error!
			if ( error ) {
				// Pass the error to the callback...
				return clbk( error );
			}

			// Log that the server is running...
			console.info( 'INFO:server initialized. Server is listening for requests on port: ' + PORT + '...' );

			// Callback:
			clbk();

		});

	}; // end FUNCTION createServer()

	// EXPORTS //

	module.exports = createServer;

})();