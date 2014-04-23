!function ( d3, _ ){
	var xfig = { version: "0.0.0" }; // semver

xfig.figure = function() {
	return new Figure();
};

xfig.canvas = function( figure ) {
	if ( !figure ) {
		throw new Error( 'canvas()::figure selection not provided. Unable to initialize canvas generator.' );
	}
	if ( !( figure instanceof Figure ) ) {
		throw new Error( 'canvas()::invalid input parameter. Parameter must be a Figure instance.' );
	}
	return new Canvas( figure );
};

xfig.graph = function( canvas ) {
	if ( !canvas ) {
		throw new Error( 'graph()::canvas selection not provided. Unable to initialize graph constructor.' );
	}
	if ( !( canvas instanceof Canvas ) ) {
		throw new Error( 'graph()::invalid input parameter. Argument must be a Canvas instance.' );
	}
	return new Graph( canvas );
};

xfig.multipanel = function( canvas ) {
	if ( !canvas ) {
		throw new Error( 'multipanel()::canvas not provided. Unable to initialize multipanel constructor.' );
	}
	if ( !( canvas instanceof Canvas ) ) {
		throw new Error( 'multipanel()::invalid input parameter. Input argument must be a Canvas instance.' );
	}
	return new Multipanel( canvas );
};

xfig.data = function( data ) {
	if ( !data ) {
		throw new Error( 'data()::data not provided. Unable to initialize data constructor.' );
	}
	if ( !( data instanceof Array ) ) {
		throw new Error( 'data()::invalid input parameter. Input data must be an Array.' );
	}
	return new Data( data );
};

xfig.axes = function( graph ) {
	if ( !graph ) {
		throw new Error( 'axes()::graph not provided. Unable to initialize axes constructor.' );
	}
	if ( !( graph instanceof Graph ) ) {
		throw new Error( 'axes()::invalid input parameter. Input argument must be a Graph instance.' );
	}
	return new Axes( graph );
};

xfig.area = function( graph ) {
	if ( !graph ) {
		throw new Error( 'area()::graph not provided. Unable to initialize area constructor.' );
	}
	if ( !( graph instanceof Graph ) ) {
		throw new Error( 'area()::invalid input parameter. Input argument must be a Graph instance.' );
	}
	return new Area( graph );
};

xfig.line = function( graph ) {
	if ( !graph ) {
		throw new Error( 'line()::graph not provided. Unable to initialize line constructor.' );
	}
	if ( !( graph instanceof Graph ) ) {
		throw new Error( 'line()::invalid input parameter. Input argument must be a Graph instance.' );
	}
	return new Line( graph );
};

xfig.histogram = function( graph ) {
	if ( !graph ) {
		throw new Error( 'histogram()::graph not provided. Unable to initialize histogram constructor.' );
	}
	if ( !( graph instanceof Graph ) ) {
		throw new Error( 'histogram()::invalid input parameter. Input argument must be a Graph instance.' );
	}
	return new Histogram( graph );
};

xfig.timeserieshistogram = function( graph ) {
	if ( !graph ) {
		throw new Error( 'timeserieshistogram()::graph not provided. Unable to initialize timeseries histogram constructor.' );
	}
	if ( !( graph instanceof Graph ) ) {
		throw new Error( 'timeserieshistogram()::invalid input parameter. Input argument must be a Graph instance.' );
	}
	return new TimeseriesHistogram( graph );
};

xfig.annotations = function( parent ) {
	if ( !parent ) {
		throw new Error( 'annotations()::parent instance not provided. Unable to initialize annotations constructor.' );
	}
	if ( !( parent instanceof Canvas ) && !( parent instanceof Graph ) && !( parent instanceof Multipanel ) ) {
		throw new Error( 'annotations()::invalid input parameter. Input argument must be ether a Canvas, Graph, or Multipanel instance.' );
	}
	return new Annotations( parent );
};

// ANNOTATION //

/**
* FUNCTION: Annotations( parent )
*	Annotations constructor. Creates a new annotations instance.
*
* @param {object} parent - parent instance (Canvas, Graph)
* @returns {object} annotations instance
*/
var Annotations = function( parent ) {

	// INSTANCE ATTRIBUTES //

	this._parent = parent;
	this._root = undefined;
	this._children = {};
	this._config = {
		'position': {
			'left': 0,
			'top': 0
		}
	};

	// REGISTER //
	if ( parent._config.hasOwnProperty( 'annotations' )  ) {
		parent._config.annotations.push( this._config );
	} else {
		parent._config.annotations = [ this._config ];
	}
	if ( parent._children.hasOwnProperty( 'annotations' ) ) {
		parent._children.annotations.push( this );
	} else {
		parent._children.annotations = [ this ];
	}

	return this;

}; // end FUNCTION Annotations()

/**
* METHOD: create()
*	Creates a new annotations element.
*
* @returns {object} annotations instance
*/
Annotations.prototype.create = function() {

	var selection = this._parent._root,
		position = this._config.position;
	
	// Create the annotation element:
	this._root = selection.append( 'svg:g' )
		.attr( 'property', 'annotations' )
		.attr( 'class', 'annotations' )
		.attr( 'transform', 'translate(' + position.left + ',' + position.top + ')' );

	return this;

}; // end METHOD create()

/**
* METHOD: position( value )
*	Convenience method to set multple position values. If a value is supplied, defines the annotations position. If no value is supplied, returns the annotations position.
*
* @param {object} value - object with the following properties: left, top. All values assigned to properties should be numbers.
* @returns {object|object} annotations instance or position object
*/
Annotations.prototype.position = function( value ) {
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
*	Position-left setter and getter. If a value is supplied, defines the annotations position-left. If no value is supplied, returns the annotations position-left.
*
* @param {number} value - desired annotations position-left.
* @returns {object|number} - annotations instance or position left value
*/
Annotations.prototype.left = function( value ) {
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
*	Position-top setter and getter. If a value is supplied, defines the annotations position-top. If no value is supplied, returns the annotations position-top.
*
* @param {number} value - desired annotations position-top.
* @returns {object|number} - annotations instance or position top value
*/
Annotations.prototype.top = function( value ) {
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
* METHOD: title()
*	Creates a new title instance.
*
* @returns {object} title instance
*/
Annotations.prototype.title = function() {
	return new Title( this );
}; // end METHOD title()

/**
* METHOD: text()
*	Creates a new text instance.
*
* @returns {object} text instance
*/
Annotations.prototype.text = function() {
	return new Text( this );
}; // end METHOD text()

/**
* METHOD: parent()
*	Returns the annotations parent.
*
* @returns {object} parent instance
*/
Annotations.prototype.parent = function() {
	return this._parent;
}; // end METHOD parent()

/**
* METHOD: config()
*	Returns the annotations configuration as a JSON blob.
*
* @returns {string} configuration blob
*/
Annotations.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()

/**
* METHOD: children()
*	Returns the annotations children.
*
* @returns {object} annotations children
*/
Annotations.prototype.children = function() {
	return this._children;
}; // end METHOD children()

// TEXT //

/**
* FUNCTION: Text( annotations )
*	Text constructor. Creates a new text instance.
*
* @param {object} annotations - annotations instance
* @returns {object} text instance
*/
var Text = function( annotations ) {

	// INSTANCE ATTRIBUTES //

	this._parent = annotations;
	this._root = undefined;
	this._children = {};
	this._config = {
		'width': 200,
		'height': 20,
		'position': {
			'left': 0,
			'top': 0
		},
		'text': ''
	};

	// REGISTER //
	if ( annotations._config.hasOwnProperty( 'text' )  ) {
		annotations._config.text.push( this._config );
	} else {
		annotations._config.text = [ this._config ];
	}
	if ( annotations._children.hasOwnProperty( 'text' ) ) {
		annotations._children.text.push( this );
	} else {
		annotations._children.text = [ this ];
	}

	return this;

}; // end FUNCTION Text()

/**
* METHOD: create( text )
*	Creates a new text element.
*
* @param {string} text - annotation text
* @returns {object} text instance
*/
Text.prototype.create = function( text ) {

	var selection = this._parent._root,
		width = this._config.width,
		height = this._config.height,
		pos = this._config.position;

	this._config.text = text;

	// Create the text element:
	this._root = selection.append( 'svg:foreignObject' )
		.attr( 'width', width )
		.attr( 'height', height )
		.attr( 'x', pos.left )
		.attr( 'y', pos.top );

	this._root.append( 'xhtml:span' )
		.attr( 'property', 'annotation' )
		.attr( 'class', 'text' )
		.html( text );

	return this;

}; // end METHOD create()

/**
* METHOD: width( value )
*	Text container width setter and getter. If a value is supplied, defines the text container width. If no value is supplied, returns the text container width.
*
* @param {number} width - desired text container width.
* @returns {object|number} text instance or text container width.
*/
Text.prototype.width = function( value ) {
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
*	Text container height setter and getter. If a value is supplied, defines the text container height. If no value is supplied, returns the text container height.
*
* @param {number} height - desired text container height.
* @returns {object|number} text instance or text container height.
*/
Text.prototype.height = function( value ) {
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
				throw new Error( 'width()::invalid input argument. ' );
			}
			self._config.height = value;
		});
	
	}
	
	return this;

}; // end METHOD height()

/**
* METHOD: position( value )
*	Convenience method to set multple position values. If a value is supplied, defines the text position. If no value is supplied, returns the text position.
*
* @param {object} value - object with the following properties: left, top. All values assigned to properties should be numbers.
* @returns {object|object} text instance or position object
*/
Text.prototype.position = function( value ) {
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
*	Position-left setter and getter. If a value is supplied, defines the text position-left. If no value is supplied, returns the text position-left.
*
* @param {number} value - desired text position-left.
* @returns {object|number} - text instance or position left value
*/
Text.prototype.left = function( value ) {
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
*	Position-top setter and getter. If a value is supplied, defines the text position-top. If no value is supplied, returns the text position-top.
*
* @param {number} value - desired text position-top.
* @returns {object|number} - text instance or position top value
*/
Text.prototype.top = function( value ) {
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
* METHOD: parent()
*	Returns the text parent.
*
* @returns {object} parent instance
*/
Text.prototype.parent = function() {
	return this._parent;
}; // end METHOD parent()

/**
* METHOD: config()
*	Returns the text configuration as a JSON blob.
*
* @returns {string} configuration blob
*/
Text.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()

/**
* METHOD: children()
*	Returns the text children.
*
* @returns {object} text children
*/
Text.prototype.children = function() {
	return this._children;
}; // end METHOD children()

// TITLE //

/**
* FUNCTION: Title( annotations )
*	Title constructor. Creates a new title instance.
*
* @param {object} annotations - annotations instance
* @returns {object} title instance
*/
var Title = function( annotations ) {

	// INSTANCE ATTRIBUTES //

	this._parent = annotations;
	this._root = undefined;
	this._children = {};
	this._config = {
		'width': 200,
		'height': 28,
		'position': {
			'left': 0,
			'top': 0
		},
		'text': ''
	};

	// REGISTER //
	if ( annotations._config.hasOwnProperty( 'title' )  ) {
		annotations._config.title.push( this._config );
	} else {
		annotations._config.title = [ this._config ];
	}
	if ( annotations._children.hasOwnProperty( 'title' ) ) {
		annotations._children.title.push( this );
	} else {
		annotations._children.title = [ this ];
	}

	return this;

}; // end FUNCTION Title()

/**
* METHOD: create( title )
*	Creates a new title element.
*
* @param {string} title - title text
* @returns {object} title instance
*/
Title.prototype.create = function( title ) {

	var selection = this._parent._root,
		width = this._config.width,
		height = this._config.height,
		pos = this._config.position;

	this._config.text = title;

	// Create the title element:
	this._root = selection.append( 'svg:foreignObject' )
		.attr( 'width', width )
		.attr( 'height', height )
		.attr( 'x', pos.left )
		.attr( 'y', pos.top );

	this._root.append( 'xhtml:span' )
		.attr( 'property', 'title' )
		.attr( 'class', 'title' )
		.html( title );

	return this;

}; // end METHOD create()

/**
* METHOD: width( value )
*	Title container width setter and getter. If a value is supplied, defines the title container width. If no value is supplied, returns the title container width.
*
* @param {number} width - desired title container width.
* @returns {object|number} title instance or title container width.
*/
Title.prototype.width = function( value ) {
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
*	Title container height setter and getter. If a value is supplied, defines the title container height. If no value is supplied, returns the title container height.
*
* @param {number} height - desired title container height.
* @returns {object|number} title instance or title container height.
*/
Title.prototype.height = function( value ) {
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
				throw new Error( 'width()::invalid input argument. ' );
			}
			self._config.height = value;
		});
	
	}
	
	return this;

}; // end METHOD height()

/**
* METHOD: position( value )
*	Convenience method to set multple position values. If a value is supplied, defines the title position. If no value is supplied, returns the title position.
*
* @param {object} value - object with the following properties: left, top. All values assigned to properties should be numbers.
* @returns {object|object} title instance or position object
*/
Title.prototype.position = function( value ) {
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
*	Position-left setter and getter. If a value is supplied, defines the title position-left. If no value is supplied, returns the title position-left.
*
* @param {number} value - desired title position-left.
* @returns {object|number} - title instance or position left value
*/
Title.prototype.left = function( value ) {
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
*	Position-top setter and getter. If a value is supplied, defines the title position-top. If no value is supplied, returns the title position-top.
*
* @param {number} value - desired title position-top.
* @returns {object|number} - title instance or position top value
*/
Title.prototype.top = function( value ) {
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
* METHOD: parent()
*	Returns the title parent.
*
* @returns {object} parent instance
*/
Title.prototype.parent = function() {
	return this._parent;
}; // end METHOD parent()

/**
* METHOD: config()
*	Returns the title configuration as a JSON blob.
*
* @returns {string} configuration blob
*/
Title.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()

/**
* METHOD: children()
*	Returns the title children.
*
* @returns {object} title children
*/
Title.prototype.children = function() {
	return this._children;
}; // end METHOD children()

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
		xAxis, yAxis,
		translate;

	this._root = selection.append( 'svg:g' )
		.attr( 'property', 'axes' )
		.attr( 'class', 'axes' );

	// x-axis:
	if ( this._config[ 0 ].display ) {
		
		switch( this._config[ 0 ].ticks.direction ) {
			case "in":
				translate = 'translate(0,' + (-this._config[ 0 ].ticks.innerSize) + ')';
				break;
			case "both":
				translate = 'translate(0,' + (-this._config[ 0 ].ticks.innerSize/2) + ')';
				console.log( translate );
				break;
			default:
				translate = null;
		}

		xAxis = this._root.append( 'svg:g' )
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

		// Only add an attribute if we need to:
		if ( translate ) {
			xAxis.selectAll( '.tick line' )
				.attr( 'transform', translate );
		}

		xAxis.selectAll( '.tick' )
			.attr( 'property', 'axis_tick' );

		xAxis.selectAll( '.domain' )
			.attr( 'property', 'axis_domain' );
	}

	// y-axis:
	if ( this._config[ 1 ].display ) {

		switch( this._config[ 1 ].ticks.direction ) {
			case "in":
				translate = 'translate(' + (-this._config[ 1 ].ticks.innerSize) + ',0)';
				break;
			case "both":
				translate = 'translate(' + (-this._config[ 1 ].ticks.innerSize/2) + ',0)';
				break;
			default:
				translate = null;
		}

		yAxis = this._root.append( 'svg:g' )
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

		// Only add an attribute if we need to:
		if ( translate ) {
			yAxis.selectAll( '.tick line' )
				.attr( 'transform', translate );
		}

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
*	x-axis tick format setter and getter. If a format is supplied, sets the x-axis tick format. If no format is supplied, gets the x-axis tick format. 
*
* @param {string} value - x-axis tick format; available time formatting: %Y, %B, %b, %a, %d, %I, %p, %M, %S, %L.
* @returns {object|string} axes instance or x-axis tick format
*/
Axes.prototype.xTickFormat = function( value ) {
	var self = this,
		timeFormats = ['%Y','%B','%b','%a','%d','%I','%p','%M','%S','%L'],
		rules;

	if ( !arguments.length ) {
		return this._config[ 0 ].ticks.format;
	}

	if ( timeFormats.indexOf( value ) !== -1 ) {
		// https://github.com/mbostock/d3/wiki/Time-Scales
		rules = 'string|matches[' + timeFormats.join( ',' ) + ']';
		flg = 'time';
	} else if ( value === '' ) {
		rules = 'string|empty';
		flg = 'empty';
	} else if ( value === null ) {
		rules = 'null';
		flg = 'none';
	} else {
		rules = 'string';
	}

	Validator( value, rules, function set( errors ) {
		var format;
		if ( errors ) {
			console.error( errors );
			throw new Error( 'xTickFormat()::invalid input arguments.' );
		}
		switch ( flg ) {
			case 'time':
				format = d3.time.format( value );
				break;
			case 'empty':
				format = '';
				break;
			case 'none':
				format = null;
				break;
			default:
				format = d3.format( value );
				break;
		}
		self._config[ 0 ].ticks.format = value;
		self._xAxis.tickFormat( format );
	});
	
	return this;

}; // end METHOD xTickFormat()

/**
* METHOD: yTickFormat( value, flg )
*	y-axis tick format setter and getter. If a format is supplied, sets the y-axis tick format. If no format is supplied, gets the y-axis tick format. 
*
* @param {string} value - y-axis tick format; available time formatting: %Y, %B, %b, %a, %d, %I, %p, %M, %S, %L.
* @returns {object|string} axes instance or y-axis tick format
*/
Axes.prototype.yTickFormat = function( value ) {
	var self = this,
		timeFormats = ['%Y','%B','%b','%a','%d','%I','%p','%M','%S','%L'],
		rules;

	if ( !arguments.length ) {
		return this._config[ 1 ].ticks.format;
	}

	if ( timeFormats.indexOf( value ) !== -1 ) {
		// https://github.com/mbostock/d3/wiki/Time-Scales
		rules = 'string|matches[' + timeFormats.join( ',' ) + ']';
		flg = 'time';
	} else if ( value === '' ) {
		rules = 'string|empty';
		flg = 'empty';
	} else if ( value === null ) {
		rules = 'null';
		flg = 'none';
	} else {
		rules = 'string';
	}

	Validator( value, rules, function set( errors ) {
		var format;
		if ( errors ) {
			console.error( errors );
			throw new Error( 'yTickFormat()::invalid input arguments.' );
		}
		switch ( flg ) {
			case 'time':
				format = d3.time.format( value );
				break;
			case 'empty':
				format = '';
				break;
			case 'none':
				format = null;
				break;
			default:
				format = d3.format( value );
				break;
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
* METHOD: xTickDirection( value )
*	x-axis tick direction setter and getter. If a direction is supplied, sets the x-axis tick direction. If no direction is supplied, gets the x-axis tick direction.
*
* @param {string} value - tick direction; must be either 'in', 'out', or 'both'
* @returns {object|string} instance object or x-axis tick direction
*/
Axes.prototype.xTickDirection = function( value ) {
	var self = this,
		rules = 'matches[in,out,both]';

	if ( !arguments.length ) {
		return this._config[ 0 ].ticks.direction;
	}

	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'xTickDirection()::invalid input argument.' );
		}
		self._config[ 0 ].ticks.direction = value;
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
Axes.prototype.yTickDirection = function( value ) {
	var self = this,
		rules = 'matches[in,out,both]';

	if ( !arguments.length ) {
		return this._config[ 1 ].ticks.direction;
	}

	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'yTickDirection()::invalid input argument.' );
		}
		self._config[ 1 ].ticks.direction = value;
	});

	return this;

}; // end METHOD yTickDirection()

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

// CANVAS //

/**
* FUNCTION: Canvas( figure )
*	Canvas constructor. Creates a new canvas instance.
*
* @param {object} figure - parent figure instance
* @returns {object} canvas instance
*/
var Canvas = function( figure ) {

	// INSTANCE ATTRIBUTES //

	this._parent = figure;
	this._root = undefined;
	this._children = {};
	this._config = {
		'width': 500,
		'height': 500,
		"background": false
	};

	// REGISTER //
	if ( figure._config.hasOwnProperty( 'canvas' )  ) {
		figure._config.canvas.push( this._config );
	} else {
		figure._config.canvas = [ this._config ];
	}
	if ( figure._children.hasOwnProperty( 'canvas' ) ) {
		figure._children.canvas.push( this );
	} else {
		figure._children.canvas = [ this ];
	}

	return this;

}; // end FUNCTION Canvas()

/**
* METHOD: create( type )
*	Creates a new canvas element. If a type is supplied, appends a canvas element of the specified type to a root figure element. If no type is supplied, defaults to svg canvas.
*
* @param {string} type - canvas type to be created.
* @returns {object} canvas instance
*/
Canvas.prototype.create = function( type ) {

	// VARIABLES //
	var self = this;

	// CHECKS!!!
	if ( !type ) {
		type = 'svg';
	}

	// CANVAS //

	// Create a new canvas based on the specified type...
	switch ( type ) {
		case 'svg':
			this._root = svg();
			break;
		default:
			throw new Error( 'create()::unrecognized canvas type: ' + type );
	} // end SWITCH (type)

	return this;

	// FUNCTIONS //

	/**
	* FUNCTION: svg()
	*	Append an SVG canvas to a parent element.
	*
	* @returns {object} SVG element as a D3 selection.
	*/
	function svg() {
		var parent = self._parent._root,
			width = self._config.width,
			height = self._config.height,
			canvas;

		canvas = d3.select( parent ).append( 'svg:svg' )
			.attr( 'property', 'canvas' )
			.attr( 'class', 'canvas' )
			.attr( 'width', width )
			.attr( 'height', height )
			.attr( 'viewBox', '0 0 ' + width + ' ' + height )
			.attr( 'preserveAspectRatio', 'xMidYMid' )
			.attr( 'data-aspect', width / height );

		return canvas;
	} // end FUNCTION svg()

}; // end METHOD create()


/**
* METHOD: width( value )
*	Width setter and getter. If a value is supplied, defines the canvas width. If no value is supplied, returns the canvas width.
*
* @param {number} width - desired canvas width.
* @returns {object|number} canvas instance or canvas width.
*/
Canvas.prototype.width = function( value ) {
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
		});

	}

	return this;
	
}; // end METHOD width()

/**
* METHOD: height( value )
*	Height setter and getter. If a value is supplied, defines the canvas height. If no value is supplied, returns the canvas height.
*
* @param {number} height - desired canvas height.
* @returns {object|number} canvas instance or canvas height.
*/
Canvas.prototype.height = function( value ) {
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
* METHOD: background( bool )
*	Background display setter and getter. If a boolean is provided, sets the background display. If no boolean is provided, gets the background display. If false, when canvases are created, no background is created.
*
* @param {boolean} bool - boolean flag indicating whether to create a background.
* @returns {object|boolean} canvas instance or background display
*/
Canvas.prototype.background = function( bool ) {
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
* METHOD: parent()
*	Returns the canvas parent.
*
* @returns {object} parent instance
*/
Canvas.prototype.parent = function() {
	return this._parent;
}; // end METHOD parent()

/**
* METHOD: config()
*	Returns the canvas configuration as a JSON blob.
*
* @returns {string} configuration blob
*/
Canvas.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()

/**
* METHOD: children()
*	Returns the canvas children.
*
* @returns {object} canvas children
*/
Canvas.prototype.children = function() {
	return this._children;
}; // end METHOD children()

// DATA //

/**
* FUNCTION: Data( data )
*	Data constructor. Creates a new data instance.
*
* @param {array} data - input data is expected to be an array of arrays; e.g., [[[0,0],[1,1],...,[N,N]]] or [[{x:0,y:0},{x:1,y:1},...{x:N,y:N}]]. Elements in the outer array are treated as separate datasets.
* @returns {object} data instance
*/
var Data = function( data ) {

	// INSTANCE ATTRIBUTES //

	this._config = {};
	this._data = data;

	this._xMin = null;
	this._xMax = null;
	this._yMin = null;
	this._yMax = null;
	this._zMin = null;
	this._zMax = null;

	// ACCESSORS:
	this._xValue = function( d ) { return d[ 0 ]; };
	this._yValue = function( d ) { return d[ 1 ]; };
	this._zValue = function( d ) { return d[ 2 ]; };

	return this;

}; // end FUNCTION Data()

/**
* METHOD: transform( dim )
*	Transform raw data into a format amenable to graph generation.
*
* @param {number} dim - data dimensionality; e.g., if 1-dimensional, say, for a histogram, then dim=1.
* @returns {object} data instance
*/
Data.prototype.transform = function( dim ) {

	var data = this._data,
		fcns = [
			this._xValue,
			this._yValue,
			this._zValue
		],
		arr = [];

	if ( !arguments.length ) {
		throw new Error( 'transform()::insufficient input arguments. The number of dimensions to transform must be provided.' );
	}
	if ( dim < 1 || dim > 3 ) {
		throw new Error( 'transform()::invalid input argument. Dimensionality must be an integer on the interval: [1,3].' );
	}
	data = d3.range( data.length ).map( function ( id ) {
		return data[ id ].map( function ( d, i ) {
			arr = [];
			for ( var n = 0; n < dim; n++ ) {
				arr.push( fcns[ n ].call( data[ id ], d, i ) );
			}
			return arr;
		});
	});

	this._data = data;

	return this;

}; // end METHOD transform()

/**
* METHOD: linspace( min, max, increment )
*	Generate a linearly spaced vector.
*
* @param {number} min - min defines the vector lower bound
* @param {number} max - max defines the vector upper bound
* @param {number} increment - distance between successive vector elements
* @returns {array} a 1-dimensional array
*/
Data.prototype.linspace = function ( min, max, increment ) {
	var numElements, vec = [];

	numElements = Math.round( ( ( max - min ) / increment ) ) + 1;

	vec[ 0 ] = min;
	vec[ numElements - 1] = max;

	for ( var i = 1; i < numElements - 1; i++ ) {
		vec[ i ] = min + increment*i;
	}

	return vec;
}; // end METHOD linspace()

/**
* METHOD: min( accessor )
*	Determines the min data value.
*
* @param {function} accessor - data accessor specifying how to access data values
* @returns {number} min data value
*/
Data.prototype.min = function( accessor ) {
	return d3.min( this._data, function ( dataset ) {
		return d3.min( dataset, function ( d ) {
			return accessor( d );
		});
	});
}; // end METHOD min()

/**
* METHOD: max( accessor )
*	Determines the max data value.
*
* @param {function} accessor - data accessor specifying how to access data values
* @returns {number} max data value
*/
Data.prototype.max = function( accessor ) {
	return d3.max( this._data, function ( dataset ) {
		return d3.max( dataset, function ( d ) {
			return accessor( d );
		});
	});
}; // end METHOD max()

/**
* METHOD: mean( accessor )
*	Calculates the mean values for an array of arrays.
*
* @param {function} accessor - data accessor specifying how to access data values
* @returns {array} 1d array of mean values
*/
Data.prototype.mean = function( accessor ) {
	var d = this._data.map( function ( dataset ) {
		return dataset.map( function ( d ) {
			return accessor( d );
		});
	});
	return d.map( function ( dataset ) {
		return mean( dataset );
	});
}; // end METHOD mean()

/**
* FUNCTION: mean( vector )
*	Calculates the mean value of an input vector.
*
* @param {array} vector - 1d array of numeric values
* @returns {number} mean value
*/
function mean( vector ) {
	var sum = 0;
	for ( var i = 0; i < vector.length; i++ ) {
		sum += vector[ i ];
	}
	return sum / vector.length;
} // end FUNCTION mean()

/**
* METHOD: reorder( vector )
*	Reorders the data based on an index vector.
*
* @param {array} vector - 1d array of indices
* @returns {object} instance object
*/
Data.prototype.reorder = function( vector ) {
	var self = this;
	if ( this._data.length !== vector.length ) {
		throw new Error( 'reorder()::invalid input argument. Vector length must equal data length.' );
	}
	this._data = vector.map( function ( id ) {
		return self._data[ id ];
	});
	return this;
}; // end METHOD reorder()

/**
* METHOD: extract( accessor )
*	Reduce data dimensionality by extracting data feature(s).
*
* @param {function} accessor - data accessor specifying how to access data values
* @returns {object} instance object
*/
Data.prototype.extract = function( accessor ) {
	this._data = this._data.map( function ( dataset ) {
		return dataset.map( function ( d ) {
			return accessor( d );
		});
	});
	return this;
}; // end METHOD extract()

/**
* METHOD: size()
*	Determine instance data size. (NOTE: we assume homogenous 2d data array)
*
* @returns {array} data size: [1d,2d]
*/
Data.prototype.size = function() {
	var size = [];
	size.push( this._data.length );
	size.push( this._data[ 0 ].length );
	return size;
}; // end METHOD size()

/**
* METHOD: histc( accessor, edges )
*	Generates a counts vector where a count represents the number of data points falling in a bin defined by a pair of edges in the edge vector.
*
* @param {function} accessor - data accessor specifying the data to bin
* @param {array} edges - (optional) 1d vector of edges defining bins; if not provided, a default edge vector is created of 21 bins where the start and end edge are defined by the data.
* @returns {object} data instance
*/
Data.prototype.histc = function( accessor, edges ) {

	var data = this._data,
		min, max, numEdges = 21, binWidth;

	if ( !accessor ) {
		throw new Error( 'histc()::insufficient input arguments. An data value accessor must be provided.' );
	}

	// Convert data to standard representation; needed for non-deterministic accessors:
	data = d3.range( data.length ).map( function ( id ) {
		return data[ id ].map( function ( d, i ) {
			return accessor.call( data[ id ], d, i );
		});
	});

	if ( !edges.length ) {
		
		min = this.min( data, function ( d ) {
				return d;
			});

		max = this.max( data, function ( d ) {
				return d;
			});

		binWidth = ( max - min ) / ( numEdges - 1 );

		edges = this.linspace( min, max+1e-16, binWidth );

	} // end IF (edges)

	// Histogram the data:
	data = d3.range( data.length ).map( function ( id ) {

		var counts;

		counts = histc( data[ id ], edges );

		// Augment counts to include the edge and binWidth (binWidth is needed in the event of variable bin width ):
		counts = counts.map( function ( d, i ) {
			return [
				edges[ i-1 ],
				counts[ i ],
				edges[ i ]
			];
		});

		// Drop the first and last bins as these include values which exceeded the lower and upper bounds:
		return counts.slice( 1, counts.length-1 );

	});

	this._data = data;

	return this;

}; // end METHOD histc()

/**
* METHOD: hist2c( xValue, yValue, xEdges, yEdges )
*	Generates a counts array where a count represents the number of data points falling in a pixel defined by a pair of x-edges and a pair of y-edges.
*
* @param {function} xValue - data accessor specifying the data to bin along the first dimension
* @param {function} yValue - data accessor specifying the data to bin along the second dimension
* @param {array} xEdges - (optional) 1d vector of edges defining bins along the first dimesion; if not provided, a default edge vector is created of 100 bins where the start and end edge are defined by the data.
* @param {array} yEdges - (optional) 1d vector of edges defining bins along the second dimesion; if not provided, a default edge vector is created of 100 bins where the start and end edge are defined by the data.
* @returns {object} data instance
*/
Data.prototype.hist2c = function( xValue, yValue, xEdges, yEdges ) {

	var data = this._data,
		xNumEdges = 101,
		yNumEdges = 101,
		min, max;

	if ( !xValue || !yValue ) {
		throw new Error( 'hist2c()::insufficient input arguments. Both an x-value and y-value accessor must be supplied.' );
	}

	// Convert data to standard representation; needed for non-deterministic accessors:
	data = d3.range( data.length ).map( function ( id ) {
		return data[ id ].map( function ( d, i ) {
			return [
				xValue.call( data[ id ], d, i ),
				yValue.call( data[ id ], d, i )
			];
		});
	});

	if ( !xEdges.length ) {
		
		min = this.min( data, function ( d ) {
				return d[ 0 ];
			});

		max = this.max( data, function ( d ) {
				return d[ 0 ];
			});

		binWidth = ( max - min ) / ( xNumEdges - 1 );

		xEdges = this.linspace( min, max+1e-16, binWidth );

	} // end IF (xEdges)

	if ( !yEdges.length ) {
		
		min = this.min( data, function ( d ) {
				return d[ 1 ];
			});

		max = this.max( data, function ( d ) {
				return d[ 1 ];
			});

		binWidth = ( max - min ) / ( yNumEdges - 1 );

		yEdges = this.linspace( min, max+1e-16, binWidth );

	} // end IF (yEdges)

	// Histogram the data:
	data = hist2c( data, xEdges, yEdges );

	// Drop the first and last bins as these include values which exceeded the lower and upper bounds:
	data = data.map( function ( d, i ) {
		return data[ i ].slice( 1, data[ i ].length - 1 );
	});

	this._data = data.slice( 1, data.length-1 );

	return this;

}; // end METHOD hist2c()

/**
* METHOD: data()
*	Retrieve instance data.
*
* @returns {array} an array of arrays. 
*/
Data.prototype.data = function() {
	return this._data;
}; // end METHOD data()

/**
* METHOD: x( fcn )
*	x-value accessor setter and getter. If a function is supplied, sets the x-value accessor. If no function is supplied, returns the x-value accessor.
*
* @param {function} fcn - x-value accessor
* @returns {function} x-value accessor
*/
Data.prototype.x = function( fcn ) {
	var self = this,
		rules = 'function';

	if ( !arguments.length ) {
		return this._xValue;
	}
	
	Validator( fcn, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'x()::invalid input argument.' );
		}
		self._xValue = fcn;
	});

	return this;

}; // end METHOD x()

