/**
*
*	GRAPH
*
*
*	DESCRIPTION:
*		- Defines an SVG graph layer interface for graphs having quantitative scales.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1] setting min/max updates the domain which may encounter an edge case when domain.length > 2 and the provided value is not an extreme. The common case is a 2-element domain. But for, say, 2dhist this may lead to odd results. User be warned.
*		[2] We should check that the parent root element is an SVG. How will a canvas graph be treated? --> probably a different library entirely
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

// MODULES //

var // Event emitter class:
	EventEmitter = require( 'events' ).EventEmitter,

	// Data visualization library:
	d3 = require( 'd3' ),

	// Module for generating UUIDs:
	uuid = require( 'node-uuid' );


// FUNCTIONS //

/**
* FUNCTION: register( parent, child )
*	Registers a child with a parent.
*
* @private
* @param {Canvas} parent - parent canvas
* @param {Graph} child - child instance
*/
function register( parent, child ) {
	var config = parent._config,
		children = parent._children;

	if ( !Array.isArray( config.graph ) ) {
		config.graph = [];
	}
	config.graph.push( child._config );

	if ( !Array.isArray( children.graph ) ) {
		children.graph = [];
	}
	children.graph.push( child );
} // end FUNCTION register()


// GRAPH //

/**
* FUNCTION: Graph( canvas )
*	Graph constructor.
*
* @constructor
* @param {Canvas} canvas - parent canvas
* @returns {Graph} Graph instance
*/
function Graph( canvas ) {
	EventEmitter.call( this );

	// Cache a reference to the parent canvas:
	this._parent = canvas;

	// Initialize a cache to store children:
	this._children = {};

	// Graph configuration...
	this._config = {
		'height': 400,
		'width': 600,
		'position': {
			'top': 80,
			'left': 90
		},
		'background': false,
		'scales': [
			{
				'name': 'x',
				'type': 'linear',
				'domain': [ 0, 1 ],
				'range': [ 0, 600 ]
			},
			{
				'name': 'y',
				'type': 'linear',
				'domain': [ 0, 1 ],
				'range': [ 400, 0 ]
			},
			{
				'name': 'z',
				'type': 'linear',
				'domain': [ 0, 1 ],
				'range': [ 0, 1 ]
			}
		]
	};

	// Graph data...
	this._data = null;

	// Scales...
	this._xScale = d3.scale.linear()
		.domain( [ 0, 1 ] )
		.range( [ 0, 600 ] );
	this._yScale = d3.scale.linear()
		.domain( [ 0, 1 ] )
		.range( [ 400, 0 ] );
	this._zScale = d3.scale.linear()
		.domain( [ 0, 1 ] )
		.range( [ 0, 1 ] );

	// Initialize a cache for DOM elements...
	this.$ = {
		'root': null
	};
	this._clipPathID = uuid.v4();

	// Register with the parent...
	register( canvas, this );

	return this;
} // end FUNCTION Canvas()

/**
* Create a prototype which inherits from the parent prototype.
*/
Graph.prototype = Object.create( EventEmitter.prototype );

/**
* Set the constructor.
*/
Graph.prototype.constructor = Graph;

/**
* METHOD: create( [type] )
*	Creates a new graph element and appends to the parent canvas.
*
* @param {String} [type] - graph type
* @returns {Graph} Graph instance
*/
Graph.prototype.create = function( type ) {
	var el = this._parent.$.root,
		pos = this._config.position,
		width = this._config.width,
		height = this._config.height;

	// Create the clip-path:
	this.$.clipPath = el.append( 'svg:defs' )
		.append( 'svg:clipPath' )
			.attr( 'id', this._clipPathID )
			.append( 'svg:rect' )
				.attr( 'class', 'clipPath' )
				.attr( 'width', width )
				.attr( 'height', height );

	// Create the graph element:
	this.$.root = el.append( 'svg:g' )
		.attr( 'property', 'graph' )
		.attr( 'class', 'graph' )
		.attr( 'data-graph-type', ( type ) ? type : '' )
		.attr( 'data-clipPath', this._clipPathID )
		.attr( 'transform', 'translate(' + pos.left + ',' + pos.top + ')' );

	// Create the background:
	if ( this._config.background ) {
		this.$.bkgd = this.$.root.append( 'svg:rect' )
			.attr( 'class', 'background' )
			.attr( 'x', 0 )
			.attr( 'y', 0 )
			.attr( 'width', width )
			.attr( 'height', height );
	}
	return this;
}; // end METHOD create()

