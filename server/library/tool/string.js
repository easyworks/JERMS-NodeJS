/**
 * @file    StringUtil.js
 * @author  lengchao
 * @version 1.0
 * @date    2016-11-12
 */

"use strict";

/**
 * 清除所有标签
 *
 * @param str 需要去除标签的字符串
 * @returns {string}
 */
var clearTags = function( str ) {

    str = str || "";
    return str.replace( /<\/?[^>]+>/gi , "" );
};

/**
 * 检测字符串是否以某字符或字符串开头
 *
 * @param str 需要检测的字符串
 * @param pattern
 * @returns {boolean}
 */
var startWith = function( str , pattern ) {

    str = str || "";

    return str.indexOf( pattern ) === 0;
};

/**
 * 检测字符串是否以某字符或字符串结尾
 *
 * @param str 需要检测的字符串
 * @param pattern
 * @returns {boolean}
 */
var endWith = function( str , pattern ) {

    str = str || "";

    var d = str.length - pattern.length;

    return d >= 0 && str.lastIndexOf( pattern ) === d;
};

/**
 * 判断字符串是否为英文和数字组成
 *
 * @param text 需要检测的字符串
 * @returns {boolean}
 **/
var isEnglishAndNumber = function( text ) {

    text = text || "";
    var engNumReg = /^[a-zA-Z0-9]+$/;

    return text.match( engNumReg ) != null;
};

/**
 * 计算字符串长度(中文算2字节)
 *
 * @param str
 * @returns {number}
 */
var getLength = function( str ) {

    str = str || "";

    return str.replace( /[\u0100-\uffff]/g , "  " ).length;
};

/**
 * 将字符串拆成字符，并存到数组中
 *
 * @returns {Array}
 */
var stringToCharArray = function( str ) {

    var chars = [];

    for( var i = 0 , length = str.length; i < length; i++ ) {

        var s = str.substr( i , 1 );
        chars[ i ] = [ s , isChineseChar( s , i ) ];
    }

    //this.charsArray = chars;

    return chars;
};

/**
 * 判断某个字符是否是汉字
 *
 * @param str
 * @param i
 * @returns {boolean}
 */
var isChineseChar = function( str , i ) {

    return str.charCodeAt( i ) > 255 || str.charCodeAt( i ) < 0;
};

/**
 * 截取字符串（从start字节到end字节）
 *
 * @param str
 * @param start
 * @param end
 * @returns {string}
 */
var subChineseString = function( str , start , end ) {

    var len = 0;
    var _str = [];

    var chars = stringToCharArray( str );

    for( var i = 0 , length = str.length; i < length; i++ ) {

        chars[ i ][ 1 ] ? len += 2 : len++;

        if( end < len ) {

            return _str.join( "" );
        }else if( start < len ) {

            _str.push( chars[ i ][ 0 ] );
        }
    }
    return _str.join( "" );
};

/**
 * 截取字符串（从start字节截取length个字节）
 *
 * @param str
 * @param start
 * @param length
 * @returns {string}
 */
var subChineseStringBylength = function( str , start , length ) {

    return subChineseString( str , start , start + length );
};

// =================================================================================================
exports.clearTags = clearTags;
exports.startWith = startWith;
exports.endWith = endWith;
exports.isEnglishAndNumber = isEnglishAndNumber;
exports.getLength = getLength;
exports.stringToCharArray = stringToCharArray;
exports.isChineseChar = isChineseChar;
exports.subChineseString = subChineseString;
exports.subChineseStringBylength = subChineseStringBylength;
