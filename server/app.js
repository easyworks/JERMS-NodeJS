/**
 * @file    app.js
 * @author  lengchao
 * @version 1.0
 * @date    2016-11-12
 */

"use strict";

// =================================================================================================
// require modules
// =================================================================================================
var express    = require( "express" );
var config     = require( "./config" );
var database   = require( "./library/database" );
var initialize = require( "./library/initialize" );
// =================================================================================================

// =================================================================================================
// initialize database
// =================================================================================================
database.init( config );

var app = express();

// =================================================================================================
// initialize a kinds of settings.
// =================================================================================================
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
// =================================================================================================

// log server infomation on server start.
initialize.logServerInfo();

// =================================================================================================
module.exports = app;
