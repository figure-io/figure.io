
// PANEL //

/**
* FUNCTION: Panel( canvas )
*	Panel constructor. Creates a new panel instance.
*
* @constructor
* @param {object} canvas - parent canvas instance
* @returns {object} panel instance
*/
function Panel( canvas ) {

	// INSTANCE ATTRIBUTES //

	this._parent = canvas;
	this._root = undefined;
	this._children = {};

	this._config = {
		"width": 600,
		"height": 400,
		"position": {
			"top": 80,
			"left": 90
		},
		"padding": {
			"top": 0,
			"left": 0
		},
		"background": false,
		"scales": [
			{
				"name": "x",
				"type": "linear",
				"domain": {
					"min": null,
					"max": null
				},
				"range": {
					"min": 0,
					"max": 600
				}
			},
			{
				"name": "y",
				"type": "linear",
				"domain": {
					"min": null,
					"max": null
				},
				"range": {
					"min": 0,
					"max": 400
				}
			}
		],
		"axes": [
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
					"rotation": 0,
					"direction": "out"
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
					"rotation": 0,
					"direction": "out"
				},
				"orient": "left"
			}
		]
	};

	// SCALES //
	this._xScale = d3.scale.linear()
		.domain([
			this._config.scales[ 0 ].domain.min,
			this._config.scales[ 0 ].domain.max
		])
		.range([
			this._config.scales[ 0 ].range.min,
			this._config.scales[ 0 ].range.max
		]);
	this._yScale = d3.scale.linear()
		.domain([
			this._config.scales[ 1 ].domain.min,
			this._config.scales[ 1 ].domain.max
		])
		.range([
			this._config.scales[ 1 ].range.max,
			this._config.scales[ 1 ].range.min
		]);

	// DATA //
	this._data = null;

	return this;

} // end FUNCTION Panel()

/**
* METHOD: padding( value )
*	Convenience method to set multple padding values. If a value is supplied, defines the panel padding. If no value is supplied, returns the panel padding.
*
* @param {object} value - object with the following properties: left, top. All values assigned to properties should be numbers.
* @returns {object|object} panel instance or padding object
*/
Panel.prototype.padding = function( value ) {
	var self = this,
		rules = 'object|has_properties[left,top]';

	if ( !arguments.length ) {
		return this._config.padding;
	}

	Validator( value, rules, function set( errors ) {
		var rules = 'number';

		if ( errors ) {
			console.error( errors );
			throw new Error( 'padding()::invalid input argument.' );
		}

		for ( var key in value ) {
			if ( value.hasOwnProperty( key ) ) {
				errors = Validator( value[ key ], rules );
				if ( errors.length ) {
					console.error( errors );
					throw new Error( 'padding()::invalid input argument.' );
				}
			}
		}

		// Set the value:
		self._config.padding = value;
	});
	
	return this;

}; // end METHOD padding()

/**
* METHOD: paddingLeft( value )
*	Padding-left setter and getter. If a value is supplied, defines the panel padding-left. If no value is supplied, returns the panel padding-left.
*
* @param {number} value - desired panel padding-left.
* @returns {object|number} - panel instance or padding left value
*/
Panel.prototype.paddingLeft = function( value ) {
	var padding = this._config.padding,
		rules = 'number';

	if ( !arguments.length ) {
		return padding.left;
	}

	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'paddingLeft()::invalid input argument.' );
		}
		padding.left = value;
	});

	return this;

}; // end METHOD paddingLeft()

/**
* METHOD: paddingTop( value )
*	Padding-top setter and getter. If a value is supplied, defines the panel padding-top. If no value is supplied, returns the panel padding-top.
*
* @param {number} value - desired panel padding-top.
* @returns {object|number} - panel instance or padding top value
*/
Panel.prototype.paddingTop = function( value ) {
	var padding = this._config.padding,
		rules = 'number';

	if ( !arguments.length ) {
		return padding.top;
	}

	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'paddingTop()::invalid input argument.' );
		}
		padding.top = value;
	});

	return this;

}; // end METHOD paddingTop()

