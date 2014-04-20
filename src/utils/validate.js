/**
*
*	FIGURE: validate
*
*
*
*	DESCRIPTION:
*		- 
*
*
*	API:
*		- 
*
*
*	NOTES:
*		[1] Uses lodash (underscore) and is inspired by validate.js ( http://rickharrison.github.io/validate.js/ )
*
*
*	TODO:
*		[1] 
*
*
*	HISTORY:
*		- 2014/02/24: Create. [AReines].
*
*
*	DEPENDENCIES:
*		[1] 
*
*
*	LICENSE:
*		MIT. http://opensource.org/licenses/MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. athan@nodeprime.com. 2014.
*
*
*/

var Validator;

(function( _ ) {
	'use strict';

	// VARIABLES //

	var validate, validator;


	// METHODS //

	validate = {

		// METHODS //

		isObject: function( value ) {
			var error;
			if ( !_.isPlainObject( value ) ) {
				error = {
					"rule": "isObject",
					"message": "ERROR:provided value is not an object."
				};
				return [ error ];
			}
			return;
		}, // end METHOD isObject()

		hasProperties: function( value, properties ) {
			var errors = [];

			// Convert the properties to an array:
			properties = properties.split( ',' );

			// Check for each property:
			for ( var i = 0; i < properties.length; i++ ) {
				if ( !value.hasOwnProperty( properties[ i ] ) ) {
					errors.push({
						"rule": "hasProperties",
						"message": "ERROR:value does not have the following property: " + properties[ i ]
					});
				}
			} // end FOR i

			return errors;
		}, // end METHOD hasProperties()

		matches: function( value, allowed_values ) {
			var error;

			// Convert the allowed_values to an array:
			allowed_values = allowed_values.split( ',' );

			if ( allowed_values.indexOf( value ) === -1 ) {
				error = {
					"rule": "matches",
					"message": "ERROR:provided value does not match an allowed value: " + allowed_values
				};
				return [ error ];
			}
			return;
		}, // end METHOD matches()

		isFunction: function( value ) {
			var error;
			if ( !_.isFunction( value ) ) {
				error = {
					"rule": "isFunction",
					"message": "ERROR:provided value is not a function."
				};
				return [ error ];
			}
			return;
		}, // end METHOD isFunction()

		isString: function( value ) {
			var error;
			if ( !_.isString( value ) ) {
				error = {
					"rule": "isString",
					"message": "ERROR:provided value is not a string."
				};
				return [ error ];
			}
			return;
		}, // end METHOD isString()

		isArray: function( value ) {
			var error;
			if ( !_.isArray( value ) ) {
				error = {
					"rule": "isArray",
					"message": "ERROR:provided value is not an array."
				};
				return [ error ];
			}
			return;
		}, // end METHOD isArray()

		greater_than: function( value, comparator ) {
			var error;
			if ( value <= parseFloat( comparator ) ) {
				error = {
					"rule": "greater_than",
					"message": "ERROR:provided value [" + value + "] is not greater than " + parseFloat( comparator )
				};
				return [ error ];
			}
			return;
		}, // end METHOD greater_than()

		less_than: function( value, comparator ) {
			var error;
			if ( value >= parseFloat( comparator ) ) {
				error = {
					"rule": "less_than",
					"message": "ERROR:provided value [" + value + "] is not less than " + parseFloat( comparator )
				};
				return [ error ];
			}
			return;
		}, // end METHOD less_than()

		interval: function( value, interval ) {
			var error;

			// Convert the interval bounds to an array:
			interval = interval.split( ',' );

			if ( value < parseFloat( interval[ 0 ] ) ) {
				error = {
					"rule": "interval",
					"message": "ERROR:provided value exceeds the lower bound: " + interval[ 0 ]
				};
				return [ error ];
			}
			if ( value > parseFloat( interval[ 1 ] ) ) {
				error = {
					"rule": "interval",
					"message": "ERROR:provided value exceeds the upper bound: " + interval[ 1 ]
				};
				return [ error ];
			}
			return;
		}, // end METHOD interval()

		isNumber: function( value ) {
			var error;
			if ( !_.isNumber( value ) || _.isNaN( value ) ) {
				error = {
					"rule": "isNumber",
					"message": "ERROR:provided value [" + value + "] is not a number."
				};
				return [ error ];
			}
			return;
		}, // end METHOD isNumber()

		isInteger: function( value ) {
			var error;
			if ( value !== +value && value !== ( value | 0 ) ) {
				error = {
					"rule": "isInteger",
					"message": "ERROR:provided value [" + value + "] is not an integer."
				};
				return [ error ];
			}
			return;
		}, // end METHOD isInteger()

		isNull: function( value ) {
			var error;
			if ( !_.isNull( value ) ) {
				error= {
					'rule': 'isNull',
					'message': 'ERROR:provided value[' + value + '] is not null.'
				};
				return [ error ];
			}
			return;
		}, // end METHOD isNull()

	}; // end VALIDATE

	// Map the rules to a particular method:
	validate.rule = {
		"object": validate.isObject,
		"has_properties": validate.hasProperties,
		"function": validate.isFunction,
		"string": validate.isString,
		"array": validate.isArray,
		"integer": validate.isInteger,
		"number": validate.isNumber,
		"greater_than": validate.greater_than,
		"less_than": validate.less_than,
		"matches": validate.matches,
		"interval": validate.interval,
		"null": validate.isNull
	};

		


	// VALIDATOR //

	validator = function( value, rules, callback ) {

		var _rules = [], rule, index, parameters,
			error, errors = [];

		// Split the rules based on the pipe character:
		_rules = rules.split( '|' );

		// For each rule, check that the rule is valid and then perform the validation:
		for ( var i = 0; i < _rules.length; i++ ) {

			// Reset:
			parameters = null;
			rule = _rules[ i ];

			// Extract the rule:
			index = _rules[ i ].indexOf( '[' );
			if ( index !== -1 ) {
				rule = _rules[ i ].substr( 0, index );
			}

			if ( rule !== _rules[ i ] ) {
				// Capture any parameters:
				parameters = _rules[ i ].match( /\[([^\]]+)\]/ )[ 1 ];
			}

			if ( !validate.rule.hasOwnProperty( rule ) ) {
				errors.push( {
					'rule': 'unknown rule: ' + _rules[ i ],
					'message': "ERROR:unknown rule. Validation could not be performed."
				});
				continue;
			}

			// Perform validation:
			error = validate.rule[ rule ]( value, parameters );

			// Did we get an error?
			if ( error && error.length ) {
				for ( var j = 0; j < error.length; j++ ) {
					errors.push( error[ j ] );
				} // end FOR j
			}

		} // end FOR i

		// Pass the errors to the callback:
		if ( callback ) {

			if ( errors.length ) {
				callback( errors );
				return;
			}

			callback( null );
			return;
		}

		return errors;

	}; // end VALIDATOR


	// EXPORTS //

	Validator = validator;

})( _ );