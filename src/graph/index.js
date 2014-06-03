
// GRAPH //

/**
* FUNCTION: Graph( canvas )
*	Graph constructor. Creates a new graph instance.
*
* @constructor
* @param {object} canvas - parent canvas instance
* @returns {object} graph instance
*/
function Graph( canvas ) {

	// INSTANCE ATTRIBUTES //

	this._parent = canvas;
	this._root = undefined;
	this._children = {};

	this._config = {
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
			},
			{
				"name": "z",
				"type": "linear",
				"domain": {
					"min": 0,
					"max": 1
				},
				"range": {
					"min": 0,
					"max": 1
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
	this._zScale = d3.scale.linear()
		.domain([
			this._config.scales[ 2 ].domain.min,
			this._config.scales[ 2 ].domain.max
		])
		.range([
			this._config.scales[ 2 ].range.min,
			this._config.scales[ 2 ].range.max
		]);

	// REGISTER //
	if ( canvas._config.hasOwnProperty( 'graph' ) ) {
		canvas._config.graph.push( this._config );
	} else {
		canvas._config.graph = [ this._config ];
	}
	if ( canvas._children.hasOwnProperty( 'graph' ) ) {
		canvas._children.graph.push( this );
	} else {
		canvas._children.graph = [ this ];
	}

	return this;

} // end FUNCTION Graph()

/**
* METHOD: create( type )
*	Creates a new graph element and appends to a canvas element. Option to define the graph type.
*
* @param {string} type - graph type
* @returns {object} graph instance
*/
Graph.prototype.create = function( type ) {
	var selection = this._parent._root,
		position = this._config.position,
		width = this._config.width,
		height = this._config.height,
		clipPath, background,
		id = Date.now();

	// Create the clip-path:
	clipPath = selection.append( 'svg:defs' )
		.append( 'svg:clipPath' )
			.attr( 'id', id );

	clipPath.append( 'svg:rect' )
		.attr( 'class', 'clipPath' )
		.attr( 'width', width )
		.attr( 'height', height );

	// Create the graph element:
	this._root = selection.append( 'svg:g' )
		.attr( 'property', 'graph' )
		.attr( 'class', 'graph' )
		.attr( 'data-graph-type', ( type ) ? type : 'none' )
		.attr( 'data-clipPath', id )
		.attr( 'transform', 'translate(' + position.left + ',' + position.top + ')' );

	// Create the background:
	if ( this._config.background ) {
		background = this._root.append( 'svg:rect' )
			.attr( 'class', 'background' )
			.attr( 'x', 0 )
			.attr( 'y', 0 )
			.attr( 'width', width )
			.attr( 'height', height );
	} // end IF (background)

	return this;

}; // end METHOD create()

/**
* METHOD: width( value )
*	Width setter and getter. If a value is supplied, defines the graph width. If no value is supplied, returns the graph view width.
*
* @param {number} width - desired graph view width.
* @returns {object|number} graph instance or graph view width.
*/
Graph.prototype.width = function( value ) {
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
			self._config.scales[ 0 ].range.max = value;

			arr = self._xScale.range();
			self._xScale.range( [ arr[0], value ] );
		});
	
	}
	
	return this;

}; // end METHOD width()

/**
* METHOD: height( value )
*	Height setter and getter. If a value is supplied, defines the graph view height. If no value is supplied, returns the graph view height.
*
* @param {number} height - desired graph view height.
* @returns {object|number} graph instance or graph view height.
*/
Graph.prototype.height = function( value ) {
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
			self._config.scales[ 1 ].range.max = value;

			arr = self._yScale.range();
			self._yScale.range( [ value, arr[1] ] );
		});

	}
	
	return this;

}; // end METHOD height()

/**
* METHOD: xMin( value )
*	xMin setter and getter. If a value is supplied, defines the graph xMin. If no value is supplied, returns the graph xMin.
*
* @param {number} xMin - desired graph xMin.
* @returns {object|number} graph instance or graph xMin.
*/
Graph.prototype.xMin = function( value ) {
	var self = this,
		domain = this._config.scales[ 0 ].domain,
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

			arr = self._xScale.domain();
			self._xScale.domain( [ value, arr[1] ] );
		});
	
	}
	
	return this;

}; // end METHOD xMin()

