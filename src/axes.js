/**
*
*	FIGURE: axes
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
*		- 2014/04/14: Created. [AReines].
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

// Axes //

/**
* FUNCTION: Axes( graph )
*	Axes constructor. Creates a new axes instance.
*
* @param {object} graph - parent graph element
*
* @returns {object} axes instance
*/
var Axes = function( graph ) {

	// INSTANCE ATTRIBUTES //

	this._parent = graph;
	this._root = undefined;
	this._children = {};
	this._config = [
		{
			"display": true,
			"scale": "x",
			"label": "x",
			"ticks": {
				"display": true,
				"num": 5,
				"format": null,
				"padding": 3,
				"innerSize": 6,
				"outerSize": 6
			},
			"orient": "bottom"
		},
		{
			"display": true,
			"scale": "y",
			"label": "y",
			"ticks": {
				"display": true,
				"num": 5,
				"format": null,
				"padding": 3,
				"innerSize": 6,
				"outerSize": 6
			},
			"orient": "left"
		}
	];

	// GENERATORS //

	this._xAxis = this.axis()
		.scale( graph._xScale )
		.orient( this._config[ 0 ].orient )
		.ticks( this._config[ 0 ].ticks.num )
		.innerTickSize( this._config[ 0 ].ticks.innerSize )
		.outerTickSize( this._config[ 0 ].ticks.outerSize )
		.tickPadding( this._config[ 0 ].ticks.padding )
		.tickFormat( this._config[ 0 ].ticks.format );

	this._yAxis = this.axis()
		.scale( graph._yScale )
		.orient( this._config[ 1 ].orient )
		.ticks( this._config[ 1 ].ticks.num )
		.innerTickSize( this._config[ 1 ].ticks.innerSize )
		.outerTickSize( this._config[ 1 ].ticks.outerSize )
		.tickPadding( this._config[ 1 ].ticks.padding )
		.tickFormat( this._config[ 1 ].ticks.format );

	// REGISTER //
	if ( graph._config.hasOwnProperty( 'axes' ) ) {
		graph._config.axes.push( this._config );
	} else {
		graph._config.axes = [ this._config ];
	}

	return this;

}; // end FUNCTION Axes()

/**
* METHOD: create()
*	Creates a new axes element.
*
* @returns {object} axes instance
*/
Axes.prototype.create = function() {

	var selection = this._parent._root,
		height = this._parent._config.height,
		width = this._parent._config.width,
		xAxis, yAxis;

	// x-axis:
	if ( this._config[ 0 ].display ) {
		xAxis = selection.append( 'svg:g' )
			.attr( 'property', 'axis' )
			.attr( 'class', 'x axis' )
			.attr( 'transform', 'translate(0,' + height + ')' )
			.call( this._xAxis );

		xAxis.append( 'svg:text' )
			.attr( 'y', 50 )
			.attr( 'x', width / 2 )
			.attr( 'text-anchor', 'middle' )
			.attr( 'property', 'axis_label' )
			.attr( 'class', 'label' )
			.text( this._config[ 0 ].label );

		xAxis.selectAll( '.tick' )
			.attr( 'property', 'axis_tick' );

		xAxis.selectAll( '.domain' )
			.attr( 'property', 'axis_domain' );
	}

	// y-axis:
	if ( this._config[ 1 ].display ) {
		yAxis = selection.append( 'svg:g' )
			.attr( 'property', 'axis' )
			.attr( 'class', 'y axis' )
			.call( this._yAxis );

		yAxis.append( 'svg:text' )
			.attr( 'transform', 'rotate(-90)' )
			.attr( 'y', -72 )
			.attr( 'x', -height / 2 )
			.attr( 'text-anchor', 'middle' )
			.attr( 'property', 'axis_label' )
			.attr( 'class', 'label' )
			.text( this._config[ 1 ].label );

		yAxis.selectAll( '.tick' )
			.attr( 'property', 'axis_tick' );

		yAxis.selectAll( '.domain' )
			.attr( 'property', 'axis_domain' );
	}

	// REGISTER //
	if ( this._parent._children.hasOwnProperty( 'axes' ) ) {
		this._parent._children.axes.push( this );
	} else {
		this._parent._children.axes = [ this ];
	}

	return this;

}; // end METHOD create()

/**
* METHOD: axis()
*	Retrieves the axis generator.
*
* @returns {function} axis generator
*/
Axes.prototype.axis = function() {
	return d3.svg.axis();
}; // end METHOD axis()

/**
* METHOD: parent()
*	Returns the axes parent.
*
* @returns {object} axes parent
*/
Axes.prototype.parent = function() {
	return this._parent;
}; // end METHOD parent()

/**
* METHOD: config()
*	Returns the axes configuration as a JSON blob.
*
* @returns {object} configuration blob
*/
Axes.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()

/**
* METHOD: children()
*	Returns the axes children.
* 
* @returns {object} axes children
*/
Axes.prototype.children = function() {
	return this._children;
}; // end METHOD children()