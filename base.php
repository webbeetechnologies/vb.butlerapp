<?php
if ( is_archive() || is_home() || is_front_page() || is_page() || is_search() ) {
    // Elementor 'archive' location
    if ( ! function_exists( 'elementor_theme_do_location' ) || ! elementor_theme_do_location( 'archive' ) ) {
        include "base_full_elementor.php";
    }
} elseif ( is_singular() ) {
    include "base_theme.php";
} else {
    // Elementor `404` location
    if ( ! function_exists( 'elementor_theme_do_location' ) || ! elementor_theme_do_location( 'single' ) ) {
        include "base_theme.php";
    }
}
?>