/**
* METHOD: xMax( value )
*	xMax setter and getter. If a value is supplied, defines the graph xMax. If no value is supplied, returns the graph xMax.
*
* @param {number} xMax - desired graph xMax.
* @returns {object|number} graph instance or graph xMax.
*/
Graph.prototype.xMax = function( value ) {
	var self = this,
		domain = this._config.scales[ 0 ].domain,
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

			arr = self._xScale.domain();
			self._xScale.domain( [ arr[0], value ] );
		});
	
	}
	
	return this;

}; // end METHOD xMax()

/**
* METHOD: yMin( value )
*	yMin setter and getter. If a value is supplied, defines the graph yMin. If no value is supplied, returns the graph yMin.
*
* @param {number} yMin - desired graph yMin.
* @returns {object|number} graph instance or graph yMin.
*/
Graph.prototype.yMin = function( value ) {
	var self = this,
		domain = this._config.scales[ 1 ].domain,
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

			arr = self._yScale.domain();
			self._yScale.domain( [ value, arr[1] ] );
		});
		
	}
	
	return this;

}; // end METHOD yMin()

/**
* METHOD: yMax( value )
*	yMax setter and getter. If a value is supplied, defines the graph yMax. If no value is supplied, returns the graph yMax.
*
* @param {number} yMax - desired graph yMax.
* @returns {object|number} graph instance or graph yMax.
*/
Graph.prototype.yMax = function( value ) {
	var self = this,
		domain = this._config.scales[ 1 ].domain,
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

			arr = self._yScale.domain();
			self._yScale.domain( [ arr[0], value ] );
		});
	
	}

	return this;

}; // end METHOD yMax()

/**
* METHOD: zMin( value )
*	zMin setter and getter. If a value is supplied, defines the graph zMin. If no value is supplied, returns the graph zMin.
*
* @param {number} zMin - desired graph zMin.
* @returns {object|number} graph instance or graph zMin.
*/
Graph.prototype.zMin = function( value ) {
	var self = this,
		domain = this._config.scales[ 2 ].domain,
		rules = 'number';

	if ( !arguments.length ) {
		return domain.min;
	}

	if ( !_.isUndefined( value ) && !_.isNull( value ) ) {
		
		Validator( value, rules, function set( errors ) {
			var arr;
			if ( errors ) {
				console.error( errors );
				throw new Error( 'zMin()::invalid input argument. ' );
			}
			domain.min = value;

			arr = self._zScale.domain();
			self._zScale.domain( [ value, arr[1] ] );
		});
	
	}
	
	return this;

}; // end METHOD zMin()

/**
* METHOD: zMax( value )
*	zMax setter and getter. If a value is supplied, defines the graph zMax. If no value is supplied, returns the graph zMax.
*
* @param {number} zMax - desired graph zMax.
* @returns {object|number} graph instance or graph zMax.
*/
Graph.prototype.zMax = function( value ) {
	var self = this,
		domain = this._config.scales[ 2 ].domain,
		rules = 'number';

	if ( !arguments.length ) {
		return domain.max;
	}

	if ( !_.isUndefined( value ) && !_.isNull( value ) ) {
		
		Validator( value, rules, function set( errors ) {
			var arr;
			if ( errors ) {
				console.error( errors );
				throw new Error( 'zMax()::invalid input argument. ' );
			}
			domain.max = value;

			arr = self._zScale.domain();
			self._zScale.domain( [ arr[0], value ] );
		});
	
	}
	
	return this;

}; // end METHOD zMax()

