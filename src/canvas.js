/**
*
*	FIGURE: canvas
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

// CANVAS //

/**
* FUNCTION: Canvas( figure )
*	Canvas constructor. Creates a new canvas instance.
*
* @param {object} figure - parent figure element
*/
var Canvas = function( figure ) {

	// INSTANCE ATTRIBUTES //

	this._parent = figure;
	this._root = undefined;
	this._children = {};
	this._config = {
		'width': 500,
		'height': 500,
	};

	// REGISTER //
	figure._config.canvas = this._config;

	return this;

}; // end FUNCTION Canvas()

/**
* METHOD: create( type )
*	Creates a new canvas element. If a type is supplied, appends a canvas element of the specified type to a root figure element. If no type is supplied, defaults to svg canvas.
*
* @param {string} type - canvas type to be created.
*/
Canvas.prototype.create = function( type ) {

	// VARIABLES //
	var self = this;

	// CHECKS!!!
	if ( !type ) {
		type = 'svg';
	}

	// CANVAS //

	// Create a new canvas based on the specified type...
	switch ( type ) {
		case 'svg':
			this._root = svg();
			break;
		default:
			console.error( 'ERROR:unrecognized canvas type: ' + type + '.' );
			return;
	} // end SWITCH (type)

	// REGISTER //
	this._parent._children.canvas = this._root;

	return this;

	// FUNCTIONS //

	/**
	* FUNCTION: svg()
	*	Append an SVG canvas to a parent element.
	*
	* @returns {object} SVG element as a D3 selection.
	*/
	function svg() {
		var parent = self._parent._root,
			width = self._config.width,
			height = self._config.height,
			canvas;

		canvas = d3.select( parent ).append( 'svg:svg' )
			.attr( 'property', 'canvas' )
			.attr( 'class', 'canvas' )
			.attr( 'width', width )
			.attr( 'height', height )
			.attr( 'viewBox', '0 0 ' + width + ' ' + height )
			.attr( 'preserveAspectRatio', 'xMidYMid' )
			.attr( 'data-aspect', width / height );

		return canvas;
	} // end FUNCTION svg()

}; // end METHOD create()


/**
* METHOD: width( value )
*	Width setter and getter. If a value is supplied, defines the canvas width. If no value is supplied, returns the canvas width.
*
* @param {number} width - desired canvas width.
* 
* @returns {number} canvas width.
*/
Canvas.prototype.width = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config.width;
	}
	
	Validator( value, rules, set );

	return this;

	function set( errors ) {
		if ( errors ) {
			console.error( errors );
			return;
		}
		self._config.width = value;
	}
}; // end METHOD width()

/**
* METHOD: height( value )
*	Height setter and getter. If a value is supplied, defines the canvas height. If no value is supplied, returns the canvas height.
*
* @param {number} height - desired canvas height.
* 
* @returns {number} - canvas height.
*/
Canvas.prototype.height = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config.height;
	}
	
	Validator( value, rules, set );

	return this;

	function set( errors ) {
		if ( errors ) {
			console.error( errors );
			return;
		}
		self._config.height = value;
	}
}; // end METHOD height()

/**
* METHOD: config()
*	Returns the canvas configuration as a JSON blob.
*/
Canvas.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()

/**
* METHOD: children()
*	Returns the canvas children.
*/
Canvas.prototype.children = function() {
	return this._children;
}; // end METHOD children()