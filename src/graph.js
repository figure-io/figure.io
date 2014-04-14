/**
*
*	FIGURE: graph
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
*		- 2014/04/12: Created. [AReines].
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

// GRAPH //

/**
* FUNCTION: Graph( canvas )
*	Graph constructor. Creates a new graph instance.
*
* @param {object} canvas - parent canvas element
*/
var Graph = function( canvas ) {

	// INSTANCE ATTRIBUTES //

	this._parent = canvas;
	this._root = undefined;

	this._config = {
		"height": null,
		"width": null,
		"position": {
			"top": 80,
			"right": 20,
			"bottom": 80,
			"left": 90
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
					"min": null,
					"max": null
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
					"min": null,
					"max": null
				}
			},
			{
				"name": "z",
				"type": "linear",
				"domain": {
					"min": null,
					"max": null
				},
				"range": {
					"min": null,
					"max": null
				}
			}
		]
	};

	this._data = null;

	// SCALES //
	this._xScale = d3.scale.linear();
	this._yScale = d3.scale.linear();
	this._zScale = d3.scale.linear();

	// REGISTER //
	canvas._config.graph = this._config;

	return this;

}; // end FUNCTION Graph()

/**
* METHOD: create( type )
*	Creates a new graph element and appends to a canvas element. Option to define the graph type.
*
* @param {string} type - graph type
*/
Graph.prototype.create = function( type ) {

	// VARIABLES //
	var selection = this._parent._root,
		position = this._config.position;

	// GRAPH //

	// Create the graph element:
	this._root = selection.append( 'svg:g' )
		.attr( 'property', 'graph' )
		.attr( 'class', 'graph' )
		.attr( 'data-graph-type', ( type ) ? type : 'none' )
		.attr( 'transform', 'translate(' + position.left + ',' + position.top + ')' );

	// REGISTER //
	this._parent._children.graph = this._root;

	return this;

}; // end METHOD create()

/**
* METHOD: xMin( value )
*	xMin setter and getter. If a value is supplied, defines the graph xMin. If no value is supplied, returns the graph xMin.
*
* @param {number} xMin - desired graph xMin.
* 
* @returns {number} graph xMin.
*/
Graph.prototype.xMin = function( value ) {
	var domain = this._config.scales[ 0 ].domain;
		rules = 'number';

	if ( !arguments.length ) {
		return domain.min;
	}

	if ( !_.isUndefined( value ) && !_.isNull( value ) ) {
		Validator( value, rules, set );
	}
	
	return this;

	function set( errors ) {
		if ( errors ) {
			console.error( errors );
			return;
		}
		domain.min = value;
	}
};

/**
* METHOD: xMax( value )
*	xMax setter and getter. If a value is supplied, defines the graph xMax. If no value is supplied, returns the graph xMax.
*
* @param {number} xMax - desired graph xMax.
* 
* @returns {number} graph xMax.
*/
Graph.prototype.xMax = function( value ) {
	var domain = this._config.scales[ 0 ].domain;
		rules = 'number';

	if ( !arguments.length ) {
		return domain.max;
	}

	if ( !_.isUndefined( value ) && !_.isNull( value ) ) {
		Validator( value, rules, set );
	}
	
	return this;

	function set( errors ) {
		if ( errors ) {
			console.error( errors );
			return;
		}
		domain.max = value;
	}
};

/**
* METHOD: yMin( value )
*	yMin setter and getter. If a value is supplied, defines the graph yMin. If no value is supplied, returns the graph yMin.
*
* @param {number} yMin - desired graph yMin.
* 
* @returns {number} graph yMin.
*/
Graph.prototype.yMin = function( value ) {
	var domain = this._config.scales[ 1 ].domain;
		rules = 'number';

	if ( !arguments.length ) {
		return domain.min;
	}

	if ( !_.isUndefined( value ) && !_.isNull( value ) ) {
		Validator( value, rules, set );
	}
	
	return this;

	function set( errors ) {
		if ( errors ) {
			console.error( errors );
			return;
		}
		domain.min = value;
	}
};

/**
* METHOD: yMax( value )
*	yMax setter and getter. If a value is supplied, defines the graph yMax. If no value is supplied, returns the graph yMax.
*
* @param {number} yMax - desired graph yMax.
* 
* @returns {number} graph yMax.
*/
Graph.prototype.yMax = function( value ) {
	var domain = this._config.scales[ 1 ].domain;
		rules = 'number';

	if ( !arguments.length ) {
		return domain.max;
	}

	if ( !_.isUndefined( value ) && !_.isNull( value ) ) {
		Validator( value, rules, set );
	}
	
	return this;

	function set( errors ) {
		if ( errors ) {
			console.error( errors );
			return;
		}
		domain.max = value;
	}
};

