<?php
/*******************************************
 * ONLINE MARKETING: STORE TRACKING CODE TO COOKIE
 *******************************************/
$should_redirect = false;
$has_redirected = false;

// add_action('wp', 'store_params_to_cookie', 1);
function store_params_to_cookie() {
	$force_wp_redirect = false;
	$datetimeFormat = "Y-m-d--H-i-s";
	$cookie_name = "ba_utm";
	$date = new DateTime();
	$dateTime = $date->format($datetimeFormat);
	$timezone = $date->getTimezone();

	if ($GLOBALS['has_redirected']) return;
	if (!is_page()) return;
	
	// datetime and timezone pattern:
	// [real_utm_content]----V1_[date]--[time]_[timezone]---V2_[date]--[time]_[timezone]---V3_[date]--_[timezone]
	// [date] format: "Y-m-d"
	// [time] format: "H-i-s"

	// determine which value we use, query_string vs cookie
	// prepare $queryArray based on that
	if ($_SERVER['QUERY_STRING'] && isset($_COOKIE[$cookie_name])) {
		// var_dump('yes qs, yes cookie');
		// check if it's same
		parse_str($_SERVER['QUERY_STRING'], $qsArray);
		$cookieDecode = base64_decode($_COOKIE[$cookie_name]);
		parse_str($cookieDecode, $cookieArray);

		$qsArrayCleanUtm = is_null($qsArray['utm_content']) ? "" : explode("----", $qsArray['utm_content'])[0];
		$cookieArrayCleanUtm = explode("----", $cookieArray['utm_content'])[0];
		
		$qsArray['utm_content'] = $qsArrayCleanUtm;
		$cookieArray['utm_content'] = $cookieArrayCleanUtm;

		if (http_build_query($qsArray) == http_build_query($cookieArray)) {
			// if same, use cookie as qs
			// $qs_website = base64_decode($_COOKIE[$website_params_cookie_name]);
			parse_str($cookieDecode, $queryArray);

			// now compare date with today
			$cleanUtmAndTimestamps = explode("----", $queryArray['utm_content']);
			$cleanUtm = $cleanUtmAndTimestamps[0];
			$utm_timestamps = $cleanUtmAndTimestamps[1];

			// no different..just add new date in utm_content and update cookie
			$contentArray = explode("---", $utm_timestamps);
			// var_dump($contentArray);
			$ln = count($contentArray);
			
			// get the last version's dateTime
			$lastTimestamp = explode("_", $contentArray[$ln-1])[1]; // string format Y-m-d--H-i-s
			$lastTimestampDate = explode("--", $lastTimestamp)[0]; // string eg: 2023-04-28
			
			$today = new DateTime();
			$today_date = $today->format("Y-m-d");
			
			if ($lastTimestampDate != $today_date) {
				// var_dump('different day same qs. add newstamp in utm_content');
				$newStamp = "V". strval($ln+1) ."_". $dateTime ."_". $timezone->getName();

				array_push($contentArray, $newStamp);
				// glue again them all as $queryArray['utm_content'];
				$queryArray['utm_content'] = $cleanUtm ."----". implode("---", $contentArray);
			} else {
				// same qs with cookie with all the timestamp with today
				// var_dump('same day, same qs, keep same queryarray');
				// do nothing, still use exact $queryArray
			}
			$force_wp_redirect = true;
		} else {
			parse_str($_SERVER['QUERY_STRING'], $queryArray);
			$cleanUtmContent = explode("----", $queryArray['utm_content'])[0];
			$queryArray['utm_content'] = $cleanUtmContent ."----V1_". $dateTime ."_". $timezone->getName();

			// no need to redirect
		}
	} elseif ($_SERVER['QUERY_STRING'] == "" && $_COOKIE[$cookie_name]) {
		$qs = base64_decode($_COOKIE[$cookie_name]);
		parse_str($qs, $queryArray);

		// add timestamp in the cookie queryArray
		// get the last version's dateTime
		$cleanUtmAndTimestamps = explode("----", $queryArray['utm_content']);
		$cleanUtm = $cleanUtmAndTimestamps[0];
		$timestamps = $cleanUtmAndTimestamps[1];

		$contentArray = explode("---", $timestamps);
		$ln = count($contentArray);

		$lastTimestamp = explode("_", $contentArray[$ln-1])[1]; // string format Y-m-d--H-i-s
		$lastTimestampDate = explode("--", $lastTimestamp)[0]; // string eg: 2023-04-28
		
		$today = new DateTime();
		$today_date = $today->format("Y-m-d");
		
		// prepare $queryArray
		if ($lastTimestampDate != $today_date) {
			// var_dump('different day same qs. add newstamp in utm_content');
			$newStamp = "V". strval($ln+1) ."_". $dateTime  ."_". $timezone->getName();
			array_push($contentArray, $newStamp);
			// glue again them all as $queryArray['utm_content'];
			$timestamps = implode("---", $contentArray);
			$queryArray['utm_content'] = $cleanUtm ."----".$timestamps;
		} else {
			// do nothing, date still same
		}
		$force_wp_redirect = true;
		
	} elseif ($_SERVER['QUERY_STRING'] && $_COOKIE[$cookie_name] == "") {
		// var_dump('yes qs, no cookie');
		parse_str($_SERVER['QUERY_STRING'], $queryArray);
		$cleanUtm = explode("----", $queryArray['utm_content'])[0];
		$queryArray['utm_content'] = $cleanUtm ."----V1_". $dateTime ."_". $timezone->getName();
	} else {
		// prepare empty array
		$queryArray = array();
		$queryArray['utm_content'] = "----V1_". $dateTime ."_". $timezone->getName();
		$force_wp_redirect = true;
	}

	// stringify before store as cookie
	$qs = http_build_query($queryArray);
	// cookie setup
	$cookie_val = base64_encode($qs);
	$expiry_length = 86400 * 365; // 86400 = 1 day

	setcookie($cookie_name, $cookie_val, time() + $expiry_length, "/"); 
	$GLOBALS['should_redirect'] = $force_wp_redirect;
}

