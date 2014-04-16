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
* @param {object} figure - parent figure instance
* @returns {object} canvas instance
*/
var Canvas = function( figure ) {

	// INSTANCE ATTRIBUTES //

	this._parent = figure;
	this._root = undefined;
	this._children = {};
	this._config = {
		'width': 500,
		'height': 500,
		"background": false
	};

	// REGISTER //
	if ( figure._config.hasOwnProperty( 'canvas' )  ) {
		figure._config.canvas.push( this._config );
	} else {
		figure._config.canvas = [ this._config ];
	}

	return this;

}; // end FUNCTION Canvas()

/**
* METHOD: create( type )
*	Creates a new canvas element. If a type is supplied, appends a canvas element of the specified type to a root figure element. If no type is supplied, defaults to svg canvas.
*
* @param {string} type - canvas type to be created.
* @returns {object} canvas instance
*/
Canvas.prototype.create = function( type ) {

	// VARIABLES //
	var self = this,
		pChildren = this._parent._children;

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
			throw new Error( 'create()::unrecognized canvas type: ' + type );
	} // end SWITCH (type)

	// REGISTER //
	if ( pChildren.hasOwnProperty( 'canvas' ) ) {
		pChildren.canvas.push( this );
	} else {
		pChildren.canvas = [ this ];
	}

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
* @returns {object|number} canvas instance or canvas width.
*/
Canvas.prototype.width = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config.width;
	}

	if ( !_.isUndefined( value ) && !_.isNull( value ) ) {

		Validator( value, rules, function set( errors ) {
			if ( errors ) {
				console.error( errors );
				throw new Error( 'width()::invalid input argument. ' );
			}
			self._config.width = value;
		});

	}

	return this;
	
}; // end METHOD width()

/**
* METHOD: height( value )
*	Height setter and getter. If a value is supplied, defines the canvas height. If no value is supplied, returns the canvas height.
*
* @param {number} height - desired canvas height.
* @returns {object|number} canvas instance or canvas height.
*/
Canvas.prototype.height = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config.height;
	}
	
	if ( !_.isUndefined( value ) && !_.isNull( value ) ) {

		Validator( value, rules, function set( errors ) {
			if ( errors ) {
				console.error( errors );
				throw new Error( 'height()::invalid input argument. ' );
			}
			self._config.height = value;
		});

	}

	return this;

}; // end METHOD height()

/**
* METHOD: background( bool )
*	Background display setter and getter. If a boolean is provided, sets the background display. If no boolean is provided, gets the background display. If false, when canvases are created, no background is created.
*
* @param {boolean} bool - boolean flag indicating whether to create a background.
* @returns {object|boolean} canvas instance or background display
*/
Canvas.prototype.background = function( bool ) {
	var self = this,
		rules = 'boolean';

	if ( !arguments.length ) {
		return this._config.background;
	}

	// Validator( bool, rules, set );
	(function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'background()::invalid input argument.' );
		}
		self._config.background = bool;
	})();

	return this;

}; // end METHOD background()

/**
* METHOD: parent()
*	Returns the canvas parent.
*
* @returns {object} parent instance
*/
Canvas.prototype.parent = function() {
	return this._parent;
}; // end METHOD parent()

/**
* METHOD: config()
*	Returns the canvas configuration as a JSON blob.
*
* @returns {string} configuration blob
*/
Canvas.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()

/**
* METHOD: children()
*	Returns the canvas children.
*
* @returns {object} canvas children
*/
Canvas.prototype.children = function() {
	return this._children;
}; // end METHOD children()