/**
* METHOD: zMin( value )
*	zMin setter and getter. If a value is supplied, defines the graph zMin. If no value is supplied, returns the graph zMin.
*
* @param {number} zMin - desired graph zMin.
* 
* @returns {number} graph zMin.
*/
Graph.prototype.zMin = function( value ) {
	var domain = this._config.scales[ 2 ].domain;
		rules = 'number';

	if ( !arguments.length ) {
		return domain.min;
	}

	if ( !_.isUndefined( value ) && !_.isNull( value ) ) {
		Validator( value, rules, set );
	}
	
	return this;

	function set( errors ) {
		if ( errors ) {
			console.error( errors );
			return;
		}
		domain.min = value;
	}
};

/**
* METHOD: zMax( value )
*	zMax setter and getter. If a value is supplied, defines the graph zMax. If no value is supplied, returns the graph zMax.
*
* @param {number} zMax - desired graph zMax.
* 
* @returns {number} graph zMax.
*/
Graph.prototype.zMax = function( value ) {
	var domain = this._config.scales[ 2 ].domain;
		rules = 'number';

	if ( !arguments.length ) {
		return domain.max;
	}

	if ( !_.isUndefined( value ) && !_.isNull( value ) ) {
		Validator( value, rules, set );
	}
	
	return this;

	function set( errors ) {
		if ( errors ) {
			console.error( errors );
			return;
		}
		domain.max = value;
	}
};

/**
* METHOD: position( value )
*	Convenience method to set multple position values. If a value is supplied, defines the graph position. If no value is supplied, returns the graph position.
*
* @param {object} value - object with the following properties: left, right, top, bottom. All values assigned to properties should be numbers.
*/
Graph.prototype.position = function( value ) {
	var position = this._config.position,
		rules = 'object|has_properties[left,right,top,bottom]';

	if ( !arguments.length ) {
		return position;
	}

	Validator( value, rules, set );
	
	return this;

	function set( errors ) {
		var rules = 'number';

		if ( errors ) {
			console.error( errors );
			return;
		}

		for ( var key in value ) {
			if ( value.hasOwnProperty( key ) ) {
				errors = Validator( value[ key ], rules );
				if ( errors.length ) {
					console.error( errors );
					return;
				}
			}
		}

		// Set the value:
		position = value;
	}

};

/**
* METHOD: left( value )
*	position-left setter and getter. If a value is supplied, defines the graph position-left. If no value is supplied, returns the graph position-left.
*
* @param {number} value - desired graph position-left.
*/

Graph.prototype.left = function( value ) {
	var position = this._config.position,
		rules = 'number';

	if ( !arguments.length ) {
		return position.left;
	}

	Validator( value, rules, set );

	return this;

	function set( errors ) {
		if ( errors ) {
			console.error( errors );
			return;
		}
		position.left = value;
	}
};

/**
* METHOD: right( value )
*	position-right setter and getter. If a value is supplied, defines the graph position-right. If no value is supplied, returns the graph position-right.
*
* @param {number} value - desired graph position-right.
*/

Graph.prototype.right = function( value ) {
	var position = this._config.position,
		rules = 'number';

	if ( !arguments.length ) {
		return position.right;
	}

	Validator( value, rules, set );

	return this;

	function set( errors ) {
		if ( errors ) {
			console.error( errors );
			return;
		}
		position.right = value;
	}
};

/**
* METHOD: top( value )
*	position-top setter and getter. If a value is supplied, defines the graph position-top. If no value is supplied, returns the graph position-top.
*
* @param {number} value - desired graph position-top.
*/

Graph.prototype.top = function( value ) {
	var position = this._config.position,
		rules = 'number';

	if ( !arguments.length ) {
		return position.top;
	}

	Validator( value, rules, set );

	return this;

	function set( errors ) {
		if ( errors ) {
			console.error( errors );
			return;
		}
		position.top = value;
	}
};

/**
* METHOD: bottom( value )
*	position-bottom setter and getter. If a value is supplied, defines the graph position-bottom. If no value is supplied, returns the graph position-bottom.
*
* @param {number} value - desired graph position-bottom.
*/

Graph.prototype.bottom = function( value ) {
	var position = this._config.position,
		rules = 'number';

	if ( !arguments.length ) {
		return position.bottom;
	}

	Validator( value, rules, set );

	return this;

	function set( errors ) {
		if ( errors ) {
			console.error( errors );
			return;
		}
		position.bottom = value;
	}
};

/**
* METHOD: parent()
*	Returns the graph parent.
*/
Graph.prototype.parent = function() {
	return this._parent;
}; // end METHOD parent()

/**
* METHOD: config()
*	Returns the graph configuration as a JSON blob.
*/
Graph.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()

/**
* METHOD: children()
*	Returns the graph children.
*/
Graph.prototype.children = function() {
	return this._children;
}; // end METHOD children()