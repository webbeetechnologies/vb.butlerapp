<div id="faqs-container" class="faq-v2-container">
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
		<div class="faq faq-v2">
			<div class="faq-inner">
				<?php $default = get_field('faq_icon'); ?>
				<div class="faq-flipper">
					<div class="image-popup-container">
						<img class="faq-icon-switcher" src="<?php echo $default["url"] ?>">
						<!-- POPUP AREA -->
						<div class="faq-popup-area">
							<div class="faq-meta">
								<h5><?php the_field('faq_name') ?></h5>
								<span><?php the_field('faq_position') ?></span>
								<a href="<?php the_field('faq_contact_link') ?>">Kontaktieren </a>
							</div>
						</div>
					</div>
				</div>
				<div class="heading-content-area">
					<h3><?php the_title(); ?></h3>
					<!-- content area -->
					<div>
						<div class="faq-content-area">
							<div class="faq-content-v2">
								<?php the_content(); ?>
							</div>
							<div class="faq-footer">
								<div>
									<h5><?php the_field('faq_name') ?></h5>
									<div class="position"><?php the_field('faq_position') ?></div>
								</div>
								<div>
									<a href="<?php the_field('faq_contact_link') ?>">Kontaktieren <i class="fas fa-arrow-right"></i></a>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="faq-arrow-flipper">
					<i class="fas fa-chevron-down"></i> 
				</div>
			</div>
		</div>
		<?php endwhile; wp_reset_postdata(); ?>
		 <!-- END THE FAQ LOOP -->
	</div>
</div>
