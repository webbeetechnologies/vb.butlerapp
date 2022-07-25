/* Javascript */
jQuery(document).ready(function($) {

var headerHeight = $('#masthead').height();
$('.hero-sec').css('margin-top',-headerHeight);
console.log('testing git');
/*===============================================================================
 *  VIDEO SECTION 
 * =============================================================================*/
	
	// DEFAULT STATE
	$('.b-filters > div:nth-child(1)').addClass('active');
	$('.b-guides .guide:nth-child(1)').addClass('active');
	var sV = $('.b-guides .guide:nth-child(1)').find('.video--link').text();
	var cS = '<source src="'+sV+'" type="video/mp4">';
	$('.b-guides .guide:nth-child(1)').find('video').append(cS);

	// ON CLICK STATE
	$('.b-filters > div a').each(function() {
		$(this).click(function(e) {
			var activeFilter = $(this).parent().find('span').text();
			var activeFilter = activeFilter.replace(/^0+/, '');
			e.preventDefault();
			$('.b-filters > div').removeClass('active');
			$(this).parent().addClass('active');

			// DISPLAY GUIDE
			$('.b-guides .guide').each(function() {
				var guideVal = $(this).attr('data-id');
				var guideVal = guideVal.replace(/^0+/, '');
				var valMatches = activeFilter - guideVal == 0;
				var theGuide = $(this);
				
				if(valMatches) {
					$('.b-guides .guide').removeClass('active');
					theGuide.addClass('active');
					var theVideo = theGuide.find('.video--link').text();
					var appendIt = '<source src="'+theVideo+'" type="video/mp4">';
					theGuide.find('video').append(appendIt);
				}
			});
		});
	});

// SCROLL TO ACTIVATE EACH POINTER
if($(window).width() > 769) {
	var curWidth = $(this).width();
	var getUrl = window.location.href;
	var howMany = $('.b-guides > .guide').length;
	var sH = $('.butler-guides-section').outerHeight();
	var stopperHeight = howMany*200;
	
	$('.butler-guides-section').prepend('<div class="scroll-stopper"></div>');
// 	$('.scroll-stopper').css('height',stopperHeight);	
	
	// SCROLL BASED ACTIVATIONS
	$('.butler-guides-section').on('scroll', function() {
			var sH = $(this).outerHeight();
			var tP = $(this).scrollTop();

			var ssH = stopperHeight - sH;
			var ssH = ssH / howMany;
			var ssHx2 = ssH*2-10;
			var ssHx3 = ssH*3-10;
			var ssHx4 = ssH*4-10;
			var ssHx5 = ssH*5-10;
			var ssHx6 = ssH*6-10;

			if(tP <= 0) { // ACTIVATE MY N-1
				$('.b-filters > div:nth-child(1) a').trigger('click');
			} else if(tP > ssH && tP <= ssHx2) { // ACTIVATE MY N-2
				$('.b-filters > div:nth-child(2) a').trigger('click');
			} else if(tP > ssHx2 && tP <= ssHx3) { // ACTIVATE MY N-3
				$('.b-filters > div:nth-child(3) a').trigger('click');
			} else if(tP > ssHx3 && tP <= ssHx4) { // ACTIVATE MY N-4
				$('.b-filters > div:nth-child(4) a').trigger('click');
			} else if(tP > ssHx4 && tP <= ssHx5) { // ACTIVATE MY N-5
				$('.b-filters > div:nth-child(5) a').trigger('click');
			} else if(tP > ssHx4 && tP <= ssHx6) { // ACTIVATE MY N-6
				$('.b-filters > div:nth-child(6) a').trigger('click');
			} else if(tP > ssHx5) { // END OF THE LOOP - RESUME WINDOW SCROLL	
				$('body').addClass('resume-window-scroll');
			} else {
				// nothing left to do here...
			}
		});
	} else {
		// DEFAULT STATE
		$('.bm-container .bm-filter:nth-child(1)').addClass('active');
		$('.bm-filter.active').prev().find('.bm-head').toggleClass('remove-pseudo');
		$('.bm-filter.active .bm-guide').attr('style','display:block');
		$('.bm-filter:not(.active) .bm-guide').attr('style','display:none');
		// ON CLICK STATE
		$('.bm-filter .bm-head').each(function() {
			$(this).click(function(e) {
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
		});
		// VIDEO GUIDE SECTION
		$('#bm-guides .bm-container .bm-filter').each(function() {
			var videoLink = $(this).find('.video--link').text();
			var theSource = '<source src="'+videoLink+'" type="video/mp4">';
			$(this).find('video').append(theSource);
		});
	}
	

/*===============================================================================
 *  WINDOW RESIZE FUNCTION
 * =============================================================================*/
$(window).resize(function() {
	var mQ = $(window).width();
	if(mQ < 768.98) {
		$('#butler_guides').hide();
		$('#bm-guides').show();
	} else if(mQ > 769) {
		$('#bm-guides').hide();
		$('#butler_guides').show();
	} else if(mQ < 467.98) {
		// SCROLLING TEXT + BUTTON SECTION
		$('#ba-marq #marquee .marq-container').removeClass('track');
	} else {
		// do nothing for now....
	}
});
/*===============================================================================
 *  INITIAL LOAD MEDIA QUERY
 * =============================================================================*/
if($(window).width() < 768.98) {
	$('#butler_guides').hide();
} 
if($(window).width() > 769) {
	$('#bm-guides').hide();
}
if($(window).width() < 467.98) {
	$('#ba-marq #marquee .marq-container').removeClass('track');
}
	
	
/*===============================================================================
 *  POPUPS
 * =============================================================================*/
// ALL POPUPS
    $('.elementor-location-popup > div > section > .elementor-container > .elementor-row > .elementor-column > .elementor-column-wrap > .elementor-widget-wrap').prepend('<img class="popup-icon" src="/wp-content/uploads/2022/06/popup-icon.png">');
	setTimeout(function() {
		$('.dialog-close-button').on('click', function() {
			$('.elementor-popup-modal').fadeOut('slow');
		});
	}, 5000);

/*-- MOBILE MENU --*/
$('.elementor-menu-toggle').on('click', function() {
	$('body').toggleClass('body-stopper');
});
	
/** POPUP MODAL BUTTON --*/
	$('.elementor-button-link').click(function() {
		var thisLink = $(this).attr('href');
        if((thisLink.indexOf('popup') >= 1)) {
			setTimeout(function() {
				$('.elementor-popup-modal button > span > span:first-child').remove();
				$('.elementor-popup-modal button > span').prepend('<span class="elementor-button-icon elementor-align-icon-right"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 6C13.5523 6 14 6.44772 14 7C14 7.51284 13.614 7.93551 13.1166 7.99327L13 8H1C0.447715 8 0 7.55228 0 7C0 6.48716 0.38604 6.06449 0.883379 6.00673L1 6H13Z" fill="url(#paint0_linear_0_221)"></path><path d="M6.29289 0.292893C6.65338 -0.0675907 7.22061 -0.0953203 7.6129 0.209705L7.70711 0.292893L13.7071 6.29289C14.0676 6.65338 14.0953 7.22061 13.7903 7.6129L13.7071 7.70711L7.70711 13.7071C7.31658 14.0976 6.68342 14.0976 6.29289 13.7071C5.93241 13.3466 5.90468 12.7794 6.2097 12.3871L6.29289 12.2929L11.585 7L6.29289 1.70711C5.93241 1.34662 5.90468 0.779392 6.2097 0.387101L6.29289 0.292893Z" fill="url(#paint1_linear_0_221)"></path><defs><linearGradient id="paint0_linear_0_221" x1="0" y1="8.01355" x2="14" y2="8.01355" gradientUnits="userSpaceOnUse"><stop stop-color="#ED1E79"></stop><stop offset="0.85" stop-color="#FBB03B"></stop><stop offset="1" stop-color="#FBB03B"></stop></linearGradient><linearGradient id="paint1_linear_0_221" x1="6" y1="14.0948" x2="14" y2="14.0948" gradientUnits="userSpaceOnUse"><stop stop-color="#ED1E79"></stop><stop offset="0.85" stop-color="#FBB03B"></stop><stop offset="1" stop-color="#FBB03B"></stop></linearGradient></defs></svg></span>');
				/*-- PRIVACY LINK --*/
				$('.elementor-popup-modal .elementor-form-fields-wrapper > div:nth-last-child(2) .elementor-field-option label').text('Ich akzeptiere die');
				$('.elementor-popup-modal .elementor-form-fields-wrapper > div:nth-last-child(2) .elementor-field-option label').append('<a class="privacy--link" href="#">Datenschutzbedingungen</a>');
				// SMOOTHEN THE CLOSE
				$('.dialog-close-button').on('click', function() {
					$('.elementor-popup-modal').fadeOut('slow');
				});
			}, 10);
		}
	});
	
	
	
/* BA SLIDER CONTROLS */

if($(window).width() > 468) {
	// INITIAL STATE MODIFICATION
	$('#ba--sliders .slides > li:first-child').addClass('active');
	
	// SPEEDY CONZALES VARIABLES
	var slide = $('#ba--sliders .slides > li');
	var slideWidth = $('#ba--sliders .slides > li').width();
	var slideWidth = slideWidth + 'px' + '!important';
	
	// FUCK ELEMENTOR'S ACTIVE STATE
	slide.removeClass('flex-active-slide');
	
	$('#ba-slider-controls li').click(function() {
		$('#ba-slider-controls li').removeClass('active');
		$(this).addClass('active');
		
		var activePoint = $('#ba-slider-controls li.active a').text();
		// ACTIVE ON CONDITION
		if(activePoint == 1) {
			slide.removeClass('active');
			slide.eq(0).addClass('active');
		} else if(activePoint == 2) {
			slide.removeClass('active');
			slide.eq(1).addClass('active');
		} else if(activePoint == 3) {
			slide.removeClass('active');
			slide.eq(2).addClass('active');
		} else {
			//speedy conzales :D
		}
		
	});
	
// HERE COMES D ARROWS
	$('.bsa-right').on('click',function(){
		var activeLiner = $('#ba-slider-controls li.active');
		if(activeLiner.next().length > 0) {
			activeLiner.removeClass('active');
			activeLiner.next().addClass('active');
		} else {
			// speedy conzales :D
		}
		var linerTxt = $('#ba-slider-controls li.active a').text();
		// ACTIVE ON CONDITION
		if(linerTxt == 1) {
			slide.removeClass('active');
			slide.eq(0).addClass('active');
		} else if(linerTxt == 2) {
			slide.removeClass('active');
			slide.eq(1).addClass('active');
		} else if(linerTxt == 3) {
			slide.removeClass('active');
			slide.eq(2).addClass('active');
		} else {
			//speedy conzales :D
		}
	});
	
	$('.bsa-left').on('click',function(){
		var activeLiner = $('#ba-slider-controls li.active');
		if(activeLiner.prev().length > 0) {
			activeLiner.removeClass('active');
			activeLiner.prev().addClass('active');
		} else {
			// speedy conzales :D
		}
		var linerTxt = $('#ba-slider-controls li.active a').text();
		// ACTIVE ON CONDITION
		if(linerTxt == 1) {
			slide.removeClass('active');
			slide.eq(0).addClass('active');
		} else if(linerTxt == 2) {
			slide.removeClass('active');
			slide.eq(1).addClass('active');
		} else if(linerTxt == 3) {
			slide.removeClass('active');
			slide.eq(2).addClass('active');
		} else {
			//speedy conzales :D
		}
	});
}
	
/* END BA SLIDER CONTROLS */
	
/* BA SLIDER BUTTON */
	$('#ba--sliders .slides li .elementor-button-content-wrapper .elementor-button-icon:first-child svg').remove();
    $('#ba--sliders .slides li .elementor-button-content-wrapper .elementor-button-icon:first-child').append('<img class="btn-replaced" src="/wp-content/uploads/2022/06/contact-mob-icon.png">');
	
/* MEDIA CONTROL */
	
	if($(window).width() > 769) {
		
		
		// SCROLL EVENT - LOGO
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
		
	} 
	
	//THE MARQUE SVG
    $('.marq-button a').append('<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 6C13.5523 6 14 6.44772 14 7C14 7.51284 13.614 7.93551 13.1166 7.99327L13 8H1C0.447715 8 0 7.55228 0 7C0 6.48716 0.38604 6.06449 0.883379 6.00673L1 6H13Z" fill="url(#paint0_linear_0_387)"/><path d="M6.29289 0.292893C6.65338 -0.0675907 7.22061 -0.0953203 7.6129 0.209705L7.70711 0.292893L13.7071 6.29289C14.0676 6.65338 14.0953 7.22061 13.7903 7.6129L13.7071 7.70711L7.70711 13.7071C7.31658 14.0976 6.68342 14.0976 6.29289 13.7071C5.93241 13.3466 5.90468 12.7794 6.2097 12.3871L6.29289 12.2929L11.585 7L6.29289 1.70711C5.93241 1.34662 5.90468 0.779392 6.2097 0.387101L6.29289 0.292893Z" fill="url(#paint1_linear_0_387)"/><defs><linearGradient id="paint0_linear_0_387" x1="0" y1="8.01355" x2="14" y2="8.01355" gradientUnits="userSpaceOnUse"><stop stop-color="#ED1E79"/><stop offset="0.85" stop-color="#FBB03B"/><stop offset="1" stop-color="#FBB03B"/></linearGradient><linearGradient id="paint1_linear_0_387" x1="6" y1="14.0948" x2="14" y2="14.0948" gradientUnits="userSpaceOnUse"><stop stop-color="#ED1E79"/><stop offset="0.85" stop-color="#FBB03B"/><stop offset="1" stop-color="#FBB03B"/></linearGradient></defs></svg>');
	
// SERVICES SECTION
	
	// SCROLL POSITION BASED EVENTS
    if($(window).width() > 769) {
		$(window).scroll(function() {
   		var hT = $('#butlerapp-services').offset().top,
			hH = $('#butlerapp-services').outerHeight(),
			wH = $(window).height(),
			wS = $(this).scrollTop(),
			bsi1 = $('.butlerapp-services-img-container .pro-service'),
			bsi2 = $('.butlerapp-services-img-container .casual-service');
			if (wS > (hT+hH-wH-300)){
				setTimeout(function() {
					bsi1.fadeOut();
					bsi2.css({'left':'0'});
				}, 2000);
			} else {
				setTimeout(function() {
					bsi1.fadeIn();
					bsi2.css({'left':'150%'});
				}, 2000);
			}
		});
	}
	
// FAQs SECTION

	// DEFAULT ICON STATE
// 	$('.faqs-loop .faq').each(function() {
// 		// EACH CLICK EVENT
// // 		if($(window).width() < 468) {
// // 			$(this).prepend('<div class="faq-close-btn" style="display:none;">');
// // 		}
// 		$(this).on('click', function() {
// 			// NOT ACTIVE HOOKS
// 			$('.faqs-loop .faq').not(this).removeClass('faq-active');
// 			$('.faqs-loop .faq').not(this).find('.faq-content-area').slideUp();
// 			$('.faqs-loop .faq').not(this).find('.faq-overlay').css('opacity','0');
// 			$('.faqs-loop .faq').not(this).find('.faq-close-btn').hide();
// // 			var notthisInner = $('.faqs-loop .faq').not(this).find('.faq-inner');
// // 			if($(window).width() < 468) {
// // 				$('.faqs-loop .faq').not(this).find('.faq-flipper').appendTo(notthisInner);
// // 			}
// 			// ACTIVE HOOKS
// 			$(this).addClass('faq-active');
// 			$(this).find('.faq-content-area').slideDown();
// 			$(this).find('.faq-overlay').css('opacity','1');
// 		});
// 	});
	
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
	
// CONTACT SECTION
 
	// SCROLL POSITION BASED EVENTS
    $(window).scroll(function() {
   	var hT = $('#butlerapp-contact').offset().top,
		hH = $('#butlerapp-contact').outerHeight(),
		wH = $(window).height(),
		wS = $(this).scrollTop()
		
		if (wS > (hT+hH-wH)) {
			setTimeout(function() {
				$('#butlerapp-contact').css('background-image','url(/wp-content/uploads/2022/06/contact-2-min.png)');
			}, 2000);
		} else {
			setTimeout(function() {
				$('#butlerapp-contact').css('background-image','url(/wp-content/uploads/2022/06/Layer.png)');
			}, 2000);
		}
		
	});
	
// TEAMS SECTION
	
	// BACKGROUND CHANGER
	if($(window).width() > 468 ) {
		$(window).scroll(function() {
			var pT = $('#pro-team'),
				cT = $('#casual-team'),
				hT = $('#butlerapp-team-container').offset().top,
				hH = $('#butlerapp-team-container').outerHeight(),
				wH = $(window).height(),
				wS = $(this).scrollTop();
			
			if (wS > (hT+hH-wH-(hH/2))) {
					setTimeout(function() {
						pT.fadeOut();
						cT.fadeIn();
					}, 2000);
				} else {
					setTimeout(function() {
						cT.fadeOut();
						pT.fadeIn();
					}, 2000);
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
	
	
	// PLAYING WITH 2 BANNERS
	var ptH = $('#casual-team').outerHeight();
	var ptH = ptH + 'px';
	console.log('hotspot height =' + ptH);
	
	// ADD RELATIVE SUPPORT TO PARENT
	$('#pro-team').parent().attr('style','position:relative;height:'+ ptH +'');
	$('#casual-team').parent().attr('style','position:relative;height:'+ ptH +'');
	
	// TEAM CARDS - CLOSE FUNCTION
	$('.e-hotspot').each(function() {
		$(this).find('.ba-close-icon').click(function() {
			$(this).parent().parent().parent().removeClass('e-hotspot--active');
		});
	});
	
	// NON ACTIVE HOTSPOTS
// 	$('.e-hotspot__button.e-hotspot--soft-beat').on('click', function() {
// 		$(this).toggleClass('ba--active');
// 		$('.e-hotspot__button.e-hotspot--soft-beat').not(this).toggleClass('ba--inactive');
// 	});
	
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
	// Append to each slide
    	$('#ba--sliders .slides > li:first-child > div').prepend('<img class="ba-image" src="/wp-content/uploads/2022/06/mobile-mac-min.png">');
		$('#ba--sliders .slides > li:nth-child(2) > div').prepend('<img class="ba-image" src="/wp-content/uploads/2022/06/mobile-mac-2-min.png">');
		$('#ba--sliders .slides > li:nth-child(3) > div').prepend('<img class="ba-image" src="/wp-content/uploads/2022/06/mobile-mac-3-min.png">');
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
	// Contact Form Section
		var getBg = $('#butlerapp-contact').css('background-image');
		$('#butlerapp-contact').addClass('nobgimage');
		$('#butlerapp-contact').prepend('<div class="ct-girl"><div class="ct-girl-img"></div></div>')
		$('#butlerapp-contact .ct-girl-img').css('background-image', getBg);
		// Floating Icon
    	$('.ct-girl').append('<img class="floating-icon" src="/wp-content/uploads/2022/06/contact-mob-icon.png">');
	}
	if($(window).width() < 768.98) {
		// Building the hotspot container
		$('#pro-team .e-hotspot').wrapAll('<div class="hotspot-container">');
	// Hotspot Instructor
		$('#butlerapp-team-container').prepend('<div class="ba-instructor"><img src="/wp-content/uploads/2022/06/dragger-icon-1.png"></div>');
	// Here comes the FINGER
		$('.ba-instructor').append('<img src="/wp-content/uploads/2022/06/dragging-finger-icon.png">');
	// Initial Scroll X Position
		$('#butlerapp-team-container').css({
			'overflow-x':'scroll',
			'transition':'all .4s ease'
		});
		$(window).scroll(function() {
			var tH = $(this).scrollTop();
			var wH = $(window).height();
			var oH = $('#butlerapp-team-container').offset().top;
			var sH = $('#butlerapp-team-container').outerHeight();
			if(tH > (oH+sH-wH-500)) {
				$('#butlerapp-team-container').scrollLeft(430);
			}
		});
		
		// Comment...
		$('.scrolling-logo-text, .scrolling-logo-images').remove();
		
	}
	$('#mobile-scrolling-images').append('<div class="marquee"> <div class="track"> <img src="/wp-content/uploads/2022/06/slider-img-5.png"/><img src="/wp-content/uploads/2022/06/slider-img-9.png"/><img src="/wp-content/uploads/2022/06/slider-img-1.png"/><img src="/wp-content/uploads/2022/06/slider-img-111.png"/> <img src="/wp-content/uploads/2022/06/slider-img-4.png"/><img src="/wp-content/uploads/2022/06/slider-img-7.png"/><img src="/wp-content/uploads/2022/06/slider-img-6.png"/><img src="/wp-content/uploads/2022/06/slider-img-11.png"/> <img src="/wp-content/uploads/2022/06/slider-img-3.png"/><img src="/wp-content/uploads/2022/06/slider-img-2.png"/><img src="/wp-content/uploads/2022/06/slider-img-8.png"/><img src="/wp-content/uploads/2022/06/slider-img-10.png"/> <img src="/wp-content/uploads/2022/06/slider-img-22.png"/> </div></div><div class="marquee"> <div class="track"> <img src="/wp-content/uploads/2022/06/slider-img-1-1.png"/><img src="/wp-content/uploads/2022/06/slider-img-2.png"/><img src="/wp-content/uploads/2022/06/slider-img-14.webp"/><img src="/wp-content/uploads/2022/06/slider-img-3.jpg"/> <img src="/wp-content/uploads/2022/06/slider-img-9-1.jpg"/><img src="/wp-content/uploads/2022/06/slider-img-11-1.png"/><img src="/wp-content/uploads/2022/06/slider-img-13.png"/> <img src="/wp-content/uploads/2022/06/slider-img-12.jpg"/><img src="/wp-content/uploads/2022/06/slider-img-10-1.png"/><img src="/wp-content/uploads/2022/06/slider-img-4.webp"/> <img src="/wp-content/uploads/2022/06/slider-img-5-1.png"/><img src="/wp-content/uploads/2022/06/slider-img-6-1.png"/><img src="/wp-content/uploads/2022/06/slider-img-7-1.png"/> <img src="/wp-content/uploads/2022/06/slider-img-8-1.png"/> </div></div><div class="marquee"> <div class="track"> <img src="/wp-content/uploads/2022/06/slider-img-313.webp"/><img src="/wp-content/uploads/2022/06/slider-img-39.jpg"/><img src="/wp-content/uploads/2022/06/slider-img-33.png"/> <img src="/wp-content/uploads/2022/06/slider-img-31.jpg"/><img src="/wp-content/uploads/2022/06/slider-img-310.png"/><img src="/wp-content/uploads/2022/06/slider-img-32.png"/> <img src="/wp-content/uploads/2022/06/slider-img-312.png"/><img src="/wp-content/uploads/2022/06/slider-img-311.png"/><img src="/wp-content/uploads/2022/06/slider-img-34.png"/> <img src="/wp-content/uploads/2022/06/slider-img-35.png"/><img src="/wp-content/uploads/2022/06/slider-img-36.jpg"/><img src="/wp-content/uploads/2022/06/slider-img-37.png"/><img src="/wp-content/uploads/2022/06/slider-img-38.png"/> </div></div>');
	
});

















