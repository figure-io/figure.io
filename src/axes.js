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
* @param {object} graph - parent graph instance
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
				"outerSize": 6,
				"rotation": 0
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
				"outerSize": 6,
				"rotation": 0
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
	if ( graph._children.hasOwnProperty( 'axes' ) ) {
		graph._children.axes.push( this );
	} else {
		graph._children.axes = [ this ];
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
* METHOD: xLabel( value )
*	x-axis label setter and getter. If a value is supplied, sets the x-axis label. If no value is supplied, returns the instance x-axis label.
*
* @param {string} value - x-axis label
* @returns {object|string} axes instance or x-axis label
*/
Axes.prototype.xLabel = function( value ) {
	var self = this,
		rules = 'string';

	if ( !arguments.length ) {
		return this._config[ 0 ].label;
	}
	
	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'xLabel()::invalid input argument.' );
		}
		self._config[ 0 ].label = value;
	});

	return this;

}; // end METHOD xLabel()

/**
* METHOD: yLabel( value )
*	y-axis label setter and getter. If a value is supplied, sets the y-axis label. If no value is supplied, returns the instance y-axis label.
*
* @param {string} value - y-axis label
* @returns {object|string} axes instance or y-axis label
*/
Axes.prototype.yLabel = function( value ) {
	var self = this,
		rules = 'string';

	if ( !arguments.length ) {
		return this._config[ 1 ].label;
	}
	
	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'yLabel()::invalid input argument.' );
		}
		self._config[ 1 ].label = value;
	});

	return this;

}; // end METHOD yLabel()

/**
* METHOD: xNumTicks( value )
*	x-axis number of ticks setter and getter. If a value is supplied, sets the desired x-axis tick number. If no value is supplied, returns the desired instance x-axis tick number. Note: the requested tick number is treated as a suggestion. Actual tick numbers will vary.
*
* @param {string} value - x-axis tick number
* @returns {object|string} axes instance or x-axis tick number
*/
Axes.prototype.xNumTicks = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config[ 0 ].ticks.num;
	}

	if ( _.isUndefined( value ) || _.isNull( value ) ) {
		set();
	} else {
		Validator( value, rules, function set( errors ) {
			if ( errors ) {
				console.error( errors );
				throw new Error( 'xNumTicks()::invalid input argument.' );
			}
			self._config[ 0 ].ticks.num = value;
			self._xAxis.ticks( value );
		});
	}

	return this;

}; // end METHOD xNumTicks()

/**
* METHOD: yNumTicks( value )
*	y-axis number of ticks setter and getter. If a value is supplied, sets the desired y-axis tick number. If no value is supplied, returns the desired instance y-axis tick number. Note: the requested tick number is treated as a suggestion. Actual tick numbers will vary.
*
* @param {string} value - y-axis tick number
* @returns {object|string} axes instance or y-axis tick number
*/
Axes.prototype.yNumTicks = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config[ 1 ].ticks.num;
	}

	if ( _.isUndefined( value ) || _.isNull( value ) ) {
		set();
	} else {
		Validator( value, rules, function set( errors ) {
			if ( errors ) {
				console.error( errors );
				throw new Error( 'yNumTicks()::invalid input argument.' );
			}
			self._config[ 1 ].ticks.num = value;
			self._yAxis.ticks( value );
		});
	}

	return this;

}; // end METHOD yNumTicks()

/**
* METHOD: xTickPadding( value )
*	x-axis tick padding setter and getter. Defines the pixel space between a tick and a tick label. If a value is supplied, sets the x-axis tick padding. If no value is supplied, returns the instance x-axis tick padding.
*
* @param {number} value - x-axis tick padding
* @returns {object|number} - instance object or x-axis tick padding
*/
Axes.prototype.xTickPadding = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config[ 0 ].ticks.padding;
	}
	
	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'xTickPadding()::invalid input argument.' );
		}
		self._config[ 0 ].ticks.padding = value;
		self._xAxis.tickPadding( value );
	});

	return this;

}; // end METHOD xTickPadding()

