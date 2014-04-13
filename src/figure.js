/**
*
*	FIGURE
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


// FIGURE //

/**
* FUNCTION: Figure()
*	Figure constructor. When invoked, creates a new figure instance.
*/
var Figure = function() {

	// PRIVATE VARIABLES //

	var // ELEMENT:
		root,

		// DIMENSIONS //
		width = 500,
		height = 500;


	// PUBLIC OBJECT //

	/**
	* FUNCTION: figure( selection )
	*	Appends a figure element to a selection. If no selection is provided, returns the root figure element. If no figure element has been created, returns undefined.
	*
	* @param {object} selection - DOM element selection, e.g., document.querySelector( '.main' )
	* 
	* @returns {object} root figure element.
	*/
	function figure( selection ) {
		if ( !root ) {
			root = document.createElement( 'figure' );
			root.setAttribute( 'property', 'figure' );
			root.className += 'chart-container';
			selection.appendChild( root );
			return this;
		}
		return root;
	} // end FUNCTION figure()


	// METHODS //

	/**
	* METHOD: width( value )
	*	width setter and getter. If a value is supplied, defines the figure width. If no value is supplied, returns the figure width.
	*
	* @param {number} width - desired figure width.
	* 
	* @returns {number} figure width.
	*/
	figure.width = function( value ) {
		var rules = 'number';

		if ( !arguments.length ) {
			return width;
		}
		
		validate( value, rules, set );

		return figure;

		function set( errors ) {
			if ( errors ) {
				console.error( errors );
				return;
			}
			width = value;
		}
	};

	/**
	* METHOD: height( value )
	*	Height setter and getter. If a value is supplied, defines the figure height. If no value is supplied, returns the figure height.
	*
	* @param {number} height - desired figure height.
	* 
	* @returns {number} - figure height.
	*/
	figure.height = function( value ) {
		var rules = 'number';

		if ( !arguments.length ) {
			return height;
		}
		
		validate( value, rules, set );

		return figure;

		function set( errors ) {
			if ( errors ) {
				console.error( errors );
				return;
			}
			height = value;
		}
	};

	return figure;

}; // end FIGURE