/**
* METHOD: width( [width] )
*	Width setter and getter. If provided a value, sets the graph width. If not provided a value, returns the graph width.
*
* @param {Number} [width] - graph width
* @returns {Graph|Number} Graph instance or graph width
*/
Graph.prototype.width = function( width ) {
	var range;
	if ( !arguments.length ) {
		return this._config.width;
	}
	if ( typeof width !== 'number' || width !== width || width <= 0 ) {
		throw new TypeError( 'width()::invalid input argument. Must be a number greater than 0. Value: `' + width + '`.' );
	}
	this._config.width = width;

	if ( this.$.clipPath ) {
		this.$.clipPath.attr( 'width', width );
	}
	if ( this.$.bkgd ) {
		this.$.bkgd.attr( 'width', width );
	}
	this.emit( 'width', width );

	range = this._config.scales[ 0 ].range;
	if ( range.length === 2 ) {
		// NOTE: assume standard use case of a min/max (2-element) domain...
		range[ 1 ] = width;
		this._xScale.range( range );
		// WARNING: two events being emitted from same fcn. Could lead to duplicated callback invocation.
		this.emit( 'xRange', range );
	}
	return this;
}; // end METHOD width()

/**
* METHOD: height( [height] )
*	Height setter and getter. If provided a value, sets the graph height. If not provided a value, returns the graph height.
*
* @param {Number} [height] - graph height
* @returns {Graph|Number} Graph instance or graph height
*/
Graph.prototype.height = function( height ) {
	var range;
	if ( !arguments.length ) {
		return this._config.height;
	}
	if ( typeof height !== 'number' || height !== height || height <= 0 ) {
		throw new TypeError( 'height()::invalid input argument. Must be a number greater than 0. Value: `' + height + '`.' );
	}
	this._config.height = height;

	if ( this.$.clipPath ) {
		this.$.clipPath.attr( 'height', height );
	}
	if ( this.$.bkgd ) {
		this.$.bkgd.attr( 'height', height );
	}
	this.emit( 'height', height );

	range = this._config.scales[ 1 ].range;
	if ( range.length === 2 ) {
		// WARNING: assume standard use case of a min/max (2-element) domain...
		range[ 0 ] = height;
		this._yScale.range( range );
		// WARNING: two events being emitted from same fcn. Could lead to duplicated callback invocation.
		this.emit( 'yRange', range );
	}
	return this;
}; // end METHOD height()

/**
* METHOD: xMin( [xMin] )
*	xMin setter and getter. If provided a value, sets the graph xMin. If not provided a value, returns the graph xMin.
*
* @param {Number|String|Date|Null} [xMin] - graph xMin
* @returns {Graph|Number|String|Date|Null} graph instance or xMin
*/
Graph.prototype.xMin = function( xMin ) {
	var domain = this._config.scales[ 0 ].domain,
		type,
		d;

	if ( !arguments.length ) {
		return domain[ 0 ];
	}
	type = typeof xMin;
	if ( ( type !== 'number' || xMin !== xMin ) && type !== 'string' && xMin !== null && !( xMin instanceof Date ) ) {
		throw new TypeError( 'xMin()::invalid input argument. Must be either a string, number, Date, or null. Value: `' + xMin + '`.' );
	}
	// [0] Update the configuration:
	domain[ 0 ] = xMin;

	// [1] If the min is null and we have data, compute the min...
	if ( xMin === null && this._data ) {
		xMin = this._data.min( 'x' );
	}
	// [2] Update the xScale domain: (WARNING: we assume that setting the min should update the domain!)
	d = this._xScale.domain();
	d[ 0 ] = xMin;
	this._xScale.domain( d );

	// [3] Emit that the min has updated:
	this.emit( 'xDomain', d );
	return this;
}; // end METHOD xMin()

/**
* METHOD: xMax( [xMax] )
*	xMax setter and getter. If provided a value, sets the graph xMax. If not provided a value, returns the graph xMax.
*
* @param {Number|String|Date|Null} [xMax] - graph xMax
* @returns {Graph|Number|String|Date|Null} graph instance or xMin
*/
Graph.prototype.xMax = function( xMax ) {
	var domain = this._config.scales[ 0 ].domain,
		type,
		d;

	if ( !arguments.length ) {
		return domain[ 1 ];
	}
	type = typeof xMax;
	if ( ( type !== 'number' || xMax !== xMax ) && type !== 'string' && xMax !== null && !( xMax instanceof Date ) ) {
		throw new TypeError( 'xMax()::invalid input argument. Must be either a string, number, Date, or null. Value: `' + xMax + '`.' );
	}
	// [0] Update the configuration:
	domain[ domain.length-1 ] = xMax;

	// [1] If the max is null and we have data, calculate the max...
	if ( xMax === null && this._data ) {
		xMax = this._data.max( 'x' );
	}
	// [2] Update the xScale domain: (WARNING: we assume that setting the max should update the domain!)
	d = this._xScale.domain();
	d[ d.length-1 ] = xMax;
	this._xScale.domain( d );

	// [3] Emit that the max has updated:
	this.emit( 'xDomain', d );
	return this;
}; // end METHOD xMax()

