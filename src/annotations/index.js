
// ANNOTATION //

/**
* FUNCTION: Annotations( parent )
*	Annotations constructor. Creates a new annotations instance.
*
* @param {object} parent - parent instance (Canvas, Graph)
* @returns {object} annotations instance
*/
var Annotations = function( parent ) {

	// INSTANCE ATTRIBUTES //

	this._parent = parent;
	this._root = undefined;
	this._children = {};
	this._config = {
		'position': {
			'left': 0,
			'top': 0
		}
	};

	// REGISTER //
	if ( parent._config.hasOwnProperty( 'annotations' )  ) {
		parent._config.annotations.push( this._config );
	} else {
		parent._config.annotations = [ this._config ];
	}
	if ( parent._children.hasOwnProperty( 'annotations' ) ) {
		parent._children.annotations.push( this );
	} else {
		parent._children.annotations = [ this ];
	}

	return this;

}; // end FUNCTION Annotations()

/**
* METHOD: create()
*	Creates a new annotations element.
*
* @returns {object} annotations instance
*/
Annotations.prototype.create = function() {

	var selection = this._parent._root,
		position = this._config.position;
	
	// Create the annotation element:
	this._root = selection.append( 'svg:g' )
		.attr( 'property', 'annotations' )
		.attr( 'class', 'annotations' )
		.attr( 'transform', 'translate(' + position.left + ',' + position.top + ')' );

	return this;

}; // end METHOD create()

/**
* METHOD: position( value )
*	Convenience method to set multple position values. If a value is supplied, defines the annotations position. If no value is supplied, returns the annotations position.
*
* @param {object} value - object with the following properties: left, top. All values assigned to properties should be numbers.
* @returns {object|object} annotations instance or position object
*/
Annotations.prototype.position = function( value ) {
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
*	Position-left setter and getter. If a value is supplied, defines the annotations position-left. If no value is supplied, returns the annotations position-left.
*
* @param {number} value - desired annotations position-left.
* @returns {object|number} - annotations instance or position left value
*/
Annotations.prototype.left = function( value ) {
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
*	Position-top setter and getter. If a value is supplied, defines the annotations position-top. If no value is supplied, returns the annotations position-top.
*
* @param {number} value - desired annotations position-top.
* @returns {object|number} - annotations instance or position top value
*/
Annotations.prototype.top = function( value ) {
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
* METHOD: title()
*	Creates a new title instance.
*
* @returns {object} title instance
*/
Annotations.prototype.title = function() {
	return new Title( this );
}; // end METHOD title()

/**
* METHOD: text()
*	Creates a new text instance.
*
* @returns {object} text instance
*/
Annotations.prototype.text = function() {
	return new Text( this );
}; // end METHOD text()

/**
* METHOD: parent()
*	Returns the annotations parent.
*
* @returns {object} parent instance
*/
Annotations.prototype.parent = function() {
	return this._parent;
}; // end METHOD parent()

/**
* METHOD: config()
*	Returns the annotations configuration as a JSON blob.
*
* @returns {string} configuration blob
*/
Annotations.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()

/**
* METHOD: children()
*	Returns the annotations children.
*
* @returns {object} annotations children
*/
Annotations.prototype.children = function() {
	return this._children;
}; // end METHOD children()