/**
 * @file    db.js
 * @author  lengchao
 * @version 1.0
 * @date    2016-11-11
 */

"use strict";

var Sequelize = require( "sequelize" );
var underscore = require( "./underscore" );
var _ = underscore._;

var _config = null;
var sequelize = null;

// =================================================================================================
// Process database url.
// =================================================================================================
/**
 * get default database configuration.
 *
 * @param config
 * @private
 */
var __getDefaultDatabaseConfig = function( config ) {

    var mode = config.database.mode;

    config.database.default = config.database[ mode ];
    !config.database.default && ( config.database.default = config.database.development );
};
/**
 * generate database connection url.
 *
 * @param config
 * @returns {*}
 * @private
 */
var __getConnectionDatabaseUrl = function( config ) {

    var data = config.database.default;
    var urlTemplate = data.template;

    //_.templateSettings = underscore.templateSettings;
    var ct = _.template( urlTemplate );

    return ct( data );
};
/**
 * process config data object.
 *
 * @param config
 * @private
 */
var _processConfig = function( config ) {

    __getDefaultDatabaseConfig( config );
    config.database.url = __getConnectionDatabaseUrl( config );
};

// =================================================================================================
// Init database and create tables.
// =================================================================================================
/**
 * initialize sequelize
 *
 * @private
 */
var _initDatabase = function() {

    sequelize = new Sequelize( _config.database.url , {
         "logging": console.log   // function or false
        ,"define" : {
            "freezeTableName": true
            //,"underscored"    : true
        }
    } );
};
/**
 * create database.
 *
 * @private
 */
var _createDatabase = function() {

    sequelize
        .transaction( function( tr ) {

            //noinspection JSCheckFunctionSignatures
            return sequelize.sync( {
                 "force"  : false
                ,"logging": console.log
            } , {
                "transaction": tr
            } );
        } )
        .then( function() {

            console.log( "> Sequelize sync database successful" );
        } )
        .catch( function( error ) {

            console.error( error );
            console.log( "[debug] error happens in construct db." );
        } )
    ;
};
/**
 * initialize
 *
 * @param config configuration data object.
 * @private
 */
var initialize = function( config ) {

    _config = config;
    _processConfig( _config );

    _initDatabase();
    _createDatabase();

    // export sequelize and config object
    exports.sequelize = sequelize;
    exports.config    = _config;

    return _config;
};

// =================================================================================================
// To generate all kinds of table name.
// =================================================================================================
/**
 * return table name for global.
 *
 * @param tableName
 * @returns {*}
 */
var getGlobalTableName = function( tableName ) {

    return _config.database.tablePrefix.global + tableName;
};
/**
 * return table name for system.
 *
 * @param tableName
 * @returns {*}
 */
var getSystemTableName = function( tableName ) {

    return _config.database.tablePrefix.system + tableName;
};
/**
 * return table name for jerms.
 *
 * @param tableName
 * @returns {*}
 */
var getJERMSTableName = function( tableName ) {

    return _config.database.tablePrefix.jerms + tableName;
};

// =================================================================================================
exports.init = initialize;
exports.getGlobalTableName = getGlobalTableName;
exports.getSystemTableName = getSystemTableName;
exports.getJERMSTableName = getJERMSTableName;
