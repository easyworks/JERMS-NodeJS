/**
 * @file    functions.js
 * @author  lengchao
 * @version 1.0
 * @date    2016-11-24
 */

"use strict";

$( document ).ready( function() {

    var _body = $( "body" );

    /* --------------------------------------------------------
	Template Settings
    -----------------------------------------------------------*/
    ( function() {

        var changeSkin = $( "#changeSkin" );
        _body.on( "click" , ".template-skins > a" , function( event ) {

            event.preventDefault();
            var skin = $( this ).attr( "data-skin" );
            _body.attr( "id" , skin );
            changeSkin.modal( "hide" );
        } );
    } )();

    /* --------------------------------------------------------
	Components
    -----------------------------------------------------------*/
    ( function() {
        /* Textarea */
        var autoSize = $( ".auto-size" );
        !!autoSize.length && autoSize.autosize();

        //Select
        //noinspection JSJQueryEfficiency
        var select = $( ".select" );
        !!select.length && select.selectpicker();

        //Sortable
        //noinspection JSJQueryEfficiency
        var sortable = $( ".sortable" );
        !!sortable.length && sortable.sortable();

        //Tag Select
        //noinspection JSJQueryEfficiency
        var tagSelect = $( ".tag-select" );
        !!tagSelect.length && tagSelect.chosen();

        /* Tab */
        var tab = $( ".tab" );
        !!tab.length && tab.find( "a" ).click( function( event ) {

            event.preventDefault();
            $( this ).tab( "show" );
        } );

        /* Collapse */
        //noinspection JSJQueryEfficiency
        var collapse = $( ".collapse" );
        !!collapse.length && collapse.collapse();

        /* Accordion */
        var panelCollapse = $( ".panel-collapse" );
        var titleLink = ".panel-title a";
        panelCollapse.on( "shown.bs.collapse" , function() {
            $( this ).prev().find( titleLink ).removeClass( "active" );
        } );
        panelCollapse.on( "hidden.bs.collapse" , function() {
            $( this ).prev().find( titleLink ).addClass( "active" );
        } );

        //Popover
        var pover = $( ".pover" );
        !!pover.length && pover.popover();
    } )();

    /* --------------------------------------------------------
	Sidebar + Menu
    -----------------------------------------------------------*/
    ( function() {

        /* Menu Toggle */
        _body.on( "click touchstart" , "#menu-toggle" , function( event ) {

            event.preventDefault();
            $( "html" ).toggleClass( "menu-active" );
            $( "#sidebar" ).toggleClass( "toggled" );
            //$("#content").toggleClass("m-0");
        } );

        /* Active Menu */
        //noinspection JSJQueryEfficiency
        $( "#sidebar .menu-item" ).hover( function() {
            $( this ).closest( ".dropdown" ).addClass( "hovered" );
        } , function() {
            $( this ).closest( ".dropdown" ).removeClass( "hovered" );
        } );

        /* Prevent */
        $( ".side-menu .dropdown > a" ).click( function( event ) {

            event.preventDefault();
        } );

    } )();

    /* --------------------------------------------------------
	Chart Info
    -----------------------------------------------------------*/
    ( function() {

        _body.on( "click touchstart" , ".tile .tile-info-toggle" , function( event ) {

            event.preventDefault();
            $( this ).closest( ".tile" ).find( ".chart-info" ).toggle();
        } );
    } )();

    /* --------------------------------------------------------
	Todo List
    -----------------------------------------------------------*/
    ( function(){

        setTimeout( function() {

            var todoList = $( ".todo-list .media" );
            var checked = todoList.find( ".checked" );
            var fields = todoList.find( "input" );

            //Add line-through for alreadt checked items
            checked.each( function() {
                $( this ).closest( ".media" ).find( ".checkbox label" ).css( "text-decoration" , "line-through" )
            } );

            //Add line-through when checking
            fields.on( "ifChecked" , function() {
                $( this ).closest( ".media" ).find( ".checkbox label" ).css( "text-decoration" , "line-through" );
            } );

            fields.on( "ifUnchecked" , function() {
                $( this ).closest( ".media" ).find( ".checkbox label" ).removeAttr( "style" );
            } );
        } );
    } )();

    /* --------------------------------------------------------
	Custom Scrollbar
    -----------------------------------------------------------*/
    ( function() {

        var overflow = $( ".overflow" );
        if( !!overflow.length ) {
            //noinspection JSUnusedLocalSymbols
            var  overflowInvisible = false
                ,overflowRegular   = overflow.niceScroll()
            ;
        }
    } )();

    /* --------------------------------------------------------
	Messages + Notifications
    -----------------------------------------------------------*/
    ( function() {

        _body.on( "click touchstart" , ".drawer-toggle" , function( event ) {

            event.preventDefault();
            var drawer = $( this ).attr( "data-drawer" );

            $( '.drawer:not("#' + drawer + '")' ).removeClass( "toggled" );

            drawer = $( "#" + drawer );
            drawer.hasClass( "toggled" )
                ? drawer.removeClass( "toggled" )
                : drawer.addClass( "toggled" )
            ;
        } );

        //Close when click outside
        $( document ).on( "mouseup touchstart" , function( event ) {

            var container = $( ".drawer, .tm-icon" );
            if( container.has( event.target ).length === 0 ) {

                $( ".drawer" ).removeClass( "toggled" );
                $( ".drawer-toggle" ).removeClass( "open" );
            }
        } );

        //Close
        _body.on( "click touchstart" , ".drawer-close" , function() {

            $( this ).closest( ".drawer" ).removeClass( "toggled" );
            $( ".drawer-toggle" ).removeClass( "open" );
        } );
    } )();


    /* --------------------------------------------------------
	Calendar
    -----------------------------------------------------------*/
    ( function() {

        //Sidebar
        var sidebarCalendar = $( "#sidebar-calendar" );
        if( !!sidebarCalendar.length ) {
            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
            sidebarCalendar.fullCalendar( {
                editable: false ,
                events: [] ,
                header: {
                    left: "title"
                }
            } );
        }

        //Content widget
        var calendarWidget = $( "#calendar-widget" );
        !!calendarWidget.length
            && calendarWidget.fullCalendar( {
                header: {
                    left: "title" ,
                    right: "prev, next"
                    //right: "month,basicWeek,basicDay"
                } ,
                editable: true ,
                events: [
                    {
                        title: "All Day Event" ,
                        start: new Date( y , m , 1 )
                    } ,
                    {
                        title: "Long Event" ,
                        start: new Date( y , m , d - 5 ) ,
                        end: new Date( y , m , d - 2 )
                    } ,
                    {
                        title: "Repeat Event" ,
                        start: new Date( y , m , 3 ) ,
                        allDay: false
                    } ,
                    {
                        title: "Repeat Event" ,
                        start: new Date( y , m , 4 ) ,
                        allDay: false
                    }
                ]
            } )
        ;

    } )();

    /* --------------------------------------------------------
	RSS Feed widget
    -----------------------------------------------------------*/
    /*(function(){
	if($("#news-feed")[0]){
	    $("#news-feed").FeedEk({
		FeedUrl: "http://rss.cnn.com/rss/edition.rss",
		MaxCount: 5,
		ShowDesc: false,
		ShowPubDate: true,
		DescCharacterLimit: 0
	    });
	}
    })();*/

    /* --------------------------------------------------------
	Chat
    -----------------------------------------------------------*/
    $( function() {
        _body.on( "click touchstart" , ".chat-list-toggle" , function() {
            $( this ).closest( ".chat" ).find( ".chat-list" ).toggleClass( "toggled" );
        } );

        _body.on( "click touchstart" , ".chat .chat-header .btn" , function( e ) {
            e.preventDefault();
            $( ".chat .chat-list" ).removeClass( "toggled" );
            $( this ).closest( ".chat" ).toggleClass( "toggled" );
        } );

        $( document ).on( "mouseup touchstart" , function( e ) {
            var container = $( ".chat, .chat .chat-list" );
            if( container.has( e.target ).length === 0 ) {
                container.removeClass( "toggled" );
            }
        } );
    } );

    /* --------------------------------------------------------
	Form Validation
    -----------------------------------------------------------*/
    ( function() {
        var formValidation = $( "[class*='form-validation']" );
        if( !!formValidation.length ) {
            formValidation.validationEngine();

            //Clear Prompt
            _body.on( "click" , ".validation-clear" , function( e ) {
                e.preventDefault();
                $( this ).closest( "form" ).validationEngine( "hide" );
            } );
        }
    } )();

    /* --------------------------------------------------------
     `Color Picker
    -----------------------------------------------------------*/
    ( function() {
        //Default - hex
        var colorPicker = $( ".color-picker" );
        !!colorPicker.length && colorPicker.colorpicker();

        //RGB
        var colorPickerRgb = $( ".color-picker-rgb" );
        !!colorPickerRgb.length && colorPickerRgb.colorpicker( {
            format: "rgb"
        } );

        //RGBA
        var colorPickerRgba = $( ".color-picker-rgba" );
        !!colorPickerRgba.length && colorPickerRgba.colorpicker( {
            format: "rgba"
        } );

        //Output Color
        var colorPickers = $( '[class*="color-picker"]' );
        !!colorPickers.length
            && colorPickers
                .colorpicker()
                .on( "changeColor" , function( event ) {
                    //var colorThis = $( this ).val();
                    $( this ).closest( ".color-pick" ).find( ".color-preview" ).css( "background" , event.color.toHex() );
                } )
        ;
    } )();

    /* --------------------------------------------------------
     Date Time Picker
     -----------------------------------------------------------*/
    ( function() {
        //Date Only
        var dateOnly = $( ".date-only" );
        !!dateOnly.length && dateOnly.datetimepicker( {
            pickTime: false
        } );

        //Time only
        var timeOnly = $( ".time-only" );
        !!timeOnly.length && timeOnly.datetimepicker( {
            pickDate: false
        } );

        //12 Hour Time
        var timeOnly12 = $( ".time-only-12" );
        !!timeOnly12.length && timeOnly12.datetimepicker( {
            pickDate: false ,
            pick12HourFormat: true
        } );

        $( ".datetime-pick input:text" ).on( "click" , function() {
            $( this ).closest( ".datetime-pick" ).find( ".add-on i" ).click();
        } );
    } )();

    /* --------------------------------------------------------
     Input Slider
     -----------------------------------------------------------*/
    ( function() {

        var inputSlider = $( ".input-slider" );
        !!inputSlider.length && inputSlider.slider().on( "slide" , function( ev ) {
            $( this ).closest( ".slider-container" ).find( ".slider-value" ).val( ev.value );
        } );
    } )();

    /* --------------------------------------------------------
     WYSIWYE Editor + Markedown
     -----------------------------------------------------------*/
    ( function() {

        //Markedown
        var markdownEditor = $( ".markdown-editor" );
        !!markdownEditor.length && markdownEditor.markdown( {
             "autofocus": false
            ,"savable"  : false
        } );

        //WYSIWYE Editor
        var wysiwyeEditor = $( ".wysiwye-editor" );
        !!wysiwyeEditor.length && wysiwyeEditor.summernote( {
            "height": 200
        } );

    } )();

    /* --------------------------------------------------------
     Media Player
     -----------------------------------------------------------*/
    ( function() {

        var media = $( "audio, video" );
        !!media.length && media.mediaelementplayer( {
            success: function( player , node ) {
                $( "#" + node.id + "-mode" ).html( "mode: " + player.pluginType );
            }
        } );
    } )();

    /* ---------------------------
	Image Popup [Pirobox]
    --------------------------- */
    ( function() {

        var piroboxGall = $( ".pirobox_gall" );
        if( !!piroboxGall.length ) {

            //Fix IE
            jQuery.browser = {};
            ( function() {
                jQuery.browser.msie = false;
                jQuery.browser.version = 0;
                if( navigator.userAgent.match( /MSIE ([0-9]+)\./ ) ) {
                    jQuery.browser.msie = true;
                    jQuery.browser.version = RegExp.$1;
                }
            } )();

            //Lightbox
            $().piroBox_ext( {
                piro_speed: 700 ,
                bg_alpha: 0.5 ,
                piro_scroll: true // pirobox always positioned at the center of the page
            } );
        }
    } )();

    /* ---------------------------
     Vertical tab
     --------------------------- */
    ( function() {
        $( ".tab-vertical" ).each( function() {
            var tabHeight = $( this ).outerHeight();
            var tabContentHeight = $( this ).closest( ".tab-container" ).find( ".tab-content" ).outerHeight();

            if( (tabContentHeight) > (tabHeight) ) {
                $( this ).height( tabContentHeight );
            }
        } );

        _body.on( "click touchstart" , ".tab-vertical li" , function() {
            var tabVertical = $( this ).closest( ".tab-vertical" );
            tabVertical.height( "auto" );

            var tabHeight = tabVertical.outerHeight();
            var tabContentHeight = $( this ).closest( ".tab-container" ).find( ".tab-content" ).outerHeight();

            if( (tabContentHeight) > (tabHeight) ) {
                tabVertical.height( tabContentHeight );
            }
        } );

    } )();

    /* --------------------------------------------------------
     Login + Sign up
    -----------------------------------------------------------*/
    ( function() {

        _body.on( "click touchstart" , ".box-switcher" , function( event ) {

            event.preventDefault();
            var box = $( this ).attr( "data-switch" );
            //console.log( box );
            $( this ).closest( ".box" ).toggleClass( "active" );
            $( "#" + box ).closest( ".box" ).addClass( "active" );
        } );
    } )();



    /* --------------------------------------------------------
     Checkbox + Radio
     -----------------------------------------------------------*/

    if( !!$( "input:checkbox, input:radio" ).length ) {

        //Checkbox + Radio skin
        $( 'input:checkbox:not([data-toggle="buttons"] input, .make-switch input), input:radio:not([data-toggle="buttons"] input)' ).iCheck( {
            checkboxClass: "icheckbox_minimal" ,
            radioClass: "iradio_minimal" ,
            increaseArea: "20%" // optional
        } );

        //Checkbox listing
        var parentCheck = $( ".list-parent-check" );
        var listCheck = $( ".list-check" );

        parentCheck.on( "ifChecked" , function() {
            $( this ).closest( ".list-container" ).find( ".list-check" ).iCheck( "check" );
        } );

        parentCheck.on( "ifClicked" , function() {
            $( this ).closest( ".list-container" ).find( ".list-check" ).iCheck( "uncheck" );
        } );

        listCheck.on( "ifChecked" , function() {
            var parent = $( this ).closest( ".list-container" ).find( ".list-parent-check" );
            var thisCheck = $( this ).closest( ".list-container" ).find( ".list-check" );
            var thisChecked = $( this ).closest( ".list-container" ).find( ".list-check:checked" );

            if( thisCheck.length == thisChecked.length ) {
                parent.iCheck( "check" );
            }
        } );

        listCheck.on( "ifUnchecked" , function() {
            var parent = $( this ).closest( ".list-container" ).find( ".list-parent-check" );
            parent.iCheck( "uncheck" );
        } );

        listCheck.on( "ifChanged" , function() {
            var thisChecked = $( this ).closest( ".list-container" ).find( ".list-check:checked" );
            var showon = $( this ).closest( ".list-container" ).find( ".show-on" );
            if( thisChecked.length > 0 ) {
                showon.show();
            }
            else {
                showon.hide();
            }
        } );
    }

    /* --------------------------------------------------------
        MAC Hack
    -----------------------------------------------------------*/
    ( function() {
        //Mac only
        navigator.userAgent.indexOf( "Mac" ) > 0 && _body.addClass( "mac-os" );
    } )();

    /* --------------------------------------------------------
	Photo Gallery
    -----------------------------------------------------------*/
    ( function() {

        var photoGallery = $( ".photo-gallery" );
        !!photoGallery.length && photoGallery.SuperBox();
    } )();

});

