#!/bin/sh
echo "Want to stop node bin/"
case "`uname`" in 
	Darwin*)
           kill -9 `ps -e|grep "node"|grep "jerms"|awk '{print $1}'`
	   ;;
	Linux*)
           kill -9 `ps -def|grep "node"|grep "jerms"|awk '{print $2}'`
	   ;;
esac
         
