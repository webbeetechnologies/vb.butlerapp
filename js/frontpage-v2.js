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

function switchToQuizGirl() {
    // console.log('switch to quiz girl called');
    $('.quiz2-container').fadeOut('fast');
    $('.quiz1-container').fadeIn('fast');
    // HIDE BUTTON
    $('.button-take-quiz').hide(); // keep the button hide to prevent multiple submit
    // HIDE PAGINATION
    $('.paginator-container').hide();
}

function populateFormVal() { 
    var $inputs = $('#quiz-form :input');
    var values = {};
    $inputs.each(function() {
        // ONLY RADIO FOR NOW IN QUIZ
        if ($(this).is(':radio') && $(this).is(':checked')) {
            values[this.name] = $(this).val();
        } 
    });
    return values;
}
// global quiz values
var values;

$(document).ready(function () { 
    // POPUP: PREVENT JUMPING TO TOP WHEN CLOSE
    $("body").on("click", ".dialog-widget .dialog-close-button", "a[href='#']", function(e) {
        // console.log('a href #');
        // Cancel the default action
        e.preventDefault();
    });

    // PREMIUM MOBILE NAV
    $('body').on('click', '.premium-hamburger-toggle', function(e) {
        e.preventDefault();
        // class premium-toggle-opened havent been added. it's opening..
        if (!$(this).parent().hasClass('opened')) {
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

    // product menu clicked
    $('body').on('click','.hfe-dropdown li.menu-item:not(.menu-item-has-children)',function() {
        // make sure the active state will close by click it
        $('.hfe-active-menu .hfe-nav-menu-icon').click();
        $('html').removeClass('mobile-product-menu-open');
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
        $("html, body").animate({ scrollTop: $('.quiz-section .right-container').offset().top }, 500);

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

    //populate the form data and send to popup form
    $('#quiz-form').submit(function() {
        values = populateFormVal();
    });
 
     // on submit_success event triggered on my specific form
    $(document).on('submit_success', '#quiz-form',function() {
          // set quiz values in the popup
          var strValues = JSON.stringify(values);
            $('#get-special-offer-form #form-field-quiz_result').val(strValues);
            // hide all fields in this form
            $('#quiz-form').find('.elementor-form-fields-wrapper').hide();
            $('#quiz-form').find('.e-form__indicators').hide();
            
            setTimeout(switchToQuizGirl, 5000);
    });


    // CUSTOMERS TESTIMONIALS
    $('.testimonials-carousel-container .slider-nav').slick({
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        focusOnSelect: true,
        centerMode: true,
        centerPadding: 0,
        variableWidth: true,
        pauseOnHover:true
    });
    
    $('.testimonials-carousel-container .slider-for').slick({
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        dots: true,
        focusOnSelect: true,
        pauseOnHover:true,
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
    * INDUSTRIES: ELEMENTOR CAROUSEL PREV NEXT FAKE BUTTON
    =======================================================================================*/
    $('.industries-section .carousel-controller .prev a').on('click', function(e) {
        e.preventDefault();
        $(this).parents('.industries-section').find('.carousel-prev').click();
        $(this).parents('.industries-section').find('.slick-prev').click();
        console.log($(this).parents('.industries-section').find('.slick-prev').length);
    });
    $('.industries-section .carousel-controller .next a').on('click', function(e) {
        e.preventDefault();
        $(this).parents('.industries-section').find('.carousel-next').click();
        $(this).parents('.industries-section').find('.slick-next').click();
    });
    /*=======================================================================================
    * FAQs Section
    =======================================================================================*/
    // close all
    var extraTopSpace = 80;
    var animTime = 150;
    $('.faq-v2').each(function(idx) {
        if (!$(this).hasClass('faq-active')) {
            $(this).find('.faq-inner .faq-content-area').slideUp(animTime);
        }
    });

    $('.faq-v2 .faq-inner').click(function(e) {
        e.preventDefault();
    
        let $this = $(this);
        
        if ($this.parent().hasClass('faq-active')) {
            $this.parent().removeClass('faq-active');
            $this.find('.faq-content-area').slideUp(animTime);
        } else {
            $this.parents('.faq-v2-container').find('.faq-active .faq-content-area').slideUp(animTime);
            $('.faq-v2-container .faq-active').removeClass('faq-active');
            $this.parent().addClass('faq-active');
            $this.find('.faq-content-area').slideToggle(animTime);
        }

        // scrolltop to active one
        /*
        if ($(window).width() > breakpoint.medium) {
            // scroll to opened faq only in desktop
            var timeout;
            if (!$(this).parent().hasClass(".faq-active")) {
                clearTimeout(timeout);
                timeout = setTimeout(function () {
                var offset = $(".faq-active").offset().top - extraTopSpace;
                var headerHeight = $("#masthead").height();
                $("body, html").animate(
                    {
                    scrollTop: offset - headerHeight,
                    },
                    500
                );
                }, 500);
            }
        }
        */
    });
    
    if ($(window).width() > breakpoint.medium) {
        var delay=1000, setTimeoutConst;
        $('.faq-v2:not(".faq-active")').hover(function() {
            var $that = $(this);
            setTimeoutConst = setTimeout(function() {
                $that.addClass('hover');
            }, delay);
        }, function() {
            clearTimeout(setTimeoutConst);
            $(this).removeClass('hover');
        });
    }

    /*=======================================================================================
    * KNOWLEDGE BASE: ACCORDION
    =======================================================================================*/
    // close all except .opened
    $('.kb-table-of-contents .accordion').each(function(idx) {
        if (!$(this).hasClass('opened')) {
            $(this).find('.accordion-body').slideUp(350);
        }
    });

    $('.kb-table-of-contents .accordion-title').click(function(e) {
        e.preventDefault();
    
        let $this = $(this);
        
        if ($this.parent().hasClass('opened')) {
            $this.parent().removeClass('opened');
            $this.next().slideUp(350);
        } else {
            $this.parent().parent().find('.opened .accordion-body').slideUp(350);
            $this.parents('.kb-table-of-contents').find('.opened').removeClass('opened');
            $this.parent().toggleClass('opened');
            $this.next().slideToggle(350);
        }
    });

    /*=======================================================================================
    * KNOWLEDGE BASE: SEARCH
    =======================================================================================*/
    
    $('.kb-table-of-contents input.query').on('input',function() {
        var val = this.value.toLowerCase();
        if (val != "") {
            $('.kb-table-of-contents').addClass('on-searching');
        } else {
            $('.kb-table-of-contents').removeClass('on-searching');
        }

        //find all .user-profile divs
        $('.kb-table-of-contents').find('.post-item')
        .filter(function() {
            return $(this).data('title').indexOf( val ) > -1;
        })
        
        //make them visible
        .show()
        
        //now go back and get only the visible ones
        .end().filter(':visible')
        
        //filter only those for which typed value 'val' does not match the `data-id` value
        .filter(function() {
            return $(this).data('title').toLowerCase().indexOf( val ) === -1;
        })
        
        //fade those out
        .fadeOut();
    });

    $('.kb-table-of-contents .clear-query').on('click', function() {
        $('.kb-table-of-contents input.query').val('').trigger('input');
        $('.kb-table-of-contents input.query').focus();
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
            var $parent = $(this).parent('.e-hotspot');
    
            if ($parent.hasClass('e-hotspot-active')) {
                $parent.removeClass('e-hotspot-active');
                $(this).removeClass('ba--inactive');
            } else {
                $('.support-cards-container .e-hotspot-active').removeClass('e-hotspot-active');
                $('.support-cards-container .ba--inactive').removeClass('ba--inactive');

                $parent.addClass('e-hotspot-active');
                $(this).addClass('ba--inactive');
                return;
            }
            
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