/**
* METHOD: width( value )
*	Width setter and getter. If a value is supplied, defines the panel width. If no value is supplied, returns the panel width.
*
* @param {number} width - desired panel width.
* @returns {object|number} panel instance or panel width.
*/
Panel.prototype.width = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config.width;
	}

	if ( !_.isUndefined( value ) && !_.isNull( value ) ) {
		
		Validator( value, rules, function set( errors ) {
			if ( errors ) {
				console.error( errors );
				throw new Error( 'width()::invalid input argument. ' );
			}
			self._config.width = value;
			self._config.scales[ 0 ].range.max = value;
		});
	
	}
	
	return this;

}; // end METHOD width()

/**
* METHOD: height( value )
*	Height setter and getter. If a value is supplied, defines the panel height. If no value is supplied, returns the panel height.
*
* @param {number} height - desired panel height.
* @returns {object|number} panel instance or panel height.
*/
Panel.prototype.height = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config.height;
	}

	if ( !_.isUndefined( value ) && !_.isNull( value ) ) {

		Validator( value, rules, function set( errors ) {
			if ( errors ) {
				console.error( errors );
				throw new Error( 'height()::invalid input argument. ' );
			}
			self._config.height = value;
		});

	}
	
	return this;

}; // end METHOD height()

/**
* METHOD: xMin( value )
*	xMin setter and getter. If a value is supplied, defines the panel xMin. If no value is supplied, returns the panel xMin.
*
* @param {number} xMin - desired panel xMin.
* @returns {object|number} panel instance or panel xMin.
*/
Panel.prototype.xMin = function( value ) {
	var domain = this._config.scales[ 0 ].domain,
		rules = 'number';

	if ( !arguments.length ) {
		return domain.min;
	}

	if ( !_.isUndefined( value ) && !_.isNull( value ) ) {
		
		Validator( value, rules, function set( errors ) {
			if ( errors ) {
				console.error( errors );
				throw new Error( 'xMin()::invalid input argument. ' );
			}
			domain.min = value;
		});
	
	}
	
	return this;

}; // end METHOD xMin()

/**
* METHOD: xMax( value )
*	xMax setter and getter. If a value is supplied, defines the panel xMax. If no value is supplied, returns the panel xMax.
*
* @param {number} xMax - desired panel xMax.
* @returns {object|number} panel instance or panel xMax.
*/
Panel.prototype.xMax = function( value ) {
	var domain = this._config.scales[ 0 ].domain,
		rules = 'number';

	if ( !arguments.length ) {
		return domain.max;
	}

	if ( !_.isUndefined( value ) && !_.isNull( value ) ) {
		
		Validator( value, rules, function set( errors ) {
			if ( errors ) {
				console.error( errors );
				throw new Error( 'xMax()::invalid input argument. ' );
			}
			domain.max = value;
		});
	
	}
	
	return this;

}; // end METHOD xMax()

/**
* METHOD: yMin( value )
*	yMin setter and getter. If a value is supplied, defines the panel yMin. If no value is supplied, returns the panel yMin.
*
* @param {number} yMin - desired panel yMin.
* @returns {object|number} panel instance or panel yMin.
*/
Panel.prototype.yMin = function( value ) {
	var domain = this._config.scales[ 1 ].domain,
		rules = 'number';

	if ( !arguments.length ) {
		return domain.min;
	}

	if ( !_.isUndefined( value ) && !_.isNull( value ) ) {
		
		Validator( value, rules, function set( errors ) {
			if ( errors ) {
				console.error( errors );
				throw new Error( 'yMin()::invalid input argument. ' );
			}
			domain.min = value;
		});
		
	}
	
	return this;

}; // end METHOD yMin()

