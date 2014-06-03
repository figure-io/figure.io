!function (){
	var xfig = { version: "0.0.0" }; // semver

	/**
	* Dependencies.
	*/
	var has_require = ( typeof require !== 'undefined' );
	var d3 = this.d3;
	var _ = this._;

	if ( typeof d3 === 'undefined' ) {
		if ( has_require ) {
			d3 = require( 'd3' );
		} else {
			throw new Error( 'xfig::missing dependency. xfig requires D3; see http://d3js.org.' );
		}
	}
	if ( typeof _ === 'undefined' ) {
		if ( has_require ) {
			_ = require( 'lodash' );
		} else {
			throw new Error( 'xfig::missing dependency. xfig requires either underscore or lodash; see http://underscorejs.org.' );
		}
	}