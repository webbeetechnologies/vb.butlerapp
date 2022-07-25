<?php $args = array(  
	'post_type' => 'team',
	'post_status' => 'publish',
	'posts_per_page' => -1
); ?>

<!-- START THE QUERY -->
<?php $tm = new WP_Query( $args ); ?>
<?php if ( $tm->have_posts() ) : while ( $tm->have_posts() ) : $tm->the_post(); ?>
<div id="<?php echo get_the_ID() ?>" class="team-card-container">
	<div class="team-head">
		<?php $ti = get_field('team_img') ?>
		<img src="<?php echo $ti['url'] ?>">
		<div class="th-right">
			<h3 class="t-name"><?php the_title(); ?></h3>
			<span class="t-designation"><?php the_field('team_designation'); ?></span>
		</div>
	</div>
	<div class="team-body">
		<?php the_content(); ?>
		<a href="<?php the_field('team_link') ?>">Contact Sales Executive</a>
	</div>
</div>
<?php endwhile; 
wp_reset_postdata();
else : ?>
<!-- DO SOMETHING -->
<?php endif; ?>
<!-- END THE QUERY -->