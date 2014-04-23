if (typeof define === "function" && define.amd) {
	define( xfig );
} else if (typeof module === "object" && module.exports) {
	module.exports = xfig;
} else {
	this.xfig = xfig;
}}( d3, _ );