/**
* METHOD: yTickPadding( value )
*	y-axis tick padding setter and getter. Defines the pixel space between a tick and a tick label. If a value is supplied, sets the y-axis tick padding. If no value is supplied, returns the instance y-axis tick padding.
*
* @param {number} value - y-axis tick padding
* @returns {object|number} - instance object or y-axis tick padding
*/
Axes.prototype.yTickPadding = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config[ 1 ].ticks.padding;
	}
	
	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'yTickPadding()::invalid input argument.' );
		}
		self._config[ 1 ].ticks.padding = value;
		self._yAxis.tickPadding( value );
	});

	return this;

}; // end METHOD yTickPadding()

/**
* METHOD: xTickRotation( value )
*	x-axis tick rotation setter and getter. Rotation is relative to a horizontal axis (i.e., think unit circle). If a value is supplied, sets the x-axis tick rotation. If no value is supplied, returns the instance x-axis tick rotation.
*
* @param {number} value - x-axis tick rotation
* @returns {object|number} - instance object or x-axis tick rotation
*/
Axes.prototype.xTickRotation = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config[ 0 ].ticks.rotation;
	}
	
	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'xTickRotation()::invalid input argument.' );
		}
		self._config[ 0 ].ticks.rotation = value;
	});

	return this;

}; // end METHOD xTickRotation()

/**
* METHOD: yTickRotation( value )
*	y-axis tick rotation setter and getter. Rotation is relative to a horizontal axis (i.e., think unit circle). If a value is supplied, sets the y-axis tick rotation. If no value is supplied, returns the instance y-axis tick rotation.
*
* @param {number} value - y-axis tick rotation
* @returns {object|number} - instance object or y-axis tick rotation
*/
Axes.prototype.yTickRotation = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config[ 1 ].ticks.rotation;
	}
	
	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'yTickRotation()::invalid input argument.' );
		}
		self._config[ 1 ].ticks.rotation = value;
	});

	return this;

}; // end METHOD xTickRotation()

/**
* METHOD: xInnerTickSize( value )
*	x-axis inner tick size setter and getter. Defines the tick size (in pixels) for ticks residing within the x-axis limits. If a value is supplied, sets the x-axis inner tick size. If no value is supplied, returns the instance x-axis inner tick size.
*
* @param {number} value - x-axis inner tick size
* @returns {object|number} - instance object or x-axis inner tick size
*/
Axes.prototype.xInnerTickSize = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config[ 0 ].ticks.innerSize;
	}
	
	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'xInnerTickSize()::invalid input argument.' );
		}
		self._config[ 0 ].ticks.innerSize = value;
		self._xAxis.innerTickSize( value );
	});

	return this;

}; // end METHOD xInnerTickSize()

/**
* METHOD: yInnerTickSize( value )
*	y-axis inner tick size setter and getter. Defines the tick size (in pixels) for ticks residing within the y-axis limits. If a value is supplied, sets the y-axis inner tick size. If no value is supplied, returns the instance y-axis inner tick size.
*
* @param {number} value - y-axis inner tick size
* @returns {object|number} - instance object or y-axis inner tick size
*/
Axes.prototype.yInnerTickSize = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config[ 1 ].ticks.innerSize;
	}
	
	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'yInnerTickSize()::invalid input argument.' );
		}
		self._config[ 1 ].ticks.innerSize = value;
		self._yAxis.innerTickSize( value );
	});

	return this;

}; // end METHOD xInnerTickSize()

/**
* METHOD: xOuterTickSize( value )
*	x-axis outer tick size setter and getter. Defines the tick size (in pixels) for ticks residing at the x-axis limits. If a value is supplied, sets the x-axis outer tick size. If no value is supplied, returns the instance x-axis outer tick size.
*
* @param {number} value - x-axis outer tick size
* @returns {object|number} - instance object or x-axis outer tick size
*/
Axes.prototype.xOuterTickSize = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config[ 0 ].ticks.outerSize;
	}
	
	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'xOuterTickSize()::invalid input argument.' );
		}
		self._config[ 0 ].ticks.outerSize = value;
		self._xAxis.outerTickSize( value );
	});

	return this;

}; // end METHOD xOuterTickSize()

