
// FIGURE //

/**
* FUNCTION: Figure()
*	Figure constructor. Creates a new figure instance.
*
* @returns {object} figure instance
*/
var Figure = function() {

	// INSTANCE ATTRIBUTES //

	this._config = {};
	this._parent = undefined;
	this._root = undefined;
	this._children = {};

	return this;

}; // end FUNCTION Figure()

/**
* METHOD: create( selection )
*	Creates a new figure element. If a selection is supplied, appends a figure element to a selection. If no selection is supplied, a figure is appended to a newly create HTML element; to access the figure parent, use the parent method.
*
* @param {object} selection - DOM element selection, e.g., document.querySelector( '.main' )
* @returns {object} figure instance
*/
Figure.prototype.create = function( selection ) {
	var figure, elements;
	if ( !arguments.length ) {
		selection = document.createElement( 'div' );
	}
	this._parent = selection;
	figure = document.createElement( 'figure' );
	figure.setAttribute( 'property', 'figure' );
	figure.className += 'chart-container';
	selection.appendChild( figure );
	elements = selection.querySelectorAll( '.chart-container' );
	this._root = elements[ elements.length - 1 ];
	return this;
}; // end METHOD create()

/**
* METHOD: parent()
*	Returns the figure parent.
*
* @returns {object} parent DOM element
*/
Figure.prototype.parent = function() {
	return this._parent;
}; // end METHOD parent()

/**
* METHOD: config()
*	Returns the figure configuration as a JSON blob.
*
* @returns {object} configuration blob
*/
Figure.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()

/**
* METHOD: children()
*	Returns the figure children.
*
* @returns {object} figure children
*/
Figure.prototype.children = function() {
	return this._children;
}; // end METHOD children()
