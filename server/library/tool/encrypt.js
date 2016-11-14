/**
 * @file    encrypt.js
 * @author  lengchao
 * @version 1.0
 * @date    2016-11-12
 */

"use strict";

const crypto = require( "crypto" );

const config = require( "../../config/config" );

/**
 * sha1加密
 *
 * @param str
 * @param addSecretString 是否添加 secret 字符
 * @returns {string}
 */
var sha1 = function( str , addSecretString ) {

    if( !str ) {
        return "";
    }

    addSecretString = addSecretString || false;
    addSecretString && ( str = config.session.secret + str + config.session.secret );

    //noinspection JSUnresolvedFunction
    str = crypto.createHash( "sha1" ).update( str ).digest( "hex" );

    return str;
};

/**
 * md5加密
 *
 * @param str
 * @param addSecretString
 * @returns {string}
 */
var md5 = function( str , addSecretString ) {

    if( !str ) {
        return "";
    }

    addSecretString = addSecretString || false;
    addSecretString && ( str = config.session.secret + str + config.session.secret );

    //noinspection JSUnresolvedFunction
    str = crypto.createHash( "md5" ).update( str ).digest( "hex" );

    return str.toUpperCase();
};

/**********************************************************************************************/
exports.sha1 = sha1;
exports.md5 = md5;
