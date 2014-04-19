/**
*
*	FIGURE: multipanel
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
*		- 2014/04/18: Created. [AReines].
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

// Multipanel //

/**
* FUNCTION: Multipanel( canvas )
*	Multipanel constructor. Creates a new multipanel instance.
*
* @param {object} canvas - parent canvas instance
* @returns {object} multipanel instance
*/
var Multipanel = function( canvas ) {

	// INSTANCE ATTRIBUTES //

	this._parent = canvas;
	this._root = undefined;
	this._children = {};
	this._config = {
		"num": 1
	};

	// REGISTER //
	if ( canvas._config.hasOwnProperty( 'multipanel' ) ) {
		canvas._config.multipanel.push( this._config );
	} else {
		canvas._config.axes = [ this._config ];
	}
	if ( canvas._children.hasOwnProperty( 'multipanel' ) ) {
		canvas._children.multipanel.push( this );
	} else {
		canvas._children.multipanel = [ this ];
	}

	return this;

}; // end FUNCTION Multipanel()

/**
* METHOD: create( numPanels )
*	Creates a new multipanel element.
*
* @returns {object} multipanel instance
*/
Multipanel.prototype.create = function( numPanels ) {

	var selection = this._parent._root;

	for ( var i = 0 ; i < numPanels; i++ ) {
		
	}

	return this;

}; // end METHOD create()

/**
* METHOD: parent()
*	Returns the multipanel parent.
*
* @returns {object} multipanel parent
*/
Multipanel.prototype.parent = function() {
	return this._parent;
}; // end METHOD parent()

/**
* METHOD: config()
*	Returns the multipanel configuration as a JSON blob.
*
* @returns {object} configuration blob
*/
Multipanel.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()

/**
* METHOD: children()
*	Returns the multipanel children.
* 
* @returns {object} multipanel children
*/
Multipanel.prototype.children = function() {
	return this._children;
}; // end METHOD children()