/**
* METHOD: y( fcn )
*	y-value accessor setter and getter. If a function is supplied, sets the y-value accessor. If no function is supplied, returns the y-value accessor.
*
* @param {function} fcn - y-value accessor
* @returns {function} y-value accessor
*/
Data.prototype.y = function( fcn ) {
	var self = this,
		rules = 'function';

	if ( !arguments.length ) {
		return this._yValue;
	}
	
	Validator( fcn, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'y()::invalid input argument.' );
		}
		self._yValue = fcn;
	});

	return this;

}; // end METHOD y()

/**
* METHOD: z( fcn )
*	z-value accessor setter and getter. If a function is supplied, sets the z-value accessor. If no function is supplied, returns the z-value accessor.
*
* @param {function} fcn - z-value accessor
* @returns {function} z-value accessor
*/
Data.prototype.z = function( fcn ) {
	var self = this,
		rules = 'function';

	if ( !arguments.length ) {
		return this._zValue;
	}
	
	Validator( fcn, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'z()::invalid input argument.' );
		}
		self._zValue = fcn;
	});

	return this;

}; // end METHOD z()

/**
* METHOD: config()
*	Returns the data configuration as a JSON blob.
* 
* @returns {object} configuration blob
*/
Data.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()




// FIGURE //

/**
* FUNCTION: Figure()
*	Figure constructor. Creates a new figure instance.
*
* @returns {object} figure instance
*/
var Figure = function() {

	// INSTANCE ATTRIBUTES //

	this._config = {};
	this._parent = undefined;
	this._root = undefined;
	this._children = {};

	return this;

}; // end FUNCTION Figure()

