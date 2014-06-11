TODO
====

### General

1.	Multiple canvas children (?) --> similar to Matlab hold on; or if new canvas is registered to same figure, blow the previous canvas away
2. 	Option to pass in config object at instantiation; e.g., xfig.canvas( figure, {width:600,height:400} ).
3. 	Method to expose root element
4. 	Method to clear a graph of all marks: graph.clear()
5. 	Update app/utils/server.js to include process title; update bin/server.js to set process title
6.	Clean-up Utils directory code and how functions are 'exported'. :(
7. 	Compile with custom D3 build
8. 	Favicon
9. 


### Subplot

1. 	Alias to graph instance, where width, height, position are auto set.
2. 	Subplot captioning
3. 	Plot captioning (annotations)


### Canvas

1. 	


### Graph

1. 	Z analog to width (x) and height (y) (???)
2.	Auto-scale domains, if no domain supplied?

### Gridpanel

1. 	If height is not specified, autocompute height using graph width and golden ratio (approx)
2. 	


### Axes

1. 	tick rotation
2. 	tick display and axes display boolean validation
3. 	
4. 	outerticksize when setting tick direction; probably best to just reduce the outerticksize to match the extent that inner ticks extend out.

### Marks

1. 	Have all inherit from a general marks class; allow for type checking: instanceof marks --> why would this be useful? Only if supplying multiple marks(?) to a setter/getter and need to type check multiple marks types. Will this ever be used?
2. 	bar
3.	column
4. 	gauge
5. 	contour
6. 	hist2d
7. 	box
8.	

### Data

1. 	logspace (see linspace)
2. 	Weighted Mean: wmean. data.wmean( accessor, [vector|matrix|function] ) --> make this part of data.mean (additional args; not separate method) --> maybe separate methods; also geometric mean, harmonic mean, etc.
3. 	Quantiles
4. 	
5. 	Mode (mode)
6.	nanmean, nanmedian, nanvariance, etc, to handle missing values
7. 	Windowed (moving) Mean (mmean)
8. 	Windowed (moving) Variance (mvar )
9. 	Find (return indices)
10. Filter
11. Aggregators: median, variance, stdev
12. 


### Annotations

1. 	Legend
2. 	Caption 
3. 	Allow text positioning to be specified in data units (?) --> annotations --> text would need access to graph x,y scales

### Utils

1. 	Update documentation for histc, hist2c, validate; split validate into its own repo
2. 	Add length check in validate


### Validation

1. 	Data methods; inputs --> some are hard to verify. Is this necessary?
2. 	Graph xRange, yRange, zRange: need to check for length==2
3. 	Check if boolean
4. 	Multi-parameter validation
5. 	Null
6. 	Graph x,y,z domain: need to check for length==2
7. 	Graph, Canvas check if bkgd boolean


### Task Runner

1. 	
2. 	JSLint
3. 	


### Tests

1. 	Mocha/Chai
2. 	Istanbul code coverage
3. 	