/**
* METHOD: yMin( [yMin] )
*	yMin setter and getter. If provided a value, sets the graph yMin. If not provided a value, returns the graph yMin.
*
* @param {Number|Null} [yMin] - graph yMin
* @returns {Graph|Number|Null} graph instance or yMin
*/
Graph.prototype.yMin = function( yMin ) {
	var domain = this._config.scales[ 1 ].domain,
		type,
		d;

	if ( !arguments.length ) {
		return domain[ 0 ];
	}
	type = typeof yMin;
	if ( ( type !== 'number' || yMin !== yMin ) && yMin !== null ) {
		throw new TypeError( 'yMin()::invalid input argument. Must be either a number or null. Value: `' + yMin + '`.' );
	}
	// [0] Update the configuration:
	domain[ 0 ] = yMin;

	// [1] If the min is null and we have data, calculate the min...
	if ( yMin === null && this._data ) {
		yMin = this._data.min( 'y' );
	}
	// [2] Update the domain: (WARNING: we assume that setting the min should update the domain!)
	d = this._yScale.domain();
	d[ 0 ] = yMin;
	this._yScale.domain( d );

	// [3] Emit that the yMin has updated:
	this.emit( 'yDomain', d );
	return this;
}; // end METHOD yMin()

/**
* METHOD: yMax( [yMax] )
*	yMax setter and getter. If provided a value, sets the graph yMax. If not provided a value, returns the graph yMax.
*
* @param {Number|Null} [yMax] - graph yMax
* @returns {Graph|Number|Null} graph instance or yMax
*/
Graph.prototype.yMax = function( yMax ) {
	var domain = this._config.scales[ 1 ].domain,
		type,
		d;

	if ( !arguments.length ) {
		return domain[ 1 ];
	}
	type = typeof yMax;
	if ( ( type !== 'number' || yMax !== yMax ) && yMax !== null ) {
		throw new TypeError( 'yMax()::invalid input argument. Must be either a number or null. Value: `' + yMax + '`.' );
	}
	// [0] Update the configuration:
	domain[ domain.length-1 ] = yMax;

	// [1] If the max is null and we have data, calculate the max...
	if ( yMax === null && this._data ) {
		yMax = this._data.max( 'y' );
	}
	// [2] Update the domain: (WARNING: we assume setting the max should update the domain!)
	d = this._yScale.domain();
	d[ d.length-1 ] = yMax;
	this._yScale.domain( d );

	// [3] Emit that the max has updated:
	this.emit( 'yDomain', d );
	return this;
}; // end METHOD yMax()

/**
* METHOD: zMin( [zMin] )
*	zMin setter and getter. If provided a value, sets the graph zMin. If not provided a value, returns the graph zMin.
*
* @param {Number|Null} [zMin] - graph zMin
* @returns {Graph|Number|Null} graph instance or zMin
*/
Graph.prototype.zMin = function( zMin ) {
	var domain = this._config.scales[ 2 ].domain,
		type,
		d;

	if ( !arguments.length ) {
		return domain[ 0 ];
	}
	type = typeof zMin;
	if ( ( type !== 'number' || zMin !== zMin ) && zMin !== null ) {
		throw new TypeError( 'zMin()::invalid input argument. Must be either a number or null. Value: `' + zMin + '`.' );
	}
	// [0] Update the configuration:
	domain[ 0 ] = zMin;

	// [1] If the min is null and we have data, calculate the min...
	if ( zMin === null && this._data ) {
		zMin = this._data.min( 'z' );
	}
	// [2] Update the domain: (WARNING: we assume setting the max should update the domain!)
	d = this._zScale.domain();
	d[ 0 ] = zMin;
	this._zScale.domain( d );

	// [3] Emit that the min has updated:
	this.emit( 'zDomain', d );
	return this;
}; // end METHOD zMin()

/**
* METHOD: zMax( [zMax] )
*	zMax setter and getter. If provided a value, sets the graph zMax. If not provided a value, returns the graph zMax.
*
* @param {Number|Null} [zMax] - graph zMax
* @returns {Graph|Number|Null} graph instance or zMax
*/
Graph.prototype.zMax = function( zMax ) {
	var domain = this._config.scales[ 2 ].domain,
		type,
		d;

	if ( !arguments.length ) {
		return domain[ 1 ];
	}
	type = typeof zMax;
	if ( ( type !== 'number' || zMax !== zMax ) && zMax !== null ) {
		throw new TypeError( 'zMax()::invalid input argument. Must be either a number or null. Value: `' + zMax + '`.' );
	}
	// [0] Update the configuration:
	domain[ domain.length-1 ] = zMax;

	// [1] If the max is null and we have data, calculate the max...
	if ( zMax === null && this._data ) {
		zMax = this._data.max( 'z' );
	}
	// [2] Update the domain: (WARNING: we assume that setting the max should update the domain!)
	d = this._zScale.domain();
	d[ d.length-1 ] = zMax;
	this._zScale.domain( d );

	// [3] Emit that the max has updated:
	this.emit( 'zDomain', d );
	return this;
}; // end METHOD zMax()

