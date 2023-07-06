var $ = jQuery;

$(document).ready(function () {
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