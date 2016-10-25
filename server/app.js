

"use strict";

/**********************************************************************************************/
/**
 * require
 */
var express      = require( "express" );
var path         = require( "path" );
var favicon      = require( "serve-favicon" );
var logger       = require( "morgan" );
var cookieParser = require( "cookie-parser" );
var bodyParser   = require( "body-parser" );
var session      = require( "express-session" );
var RedisStore   = require( "connect-redis" )( session );

var config       = require( "./config" );
/**********************************************************************************************/

var app = express();

/**********************************************************************************************/
/**
 * view engine setup
 */
app.set( "views" , path.join( __dirname , "views" ) );
app.set( "view engine" , "jade" );
/**********************************************************************************************/

/**********************************************************************************************/
app.use( logger( "dev" ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {
    "extended": false
} ) );
app.use( cookieParser() );
/**********************************************************************************************/

/**********************************************************************************************/
/**
 * session configuration
 */
app.use( session( {
    "store"            : new RedisStore( {
         "host": config.redisHost
        ,"port": config.redisPort
    } )
    ,"secret"           : "___easyworks__"
    ,"resave"           : true
    ,"path"             : "/"
    ,"name"             : "JERMS-NodeJS"
    ,"saveUninitialized": true
    ,"cookie"           : {
        "maxAge": 60 * 1000 * 60   // 1 hour
    }
} ) );
app.use( function( request , response , next ) {

    if( !request.session ) {

        console.log( "> redis session connect faild." );
        return next( new Error( "redis session connect faild." ) ); // handle error
    }

    next();
} );
/**********************************************************************************************/

/**********************************************************************************************/
/**
 * path configuration
 */
var appHome = process.cwd();
var appPath = "/client/app";
// uncomment after placing your favicon in /public
app.use( favicon( path.join( appHome , appPath , "favicon.ico" ) ) );
// public home
appPath = path.join( appHome , appPath );
app.use( express.static( appPath ) );
//app.use( express.static( path.join( appHome , "/server/public" ) ) );
/**********************************************************************************************/

/**********************************************************************************************/
/**
 * routes configuration
 */
// routes imports
var rootRoute = require( "./routes/rootRoute" );
// routes configuration
app.use( "/" , rootRoute );
/**********************************************************************************************/

/**********************************************************************************************/
/**
 * error configuration
 */
// catch 404 and forward to error handler
app.use( function( request , response , next ) {

    var error = new Error( "Not Found" );
    error.status = 404;

    next( error );
} );

// error handlers
// development error handler
// will print stacktrace
if( app.get( "env" ) === "development" ) {
    app.use( function( error , request , response /*, next*/ ) {
        response.status( error.status || 500 );
        response.render( "error" , {
            message: error.message ,
            error: error
        } );
    } );
}
// production error handler
// no stacktraces leaked to user
app.use( function( error , request , response /*, next*/ ) {
    response.status( error.status || 500 );
    response.render( "error" , {
        message: error.message ,
        error: {}
    } );
} );
/**********************************************************************************************/

module.exports = app;