/* APPEND PARAMS IN COOKIE TO ALL URL THROUGH WHOLE SITE */
// add_action('template_redirect', 'wprdcv_param_redirect', 2);
function wprdcv_param_redirect() {
	$cookie_name = "ba_utm";
	$qs = base64_decode($_COOKIE[$cookie_name]);
	parse_str($qs, $queryArrayCookie); 
	/*
	var_dump($GLOBALS['should_redirect']);
	var_dump($_SERVER['QUERY_STRING']);
	var_dump(isset($_COOKIE[$cookie_name]));
	var_dump(!$GLOBALS['should_redirect'] && isset($_COOKIE[$cookie_name]) && !$_SERVER['QUERY_STRING']);
	*/
	if($GLOBALS['should_redirect'] || (isset($_COOKIE[$cookie_name]) && !$_SERVER['QUERY_STRING'])) {
			$location = add_query_arg($queryArrayCookie);
			$GLOBALS['should_redirect'] = false;
			$GLOBALS['has_redirected'] = true;

			wp_redirect($location);
			exit;
	}
}
// ONLINE MARKETING END

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
	wp_enqueue_script( 'carousel-js', get_stylesheet_directory_uri() . '/js/plugins/slick/slick.min.js', ['jquery'], true );
}

// scrollToFixed
add_action( 'wp_enqueue_scripts', 'jquery_scroll_to_fixed_scripts' );
function jquery_scroll_to_fixed_scripts() {
	wp_enqueue_script( 'scrolltofixed-js', get_stylesheet_directory_uri() . '/js/plugins/scrollToFixed/scrollToFixed.js', ['jquery'], true );
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
function butler_prices2($atts, $content = null) {
	ob_start();
	get_template_part('partials/prices2','page', array('atts'=>$atts));
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

// danke page: send analytics to trusted
function phpcode_trusted_api() {
	ob_start();
	get_template_part('partials/trusted_api','page');
	return ob_get_clean();
}
add_shortcode('trusted_api', 'phpcode_trusted_api'); 

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























