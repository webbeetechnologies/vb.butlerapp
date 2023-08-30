<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" <?php language_attributes(); ?>> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" <?php language_attributes(); ?>> <!--<![endif]-->
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="alternate" type="application/rss+xml" title="<?php echo sanitize_text_field(get_bloginfo('name')); ?> Feed" href="<?php echo esc_url(home_url('/')); ?>/feed/">
  <?php if (is_front_page()) : ?>
    <link rel="preload" href="/wp-content/uploads/2023/07/Kristina_quiz_bg.webp" as="image">
    <link rel="preload" href="/wp-content/uploads/2023/07/butlerapp_team_2-scaled.webp" as="image">
  <?php endif; ?>

  <!-- Head -->
  <link
    rel="stylesheet"
    href="/css/swiper_4.5.0.min.css"
    media="print"
    onload="this.media='all'; this.onload = null"
  >
<?php wp_head(); ?>
</head>