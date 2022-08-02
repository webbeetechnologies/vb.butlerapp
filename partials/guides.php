<div id="butler_guides">
	<div class="b-filters">
		<?php $args = array(  
			'post_type' => 'guide',
			'post_status' => 'publish',
			'posts_per_page' => -1,
			'meta_key' => 'guide_val',
			'orderby' => 'meta_value_num', 
			'order' => 'ASC'
		); ?>
		<?php $loop = new WP_Query( $args ); ?>
		<?php while ( $loop->have_posts() ) : $loop->the_post(); ?>
		<div order-no='<?= the_field('guide_val'); ?>'>
			<span><?php the_field('guide_val'); ?></span>
			<a href=""><?php the_title(); ?></a>
		</div>
		<?php endwhile; wp_reset_postdata(); ?>
	</div>
	<div class="b-guides">
		<?php while ( $loop->have_posts() ) : $loop->the_post(); ?>
		<div class="guide" data-id="<?php the_field('guide_val'); ?>">
			<h5><?php the_title(); ?></h5>
			<div class="vid-container">
				<video width="675" height="381" controls poster="<?php the_field('video_thumb') ?>">
					<?php $file = get_field('video_link'); ?>
					<source src="<?= $file['url'] ?>" type="video/mp4">
				</video>
			</div>
			<div class="the-content"><?php the_content(); ?></div>
			<a class="lmore-link" href="<?php the_permalink(); ?>">Learn More</a>
		</div>
		<?php endwhile; wp_reset_postdata(); ?>
	</div>
</div>
<div id="bm-guides">
	<div class="bm-container">
		<?php while ( $loop->have_posts() ) : $loop->the_post(); ?>
		<div class="bm-filter">
			<div class="bm-head">
				<span><?php the_field('guide_val'); ?></span>
				<a href=""><?php the_title(); ?></a>
			</div>
			<div class="bm-guide" data-id="<?php the_field('guide_val'); ?>">
				<video controls poster="<?php the_field('video_thumb') ?>">
					<?php $file = get_field('video_link'); ?>
					<source src="<?= $file['url'] ?>" type="video/mp4">
				</video>
				<div class="the-content"><?php the_content(); ?></div>
				<a class="lmore-link" href="<?php the_permalink(); ?>">Learn More</a>
			</div>
		</div>
		<?php endwhile; wp_reset_postdata(); ?>
	</div>
</div>