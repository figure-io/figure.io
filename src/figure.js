/**
*
*	FIGURE
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
*		- 2014/04/12: Created. [AReines].
*
*
*	DEPENDENCIES:
*		[1] validate.js
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


// FIGURE //

/**
* FUNCTION: Figure()
*	Figure constructor. Creates a new figure instance.
*/
var Figure = function() {

	// INSTANCE ATTRIBUTES //

	this._config = {};
	this._children = {};
	this._root = undefined;

	return this;

}; // end FUNCTION Figure()

/**
* METHOD: create( selection )
*	Creates a new figure element. If a selection is supplied, appends a figure element to a selection. If no selection is supplied, no figure is created.
*
* @param {object} selection - DOM element selection, e.g., document.querySelector( '.main' )
* 
* @returns {object} figure instance
*/
Figure.prototype.create = function( selection ) {
	var figure, elements;
	if ( !arguments.length ) {
		return;
	}
	figure = document.createElement( 'figure' );
	figure.setAttribute( 'property', 'figure' );
	figure.className += 'chart-container';
	selection.appendChild( figure );
	elements = selection.querySelectorAll( '.chart-container' );
	this._root = elements[ elements.length - 1 ];
	return this;
}; // end METHOD create()

/**
* METHOD: config()
*	Returns the figure configuration as a JSON blob.
*/
Figure.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()

/**
* METHOD: children()
*	Returns the figure children.
*/
Figure.prototype.children = function() {
	return this._children;
}; // end METHOD children()
