/**
 * device model.
 *
 * @file    db.js
 * @author  lengchao
 * @version 0.0.1
 * @date    2016-05-24
 */

var Sequelize = require( "sequelize" );
var config = require( "../config" );

var tablePrefix = config.tablePrefix;
var sequelize = new Sequelize( config.connectDB , {
    "define": {
         "freezeTableName": true
        ,"underscored"    : true
    }
} );

sequelize
    .transaction( function( t ) {
        return new Sequelize
            .Promise( function( resolved , rejected ) {
                return resolved();
            } )
            .then( function() {
                return sequelize
                    .sync( {
                        force: false
                    } , {
                        transaction: t
                    } )
                    .then( function() {
                        // addComments();
                        // createMockData();
                    } );
            } );
    } )
    .then( function() {
        console.log( "> Sequelize sync database successful" );
    } )
    .catch( function( err ) {
        console.log( err );
        console.log( "[debug] error happens in construct db." )
    } )
;

exports.sequelize = sequelize;
exports.tablePrefix = tablePrefix;
