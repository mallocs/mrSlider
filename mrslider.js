/*!
 * mallocs slider v0.0
 *
 * Copyright 2014 Marcus Ulrich 
 * Released under the MIT license.
 *
 */

;(function( $ ) {

$.widget("mmi.slideshow", {
    version: "0.0",
    options: {
        zIndex: false,

        carousel: '.carousel',   // Selector for carousel element.
        slides: '.slide',             // Selector for carousel slides.

        startSlide: 0,
        navigation: true,
        previousText: '‹',    // Use text for slider controls.
        nextText: '›',           //

        // callbacks
        start: null,
        stop: null
    },
    _create: function() { 
        this.carousel = this.element.children(this.options.carousel);
        this.slides = this.carousel.children(this.options.slides);
        this.wrapper = this.carousel.wrap('<div style="position:relative;"></div>').parent();
        this.currentSlide = $(this.slides[ parseInt(this.options.startSlide, 10) ]);
        this.carouselWidth = this.currentSlide.find("img").width();

        this.wrapper.css({
            'width': this.carouselWidth + 'px'
        });
        this._createNavigation();
        this._createCaption();
        this.setCaption(this.currentSlide.find("img").data("caption"));
        this.count = this.slides.length;
        this.scrollable = true;
    },

    _createNavigation: function() {
        this.previous = $('<a href="#" class="slideshow-previous slideshow-navigation" data-slides="previous">' + this.options.previousText + '</a>');
        this.next = $('<a href="#" class="slideshow-next slideshow-navigation" data-slides="next">' + this.options.nextText + '</a>');
        this.wrapper.append(this.next, this.previous);
    },

    _showHideSelector: function(selector, show) {
        var visibility = show && show !== "hide" ? "visible" : "hidden";
        $(this.element).find(selector).css({
            "visibility": visibility
        });    
    },

    showNavigation: function() {
        this._showHideSelector(".slideshow-navigation", "show");
    },

    hideNavigation: function() {
        this._showHideSelector(".slideshow-navigation", "hide");
    },

    _createCaption: function() {
        this.caption = $('<div class="slideshow-caption"></a>');
        this.wrapper.append(this.caption);
    },

    setCaption: function(text) {
        if (typeof this.caption !== "undefined"  && typeof(text) !== "undefined" ) {
            this.caption.html('<p>' + text + '</p>');
        }
    },

    showCaption: function() {
        this._showHideSelector(".slideshow-caption", "show");
    },

    hideCaption: function() {
        this._showHideSelector(".slideshow-caption", "hide");
    },

    _setOption: function( key, value ) {
        this._super( key, value );

        if(key === "controls") {
            value ? this.showNavigation() : this.hideNavigation();
        }
        if(key === "captions") {
            value ? this.showCaption() : this.hideCaption();
        }

    },

    _destroy: function() {
    }

/**
Functions needed

_createPaging
_createPagingFromSprite

_setFirstSlide
_setPreLoadCount
_setPauseOnHover
_setShowNav
_setHideNav
_setShowCaption
_setHideCaption
_setShuffle
_setLoop
_setPlay
_setTransition
_setTransitionSpeed

_checkImgHasLoaded
_loadImg
_goToSlide
_showNav
_hideNav
_makePicUrl
_getPicUrl

addSlide
addSlides
play
stop
next

**/



});

}( jQuery ));