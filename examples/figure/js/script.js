

(function () {
	'use strict';

	var _selection,
		figure,
		canvas,
		graph,
		axes,
		data,
		area,
		annotations,
		title,
		text;

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

	// [3] Instantiate a new annotations generator and configure:
	annotations = xfig.annotations( canvas );

	// Create the annotations element:
	annotations.create();

	// [3.1] Instantiate a new title instance and configure:
	title = annotations.title()
		.position({
			'left': 600,
			'top': 10
		});

	// Create the title element:
	title.create( 'Title' );

	// [4] Instantiate a new graph generator and configure:
	graph = xfig.graph( canvas )
		.width( 500 )
		.height( 350 )
		.position({
			'left': 90,
			'top': 80
		})
		.xMin( 0 )
		.xMax( 1 )
		.yMin( 0 );

	// Create the graph:
	graph.create();

	// Get data:
	d3.json( 'data/data.json', function ( error, json ) {

		// [5] Instantiate a new data generator and configure:
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

		// [6] Instantiate a new area generator and configure:
		area = xfig.area( graph )
			.interpolation( 'basis' )
			.labels( [ 'data 0' ] );

		// Create the area:
		area.create();

		// [7] Instantiate a new axes generator and configure:
		axes = xfig.axes( graph );

		// Create the axes:
		axes.create();

		// [8] Instantiate a new annotations generator and configure, but this time do so for a graph element:
		annotations = xfig.annotations( graph );

		// Create the annotations element:
		annotations.create();

		// [8.1] Instantiate a new title instance and configure:
		title = annotations.title()
			.top( -20 )
			.left( 0 );

		// Add a (sub)title:
		title.create( 'Subtitle' );

		// [8.2] Instantiate a new text instance and configure:
		text = annotations.text()
			.width( 200 )
			.height( 100 )
			.top( 100 )
			.left( 310 );

		// Add a text annotation:
		text.create( 'This is my text annotation, which may run multiple lines.' );

		// Repeat the above for another dataset:
		subplot1();

	});

	function subplot1() {

		var graph, data, area, axes, annotations, title, text;

		// [9] Instantiate a new graph generator and configure:
		graph = xfig.graph( canvas )
			.width( 500 )
			.height( 350 )
			.position({
				'left': 690,
				'top': 80
			})
			.xMin( 0 )
			.xMax( 1 )
			.yMin( 0 );

		// Create the graph:
		graph.create();

		// Get data:
		d3.json( 'data/data.json', function ( error, json ) {

			// [10] Instantiate a new data generator and configure:
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

			// [11] Instantiate a new area generator and configure:
			area = xfig.area( graph )
				.interpolation( 'basis' )
				.labels( [ 'data 0' ] );

			// Create the area:
			area.create();

			// [12] Instantiate a new axes generator and configure:
			axes = xfig.axes( graph );

			// Create the axes:
			axes.create();

			// [13] Instantiate a new annotations generator and configure, but this time do so for a graph element:
			annotations = xfig.annotations( graph );

			// Create the annotations element:
			annotations.create();

			// [13.1] Instantiate a new title instance and configure:
			title = annotations.title()
				.top( -20 )
				.left( 0 );

			// Add a (sub)title:
			title.create( 'Subtitle' );

			// [13.2] Instantiate a new text instance and configure:
			text = annotations.text()
				.width( 200 )
				.height( 100 )
				.top( 100 )
				.left( 310 );

			// Add a text annotation:
			text.create( 'This is another text annotation, which may run multiple lines.' );

		});
	}

})();