/**
* METHOD: xDomain( arr )
*	xDomain setter and getter. If an array is supplied, sets the instance xDomain. If no argument is supplied, gets the instance xDomain.
*
* @param {array} arr - 2-element array defining the xDomain
* @returns {object|array} graph instance or xDomain
*/
Graph.prototype.xDomain = function( arr ) {
	var self = this,
		domain = this._config.scales[ 0 ].domain,
		rules = 'array';

	if ( !arguments.length ) {
		return [ domain.min, domain.max ];
	}

	Validator( arr, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'xDomain()::invalid input argument. ' );
		}
		domain.min = arr[ 0 ];
		domain.max = arr[ 1 ];

		self._xScale.domain( arr );
	});
	
	return this;

}; // end METHOD xDomain()

/**
* METHOD: yDomain( arr )
*	yDomain setter and getter. If an array is supplied, sets the instance yDomain. If no argument is supplied, gets the instance yDomain.
*
* @param {array} arr - 2-element array defining the yDomain
* @returns {object|array} graph instance or yDomain
*/
Graph.prototype.yDomain = function( arr ) {
	var self = this,
		domain = this._config.scales[ 1 ].domain,
		rules = 'array';

	if ( !arguments.length ) {
		return [ domain.min, domain.max ];
	}

	Validator( arr, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'yDomain()::invalid input argument. ' );
		}
		domain.min = arr[ 0 ];
		domain.max = arr[ 1 ];

		self._yScale.domain( arr );
	});
	
	return this;

}; // end METHOD yDomain()

/**
* METHOD: zDomain( arr )
*	zDomain setter and getter. If an array is supplied, sets the instance zDomain. If no argument is supplied, gets the instance zDomain.
*
* @param {array} arr - 2-element array defining the zDomain
* @returns {object|array} graph instance or zDomain
*/
Graph.prototype.zDomain = function( arr ) {
	var self = this,
		domain = this._config.scales[ 2 ].domain,
		rules = 'array';

	if ( !arguments.length ) {
		return [ domain.min, domain.max ];
	}

	Validator( arr, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'zDomain()::invalid input argument. ' );
		}
		domain.min = arr[ 0 ];
		domain.max = arr[ 1 ];

		self._zScale.domain( arr );
	});
	
	return this;

}; // end METHOD zDomain()

/**
* METHOD: xRange( arr )
*	xRange setter and getter. If an array is supplied, sets the instance xRange. If no argument is supplied, gets the instance xRange.
*
* @param {array} arr - 2-element array defining the xRange
* @returns {object|array} graph instance or xRange
*/
Graph.prototype.xRange = function( arr ) {
	var self = this,
		range = this._config.scales[ 0 ].range,
		rules = 'array';

	if ( !arguments.length ) {
		return [ range.min, range.max ];
	}

	Validator( arr, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'xRange()::invalid input argument. ' );
		}
		range.min = arr[ 0 ];
		range.max = arr[ 1 ];

		self._xScale.range( arr );
	});
	
	return this;

}; // end METHOD xRange()

/**
* METHOD: yRange( arr )
*	yRange setter and getter. If an array is supplied, sets the instance yRange. If no argument is supplied, gets the instance yRange.
*
* @param {array} arr - 2-element array defining the yRange
* @returns {object|array} graph instance or yRange
*/
Graph.prototype.yRange = function( arr ) {
	var self = this,
		range = this._config.scales[ 1 ].range,
		rules = 'array';

	if ( !arguments.length ) {
		return [ range.max, range.min ];
	}

	Validator( arr, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'yRange()::invalid input argument. ' );
		}
		range.min = arr[ 1 ];
		range.max = arr[ 0 ];

		self._yScale.range( arr );
	});
	
	return this;

}; // end METHOD yRange()

/**
* METHOD: zRange( arr )
*	zRange setter and getter. If an array is supplied, sets the instance zRange. If no argument is supplied, gets the instance zRange.
*
* @param {array} arr - 2-element array defining the zRange
* @returns {object|array} graph instance or zRange
*/
Graph.prototype.zRange = function( arr ) {
	var self = this,
		range = this._config.scales[ 2 ].range,
		rules = 'array';

	if ( !arguments.length ) {
		return [ range.min, range.max ];
	}

	Validator( arr, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'zRange()::invalid input argument. ' );
		}
		range.min = arr[ 0 ];
		range.max = arr[ 1 ];

		self._zScale.range( arr );
	});
	
	return this;

}; // end METHOD zRange()

