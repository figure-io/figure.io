
// GRIDPANEL //

/**
* FUNCTION: Gridpanel( canvas )
*	Gridpanel constructor. Creates a new gridpanel instance.
*
* @constructor
* @param {object} canvas - parent canvas instance
* @returns {object} gridpanel instance
*/
function Gridpanel( canvas ) {

	Panel.call( this, canvas );

	this._config.padding.top = 25;
	this._config.padding.left = 40;

	this._config.rows = 1;
	this._config.cols = 1;

	// REGISTER //
	if ( canvas._config.hasOwnProperty( 'gridpanel' ) ) {
		canvas._config.gridpanel.push( this._config );
	} else {
		canvas._config.gridpanel = [ this._config ];
	}
	if ( canvas._children.hasOwnProperty( 'gridpanel' ) ) {
		canvas._children.gridpanel.push( this );
	} else {
		canvas._children.gridpanel = [ this ];
	}

	return this;

} // end FUNCTION Gridpanel()

/**
* PROTOTYPE: panel
*	Gridpanel extends the panel class.
*/
Gridpanel.prototype = Object.create( Panel.prototype );
Gridpanel.prototype.constructor = Gridpanel;

/**
* METHOD: create()
*	Creates a new gridpanel element and appends to a canvas element.
*
* @returns {object} gridpanel instance
*/
Gridpanel.prototype.create = function() {
	var config = this._config,
		selection = this._parent._root,
		position = config.position,
		width = config.width,
		height = config.height,
		padding = config.padding,
		numRows = config.rows,
		numCols = config.cols,
		graphWidth, graphHeight,
		left, top,
		graph, axes,
		row, col,
		total = this._data.length,
		xAxisFLG, yAxisFLG;

	// Check!
	if ( total > numRows*numCols ) {
		throw new Error( 'create()::data number exceeds grid size. Total: ' + total + '; Grid: ' + numRows + 'x' + numCols + '.' );
	}

	// Create the gridpanel element:
	this._root = selection.append( 'svg:g' )
		.attr( 'property', 'panel' )
		.attr( 'class', 'panel' )
		.attr( 'transform', 'translate(' + position.left + ',' + position.top + ')' );

	// FIXME: make graph dimension calculation robust.

	// Compute graph dimensions: (NOTE: 54 is a fudge factor to allow for ticks and labels; depending on font-size, tick padding, and tick sizes, this may not be correct.)
	graphWidth = Math.floor( ( width-54-padding.left*(numCols-1) ) / numCols );
	graphHeight = Math.floor( ( height-54-padding.top*(numRows-1) ) / numRows );

	config.scales[ 0 ].range.max = graphWidth;
	config.scales[ 1 ].range.max = graphHeight;

	// Create the graphs and axes in an NxM grid...
	for ( var i = 0; i < total; i++ ) {

		// Get the row and column number:
		row = Math.floor( i / numRows );
		col = i % numCols;

		// Formatting flags:
		xAxisFLG = false;
		if ( row === numRows-1 ) {
			xAxisFLG = true;
		}
		yAxisFLG = false;
		if ( col === 0 ) {
			yAxisFLG = true;
		}

		// Graph vertical position:
		top = (graphHeight+padding.top) * row;

		// Graph horizontal position:
		left = (graphWidth+padding.left) * col;

		// Graph:
		graph = this._graph( graphWidth, graphHeight, left, top, this._data[ i ] );

		// Axes:
		axes = this._axes( graph, xAxisFLG, yAxisFLG );
	} // end FOR i

	return this;
}; // end METHOD create()

/**
* METHOD: _graph( width, height, left, top, data )
*	Creates and configures a graph instance.
*
* @private
* @param {number} graph width
* @param {number} graph height
* @param {number} left displacement
* @param {number} top displacement
* @param {Data} data instance
* @returns {Graph} graph instance
*/
Gridpanel.prototype._graph = function( width, height, left, top, data ) {
	var graph = new Graph( this ),
		config = this._config;

	graph.width( width )
		.height( height )
		.position({
			'left': left,
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
* METHOD: _axes( parent, xFLG, yFLG )
*	Creates and configures an axes instance.
*
* @private
* @param {Graph} parent - graph instance
* @param {boolean} xFLG - x-axis flag
* @param {boolean} yFLG - y-axis flag
* @returns {Axes} axes instance
*/
Gridpanel.prototype._axes = function createAxes( graph, xAxisFLG, yAxisFLG ) {
	var axes = new Axes( graph ),
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
		.xTickDisplay( xAxisFLG )
		.yTickDisplay( config.axes[ 1 ].ticks.display )
		.xAxisOrient( config.axes[ 0 ].orient )
		.yAxisOrient( config.axes[ 1 ].orient )
		.xAxisDisplay( config.axes[ 0 ].display );

	// Show x-axis tick labels:
	if ( xAxisFLG ) {
		axes.xLabel( config.axes[ 0 ].label )
			.xTickFormat( config.axes[ 0 ].ticks.format );
	} else {
		axes.xLabel( '' )
			.xTickFormat( '' );
	}
	if ( yAxisFLG ) {
		axes.yAxisDisplay( config.axes[ 1 ].display );
	} else  {
		axes.yAxisDisplay( false );
	}

	// Create the axes:
	return axes.create();
}; // end METHOD _axes()

/**
* METHOD: rows( value )
*	Number of rows setter and getter. If a value is supplied, defines the number of rows. If no value is supplied, returns the number of rows.
*
* @param {number} value - number of rows.
* @returns {object|number} - panel instance or number of rows
*/
Gridpanel.prototype.rows = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config.rows;
	}

	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'rows()::invalid input argument.' );
		}
		self._config.rows = value;
	});

	return this;
}; // end METHOD rows()

/**
* METHOD: cols( value )
*	Number of columns setter and getter. If a value is supplied, defines the number of columns. If no value is supplied, returns the number of columns.
*
* @param {number} value - number of columns.
* @returns {object|number} - panel instance or number of columns
*/
Gridpanel.prototype.cols = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config.cols;
	}

	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'cols()::invalid input argument.' );
		}
		self._config.cols = value;
	});

	return this;
}; // end METHOD cols()