/**
* METHOD: yMax( value )
*	yMax setter and getter. If a value is supplied, defines the panel yMax. If no value is supplied, returns the panel yMax.
*
* @param {number} yMax - desired panel yMax.
* @returns {object|number} panel instance or panel yMax.
*/
Panel.prototype.yMax = function( value ) {
	var domain = this._config.scales[ 1 ].domain,
		rules = 'number';

	if ( !arguments.length ) {
		return domain.max;
	}

	if ( !_.isUndefined( value ) && !_.isNull( value ) ) {
		
		Validator( value, rules, function set( errors ) {
			if ( errors ) {
				console.error( errors );
				throw new Error( 'yMax()::invalid input argument. ' );
			}
			domain.max = value;
		});
	
	}

	return this;

}; // end METHOD yMax()

/**
* METHOD: xDomain( arr )
*	xDomain setter and getter. If an array is supplied, sets the instance xDomain. If no argument is supplied, gets the instance xDomain.
*
* @param {array} arr - 2-element array defining the xDomain
* @returns {object|array} panel instance or xDomain
*/
Panel.prototype.xDomain = function( arr ) {
	var domain = this._config.scales[ 0 ].domain,
		rules = 'array';

	if ( !arguments.length ) {
		return [ domain.min, domain.max ];
	}

	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'xDomain()::invalid input argument. ' );
		}
		domain.min = arr[ 0 ];
		domain.max = arr[ 1 ];
	});
	
	return this;

}; // end METHOD xDomain()

/**
* METHOD: yDomain( arr )
*	yDomain setter and getter. If an array is supplied, sets the instance yDomain. If no argument is supplied, gets the instance yDomain.
*
* @param {array} arr - 2-element array defining the yDomain
* @returns {object|array} panel instance or yDomain
*/
Panel.prototype.yDomain = function( arr ) {
	var domain = this._config.scales[ 1 ].domain,
		rules = 'array';

	if ( !arguments.length ) {
		return [ domain.min, domain.max ];
	}

	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'yDomain()::invalid input argument. ' );
		}
		domain.min = arr[ 0 ];
		domain.max = arr[ 1 ];
	});
	
	return this;

}; // end METHOD yDomain()

/**
* METHOD: xRange( arr )
*	xRange setter and getter. If an array is supplied, sets the instance xRange. If no argument is supplied, gets the instance xRange.
*
* @param {array} arr - 2-element array defining the xRange
* @returns {object|array} panel instance or xRange
*/
Panel.prototype.xRange = function( arr ) {
	var range = this._config.scales[ 0 ].range,
		rules = 'array';

	if ( !arguments.length ) {
		return [ range.min, range.max ];
	}

	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'xRange()::invalid input argument. ' );
		}
		range.min = arr[ 0 ];
		range.max = arr[ 1 ];
	});
	
	return this;

}; // end METHOD xRange()

/**
* METHOD: yRange( arr )
*	yRange setter and getter. If an array is supplied, sets the instance yRange. If no argument is supplied, gets the instance yRange.
*
* @param {array} arr - 2-element array defining the yRange
* @returns {object|array} panel instance or yRange
*/
Panel.prototype.yRange = function( arr ) {
	var range = this._config.scales[ 1 ].range,
		rules = 'array';

	if ( !arguments.length ) {
		return [ range.max, range.min ];
	}

	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'yRange()::invalid input argument. ' );
		}
		range.min = arr[ 1 ];
		range.max = arr[ 0 ];
	});
	
	return this;

}; // end METHOD yRange()

/**
* METHOD: xScale( type, value )
*	xScale setter and getter. If a type is provided, sets the x-scale according to the specified type. If no type is provided, returns the current x-scale type.
*
* @param {string} type - scale type; must be one of the following: linear, log, pow, category10, category20, category20b, category20c.
* @param {number} value - (optional) scale dependent parameter; e.g., if type=log, value=10 sets the base to 10.
* @returns {object|string} panel instance or the x-scale type
*/
Panel.prototype.xScale = function( type, value ) {
	var self = this;

	if ( !arguments.length || !type ) {
		return this._config.scales[ 0 ].type;
	}

	this.scale( type, value, function returnScale( errors, scale ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'xScale()::invalid input arguments. ' );
		}
		self._config.scales[ 0 ].type = type;

		self._xScale = scale
			.domain([
				self._config.scales[ 0 ].domain.min,
				self._config.scales[ 0 ].domain.max
			])
			.range([
				self._config.scales[ 0 ].range.min,
				self._config.scales[ 0 ].range.max
			]);
	});

	return this;

}; // end METHOD xScale()

