/**
*
*	FIGURE: multipanel
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
*		- 2014/04/19: Created. [AReines].
*
*
*	DEPENDENCIES:
*		[1] d3.js
*		[2] validate.js
*		[3] data.js
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

// MULTIPANEL //

/**
* FUNCTION: Multipanel( canvas )
*	Multipanel constructor. Creates a new multipanel instance.
*
* @param {object} canvas - parent canvas instance
* @returns {object} multipanel instance
*/
var Multipanel = function( canvas ) {

	// INSTANCE ATTRIBUTES //

	this._parent = canvas;
	this._root = undefined;
	this._children = {};

	this._config = {
		"total": 1,
		"height": 400,
		"width": 600,
		"position": {
			"top": 80,
			"left": 90
		},
		"background": false,
		"scales": [
			{
				"name": "x",
				"type": "linear",
				"domain": {
					"min": 0,
					"max": 1
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
					"min": 0,
					"max": 1
				},
				"range": {
					"min": 0,
					"max": 400
				}
			}
		]
	};

	// DATA //
	this._data = null;

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

}; // end FUNCTION Multipanel()

/**
* METHOD: create( total, type )
*	Creates a new multipanel element and appends to a canvas element. Option to define the multipanel graph type.
*
* @param {number} total - total panel number
* @param {string} type - multipanel type
* @returns {object} multipanel instance
*/
Multipanel.prototype.create = function( total, type ) {

	// VARIABLES //
	var selection = this._parent._root,
		position = this._config.position,
		width = this._config.width,
		height = this._config.height;

	// MULTIPANEL //

	// Create the multipanel element:
	this._root = selection.append( 'svg:g' )
		.attr( 'property', 'multipanel' )
		.attr( 'class', 'multipanel' )
		.attr( 'transform', 'translate(' + position.left + ',' + position.top + ')' );

	// TODO: create the graph elements.

	return this;

}; // end METHOD create()

/**
* METHOD: width( value )
*	Width setter and getter. If a value is supplied, defines the multipanel width. If no value is supplied, returns the multipanel width.
*
* @param {number} width - desired multipanel width.
* @returns {object|number} multipanel instance or multipanel width.
*/
Multipanel.prototype.width = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config.width;
	}

	if ( !_.isUndefined( value ) && !_.isNull( value ) ) {
		
		Validator( value, rules, function set( errors ) {
			var arr;
			if ( errors ) {
				console.error( errors );
				throw new Error( 'width()::invalid input argument. ' );
			}
			self._config.width = value;
		});
	
	}
	
	return this;

}; // end METHOD width()

