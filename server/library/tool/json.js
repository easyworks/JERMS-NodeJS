/**
 * @file    json.js
 * @author  lengchao
 * @version 1.0
 * @date    2016-11-12
 */

"use strict";

var _ = require( "underscore" );
var util = require( "util" );

/**
 * 获取jsonp返回对象
 *
 * @param request
 * @param result
 * @returns {*}
 */
var getJsonpResult = function( request , result ) {

    var callback = request.query.callback;
    result = safeJsonStringify( result );

    return util.format( "%s(%s)" , callback , result );
};

/**
 * safe parse json.
 *
 * @param thing
 * @returns {*}
 */
var safeJsonParse = function( thing ) {

    if( _.isObject( thing ) ) {

        return thing;
    }

    try {

        return JSON.parse( thing );
    }catch( e ) {

        return {};
    }
};

/**
 * safe json stringify
 *
 * @param thing
 * @returns {*}
 */
var safeJsonStringify = function( thing ) {

    if( _.isString( thing ) ) {

        return thing;
    }

    try {

        return JSON.stringify( thing );
    }catch( e ) {

        return "{}";
    }
};

// =================================================================================================
exports.getJsonpResult = getJsonpResult;
exports.safeJsonParse = safeJsonParse;
exports.safeJsonStringify = safeJsonStringify;
