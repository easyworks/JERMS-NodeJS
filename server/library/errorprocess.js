/**
 * error process
 *
 * @file    errorprocess.js
 * @author  lengchao
 * @version 1.0
 * @date    2016-11-12
 */

"use strict";

var config = require( "../config/config" );

/**
 * 404 error for production process.
 * catch 404 and forward to error handler
 *
 * @param request
 * @param response
 * @param next
 */
var error404ForProduction = function( request , response , next ) {

    var error = new Error( "Not Found" );
    error.status = 404;

    next( error );
};

/**
 * 500 error for development process.
 * development error handler
 * will print stacktrace
 *
 * @param error
 * @param request
 * @param response
 */
var error500ForDevelopment = function( error , request , response ) {

    response.status( error.status || 500 );
    response.render( config.errorpage.error500ForDevelopment , {
         "message": error.message
        ,"error"  : error
    } );
};
/**
 * 500 error for production process.
 * production error handler
 * no stacktraces leaked to user
 *
 * @param error
 * @param request
 * @param response
 */
var error500ForProduction = function( error , request , response ) {

    response.status( error.status || 500 );
    response.render( config.errorpage.error500 , {
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

exports.error404ForProduction = error404ForProduction;
exports.error500ForProduction = error500ForProduction;
exports.error500ForDevelopment = error500ForDevelopment;
exports.sessionErrorHandler = sessionErrorHandler;