/**
* METHOD: create( selection )
*	Creates a new figure element. If a selection is supplied, appends a figure element to a selection. If no selection is supplied, a figure is appended to a newly create HTML element; to access the figure parent, use the parent method.
*
* @param {object} selection - DOM element selection, e.g., document.querySelector( '.main' )
* @returns {object} figure instance
*/
Figure.prototype.create = function( selection ) {
	var figure, elements;
	if ( !arguments.length ) {
		selection = document.createElement( 'div' );
	}
	this._parent = selection;
	figure = document.createElement( 'figure' );
	figure.setAttribute( 'property', 'figure' );
	figure.className += 'figure';
	selection.appendChild( figure );
	elements = selection.querySelectorAll( '.figure' );
	this._root = elements[ elements.length - 1 ];
	return this;
}; // end METHOD create()

/**
* METHOD: parent()
*	Returns the figure parent.
*
* @returns {object} parent DOM element
*/
Figure.prototype.parent = function() {
	return this._parent;
}; // end METHOD parent()

/**
* METHOD: config()
*	Returns the figure configuration as a JSON blob.
*
* @returns {object} configuration blob
*/
Figure.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()

/**
* METHOD: children()
*	Returns the figure children.
*
* @returns {object} figure children
*/
Figure.prototype.children = function() {
	return this._children;
}; // end METHOD children()


