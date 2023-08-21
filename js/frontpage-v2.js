var $ = jQuery;
var breakpoint = {
    'small': 640,
    'medium': 768,
    'large': 1024,
    'extraLarge': 1200
}

function buildPaginationSection() {
    $('.quiz2-container .e-form__indicators').clone().appendTo('.quiz-section .paginator-container'); 
     $('.quiz-section .paginator-container .e-form__indicators').hide();
 
    // count pagination
    var ln = $('.quiz-section .paginator-container .e-form__indicators__indicator').length;
    var active_idx = $('.quiz-section .paginator-container .e-form__indicators__indicator--state-active .e-form__indicators__indicator__number').text();
    var percentage = active_idx / ln * 100;

    var el = '<div class="quiz-pagination">';
    el += '  <div class="pagination-number">Schritt <span class="current">'+ active_idx+'</span>/'+ln+'</div>';
    el += '  <div class="pagination-rail">';
    el += '    <div class="progress-bar" style="width: '+percentage+'%"></div>';
    el += '  </div>';
    el += '</div>';

    $('.paginator-container').append(el);
}

$(document).ready(function () { 
    // POPUP: PREVENT JUMPING TO TOP WHEN CLOSE
    $("body").on("click", ".dialog-widget .dialog-close-button", "a[href='#']", function(e) {
        // console.log('a href #');
        // Cancel the default action
        e.preventDefault();
    });

    // PREMIUM MOBILE NAV
    $('.premium-hamburger-toggle').on('click', function(e) {
        e.preventDefault();
        // class premium-toggle-opened havent been added. it's opening..
        if (!$(this).hasClass('premium-toggle-opened')) {
            $('html').addClass('mobile-menu-open');
            $(this).parent().addClass('opened');
        } else {
            // close
            $('html').removeClass('mobile-menu-open');
            $(this).parent().removeClass('opened');
        }
    });

    // PRODUCT MENU OPENED
    $('.product-menu-container .hfe-nav-menu').on('click', function() {
        var $children = $('.product-menu-container .hfe-nav-menu .hfe-dropdown');
        
        if ($children.hasClass('menu-is-active')) {
            // class  hfe-active-menu already added. it's open
            $('html').addClass('mobile-product-menu-open');
        } else {
            // close
            $('html').removeClass('mobile-product-menu-open');
        }
    });

    // menu clicked, close nav
    $('body').on('click','.premium-mobile-menu-container li.menu-item:not(.menu-item-has-children)',function() {
        $('.premium-toggle-close:visible').click();
    });

    // copy cta in header to mobile nav
    $('.header-v2 #stb-header-cta > div').clone().appendTo('.premium-mobile-menu-container').addClass('cta-container');

    // copy cta in second row nav (product page) to mobile nav
    $('.product-menu-container .cta-container .elementor-button-wrapper').clone().appendTo('.product-nav-container nav').addClass('elementor-hidden-desktop cta-container');

    // megamenu back button in mobile
    $('body').on('click', '.submenu-button-back', function() {
        // var parentLi = $(this).parents('li.menu-item');
        // parentLi.removeClass('premium-active-menu');
        var parentLink = $(this).parents('li.menu-item').find('.premium-menu-link-parent');
        parentLink.click();
    });

    // SWIPER COVERFLOW
    // https://codepen.io/digistate/pen/KZWYwo
    // Params
    var effect = $(window).width() > breakpoint.medium ? 'coverflow' : 'fade';

    if ($('.swiper-coverflow-container').length) {
        var sliderSelector = '.swiper-coverflow-container';
        var options = {
            init: false,
            loop: true,
            speed:800,
            slidesPerView: 2, // or 'auto'
            // spaceBetween: 10,
            centeredSlides : true,
            effect: effect, // 'cube', 'fade', 'coverflow',
            coverflowEffect: {
                rotate: 50, // Slide rotate in degrees
                stretch: 0, // Stretch space between slides (in px)
                depth: 100, // Depth offset in px (slides translate in Z axis)
                modifier: 1, // Effect multipler
                slideShadows : true, // Enables slides shadows
            },
            grabCursor: true,
            parallax: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
            1023: {
                slidesPerView: 1,
                spaceBetween: 0
            }
            },
            // Events
            on: {
                imagesReady: function(){
                    this.el.classList.remove('loading');
                }
            }
        };

        var textSliderSelector = '.swiper-text-container';
        var optionsText = {
            init: false,
            loop: true,
            speed:800,
            slidesPerView: 1, // or 'auto'
            // spaceBetween: 10,
            centeredSlides : true,
            effect: 'fade', // 'cube', 'fade', 'coverflow',
            grabCursor: true,
            parallax: true,
            
            breakpoints: {
            1023: {
                slidesPerView: 1,
                spaceBetween: 0
            }
            },
            // Events
            on: {
                imagesReady: function(){
                    this.el.classList.remove('loading');
                }
            }
        };

        var mySwiper = new Swiper(sliderSelector, options);
        var mySwiperText = new Swiper(textSliderSelector, optionsText);

        // Initialize slider
        mySwiper.init();
        mySwiperText.init();

        // sync the prev-next
        mySwiper.controller.control = mySwiperText;
        mySwiperText.controller.control = mySwiper;
    }
    
    
    // QUESTIONNAIRE SECTION
    // hide form 
    $('.quiz2-container').hide();
    $('.paginator-container').hide();
        
    $('.button-take-quiz a').on('click', function(e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: $('.quiz-section').offset().top }, 500);

        $('.quiz1-container').hide().fadeOut('fast');
        $('.quiz2-container').fadeIn('fast');
        // HIDE BUTTON
        $('.button-take-quiz').hide();
        // SHOW PAGINATION
        $('.paginator-container').show();
        
        // set first label
        buildPaginationSection();
        var ln = $('.quiz-section .paginator-container .e-form__indicators__indicator').length;
        var active_idx = $('.quiz2-container .e-form__indicators__indicator:visible .e-form__indicators__indicator__number').text();

        $('.quiz2-container .e-form__buttons button').on('click', function() {
            // update pagination container
            active_idx = $( ".quiz2-container .e-form__indicators__indicator:visible .e-form__indicators__indicator__number").text();
			var percentage = active_idx / ln * 100;

            $('.quiz-section .pagination-number .current').text(active_idx);
            $('.quiz-section .quiz-pagination .progress-bar').css('width', percentage+"%");

        });
    });

    $('.quiz2-container form .elementor-field-option input').change(function() {
        $('.quiz2-container form .elementor-field-option').removeClass('active');
        
        if ($(this).is(':checked')) {
            $(this).parent().addClass('active');
        } else {
            $(this).parent().removeClass('active');
        }
    });

    // CUSTOMERS TESTIMONIALS
    $('.testimonials-carousel-container .slider-nav').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        focusOnSelect: true,
        centerMode: true,
        centerPadding: 0,
        variableWidth: true,
        autoplay: true
    });
    
    $('.testimonials-carousel-container .slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        dots: true,
        asNavFor: '.slider-nav'
    });

    // INTERACTIVE MAP: TOGGLE ACTIVE BASED ON INDEX
    $('.country-buttons-container a').click(function(e) {
        e.preventDefault();
    });
    // SET IDX 0 AS ACTIVE
    $('.country-buttons-container .button-border-rainbow').removeClass('active');
    $('.country-buttons-container .button-border-rainbow').eq(0).addClass('active');

    $('.maps-supercontainer .container-interactive-map').removeClass('active');
    $('.maps-supercontainer .container-interactive-map').eq(0).addClass('active');

    $('.country-buttons-container .button-border-rainbow').on('click', function() {
        var idx = $(this).index();
       
        $('.country-buttons-container .button-border-rainbow').removeClass('active');
        $('.country-buttons-container .button-border-rainbow').eq(idx).addClass('active');

        $('.maps-supercontainer .container-interactive-map').hide().removeClass('active');
        $('.maps-supercontainer .container-interactive-map').eq(idx).fadeIn('fast').addClass('active');
    });

    /*=======================================================================================
  * FAQs Section
  =======================================================================================*/
  (function faqClosure() {
        var timeout = null;
        var extraTopSpace = 20;
        $(".faq-v2 .faq-inner").on("click", function () {
            $(this).parent().find(".faq-content-area").slideToggle();
            $(this).parent().toggleClass("faq-active");
            $(".faq-v2 .faq-inner")
                .not(this)
                .parent()
                .find(".faq-content-area")
                .slideUp()
                .removeClass("faq-active");
            var activo = $(".faq-active").length;
            if (activo > 1) {
                $(".faq-inner").not(this).parent().find(".faq-content-area").slideUp();
                $(".faq-inner").not(this).parent().removeClass("faq-active");
            }

            // scroll to opened faq only in desktop
            if (!$(this).parent().hasClass(".faq-active") && $(window).width() > breakpoint.medium) {
                clearTimeout(timeout);
                timeout = setTimeout(function () {
                var offset = $(".faq-active").offset().top - extraTopSpace;
                var headerHeight = $("#masthead").height();
                $("body, html").animate(
                    {
                    scrollTop: offset - headerHeight,
                    },
                    1000
                );
                }, 1000);
            }
        });
    })();

    // FAQ-V2: HOVER SHOW POPUP
    $('.faq-v2:not(".faq-active")').hover(function() {
       $(this).addClass('hover');
    }, function() {
        $(this).removeClass('hover');
    });

    /***********************************
     * MOBILE LAYOUT
     ***********************************/
    // PERSONAL SERVICES
    $('.support-cards-container').append('<div id="mobile-popup-container" />');
    $('.support-cards-container .e-hotspot__tooltip').clone().appendTo($('#mobile-popup-container'));
    $('.support-cards-container .e-hotspot__button').on('click', function(e) {
        if( $(window).width() < 1024 ) {
            e.stopPropagation();
            var $parent = $(this).parents('.hotspot-v2');
            var idx = parseInt($parent.data('idx')) - 1;
            
            if ($('#mobile-popup-container .e-hotspot__tooltip').eq(idx).hasClass('active')) {
                $('#mobile-popup-container .e-hotspot__tooltip').eq(idx).removeClass('active');
            } else {
                $('#mobile-popup-container .e-hotspot__tooltip').removeClass('active');
                $('#mobile-popup-container .e-hotspot__tooltip').eq(idx).addClass('active');
            }
            
        } else {
          // DESKTOP  
        }
    });

    $('body').on('click', '#mobile-popup-container .e-hotspot__tooltip .ba-close-icon', function() {
        $(this).parents('.e-hotspot__tooltip').removeClass('active');
    });

    // click outside
    $('html').on('click', function() {
        if( $(window).width() < 1024 ) {
            $('#mobile-popup-container .e-hotspot__tooltip.active').removeClass('active');
        }
    });

    $('#mobile-popup-container .e-hotspot__tooltip.active').click(function(event){
        event.stopPropagation();
    });
});