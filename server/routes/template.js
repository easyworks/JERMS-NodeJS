/**
 * @file    template.js
 * @author  lengchao
 * @version 1.0
 * @date    2016-11-22
 */

"use strict";

var express = require( "express" );
var router = express.Router();

var pages = [
    // index ----------------------------------------------
     "dashboard"
    // typography -----------------------------------------
    ,"/typography"
    // widgets --------------------------------------------
    ,"/widgets"
    // tables ---------------------------------------------
    ,"/tables"
    // form -----------------------------------------------
    ,"/form/elements"
    ,"/form/components"
    ,"/form/examples"
    ,"/form/validation"
    // user interface -------------------------------------
    ,"/user-interface/buttons"
    ,"/user-interface/labels"
    ,"/user-interface/images-icons"
    ,"/user-interface/alters"
    ,"/user-interface/media"
    ,"/user-interface/components"
    ,"/user-interface/others"
    // photo gallery --------------------------------------
    ,"/photo-gallery"
    // charts ---------------------------------------------
    ,"/charts"
    // file manger ----------------------------------------
    ,"/file-manager"
    // calendar -------------------------------------------
    ,"/calendar"
    // pages ----------------------------------------------
    ,"/pages/list-view"
    ,"/pages/profile-page"
    ,"/pages/messages"
    ,"/pages/login"
];

( function() {

    pages.forEach( function( page ) {

        router.get( page , function( request , response ) {

            response.render( "template" + page );
        } );
    } );
} )();

// =================================================================================================
module.exports = router;
