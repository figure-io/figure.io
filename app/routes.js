/**
*
*	APP: routes
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

	var // Filesystem module:
		fs = require( 'fs' );

	// ROUTES //

	var routes = function ( clbk ) {

		// NOTE: the 'this' context is the application.

		//
		this.get( '/lib/d3.min.js', function onRequest( request, response ) {

			fs.readFile( __dirname + '/../lib/d3.min.js', 'utf8', function onFile( error, script ) {

				response.writeHead( 200, {
					'Content-Type': 'text/javascript'
				});
				response.write( script );
				response.end();

			});

		});

		//
		this.get( '/lib/lodash.min.js', function onRequest( request, response ) {

			fs.readFile( __dirname + '/../lib/lodash.min.js', 'utf8', function onFile( error, script ) {

				response.writeHead( 200, {
					'Content-Type': 'text/javascript'
				});
				response.write( script );
				response.end();

			});

		});

		//
		this.get( '/build/xfig.js', function onRequest( request, response ) {

			fs.readFile( __dirname + '/../build/xfig.js', 'utf8', function onFile( error, script ) {

				response.writeHead( 200, {
					'Content-Type': 'text/javascript'
				});
				response.write( script );
				response.end();

			});

		});

		//
		this.get( '/build/xfig.min.js', function onRequest( request, response ) {

			fs.readFile( __dirname + '/../build/xfig.min.js', 'utf8', function onFile( error, script ) {

				response.writeHead( 200, {
					'Content-Type': 'text/javascript'
				});
				response.write( script );
				response.end();

			});

		});

		// Callback:
		clbk();

	};


	// EXPORTS //

	module.exports = routes;

})();