/**
 * connect node.js vhost, support to express.
 *
 * @file    connect.js
 * @author  lengchao
 * @version 1.0.0
 * @date    2016-05-25
 */

"use strict";

var vhost = function( hostname , server ) {

    if( !hostname ) throw new Error( "vhost hostname required" );
    if( !server ) throw new Error( "vhost server required" );

    var regexp = new RegExp( "^" + hostname.replace( /[^*\w]/g , "\\$&" ).replace( /[*]/g , "(?:.*?)" ) + "$" , "i" );
    //noinspection JSUnresolvedVariable,JSUnresolvedFunction
    !!server.onvhost && server.onvhost( hostname );

    return function vhost( request , response , next ) {

        if( !request.headers.host ) {
            return next();
        }

        var host = request.headers.host.split( ":" )[ 0 ];
        if( !regexp.test( host ) ) {
            return next();
        }

        if( typeof server == "function" ) {

            return server( request , response , next );
        }

        server.emit( "request" , request , response );
    };
};

// =================================================================================================
module.exports = vhost;
