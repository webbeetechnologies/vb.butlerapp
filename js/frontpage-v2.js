var $ = jQuery;

function buildPaginationQuiz() {
    var $container = $('.quiz-section');

    // count pagination
    var ln = $container.find('.quiz2-container:hidden .e-form__indicators__indicator').length;
    var active_idx = $('.quiz2-container:hidden .e-form__indicators__indicator--state-active .e-form__indicators__indicator__number').text();
    var percentage = active_idx / ln * 100;

    var el = "<div class='quiz-pagination'>";
    el += "  <div class='pagination-number'>Step "+ active_idx+"/"+ln+"</div>";
    el += "  <div class='pagination-rail'>";
    el += "    <div class='progress-bar' style='width: "+percentage+"%'></div>"
    el += "  </div>";
    el += "</div>";

    $('.paginator-contaainer').append(el);
}
$(document).ready(function () {
    // QUESTIONNAIRE SECTION
    // hide form 
    $('.quiz2-container').hide();
    buildPaginationQuiz();
        
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
});