// GRAPH //

/**
* FUNCTION: Graph( canvas )
*	Graph constructor. Creates a new graph instance.
*
* @param {object} canvas - parent canvas instance
* @returns {object} graph instance
*/
var Graph = function( canvas ) {

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

}; // end FUNCTION Graph()

/**
* METHOD: create( type )
*	Creates a new graph element and appends to a canvas element. Option to define the graph type.
*
* @param {string} type - graph type
* @returns {object} graph instance
*/
Graph.prototype.create = function( type ) {

	// VARIABLES //
	var selection = this._parent._root,
		position = this._config.position,
		width = this._config.width,
		height = this._config.height,
		clipPath, background,
		id = Date.now();

	// GRAPH //

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

// Area //

/**
* FUNCTION: Area( graph )
*	Area constructor. Creates a new area instance.
*
* @param {object} graph - parent graph instance
* @returns {object} area instance
*/
var Area = function( graph ) {

	// INSTANCE ATTRIBUTES //

	this._parent = graph;
	this._root = undefined;
	this._children = {};
	this._config = {
		"type": "area",
		"interpolation": {
			"mode": "linear",
			"tension": 0.7
		},
		"labels": []
	};

	// DATA //

	this._data = graph._data;

	// TRANSFORMS //

	this._transforms = {
		'x': function X( d ) {
			return graph._xScale( d[ 0 ] );
		},
		'y0': function Y0( d ) {
			return graph._yScale( 0 );
		},
		'y1': function Y1( d ) {
			return graph._yScale( 0 + d[ 1 ] );
		}
	};

	// GENERATOR //

	this._path = this.path()
		.x( this._transforms.x )
		.y0( this._transforms.y0 )
		.y1( this._transforms.y1 )
		.interpolate( this._config.interpolation.mode )
		.tension( this._config.interpolation.tension );

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

}; // end FUNCTION Area()

/**
* METHOD: create()
*	Creates a new area element.
*
* @returns {object} area instance
*/
Area.prototype.create = function() {

	var selection = this._parent._root,
		labels = this._config.labels,
		paths;

	// Create the marks group:
	this._root = selection.append( 'svg:g' )
		.attr( 'property', 'marks' )
		.attr( 'class', 'marks' )
		.attr( 'clip-path', 'url(#' + selection.attr( 'data-clipPath' ) + ')' );

	// Add area paths:
	paths = this._root.selectAll( '.area' )
		.data( this._data )
	  .enter().append( 'svg:path' )
		.attr( 'property', 'area' )
		.attr( 'class', 'area' )
		.attr( 'data-label', function ( d, i ) { return labels[ i ]; })
		.attr( 'd', this._path );

	return this;

}; // end METHOD create()

/**
* METHOD: path()
*	Retrieves the area path generator.
*
* @returns {function} area path generator
*/
Area.prototype.path = function() {
	return d3.svg.area();
}; // end METHOD path()


/**
* METHOD: interpolation( mode )
*	Interpolation mode setter and getter. If a mode is supplied, sets the instance interpolation mode. If no mode is supplied, returns the instance interpolation mode.
*
* @param {string} mode - interpolation mode; must be one of the following: linear, linear-closed, step, step-before, step-after, basis, basis-open, basis-closed, bundle, cardinal, cardinal-open, cardinal-closed, monotone.
* @returns {object|string} area instance or interpolation mode
*/
Area.prototype.interpolation = function( mode ) {

	var self = this;

		// https://github.com/mbostock/d3/wiki/SVG-Shapes#wiki-line_interpolate
		rules = 'string|matches[linear,linear-closed,step,step-before,step-after,basis,basis-open,basis-closed,bundle,cardinal,cardinal-open,cardinal-closed,monotone]';

	if ( !arguments.length ) {
		return this._config.interpolation.mode;
	}

	Validator( mode, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'interpolation()::invalid input argument.' );
		}
		self._config.interpolation.mode = mode;
		self._path.interpolate( mode );
	});
	
	return this;

}; // end METHOD interpolation()

