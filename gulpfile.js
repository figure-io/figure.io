/**
*
*	GULP
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


// MODULES //

var // Task runner:
	gulp = require( 'gulp' );


// PLUG-INS //

var jshint = require( 'gulp-jshint' ),
	stripDebug = require( 'gulp-strip-debug' ),
	uglify = require( 'gulp-uglify' ),
	concat = require( 'gulp-concat' ),
	minifyHTML = require( 'gulp-minify-html' ),
	minifyCSS = require( 'gulp-minify-css' ),
	autoprefix = require( 'gulp-autoprefixer' ),
	minifyJSON = require( 'gulp-jsonminify' ),
	header = require( 'gulp-header' ),
	footer = require( 'gulp-footer' );


// TASKS //

// JSHint:
gulp.task( 'jshint', function() {
	gulp.src(
		[
			'./src/*.js',
			'./src/*/*.js'
		])
		.pipe( jshint() )
		.pipe( jshint.reporter( 'default' ) );
});

// Concatenate scripts:
gulp.task( 'library.build', function() {
	gulp.src( [ './src/start.js', './src/xfig.js', './src/*/*.js', './src/end.js' ] )
		.pipe( concat( 'xfig.js' ) )
		.pipe( gulp.dest( './build/' ) );
	gulp.src( [ './src/start.js', './src/xfig.js', './src/*/*.js', './src/end.js' ] )
		.pipe( concat( 'xfig.min.js' ) )
		.pipe( stripDebug() )
		.pipe( uglify() )
		.pipe( gulp.dest( './build/' ) );
});

// Default:
gulp.task( 'default', [ 'library.build' ], function(){});