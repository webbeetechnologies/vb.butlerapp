<div id="faqs-container">
	<h2 class="faqs-title"></h2>
	<div class="faqs-loop">
		<?php $args = array(  
			'post_type' => 'faq',
			'post_status' => 'publish',
			'posts_per_page' => -1,
			'orderby' => 'publish_date', 
			'order' => 'DESC'
		); ?>
		<!-- START THE FAQ LOOP -->
		<?php $loop = new WP_Query( $args ); ?>
		<?php while ( $loop->have_posts() ) : $loop->the_post(); ?>
		<div class="faq">
			<div class="faq-inner">
				<h3><?php the_title(); ?></h3>
				<?php $default = get_field('faq_icon'); ?>
				<div class="faq-flipper">
					<img class="faq-icon-switcher" src="<?php echo $default["url"] ?>">
				</div>
			</div>
			<!-- CONTENT AREA -->
			<div style="display:none" class="faq-content-area">
				<div class="faq-content">
					<?php the_content(); ?>
				</div>
				<div class="faq-meta">
					<h5><?php the_field('faq_name') ?></h5>
					<span>Erstberatung</span>
					<a href="<?php the_field('faq_contact_link') ?>">Kontaktieren</a>
				</div>
			</div>
		</div>
		<?php endwhile; wp_reset_postdata(); ?>
		 <!-- END THE FAQ LOOP -->
	</div>
</div>
