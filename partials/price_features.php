<div class="butler-price-features">
	<div class="features-list-table">
		<div class="d-flex header">
			<div class="title-container">
				<h3><strong>Alle Funktionen</strong> im Vergleic</h3>
				<?php  if ($args['subtitle']): ?>
					<p><?php echo $args['subtitle']; ?></p>
				<?php endif; ?>
				
			</div>
			<div class="options-container d-flex">
				<div class="option-item">
					<div class="heading basic">Basic</div>
					<a href="#kostenlos-popup" class="button white-button">
						<span>kostenlos testen</span>
					</a>
				</div>
				<div class="option-item">
					<div class="heading plus">Plus</div>
					<a href="#kostenlos-popup" class="button white-button">
						<span>kostenlos testen</span>
					</a>
				</div>
				<div class="option-item">
					<div class="heading premium">Premium</div>
					<a href="#kostenlos-popup" class="button white-button">
						<span>kostenlos testen</span>
					</a>
				</div>
			</div>
		</div>
		<div class="features-container">
			<?php // GET FIRST 5 POSTS ?>
			<?php $args = array(  
				'post_type' => 'price-features',
				'post_status' => 'publish',
				'posts_per_page' => '5',
			); ?>
			<?php $loop = new WP_Query( $args ); ?>
			<?php $post_idx = 0; while ( $loop->have_posts() ) : $loop->the_post(); ?>
				<div class="d-flex feature-item">
					<div class="title-container">
						<h3><?php the_title() ?></h3>
						<div class="description"><?php the_content() ?></div>
					</div>
					<div class="options-container d-flex">
						<?php $options = get_field('available_in') ?>
						<div class="option-item">
							<?php if( $options && in_array('BASIC', $options) ): ?>
								<div class="checked">Yes</div>
							<?php else: ?>
								<div class="empty"></div>
							<?php endif; ?>
						</div>
						<div class="option-item">
							<?php if( $options && in_array('PLUS', $options) ): ?>
								<div class="checked">Yes</div>
							<?php else: ?>
								<div class="empty"></div>
							<?php endif; ?>
						</div>
						<div class="option-item">
							<?php if( $options && in_array('PREMIUM', $options) ): ?>
								<div class="checked">Yes</div>
							<?php else: ?>
								<div class="empty"></div>
							<?php endif; ?>
						</div>
					</div>
				</div>
				<?php $post_idx++ ?>
			<?php endwhile; wp_reset_postdata(); ?>
		</div>
		
		<?php // GET THE REST POSTS IF ANY ?>
		<?php $args2 = array(  
				'post_type' => 'price-features',
				'post_status' => 'publish',
				'offset' => '5',
		); ?>
		<?php $loop2 = new WP_Query( $args2 ); ?>
		<?php if ($loop2->have_posts()): ?>
			<div class="features-container more-features-list" style="display:none">	
				<?php $post_idx = 0; while ( $loop2->have_posts() ) : $loop2->the_post(); ?>
					<div class="d-flex feature-item">
						<div class="title-container">
							<h3><?php the_title() ?></h3>
							<div class="description"><?php the_content() ?></div>
						</div>
						<div class="options-container d-flex">
							<?php $options = get_field('available_in') ?>
							<div class="option-item">
								<?php if( $options && in_array('BASIC', $options) ): ?>
									<div class="checked">Yes</div>
								<?php else: ?>
									<div class="empty"></div>
								<?php endif; ?>
							</div>
							<div class="option-item">
								<?php if( $options && in_array('PLUS', $options) ): ?>
									<div class="checked">Yes</div>
								<?php else: ?>
									<div class="empty"></div>
								<?php endif; ?>
							</div>
							<div class="option-item">
								<?php if( $options && in_array('PREMIUM', $options) ): ?>
									<div class="checked">Yes</div>
								<?php else: ?>
									<div class="empty"></div>
								<?php endif; ?>
							</div>
						</div>
					</div>
					<?php $post_idx++ ?>
				<?php endwhile; wp_reset_postdata(); ?>
			</div>
		<?php endif; ?>
	</div>
	<div class="container text-center">
		<?php if ($loop2->have_posts()): ?>
			<a href="#" class="alle-funktionen show-more">
				<span>Alle Funktionen</span>
			</a>

			<p>** Wenn du die SMS-Terminerinnerungen nutzen möchtest, gib uns einfach Bescheid und wir schalten die Funktion für dich frei. Der Preis beträgt 0,08€ pro SMS.</p>
		<?php endif; ?>
	</div>
</div>