/**
* METHOD: yScale( type, value )
*	yScale setter and getter. If a type is provided, sets the y-scale according to the specified type. If no type is provided, returns the current y-scale type.
*
* @param {string} type - scale type; must be one of the following: linear, log, pow, category10, category20, category20b, category20c.
* @param {number} value - (optional) scale dependent parameter; e.g., if type=log, value=10 sets the base to 10.
* @returns {object|string} panel instance or the y-scale type
*/
Panel.prototype.yScale = function( type, value ) {
	var self = this;

	if ( !arguments.length || !type ) {
		return this._config.scales[ 1 ].type;
	}

	this.scale( type, value, function returnScale( errors, scale ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'yScale()::invalid input arguments. ' );
		}
		self._config.scales[ 1 ].type = type;

		self._yScale = scale
			.domain([
				self._config.scales[ 1 ].domain.min,
				self._config.scales[ 1 ].domain.max
			])
			.range([
				self._config.scales[ 1 ].range.max,
				self._config.scales[ 1 ].range.min
			]);
	});

	return this;

}; // end METHOD yScale()

/**
* METHOD: scale( type, value, clbk )
*	Generalized scale getter.
*
* @param {string} type - scale type; must be one of the following: linear, log, pow, category10, category20, category20b, category20c.
* @param {number} value - (optional) scale dependent parameter; e.g., if type=log, value=10 sets the base to 10.
* @param {function} clbk - callback to invoke after validation and getting the specified scale. Function should take two arguments: [ errors, scale ].
* @returns {object} panel instance
*/
Panel.prototype.scale = function( type, value, clbk ) {
	var rules = 'string|matches[linear,log,pow,category10,category20,category20b,category20c]',
		scales = {
			'linear': linear,
			'log': log,
			'pow': pow,
			'category10': category10,
			'category20': category20,
			'category20b': category20b,
			'category20c': category20c
		};

	Validator( type, rules, function onErrors( errors ) {
		if ( errors ) {
			clbk( errors );
			return;
		}
		clbk( null, scales[ type ]() );
	});

	return this;

	function linear() {
		return d3.scale.linear();
	}
	function log() {
		return d3.scale.log().base( value );
	}
	function pow() {
		return d3.scale.pow().exponent( value );
	}
	function category10() {
		return d3.scale.category10();
	}
	function category20() {
		return d3.scale.category20();
	}
	function category20b() {
		return d3.scale.category20b();
	}
	function category20c() {
		return d3.scale.category20c();
	}
}; // end METHOD scale()

/**
* METHOD: background( bool )
*	Background display setter and getter. If a boolean is provided, sets the background display. If no boolean is provided, gets the background display. If false, when graphs are created, no background is created.
*
* @param {boolean} bool - boolean flag indicating whether to create a background.
* @returns {object|boolean} panel instance or background display
*/
Panel.prototype.background = function( bool ) {
	var self = this,
		rules = 'boolean';

	if ( !arguments.length ) {
		return this._config.background;
	}

	// Validator( bool, rules, set );
	(function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'background()::invalid input argument.' );
		}
		self._config.background = bool;
	})();

	return this;

}; // end METHOD background()

