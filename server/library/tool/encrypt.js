/**
 * @file    encrypt.js
 * @author  lengchao
 * @version 1.0
 * @date    2016-11-12
 */

"use strict";

var _ = require( "underscore" );
var util = require( "util" );
var crypto = require( "crypto" );
var base64url = require( "base64url" );

//var objectTool = require( "./object" );
var jsonTool = require( "./json" );

//const _secret = "__easyworks___secREt___";

/**
 * 返回添加了secret的字符串
 *
 * @param str
 * @param secret
 * @returns {*}
 * @private
 */
var _getSecretString = function( str , secret ) {

    //return util.format( "%s%s%s" , _secret , str , _secret );
    return [ secret , str , secret ].join( "" );
};

/**
 * sha1加密
 *
 * @param str
 * @param secret
 * @returns {string}
 */
var sha1 = function( str , secret ) {

    if( !str ) {
        return "";
    }

    !!secret && ( str = _getSecretString( str , secret ) );

    //noinspection JSUnresolvedFunction
    str = crypto.createHash( "sha1" ).update( str ).digest( "hex" );

    return str;
};

/**
 * md5加密
 *
 * @param str
 * @param secret
 * @returns {string}
 */
var md5 = function( str , secret ) {

    if( !str ) {
        return "";
    }

    !!secret && ( str = _getSecretString( str , secret ) );

    //noinspection JSUnresolvedFunction
    str = crypto.createHash( "md5" ).update( str ).digest( "hex" );

    return str.toUpperCase();
};

/**
 * base 64 encode
 *
 * @param thing
 * @param encoding
 * @returns {*}
 * @private
 */
var _base64urlEncode = function( thing , encoding ) {

    if( !thing ) {

        return "";
    }

    _.isObject( thing ) && ( thing = jsonTool.safeJsonStringify( thing ) );
    thing += "";
    encoding = encoding || "utf8";

    return base64url( thing , encoding );
};
/**
 * base 64 decode
 *
 * @param thing
 * @param encoding
 * @returns {*}
 * @private
 */
var _base64urlDecode = function( thing , encoding ) {

    if( !thing ) {

        return "";
    }

    encoding = encoding || "utf8";

    return base64url.decode( thing , encoding );
};

// =================================================================================================
exports.sha1 = sha1;
exports.md5 = md5;
exports.base64url = {};
exports.base64url.encrypt = _base64urlEncode;
exports.base64url.decrypt = _base64urlDecode;
