
// TEXT //

/**
* FUNCTION: Text( annotations )
*	Text constructor. Creates a new text instance.
*
* @constructor
* @param {object} annotations - annotations instance
* @returns {object} text instance
*/
function Text( annotations ) {

	// INSTANCE ATTRIBUTES //

	this._parent = annotations;
	this._root = undefined;
	this._children = {};
	this._config = {
		'width': 200,
		'height': 20,
		'position': {
			'left': 0,
			'top': 0
		},
		'text': ''
	};

	// REGISTER //
	if ( annotations._config.hasOwnProperty( 'text' )  ) {
		annotations._config.text.push( this._config );
	} else {
		annotations._config.text = [ this._config ];
	}
	if ( annotations._children.hasOwnProperty( 'text' ) ) {
		annotations._children.text.push( this );
	} else {
		annotations._children.text = [ this ];
	}

	return this;

} // end FUNCTION Text()

/**
* METHOD: create( text )
*	Creates a new text element.
*
* @param {string} text - annotation text
* @returns {object} text instance
*/
Text.prototype.create = function( text ) {

	var selection = this._parent._root,
		width = this._config.width,
		height = this._config.height,
		pos = this._config.position;

	this._config.text = text;

	// Create the text element:
	this._root = selection.append( 'svg:foreignObject' )
		.attr( 'width', width )
		.attr( 'height', height )
		.attr( 'x', pos.left )
		.attr( 'y', pos.top );

	this._root.append( 'xhtml:span' )
		.attr( 'property', 'annotation' )
		.attr( 'class', 'text' )
		.html( text );

	return this;

}; // end METHOD create()

/**
* METHOD: width( value )
*	Text container width setter and getter. If a value is supplied, defines the text container width. If no value is supplied, returns the text container width.
*
* @param {number} width - desired text container width.
* @returns {object|number} text instance or text container width.
*/
Text.prototype.width = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config.width;
	}

	if ( !_.isUndefined( value ) && !_.isNull( value ) ) {
		
		Validator( value, rules, function set( errors ) {
			var arr;
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
*	Text container height setter and getter. If a value is supplied, defines the text container height. If no value is supplied, returns the text container height.
*
* @param {number} height - desired text container height.
* @returns {object|number} text instance or text container height.
*/
Text.prototype.height = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config.height;
	}

	if ( !_.isUndefined( value ) && !_.isNull( value ) ) {
		
		Validator( value, rules, function set( errors ) {
			var arr;
			if ( errors ) {
				console.error( errors );
				throw new Error( 'width()::invalid input argument. ' );
			}
			self._config.height = value;
		});
	}
	return this;
}; // end METHOD height()

/**
* METHOD: position( value )
*	Convenience method to set multple position values. If a value is supplied, defines the text position. If no value is supplied, returns the text position.
*
* @param {object} value - object with the following properties: left, top. All values assigned to properties should be numbers.
* @returns {object|object} text instance or position object
*/
Text.prototype.position = function( value ) {
	var self = this,
		rules = 'object|has_properties[left,top]';

	if ( !arguments.length ) {
		return this._config.position;
	}

	Validator( value, rules, function set( errors ) {
		var rules = 'number';

		if ( errors ) {
			console.error( errors );
			throw new Error( 'position()::invalid input argument.' );
		}
		for ( var key in value ) {
			if ( value.hasOwnProperty( key ) ) {
				errors = Validator( value[ key ], rules );
				if ( errors.length ) {
					console.error( errors );
					throw new Error( 'position()::invalid input argument.' );
				}
			}
		}
		// Set the value:
		self._config.position = value;
	});
	
	return this;
}; // end METHOD position()

/**
* METHOD: left( value )
*	Position-left setter and getter. If a value is supplied, defines the text position-left. If no value is supplied, returns the text position-left.
*
* @param {number} value - desired text position-left.
* @returns {object|number} - text instance or position left value
*/
Text.prototype.left = function( value ) {
	var position = this._config.position,
		rules = 'number';

	if ( !arguments.length ) {
		return position.left;
	}

	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'left()::invalid input argument.' );
		}
		position.left = value;
	});

	return this;
}; // end METHOD left()

/**
* METHOD: top( value )
*	Position-top setter and getter. If a value is supplied, defines the text position-top. If no value is supplied, returns the text position-top.
*
* @param {number} value - desired text position-top.
* @returns {object|number} - text instance or position top value
*/
Text.prototype.top = function( value ) {
	var position = this._config.position,
		rules = 'number';

	if ( !arguments.length ) {
		return position.top;
	}

	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'top()::invalid input argument.' );
		}
		position.top = value;
	});

	return this;
}; // end METHOD top()

/**
* METHOD: parent()
*	Returns the text parent.
*
* @returns {object} parent instance
*/
Text.prototype.parent = function() {
	return this._parent;
}; // end METHOD parent()

/**
* METHOD: config()
*	Returns the text configuration as a JSON blob.
*
* @returns {string} configuration blob
*/
Text.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()

/**
* METHOD: children()
*	Returns the text children.
*
* @returns {object} text children
*/
Text.prototype.children = function() {
	return this._children;
}; // end METHOD children()