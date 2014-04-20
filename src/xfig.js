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

xfig.annotations = function( parent ) {
	if ( !parent ) {
		throw new Error( 'annotations()::parent instance not provided. Unable to initialize annotations constructor.' );
	}
	if ( !( parent instanceof Canvas ) && !( parent instanceof Graph ) ) {
		throw new Error( 'annotations()::invalid input parameter. Input argument must be ether a Canvas or Graph instance.' );
	}
	return new Annotations( parent );
};