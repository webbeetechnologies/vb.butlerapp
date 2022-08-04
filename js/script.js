jQuery(document).ready(function($) {

/*===============================================================================
 *  RESIZE HANDLERS
 * =============================================================================*/
var butlerMediaQueries = (function() {
	var screenSizes = {
		mobile: window.matchMedia('(max-width:467.98px)'),
		largeMobile: window.matchMedia('(min-width:468px) and (max-width:767.98px'),
		tab: window.matchMedia('(min-width:768px) and (max-width:1023.98px)'),
		largeTab: window.matchMedia('(min-width:1024px) and (max-width:1199.98px)'),
		desktop: window.matchMedia('(min-width:1200px)')
	}
	return {
		register: function(screenSize, callback) {

			if (!screenSizes[screenSize]) {
				throw new Error("No handler for screenSize \"" + screenSize + "\". Try " + Object.keys(screenSizes).join(" or "));
			}
			var mediaQuery = screenSizes[screenSize];
			const handleOnChange = function(e) {
				callback(e.currentTarget);
			}

			try {
				mediaQuery.addEventListener(handleOnChange);
			} catch {
				mediaQuery.addListener(handleOnChange);
			}

			if(mediaQuery.matches) callback(mediaQuery)
		}
	}
})();

butlerMediaQueries.register('mobile', function(e) {
	if(e.matches) {
		centerImage();
		restructureSlider();
	}
});

butlerMediaQueries.register('largeMobile', function(e) {
	if(e.matches) {
		restructureSlider();
	}
});

butlerMediaQueries.register('desktop', function(e) {
	if(e.matches) {
		serviceBgChanger();
	}
});

/*===============================================================================
 *  GENERIC
 * =============================================================================*/

	// REMOVES LAZY LOADING
	$('#butlerapp-team-container .elementor-widget-hotspot .elementor-widget-container > img').removeAttr('loading');

/*===============================================================================
 * FUTURE SLIDER -- Section 3
 * ============================================================================*/

	// MAKES THE FIRST SLIDE ACTIVE ON LOAD
	$('#ba--sliders .slides > li').eq(0).addClass('active');
	
	// ALL SLIDES
	var slides = $('#ba--sliders .slides > li');
	
	// REMOVES ELEMENTOR'S ACTIVE STATE
	slides.removeClass('flex-active-slide');
	$('#ba-slider-controls li').on('click', function() {
		$('#ba-slider-controls li').removeClass('active');
		$(this).addClass('active');
		var activePoint = $('#ba-slider-controls li.active').index();
		slides.removeClass('active');
		slides.eq(activePoint).addClass('active');
	});
	
	// SLIDER CONTROLS
	function slideToIndex(nextIndex) {
		$('#ba-slider-controls li').removeClass("active");
		$('#ba-slider-controls li').eq(nextIndex).addClass('active');
		slides.removeClass('active');
		slides.eq(nextIndex).addClass('active');
	}
	function handlenextclick() {
		var activeLiner = $('#ba-slider-controls li.active');
		var nextIndex = activeLiner.index() + 1;
		if (!$('#ba-slider-controls li').eq(nextIndex).length) {nextIndex = 0;}
		slideToIndex.call(this, nextIndex);
	}
	function prevClick() {
		var activeLiner = $('#ba-slider-controls li.active');
		var prevIndex = activeLiner.index() -1;
		slideToIndex.call(this, prevIndex);
	}

	// INITIATES CONTROL FUNCTIONS ON CLICK
	$('.bsa-right').on('click', handlenextclick);
	$('.bsa-left').on('click', prevClick);

	// RESTRUCTURES MOBILE IMAGE CONTAINER
	function restructureSlider(){
		$('#ba--sliders .slides li').each(function() {
			var eachImage = $(this).find('.mobile-slider-img');
			var prependArea = eachImage.closest('section').prev().find('.elementor-widget-wrap').eq(0);
			eachImage.prependTo(prependArea);
		});
	}

/*===============================================================================
 *  VIDEO SWITCHER - Section 4 
 * =============================================================================*/

	// MAKES THE FIRST VIDEO ACTIVE ON LOAD
	$('#butler_guides [data-order-no]:first-of-type').addClass('active');
	$('.bm-container .bm-filter').eq(0).addClass('active');

	// ON CLICK STATE
	$('#butler_guides [data-order-no]').on('click', function(e) {
		e.preventDefault();
		var orderNo = $(this).data('order-no');
		$('.b-filters > div').removeClass('active');
		$(this).addClass('active');
		$(this).parent().next().find('.guide').removeClass('active');
		$(this).parent().next().children('[data-order-no='+orderNo+']').addClass('active');
	});

	// FOR THE MORPHED ACCORDION ON MOBILE DEVICES
	$('.bm-filter .bm-head').on('click', function(e) {
		e.preventDefault();
		$('.bm-filter').removeClass('active');
		$(this).parent().toggleClass('active');
		$('.bm-filter .bm-guide').slideUp();
		if($(this).parent().find('.bm-guide').css('display') == 'none') {
			$(this).parent().find('.bm-guide').slideDown();
		} else {
			$(this).parent().find('.bm-guide').slideUp();
			$(this).parent().toggleClass('active');
		}
	});

/*===============================================================================
 *  KUNDEN SLIDER - Section 5
 * =============================================================================*/

/*===============================================================================
 *  WINDOW RESIZE FUNCTION
 * =============================================================================*/
(function butlerResize() {
	
	function handleResize() {
		var mQ = $(window).width();
		var ksH = $('#kunden--slider .th-slide-content').height() + 150;
		var headerHeight = $('#masthead').height();
		
		var cI = $('#kunden--slider .th-slide-content > div > div > div > section > div > div > div > div > div > div > div > div.elementor-image');
		var kS = $('#kunden--slider #main-flex-slider');
		$('.hero-sec').css('margin-top',-headerHeight);
		var getBg = $('#butlerapp-contact').css('background-image');

		// LAST HOTSPOT SECTION
		var ptH = $('#casual-team').outerHeight() + 'px';
		$('#pro-team, #casual-team').parent().attr('style','position:relative;height:'+ ptH +'');
		
		// KUNDEN SLIDER
		var slideInnerHeight = $('#kunden--slider .th-slide-inner').outerHeight();
		$('#kunden--slider .slider-bg').css('min-height',slideInnerHeight+'px');

		if(mQ < 767.98) {
			// Contact Form Section
			$('#butlerapp-contact').addClass('nobgimage');
			if($('.ct-girl').length == 0) {
				$('#butlerapp-contact').prepend('<div class="ct-girl"><div class="ct-girl-img"></div></div>');
				$('#butlerapp-contact .ct-girl-img').css('background-image', getBg);
				$('.ct-girl').append('<img class="floating-icon" src="/wp-content/uploads/2022/06/contact-mob-icon.png">');
			}
		} else {
			$('.removio').hide();
			$('.ct-girl, .floating-icon').remove();
		}
		
		if(mQ > 468 && mQ < 767.98) {
			cI.css('width',mQ+'px');
		} else {
			cI.css('width','');
		}
		
		if(mQ < 1200 && mQ > 1024) {
			kS.attr('style','height:'+ksH+''+'px');
		}
	}
	$(window).resize(handleResize);
	$(window).trigger("resize");
	
})();
	
/*===============================================================================
 *  POPUPS
 * =============================================================================*/

$('.elementor-location-popup > div > section > .elementor-container > .elementor-row > .elementor-column > .elementor-column-wrap > .elementor-widget-wrap').prepend('<img class="popup-icon" src="/wp-content/uploads/2022/06/popup-icon.png">');

/*-- MOBILE MENU --*/
$('.elementor-menu-toggle').on('click', function() {
	$('body').toggleClass('body-stopper');
});
	
	function butlerFadeOut() {
		$('.elementor-popup-modal').fadeOut('slow');
	}
	
	$('.elementor-button-link').on('click', function() {
		var thisLink = $(this).attr('href');
		if((thisLink.indexOf('popup') >= 1)) {
			$('.elementor-popup-modal button > span > span:first-child').remove();
			$('.elementor-popup-modal button > span').prepend('<span class="elementor-button-icon elementor-align-icon-right"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 6C13.5523 6 14 6.44772 14 7C14 7.51284 13.614 7.93551 13.1166 7.99327L13 8H1C0.447715 8 0 7.55228 0 7C0 6.48716 0.38604 6.06449 0.883379 6.00673L1 6H13Z" fill="url(#paint0_linear_0_221)"></path><path d="M6.29289 0.292893C6.65338 -0.0675907 7.22061 -0.0953203 7.6129 0.209705L7.70711 0.292893L13.7071 6.29289C14.0676 6.65338 14.0953 7.22061 13.7903 7.6129L13.7071 7.70711L7.70711 13.7071C7.31658 14.0976 6.68342 14.0976 6.29289 13.7071C5.93241 13.3466 5.90468 12.7794 6.2097 12.3871L6.29289 12.2929L11.585 7L6.29289 1.70711C5.93241 1.34662 5.90468 0.779392 6.2097 0.387101L6.29289 0.292893Z" fill="url(#paint1_linear_0_221)"></path><defs><linearGradient id="paint0_linear_0_221" x1="0" y1="8.01355" x2="14" y2="8.01355" gradientUnits="userSpaceOnUse"><stop stop-color="#ED1E79"></stop><stop offset="0.85" stop-color="#FBB03B"></stop><stop offset="1" stop-color="#FBB03B"></stop></linearGradient><linearGradient id="paint1_linear_0_221" x1="6" y1="14.0948" x2="14" y2="14.0948" gradientUnits="userSpaceOnUse"><stop stop-color="#ED1E79"></stop><stop offset="0.85" stop-color="#FBB03B"></stop><stop offset="1" stop-color="#FBB03B"></stop></linearGradient></defs></svg></span>');
			/*-- PRIVACY LINK --*/
			$('.elementor-popup-modal .elementor-form-fields-wrapper > div:nth-last-child(2) .elementor-field-option label').text('Ich akzeptiere die');
			$('.elementor-popup-modal .elementor-form-fields-wrapper > div:nth-last-child(2) .elementor-field-option label').append('<a class="privacy--link" href="#">Datenschutzbedingungen</a>');
			// SMOOTHEN THE CLOSE
			$('.dialog-close-button').on('click', function() {
				butlerFadeOut();
			});
		}
	});
		
	// BA SLIDER BUTTON
	$('#ba--sliders .slides li .elementor-button-content-wrapper .elementor-button-icon:first-child svg').remove();
    $('#ba--sliders .slides li .elementor-button-content-wrapper .elementor-button-icon:first-child').append('<img class="btn-replaced" src="/wp-content/uploads/2022/06/contact-mob-icon.png">');
	
/*=======================================================================================================
 * HEADER
 * ====================================================================================================*/
	$('#stb-logo-wrapper .elementor-widget-wrap').prepend('<div class="logo-blocker">');
	$(window).scroll(function() {
	var a = 400;
	var b = 200;
	var pos = $(window).scrollTop();
	if(pos > a) {
			$('.logo-blocker').css('opacity','1');
			$('.logo-blocker').addClass('active');
		} else if(pos < b) {
			$('.logo-blocker').removeClass('active');
			$('.logo-blocker').css('opacity','0');
		} else {
			$('.logo-blocker').removeClass('active');
			$('.logo-blocker').css('opacity','0');
		}
	});
	
/*=======================================================================================================
 * SERVICES SECTION
 * ====================================================================================================*/
    function serviceBgChanger() {
		var timeout = null;
		var hasClicked = function() { return $('.e-hotspot--active').length };
		$(window).scroll(function() {
			if(hasClicked()) return;
   		var hT = $('#butlerapp-services').offset().top,
			hH = $('#butlerapp-services').outerHeight(),
			wH = $(window).height(),
			wS = $(this).scrollTop(),
			bsi1 = $('.butlerapp-services-img-container .pro-service'),
			bsi2 = $('.butlerapp-services-img-container .casual-service');
			clearTimeout(timeout);
			if (wS > (hT+hH-wH-300)){
				timeout = setTimeout(function() {
					if(hasClicked()) return;
					bsi1.fadeOut();
					bsi2.css({'left':'0', 'opacity':'1'});
				}, 3000);
			} else {
				timeout = setTimeout(function() {
					if(hasClicked()) return;
					bsi1.fadeIn();
					bsi2.css({'left':'150%','opacity':'0'});
				}, 3000);
			}
		});
	}
	$('.faq').each(function() {
        $(this).on('click', function() {
            if(!$(this).hasClass('faq-active')) {
                $(this).find('.faq-content-area').slideDown();
                $(this).addClass('faq-active');
            } else {
                $(this).find('.faq-content-area').slideUp();
                $(this).removeClass('faq-active');
            }
            var activo = $('.faq-active').length;
            if(activo > 1) {
                $('.faq').not(this).find('.faq-content-area').slideUp();
                $('.faq').not(this).removeClass('faq-active');
            }
        });
    });
	
	// CONTACT SECTION -- CHANGE BG ON INPUT CLICK
	// /wp-content/uploads/2022/06/Layer.png
	
	$('#butlerapp-contact input, .elementor-element-16bc62a').click(function() {
		var changeTimer = 100;
		setTimeout(function() {
			$('#butlerapp-contact, .ct-girl-img').css('background-image','url(/wp-content/uploads/2022/06/contact-2-min.png)');
		}, changeTimer);
	});
	
	
	// TEAMS SECTION -- BACKGROUND CHANGER
	if($(window).width() > 1200 ) {
		var timeover = null;
		var isClicked = function() {return $('.e-hotspot--active').length };
		$(window).scroll(function() {
			if(isClicked()) return;
			var pT = $('#pro-team'),
				cT = $('#casual-team'),
				hT = $('#butlerapp-team-container').offset().top,
				hH = $('#butlerapp-team-container').outerHeight(),
				wH = $(window).height(),
				wS = $(this).scrollTop();
			clearTimeout(timeover);
			if (wS > (hT+hH-wH-(hH/2))) {
				timeover = setTimeout(function() {
						if(isClicked()) return;
						pT.fadeOut();
						cT.fadeIn();
				}, 2500);
				} else {
				timeover = setTimeout(function() {
						if(isClicked()) return;
						cT.fadeOut();
						pT.fadeIn();
				}, 2500);
				}
			});
		}
	
// HOTSPOT MOUSE IN & OUT
	$('.e-hotspot__button').mouseenter(function() {
		$(this).find('div:last-child').css('padding','9px');
		setTimeout(function() {
			$(this).removeClass('ba--inactive');
		}, 500);
	});
	$('.e-hotspot__button').mouseleave(function() {
		$(this).find('div:last-child').css('padding','6px');
	});

// HOTSPOT ONCLICK ACTIONS
	$('.e-hotspot__button').on('click', function()	{
		var getParent = $(this).parent();
		var isActive = getParent.hasClass('e-hotspot--active');
		var noActive = getParent.not('.e-hotspot--active');
		if(!isActive) {
			$('.e-hotspot__button.ba--inactive').removeClass('ba--inactive');
			$('.e-hotspot__button').not(this).addClass('ba--inactive');
		} else if(isActive) {
			$('.e-hotspot__button.ba--inactive').addClass('ba--inactive');
			$('.e-hotspot__button').not(this).removeClass('ba--inactive');
		} else {
			// WEBOZZA
		}
 	});
	
// When clicking outside the card -> card should close
	$('.elementor-element-1f7e3d5 img:not(.team-head img)').mouseup(function() {
		$('.e-hotspot').removeClass('e-hotspot--active');
	});
	$('.elementor-element-07e3890').mouseup(function() {
		$('.e-hotspot').removeClass('e-hotspot--active');
	});

	
// TOOLTIPS -- REMOVE EMPTY P TAGS
	$('.e-hotspot__tooltip .team-body p').each(function() {
        var txto = $(this).text();
        var tL = txto.length;
        if(tL <= 0) {
            $(this).remove();
        }
	});
	
	// TEAM CARDS - CLOSE FUNCTION
	$('.e-hotspot').each(function() {
		$(this).find('.ba-close-icon').click(function() {
			$(this).parent().parent().parent().removeClass('e-hotspot--active');
		});
	});
	
	// Mobile Menu Active Link
	$('#masthead nav.elementor-nav-menu--dropdown.elementor-nav-menu__container ul li:not(li:last-child)').click(function() {
		$('#masthead nav.elementor-nav-menu--dropdown.elementor-nav-menu__container ul li:not(li:last-child)').removeClass('active');
		$(this).addClass('active');
	});
	
	// Append Mobile Footer
	$('#masthead nav.elementor-nav-menu--dropdown.elementor-nav-menu__container').append("<div class='mobiler-footer'><a href='tel:493031199425'><span class='caller-icon-container'><img class='caller-icon' src='/wp-content/uploads/2022/07/caller-icon-no-bg.png'></span><span>Kostenlose Beratung</span><span>+49 30 311 994 25</span></a><div class='mobile-copyright'><p>Buchungsbutler © 2022 Webbee GmbH</p><div class='footer-links'><a href='#'>Datenschutz</a><a>Impressum</a></div></div>");
	
	// Mobile Hero
	var heroimg1 = $('#mobile-hero-logos .elementor-column:nth-child(1) img').attr('src');
	var heroimg2 = $('#mobile-hero-logos .elementor-column:nth-child(2) img').attr('src');
	var heroimg3 = $('#mobile-hero-logos .elementor-column:nth-child(3) img').attr('src');
	var heroimg4 = $('#mobile-hero-logos .elementor-column:nth-child(4) img').attr('src');
	
	if($(window).width() < 468) {
		$('#mobile-hero-logos .elementor-container .elementor-row').remove();
		$('#mobile-hero-logos .elementor-container').append('<img src='+heroimg1+'><img src='+heroimg2+'><img src='+heroimg3+'><img src='+heroimg4+'>');
		$('.elementor-element-2024070').prependTo('.elementor-element-102e249f');
		$('.elementor-element-3278dce8').prependTo('.elementor-element-46a4917c');
	// Stopping the scrolling marquee on mobile
		$('#ba-marq marquee').contents().unwrap();
		$('#ba-marq .marq-container .marq-content:not(.marq-content:first-child)').remove();
	// Kompetenter Services
		$('.elementor-element-b449815').appendTo('.elementor-element-c90273a');
	// BA Points Section
		$('.ba-points').each(function() {
			$(this).find('h3, p').wrapAll('<div class="mobile-wrapper"></div>');
		});
	// FAQs Close Button --  Buggy (gotta fix this later...)
		$('.faq-close-btn').click(function() {
			if($('#faqs-container .faq').hasClass('faq-active')) {
				$(this).parent().removeClass('faq-active');
				$(this).parent().find('.faq-content-area').slideUp();
				$(this).parent().find('.faq-overlay').css('opacity','0');
			}
		});
	// 	Restructure faq-meta
		$('#faqs-container .faq-meta').each(function() {
			$(this).find('h5, span, a').wrapAll('<div>');
		});
	}

/*===============================================================================
 *  LAST HOTSPOT SECTION
 * =============================================================================*/
	
	
	$('.elementor-element-1f7e3d5 img:not(.team-head img)').mouseup(function() {
		$('.e-hotspot').removeClass('e-hotspot--active');
	});
	$('.elementor-element-07e3890').mouseup(function() {
		$('.e-hotspot').removeClass('e-hotspot--active');
	});

	// NESTING THE HOTSPOTS
	$('#pro-team .e-hotspot').wrapAll('<div class="hotspot-container">');

	function centerImage() {
		var centerPoint = $('#butlerapp-team-container .elementor-widget-hotspot img').width();
		$('#butlerapp-team-container').scrollLeft(centerPoint/2.9);
	}


}); // THE ENDING...