$( window ).load( function() {
    /* --------------------------------------------------------
     Tooltips
     -----------------------------------------------------------*/
    ( function() {

        var tooltips = $( ".tooltips" );
        !!tooltips.length && tooltips.tooltip();
    } )();

    /* --------------------------------------------------------
     Animate numbers
     -----------------------------------------------------------*/
    $( ".quick-stats" ).each( function() {
        var target = $( this ).find( "h2" );
        var toAnimate = $( this ).find( "h2" ).attr( "data-value" );
        // Animate the element"s value from x to y:
        $( { someValue: 0 } ).animate( { someValue: toAnimate } , {
            duration: 1000 ,
            easing: "swing" , // can be anything
            step: function() { // called on every step
                // Update the element"s text with rounded-up value:
                target.text( commaSeparateNumber( Math.round( this.someValue ) ) );
            }
        } );

        function commaSeparateNumber( val ) {
            while( /(\d+)(\d{3})/.test( val.toString() ) ) {
                val = val.toString().replace( /(\d)(?=(\d\d\d)+(?!\d))/g , "$1," );
            }
            return val;
        }
    } );

} );

/* --------------------------------------------------------
Date Time Widget
-----------------------------------------------------------*/
(function() {
    var monthNames = [ "January" , "February" , "March" , "April" , "May" , "June" , "July" , "August" , "September" , "October" , "November" , "December" ];
    var dayNames = [ "Sunday" , "Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday" ];

    // Create a newDate() object
    var newDate = new Date();

    // Extract the current date from Date object
    newDate.setDate( newDate.getDate() );

    // Output the day, date, month and year
    $( "#date" ).html( dayNames[ newDate.getDay() ] + " " + newDate.getDate() + " " + monthNames[ newDate.getMonth() ] + " " + newDate.getFullYear() );

    setInterval( function() {

        // Create a newDate() object and extract the seconds of the current time on the visitor's
        var seconds = new Date().getSeconds();

        // Add a leading zero to seconds value
        $( "#sec" ).html( ( seconds < 10 ? "0" : "" ) + seconds );
    } , 1000 );

    setInterval( function() {

        // Create a newDate() object and extract the minutes of the current time on the visitor's
        var minutes = new Date().getMinutes();

        // Add a leading zero to the minutes value
        $( "#min" ).html( ( minutes < 10 ? "0" : "" ) + minutes );
    } , 1000 );

    setInterval( function() {

        // Create a newDate() object and extract the hours of the current time on the visitor's
        var hours = new Date().getHours();

        // Add a leading zero to the hours value
        $( "#hours" ).html( ( hours < 10 ? "0" : "" ) + hours );
    } , 1000 );
})();


