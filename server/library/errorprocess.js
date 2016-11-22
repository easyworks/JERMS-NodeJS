/**
 * error process
 *
 * @file    errorprocess.js
 * @author  lengchao
 * @version 1.0
 * @date    2016-11-12
 */

"use strict";

var config = require( "../config" );

/**
 * 404 error process.
 *
 * @param request
 * @param response
 * @param next
 */
var error404Process = function( request , response , next ) {

    var error = new Error( "Not Found" );
    error.status = 404;

    next( error );
};

/**
 * error for development process.
 * development error handler
 * will print stacktrace
 *
 * @param error
 * @param request
 * @param response
 * @param next
 */
var errorForDevelopment = function( error , request , response , next ) {

    var status = error.status || 500;
    var errorpage = config.errorpage.development[ status ];

    response.status( status );
    response.render( errorpage , {
         "message": error.message
        ,"error"  : error
    } );
};
/**
 * error for production process.
 * production error handler
 * no stacktraces leaked to user
 *
 * @param error
 * @param request
 * @param response
 * @param next
 */
var errorForProduction = function( error , request , response , next ) {

    var status = error.status || 500;
    var errorpage = config.errorpage.production[ status ];

    response.status( status );
    response.render( errorpage , {
         "message": error.message
        ,"error"  : {}
    } );
};

/**
 * session error handler.
 *
 * @param request
 * @param response
 * @param next
 * @returns {*}
 */
var sessionErrorHandler = function( request , response , next ) {

    if( !request.session ) {

        console.log( "> redis session connect faild." );
        return next( new Error( "redis session connect faild." ) ); // handle error
    }

    next();
};

// =================================================================================================
exports.error404Process = error404Process;
exports.errorForDevelopment = errorForDevelopment;
exports.errorForProduction = errorForProduction;
exports.sessionErrorHandler = sessionErrorHandler;
