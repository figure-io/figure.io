
// RUG //

/**
* FUNCTION: Rug( graph )
*	Rug plot constructor. Creates a new rug instance.
*
* @constructor
* @param {object} graph - parent graph instance
* @returns {object} rug instance
*/
function Rug( graph ) {

	// INSTANCE ATTRIBUTES //

	this._parent = graph;
	this._root = undefined;
	this._children = {};
	this._config = {
		"type": "rug",
		"size": 6,
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
			return d[ 1 ];
		}
	};

	// GENERATOR //

	this._path = this.path()
		.x( this._transforms.x )
		.y( this._transforms.y );

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
} // end FUNCTION Rug()

/**
* METHOD: create()
*	Creates a new rug element.
*
* @returns {object} instance object
*/
Rug.prototype.create = function() {
	var selection = this._parent._root,
		height = this._parent._config.scales[ 1 ].range.max,
		labels = this._config.labels,
		rug, paths,
		tickSize = this._config.size;

	// Create the marks group:
	this._root = selection.append( 'svg:g' )
		.attr( 'property', 'marks' )
		.attr( 'class', 'marks' )
		.attr( 'clip-path', 'url(#' + selection.attr( 'data-clipPath' ) + ')' );

	// Create a rug group:
	rug = this._root.selectAll( '.rug' )
		.data( this._data )
	  .enter().append( 'svg:g' )
		.attr( 'property', 'rug' )
		.attr( 'class', 'rug' )
		.attr( 'data-label', function ( d, i ) { return labels[ i ]; })
		.attr( 'transform', 'translate(0,' + ( height - tickSize ) + ')' );

	// Add rug paths:
	paths = rug.selectAll( '.line' )
		.data( function ( d ) {
			return d.map( function ( d ) {
				return [ [ d, 0 ], [ d, tickSize ] ];
			});
		})
	  .enter().append( 'svg:path' )
		.attr( 'property', 'line' )
		.attr( 'class', 'line' )
		.attr( 'd', this._path );

	return this;
}; // end METHOD create()

/**
* METHOD: path()
*	Retrieves the rug path generator.
*
* @returns {function} rug path generator
*/
Rug.prototype.path = function() {
	return d3.svg.line();
}; // end METHOD path()

/**
* METHOD: size( value )
*	Rug tick (tassel) size setter and getter. If a value is supplied, sets the instance tick size. If no value is supplied, returns the instance tick size.
*
* @param {number} value - rug tick size
* @returns {object|number} instance object or rug tick size
*/
Rug.prototype.size = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config.size;
	}
	
	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'size()::invalid input argument.' );
		}
		self._config.size = value;
	});

	return this;
}; // end METHOD size()

/**
* METHOD: labels( arr )
*	Marks labels setter and getter. If a label array is supplied, sets the marks labels. If no label array is supplied, retrieves the marks labels.
*
* @param {array} arr - an array of labels (strings)
* @returns {object|array} instance object or an array of labels
*/
Rug.prototype.labels = function ( arr ) {
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
*	Returns the rug parent.
*
* @returns {object} rug parent
*/
Rug.prototype.parent = function() {
	return this._parent;
}; // end METHOD parent()

/**
* METHOD: config()
*	Returns the rug configuration as a JSON blob.
*
* @returns {object} configuration blob
*/
Rug.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()

/**
* METHOD: children()
*	Returns the rug children.
* 
* @returns {object} rug children
*/
Rug.prototype.children = function() {
	return this._children;
}; // end METHOD children()