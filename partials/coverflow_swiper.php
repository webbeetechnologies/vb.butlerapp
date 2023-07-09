<section class="coverflow-container">
  <?php 
  $cat_name = $args['atts']['category'];
  $args = array(  
    'post_type' => 'coverflow-swiper',
    'post_status' => 'publish',
    'tax_query' => $cat_name != null ? array(
      array(
          'taxonomy' => 'category',   // taxonomy name
          'field' => 'name',          // term_id, slug or name
          'terms' => $cat_name,       // term id, term slug or term name
      )
    ) : null,
  ); 
  
  $loop = new WP_Query( $args );

	// create array, so it's easier to call twice
	$post_idx = 0;
	$swiper_items = array();
	while ( $loop->have_posts() ) {
		$loop->the_post();
		$item = array(
			'title' => get_the_title(),
			'swiper_image' => get_field('swiper_image'),
			'content' => get_the_content(),
		);
		$swiper_items[] = $item;
	};
	wp_reset_postdata();
  ?>

  <!-- IMAGES COVERFLOW SWIPER -->
  <?php if (count($swiper_items) > 0): ?>
  <div class="swiper-coverflow-container loading">
    <div class="swiper-wrapper">
      <?php foreach ( $swiper_items as $item ) :?>
        <div class="swiper-slide" style="background-image:url(<?php echo $item['swiper_image']['url']; ?>">
          <img src="<?php echo $item['swiper_image']['url']; ?>" alt="<?php echo $title; ?>" class="entity-img" />
        </div>
      <?php endforeach; ?>
    </div>
    
    <!-- If we need pagination -->
    <div class="swiper-pagination-old"></div>
    <!-- If we need navigation buttons -->
    <div class="swiper-button-prev swiper-button-white"></div>
    <div class="swiper-button-next swiper-button-white"></div>
  </div>

  <!-- TEXT SWIPER FADE-OUT -->
  <div class="swiper-text-container loading">
    <div class="swiper-wrapper">
      <?php foreach ( $swiper_items as $item ) :?>
        <div class="swiper-slide">
          <div class="content" data-swiper-parallax="-90%" data-swiper-parallax-scale=".7">
            <div class="inner">
              <h3 class="title"><?php echo $item['title']; ?></h3>
              <span class="caption"><?php echo $item['content']; ?></span>
            </div>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
  <?php endif; // (count($swiper_items) > 0) ?>
</div>