/**
* METHOD: height( value )
*	Height setter and getter. If a value is supplied, defines the multipanel height. If no value is supplied, returns the multipanel height.
*
* @param {number} height - desired multipanel height.
* @returns {object|number} multipanel instance or multipanel height.
*/
Multipanel.prototype.height = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config.height;
	}

	if ( !_.isUndefined( value ) && !_.isNull( value ) ) {

		Validator( value, rules, function set( errors ) {
			var arr;
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
*	xMin setter and getter. If a value is supplied, defines the multipanel xMin. If no value is supplied, returns the multipanel xMin.
*
* @param {number} xMin - desired multipanel xMin.
* @returns {object|number} multipanel instance or multipanel xMin.
*/
Multipanel.prototype.xMin = function( value ) {
	var domain = this._config.scales[ 0 ].domain,
		rules = 'number';

	if ( !arguments.length ) {
		return domain.min;
	}

	if ( !_.isUndefined( value ) && !_.isNull( value ) ) {
		
		Validator( value, rules, function set( errors ) {
			var arr;
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
*	xMax setter and getter. If a value is supplied, defines the multipanel xMax. If no value is supplied, returns the multipanel xMax.
*
* @param {number} xMax - desired multipanel xMax.
* @returns {object|number} multipanel instance or multipanel xMax.
*/
Multipanel.prototype.xMax = function( value ) {
	var domain = this._config.scales[ 0 ].domain,
		rules = 'number';

	if ( !arguments.length ) {
		return domain.max;
	}

	if ( !_.isUndefined( value ) && !_.isNull( value ) ) {
		
		Validator( value, rules, function set( errors ) {
			var arr;
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
*	yMin setter and getter. If a value is supplied, defines the multipanel yMin. If no value is supplied, returns the multipanel yMin.
*
* @param {number} yMin - desired multipanel yMin.
* @returns {object|number} multipanel instance or multipanel yMin.
*/
Multipanel.prototype.yMin = function( value ) {
	var domain = this._config.scales[ 1 ].domain,
		rules = 'number';

	if ( !arguments.length ) {
		return domain.min;
	}

	if ( !_.isUndefined( value ) && !_.isNull( value ) ) {
		
		Validator( value, rules, function set( errors ) {
			var arr;
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
*	yMax setter and getter. If a value is supplied, defines the multipanel yMax. If no value is supplied, returns the multipanel yMax.
*
* @param {number} yMax - desired multipanel yMax.
* @returns {object|number} multipanel instance or multipanel yMax.
*/
Graph.prototype.yMax = function( value ) {
	var domain = this._config.scales[ 1 ].domain,
		rules = 'number';

	if ( !arguments.length ) {
		return domain.max;
	}

	if ( !_.isUndefined( value ) && !_.isNull( value ) ) {
		
		Validator( value, rules, function set( errors ) {
			var arr;
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
* @returns {object|array} multipanel instance or xDomain
*/
Multipanel.prototype.xDomain = function( arr ) {
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
* @returns {object|array} multipanel instance or yDomain
*/
Multipanel.prototype.yDomain = function( arr ) {
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
* @returns {object|array} multipanel instance or xRange
*/
Multipanel.prototype.xRange = function( arr ) {
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
* @returns {object|array} multipanel instance or yRange
*/
Multipanel.prototype.yRange = function( arr ) {
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
* @returns {object|string} multipanel instance or the x-scale type
*/
Multipanel.prototype.xScale = function( type, value ) {
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
* @returns {object|string} multipanel instance or the y-scale type
*/
Multipanel.prototype.yScale = function( type, value ) {
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
* @returns {object} multipanel instance
*/
Multipanel.prototype.scale = function( type, value, clbk ) {
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
* @returns {object|boolean} multipanel instance or background display
*/
Multipanel.prototype.background = function( bool ) {
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
*	Convenience method to set multple position values. If a value is supplied, defines the multipanel position. If no value is supplied, returns the multipanel position.
*
* @param {object} value - object with the following properties: left, top. All values assigned to properties should be numbers.
* @returns {object|object} multipanel instance or position object
*/
Multipanel.prototype.position = function( value ) {
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
*	Position-left setter and getter. If a value is supplied, defines the multipanel position-left. If no value is supplied, returns the multipanel position-left.
*
* @param {number} value - desired multipanel position-left.
* @returns {object|number} - multipanel instance or position left value
*/
Multipanel.prototype.left = function( value ) {
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
*	Position-top setter and getter. If a value is supplied, defines the multipanel position-top. If no value is supplied, returns the multipanel position-top.
*
* @param {number} value - desired multipanel position-top.
* @returns {object|number} - multipanel instance or position top value
*/
Multipanel.prototype.top = function( value ) {
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
*	Multipanel data setter and getter. If data is supplied, sets the multipanel's current active dataset. If no data is supplied, returns the multipanel's current active dataset.
*
* @param {object} data - data instance
* @returns {object|object} - multipanel instance or current active dataset
*/
Multipanel.prototype.data = function( data ) {

	if ( !arguments.length ) {
		return this._data;
	}

	if ( !( data instanceof Data ) ) {
		throw new Error( 'data()::invalid input argument. Input argument must be an instance of Data.' );
	}

	this._data = data._data;

	return this;

}; // end METHOD data()

/**
* METHOD: parent()
*	Returns the multipanel parent.
*
* @returns {object} parent instance
*/
Multipanel.prototype.parent = function() {
	return this._parent;
}; // end METHOD parent()

/**
* METHOD: config()
*	Returns the multipanel configuration as a JSON blob.
* 
* @returns {object} configuration blob
*/
Multipanel.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()

/**
* METHOD: children()
*	Returns the multipanel children.
*
* @returns {object} multipanel children
*/
Multipanel.prototype.children = function() {
	return this._children;
}; // end METHOD children()