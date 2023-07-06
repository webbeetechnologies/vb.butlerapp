<?php
/*******************************************
 * ONLINE MARKETING: STORE TRACKING CODE TO COOKIE
 *******************************************/
$should_redirect = false;
$has_redirected = false;
$query_array = null;

add_action('wp', 'store_params_to_cookie', 1);
function store_params_to_cookie() {
	// constants
	$force_wp_redirect = false;
	$datetimeFormat = "Y-m-d--H-i-s";
	$cookie_name = "ba_utm";
	$date = new DateTime();
	$dateTime = $date->format($datetimeFormat);
	$timezone = $date->getTimezone();
	$timezone_name = urldecode($timezone->getName());

	$qs = $_SERVER['QUERY_STRING'];
	$cookie = $_COOKIE[$cookie_name] == null ? "" : base64_decode($_COOKIE[$cookie_name]);
	
	//ruqyah and sanitize from some evils
	$qs = urldecode($qs);
	$cookie = urldecode($cookie);

	// ***********************************
	// basis: QUERY STRING === COOKIE.
	// or, COOKIE['ba_redir'] > 3
	// redirect will be stop here
	if (($qs != "" && $cookie != "" && $qs == $cookie) || $_COOKIE['ba_redir'] > 2) {
		//reset redirect number to 0 and make it expired
		setcookie('ba_redir', 0, time() - 100, "/"); 
		return;
	} 
	// ***********************************
	parse_str($qs, $qsArray);
	parse_str($cookie, $cookieArray);

	$qsArrayUtmAndTimestamps = explode("----", $qsArray['utm_content']);
	$cookieArrayUtmAndTimestamps = explode("----", $cookieArray['utm_content']);

	// for comparison
	$qsArray2 = $qsArray;
	$cookieArray2 = $cookieArray;

	$qsArray2['utm_content'] = $qsArrayUtmAndTimestamps[0];
	$cookieArray2['utm_content'] = $cookieArrayUtmAndTimestamps[0];

	// if the general parameters are same..
	if ($qs != "" && $cookie != "" &&  serialize($qsArray2) == serialize($cookieArray2)) {
		// check the timestamp, compare which one is the latest
		$qsTimestamps = $qsArrayUtmAndTimestamps[1];
		$cookieTimestamps = $cookieArrayUtmAndTimestamps[1];

		// assumption: the longest timestamps, the latest one
		$timestamps = strlen($qsTimestamps) > strlen($cookieTimestamps) ? $qsTimestamps : $cookieTimestamps;
		$timestampsArray = explode("---", $timestamps);

		$ln = $timestamps == "" ? 0 : count($timestampsArray);

		$cleanUtm = $cookieArrayUtmAndTimestamps[0];

		if ($ln == 0) {
			$cookieArray['utm_content'] = $cleanUtm ."----V1_". $dateTime  ."_". $timezone_name;
		} else {
			$lastTimestamp = $timestampsArray[$ln-1]; // V1_2023-05-03--06-20_UTC
			$lastTimestampDateTime = explode("_", $lastTimestamp)[1]; // 2023-05-03--06-20
			$lastTimestampDate = explode("--", $lastTimestampDateTime)[0]; // 2023-05-03

			$today = new DateTime();
			$today_date = $today->format("Y-m-d");

			// prepare $queryArray

			if ($lastTimestampDate != $today_date) {
				// var_dump('different day same qs. add newstamp in utm_content');
				$newStamp = "V". strval($ln+1) ."_". $dateTime  ."_". $timezone_name;
				array_push($timestampsArray, $newStamp);

				// glue again them all as $queryArray['utm_content'];
				$timestamps = utf8_encode(implode("---", $timestampsArray));

				$cookieArray['utm_content'] = $cleanUtm ."----".$timestamps;

			} else {
				// use current cookie as qs
			}
		}
		
		$queryArray = $cookieArray;
		$force_wp_redirect = true;
	} else {
	// QS and the COOKIE are different or both empty
		if ($qs != "" && $cookie != "") {
			// use $qs as the newest url visitor wants
			// check the timestamp, compare which one is the latest
			$cleanUtm =  $qsArrayUtmAndTimestamps[0];
			$qsTimestamps = $qsArrayUtmAndTimestamps[1] == null ? "" : $qsArrayUtmAndTimestamps[1];
			
			$timestamps = $qsTimestamps;
			$timestampsArray = explode("---", $timestamps);
			$ln = $timestamps == "" ? 0 : count($timestampsArray);
			
			if ($ln == 0) {
				$qsArray['utm_content'] = $cleanUtm ."----V1_". $dateTime  ."_". $timezone_name;
			} else {
				$lastTimestamp = $timestampsArray[$ln-1]; // V1_2023-05-03--06-20_UTC
				$lastTimestampDateTime = explode("_", $lastTimestamp)[1]; // 2023-05-03--06-20
				$lastTimestampDate = explode("--", $lastTimestampDateTime)[0]; // 2023-05-03

				$today = new DateTime();
				$today_date = $today->format("Y-m-d");

				// prepare $queryArray
				if ($lastTimestampDate != $today_date) {
					// var_dump('different day same qs. add newstamp in utm_content');
					$cleanUtm = $qsArrayUtmAndTimestamps[0];

					$newStamp = "V". strval($ln+1) ."_". $dateTime  ."_". $timezone_name;
					array_push($timestampsArray, $newStamp);

					// glue again them all as $queryArray['utm_content'];
					$timestamps = utf8_encode(implode("---", $timestampsArray));

					$qsArray['utm_content'] = $cleanUtm ."----".$timestamps;

				} else {
					$qsArray['utm_content'] = $cleanUtm ."----V1_". $dateTime  ."_". $timezone_name;;
				}
			}
			$queryArray = $qsArray;
			$force_wp_redirect = true;
		} elseif ($qs == "" && $cookie != "") {
			$cookieTimestamps = $cookieArrayUtmAndTimestamps[1] == null ? "" : $cookieArrayUtmAndTimestamps[1];

			$timestamps = $cookieTimestamps;
			$timestampsArray = explode("---", $timestamps);

			$ln = $timestamps == "" ? 0 : count($timestampsArray);
			$ln = count($timestampsArray);

			$lastTimestamp = $timestampsArray[$ln-1]; // V1_2023-05-03--06-20_UTC		
			$lastTimestampDateTime = explode("_", $lastTimestamp)[1]; // 2023-05-03--06-20
			$lastTimestampDate = explode("--", $lastTimestampDateTime)[0]; // 2023-05-03
			
			$today = new DateTime();
			$today_date = $today->format("Y-m-d");

			// prepare $queryArray
			if ($lastTimestampDate != $today_date) {
				// var_dump('different day same qs. add newstamp in utm_content');
				$cleanUtm = $cookieArrayUtmAndTimestamps[0];

				$newStamp = "V". strval($ln+1) ."_". $dateTime  ."_". $timezone_name;
				array_push($timestampsArray, $newStamp);

				// glue again them all as $queryArray['utm_content'];
				$timestamps = implode("---", $timestampsArray);
				$cookieArray['utm_content'] = $cleanUtm ."----".$timestamps;

			} else {
				// do nothing, cookie will already have the V1 V2 timestamps here
			}
			$queryArray = $cookieArray;
			$force_wp_redirect = true;
		} elseif ($qs != "" && $cookie == "") {
			$qsArrayUtmAndTimestamps = explode("----", $qsArray['utm_content']);
			$cleanUtm = $qsArrayUtmAndTimestamps[0];
			$qsTimestamps = $qsArrayUtmAndTimestamps[1] == null ? "" : $qsArrayUtmAndTimestamps[1];
		
			$timestamps = $qsTimestamps;
			$timestampsArray = explode("---", $timestamps);

			$ln = $timestamps == "" ? 0 : count($timestampsArray);
			
			if ($ln == 0) {
				$qsArray['utm_content'] = $cleanUtm ."----V1_". $dateTime  ."_". $timezone_name;
			} else {
				$lastTimestamp = $timestampsArray[$ln-1]; // V1_2023-05-03--06-20_UTC
				$lastTimestampDateTime = explode("_", $lastTimestamp)[1]; // 2023-05-03--06-20
				$lastTimestampDate = explode("--", $lastTimestampDateTime)[0]; // 2023-05-03
				
				$today = new DateTime();
				$today_date = $today->format("Y-m-d");
				if ($lastTimestampDate != $today_date) {
					$newStamp = "V". strval($ln+1) ."_". $dateTime  ."_". $timezone_name;
					array_push($timestampsArray, $newStamp);
	
					// glue again them all as $queryArray['utm_content'];
					$timestamps = implode("---", $timestampsArray);
					$qsArray['utm_content'] = $cleanUtm ."----".$timestamps;
				} 
			}
			$queryArray = $qsArray;
			$force_wp_redirect = true;
		} else { // qs == "" and cookie == "", very new visitor
			$queryArray = [];
			$queryArray['utm_content'] = "----V1_". $dateTime  ."_". $timezone_name;
			$force_wp_redirect = true;
		}
	}

	/***********************************
	 * SET COOKIE AND REDIRECT IF HAS TO
	************************************/
	if ($force_wp_redirect) {
		// set new cookie, encode the val
		$location = add_query_arg($queryArray);
		$qs = explode('?', $location)[1];

		// cookie setup
		$cookie_val = base64_encode($qs);
		$expiry_length = 86400 * 365; // 86400 = 1 day

		setcookie($cookie_name, $cookie_val, time() + $expiry_length, "/"); 

		// redirect will then happen
		$GLOBALS['should_redirect'] = $force_wp_redirect;
		$GLOBALS['query_array'] = $queryArray;
		
		// count how many redirect. max is 3
		$redirect_num = $_COOKIE['ba_redir'] ?  $_COOKIE['ba_redir'] : 0;
		$redirect_num += 1;
		setcookie('ba_redir', $redirect_num, time() + $expiry_length, "/"); 
	}
}

/* APPEND PARAMS IN COOKIE TO ALL URL THROUGH WHOLE SITE */
// add_action('template_redirect', 'wprdcv_param_redirect', 2);
function wprdcv_param_redirect() {
	// make sure the redirect only happen on page and forced by cookie creation function above
	if(is_page() && $GLOBALS['should_redirect']) {
			$location = add_query_arg($GLOBALS['query_array']);
			$GLOBALS['should_redirect'] = false;

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
		wp_enqueue_style("parent-css2", get_stylesheet_directory_uri()."/css/frontpage-v2.css" );

		// Scripts
		wp_enqueue_script("child-js", get_stylesheet_directory_uri() . "/js/script.js", array( "jquery" ), "1.0", true );
		wp_enqueue_script("child-js2", get_stylesheet_directory_uri() . "/js/frontpage-v2.js", array( "jquery" ));
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

// CPT - TESTIMONIELS CAROUSEL
function testimonials_carousel_v2() {
	ob_start();
	get_template_part('partials/testimonials_carousel_v2','page');
	return ob_get_clean();
}
add_shortcode('testimonials_carousel_v2', 'testimonials_carousel_v2'); 

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
