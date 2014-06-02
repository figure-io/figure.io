
// TITLE //

/**
* FUNCTION: Title( annotations )
*	Title constructor. Creates a new title instance.
*
* @constructor
* @param {object} annotations - annotations instance
* @returns {object} title instance
*/
function Title( annotations ) {

	// INSTANCE ATTRIBUTES //

	this._parent = annotations;
	this._root = undefined;
	this._children = {};
	this._config = {
		'width': 200,
		'height': 28,
		'position': {
			'left': 0,
			'top': 0
		},
		'text': ''
	};

	// REGISTER //
	if ( annotations._config.hasOwnProperty( 'title' )  ) {
		annotations._config.title.push( this._config );
	} else {
		annotations._config.title = [ this._config ];
	}
	if ( annotations._children.hasOwnProperty( 'title' ) ) {
		annotations._children.title.push( this );
	} else {
		annotations._children.title = [ this ];
	}

	return this;

} // end FUNCTION Title()

/**
* METHOD: create( title )
*	Creates a new title element.
*
* @param {string} title - title text
* @returns {object} title instance
*/
Title.prototype.create = function( title ) {

	var selection = this._parent._root,
		width = this._config.width,
		height = this._config.height,
		pos = this._config.position;

	this._config.text = title;

	// Create the title element:
	this._root = selection.append( 'svg:foreignObject' )
		.attr( 'width', width )
		.attr( 'height', height )
		.attr( 'x', pos.left )
		.attr( 'y', pos.top );

	this._root.append( 'xhtml:span' )
		.attr( 'property', 'title' )
		.attr( 'class', 'title' )
		.html( title );

	return this;

}; // end METHOD create()

/**
* METHOD: width( value )
*	Title container width setter and getter. If a value is supplied, defines the title container width. If no value is supplied, returns the title container width.
*
* @param {number} width - desired title container width.
* @returns {object|number} title instance or title container width.
*/
Title.prototype.width = function( value ) {
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
*	Title container height setter and getter. If a value is supplied, defines the title container height. If no value is supplied, returns the title container height.
*
* @param {number} height - desired title container height.
* @returns {object|number} title instance or title container height.
*/
Title.prototype.height = function( value ) {
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
*	Convenience method to set multple position values. If a value is supplied, defines the title position. If no value is supplied, returns the title position.
*
* @param {object} value - object with the following properties: left, top. All values assigned to properties should be numbers.
* @returns {object|object} title instance or position object
*/
Title.prototype.position = function( value ) {
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
*	Position-left setter and getter. If a value is supplied, defines the title position-left. If no value is supplied, returns the title position-left.
*
* @param {number} value - desired title position-left.
* @returns {object|number} - title instance or position left value
*/
Title.prototype.left = function( value ) {
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
*	Position-top setter and getter. If a value is supplied, defines the title position-top. If no value is supplied, returns the title position-top.
*
* @param {number} value - desired title position-top.
* @returns {object|number} - title instance or position top value
*/
Title.prototype.top = function( value ) {
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
*	Returns the title parent.
*
* @returns {object} parent instance
*/
Title.prototype.parent = function() {
	return this._parent;
}; // end METHOD parent()

/**
* METHOD: config()
*	Returns the title configuration as a JSON blob.
*
* @returns {string} configuration blob
*/
Title.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()

/**
* METHOD: children()
*	Returns the title children.
*
* @returns {object} title children
*/
Title.prototype.children = function() {
	return this._children;
}; // end METHOD children()