/**
* METHOD: yOuterTickSize( value )
*	y-axis outer tick size setter and getter. Defines the tick size (in pixels) for ticks residing at the y-axis limits. If a value is supplied, sets the y-axis outer tick size. If no value is supplied, returns the instance y-axis outer tick size.
*
* @param {number} value - y-axis outer tick size
* @returns {object|number} - instance object or y-axis outer tick size
*/
Axes.prototype.yOuterTickSize = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config[ 1 ].ticks.outerSize;
	}
	
	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'yOuterTickSize()::invalid input argument.' );
		}
		self._config[ 1 ].ticks.outerSize = value;
		self._yAxis.outerTickSize( value );
	});

	return this;

}; // end METHOD yOuterTickSize()

/**
* METHOD: xTickFormat( value, flg )
*	x-axis tick format setter and getter. If a format is supplied, sets the x-axis tick format. If no format is supplied, gets the x-axis tick format. If the desired formatting is time formatting, a boolean (true) should be passed as the second argument.
*
* @param {string} value - x-axis tick format; available time formatting: %Y, %B, %b, %a, %d, %I, %p, %M, %S, %L.
* @param {boolean} flg - (optional) flag indicating if time formatting should be used
* @returns {object|string} axes instance or x-axis tick format
*/
Axes.prototype.xTickFormat = function( value, flg ) {
	var self = this,
		rules;

	if ( !arguments.length ) {
		return this._config[ 0 ].ticks.format;
	}

	if ( flg ) {
		// https://github.com/mbostock/d3/wiki/Time-Scales
		rules = 'string|matches[%Y,%B,%b,%a,%d,%I,%p,%M,%S,%L]';
	} else {
		rules = 'string';
	}

	Validator( value, rules, function set( errors ) {
		var format;
		if ( errors ) {
			console.error( errors );
			throw new Error( 'xTickFormat()::invalid input arguments.' );
		}
		if ( flg ) {
			format = d3.time.format( value );
		} else {
			format = d3.format( value );
		}
		self._config[ 0 ].ticks.format = value;
		self._xAxis.tickFormat( format );
	});
	
	return this;

}; // end METHOD xTickFormat()

/**
* METHOD: yTickFormat( value, flg )
*	y-axis tick format setter and getter. If a format is supplied, sets the y-axis tick format. If no format is supplied, gets the y-axis tick format. If the desired formatting is time formatting, a boolean (true) should be passed as the second argument.
*
* @param {string} value - y-axis tick format; available time formatting: %Y, %B, %b, %a, %d, %I, %p, %M, %S, %L.
* @param {boolean} flg - (optional) flag indicating if time formatting should be used
* @returns {object|string} axes instance or y-axis tick format
*/
Axes.prototype.yTickFormat = function( value, flg ) {
	var self = this,
		rules;

	if ( !arguments.length ) {
		return this._config[ 1 ].ticks.format;
	}

	if ( flg ) {
		// https://github.com/mbostock/d3/wiki/Time-Scales
		rules = 'string|matches[%Y,%B,%b,%a,%d,%I,%p,%M,%S,%L]';
	} else {
		rules = 'string';
	}

	Validator( value, rules, function set( errors ) {
		var format;
		if ( errors ) {
			console.error( errors );
			throw new Error( 'yTickFormat()::invalid input arguments.' );
		}
		if ( flg ) {
			format = d3.time.format( value );
		} else {
			format = d3.format( value );
		}
		self._config[ 1 ].ticks.format = value;
		self._yAxis.tickFormat( format );
	});
	
	return this;

}; // end METHOD yTickFormat()

/**
* METHOD: xTickDisplay( bool )
*	x-axis tick label display setter and getter. If a boolean is provided, sets the x-axis tick label display. If no boolean is provided, gets the x-axis tick label display. If false, when axes are created, no x-tick labels are visible.
*
* @param {boolean} bool - boolean flag indicating whether to display x-tick labels.
* @returns {object|boolean} axes instance or x-tick label display
*/
Axes.prototype.xTickDisplay = function( bool ) {
	var self = this,
		rules = 'boolean';

	if ( !arguments.length ) {
		return this._config[ 0 ].ticks.display;
	}

	// Validator( bool, rules, set );
	(function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'xTickDisplay()::invalid input argument.' );
		}
		self._config[ 0 ].ticks.display = bool;
	})();

	return this;

}; // end METHOD xTickDisplay()

