TODO
====

### General

1.	Multiple canvas children (?) --> similar to Matlab hold on; or if new canvas is registered to same figure, blow the previous canvas away
2. 	Option to pass in config object at instantiation; e.g., xfig.canvas( figure, {width:600,height:400} ).
3. 	Method to expose root element
4. 	Move 'this' registration to instantiation, rather than on create()
5. 	


### Subplot

1. 	Alias to graph instance, where width, height, position are auto set.
2. 	Subplot captioning
3. 	Plot captioning (annotations)


### Canvas

1. 	


### Graph

1. 	Z analog to width (x) and height (y) (???)

### multipanel

1.	Validate total panels on create.
2. 	Add to meta data terms


### Axes

1. 	tick rotation
2. 	tick display and axes display boolean validation

### Marks

1. 	
2. 	bar
3.	column
4. 	gauge
5. 	multipanel line
6. 	multipanel histogram
7. 	timeseries histogram
8.	

### Annotations

1. 	Legend
2. 	Caption 
3. 	Allow text positioning to be specified in data units (?) --> annotations --> text would need access to graph x,y scales

### Utils

1. 	Update documentation for histc, hist2c, validate; split validate into its own repo
2. 	Add length check in validate


### Validation

1. 	Data methods; inputs
2. 	Graph xRange, yRange, zRange: need to check for length==2
3. 	Check if boolean
4. 	Multi-parameter validation
5. 	
6. 	Graph x,y,z domain: need to check for length==2
7. 	Graph, Canvas check if bkgd boolean


### Task Runner

1. 	Setup Gulp
2. 	JSLint
3. 	Concat, minify, and wrap in closure in src JS
