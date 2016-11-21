/**
 * @file    config.js
 * @author  lengchao
 * @version 1.0
 * @date    2016-11-12
 */

"use strict";

var path = require( "path" );

var config = {
    "server": {
         "host": "127.0.0.1"
        ,"port": 8001
    }
    ,"redis": {
         "host": "127.0.0.1"
        ,"port": "6379"
    }
    ,"session": {
         "secret"           : "___easyworks__"
        ,"resave"           : true
        ,"path"             : "/"
        ,"name"             : "JERMS-NodeJS"
        ,"saveUninitialized": true
    }
    ,"cookie": {
        "maxAge": 60 * 1000 * 60   // 1 hour
    }
    ,"views": {
         "path"  : path.join( __dirname , "views" )
        ,"engine": "jade"
    }
    ,"errorpage": {
         "error404"              : "error/production/404"
        ,"error404ForDevelopment": "error/development/404"
        ,"error500"              : "error/production/500"
        ,"error500ForDevelopment": "error/development/500"
    }
    ,"database": {
         "mode"       : "development"             // 模式,使用哪个数据链接
        ,"url"        : ""                        // 链接字符串
        ,"tablePrefix": {                         // 数据表前缀
             "jerms" : "jerms_"
            ,"global": "glb_"
            ,"system": "sys_"
        }
        ,"default"    : {}
        ,"development": {
             "type"             : "postgres"
            ,"username"         : "lengchao"      // env var: PGUSER
            ,"password"         : "a1385lovelc"   // env var: PGPASSWORD
            ,"name"             : "jerms"         // env var: PGDATABASE
            ,"host"             : "localhost"
            ,"port"             : 5432            // env var: PGPORT
            ,"max"              : 15              // max number of clients in the pool
            ,"idleTimeoutMillis": 30000           // how long a client is allowed to remain idle before being closed
            ,"template"         : "{type}://{username}:{password}@{host}:{port}/{name}"
        }
        ,"production" : {
             "type"             : "postgres"
            ,"username"         : "lengchao"      // env var: PGUSER
            ,"password"         : "a1385lovelc"   // env var: PGPASSWORD
            ,"name"             : "jerms"         // env var: PGDATABASE
            ,"host"             : "localhost"
            ,"port"             : 5432            // env var: PGPORT
            ,"max"              : 15              // max number of clients in the pool
            ,"idleTimeoutMillis": 30000           // how long a client is allowed to remain idle before being closed
            ,"template"         : "{type}://{username}:{password}@{host}:{port}/{name}"
        }
    }
    ,"domain": "lengchao.cn"
};

// =================================================================================================
module.exports = config;