/**
* METHOD: tension( value )
*	Interpolation tension setter and getter. If a value is supplied, sets the instance interpolation tension. If no value is supplied, returns the instance interpolation tension.
*
* @param {number} value - interpolation tension; must reside within the interval [0,1].
* @returns {object|number} area instance or interpolation tension
*/
Area.prototype.tension = function( value ) {
	var self = this,
		rules = 'interval[0,1]';

	if ( !arguments.length ) {
		return this._config.interpolation.tension;
	}
	
	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'tension()::invalid input argument.' );
		}
		self._config.interpolation.tension = value;
		self._path.tension( value );
	});

	return this;

}; // end METHOD tension()

/**
* METHOD: labels( arr )
*	Marks labels setter and getter. If a label array is supplied, sets the marks labels. If no label array is supplied, retrieves the marks labels.
*
* @param {array} arr - an array of labels (strings)
* @returns {object|array} area instance or an array of labels
*/
Area.prototype.labels = function ( arr ) {
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
*	Returns the area parent.
*
* @returns {object} area parent
*/
Area.prototype.parent = function() {
	return this._parent;
}; // end METHOD parent()

/**
* METHOD: config()
*	Returns the area configuration as a JSON blob.
*
* @returns {object} configuration blob
*/
Area.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()

/**
* METHOD: children()
*	Returns the area children.
* 
* @returns {object} area children
*/
Area.prototype.children = function() {
	return this._children;
}; // end METHOD children()

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

// Line //

/**
* FUNCTION: Line( graph )
*	Line constructor. Creates a new line instance.
*
* @param {object} graph - parent graph instance
* @returns {object} line instance
*/
var Line = function( graph ) {

	// INSTANCE ATTRIBUTES //

	this._parent = graph;
	this._root = undefined;
	this._children = {};
	this._config = {
		"type": "line",
		"interpolation": {
			"mode": "linear",
			"tension": 0.7
		},
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
		}
	};

	// GENERATOR //

	this._path = this.path()
		.x( this._transforms.x )
		.y( this._transforms.y )
		.interpolate( this._config.interpolation.mode )
		.tension( this._config.interpolation.tension );

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

}; // end FUNCTION Line()

