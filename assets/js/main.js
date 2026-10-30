/*
Theme Name: Malat
Description: Responsive Personal / Portfolio / Resume Template
Author: Erilisdesign
Theme URI: https://preview.erilisdesign.com/html/malat/
Author URI: https://themeforest.net/user/erilisdesign
Version: 1.3.0
License: https://themeforest.net/licenses/standard
*/

/*------------------------------------------------------
[Table of contents]

1. Preloader
2. Navigation
3. Back to top
4. Page Cover
5. Backgrounds
-------------------------------------------------------*/

(function($) {
	"use strict";

	// Vars
	var $body = $('body'),
		$preloader = $('#preloader'),
		preloaderDelay = 0,
		preloaderFadeOutTime = 500,
		$navToggle = $('#navigation-toggle'),
		navSpyScroll = true,
		smoothScrollRun = false;

	function getWindowWidth() {
		return Math.max( $(window).width(), window.innerWidth);
	}

	function getWindowHeight(){
		return Math.max($(window).height(), window.innerHeight );
	}

	// [1. Preloader]
	function malat_preloader() {
		$preloader.delay(preloaderDelay).fadeOut(preloaderFadeOutTime);
	}

	// [2. Navigation]
	function getDuration(position) {
		var currentTop = $(window).scrollTop(),
			rate = 0.5, // 1000px/500ms distance;
			distance = Math.abs(currentTop - position);

		return distance * rate;
	}

	function getSectionsOffsets(){
		var _sectionNodeList = document.querySelectorAll('section'),
			i = 0,
			sections = [],
			homeHeight = document.querySelector('#home') ? document.querySelector('#home').offsetHeight : 0,
			el;

		while ( el = _sectionNodeList[ i++ ] ){
			if( el.hasAttribute('id') ){
				var _id = el.id;

				if( _id === 'home' ){
					sections.push({
						id: _id,
						offsetTop: el.offsetTop
					});
				} else {
					sections.push({
						id: _id,
						offsetTop: el.offsetTop + homeHeight
					});
				}
			}
		}

		return sections;
	}

	function malat_spyscroll(){
		if( navSpyScroll === false ){
			return false;
		}

		var sections = getSectionsOffsets(),
			lastScrollPosition,
			i = 0;

		window.addEventListener( 'scroll', function(){
			if( smoothScrollRun === true ){
				return false;
			}

			var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop,
				scrollPosition_b = document.documentElement.scrollTop || document.body.scrollTop;

			if( scrollPosition > lastScrollPosition ){
				scrollPosition = scrollPosition + getWindowHeight();
			} else if( scrollPosition < lastScrollPosition ){
				scrollPosition = scrollPosition_b;
			}

			for (i in sections){
				if ( scrollPosition >= sections[i].offsetTop ){
					if( $('#navigation a[href="#' + sections[i].id + '"]').length ){
						$('#navigation .active').removeClass('active');
						$('#navigation a[href="#' + sections[i].id + '"]').addClass('active');
					}
				}
			}

			lastScrollPosition = scrollPosition_b;
		});
	}

	function malat_navigation() {

		var class_open = 'site-header-open';

		$body.on( 'click', '#navigation-toggle', function(e) {
			e.preventDefault();
			if( !$(this).hasClass('open') ){
				$(this).addClass('open');
				$body.addClass(class_open);
			} else {
				$(this).removeClass('open');
				$body.removeClass(class_open);
			}
		});

		$body.on( 'click', '.header-overlay', function() {
			if ( $body.hasClass(class_open) && $navToggle.hasClass('open') ){
				$navToggle.trigger('click');
			}
		});

		$(document).keyup(function(e) {
			if ( e.keyCode == 27 && $body.hasClass(class_open) ) {
				$navToggle.trigger('click');
			}
		});

		// Back to top
		if ( $('#backtotop').length > 0 ) {
			$('body').on('click', '#backtotop', function(e) {
				e.preventDefault();

				var duration = getDuration(0);

				$('html, body').animate({
					scrollTop: 0
				}, duration, 'easeOutQuad' );

				return false;
			});
		}

		// Smooth Scroll
		$('body').on( 'click', 'a.scrollto', function(e) {
			if (this.hash !== '') {
				if( $( this.hash ).length > 0 ) {
					e.preventDefault();

					smoothScrollRun = true;

					var hash = this.hash,
						position = $(hash).offset().top,
						duration = getDuration(position);

					if ( $('.page-cover ' + hash).length ){
						position = $(hash).offset().top - $(window).scrollTop();
						duration = getDuration( position );
					}

					if( $('#navigation a[href="' + hash + '"]').length ){
						$('#navigation .active').removeClass('active');
						$('#navigation a[href="' + hash + '"]').addClass('active');
					}

					$('html, body').stop().animate({
						scrollTop: position
					}, duration, 'easeOutQuad', function() {
						window.location.hash = hash;
						smoothScrollRun = false;
					});

					if ( $navToggle.hasClass('open') ){
						$navToggle.trigger('click');
					}
				}
			}
		});

	}

	function malat_responsiveNavigation() {
		var class_open = 'site-header-open';

		if( getWindowWidth() >= 1200 ){
			$navToggle.removeClass('open');
			$body.removeClass(class_open);
		}
	}

	// [3. Back to top]
	function malat_backToTop() {
		var $backtotop = $('#backtotop'),
			scrollPosition = $(window).scrollTop();

		if( getWindowWidth() >= 576 ){
			if ( scrollPosition > 200 ) {
				$backtotop.addClass('show');
			} else {
				$backtotop.removeClass('show');
			}
		} else {
			$backtotop.removeClass('show');
		}
	}

	// [4. Page cover]
	function malat_pageCover() {
		var pageCover = $('#page-cover');

		if( pageCover.length > 0 ){
			var pageCover_height = Math.max( $('#page-cover .page-cover-wrap').height(), $('#page-cover .page-cover-wrap').innerHeight() ),
				pageCover_content = $('#page-cover section .container');

			pageCover.css( 'height', pageCover_height );

			$(window).on( 'scroll', function(){
				var scrollPos = $(window).scrollTop();

				if ( pageCover_height > scrollPos ) {
					var opacity_value = (100 - (100 * scrollPos / pageCover_height )) / 100;

					pageCover_content.css( 'opacity', opacity_value );
				}
			});
		}
	}

	// [5. Backgrounds]
	function malat_backgrounds() {
		var $bgImage = $('.bg-image-holder');
		if( $bgImage.length ) {
			$bgImage.each(function(){
				var src = $(this).children('img').attr('src');
				var $self = $(this);

				$self.css('background-image','url('+src+')').children('img').hide();
			});
		}
	}

	// window load function
	$(window).on('load', function() {
		malat_preloader();
		malat_spyscroll();
	});

	// document.ready function
	$(document).ready(function() {
		malat_navigation();
		malat_spyscroll();
		malat_pageCover();
		malat_backgrounds();
	});

	// window.resize function
	$(window).on('resize', function() {
		malat_responsiveNavigation();
		malat_spyscroll();
		malat_backToTop();
		malat_pageCover();
	});

	// window.scroll function
	$(window).on('scroll', function(){
		malat_backToTop();
	});

})(jQuery);
