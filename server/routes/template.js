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
    // dashboard ------------------------------------------
     "home"
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
    ,"/ui/buttons"
    ,"/ui/labels"
    ,"/ui/images-icons"
    ,"/ui/alters"
    ,"/ui/media"
    ,"/ui/components"
    ,"/ui/others"
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
    ,"/pages/messages"                // bingo
    ,"/pages/message"
    ,"/pages/login"                   // bingo
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
