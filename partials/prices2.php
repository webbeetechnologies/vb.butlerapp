<div id="butler_prices-v2">

	<div class="prices-container-v2">
		<?php $args = array(  
			'post_type' => 'price',
			'post_status' => 'publish',
			'posts_per_page' => '3',
		); ?>
		<?php $loop = new WP_Query( $args ); ?>
		<?php $post_idx = 0; while ( $loop->have_posts() ) : $loop->the_post(); ?>
		<div class="price-item-v2 <?php echo $post_idx == 2 ? 'last-child':'' ?>">
			<div class="heading-container">
				<h2><?php the_title() ?></h2>
				<?php if (get_field('badge_text')): ?>
					<div class="pill" <?php if (get_field('badge_color')): ?>style="background-color:<?php the_field("badge_color")?>"<?php endif;?>><?php the_field('badge_text'); ?></div>
				<?php endif; ?>
			</div>
			<div class="description"><?php the_content() ?></div>
			<div class="features">
				<?php while( the_repeater_field('features') ): ?>
					<div class="feature-item">
						<div class="feature-text"><?php the_sub_field('feature_text'); ?></div>
					</div>
				<?php endwhile; ?>
			</div>
			<div class="price-footer">
				<?php the_field("footer_container"); ?>
			</div>
			
			
		</div>
		<?php $post_idx++ ?>
		<?php endwhile; wp_reset_postdata(); ?>
	</div>
</div>
