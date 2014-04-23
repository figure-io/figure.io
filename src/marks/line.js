
// Line //

/**
* FUNCTION: Line( graph )
*	Line constructor. Creates a new line instance.
*
* @param {object} graph - parent graph instance
* @returns {object} line instance
*/
var Line = function( graph ) {

	// INSTANCE ATTRIBUTES //

	this._parent = graph;
	this._root = undefined;
	this._children = {};
	this._config = {
		"type": "line",
		"interpolation": {
			"mode": "linear",
			"tension": 0.7
		},
		"labels": []
	};

	// DATA //

	this._data = graph._data;

	// TRANSFORMS //

	this._transforms = {
		'x': function X( d ) {
			return graph._xScale( d[ 0 ] );
		},
		'y': function Y( d ) {
			return graph._yScale( d[ 1 ] );
		}
	};

	// GENERATOR //

	this._path = this.path()
		.x( this._transforms.x )
		.y( this._transforms.y )
		.interpolate( this._config.interpolation.mode )
		.tension( this._config.interpolation.tension );

	// REGISTER //
	if ( graph._config.hasOwnProperty( 'marks' ) ) {
		graph._config.marks.push( this._config );
	} else {
		graph._config.marks = [ this._config ];
	}
	if ( graph._children.hasOwnProperty( 'marks' ) ) {
		graph._children.marks.push( this );
	} else {
		graph._children.marks = [ this ];
	}

	return this;

}; // end FUNCTION Line()

/**
* METHOD: create()
*	Creates a new line element.
*
* @returns {object} line instance
*/
Line.prototype.create = function() {

	var selection = this._parent._root,
		labels = this._config.labels,
		paths;

	// Create the marks group:
	this._root = selection.append( 'svg:g' )
		.attr( 'property', 'marks' )
		.attr( 'class', 'marks' )
		.attr( 'clip-path', 'url(#' + selection.attr( 'data-clipPath' ) + ')' );

	// Add line paths:
	paths = this._root.selectAll( '.line' )
		.data( this._data )
	  .enter().append( 'svg:path' )
		.attr( 'property', 'line' )
		.attr( 'class', 'line' )
		.attr( 'data-label', function ( d, i ) { return labels[ i ]; })
		.attr( 'd', this._path );

	return this;

}; // end METHOD create()

/**
* METHOD: path()
*	Retrieves the line path generator.
*
* @returns {function} line path generator
*/
Line.prototype.path = function() {
	return d3.svg.line();
}; // end METHOD path()


/**
* METHOD: interpolation( mode )
*	Interpolation mode setter and getter. If a mode is supplied, sets the instance interpolation mode. If no mode is supplied, returns the instance interpolation mode.
*
* @param {string} mode - interpolation mode; must be one of the following: linear, linear-closed, step, step-before, step-after, basis, basis-open, basis-closed, bundle, cardinal, cardinal-open, cardinal-closed, monotone.
* @returns {object|string} line instance or interpolation mode
*/
Line.prototype.interpolation = function( mode ) {

	var self = this;

		// https://github.com/mbostock/d3/wiki/SVG-Shapes#wiki-line_interpolate
		rules = 'string|matches[linear,linear-closed,step,step-before,step-after,basis,basis-open,basis-closed,bundle,cardinal,cardinal-open,cardinal-closed,monotone]';

	if ( !arguments.length ) {
		return this._config.interpolation.mode;
	}

	Validator( mode, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'interpolation()::invalid input argument.' );
		}
		self._config.interpolation.mode = mode;
		self._path.interpolate( mode );
	});
	
	return this;

}; // end METHOD interpolation()

/**
* METHOD: tension( value )
*	Interpolation tension setter and getter. If a value is supplied, sets the instance interpolation tension. If no value is supplied, returns the instance interpolation tension.
*
* @param {number} value - interpolation tension; must reside within the interval [0,1].
* @returns {object|number} line instance or interpolation tension
*/
Line.prototype.tension = function( value ) {
	var self = this,
		rules = 'interval[0,1]';

	if ( !arguments.length ) {
		return this._config.interpolation.tension;
	}
	
	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'tension()::invalid input argument.' );
		}
		self._config.interpolation.tension = value;
		self._path.tension( value );
	});

	return this;

}; // end METHOD tension()

/**
* METHOD: labels( arr )
*	Marks labels setter and getter. If a label array is supplied, sets the marks labels. If no label array is supplied, retrieves the marks labels.
*
* @param {array} arr - an array of labels (strings)
* @returns {object|array} line instance or an array of labels
*/
Line.prototype.labels = function ( arr ) {
	var self = this,
		rules = 'array';

	if ( !arguments.length ) {
		return this._config.labels;
	}
	
	Validator( arr, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'labels()::invalid input argument.' );
		}
		self._config.labels = arr;
	});

	return this;

}; // end METHOD labels()


/**
* METHOD: parent()
*	Returns the line parent.
*
* @returns {object} line parent
*/
Line.prototype.parent = function() {
	return this._parent;
}; // end METHOD parent()

/**
* METHOD: config()
*	Returns the line configuration as a JSON blob.
*
* @returns {object} configuration blob
*/
Line.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()

/**
* METHOD: children()
*	Returns the line children.
* 
* @returns {object} line children
*/
Line.prototype.children = function() {
	return this._children;
}; // end METHOD children()