/**
* METHOD: create()
*	Creates a new line element.
*
* @returns {object} line instance
*/
Line.prototype.create = function() {

	var selection = this._parent._root,
		labels = this._config.labels,
		paths;

	// Create the marks group:
	this._root = selection.append( 'svg:g' )
		.attr( 'property', 'marks' )
		.attr( 'class', 'marks' )
		.attr( 'clip-path', 'url(#' + selection.attr( 'data-clipPath' ) + ')' );

	// Add line paths:
	paths = this._root.selectAll( '.line' )
		.data( this._data )
	  .enter().append( 'svg:path' )
		.attr( 'property', 'line' )
		.attr( 'class', 'line' )
		.attr( 'data-label', function ( d, i ) { return labels[ i ]; })
		.attr( 'd', this._path );

	return this;

}; // end METHOD create()

/**
* METHOD: path()
*	Retrieves the line path generator.
*
* @returns {function} line path generator
*/
Line.prototype.path = function() {
	return d3.svg.line();
}; // end METHOD path()


/**
* METHOD: interpolation( mode )
*	Interpolation mode setter and getter. If a mode is supplied, sets the instance interpolation mode. If no mode is supplied, returns the instance interpolation mode.
*
* @param {string} mode - interpolation mode; must be one of the following: linear, linear-closed, step, step-before, step-after, basis, basis-open, basis-closed, bundle, cardinal, cardinal-open, cardinal-closed, monotone.
* @returns {object|string} line instance or interpolation mode
*/
Line.prototype.interpolation = function( mode ) {

	var self = this;

		// https://github.com/mbostock/d3/wiki/SVG-Shapes#wiki-line_interpolate
		rules = 'string|matches[linear,linear-closed,step,step-before,step-after,basis,basis-open,basis-closed,bundle,cardinal,cardinal-open,cardinal-closed,monotone]';

	if ( !arguments.length ) {
		return this._config.interpolation.mode;
	}

	Validator( mode, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'interpolation()::invalid input argument.' );
		}
		self._config.interpolation.mode = mode;
		self._path.interpolate( mode );
	});
	
	return this;

}; // end METHOD interpolation()

/**
* METHOD: tension( value )
*	Interpolation tension setter and getter. If a value is supplied, sets the instance interpolation tension. If no value is supplied, returns the instance interpolation tension.
*
* @param {number} value - interpolation tension; must reside within the interval [0,1].
* @returns {object|number} line instance or interpolation tension
*/
Line.prototype.tension = function( value ) {
	var self = this,
		rules = 'interval[0,1]';

	if ( !arguments.length ) {
		return this._config.interpolation.tension;
	}
	
	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'tension()::invalid input argument.' );
		}
		self._config.interpolation.tension = value;
		self._path.tension( value );
	});

	return this;

}; // end METHOD tension()

/**
* METHOD: labels( arr )
*	Marks labels setter and getter. If a label array is supplied, sets the marks labels. If no label array is supplied, retrieves the marks labels.
*
* @param {array} arr - an array of labels (strings)
* @returns {object|array} line instance or an array of labels
*/
Line.prototype.labels = function ( arr ) {
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
*	Returns the line parent.
*
* @returns {object} line parent
*/
Line.prototype.parent = function() {
	return this._parent;
}; // end METHOD parent()

/**
* METHOD: config()
*	Returns the line configuration as a JSON blob.
*
* @returns {object} configuration blob
*/
Line.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()

/**
* METHOD: children()
*	Returns the line children.
* 
* @returns {object} line children
*/
Line.prototype.children = function() {
	return this._children;
}; // end METHOD children()

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
		"width": 600,
		"height": 400,
		"position": {
			"top": 80,
			"left": 90
		},
		"padding": 10,
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
* METHOD: create( type )
*	Creates a new multipanel element and appends to a canvas element. Option to define the multipanel graph type.
*
* @param {string} type - multipanel type
* @returns {object} multipanel instance
*/
Multipanel.prototype.create = function( type ) {

	// VARIABLES //
	var config = this._config,
		selection = this._parent._root,
		position = config.position,
		height = config.height,
		padding = config.padding,
		graphHeight, top,
		graph, axes,
		total = this._data.length,
		xAxisFLG, yAxisFLG;

	// MULTIPANEL //

	// Create the multipanel element:
	this._root = selection.append( 'svg:g' )
		.attr( 'property', 'multipanel' )
		.attr( 'class', 'multipanel' )
		.attr( 'transform', 'translate(' + position.left + ',' + position.top + ')' );

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
		graph = createGraph( this, graphHeight, top, this._data[ i ] );

		// Axes:
		axes = createAxes( graph, xAxisFLG );

	} // end FOR i

	return this;

	// FUNCTIONS //

	function createGraph( parent, height, top, data ) {
		var graph;

		graph = new Graph( parent );

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

	} // end FUNCTION createGraph()

	function createAxes( graph, xAxisFLG ) {
		var axes, yTicks;

		axes = new Axes( graph );

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
			.xAxisDisplay( config.axes[ 0 ].display )
			.yAxisDisplay( config.axes[ 1 ].display );

		// Show x-axis tick labels:
		if ( xAxisFLG ) {
			axes.xLabel( config.axes[ 0 ].label )
				.xTickFormat( config.axes[ 0 ].ticks.format );
		} else {
			axes.xLabel( '' )
				.xTickFormat( '' );
		}

		// Create the axes:
		axes.create();

		return axes;

	} // end FUNCTION createAxes()

}; // end METHOD create()

