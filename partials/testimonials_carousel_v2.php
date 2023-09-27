<div class="testimonials-carousel-container">
	<?php 
	// category can be 'customer' or 'employee'
	$cat_name = $args['atts'] ? strtolower($args['atts']['category']) : null;
	$args = array(  
			'post_type' => 'testimonials',
			'post_status' => 'publish',
	); 
	$loop = new WP_Query( $args );

	// create array, so it's easier to call twice
	$post_idx = 0;
	$testimonials = array();

	while ( $loop->have_posts() ) {
		$loop->the_post();
		$item = array(
			'title' => get_the_title(),
			'customer_picture' => get_field('customer_picture'),
			'rating_image' => get_field('rating_image'),
			'position' => get_field('position'),
			'organisation_name' => get_field('organisation_name'),
			'organisation_url' => get_field('organisation_url'),
			'content' => get_the_content(),
			'testimonial_group' => get_field('testimonial_group'),
		);
		$filter = in_array($cat_name, $item['testimonial_group']);
		if ($filter) {
			$testimonials[] = $item;
		}
	};
	wp_reset_postdata();
	?>

	<div class="slider slider-nav photos">
		<?php foreach ( $testimonials as $testi ) :?>
			<div class="item photo">
				<?php $title = $testi['title']; ?>
				<?php $img = $testi['customer_picture']; ?>
				<img src="<?php echo $testi['customer_picture']['url']; ?>" alt="<?php echo $title; ?>">
			</div>
		<?php endforeach; ?>
	</div>

	<div class="slider slider-for texts">
		<?php foreach ( $testimonials as $testi ) :?>
			<?php $title = $testi['title']; ?>
			<?php $position = $testi['position']; ?>
			<?php $content = $testi['content']; ?>
			<?php $rating_image = $testi['rating_image'] ? $testi['rating_image']['url'] : ""; ?>

			<div class="item">
				<?php if ($rating_image != ""): ?>
					<div class="rating">
						<img src="<?php echo $rating_image; ?>" alt="rating">
					</div>
				<?php endif; ?>
				<h3><?php echo $title; ?></h3>
				<div class="position"><?php echo $position; ?></div>
				<div class="testimonial"><?php echo $content; ?></div>
			</div>
		<?php endforeach; ?>
	</div>
</div>
