var $ = jQuery;

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
        console.log('a href #');
        // Cancel the default action
        e.preventDefault();
    });

    // PREMIUM MOBILE NAV
    $('body').on('click', '.premium-hamburger-toggle', function() {
        if ($(this).hasClass('premium-toggle-opened')) {
            // class premium-toggle-opened already added. it's open
            $('html').addClass('mobile-menu-open');
            $(this).parent().addClass('opened');
        } else {
            // close
            $('html').removeClass('mobile-menu-open');
            $(this).parent().removeClass('opened');
        }
    });

    // copy cta in header to mobile nav
    $('.header-v2 #stb-header-cta > div').clone().appendTo('.premium-mobile-menu-container').addClass('cta-container');

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
    if ($('.swiper-coverflow-container').length) {
        var sliderSelector = '.swiper-coverflow-container';
        var options = {
            init: false,
            loop: true,
            speed:800,
            slidesPerView: 2, // or 'auto'
            // spaceBetween: 10,
            centeredSlides : true,
            effect: 'coverflow', // 'cube', 'fade', 'coverflow',
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
        autoplay: true,
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

    // FAQ-V2: HOVER SHOW POPUP
    $('.faq-v2 .faq-flipper').hover(function() {
        var $parent = $(this).parents('.faq-v2').addClass('hover');
        $parent.addClass('hover');
    }, function() {
        $('.faq-v2').removeClass('hover');
    });
});