/**
* METHOD: padding( value )
*	Panel padding setter and getter. If a value is supplied, defines the panel padding. If no value is supplied, returns the panel padding.
*
* @param {number} value - panel padding; i.e., the vertical padding between panels
* @returns {object|number} multipanel instance or panel padding
*/
Multipanel.prototype.padding = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config.padding;
	}

	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'padding()::invalid input argument. ' );
		}
		self._config.padding = value;
	});
	
	return this;

}; // end METHOD padding()

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
Multipanel.prototype.yMax = function( value ) {
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
*	Multipanel data setter and getter. If data is supplied, sets the multipanel's current active dataset. If no data is supplied, returns the multipanel's datasets.
*
* @param {array} data - array of data instances
* @returns {object|object} - multipanel instance or multipanel datasets
*/
Multipanel.prototype.data = function( data ) {
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
* @returns {object|string} multipanel instance or x-axis label
*/
Multipanel.prototype.xLabel = function( value ) {
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
* @returns {object|string} multipanel instance or y-axis label
*/
Multipanel.prototype.yLabel = function( value ) {
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
* @returns {object|string} multipanel instance or x-axis tick number
*/
Multipanel.prototype.xNumTicks = function( value ) {
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
* @returns {object|string} multipanel instance or y-axis tick number
*/
Multipanel.prototype.yNumTicks = function( value ) {
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
* @returns {object|number} - multipanel instance or x-axis tick padding
*/
Multipanel.prototype.xTickPadding = function( value ) {
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
* @returns {object|number} - multipanel instance or y-axis tick padding
*/
Multipanel.prototype.yTickPadding = function( value ) {
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
* @returns {object|number} - multipanel instance or x-axis tick rotation
*/
Multipanel.prototype.xTickRotation = function( value ) {
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
Multipanel.prototype.yTickRotation = function( value ) {
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
Multipanel.prototype.xInnerTickSize = function( value ) {
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
Multipanel.prototype.yInnerTickSize = function( value ) {
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
Multipanel.prototype.xOuterTickSize = function( value ) {
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
Multipanel.prototype.yOuterTickSize = function( value ) {
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
Multipanel.prototype.xTickFormat = function( value, flg ) {
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
Multipanel.prototype.yTickFormat = function( value, flg ) {
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
Multipanel.prototype.xTickDisplay = function( bool ) {
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
Multipanel.prototype.yTickDisplay = function( bool ) {
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
Multipanel.prototype.xTickDirection = function( value ) {
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
Multipanel.prototype.yTickDirection = function( value ) {
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
Multipanel.prototype.xAxisOrient = function( value ) {
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
Multipanel.prototype.yAxisOrient = function( value ) {
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
Multipanel.prototype.xAxisDisplay = function( bool ) {
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
Multipanel.prototype.yAxisDisplay = function( bool ) {
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
/**
*
*	HIST2C
*
*
*
*	DESCRIPTION:
*		- Bin an input array according to two input vectors defining bin edges. Returns a count array.
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
*		- 2014/03/11: Created. [AReines].
*
*
*	DEPENDENCIES:
*		[1] 
*
*
*	LICENSE:
*		
*
*	Copyright (c) Athan Reines. 2014.
*
*
*	AUTHOR:
*		Athan Reines. athan@nodeprime.com. 2014.
*
*
*/

var hist2c;

(function() {
	'use strict';

	// FUNCTIONS //

	function binarysearch( vector, value ) {
		//
		//	NOTES:
		//		- This is a variation of the binary search algorithm, in which we are not seeking equality, per se, but to find that index at which the supplied value equals or exceeds the value at that index but is less than the value at the next index. We are looking for the right 'bin'.
		//

		var lower = 0,
			upper = vector.length,
			id;

		// Initial checks:
		if ( value < vector[ lower ] ) {
			// Value is below the lower bound:
			return -1;
		} // end IF
		if ( value > vector[ upper-1 ] ) {
			//  Value exceeds the upper bound:
			return upper-1;
		} // end IF

		// We know that the value resides somewhere within our vector...okay to proceed:

		// console.log(lower, id, upper);
		while ( lower <= upper ) {

			// Use a bitwise operator to return: Math.floor( (lower + upper) / 2), which is the middle value:
			id = (lower + upper) >> 1;

			// If the value is greater than the mid point, increase our lower bound index:
			if (value > vector[ id ]) {
				lower = id + 1;
			} else {
			// Does the value equal the upper bound? If yes, exit the loop; else decrement our lower bound index and tighten the bounds:
				upper = ( value === vector[ id ] ) ? -2 : id - 1;
			}

			// console.log(lower, id, upper);

		}

		// Recall the following: 1) if a perfect match has been found, then upper is -2 and the current id is the upper bound at which the match occurred. In this case, we want to return that id. 2) if a perfect match has not been found, we have two scenarios: i) if the value is less than the value at the upper bound index, we want the previous id. ii) if the value is greater than or equal to the value at the upper bound index, we found our id.
		return ( value < vector[id] ) ? id-1 : id;

	} // end FUNCTION binary_search()


	// HIST2C //

	function _hist2c( data, xEdges, yEdges ) {

		var id1, id2, counts = [];

		// Initialize our counts array: (all zeros):
		for ( var i = -1; i < xEdges.length; i++ ) {
			counts[ i+1 ] = [];
			for ( var j = -1; j < yEdges.length; j++ ) {
				counts[ i+1 ][ j+1 ] = 0;
			} // end FOR i
		} // end FOR j

		// For each value in the data array, find where the value resides along the edge vector in each dimension:
		for ( var k = 0; k < data.length; k++ ) {

			for ( var n = 0; n < data[ k ].length; n++ ) {

				// Perform a binary search along each dimension to find the index where the value equals or exceeds the corresponding value in the edge vector:
				id1 = binarysearch( xEdges, data[ k ][ n ][ 0 ] );
				id2 = binarysearch( yEdges, data[ k ][ n ][ 1 ] );

				// Update the counts for the bin:
				counts[ id1+1 ][ id2+1 ] += 1;

			} // end FOR n

		} // end FOR k

		// Return the counts:
		return counts;

	} // end FUNCTION histc()


	// EXPORTS //

	hist2c = _hist2c;

})();
/**
*
*	HISTC
*
*
*
*	DESCRIPTION:
*		- Bin an input vector according to a set of predefined edges. Return the bin counts.
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
*		- 2014/03/11: Created. [AReines].
*
*
*	DEPENDENCIES:
*		[1] 
*
*
*	LICENSE:
*		
*
*	Copyright (c) Athan Reines. 2014.
*
*
*	AUTHOR:
*		Athan Reines. athan@nodeprime.com. 2014.
*
*
*/

var histc;

(function() {
	'use strict';

	// FUNCTIONS //

	function binarysearch( vector, value ) {
		//
		//	NOTES:
		//		- This is a variation of the binary search algorithm, in which we are not seeking equality, per se, but to find that index at which the supplied value equals or exceeds the value at that index but is less than the value at the next index. We are looking for the right 'bin'.
		//

		var lower = 0,
			upper = vector.length,
			id;

		// Initial checks:
		if ( value < vector[ lower ] ) {
			// Value is below the lower bound:
			return -1;
		} // end IF
		if ( value > vector[ upper-1 ] ) {
			//  Value exceeds the upper bound:
			return upper-1;
		} // end IF

		// We know that the value resides somewhere within our vector...okay to proceed:

		// console.log(lower, id, upper);
		while ( lower <= upper ) {

			// Use a bitwise operator to return: Math.floor( (lower + upper) / 2), which is the middle value:
			id = (lower + upper) >> 1;

			// If the value is greater than the mid point, increase our lower bound index:
			if (value > vector[ id ]) {
				lower = id + 1;
			} else {
			// Does the value equal the upper bound? If yes, exit the loop; else decrement our lower bound index and tighten the bounds:
				upper = ( value === vector[ id ] ) ? -2 : id - 1;
			}

			// console.log(lower, id, upper);

		}

		// Recall the following: 1) if a perfect match has been found, then upper is -2 and the current id is the upper bound at which the match occurred. In this case, we want to return that id. 2) if a perfect match has not been found, we have two scenarios: i) if the value is less than the value at the upper bound index, we want the previous id. ii) if the value is greater than or equal to the value at the upper bound index, we found our id.
		return ( value < vector[id] ) ? id-1 : id;

	} // end FUNCTION binary_search()


	// HISTC //

	function _histc( vector, edges ) {
		
		var id, counts = [];

		// Initialize our counts vector: (all zeros)
		for ( var i = -1; i < edges.length; i++ ) {
			counts[ i+1 ] = 0;
		} // end FOR i

		// For each value in the vector, find where the value resides along the edge vector:
		for ( var j = 0; j < vector.length; j++ ) {

			// Perform a binary search to find the index where the value equals or exceeds the corresponding value in the edge vector:
			id = binarysearch( edges, vector[ j ] );

			// Update the counts for a bin:
			counts[ id+1 ] += 1;

		} // end FOR i

		// Return the counts:
		return counts;

	} // end FUNCTION getCounts()


	// EXPORTS //

	histc = _histc;

})();



/**
*
*	FIGURE: validate
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
*		[1] Uses lodash (underscore) and is inspired by validate.js ( http://rickharrison.github.io/validate.js/ )
*
*
*	TODO:
*		[1] 
*
*
*	HISTORY:
*		- 2014/02/24: Create. [AReines].
*
*
*	DEPENDENCIES:
*		[1] 
*
*
*	LICENSE:
*		MIT. http://opensource.org/licenses/MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. athan@nodeprime.com. 2014.
*
*
*/

var Validator;

(function( _ ) {
	'use strict';

	// VARIABLES //

	var validate, validator;


	// METHODS //

	validate = {

		// METHODS //

		isObject: function( value ) {
			var error;
			if ( !_.isPlainObject( value ) ) {
				error = {
					"rule": "isObject",
					"message": "ERROR:provided value is not an object."
				};
				return [ error ];
			}
			return;
		}, // end METHOD isObject()

		hasProperties: function( value, properties ) {
			var errors = [];

			// Convert the properties to an array:
			properties = properties.split( ',' );

			// Check for each property:
			for ( var i = 0; i < properties.length; i++ ) {
				if ( !value.hasOwnProperty( properties[ i ] ) ) {
					errors.push({
						"rule": "hasProperties",
						"message": "ERROR:value does not have the following property: " + properties[ i ]
					});
				}
			} // end FOR i

			return errors;
		}, // end METHOD hasProperties()

		matches: function( value, allowed_values ) {
			var error;

			// Convert the allowed_values to an array:
			allowed_values = allowed_values.split( ',' );

			if ( allowed_values.indexOf( value ) === -1 ) {
				error = {
					"rule": "matches",
					"message": "ERROR:provided value does not match an allowed value: " + allowed_values
				};
				return [ error ];
			}
			return;
		}, // end METHOD matches()

		isFunction: function( value ) {
			var error;
			if ( !_.isFunction( value ) ) {
				error = {
					"rule": "isFunction",
					"message": "ERROR:provided value is not a function."
				};
				return [ error ];
			}
			return;
		}, // end METHOD isFunction()

		isString: function( value ) {
			var error;
			if ( !_.isString( value ) ) {
				error = {
					"rule": "isString",
					"message": "ERROR:provided value is not a string."
				};
				return [ error ];
			}
			return;
		}, // end METHOD isString()

		isArray: function( value ) {
			var error;
			if ( !_.isArray( value ) ) {
				error = {
					"rule": "isArray",
					"message": "ERROR:provided value is not an array."
				};
				return [ error ];
			}
			return;
		}, // end METHOD isArray()

		greater_than: function( value, comparator ) {
			var error;
			if ( value <= parseFloat( comparator ) ) {
				error = {
					"rule": "greater_than",
					"message": "ERROR:provided value [" + value + "] is not greater than " + parseFloat( comparator )
				};
				return [ error ];
			}
			return;
		}, // end METHOD greater_than()

		less_than: function( value, comparator ) {
			var error;
			if ( value >= parseFloat( comparator ) ) {
				error = {
					"rule": "less_than",
					"message": "ERROR:provided value [" + value + "] is not less than " + parseFloat( comparator )
				};
				return [ error ];
			}
			return;
		}, // end METHOD less_than()

		interval: function( value, interval ) {
			var error;

			// Convert the interval bounds to an array:
			interval = interval.split( ',' );

			if ( value < parseFloat( interval[ 0 ] ) ) {
				error = {
					"rule": "interval",
					"message": "ERROR:provided value exceeds the lower bound: " + interval[ 0 ]
				};
				return [ error ];
			}
			if ( value > parseFloat( interval[ 1 ] ) ) {
				error = {
					"rule": "interval",
					"message": "ERROR:provided value exceeds the upper bound: " + interval[ 1 ]
				};
				return [ error ];
			}
			return;
		}, // end METHOD interval()

		isNumber: function( value ) {
			var error;
			if ( !_.isNumber( value ) || _.isNaN( value ) ) {
				error = {
					"rule": "isNumber",
					"message": "ERROR:provided value [" + value + "] is not a number."
				};
				return [ error ];
			}
			return;
		}, // end METHOD isNumber()

		isInteger: function( value ) {
			var error;
			if ( value !== +value && value !== ( value | 0 ) ) {
				error = {
					"rule": "isInteger",
					"message": "ERROR:provided value [" + value + "] is not an integer."
				};
				return [ error ];
			}
			return;
		}, // end METHOD isInteger()

		isNull: function( value ) {
			var error;
			if ( !_.isNull( value ) ) {
				error = {
					'rule': 'isNull',
					'message': 'ERROR:provided value[' + value + '] is not null.'
				};
				return [ error ];
			}
			return;
		}, // end METHOD isNull()

		isEmpty: function( value ) {
			var error;
			try {
				if ( value.length ) {
					error = {
						'rule': 'isEmpty',
						'message': 'ERROR:provided value[' + value +'] is not empty.'
					};
					return [ error ];
				}
			} catch ( e ) {
				if ( _.isPlainObject( value ) ) {
					for ( var key in value ) {
						if ( value.hasOwnProperty( key ) ) {
							error = {
								'rule': 'isEmpty',
								'message': 'ERROR:provided value[' + value +'] is not empty.'
							};
							return [ error ];
						}
					} // end FOR key
				}
				error = {
					'rule': 'isEmpty',
					'message': 'ERROR:input data type is not compatible with this rule.'
				};
				return [ error ];
			}
		}

	}; // end VALIDATE

	// Map the rules to a particular method:
	validate.rule = {
		"object": validate.isObject,
		"has_properties": validate.hasProperties,
		"function": validate.isFunction,
		"string": validate.isString,
		"array": validate.isArray,
		"integer": validate.isInteger,
		"number": validate.isNumber,
		"greater_than": validate.greater_than,
		"less_than": validate.less_than,
		"matches": validate.matches,
		"interval": validate.interval,
		"null": validate.isNull,
		"empty": validate.isEmpty
	};

	// VALIDATOR //

	validator = function( value, rules, callback ) {

		var _rules = [], rule, index, parameters,
			error, errors = [];

		// Split the rules based on the pipe character:
		_rules = rules.split( '|' );

		// For each rule, check that the rule is valid and then perform the validation:
		for ( var i = 0; i < _rules.length; i++ ) {

			// Reset:
			parameters = null;
			rule = _rules[ i ];

			// Extract the rule:
			index = _rules[ i ].indexOf( '[' );
			if ( index !== -1 ) {
				rule = _rules[ i ].substr( 0, index );
			}

			if ( rule !== _rules[ i ] ) {
				// Capture any parameters:
				parameters = _rules[ i ].match( /\[([^\]]+)\]/ )[ 1 ];
			}

			if ( !validate.rule.hasOwnProperty( rule ) ) {
				errors.push( {
					'rule': 'unknown rule: ' + _rules[ i ],
					'message': "ERROR:unknown rule. Validation could not be performed."
				});
				continue;
			}

			// Perform validation:
			error = validate.rule[ rule ]( value, parameters );

			// Did we get an error?
			if ( error && error.length ) {
				for ( var j = 0; j < error.length; j++ ) {
					errors.push( error[ j ] );
				} // end FOR j
			}

		} // end FOR i

		// Pass the errors to the callback:
		if ( callback ) {

			if ( errors.length ) {
				callback( errors );
				return;
			}

			callback( null );
			return;
		}

		return errors;

	}; // end VALIDATOR


	// EXPORTS //

	Validator = validator;

})( _ );
if ( typeof define === "function" && define.amd ) {
	define( xfig );
} else if ( typeof module === "object" && module.exports ) {
	module.exports = xfig;
} else {
	this.xfig = xfig;
}}( d3, _ );