<div id="butler_prices">
	<div class="prices-container">
		<?php $args = array(  
			'post_type' => 'price',
			'post_status' => 'publish',
			'posts_per_page' => '3',
		); ?>
		<?php $loop = new WP_Query( $args ); ?>
		<?php while ( $loop->have_posts() ) : $loop->the_post(); ?>
		<div class="price-item">
			<div class="price-title"><?php the_field('price_text'); ?></div>
			<div class="price-subheading"><?php the_field('sub_heading_description'); ?></div>
			<div class="price-footer"><?php the_field('footer_description'); ?></div>
		</div>
		<?php endwhile; wp_reset_postdata(); ?>
	</div>
</div>
