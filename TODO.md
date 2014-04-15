TODO
====

### General

1.	Multiple canvas children (?) --> similar to Matlab hold on; or if new canvas is registered to same figure, blow the previous canvas away
2. 	Option to pass in config object at instantiation; e.g., xfig.canvas( figure, {width:600,height:400} ).
3. 	


### Subplot

1. 	Alias to graph instance, where width, height, position are auto set.


### Graph

1. 	
2. 	Include graph method to turn background on or off (boolean)
3. 	
4. 	Z analog to width (x) and height (y)

### Marks

1. 	
2. 	

### Utils

1. 	Update documentation for histc, hist2c, validate; split validate into its own repo
2. 	Add length check in validate


### Validation

1. 	Data methods; inputs
2. 	Graph xRange, yRange, zRange: need to check for length==2
3. 	Check if boolean
4. 	Multi-parameter validation
5. 	Instead of console.errors, throw an error


### Task Runner

1. 	Setup Gulp
2. 	JSLint
3. 	Concat, minify, and wrap in closure src JS
