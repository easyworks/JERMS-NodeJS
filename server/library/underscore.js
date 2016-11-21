/**
 * @file    underscore.js
 * @author  lengchao
 * @version 1.0
 * @date    2016-11-12
 */

"use strict";

// imports
var _ = require( "underscore" );

/**
 * origin template settings
 *
 * @type {{evaluate: RegExp, interpolate: RegExp, escape: RegExp}}
 */
var originTemplateSettings = {
     "evaluate"   : /<%([\s\S]+?)%>/g
    ,"interpolate": /<%=([\s\S]+?)%>/g
    ,"escape"     : /<%-([\s\S]+?)%>/g
};
/**
 * template settings
 *
 * @type {{evaluate: RegExp, interpolate: RegExp, escape: RegExp}}
 */
var templateSettings = {
     "evaluate"   : /!\{([\s\S]+?)}/g     // evaluate 标签中间的表示为可执行的js代码
    ,"interpolate": /\{([\s\S]+?)}/g      // interpolate 表示输出一个js运行结果的值
    ,"escape"     : /\{\{([\s\S]+?)}}/g   // escapte 表示输出这个变量的值并且进行html标签过滤，将相关的字符如"<"转为"&lt;"
};

_.templateSettings = templateSettings;

// =================================================================================================
exports._ = _;
exports.originTemplateSettings = originTemplateSettings;
exports.templateSettings = templateSettings;
