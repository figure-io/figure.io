

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

	// [8] Timeseries Histogram chart:
	TimeseriesHistogram( canvas, width, width, 90, 1020 );


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
				.yMax( data.max( function ( d ) {
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
				.yMax( data.max( function ( d ) {
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
				.yMax( data.max( function ( d ) {
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

		var multipanel,
			data = [],
			edges,
			xValue = function( d ) { return d[ 0 ]; },
			yValue = function( d ) { return d[ 1 ]; },
			yMax = 0, _yMax,
			graphs, histogram,
			annotations, title, text;

		// [1] Instantiate a new multipanel generator and configure:
		multipanel = xfig.multipanel( canvas )
			.width( width )
			.height( height )
			.position({
				'left': left,
				'top': top
			});

		// Get data:
		d3.json( 'data/multipanel.data.json', function ( error, json ) {

			// [2] For each panel dataset, instantiate a new data generator and configure:
			for ( var i = 0; i < json.length; i++ ) {

				data.push( xfig.data( json[ i ] )
					.x( xValue )
					.y( yValue ) );

				// Create edges to define our histogram bins:
				edges = data[ i ].linspace( -0.025, 1.025, 0.05 );
			
				// Transform the data and histogram the data:
				data[ i ].transform( 2 )
					.histc( yValue, edges );

				// Compute the yMax:
				_yMax = data[ i ].max( yValue );
				yMax = ( yMax < _yMax ) ? _yMax : yMax;

			} // end FOR i

			// Bind the data instance to the multipanel:
			multipanel.data( data )
				.xMin( 0 )
				.xMax( 1 )
				.yMin( 0 )
				.yMax( yMax )
				.yLabel( 'counts' );

			// Create the multipanel:
			multipanel.create();

			// [3] Instantiate a new annotations generator and configure:
			annotations = xfig.annotations( multipanel );

			// Create the annotations element:
			annotations.create();

			// [3.1] Instantiate a new title instance and configure:
			title = annotations.title()
				.top( -30 )
				.left( 250 );

			// Add a (sub)title:
			title.create( 'Subtitle' );

			// [4] For each panel graph, instantiate a new histogram generator and configure:
			graphs = multipanel.children().graph;
			for ( var j = 0; j < graphs.length; j++ ) {

				histogram = xfig.histogram( graphs[ j ] )
					.labels( [ 'data ' + j ] );

				// Create the histogram:
				histogram.create();

				// Instantiate a new annotations generator and configure:
				annotations = xfig.annotations( graphs[ j ] );

				// Create the annotations element:
				annotations.create();

				// Instantiate a new text instance and configure:
				text = annotations.text()
					.width( 200 )
					.height( 100 )
					.top( 50 )
					.left( 310 );

				// Add a text annotation:
				text.create( 'This is a description of <span class="italic">condition ' + (j+1) + '</span>.' );

			} // end FOR j

		});

	} // end FUNCTION Multipanel()

	function TimeseriesHistogram( canvas, width, height, left, top ) {

		var graph, data, histogram, edges, axes, annotations, title, text, means;

		// [1] Instantiate a new graph generator and configure:
		graph = xfig.graph( canvas )
			.width( width )
			.height( height )
			.position({
				'left': left,
				'top': top
			})
			.xMin( 0 )
			.xMax( 1 );

		// Create the graph:
		graph.create( 'timeseries-histogram' );

		// Get data:
		d3.json( 'data/timeseries-histogram.data.json', function ( error, json ) {

			// [2] Instantiate a new data generator and configure:
			data = xfig.data( json )
				.x( function ( d ) { return d[ 0 ]; } )
				.y( function ( d ) { return d[ 1 ]; } );

			// Create edges to define our histogram bins:
			edges = data.linspace( -0.025, 1.025, 0.05 );
			
			// Transform the data and extract the data to histogram:
			data.transform( 2 )
				.extract( function ( d ) { return d[ 1 ]; });

			// Calculate each dataset's mean value and sort the datasets based on their means:
			means = data.mean( function ( d ) { return d; });
			means = means.map( function ( d, i ) {
				return [ d, i ];
			});
			means.sort( function ( a, b ) {
				return a[0] < b[0] ? -1 : ( a[0] > b[0] ? 1 : 0 );
			});
			means = means.map( function ( d ) {
				return d[ 1 ];
			});

			// Calculate the histogram:
			data.reorder( means )
				.histc( function ( d ) { return d; }, edges );

			// Bind the data instance to the graph:
			graph.data( data )
				.yMin( 0 )
				.yMax( data.size()[0] )
				.zMin( 0 )
				.zMax( data.max( function ( d ) {
					return d[ 1 ];
				}))
				.zRange( ['#ffffff', '#000000'] );

			// [3] Instantiate a new histogram generator and configure:
			histogram = xfig.timeserieshistogram( graph );

			// Create the histogram:
			histogram.create();

			// [4] Instantiate a new axes generator and configure:
			axes = xfig.axes( graph )
				.xLabel( 'percent' )
				.yLabel( 'node' );

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

	} // end FUNCTION TimeseriesHistogram()

})();


