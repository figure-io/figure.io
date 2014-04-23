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
	minifyJSON = require( 'gulp-jsonminify' );


// TASKS //

// JSHint:
gulp.task( 'jshint', function() {
	gulp.src(
		[
			'./app/*.js',
			'./app/utils/*.js',
			'./app/modules/*.js',
			'./app/modules/*/*.js'
		])
		.pipe( jshint() )
		.pipe( jshint.reporter( 'default' ) );
});

// Default:
gulp.task( 'default', [], function(){});