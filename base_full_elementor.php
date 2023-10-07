<?php
$sticky_header = get_theme_mod( 'themo_sticky_header', true );
if ($sticky_header == true){
    add_filter( 'body_class', function( $classes ) {
        return array_merge( $classes, array( 'th-sticky-header' ) );
    } );
}
include roots_template_path();

get_template_part('templates/interactivemap_popover');
?>