'use strict';

const Type = {};

function callObjectToString(object) {

  return Object.prototype.toString.call(object);
}

Type.get = function(object) {

  let softType = typeof object;

  if (softType in Type) {

    if (softType === 'object') {

      if (Type.objectForce(object)) {

        return softType;
      } else if (Type.array(object)) {

        return 'array';
      } else {

        return 'null';
      }
    } else if (softType === 'number') {

      if (Type.number(object)) {

        return softType;
      } else if (Type.NaN(object)) {

        return 'NaN';
      } else {

        return 'infinity';
      }
    } else {

      return softType;
    }
  } else {

    return 'unknown';
  }
};

Type.empty = function ( object ) {

  if ( Type.undefined ( object ) ) {

    return true;
  } else if ( Type.null ( object ) ) {

    return true;
  } else if ( Type.string ( object ) ) {

    return object === '';
  } else if ( Type.array ( object ) ) {

    return object.length === 0;
  } else if ( Type.objectForce ( object ) ) {

    if ( object.constructor === Object ) {

      let keys = Object.keys ( object );

      return keys.length === 0;
    } else {

      return false;
    }
  } else {

    return false;
  }
};

Type.function = function(object) { return 'function' === typeof object };

Type.undefined = function(object) { return object === undefined };

Type.null = function(object) { return object === null };

// contain array
Type.object = function(object) { return object && 'object' === typeof object };

Type.objectForce = function(object) { return callObjectToString(object) === '[object Object]' };

Type.number = function(object) { return 'number' === typeof object && !isNaN(object) && isFinite(object) };

Type.NaN = function(arg) { return isNaN(arg) };

Type.infinity = function(arg) { return !isFinite(arg) };

Type.boolean = function(object) { return 'boolean' === typeof object };

Type.string = function(object) { return 'string' === typeof object };

Type.array = function(object) { return callObjectToString(object) === '[object Array]' };

Type.symbol = function(object) { return 'symbol' === typeof object };

Type.parse = { };

Type.parse.string = function parseTOString ( object ) { return Type.object ( object ) ? JSON.stringify ( object ) : String ( object ) };

Type.parse.object = function parseToObject ( string ) { return JSON.parse ( string ) };

Type.parse.number = function parseToNumber ( string ) { return Number ( string ) };

Type.parse.NaN = function parseToNaN ( string ) { return NaN };

Type.parse.infinity = function parseToInfinity ( string ) { return Infinity };

Type.parse.null = function parseToNull ( string ) { return null };

Type.parse.undefined = function parseToUndefined ( string ) { return undefined };

Type.parse.boolean = function parseToBoolean ( string ) { return String ( false ) === string ? false : true };

Type.parse.array = function parseToArray ( string ) { return JSON.parse ( string ) };

Type.parse.function = Type.parse.string;

Type.parse.symbol = Type.parse.string;

Type.parse.unknown = Type.parse.string;

module.exports = Type;