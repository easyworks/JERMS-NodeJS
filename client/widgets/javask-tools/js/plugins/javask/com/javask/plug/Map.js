﻿/**
 * Simple Map
 * 
 * new:
 * var map = new javask.plug.Map();
 * 
 * 放置初始化数据:
 * map.put( "key1" , "value1" );
 * map.put( "key2" , "value2" );
 * map.put( "key3" , "value3" );
 * alert( "init: " + map );
 * 
 * 更改数据:
 * map.put( "key1" , "setvalue1" );
 * alert( "set key1: " + map );
 * 
 * 删除数据:
 * map.remove( "key2" );
 * alert( "remove key2: " + map );
 * 
 * each:
 * var text = "";
 * map.each( function( key , value , index ) {
 * 	text += index + ":" + key + "=" + value + "\n";
 * } );
 * alert( text );
 * 
 * @fileoverview Map.js
 * @author Javask
 * @version 3.0
 */

"use strict";


$.extend( javask.plug , {
	
	"Map": function() {
		
		/**
		 * 存放键的数组(遍历用到)
		 */
		this.keys = [];
		/**
		 * 存放数据
		 */
		this.data = {};
		
		/**
		 * 放入一个键值对
		 * 
		 * @param key
		 * @param value
		 */
		this.put = function( key , value ) {
			
			this.data[ key ] == null && this.keys.push( key );
			this.data[ key ] = value;
		};
		
		/**
		 * 获取某键对应的值
		 * 如果 value 不存在,则返回 key
		 * 
		 * @param key
		 * @return value
		 */
		this.get = function( key ) {
			
			return this.data[ key ] || key;
		};
		
		/**
		 * 删除一个键值对
		 * 
		 * @param key
		 */
		this.remove = function( key ) {
			
			for( var i = 0 , length = this.keys.length; i < length; i++ ) {

				key == this.keys[ i ] && this.keys.splice( i , 1 );
			}
			
			delete this.data[ key ];
		};
		
		/**
		 * 遍历 map,执行处理函数
		 * 
		 * @param fn 回调函数 function( key , value , index ) {...}
		 */
		this.each = function( fn ) {
			
			if( typeof fn != "function" ) {
				return;
			}
			
			var length = this.keys.length;
			for( var index = 0; index < length; index++ ) {
				
				var key     = this.keys[ index ],
					_return = fn( key , this.data[ key ] , index ),
					type    = typeof _return;
				
				// 如果返回值不是布尔型,均默认为 treu
				if( type != "boolean" ) {
					
					_return = true;
				}
				
				// 如果返回 false,直接跳出循环
				if( !_return ) {
					
					break;
				}
				
			}
		};
		
		//noinspection JSUnusedGlobalSymbols
        /**
		 * 获取键值数组(类似Java的entrySet())
		 * 
		 * @return Array{key,value}的数组
		 */
		this.entrySet = function() {
			
			var length = this.keys.length , entrys = [];
			
			for( var index = 0; index < length; index++ ) {
				
				var key = this.keys[ index ];
				entrys.push( {
					 "key"  : key
					,"value": this.data[ key ]
				} );
			}
			
			return entrys;
		};
		
		//noinspection JSUnusedGlobalSymbols
        /**
         * 判断 map 是否为空
         *
         * @returns {boolean}
         */
		this.isEmpty = function() {
			
			return this.keys.length == 0;
		};

        /**
         * 获取键值对数量
         *
         * @returns {Array.length|*}
         */
		this.size = function() {
			
			return this.keys.length;
		};

        /**
         *
         * @returns {string}
         */
		this.toString = function() {
			
			var str = [];
			
			str.push( "{" );
			
			for( var index = 0 , length = this.keys.length; index < length; index++ ) {
				
				var key = this.keys[ index ];
				
				str.push( key );
				str.push( ":" );
				str.push( this.data[ key ] );
				
				str.push( "," );
			}
			
			// 移除最后一个多余的逗号
			str.pop();
			str.push( "}" );
			
			return str.join( "" );
		};
		
		/**
		 * 清除 map 中的所有元素
		 */
		this.clear = function() {
			
			this.keys = [];
			this.data = {};
		};

        //noinspection JSUnusedGlobalSymbols
        /**
         * 判断 map 中是否包含有指定 key 的元素
         *
         * @param key
         * @returns {boolean}
         */
		this.containsKey = function( key ) {
			
			var value = this.data[ key ];
			
			return value == null;
		};

        //noinspection JSUnusedGlobalSymbols
        /**
         * 判断 map 中是否包含有指定 value 的元素
         *
         * @param value
         * @returns {boolean}
         */
		this.containsValue = function( value ) {
			
			var contains = false;
			
			this.each( function( key , v ) {
				
				if( v == value ) {
					contains = true;
					return false;
				}
			} );

			return contains;
		};

        //noinspection JSUnusedGlobalSymbols
        /**
         * 获取 map 中所有 value 数组
         *
         * @returns {Array}
         */
		this.valueList = function() {
			
			var values = [];
			
			this.each( function( key , value ) {
				
				values.push( value );
			} );
			
			return values;
		};

        //noinspection JSUnusedGlobalSymbols
        /**
         * 获取 map 中所有 key 数组
         *
         * @returns {Array}
         */
		this.keyList = function() {
			
			return this.keys;
		}
	}
} );
