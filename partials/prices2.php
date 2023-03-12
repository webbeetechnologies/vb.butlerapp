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
				<?php if ($post_idx == 2): ?>
					<div class="pill">All in One</div>
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
				<div>
					<div class="price-container">
						<div class="price-title"><?php the_field('price_text'); ?></div>
						<div class="permonth">/ Month</div>
					</div>
					<a href="#kostenlos-popup" class="button <?php echo $post_idx == 2 ? 'blue-button' : 'white-button' ?>">
						<span class="elementor-button-icon elementor-align-icon-left">
							<svg xmlns="http://www.w3.org/2000/svg" width="28" height="21" viewBox="0 0 28 21" fill="none"><path d="M1.99722 0.673343C0.755445 1.38056 -0.00809872 2.70278 6.48122e-05 4.1318V16.9866C-0.00524462 18.4156 0.755095 19.738 1.99273 20.4523C3.23037 21.1666 4.75576 21.1635 5.99042 20.444L13.2385 16.2593L14.223 15.6898L17.1207 14.0171L17.1831 13.9796C17.488 13.7966 17.7673 13.5739 18.0136 13.3174C19.4953 11.761 19.4836 9.31233 17.9871 7.77016L15.1727 9.39482L15.6385 9.66412C15.9581 9.84808 16.1551 10.1888 16.1551 10.5576C16.1551 10.9264 15.9581 11.2671 15.6385 11.451L15.208 11.6999L14.223 12.2711L11.2628 13.9818L10.3087 14.5337L4.51035 17.8801C4.19102 18.0643 3.79769 18.0643 3.47836 17.8801C3.15904 17.6958 2.96218 17.3553 2.96186 16.9866V4.1318C2.9579 3.76199 3.15565 3.41937 3.47784 3.2378C3.63631 3.14623 3.81577 3.09719 3.99879 3.09542C4.17897 3.09629 4.35563 3.14546 4.51035 3.2378L10.2811 6.56933C10.4465 6.44425 10.6196 6.32961 10.7993 6.22608L13.2031 4.83817L5.99042 0.673343C4.757 -0.0476898 3.23064 -0.0476898 1.99722 0.673343Z" fill="url(#paint0_linear_170_2829)"></path><path d="M22.0098 0.541911L14.8992 4.64659L10.875 6.96878C10.5878 7.13429 10.3221 7.33446 10.0837 7.56478C9.29125 8.33943 8.85571 9.40812 8.88092 10.516C8.90613 11.6239 9.38983 12.6716 10.2167 13.4095L13.0974 11.7467L12.3573 11.319C12.0377 11.1351 11.8407 10.7944 11.8407 10.4256C11.8407 10.0568 12.0377 9.7161 12.3573 9.53214L12.9257 9.20103L17.8527 6.35678L23.4898 3.10085C23.6447 3.0089 23.8213 2.95994 24.0014 2.95902C24.1844 2.9604 24.3639 3.00927 24.5224 3.10085C24.8446 3.28206 25.0424 3.62459 25.0383 3.9943V16.8541C25.038 17.2228 24.8412 17.5633 24.5218 17.7475C24.2025 17.9318 23.8092 17.9318 23.4898 17.7476L18.0105 14.5843C17.883 14.6737 17.7506 14.7587 17.6137 14.8376L15.0713 16.3061L22.0098 20.3126C23.2453 21.0259 24.7676 21.0259 26.0031 20.3125C27.2386 19.5991 27.9997 18.2808 27.9996 16.8541V3.99927C28.0051 2.57032 27.2449 1.24786 26.0073 0.533516C24.7697 -0.180828 23.2443 -0.177625 22.0098 0.541911Z" fill="url(#paint1_linear_170_2829)"></path><defs><linearGradient id="paint0_linear_170_2829" x1="0" y1="21.1271" x2="19.1172" y2="21.1271" gradientUnits="userSpaceOnUse"><stop stop-color="#ED1E79"></stop><stop offset="0.85" stop-color="#FBB03B"></stop><stop offset="1" stop-color="#FBB03B"></stop></linearGradient><linearGradient id="paint1_linear_170_2829" x1="28.7687" y1="3.91491" x2="12.6625" y2="3.91491" gradientUnits="userSpaceOnUse"><stop stop-color="#29ABDC"></stop><stop offset="1" stop-color="#39B54A"></stop></linearGradient></defs></svg>
						</span>
						<span>kostenlos testen</span>
				</a>
				</div>
			</div>
			
			
		</div>
		<?php $post_idx++ ?>
		<?php endwhile; wp_reset_postdata(); ?>
	</div>
</div>
