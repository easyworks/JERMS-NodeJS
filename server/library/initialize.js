/**
 * application initialize
 *
 * @file    initialize.js
 * @author  lengchao
 * @version 1.0
 * @date    2016-11-12
 */

"use strict";

var session      = require( "express-session" );
var RedisStore   = require( "connect-redis" )( session );
var path         = require( "path" );
var favicon      = require( "serve-favicon" );
var logger       = require( "morgan" );
var cookieParser = require( "cookie-parser" );
var bodyParser   = require( "body-parser" );

var config       = require( "../config" );
var errorprocess = require( "../library/errorprocess" );

// routes imports
var rootRoute     = require( "../routes/root" );
var systemRoute   = require( "../routes/system" );
var templateRoute = require( "../routes/template" );

/**
 * view engine setup.
 *
 * @param app
 */
var viewSetup = function( app ) {

    app.set( "views" , config.views.path );
    app.set( "view engine" , config.views.engine );
};

/**
 * logger and parser
 *
 * @param app
 */
var loggerAndParser = function( app ) {

    app.use( logger( "dev" ) );
    app.use( bodyParser.json() );
    app.use( bodyParser.urlencoded( {
        "extended": false
    } ) );
    app.use( cookieParser() );
};

/**
 * initialize session
 *
 * @param app
 * @returns {Function|*|exports}
 * @private
 */
var _session = function( app ) {

    app.use( session( {
         "secret"           : config.session.secret
        ,"resave"           : config.session.resave
        ,"path"             : config.session.path
        ,"name"             : config.session.name
        ,"saveUninitialized": config.session.saveUninitialized
        ,"cookie"           : {
            "maxAge": config.cookie.maxAge
        }
        ,"store"            : new RedisStore( {
             "host": config.redis.host
            ,"port": config.redis.port
        } )
    } ) );
    app.use( errorprocess.sessionErrorHandler );
};

/**
 * path configuration
 *
 * @param app
 * @param express
 */
var pathConfiguration = function( app , express ) {

    var rootPath = process.cwd();
    // /client
    var clientPath = path.join( rootPath , "/client" );
    // /client/app
    var appPath = path.join( clientPath , "/app" );
    // uncomment after placing your favicon in /client/app
    app.use( favicon( path.join( appPath , "/favicon.ico" ) ) );
    // public home
    app.use( express.static( appPath ) );
    //app.use( express.static( path.join( appHome , "/server/public" ) ) );
    // widgets imports
    app.use( "/widgets" , express.static( path.join( clientPath , "/widgets" ) ) );
    app.use( "/widgets" , express.static( path.join( clientPath , "/bower_components" ) ) );
};

/**
 * routers configuration.
 *
 * @param app
 */
var routerConfiguration = function( app ) {

    // routes configuration
    app.use( "/" , rootRoute );
    app.use( "/system" , systemRoute );
    app.use( "/template" , templateRoute );
};

/**
 * error handlers
 *
 * @param app
 */
var errorHandlers = function( app ) {

    // catch 404 and forward to error handler
    app.use( errorprocess.error404Process );

    // development error handler
    app.get( "env" ) === "development"
        ? app.use( errorprocess.errorForDevelopment )
        // production error handler
        : app.use( errorprocess.errorForProduction )
    ;
};

/**
 * 服务器启动时打印服务器信息
 */
var logServerInfo = function() {

    console.log( "> Server listening on %s:%s" , config.server.host , config.server.port );
    console.log( "> Server start successful!" );
};

// =================================================================================================
exports.viewSetup = viewSetup;
exports.loggerAndParser = loggerAndParser;
exports.session = _session;
exports.pathConfiguration = pathConfiguration;
exports.routerConfiguration = routerConfiguration;
exports.errorHandlers = errorHandlers;
exports.logServerInfo = logServerInfo;
