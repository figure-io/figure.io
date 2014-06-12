
// BOX AND WHISKER //

/**
* FUNCTION: Box( graph )
*	Box and whisker constructor. Creates a new box and whisker instance.
*
* @constructor
* @param {object} graph - parent graph instance
* @returns {object} box and whisker instance
*/
function Box( graph ) {
	var self = this;

	// INSTANCE ATTRIBUTES //

	this._parent = graph;
	this._root = undefined;
	this._children = {};
	this._config = {
		'type': 'box-and-whisker',
		'labels': [],
		'radius': 3,
		'width': 1
	};

	// DATA //

	this._data = graph._data;

	// ACCESSORS //

	this._accessors = {
		'median': function median( d ) {
			return [ [ d[1], d[1] ] ];
		},
		'quartiles': function quartiles( d ) {
			return [ d[2] ];
		},
		'centers': function centers( d ) {
			var _d = d[ 3 ],
				arr = [];
			for ( var i = 0; i < _d.length; i++ ) {
				arr.push( [ _d[i], d[1] ] );
			}
			return arr;
		},
		'whiskers': function whiskers( d ) {
			var arr = [];
			d = d[ 3 ];
			for ( var i = 0; i < d.length; i++ ) {
				arr.push( [ d[i], d[i] ] );
			}
			return arr;
		},
		'outliers': function outliers( d ) {
			if ( d.length > 4 && d[ 4 ].length ) {
				return d[4];
			}
			return [];
		}
	};

	// TRANSFORMS //

	this._transforms = {
		'group': {
			'x': function X( d, w ) {
				return graph._xScale( d[ 0 ] ) - w;
			}
		},
		'line': {
			'y1': function Y1( d ) {
				return graph._yScale( d[ 0 ] );
			},
			'y2': function Y2( d ) {
				return graph._yScale( d[ 1 ] );
			}
		},
		'rect': {
			'y': function Y( d ) {
				return graph._yScale( d[ 1 ] );
			},
			'height': function Height( d ) {
				var height = graph._yScale( d[ 0 ] ) - graph._yScale( d[ 1 ] );
				return Math.abs( height );
			}
		},
		'circle': {
			'cy': function Y( d ) {
				return graph._yScale( d );
			},
			'r': function R( d ) {
				return self._config.radius;
			}
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
} // end FUNCTION Box()

/**
* METHOD: create()
*	Creates a new box and whisker plot element.
*
* @returns {object} box instance
*/
Box.prototype.create = function() {
	var self = this,
		selection = this._parent._root,
		xScale = this._parent._xScale,
		gTransforms = self._transforms.group,
		rTransforms = self._transforms.rect,
		lTransforms = self._transforms.line,
		cTransforms = self._transforms.circle,
		width,
		labels = this._config.labels,
		boxes, line, quartiles, medians, whiskers, outliers;

	// Compute the marks width in pixel units:
	width = xScale( this._config.width ) - xScale( 0 );

	// Create a marks group:
	this._root = selection.append( 'svg:g' )
		.attr( 'property', 'marks' )
		.attr( 'class', 'marks' )
		.attr( 'clip-path', 'url(#' + selection.attr( 'data-clipPath' ) + ')' );

	// Add box groups:
	boxes = this._root.selectAll( '.box-and-whisker' )
		.data( this._data[ 0 ] )
	  .enter().append( 'svg:g' )
		.attr( 'property', 'box-and-whisker' )
		.attr( 'class', 'box-and-whisker' )
		.attr( 'data-label', function ( d, i ) {
			return labels[ i ];
		})
		.attr( 'transform', function ( d ) {
			return 'translate( ' + gTransforms.x( d, width/2 ) + ', 0 )';
		});

	// Add whiskers:
	whiskers = boxes.append( 'svg:g' )
		.attr( 'class', 'whiskers' );

	whiskers.selectAll( '.center-line' )
		.data( this._accessors.centers )
	  .enter().append( 'svg:line' )
		.attr( 'class', 'center-line' )
		.attr( 'x1', width / 2 )
		.attr( 'y1', lTransforms.y1 )
		.attr( 'x2', width / 2 )
		.attr( 'y2', lTransforms.y2 );

	whiskers.selectAll( '.whisker' )
		.data( this._accessors.whiskers )
	  .enter().append( 'svg:line' )
		.attr( 'class', 'whisker' )
		.attr( 'x1', 0 )
		.attr( 'y1', lTransforms.y1 )
		.attr( 'x2', width )
		.attr( 'y2', lTransforms.y2 );

	// Add outliers:
	outliers = boxes.append( 'svg:g' )
		.attr( 'class', 'outliers' )
		.selectAll( '.outlier' )
			.data( this._accessors.outliers )
		  .enter().append( 'svg:circle' )
			.attr( 'class', 'outlier' )
			.attr( 'cx', width / 2 )
			.attr( 'cy', cTransforms.cy )
			.attr( 'r', cTransforms.r );

	// Add quartiles:
	quartiles = boxes.selectAll( '.quartile' )
		.data( this._accessors.quartiles )
	  .enter().append( 'svg:rect' )
			.attr( 'class', 'quartile' )
			.attr( 'x', 0 )
			.attr( 'y', rTransforms.y )
			.attr( 'width', width )
			.attr( 'height', rTransforms.height );

	// Add medians:
	medians = boxes.selectAll( '.median' )
		.data( this._accessors.median )
	  .enter().append( 'svg:line' )
			.attr( 'class', 'median' )
			.attr( 'x1', 0 )
			.attr( 'y1', lTransforms.y1 )
			.attr( 'x2', width )
			.attr( 'y2', lTransforms.y2 );

	return this;
}; // end METHOD create()

/**
* METHOD: labels( arr )
*	Marks labels setter and getter. If a label array is supplied, sets the marks labels. If no label array is supplied, retrieves the marks labels.
*
* @param {array} arr - an array of labels (strings)
* @returns {object|array} instance object or an array of labels
*/
Box.prototype.labels = function ( arr ) {
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
* METHOD: radius( value )
*	Outlier radius setter and getter. If a value is supplied, sets the outlier radius. If no value is supplied, returns the outlier radius.
*
* @param {number} value - outlier radius (in pixels)
* @returns {object|number} instance object or outlier radius
*/
Box.prototype.radius = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config.radius;
	}
	
	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'radius()::invalid input argument.' );
		}
		self._config.radius = value;
	});

	return this;
}; // end METHOD radius()

/**
* METHOD: width( value )
*	Box width setter and getter. If a value is supplied, sets the box width. If no value is supplied, returns the box width.
*
* @param {number} value - box width (in data units)
* @returns {object|number} instance object or box width
*/
Box.prototype.width = function( value ) {
	var self = this,
		rules = 'number';

	if ( !arguments.length ) {
		return this._config.width;
	}
	
	Validator( value, rules, function set( errors ) {
		if ( errors ) {
			console.error( errors );
			throw new Error( 'width()::invalid input argument.' );
		}
		self._config.width = value;
	});

	return this;
}; // end METHOD width()

/**
* METHOD: parent()
*	Returns the box and whisker parent.
*
* @returns {object} box parent
*/
Box.prototype.parent = function() {
	return this._parent;
}; // end METHOD parent()

/**
* METHOD: config()
*	Returns the box and whisker configuration as a JSON blob.
*
* @returns {object} configuration blob
*/
Box.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()

/**
* METHOD: children()
*	Returns the box children.
* 
* @returns {object} box children
*/
Box.prototype.children = function() {
	return this._children;
}; // end METHOD children()