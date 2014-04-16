/**
*
*	FIGURE: annotations
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
*		- 2014/04/16: Created. [AReines].
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
		},
		'title': {
			'width': 100,
			'height': 20,
			'position': {
				'left': 0,
				'top': 0
			},
			'text': ''
		}
	};

	// REGISTER //
	if ( parent._config.hasOwnProperty( 'annotations' )  ) {
		parent._config.annotations.push( this._config );
	} else {
		parent._config.annotations = [ this._config ];
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

	var pChildren = this._parent._children,
		selection = this._parent._root,
		position = this._config.position;
	
	// Create the annotation element:
	this._root = selection.append( 'svg:g' )
		.attr( 'property', 'annotations' )
		.attr( 'class', 'annotations' )
		.attr( 'transform', 'translate(' + position.left + ',' + position.top + ')' );

	// REGISTER //
	if ( pChildren.hasOwnProperty( 'annotations' ) ) {
		pChildren.annotations.push( this );
	} else {
		pChildren.annotations = [ this ];
	}

	return this;

}; // end METHOD create()

/**
* METHOD: title( title )
*	Creates a new title element.
*
* @returns {object} annotations instance
*/
Annotations.prototype.title = function( title ) {

	var config = this._config.title,
		pos = config.position;

	// Create the title element:
	this._root.append( 'svg:foreignObject' )
		.attr( 'width', config.width )
		.attr( 'height', config.height )
		.attr( 'x', pos.left )
		.attr( 'y', pos.top )
		.append( 'xhtml:span' )
			.attr( 'property', 'title' )
			.attr( 'class', 'title' )
			.html( title );

	return this;

}; // end METHOD title()

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