/**
 * @file    object.js
 * @author  lengchao
 * @version 1.0
 * @date    2016-11-12
 */

"use strict";

var Buffer = require( "buffer" ).Buffer;

/**
 * Object.toString()
 *
 * @param object
 * @returns {*}
 * @private
 */
var toString_ = function( object ) {

    switch( true ) {
        case typeof object === "string"                             : return object;
        case typeof object === "number" || Buffer.isBuffer( object ): return object.toString();
        default                                                     : return JSON.stringify( object );
    }
};

// =================================================================================================
exports.toString = toString_;