/**
* METHOD: xDomain( [arr] )
*	xDomain setter and getter. If provided an array, sets the x-domain. If not provided a value, returns the x-domain.
*
* @param {Array} [arr] - x-domain
* @returns {Graph|Array} Graph instance or x-domain
*/
Graph.prototype.xDomain = function( arr ) {
	var scale = this._config.scales[ 0 ];
	if ( !arguments.length ) {
		// Return the configured domain (this may differ from the displayed domain):
		return scale.domain;
	}
	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'xDomain()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
	}
	scale.domain = arr;
	this._xScale.domain( arr );
	this.emit( 'xDomain', arr );
	return this;
}; // end METHOD xDomain()

/**
* METHOD: yDomain( [arr] )
*	yDomain setter and getter. If provided an array, sets the y-domain. If not provided a value, returns the y-domain.
*
* @param {Array} [arr] - y-domain
* @returns {Graph|Array} Graph instance or y-domain
*/
Graph.prototype.yDomain = function( arr ) {
	var scale = this._config.scales[ 1 ];
	if ( !arguments.length ) {
		// Return the configured domain (this may differ from the displayed domain):
		return scale.domain;
	}
	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'yDomain()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
	}
	scale.domain = arr;
	this._yScale.domain( arr );
	this.emit( 'yDomain', arr );
	return this;
}; // end METHOD yDomain()

/**
* METHOD: zDomain( [arr] )
*	zDomain setter and getter. If provided an array, sets the z-domain. If not provided a value, returns the z-domain.
*
* @param {Array} [arr] - z-domain
* @returns {Graph|Array} Graph instance or z-domain
*/
Graph.prototype.zDomain = function( arr ) {
	var scale = this._config.scales[ 2 ];
	if ( !arguments.length ) {
		// Return the configured domain (this may differ from the displayed domain):
		return scale.domain;
	}
	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'zDomain()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
	}
	scale.domain = arr;
	this._zScale.domain( arr );
	this.emit( 'zDomain', arr );
	return this;
}; // end METHOD zDomain()

/**
* METHOD: xRange( [arr] )
*	xRange setter and getter. If provided an array, sets the graph x-range. If not provided a value, returns the graph x-range.
*
* @param {Array} [arr] - array defining the x-range
* @returns {Graph|Array} Graph instance or x-range
*/
Graph.prototype.xRange = function( arr ) {
	var scale = this._config.scales[ 1 ];
	if ( !arguments.length ) {
		return scale.range;
	}
	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'xRange()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
	}
	scale.range = arr;
	this._xScale.range( arr );
	this.emit( 'xRange', arr );
	return this;
}; // end METHOD xRange()

/**
* METHOD: yRange( [arr] )
*	yRange setter and getter. If provided an array, sets the graph y-range. If not provided a value, returns the graph y-range.
*
* @param {Array} [arr] - array defining the y-range
* @returns {Graph|Array} Graph instance or y-range
*/
Graph.prototype.yRange = function( arr ) {
	var scale = this._config.scales[ 1 ];
	if ( !arguments.length ) {
		return scale.range;
	}
	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'yRange()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
	}
	scale.range = arr;
	this._yScale.range( arr );
	this.emit( 'yRange', arr );
	return this;
}; // end METHOD yRange()

/**
* METHOD: zRange( [arr] )
*	zRange setter and getter. If provided an array, sets the graph z-range. If not provided a value, returns the graph z-range.
*
* @param {Array} [arr] - array defining the z-range
* @returns {Graph|Array} Graph instance or z-range
*/
Graph.prototype.zRange = function( arr ) {
	var scale = this._config.scales[ 2 ];
	if ( !arguments.length ) {
		return scale.range;
	}
	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'zRange()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
	}
	scale.range = arr;
	this._zScale.range( arr );
	this.emit( 'zRange', arr );
	return this;
}; // end METHOD zRange()



/**
* METHOD: parent()
*	Returns the graph parent.
*
* @returns {Canvas} parent canvas
*/
Graph.prototype.parent = function() {
	return this._parent;
}; // end METHOD parent()

/**
* METHOD: config()
*	Returns the graph configuration as a JSON blob.
*
* @returns {Object} configuration blob
*/
Graph.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()

/**
* METHOD: children()
*	Returns the graph children.
*
* @returns {Object} graph children
*/
Graph.prototype.children = function() {
	return this._children;
}; // end METHOD children()


// EXPORTS //

module.exports = Graph;
