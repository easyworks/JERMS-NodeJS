/**
 * root route configuration
 *
 * @file    rootRoute.js
 * @author  lengchao
 * @version 1.0.0
 * @date    2016-11-12
 */

"use strict";

var express = require( "express" );
var router = express.Router();

/**
 * GET home page.
 */
router.get( "/" , function( error , request , response ) {

    response.render( "index" , {
        title: "Express"
    } );
} );

// =================================================================================================
module.exports = router;