/**
* METHOD: position( value )
*	Convenience method to set multple position values. If a value is supplied, defines the panel position. If no value is supplied, returns the panel position.
*
* @param {object} value - object with the following properties: left, top. All values assigned to properties should be numbers.
* @returns {object|object} panel instance or position object
*/
Panel.prototype.position = function( value ) {
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
*	Position-left setter and getter. If a value is supplied, defines the panel position-left. If no value is supplied, returns the panel position-left.
*
* @param {number} value - desired panel position-left.
* @returns {object|number} - panel instance or position left value
*/
Panel.prototype.left = function( value ) {
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
*	Position-top setter and getter. If a value is supplied, defines the panel position-top. If no value is supplied, returns the panel position-top.
*
* @param {number} value - desired panel position-top.
* @returns {object|number} - panel instance or position top value
*/
Panel.prototype.top = function( value ) {
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
* METHOD: data( data )
*	Panel data setter and getter. If data is supplied, sets the panel's current active dataset. If no data is supplied, returns the panel's datasets.
*
* @param {array} data - array of data instances
* @returns {object|object} - panel instance or panel datasets
*/
Panel.prototype.data = function( data ) {
	var self = this,
		rules = 'array';

	if ( !arguments.length ) {
		return this._data;
	}

	Validator( data, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'data()::invalid input argument.' );
		}
		// Ensure that each member of the data array is a Data instance:
		for ( var i = 0; i < data.length; i++ ) {
			if ( !( data[ i ] instanceof Data ) ) {
				throw new Error( 'data()::invalid input argument. Each input argument member must be an instance of Data.' );
			}
		}
		self._data = data;
	});
	
	return this;

}; // end METHOD data()

/**
* METHOD: xLabel( value )
*	x-axis label setter and getter. If a value is supplied, sets the x-axis label. If no value is supplied, returns the instance x-axis label.
*
* @param {string} value - x-axis label
* @returns {object|string} panel instance or x-axis label
*/
Panel.prototype.xLabel = function( value ) {
	var self = this,
		rules = 'string';

	if ( !arguments.length ) {
		return this._config.axes[ 0 ].label;
	}
	
	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'xLabel()::invalid input argument.' );
		}
		self._config.axes[ 0 ].label = value;
	});

	return this;

}; // end METHOD xLabel()

/**
* METHOD: yLabel( value )
*	y-axis label setter and getter. If a value is supplied, sets the y-axis label. If no value is supplied, returns the instance y-axis label.
*
* @param {string} value - y-axis label
* @returns {object|string} panel instance or y-axis label
*/
Panel.prototype.yLabel = function( value ) {
	var self = this,
		rules = 'string';

	if ( !arguments.length ) {
		return this._config.axes[ 1 ].label;
	}
	
	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'yLabel()::invalid input argument.' );
		}
		self._config.axes[ 1 ].label = value;
	});

	return this;

}; // end METHOD yLabel()

/**
* METHOD: xNumTicks( value )
*	x-axis number of ticks setter and getter. If a value is supplied, sets the desired x-axis tick number. If no value is supplied, returns the desired instance x-axis tick number. Note: the requested tick number is treated as a suggestion. Actual tick numbers will vary.
*
* @param {string} value - x-axis tick number
* @returns {object|string} panel instance or x-axis tick number
*/
Panel.prototype.xNumTicks = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config.axes[ 0 ].ticks.num;
	}

	if ( _.isUndefined( value ) || _.isNull( value ) ) {
		set();
	} else {
		Validator( value, rules, function set( errors ) {
			if ( errors ) {
				console.error( errors );
				throw new Error( 'xNumTicks()::invalid input argument.' );
			}
			self._config.axes[ 0 ].ticks.num = value;
		});
	}

	return this;

}; // end METHOD xNumTicks()

/**
* METHOD: yNumTicks( value )
*	y-axis number of ticks setter and getter. If a value is supplied, sets the desired y-axis tick number. If no value is supplied, returns the desired instance y-axis tick number. Note: the requested tick number is treated as a suggestion. Actual tick numbers will vary.
*
* @param {string} value - y-axis tick number
* @returns {object|string} panel instance or y-axis tick number
*/
Panel.prototype.yNumTicks = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config.axes[ 1 ].ticks.num;
	}

	if ( _.isUndefined( value ) || _.isNull( value ) ) {
		set();
	} else {
		Validator( value, rules, function set( errors ) {
			if ( errors ) {
				console.error( errors );
				throw new Error( 'yNumTicks()::invalid input argument.' );
			}
			self._config.axes[ 1 ].ticks.num = value;
		});
	}

	return this;

}; // end METHOD yNumTicks()

