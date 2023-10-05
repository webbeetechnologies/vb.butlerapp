<div class="industries-carousel-container">
	<?php 
	$args = array(  
			'post_type' => 'branchen-list',
			'post_status' => 'publish',
	); 
	$loop = new WP_Query( $args );

	// create array
	$post_idx = 0;
	$industries = array();

	while ( $loop->have_posts() ) {
		$loop->the_post();
		$item = array(
			'title' => get_the_title(),
			'content' => get_the_content(),
			'url' => get_field('url'),
            'image' => wp_get_attachment_url(get_post_thumbnail_id(get_the_ID()))
		);
		
        $industries[] = $item;
	};
	wp_reset_postdata();
	?>
    <div class="slider">
        <?php foreach ( $industries as $item ) :?>
        <div class="industry-item">
            <div class="inner">
                <div class="image-container">
                    <a href="<?php echo $item['url']; ?>">
                        <img src="<?php echo $item['image']; ?>" />
                    </a>
                </div>
                <h3 class="heading">
                    <a href="<?php echo $item['url']; ?>"><?php echo $item['title']; ?></a>
                </h3>
                <div class="desc">
                    <?php echo $item['content']; ?>
                </div>
                <div class="link">
                    <a href="<?php echo $item['url']; ?>">
                        <span class="elementor-button-content-wrapper">
                            <span class="elementor-button-text">Weiter lesen</span>
                            <span class="elementor-button-icon elementor-align-icon-right">
                                <svg aria-hidden="true" class="e-font-icon-svg e-fas-arrow-right" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path></svg>
                            </span>
                        </span>
                    </a>
                </div>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
</div>

<style>
.industries-carousel-container {
    overflow: hidden;
}

.industries-carousel-container .slider {
    margin: 0 -15px;
    display: none;
}

.industries-carousel-container .slider.slick-initialized {
    display: block;
}

.image-container {
    background-color: #cccccc;
    border-radius: 32px;
    position: relative;
    padding-top: 56%;
    overflow: hidden;
}

.image-container img {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
}

.industries-carousel-container .industry-item .inner {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 14px;
    min-height: 440px;
}
.industry-item h3.heading {
    color: #0B2541;
    font-size: 20px;
    font-weight: 600;
    margin: 0;
    min-height: 56px;
}

.industry-item .desc {
    font-size: 15px;
    flex-grow: 1;
}

.industry-item .link a:hover {
    text-decoration: underline;
}

.industry-item .elementor-button-content-wrapper {
    display: inline-flex;
    font-size: 15px;
    font-weight: bold;
}
.elementor-align-icon-right {
    order: 15;
    margin-left: 10px;
}

@media (max-width: 1024px) {
    .industries-carousel-container {
        padding: 0 20px;
    }
}

@media (max-width: 640px) {
    .industries-section .carousel-controller.mobile {
        margin-top: 22%;
    }
}

@media (max-width: 480px) {
    .industries-section .carousel-controller.mobile {
        margin-top: 20%;
    }
}

@media (max-width: 360px) {
    .industries-section .carousel-controller.mobile {
        margin-top: 18%;
    }
}
</style>

<script>
var $ = jQuery;

$(document).ready(function() {
    $('.industries-carousel-container .slider').slick({
        slidesToShow: 4,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            }
        ]
    });
});
</script>