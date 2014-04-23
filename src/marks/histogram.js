
// HISTOGRAM //

/**
* FUNCTION: Histogram( graph )
*	Histogram constructor. Creates a new histogram instance.
*
* @param {object} graph - parent graph instance
* @returns {object} histogram instance
*/
var Histogram = function( graph ) {

	// INSTANCE ATTRIBUTES //

	this._parent = graph;
	this._root = undefined;
	this._children = {};
	this._config = {
		"padding": "1",
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
		},
		'width': function Width( d ) {
			return graph._xScale( d[ 2 ] ) - graph._xScale( d[ 0 ]);
		},
		'height': function Height( d ) {
			return graph._config.height - graph._yScale( d[ 1 ] );
		}
	};

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

}; // end FUNCTION Histogram()

/**
* METHOD: create()
*	Creates a new histogram element.
*
* @returns {object} histogram instance
*/
Histogram.prototype.create = function() {

	var selection = this._parent._root,
		labels = this._config.labels,
		columns;

	// Create a marks group:
	this._root = selection.selectAll( '.marks' )
		.data( this._data )
	  .enter().append( 'svg:g' )
		.attr( 'property', 'marks' )
		.attr( 'class', 'marks' )
		.attr( 'data-label', function( d, i ) { return labels[ i ]; })
		.attr( 'clip-path', 'url(#' + selection.attr( 'data-clipPath' ) + ')' );

	// Add columns:
	columns = this._root.selectAll( '.column' )
		.data( function ( d ) { return d; })
	  .enter().append( 'svg:rect' )
		.attr( 'property', 'column' )
		.attr( 'class', 'column' )
		.attr( 'x', this._transforms.x )
		.attr( 'y', this._transforms.y )
		.attr( 'width', this._transforms.width )
		.attr( 'height', this._transforms.height );

	// Add tooltips:
	columns.append( 'svg:title' )
		.attr( 'class', 'tooltip' )
		.text( function ( d ) {
			return Math.round( d[ 1 ] );
		});

	return this;

}; // end METHOD create()

/**
* METHOD: padding( value )
*	Column padding setter and getter. If a value is supplied, sets the instance column padding. If no value is supplied, returns the instance column padding.
*
* @param {number} value - column padding
* @returns {object|number} histogram instance or column padding
*/
Histogram.prototype.padding = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config.padding;
	}
	
	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'padding()::invalid input argument.' );
		}
		self._config.padding = value;
	});

	return this;

}; // end METHOD padding()

/**
* METHOD: labels( arr )
*	Marks labels setter and getter. If a label array is supplied, sets the marks labels. If no label array is supplied, retrieves the marks labels.
*
* @param {array} arr - an array of labels (strings)
* @returns {object|array} histogram instance or an array of labels
*/
Histogram.prototype.labels = function ( arr ) {
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
*	Returns the histogram parent.
*
* @returns {object} histogram parent
*/
Histogram.prototype.parent = function() {
	return this._parent;
}; // end METHOD parent()

/**
* METHOD: config()
*	Returns the histogram configuration as a JSON blob.
*
* @returns {object} configuration blob
*/
Histogram.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()

/**
* METHOD: children()
*	Returns the histogram children.
* 
* @returns {object} histogram children
*/
Histogram.prototype.children = function() {
	return this._children;
}; // end METHOD children()