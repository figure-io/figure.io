
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
	var self = this,
		height = graph._config.height;

	// INSTANCE ATTRIBUTES //

	this._parent = graph;
	this._root = undefined;
	this._children = {};
	this._config = {
		'labels': [],
		'radius': 3,
		'width': 1
	};

	// DATA //

	this._data = graph._data;

	// ACCESSORS //

	this._accessors = {
		'median': function median( d ) {
			var width = self._config.width;
			return [
				[ 0, d[1] ],
				[ width, d[1] ]
			];
		},
		'center': function center( d ) {
			var width = self._config.width;
			return [
				width/2, d[3][0],
				width/2, d[3][1]
			];
		},
		'quartiles': function quartiles( d ) {
			return d[2];
		},
		'whiskers': function whiskers( d ) {
			var arr = [],
				width = self._config.width;
			d = d[3];
			for ( var i = 0; i < d.length; i++ ) {
				arr.push([
					0, d[i],
					width, d[i]
				]);
			}
			return arr;
		},
		'outliers': function outliers( d ) {
			if ( d.length === 4 ) {
				return d[ 4 ];
			}
			return [];
		}
	};

	// TRANSFORMS //

	this._transforms = {
		'group': {
			'x': function X( d ) {
				return graph._xScale( d[ 0 ] );
			}
		},
		'line': {
			'x1': function X1( d ) {
				return graph._xScale( d[ 0 ] );
			},
			'x2': function X2( d ) {
				return graph._xScale( d[ 2 ] );
			},
			'y1': function Y1( d ) {
				return graph._yScale( d[ 1 ] );
			},
			'y2': function Y2( d ) {
				return graph._yScale( d[ 3 ] );
			}
		},
		'rect': {
			'x': function X() {
				return 0;
			},
			'y': function Y( d ) {
				return height - graph._yScale( d[ 0 ] );
			},
			'width': function Width() {
				return graph._xScale( self._config.width );
			},
			'height': function Height( d ) {
				return height - graph._yScale( d[ 1 ] );
			}
		},
		'circle': {
			'cx': function X() {
				return graph._xScale( self._config.width/2 );
			},
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
		gTransforms = self._transforms.group,
		rTransforms = self._transforms.rect,
		lTransforms = self._transforms.line,
		cTransforms = self._transforms.circle,
		labels = this._config.labels,
		boxes, line, quartiles, medians, whiskers, outliers;

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
			return 'translate( ' + gTransforms.x( d ) + ', 0 )';
		});

	// Add medians:
	medians = boxes.selectAll( '.median' )
		.data( this._accessors.median )
		.append( 'svg:path' )
			.attr( 'property', 'line' )
			.attr( 'class', 'median' )
			.attr( 'x1', lTransforms.x1 )
			.attr( 'y1', lTransforms.y1 )
			.attr( 'x2', lTransforms.x2 )
			.attr( 'y2', lTransforms.y2 );

	// Add a center vertical line spanning the whisker values:
	line = boxes.selectAll( '.center-line' )
		.data( this._accessors.center_line )
		.append( 'svg:path' )
			.attr( 'class', 'center-line' )
			.attr( 'x1', lTransforms.x1 )
			.attr( 'y1', lTransforms.y1 )
			.attr( 'x2', lTransforms.x2 )
			.attr( 'y2', lTransforms.y2 );

	// Add quartiles:
	quartiles = boxes.selectAll( '.quartiles' )
		.data( this._accessors.quartiles )
		.append( 'svg:rect' )
			.attr( 'property', 'rectangle' )
			.attr( 'class', 'quartiles' )
			.attr( 'x', rTransforms.x )
			.attr( 'y', rTransforms.y )
			.attr( 'width', rTransforms.width )
			.attr( 'height', rTransforms.height );

	// Add whiskers:
	whiskers = boxes.append( 'svg:g' )
		.attr( 'class', 'whiskers' )
		.selectAll( '.whisker' )
			.data( this._accessors.whiskers )
		  .enter().append( 'svg:path' )
			.attr( 'property', 'line' )
			.attr( 'class', 'whisker' )
			.attr( 'x1', lTransforms.x1 )
			.attr( 'y1', lTransforms.y1 )
			.attr( 'x2', lTransforms.x2 )
			.attr( 'y2', lTransforms.y2 );

	// Add outliers:
	outliers = boxes.append( 'svg:g' )
		.attr( 'class', 'outliers' )
		.selectAll( '.outlier' )
			.data( this._accessors.outliers )
		  .enter().append( 'svg:circle' )
			.attr( 'property', 'circle' )
			.attr( 'class', 'outlier' )
			.attr( 'cx', cTransforms.cx )
			.attr( 'cy', cTransforms.cy )
			.attr( 'r', cTransforms.r );

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