/**
* METHOD: xTickPadding( value )
*	x-axis tick padding setter and getter. Defines the pixel space between a tick and a tick label. If a value is supplied, sets the x-axis tick padding. If no value is supplied, returns the instance x-axis tick padding.
*
* @param {number} value - x-axis tick padding
* @returns {object|number} - panel instance or x-axis tick padding
*/
Panel.prototype.xTickPadding = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config.axes[ 0 ].ticks.padding;
	}
	
	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'xTickPadding()::invalid input argument.' );
		}
		self._config.axes[ 0 ].ticks.padding = value;
	});

	return this;

}; // end METHOD xTickPadding()

/**
* METHOD: yTickPadding( value )
*	y-axis tick padding setter and getter. Defines the pixel space between a tick and a tick label. If a value is supplied, sets the y-axis tick padding. If no value is supplied, returns the instance y-axis tick padding.
*
* @param {number} value - y-axis tick padding
* @returns {object|number} - panel instance or y-axis tick padding
*/
Panel.prototype.yTickPadding = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config.axes[ 1 ].ticks.padding;
	}
	
	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'yTickPadding()::invalid input argument.' );
		}
		self._config.axes[ 1 ].ticks.padding = value;
	});

	return this;

}; // end METHOD yTickPadding()

/**
* METHOD: xTickRotation( value )
*	x-axis tick rotation setter and getter. Rotation is relative to a horizontal axis (i.e., think unit circle). If a value is supplied, sets the x-axis tick rotation. If no value is supplied, returns the instance x-axis tick rotation.
*
* @param {number} value - x-axis tick rotation
* @returns {object|number} - panel instance or x-axis tick rotation
*/
Panel.prototype.xTickRotation = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config.axes[ 0 ].ticks.rotation;
	}
	
	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'xTickRotation()::invalid input argument.' );
		}
		self._config.axes[ 0 ].ticks.rotation = value;
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
Panel.prototype.yTickRotation = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config.axes[ 1 ].ticks.rotation;
	}
	
	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'yTickRotation()::invalid input argument.' );
		}
		self._config.axes[ 1 ].ticks.rotation = value;
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
Panel.prototype.xInnerTickSize = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config.axes[ 0 ].ticks.innerSize;
	}
	
	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'xInnerTickSize()::invalid input argument.' );
		}
		self._config.axes[ 0 ].ticks.innerSize = value;
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
Panel.prototype.yInnerTickSize = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config.axes[ 1 ].ticks.innerSize;
	}
	
	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'yInnerTickSize()::invalid input argument.' );
		}
		self._config.axes[ 1 ].ticks.innerSize = value;
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
Panel.prototype.xOuterTickSize = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config.axes[ 0 ].ticks.outerSize;
	}
	
	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'xOuterTickSize()::invalid input argument.' );
		}
		self._config.axes[ 0 ].ticks.outerSize = value;
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
Panel.prototype.yOuterTickSize = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config.axes[ 1 ].ticks.outerSize;
	}
	
	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'yOuterTickSize()::invalid input argument.' );
		}
		self._config.axes[ 1 ].ticks.outerSize = value;
	});

	return this;

}; // end METHOD yOuterTickSize()

/**
* METHOD: xTickFormat( value, flg )
*	x-axis tick format setter and getter. If a format is supplied, sets the x-axis tick format. If no format is supplied, gets the x-axis tick format. If the desired formatting is time formatting, a boolean (true) should be passed as the second argument.
*
* @param {string} value - x-axis tick format; available time formatting: %Y, %B, %b, %a, %d, %I, %p, %M, %S, %L.
* @param {boolean} flg - (optional) flag indicating if time formatting should be used
* @returns {object|string} instance object or x-axis tick format
*/
Panel.prototype.xTickFormat = function( value, flg ) {
	var self = this,
		rules;

	if ( !arguments.length ) {
		return this._config.axes[ 0 ].ticks.format;
	}

	if ( flg ) {
		// https://github.com/mbostock/d3/wiki/Time-Scales
		rules = 'string|matches[%Y,%B,%b,%a,%d,%I,%p,%M,%S,%L]';
	} else {
		rules = 'string';
	}

	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'xTickFormat()::invalid input arguments.' );
		}
		self._config.axes[ 0 ].ticks.format = value;
	});
	
	return this;

}; // end METHOD xTickFormat()