/**
* METHOD: yTickDisplay( bool )
*	y-axis tick label display setter and getter. If a boolean is provided, sets the y-axis tick label display. If no boolean is provided, gets the y-axis tick label display. If false, when axes are created, no y-tick labels are visible.
*
* @param {boolean} bool - boolean flag indicating whether to display y-tick labels.
* @returns {object|boolean} axes instance or x-tick label display
*/
Axes.prototype.yTickDisplay = function( bool ) {
	var self = this,
		rules = 'boolean';

	if ( !arguments.length ) {
		return this._config[ 1 ].ticks.display;
	}

	// Validator( bool, rules, set );
	(function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'yTickDisplay()::invalid input argument.' );
		}
		self._config[ 1 ].ticks.display = bool;
	})();

	return this;

}; // end METHOD yTickDisplay()

/**
* METHOD: xAxisOrient( value )
*	x-axis orientation setter and getter. If a orientation is supplied, sets the x-axis orientation. If no orientation is supplied, gets the x-axis orientation.
*
* @param {string} value - orientation; must be either 'bottom' or 'top'
* @returns {object|string} - axes instance or x-axis orientation
*/
Axes.prototype.xAxisOrient = function( value ) {
	var self = this,
		rules = 'matches[bottom,top]';

	if ( !arguments.length ) {
		return this._config[ 0 ].orient;
	}

	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'xAxisOrient()::invalid input argument.' );
		}
		self._config[ 0 ].orient = value;
		self._xAxis.orient( value );
	});

	return this;

}; // end METHOD xAxisOrient()

/**
* METHOD: yAxisOrient( value )
*	y-axis orientation setter and getter. If a orientation is supplied, sets the y-axis orientation. If no orientation is supplied, gets the y-axis orientation.
*
* @param {string} value - orientation; must be either 'left' or 'right'
* @returns {object|string} - axes instance or y-axis orientation
*/
Axes.prototype.yAxisOrient = function( value ) {
	var self = this,
		rules = 'matches[left,right]';

	if ( !arguments.length ) {
		return this._config[ 1 ].orient;
	}

	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'yAxisOrient()::invalid input argument.' );
		}
		self._config[ 1 ].orient = value;
		self._yAxis.orient( value );
	});

	return this;

}; // end METHOD yAxisOrient()

/**
* METHOD: xAxisDisplay()
*	x-axis display setter and getter. If a boolean is provided, sets the x-axis display. If no boolean is provided, gets the x-axis display. If false, no x-axis is visible.
*
* @param {boolean} bool - boolean flag indicating whether to display an x-axis.
* @returns {object|boolean} axes instance or x-axis display
*/
Axes.prototype.xAxisDisplay = function( bool ) {
	var self = this,
		rules = 'boolean';

	if ( !arguments.length ) {
		return this._config[ 0 ].display;
	}

	// Validator( bool, rules, set );
	(function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'xAxisDisplay()::invalid input argument.' );
		}
		self._config[ 0 ].display = bool;
	})();

	return this;

}; // end METHOD xAxisDisplay()

/**
* METHOD: yAxisDisplay()
*	y-axis display setter and getter. If a boolean is provided, sets the y-axis display. If no boolean is provided, gets the y-axis display. If false, no y-axis is visible.
*
* @param {boolean} bool - boolean flag indicating whether to display a y-axis.
* @returns {object|boolean} axes instance or y-axis display
*/
Axes.prototype.yAxisDisplay = function( bool ) {
	var self = this,
		rules = 'boolean';

	if ( !arguments.length ) {
		return this._config[ 1 ].display;
	}

	// Validator( bool, rules, set );
	(function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'yAxisDisplay()::invalid input argument.' );
		}
		self._config[ 1 ].display = bool;
	})();

	return this;

}; // end METHOD yAxisDisplay()

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