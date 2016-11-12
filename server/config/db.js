/**
 * @file    db.js
 * @author  lengchao
 * @version 1.0
 * @date    2016-11-11
 */

"use strict";

var pg = require( "pg" );
var Sequelize = require( "sequelize" );
var config = require( "./config" );

var tablePrefix = config.database.tablePrefix;
var sequelize = new Sequelize( config.database.url , {
    "define": {
        "freezeTableName": true
        //,"underscored"    : true
    }
    ,"logging":true
} );

/**
 * create database.
 */
sequelize.transaction( function( tr ) {

    //noinspection JSCheckFunctionSignatures
    return sequelize
        .sync(
            {
                 "force"  : false
                ,"logging": console.log
            }
            ,{
                "transaction": tr
            }
        )
        .then( function() {

            console.log( "> Sequelize sync database successful" );
        } )
        .catch( function( error ) {

            console.error( error );
            console.log( "[debug] error happens in construct db." );
        } );
} );


var databaseConfig = config.database.default;
// create a config to configure both pooling behavior and client options
// note: all config is optional and the environment variables will be read if the config is not present
var _config = {
     "user"             : databaseConfig.username            // env var: PGUSER
    ,"password"         : databaseConfig.password            // env var: PGPASSWORD
    ,"database"         : databaseConfig.name                // env var: PGDATABASE
    ,"port"             : databaseConfig.port                // env var: PGPORT
    ,"max"              : databaseConfig.max                 // max number of clients in the pool
    ,"idleTimeoutMillis": databaseConfig.idletimeoutMillis   // how long a client is allowed to remain idle before being closed
};

// this initializes a connection pool
// it will keep idle connections open for a 30 seconds
// and set a limit of maximum 10 idle clients
//noinspection JSCheckFunctionSignatures
var pool = new pg.Pool( _config );
pool.on( "error" , function( error /*, client*/ ) {

    console.error( "error:" + error.message , error.stack );
} );

/**
 * return table name for global.
 *
 * @param tableName
 * @returns {*}
 */
var getGlobalTableName = function( tableName ) {

    return tablePrefix.global + tableName;
};

/**
 * return table name for system.
 *
 * @param tableName
 * @returns {*}
 */
var getSystemTableName = function( tableName ) {

    return tablePrefix.system + tableName;
};

/**
 * return table name for jerms.
 *
 * @param tableName
 * @returns {*}
 */
var getJERMSTableName = function( tableName ) {

    return tablePrefix.jerms + tableName;
};

exports.Pool            = pool;
exports.sequelize       = sequelize;
exports.tablePrefix     = tablePrefix;
exports.config          = config;

exports.getGlobalTableName = getGlobalTableName;
exports.getSystemTableName = getSystemTableName;
exports.getJERMSTableName = getJERMSTableName;
//exports.SequelizeInit      = SequelizeInit;
