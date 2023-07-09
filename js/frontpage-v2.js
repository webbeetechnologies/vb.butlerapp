var $ = jQuery;

$(document).ready(function () { 
    // POPUP: PREVENT JUMPING TO TOP WHEN CLOSE
    $('.dialog-widget .dialog-close-button').click(function(e){
        // Cancel the default action
        e.preventDefault();
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
        $('.quiz2-container').fadeIn('fast');
        $('.quiz1-container').fadeOut('fast');
        // HIDE BUTTON
        $('.button-take-quiz').hide();
        // SHOW PAGINATION
        $('.paginator-container').show();
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
    
});