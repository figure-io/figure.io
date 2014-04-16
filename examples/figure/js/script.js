

(function () {
	'use strict';

	var _selection,
		figure,
		canvas,
		graph,
		axes,
		data,
		area,
		annotations;

	// [0] Select the element to which to append the figure:
	_selection = document.querySelector( '.main' );

	// [1] Instantiate a new figure generator:
	figure = xfig.figure();

	// Create the figure:
	figure.create( _selection );

	// [2] Instantiate a new canvas generator and configure:
	canvas = xfig.canvas( figure )
		.width( 1200 )
		.height( 1000 );

	// Create the canvas:
	canvas.create();

	// [3] Instantiate a new graph generator and configure:
	graph = xfig.graph( canvas )
		.width( 600 )
		.height( 400 )
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

	// Get data:
	d3.json( 'data/data.json', function ( error, json ) {

		// [4] Instantiate a new data generator and configure:
		data = xfig.data( json )
			.x( function( d ) { return d[ 0 ]; } )
			.y( function( d ) { return d[ 1 ]; } );

		// Transform the data:
		data.transform( 2 );

		// Bind the data instance to the graph:
		graph.data( data )
			.yMax( data.max( data.data(), function ( d ) {
				return d[ 1 ];
			}));

		// [5] Instantiate a new area generator and configure:
		area = xfig.area( graph )
			.interpolation( 'basis' )
			.labels( [ 'data 0' ] );

		// Create the area:
		area.create();

		// [6] Instantiate a new axes generator and configure:
		axes = xfig.axes( graph );

		// Create the axes:
		axes.create();

		// [7] Instantiate a new annotations generator and configure:
		annotations = xfig.annotations( canvas );

		// Create the annotations element:
		annotations.create();

		// Add a title:
		annotations.title( 'Title' );

	});

})();


