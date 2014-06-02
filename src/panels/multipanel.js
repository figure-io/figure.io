
// MULTIPANEL //

/**
* FUNCTION: Multipanel( canvas )
*	Multipanel constructor. Creates a new multipanel instance.
*
* @constructor
* @param {object} canvas - parent canvas instance
* @returns {object} multipanel instance
*/
function Multipanel( canvas ) {

	Panel.call( this, canvas );

	// REGISTER //
	if ( canvas._config.hasOwnProperty( 'multipanel' ) ) {
		canvas._config.multipanel.push( this._config );
	} else {
		canvas._config.multipanel = [ this._config ];
	}
	if ( canvas._children.hasOwnProperty( 'multipanel' ) ) {
		canvas._children.multipanel.push( this );
	} else {
		canvas._children.multipanel = [ this ];
	}

	return this;

} // end FUNCTION Multipanel()

/**
* PROTOTYPE: panel
*	Multipanel extends the panel class.
*/
Multipanel.prototype = Object.create( Panel.prototype );
Multipanel.prototype.constructor = Multipanel;

/**
* METHOD: create( type )
*	Creates a new multipanel element and appends to a canvas element. Option to define the multipanel graph type.
*
* @param {string} type - multipanel type
* @returns {object} multipanel instance
*/
Multipanel.prototype.create = function( type ) {
	var config = this._config,
		selection = this._parent._root,
		position = config.position,
		height = config.height,
		padding = config.padding.top,
		graphHeight, top,
		graph, axes,
		total = this._data.length,
		xAxisFLG;

	// MULTIPANEL //

	// Create the multipanel element:
	this._root = selection.append( 'svg:g' )
		.attr( 'property', 'multipanel' )
		.attr( 'class', 'multipanel' )
		.attr( 'transform', 'translate(' + position.left + ',' + position.top + ')' );

	// FIXME: make graph height calculation robust.

	// Compute the graph height: (NOTE: 54 is a fudge factor to allow for x-axis ticks and labels; depending on font-size, tick padding, and tick sizes, this may not be correct.)
	graphHeight = Math.floor( ( height-54-padding*(total-1) ) / total );

	config.scales[ 1 ].range.max = graphHeight;

	// Create the graphs and axes:
	for ( var i = 0; i < total; i++ ) {

		// Formatting flags:
		xAxisFLG = false;
		if ( i === total-1 ) {
			xAxisFLG = true;
		}

		// Graph vertical position:
		top = (graphHeight+padding) * i;

		// Graph:
		graph = this._graph( graphHeight, top, this._data[ i ] );

		// Axes:
		axes = this._axes( graph, xAxisFLG );
	} // end FOR i

	return this;
}; // end METHOD create()

/**
* METHOD: _graph( height, top, data )
*	Creates and configures a graph instance.
*
* @private
* @param {number} height - graph height
* @param {number} top - vertical displacement
* @param {Data} data - data instance
* @returns {Graph} graph instance
*/
Multipanel.prototype._graph = function( height, top, data ) {
	var graph = new Graph( this ),
		config = this._config;

	graph.width( config.width )
		.height( height )
		.position({
			'left': 0,
			'top': top
		})
		.xMin( config.scales[ 0 ].domain.min )
		.xMax( config.scales[ 0 ].domain.max )
		.yMin( config.scales[ 1 ].domain.min )
		.yMax( config.scales[ 1 ].domain.max )
		.xRange([
			config.scales[ 0 ].range.min,
			config.scales[ 0 ].range.max
		])
		.yRange([
			config.scales[ 1 ].range.max,
			config.scales[ 1 ].range.min
		])
		.xScale( config.scales[ 0 ].type )
		.yScale( config.scales[ 1 ].type )
		.background( config.background )
		.data( data );

	return graph.create();
}; // end METHOD _graph()

/**
* METHOD: _axes( parent, FLG )
*	Creates and configures an axes instance.
*
* @private
* @param {Graph} graph instance
* @param {boolean} FLG - x-axis flag
* @returns {Axes} axes instance
*/
Multipanel.prototype._axes = function createAxes( parent, FLG ) {
	var axes = new Axes( parent ),
		config = this._config;

	// Configure the axes:
	axes.yLabel( config.axes[ 1 ].label )
		.yTickFormat( config.axes[ 1 ].ticks.format )
		.xNumTicks( config.axes[ 0 ].ticks.num )
		.yNumTicks( config.axes[ 1 ].ticks.num )
		.xTickPadding( config.axes[ 0 ].ticks.padding )
		.yTickPadding( config.axes[ 1 ].ticks.padding )
		.xTickRotation( config.axes[ 0 ].ticks.rotation )
		.yTickRotation( config.axes[ 1 ].ticks.rotation )
		.xInnerTickSize( config.axes[ 0 ].ticks.innerSize )
		.yInnerTickSize( config.axes[ 1 ].ticks.innerSize )
		.xOuterTickSize( config.axes[ 0 ].ticks.outerSize )
		.yOuterTickSize( config.axes[ 1 ].ticks.outerSize )
		.xTickDirection( config.axes[ 0 ].ticks.direction )
		.yTickDirection( config.axes[ 1 ].ticks.direction )
		.xTickDisplay( FLG )
		.yTickDisplay( config.axes[ 1 ].ticks.display )
		.xAxisOrient( config.axes[ 0 ].orient )
		.yAxisOrient( config.axes[ 1 ].orient )
		.xAxisDisplay( config.axes[ 0 ].display )
		.yAxisDisplay( config.axes[ 1 ].display );

	// Show x-axis tick labels:
	if ( FLG ) {
		axes.xLabel( config.axes[ 0 ].label )
			.xTickFormat( config.axes[ 0 ].ticks.format );
	} else {
		axes.xLabel( '' )
			.xTickFormat( '' );
	}

	// Create the axes:
	return axes.create();
}; // end METHOD _axes()
