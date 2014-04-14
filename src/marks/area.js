/**
*
*	FIGURE: area (marks)
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
*		- 2014/04/14: Created. [AReines].
*
*
*	DEPENDENCIES:
*		[1] d3.js
*		[2] validate.js
*
*
*	LICENSE:
*		MIT. http://opensource.org/licenses/MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. athan@nodeprime.com. 2014
*
*
*/

// Area //

/**
* FUNCTION: Area( graph )
*	Area constructor. Creates a new area instance.
*
* @param {object} graph - parent graph element
*/
var Area = function( graph ) {

	// INSTANCE ATTRIBUTES //

	this._parent = graph;
	this._root = undefined;
	this._children = {};
	this._config = {
		"interpolation": "linear"
	};

	graph._xScale.domain( [0,1])
		.range( [0, 600] );
	graph._yScale.domain( [0,75] )
		.range( [400, 0] );

	// x-accessor:
	this._X = function X( d ) {
		return graph._xScale( d[ 0 ] );
	};

	// y0-accessor:
	this._Y0 = function Y0( d ) {
		return graph._yScale( 0 );
	};

	// y1-accessor:
	this._Y1 = function Y1( d ) {
		return graph._yScale( 0 + d[ 1 ] );
	};

	this._area = d3.svg.area()
		.x( this._X )
		.y0( this._Y0 )
		.y1( this._Y1 )
		.interpolate( this._config.interpolation );

	// REGISTER //
	graph._config.marks = this._config;

	return this;

}; // end FUNCTION Area()

/**
* METHOD: create( type )
*	Creates a new area element.
*/
Area.prototype.create = function( data ) {

	var selection = this._parent._root,
		marks;

	// Create the marks group:
	marks = selection.append( 'svg:g' )
		.attr( 'property', 'marks' )
		.attr( 'class', 'marks' );
		// .attr( 'clip-path', 'url(#' + _clipPath.attr( 'id' ) + ')' );

	// Add areas:
	marks.selectAll( '.area' )
		.data( data._data )
	  .enter().append( 'svg:path' )
		.attr( 'property', 'area' )
		.attr( 'class', 'area' )
		// .attr( 'data-label', function ( d, i ) { return labels[ i ]; })
		.attr( 'd', this._area );

	this._root = marks;

	return this;

}; // end METHOD create()

/**
* METHOD: parent()
*	Returns the area parent.
*/
Area.prototype.parent = function() {
	return this._parent;
}; // end METHOD parent()

/**
* METHOD: config()
*	Returns the area configuration as a JSON blob.
*/
Area.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()

/**
* METHOD: children()
*	Returns the area children.
*/
Area.prototype.children = function() {
	return this._children;
}; // end METHOD children()