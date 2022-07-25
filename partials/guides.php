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
		<?php if ( $loop->have_posts() ) : while ( $loop->have_posts() ) : $loop->the_post(); ?>
		<div>
			<span><?php the_field('guide_val'); ?></span>
			<a href=""><?php the_title(); ?></a>
		</div>
		 <?php endwhile; 
		 wp_reset_postdata();
		 else : ?>
		 <!-- DO SOMETHING -->
		 <?php endif; ?>
	</div>
	<div class="b-guides">
		<?php if ( $loop->have_posts() ) : while ( $loop->have_posts() ) : $loop->the_post(); ?>
		<div class="guide" data-id="<?php the_field('guide_val'); ?>">
			<h5><?php the_title(); ?></h5>
			<div class="vid-container">
				<video width="675" height="381" controls poster="<?php the_field('video_thumb') ?>">
					<?php $file = get_field('video_link'); ?>
					<div class="video--link" style="display:none"><?php echo $file['url'] ?></div>
				</video>
			</div>
			<div class="the-content"><?php the_content(); ?></div>
			<a class="lmore-link" href="<?php the_permalink(); ?>">Learn More</a>
		</div>
		<?php endwhile; 
		 wp_reset_postdata();
		 else : ?>
		 <!-- DO SOMETHING -->
		 <?php endif; ?>
	</div>
</div>
<div id="bm-guides">
	<div class="bm-container">
		<?php if ( $loop->have_posts() ) : while ( $loop->have_posts() ) : $loop->the_post(); ?>
		<div class="bm-filter">
			<div class="bm-head">
				<span><?php the_field('guide_val'); ?></span>
				<a href=""><?php the_title(); ?></a>
			</div>
			<div class="bm-guide" data-id="<?php the_field('guide_val'); ?>">
				<video controls poster="<?php the_field('video_thumb') ?>">
					<?php $file = get_field('video_link'); ?>
					<div class="video--link" style="display:none"><?php echo $file['url'] ?></div>
				</video>
				<div class="the-content"><?php the_content(); ?></div>
				<a class="lmore-link" href="<?php the_permalink(); ?>">Learn More</a>
			</div>
		</div>
		<?php endwhile; 
		 wp_reset_postdata();
		 else : ?>
		 <!-- DO SOMETHING -->
		 <?php endif; ?>
	</div>
</div>