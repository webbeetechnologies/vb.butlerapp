<?php
add_action( "wp_enqueue_scripts", "enqueue_wp_child_theme" );
function enqueue_wp_child_theme() {
		// Stylesheets
		// wp_enqueue_style( 'custom-google-fonts', 'https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap', false );
		wp_enqueue_style("parent-css", get_template_directory_uri()."/style.css" );

		// Scripts
		wp_enqueue_script("child-js", get_stylesheet_directory_uri() . "/js/script.js", array( "jquery" ), "1.0", true );
		wp_enqueue_script('tweenmax', get_stylesheet_directory_uri() . '/js/TweenMax.min.js');
}
 
// slick slider
add_action( 'wp_enqueue_scripts', 'slick_register_styles' );
function slick_register_styles() {
wp_enqueue_style( 'slick-css', get_stylesheet_directory_uri() . '/js/plugins/slick/slick.css', [], false, 'all' );
wp_enqueue_style( 'slick-theme-css', get_stylesheet_directory_uri() . '/js/plugins/slick/slick-theme.css', ['slick-css'], false, 'all' );
wp_enqueue_script( 'carousel-js', get_stylesheet_directory_uri() . '/js/plugins/slick//slick.min.js', ['jquery'], true );
}

// TEMPORARILY DISABLING ADMIN BAR ON FRONTEND
/* Disable WordPress Admin Bar for all users */
add_filter( 'show_admin_bar', '__return_false' );

// CPT - GUIDES
function butler_guides() {
	ob_start();
	get_template_part('partials/guides','page');
	return ob_get_clean();
}
add_shortcode('b_guides', 'butler_guides'); 

// CPT - FAQs
function butler_faqs() {
	ob_start();
	get_template_part('partials/faqs','page');
	return ob_get_clean();
}
add_shortcode('b_faqs', 'butler_faqs'); 

// CPT - TEAM
function butler_team() {
	ob_start();
	get_template_part('partials/team','page');
	return ob_get_clean();
}
add_shortcode('b_team', 'butler_team'); 

// CPT - PRICES
function butler_prices() {
	ob_start();
	get_template_part('partials/prices','page');
	return ob_get_clean();
}
add_shortcode('b_prices', 'butler_prices'); 

// CPT - PRICES v2
function butler_prices2() {
	ob_start();
	get_template_part('partials/prices2','page');
	return ob_get_clean();
}
add_shortcode('b_prices_v2', 'butler_prices2'); 

// CPT - PRICE FEATURES
function butler_prices_features($atts, $content = null) {
	ob_start();
	$subtitle = $atts['subtitle'];
	$first_items = $atts['first_items'];

	get_template_part('partials/price_features','page', array('atts'=>$atts, 'content'=>$content));
	return ob_get_clean();
}
add_shortcode('b_price_features', 'butler_prices_features'); 

// BACKEND - CSS
function butler_backend_css() {
  echo '<style>
    #adminmenu .wp-menu-image img {
		padding: 0 !important;
	}
  </style>';
}
add_action('admin_head', 'butler_backend_css');


/*
 * CONVERTS EACH TEAM MEMBER INTO A SHORTCODE :D
 */

// Corbi
function member_corbi() {
	ob_start();
	get_template_part('team/corbi','page');
	return ob_get_clean();
}
add_shortcode('team_corbi','member_corbi');

// Anne
function member_anne() {
	ob_start();
	get_template_part('team/anne','page');
	return ob_get_clean();
}
add_shortcode('team_anne','member_anne');

// Player 3
function member_top3() {
	ob_start();
	get_template_part('team/player_3','page');
	return ob_get_clean();
}
add_shortcode('player_3','member_top3');

// Player 4
function member_top4() {
	ob_start();
	get_template_part('team/player_4','page');
	return ob_get_clean();
}
add_shortcode('player_4','member_top4');

// Player 5
function member_top5() {
	ob_start();
	get_template_part('team/player_5','page');
	return ob_get_clean();
}
add_shortcode('player_5','member_top5');

// Player 6
function member_top6() {
	ob_start();
	get_template_part('team/player_6','page');
	return ob_get_clean();
}
add_shortcode('player_6','member_top6');

// Player 7
function member_top7() {
	ob_start();
	get_template_part('team/player_7','page');
	return ob_get_clean();
}
add_shortcode('player_7','member_top7');

// Player 8
function member_top8() {
	ob_start();
	get_template_part('team/player_8','page');
	return ob_get_clean();
}
add_shortcode('player_8','member_top8');

// Player 9
function member_btm1() {
	ob_start();
	get_template_part('team/player_9','page');
	return ob_get_clean();
}
add_shortcode('player_9','member_btm1');

// Player 10
function member_btm2() {
	ob_start();
	get_template_part('team/player_10','page');
	return ob_get_clean();
}
add_shortcode('player_10','member_btm2');

// Tobi
function member_tobi() {
	ob_start();
	get_template_part('team/tobi','page');
	return ob_get_clean();
}
add_shortcode('team_tobi','member_tobi');

// Player 12
function member_btm12() {
	ob_start();
	get_template_part('team/player_12','page');
	return ob_get_clean();
}
add_shortcode('player_12','member_btm12');

// Not Admin + Footer Scripts
function fire_footer() {
	if(!is_admin()) { ?>
		<script>
		// LOCK MAIN SCROLL TILL THE LAST ACTIVATION POINT
		jQuery(document).ready(function($) {
			function scrollStuck() {
				if($(window).width > 768.98) {
					$(window).scroll(function(e) {
						var hT = $('.butler-guides-section').offset().top,
							hH = $('.butler-guides-section').outerHeight(),
							wH = $(window).height(),
							wS = $(this).scrollTop();

						// YOU BETTER LISTEN
						if(wS > (hT+hH-wH+500)) {
							e.preventDefault();
							e.stopPropagation();
							$('body').css({
								'height' : hT+hH+'px',
								'overflow' : 'hidden'
							});
						} else if(wS < (hT+hH-wH)) {
							e.preventDefault();
							e.stopPropagation();
							$('body').css({
								'height' : '100%',
								'overflow' : 'visible'
							});
						} else {
							// just in case....
						}
					});
				}
			}
			// scrollStuck();
		});
		</script>

	<?php } ?> 
<?php }
do_action( 'fire_footer', 'admin_print_footer_scripts' );