/**
* METHOD: yTickFormat( value, flg )
*	y-axis tick format setter and getter. If a format is supplied, sets the y-axis tick format. If no format is supplied, gets the y-axis tick format. If the desired formatting is time formatting, a boolean (true) should be passed as the second argument.
*
* @param {string} value - y-axis tick format; available time formatting: %Y, %B, %b, %a, %d, %I, %p, %M, %S, %L.
* @param {boolean} flg - (optional) flag indicating if time formatting should be used
* @returns {object|string} instance object or y-axis tick format
*/
Panel.prototype.yTickFormat = function( value, flg ) {
	var self = this,
		rules;

	if ( !arguments.length ) {
		return this._config.axes[ 1 ].ticks.format;
	}

	if ( flg ) {
		// https://github.com/mbostock/d3/wiki/Time-Scales
		rules = 'string|matches[%Y,%B,%b,%a,%d,%I,%p,%M,%S,%L]';
	} else {
		rules = 'string';
	}

	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'yTickFormat()::invalid input arguments.' );
		}
		self._config.axes[ 1 ].ticks.format = value;
	});
	
	return this;

}; // end METHOD yTickFormat()

/**
* METHOD: xTickDisplay( bool )
*	x-axis tick label display setter and getter. If a boolean is provided, sets the x-axis tick label display. If no boolean is provided, gets the x-axis tick label display. If false, when axes are created, no x-tick labels are visible.
*
* @param {boolean} bool - boolean flag indicating whether to display x-tick labels.
* @returns {object|boolean} instance object or x-tick label display
*/
Panel.prototype.xTickDisplay = function( bool ) {
	var self = this,
		rules = 'boolean';

	if ( !arguments.length ) {
		return this._config.axes[ 0 ].ticks.display;
	}

	// Validator( bool, rules, set );
	(function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'xTickDisplay()::invalid input argument.' );
		}
		self._config.axes[ 0 ].ticks.display = bool;
	})();

	return this;

}; // end METHOD xTickDisplay()

/**
* METHOD: yTickDisplay( bool )
*	y-axis tick label display setter and getter. If a boolean is provided, sets the y-axis tick label display. If no boolean is provided, gets the y-axis tick label display. If false, when axes are created, no y-tick labels are visible.
*
* @param {boolean} bool - boolean flag indicating whether to display y-tick labels.
* @returns {object|boolean} instance object or x-tick label display
*/
Panel.prototype.yTickDisplay = function( bool ) {
	var self = this,
		rules = 'boolean';

	if ( !arguments.length ) {
		return this._config.axes[ 1 ].ticks.display;
	}

	// Validator( bool, rules, set );
	(function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'yTickDisplay()::invalid input argument.' );
		}
		self._config.axes[ 1 ].ticks.display = bool;
	})();

	return this;

}; // end METHOD yTickDisplay()

/**
* METHOD: xTickDirection( value )
*	x-axis tick direction setter and getter. If a direction is supplied, sets the x-axis tick direction. If no direction is supplied, gets the x-axis tick direction.
*
* @param {string} value - tick direction; must be either 'in', 'out', or 'both'
* @returns {object|string} instance object or x-axis tick direction
*/
Panel.prototype.xTickDirection = function( value ) {
	var self = this,
		rules = 'matches[in,out,both]';

	if ( !arguments.length ) {
		return this._config.axes[ 0 ].ticks.direction;
	}

	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'xTickDirection()::invalid input argument.' );
		}
		self._config.axes[ 0 ].ticks.direction = value;
	});

	return this;

}; // end METHOD xTickDirection()

