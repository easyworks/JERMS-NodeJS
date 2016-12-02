/**
 * JWT(JSON Web Token)
 *
 * @file    jwt.js
 * @author  lengchao
 * @version 1.0
 * @date    2016-12-01
 */

"use strict";

var util = require( "util" );
var _ = require( "underscore" );
var jwa = require( "jwa" );

var encrypt = require( "./encrypt" );
var json = require( "./json" );
var object = require( "./object" );

/**
 * all of the algorithms
 *
 * @type {string[]}
 */
const ALGORITHMS = [
     "HS256"   // HMAC using SHA-256 hash algorithm
    ,"HS384"   // HMAC using SHA-384 hash algorithm
    ,"HS512"   // HMAC using SHA-512 hash algorithm
    ,"RS256"   // RSASSA using SHA-256 hash algorithm
    ,"RS384"   // RSASSA using SHA-384 hash algorithm
    ,"RS512"   // RSASSA using SHA-512 hash algorithm
    ,"ES256"   // ECDSA using P-256 curve and SHA-256 hash algorithm
    ,"ES384"   // ECDSA using P-384 curve and SHA-384 hash algorithm
    ,"ES512"   // ECDSA using P-521 curve and SHA-512 hash algorithm
    ,"none"    // No digital signature or MAC value included
];
const JWT_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;

/**
 * return right encoding.
 *
 * @param encoding
 * @returns {*|string}
 * @private
 */
var _getEncoding = function( encoding ) {

    return encoding || "utf8";
};

/**
 * get header
 *
 * @param algorithm
 * @param type
 * @returns {{typ: (*|string), alg: (*|string)}}
 */
var getHeader = function( algorithm , type ) {

    var _dufaultAlgorithm = ALGORITHMS[ 0 ];
    algorithm = algorithm || _dufaultAlgorithm;
    !_.contains( ALGORITHMS , algorithm ) && ( algorithm = _dufaultAlgorithm );

    type = type || "JWT";

    return {
         "typ": type
        ,"alg": algorithm
    };
};

/**
 * 返回加密前的签名
 * header.payload
 *
 * @param header
 * @param payload
 * @param encoding
 * @returns {*}
 * @private
 */
var _getSecuredInput = function( header , payload , encoding ) {

    encoding = _getEncoding( encoding );

    var encodedHeader = encrypt.base64url.encrypt( header , "binary" );
    var encodedPayload = encrypt.base64url.encrypt( payload , encoding );

    return util.format( "%s.%s" , encodedHeader , encodedPayload );
};

/**
 * get header object from JWT string.
 *
 * @param jwt
 * @returns {*}
 * @private
 */
var _getHeaderFromJWT = function( jwt ) {

    var encodedHeader = jwt.split( "." , 1 )[ 0 ];
    var decodedHeader = encrypt.base64url.decrypt( encodedHeader , "binary" );

    return json.safeJsonParse( decodedHeader );
};
/**
 * get secured-input string from JWT string.
 *
 * @param jwt
 * @returns {string}
 * @private
 */
var _getSecuredInputFromJWT = function( jwt ) {

    return jwt.split( "." , 2 ).join( "." );
};
/**
 * get signature string from JWT string.
 *
 * @param jwt
 * @returns {*}
 * @private
 */
var _getSignatureFromJWT = function( jwt ) {

    return jwt.split( "." )[ 2 ];
};
/**
 * get payload string from JWT string.
 *
 * @param jwt
 * @param encoding
 * @returns {*}
 */
var _getPayloadFromJWT = function( jwt , encoding ) {

    encoding = _getEncoding( encoding );

    var payload = jwt.split( "." , 2 )[ 1 ];
    return encrypt.base64url.decrypt( payload , encoding );
};

/**
 * validation JWT string.
 *
 * @param jwtString
 * @returns {boolean}
 * @private
 */
var isValidJWT = function( jwtString ) {

    return JWT_REGEX.test( jwtString ) && !!_getHeaderFromJWT( jwtString );
};

/**
 * 检查jwt string是否匹配使用secret生成的签名
 *
 * @param jwtString
 * @param algorithms
 * @param secret
 * @returns {*}
 */
var jwtVerify = function( jwtString , algorithms , secret ) {

    if( !algorithms ) {

        var error = new Error( "Missing algorithms parameter for jwt.verify" );
        error.code = "MESSING_ALGORITHMS";
        throw error;
    }

    jwtString = object.toString( jwtString );
    var signature = _getSignatureFromJWT( jwtString );
    var securedInput = _getSecuredInputFromJWT( jwtString );
    var algo = jwa( algorithms );

    return algo.verify( securedInput , signature , secret );
};

/**
 * create token
 *
 * @param options {{header, payload, secret, encoding}}
 * @returns {*}
 */
var createToken = function( options ) {

    var header = options.header;
    var payload = options.payload;
    var secret = options.secret;
    var encoding = _getEncoding( options.encoding );

    // process header
    var hasHeader = !!header;
    var algorithm , type;
    hasHeader && ( algorithm = header.alg ) && ( type = header.typ );
    header = getHeader( algorithm , type );

    // jwa with header.algorithm
    var jwa_algorithm = jwa( header.alg );
    var securedInput = _getSecuredInput( header , payload , encoding );

    // get signature
    var signature = jwa_algorithm.sign( securedInput , secret );

    return util.format( "%s.%s" , securedInput , signature );
};

/**
 * decode jwt string
 *
 * @param jwtString
 * @param options
 * @returns {*}
 */
var decode = function( jwtString , options ) {

    options = Object.assign( {
         "encoding": "utf8"
        ,"json"    : true
    } , options || {} );
    jwtString = object.toString( jwtString );

    if( !isValidJWT( jwtString ) ) {
        return null;
    }

    var header = _getHeaderFromJWT( jwtString );
    if( !header ) {
        return null;
    }

    var payload = _getPayloadFromJWT( jwtString , options.encoding );
    if( header.typ === "JWT" || options.json ) {
        //noinspection JSCheckFunctionSignatures
        payload = JSON.parse( payload , options.encoding );
    }

    return {
         "header"   : header
        ,"payload"  : payload
        ,"signature": _getSignatureFromJWT( jwtString )
    };
};

// =================================================================================================
exports.ALGORITHMS = ALGORITHMS;
exports.getHeader = getHeader;
exports.createToken = createToken;
exports.decode = decode;
exports.isValid = isValidJWT;
exports.verify = jwtVerify;
