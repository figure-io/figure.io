/**
*
*	XFIG
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
*		- 2014/04/13: Created. [AReines].
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
*		Athan Reines. athan@nodeprime.com. 2014
*
*
*/

var xfig = {};

xfig.figure = function() {
	return new Figure();
};

xfig.canvas = function( figure ) {
	if ( !figure ) {
		throw new Error( 'figure selection not provided. Unable to initialize canvas generator.' );
	}
	if ( !( figure instanceof Figure ) ) {
		throw new Error( 'invalid input parameter. Parameter must be a Figure instance.' );
	}
	return new Canvas( figure );
};

xfig.graph = function( canvas ) {
	if ( !canvas ) {
		throw new Error( 'canvas selection not provided. Unable to initialize graph constructor.' );
	}
	if ( !( canvas instanceof Canvas ) ) {
		throw new Error( 'invalid input parameter. Argument must be a Canvas instance.' );
	}
	return new Graph( canvas );
};

xfig.data = function( data ) {
	if ( !data ) {
		throw new Error( 'data not provided. Unable to initialize data constructor.' );
	}
	if ( !( data instanceof Array ) ) {
		throw new Error( 'invalid input parameter. Input data must be an Array.' );
	}
	return new Data( data );
};

xfig.area = function( graph ) {
	if ( !graph ) {
		throw new Error( 'graph not provided. Unable to initialize area constructor.' );
	}
	if ( !( graph instanceof Graph ) ) {
		throw new Error( 'invalid input parameter. Input argument must be a Graph instance.' );
	}
	return new Area( graph );
};