

(function () {
	'use strict';

	var _selection,
		figure,
		canvas,
		graph,
		data;

	// [0] Select the element to which to append the figure:
	_selection = document.querySelector( '.main' );

	// [1] Instantiate a new figure generator:
	figure = xfig.figure();

	// Create the figure:
	figure.create( _selection );

	// [2] Instantiate a new canvas generator and configure:
	canvas = xfig.canvas( figure )
		.width( 600 )
		.height( 600 );

	// Create the canvas:
	canvas.create();

	// [3] Instantiate a new graph generator and configure:
	graph = xfig.graph( canvas )
		.position({
			'left': 90,
			'right': 20,
			'bottom': 80,
			'top': 80
		})
		.xMin( 0 )
		.xMax( 1 )
		.yMin( 0 );

	// Create the graph:
	graph.create();

	// [4] Get data:
	d3.json( 'data/data.json', function ( error, json ) {

		// [4.1] Instantiate a new data generator and configure:
		data = xfig.data( json )
			.x( function( d ) { return d[ 0 ]; } )
			.y( function( d ) { return d[ 1 ]; } );

		// [4.2] Transform the data:
		data.transform( 2 );

	});

	graph._root.append( 'svg:rect' )
		.attr( 'x', 0 )
		.attr( 'y', 0 )
		.attr( 'width', 20 )
		.attr( 'height', 20 )
		.attr( 'fill', '#474747' );

})();


