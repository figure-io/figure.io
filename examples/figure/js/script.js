

(function () {
	'use strict';

	var _selection,
		width = 500,
		height = 350,
		figure,
		canvas,
		annotations,
		title;

	// [0] Select the element to which to append the figure:
	_selection = document.querySelector( '.main' );

	// [1] Instantiate a new figure generator:
	figure = xfig.figure();

	// Create the figure:
	figure.create( _selection );

	// [2] Instantiate a new canvas generator and configure:
	canvas = xfig.canvas( figure )
		.width( 1200 )
		.height( 10000 );

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

	// [4] Area chart:
	Area( canvas, width, height, 90, 80 );

	// [5] Histogram chart:
	Histogram( canvas, width, height, 690, 80 );

	// [6] Line chart:
	Line( canvas, width, height, 90, 550 );

	// [7] Multipanel chart:
	Multipanel( canvas, width, height*3, 690, 550 );


	// CHARTS //

	function Area( canvas, width, height, left, top ) {

		var graph, axes, data, area, annotations, title, text;

		// [1] Instantiate a new graph generator and configure:
		graph = xfig.graph( canvas )
			.width( width )
			.height( height )
			.position({
				'left': left,
				'top': top
			})
			.xMin( 0 )
			.xMax( 1 )
			.yMin( 0 );

		// Create the graph:
		graph.create( 'area' );

		// Get data:
		d3.json( 'data/area.data.json', function ( error, json ) {

			// [2] Instantiate a new data generator and configure:
			data = xfig.data( json )
				.x( function ( d ) { return d[ 0 ]; } )
				.y( function ( d ) { return d[ 1 ]; } );

			// Transform the data:
			data.transform( 2 );

			// Bind the data instance to the graph:
			graph.data( data )
				.yMax( data.max( data.data(), function ( d ) {
					return d[ 1 ];
				}));

			// [3] Instantiate a new area generator and configure:
			area = xfig.area( graph )
				.interpolation( 'basis' )
				.labels( [ 'data 0' ] );

			// Create the area:
			area.create();

			// [4] Instantiate a new axes generator and configure:
			axes = xfig.axes( graph );

			// Create the axes:
			axes.create();

			// [5] Instantiate a new annotations generator and configure, but this time do so for a graph element:
			annotations = xfig.annotations( graph );

			// Create the annotations element:
			annotations.create();

			// [5.1] Instantiate a new title instance and configure:
			title = annotations.title()
				.top( -30 )
				.left( 0 );

			// Add a (sub)title:
			title.create( 'Subtitle' );

			// [5.2] Instantiate a new text instance and configure:
			text = annotations.text()
				.width( 200 )
				.height( 100 )
				.top( 100 )
				.left( 310 );

			// Add a text annotation:
			text.create( 'This is my text annotation, which may run multiple lines.' );

		});

	} // end FUNCTION area()

	function Line( canvas, width, height, left, top ) {

		var graph, axes, data, line, annotations, title;

		// [1] Instantiate a new graph generator and configure:
		graph = xfig.graph( canvas )
			.width( width )
			.height( height )
			.position({
				'left': left,
				'top': top
			})
			.xMin( 0 )
			.xMax( 1 )
			.yMin( 0 );

		// Create the graph:
		graph.create( 'line' );

		// Get data:
		d3.json( 'data/line.data.json', function ( error, json ) {

			// [2] Instantiate a new data generator and configure:
			data = xfig.data( json )
				.x( function ( d ) { return d[ 0 ]; } )
				.y( function ( d ) { return d[ 1 ]; } );

			// Transform the data:
			data.transform( 2 );

			// Bind the data instance to the graph:
			graph.data( data )
				.yMax( data.max( data.data(), function ( d ) {
					return d[ 1 ];
				}));

			// [3] Instantiate a new line generator and configure:
			line = xfig.line( graph )
				.interpolation( 'basis' )
				.labels( [ 'data 0' ] );

			// Create the line:
			line.create();

			// [4] Instantiate a new axes generator and configure:
			axes = xfig.axes( graph );

			// Create the axes:
			axes.create();

			// [5] Instantiate a new annotations generator and configure:
			annotations = xfig.annotations( graph );

			// Create the annotations element:
			annotations.create();

			// [5.1] Instantiate a new title instance and configure:
			title = annotations.title()
				.top( -30 )
				.left( 0 );

			// Add a (sub)title:
			title.create( 'Subtitle' );

		});

	} // end FUNCTION line()

	function Histogram( canvas, width, height, left, top ) {

		var graph, data, histogram, edges, axes, annotations, title, text;

		// [1] Instantiate a new graph generator and configure:
		graph = xfig.graph( canvas )
			.width( width )
			.height( height )
			.position({
				'left': left,
				'top': top
			})
			.xMin( 0 )
			.xMax( 1 )
			.yMin( 0 );

		// Create the graph:
		graph.create( 'histogram' );

		// Get data:
		d3.json( 'data/histogram.data.json', function ( error, json ) {

			// [2] Instantiate a new data generator and configure:
			data = xfig.data( json )
				.x( function ( d ) { return d[ 0 ]; } )
				.y( function ( d ) { return d[ 1 ]; } );

			// Create edges to define our histogram bins:
			edges = data.linspace( -0.025, 1.025, 0.05 );
			
			// Transform the data and histogram the data:
			data.transform( 2 )
				.histc( function ( d ) { return d[ 1 ]; }, edges );

			// Bind the data instance to the graph:
			graph.data( data )
				.yMax( data.max( data.data(), function ( d ) {
					return d[ 1 ];
				}));

			// [3] Instantiate a new histogram generator and configure:
			histogram = xfig.histogram( graph )
				.labels( [ 'data 0' ] );

			// Create the histogram:
			histogram.create();

			// [4] Instantiate a new axes generator and configure:
			axes = xfig.axes( graph )
				.yLabel( 'counts' );

			// Create the axes:
			axes.create();

			// [5] Instantiate a new annotations generator and configure:
			annotations = xfig.annotations( graph );

			// Create the annotations element:
			annotations.create();

			// [5.1] Instantiate a new title instance and configure:
			title = annotations.title()
				.top( -30 )
				.left( 250 );

			// Add a (sub)title:
			title.create( 'Subtitle' );

			// [5.2] Instantiate a new text instance and configure:
			text = annotations.text()
				.width( 200 )
				.height( 100 )
				.top( 50 )
				.left( 310 );

			// Add a text annotation:
			text.create( 'This is another text annotation, which may run multiple lines.' );

		});

	} // end FUNCTION Histogram()

	function Multipanel( canvas, width, height, left, top ) {

		var multipanel, data, edges, annotations, title, text;

		// [1] Instantiate a new multipanel generator and configure:
		multipanel = xfig.multipanel( canvas )
			.width( width )
			.height( height )
			.position({
				'left': left,
				'top': top
			})
			.xMin( 0 )
			.xMax( 1 )
			.yMin( 0 )
			.total( 3 );

		// Create the multipanel:
		multipanel.create();

		return;

		// Get data:
		d3.json( 'data/histogram.data.json', function ( error, json ) {

			// [2] Instantiate a new data generator and configure:
			data = xfig.data( json )
				.x( function ( d ) { return d[ 0 ]; } )
				.y( function ( d ) { return d[ 1 ]; } );

			// Create edges to define our histogram bins:
			edges = data.linspace( -0.025, 1.025, 0.05 );
			
			// Transform the data and histogram the data:
			data.transform( 2 )
				.histc( function ( d ) { return d[ 1 ]; }, edges );

			// Bind the data instance to the graph:
			graph.data( data )
				.yMax( data.max( data.data(), function ( d ) {
					return d[ 1 ];
				}));

			// [3] Instantiate a new histogram generator and configure:
			histogram = xfig.histogram( graph )
				.labels( [ 'data 0' ] );

			// Create the histogram:
			histogram.create();

			// [4] Instantiate a new axes generator and configure:
			axes = xfig.axes( graph )
				.yLabel( 'counts' );

			// Create the axes:
			axes.create();

			// [5] Instantiate a new annotations generator and configure:
			annotations = xfig.annotations( graph );

			// Create the annotations element:
			annotations.create();

			// [5.1] Instantiate a new title instance and configure:
			title = annotations.title()
				.top( -30 )
				.left( 250 );

			// Add a (sub)title:
			title.create( 'Subtitle' );

			// [5.2] Instantiate a new text instance and configure:
			text = annotations.text()
				.width( 200 )
				.height( 100 )
				.top( 50 )
				.left( 310 );

			// Add a text annotation:
			text.create( 'This is another text annotation, which may run multiple lines.' );

		});

	} // end FUNCTION Multipanel()

})();


