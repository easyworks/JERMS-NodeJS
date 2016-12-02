/**
 * test JWT
 *
 * @file    testjwt.js
 * @author  lengchao
 * @version 1.0
 * @date    2016-12-01
 */

"use strict";

var jwt = require( "./jwt" );

var header = jwt.getHeader();
var payload = {
     "iss"        : "John Wu JWT"
    ,"iat"        : 1441593502
    ,"exp"        : 1441594722
    ,"aud"        : "www.example.com"
    ,"sub"        : "jrocket@example.com"
    ,"from_user"  : "B"
    ,"target_user": "A"
};
var secret = "___easyworks__JWT_secreT____";

var options = {
     "header" : header
    ,"payload": payload
    ,"secret" : secret
};

var token = jwt.createToken( options );
var isValid = jwt.isValid( token );
var verify = jwt.verify( token , header.alg , secret );
var origin = jwt.decode( token );

console.log( "token: " , token );
console.log( "isValid: " , isValid );
console.log( "verify: " , verify );
console.log( "origin: " , origin );
options.header = origin.header;
options.payload = origin.payload;
var _token = jwt.createToken( options );
console.log( "token: " , token == _token );

