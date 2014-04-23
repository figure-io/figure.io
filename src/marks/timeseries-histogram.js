/**
*
*	MARKS: timeseries histogram
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
*		- 2014/04/21: Created. [AReines].
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

// TIMESERIES HISTOGRAM //

/**
* FUNCTION: TimeseriesHistogram( graph )
*	Timeseries histogram constructor. Creates a new timeseries histogram instance.
*
* @param {object} graph - parent graph instance
* @returns {object} timeseries histogram instance
*/
var TimeseriesHistogram = function( graph ) {

	var binHeight = 0;

	// INSTANCE ATTRIBUTES //

	this._parent = graph;
	this._root = undefined;
	this._children = {};
	this._config = {
		'labels': [],
		'sort': 'ascending'
	};

	// DATA //

	this._data = graph._data;

	// TRANSFORMS //

	binHeight = graph._yScale( 0 ) - graph._yScale( 1 );

	this._transforms = {
		'x': function X( d ) {
			return graph._xScale( d[ 0 ] );
		},
		'y': function Y( d, i ) {
			return graph._yScale( i ) - binHeight;
		},
		'width': function Width( d ) {
			return graph._xScale( d[ 2 ] ) - graph._xScale( d[ 0 ]);
		},
		'height': binHeight,
		'color': function Color( d ) {
			return graph._zScale( d[ 1 ] );
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

}; // end FUNCTION TimeseriesHistogram()

/**
* METHOD: create()
*	Creates a new timeseries histogram element.
*
* @returns {object} timseries histogram instance
*/
TimeseriesHistogram.prototype.create = function() {

	var self = this,
		selection = this._parent._root,
		labels = this._config.labels,
		histograms, bins;

	// Create a marks group:
	this._root = selection.append( 'svg:g' )
		.attr( 'property', 'marks' )
		.attr( 'class', 'marks' )
		.attr( 'clip-path', 'url(#' + selection.attr( 'data-clipPath' ) + ')' )
		.attr( 'transform', 'translate( ' + 0 + ', ' + 0 + ')' );

	// Add histograms:
	histograms = this._root.selectAll( '.histogram' )
		.data( this._data )
	  .enter().append( 'svg:g' )
	  	.attr( 'property', 'histogram' )
	  	.attr( 'class', 'histogram' )
		.attr( 'data-label', function ( d, i ) { return labels[ i ]; })
		.attr( 'transform', function ( d, i ) {
			return 'translate( 0,' + self._transforms.y( d, i ) + ' )';
		});

	// Add bins:
	bins = histograms.selectAll( '.bin' )
		.data( function ( d ) {
			return d;
		})
	  .enter().append( 'svg:rect' )
		.attr( 'property', 'bin' )
		.attr( 'class', 'bin' )
		.attr( 'x', this._transforms.x )
		.attr( 'y', 0 )
		.attr( 'width', this._transforms.width )
		.attr( 'height', this._transforms.height )
		.style( 'fill', this._transforms.color );

	return this;

}; // end METHOD create()

/**
* METHOD: labels( arr )
*	Marks labels setter and getter. If a label array is supplied, sets the marks labels. If no label array is supplied, retrieves the marks labels.
*
* @param {array} arr - an array of labels (strings)
* @returns {object|array} instance object or an array of labels
*/
TimeseriesHistogram.prototype.labels = function ( arr ) {
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
*	Returns the timeseries histogram parent.
*
* @returns {object} timeseries histogram parent
*/
TimeseriesHistogram.prototype.parent = function() {
	return this._parent;
}; // end METHOD parent()

/**
* METHOD: config()
*	Returns the timeseries histogram configuration as a JSON blob.
*
* @returns {object} configuration blob
*/
TimeseriesHistogram.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()

/**
* METHOD: children()
*	Returns the timeseries histogram children.
* 
* @returns {object} timeseries histogram children
*/
TimeseriesHistogram.prototype.children = function() {
	return this._children;
}; // end METHOD children()