/**
* METHOD: yTickDirection( value )
*	y-axis tick direction setter and getter. If a direction is supplied, sets the y-axis tick direction. If no direction is supplied, gets the y-axis tick direction.
*
* @param {string} value - tick direction; must be either 'in', 'out', or 'both'
* @returns {object|string} instance object or y-axis tick direction
*/
Panel.prototype.yTickDirection = function( value ) {
	var self = this,
		rules = 'matches[in,out,both]';

	if ( !arguments.length ) {
		return this._config.axes[ 1 ].ticks.direction;
	}

	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'yTickDirection()::invalid input argument.' );
		}
		self._config.axes[ 1 ].ticks.direction = value;
	});

	return this;

}; // end METHOD yTickDirection()

/**
* METHOD: xAxisOrient( value )
*	x-axis orientation setter and getter. If a orientation is supplied, sets the x-axis orientation. If no orientation is supplied, gets the x-axis orientation.
*
* @param {string} value - orientation; must be either 'bottom' or 'top'
* @returns {object|string} instance object or x-axis orientation
*/
Panel.prototype.xAxisOrient = function( value ) {
	var self = this,
		rules = 'matches[bottom,top]';

	if ( !arguments.length ) {
		return this._config.axes[ 0 ].orient;
	}

	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'xAxisOrient()::invalid input argument.' );
		}
		self._config.axes[ 0 ].orient = value;
	});

	return this;

}; // end METHOD xAxisOrient()

/**
* METHOD: yAxisOrient( value )
*	y-axis orientation setter and getter. If a orientation is supplied, sets the y-axis orientation. If no orientation is supplied, gets the y-axis orientation.
*
* @param {string} value - orientation; must be either 'left' or 'right'
* @returns {object|string} instance object or y-axis orientation
*/
Panel.prototype.yAxisOrient = function( value ) {
	var self = this,
		rules = 'matches[left,right]';

	if ( !arguments.length ) {
		return this._config.axes[ 1 ].orient;
	}

	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'yAxisOrient()::invalid input argument.' );
		}
		self._config.axes[ 1 ].orient = value;
	});

	return this;

}; // end METHOD yAxisOrient()

/**
* METHOD: xAxisDisplay()
*	x-axis display setter and getter. If a boolean is provided, sets the x-axis display. If no boolean is provided, gets the x-axis display. If false, no x-axis is visible.
*
* @param {boolean} bool - boolean flag indicating whether to display an x-axis.
* @returns {object|boolean} instance object or x-axis display
*/
Panel.prototype.xAxisDisplay = function( bool ) {
	var self = this,
		rules = 'boolean';

	if ( !arguments.length ) {
		return this._config.axes[ 0 ].display;
	}

	// Validator( bool, rules, set );
	(function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'xAxisDisplay()::invalid input argument.' );
		}
		self._config.axes[ 0 ].display = bool;
	})();

	return this;

}; // end METHOD xAxisDisplay()

/**
* METHOD: yAxisDisplay()
*	y-axis display setter and getter. If a boolean is provided, sets the y-axis display. If no boolean is provided, gets the y-axis display. If false, no y-axis is visible.
*
* @param {boolean} bool - boolean flag indicating whether to display a y-axis.
* @returns {object|boolean} instance object or y-axis display
*/
Panel.prototype.yAxisDisplay = function( bool ) {
	var self = this,
		rules = 'boolean';

	if ( !arguments.length ) {
		return this._config.axes[ 1 ].display;
	}

	// Validator( bool, rules, set );
	(function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'yAxisDisplay()::invalid input argument.' );
		}
		self._config.axes[ 1 ].display = bool;
	})();

	return this;

}; // end METHOD yAxisDisplay()

/**
* METHOD: parent()
*	Returns the panel parent.
*
* @returns {object} parent instance
*/
Panel.prototype.parent = function() {
	return this._parent;
}; // end METHOD parent()

/**
* METHOD: config()
*	Returns the panel configuration as a JSON blob.
* 
* @returns {object} configuration blob
*/
Panel.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()

/**
* METHOD: children()
*	Returns the panel children.
*
* @returns {object} panel children
*/
Panel.prototype.children = function() {
	return this._children;
}; // end METHOD children()