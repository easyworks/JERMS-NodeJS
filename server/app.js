/**
 * @file    app.js
 * @author  lengchao
 * @version 1.0
 * @date    2016-11-12
 */

"use strict";

/**********************************************************************************************/
/**
 * require
 */
var express    = require( "express" );
var initialize = require( "./library/initialize" );
/**********************************************************************************************/

var app = express();

/**********************************************************************************************/
// view engine setup
initialize.viewSetup( app );
// logger and parser
initialize.loggerAndParser( app );
// session configuration
initialize.session( app );
// path configuration
initialize.pathConfiguration( app , express );
// routes configuration
initialize.routerConfiguration( app );
// error handlers
initialize.errorHandlers( app );
/**********************************************************************************************/

console.log( "> Server start successful!" );

module.exports = app;
