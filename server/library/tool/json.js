/**
 * @file    json.js
 * @author  lengchao
 * @version 1.0
 * @date    2016-11-12
 */

"use strict";

/**
 * 获取jsonp返回对象
 *
 * @param request
 * @param result
 * @returns {*}
 */
var getJsonpResult = function( request , result ) {

    var callback = request.query.callback;
    try {

        result = JSON.stringify( result );
    }catch( e ) {

        result = "";
    }

    callback = callback + "(" + ( !!result ? result : "" ) + ")";

    return callback;
};

// =================================================================================================
exports.getJsonpResult = getJsonpResult;
