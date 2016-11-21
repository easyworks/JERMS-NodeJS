/**
 * @file    StringUtil.js
 * @author  lengchao
 * @version 1.0
 * @date    2016-11-12
 */

"use strict";

/**
 * 计算字符串长度
 *
 * @param str
 * @returns {number}
 */
var getLength = function( str ) {

    var length = 0;

    for( var i = 0 , len = str.length; i < len; i++ ) {

        isChineseChar( str , i ) ? length += 2 : length++;
    }

    return length;
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
        chars[ i ] = [ s , this.isCHS( s , i ) ];
    }

    this.charsArray = chars;

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
    var _str = "";

    this.strToChars( str );

    for( var i = 0 , length = str.length; i < length; i++ ) {

        if( this.charsArray[ i ][ 1 ] ) {

            len += 2;
        }else {

            len++;
        }

        if( end < len ) {

            return _str;
        }else if( start < len ) {

            _str += this.charsArray[ i ][ 0 ];
        }
    }
    return _str;
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

    return this.subCHString( str , start , start + length );
};

// =================================================================================================
exports.getLength = getLength;
exports.stringToCharArray = stringToCharArray;
exports.isChineseChar = isChineseChar;
exports.subChineseString = subChineseString;
exports.subChineseStringBylength = subChineseStringBylength;