/**
* METHOD: xScale( type, value )
*	xScale setter and getter. If a type is provided, sets the x-scale according to the specified type. If no type is provided, returns the current x-scale type.
*
* @param {string} type - scale type; must be one of the following: linear, log, pow, category10, category20, category20b, category20c.
* @param {number} value - (optional) scale dependent parameter; e.g., if type=log, value=10 sets the base to 10.
* @returns {object|string} graph instance or the x-scale type
*/
Graph.prototype.xScale = function( type, value ) {
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
* @returns {object|string} graph instance or the y-scale type
*/
Graph.prototype.yScale = function( type, value ) {
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
* METHOD: zScale( type, value )
*	zScale setter and getter. If a type is provided, sets the z-scale according to the specified type. If no type is provided, returns the current z-scale type.
*
* @param {string} type - scale type; must be one of the following: linear, log, pow, category10, category20, category20b, category20c.
* @param {number} value - (optional) scale dependent parameter; e.g., if type=log, value=10 sets the base to 10.
* @returns {object|string} graph instance or the z-scale type
*/
Graph.prototype.zScale = function( type, value ) {
	var self = this;

	if ( !arguments.length || !type ) {
		return this._config.scales[ 2 ].type;
	}

	this.scale( type, value, function returnScale( errors, scale ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'zScale()::invalid input arguments. ' );
		}
		self._config.scales[ 2 ].type = type;

		self._zScale = scale
			.domain([
				self._config.scales[ 2 ].domain.min,
				self._config.scales[ 2 ].domain.max
			])
			.range([
				self._config.scales[ 2 ].range.min,
				self._config.scales[ 2 ].range.max
			]);
	});

	return this;

}; // end METHOD zScale()

/**
* METHOD: scale( type, value, clbk )
*	Generalized scale getter.
*
* @param {string} type - scale type; must be one of the following: linear, log, pow, category10, category20, category20b, category20c.
* @param {number} value - (optional) scale dependent parameter; e.g., if type=log, value=10 sets the base to 10.
* @param {function} clbk - callback to invoke after validation and getting the specified scale. Function should take two arguments: [ errors, scale ].
* @returns {object} graph instance
*/
Graph.prototype.scale = function( type, value, clbk ) {
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
* @returns {object|boolean} graph instance or background display
*/
Graph.prototype.background = function( bool ) {
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
*	Convenience method to set multple position values. If a value is supplied, defines the graph position. If no value is supplied, returns the graph position.
*
* @param {object} value - object with the following properties: left, top. All values assigned to properties should be numbers.
* @returns {object|object} graph instance or position object
*/
Graph.prototype.position = function( value ) {
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
*	Position-left setter and getter. If a value is supplied, defines the graph position-left. If no value is supplied, returns the graph position-left.
*
* @param {number} value - desired graph position-left.
* @returns {object|number} - graph instance or position left value
*/
Graph.prototype.left = function( value ) {
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
*	Position-top setter and getter. If a value is supplied, defines the graph position-top. If no value is supplied, returns the graph position-top.
*
* @param {number} value - desired graph position-top.
* @returns {object|number} - graph instance or position top value
*/
Graph.prototype.top = function( value ) {
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
*	Graph data setter and getter. If data is supplied, sets the graph's current active dataset. If no data is supplied, returns the graph's current active dataset.
*
* @param {object} data - data instance
* @returns {object|object} - graph instance or current active dataset
*/
Graph.prototype.data = function( data ) {

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
*	Returns the graph parent.
*
* @returns {object} parent instance
*/
Graph.prototype.parent = function() {
	return this._parent;
}; // end METHOD parent()

/**
* METHOD: config()
*	Returns the graph configuration as a JSON blob.
* 
* @returns {object} configuration blob
*/
Graph.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()

/**
* METHOD: children()
*	Returns the graph children.
*
* @returns {object} graph children
*/
Graph.prototype.children = function() {
	return this._children;
}; // end METHOD children()