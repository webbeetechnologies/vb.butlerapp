<?php 
/* 
params from shortcode:
id: int. ID of cpt post passed via var in shrotcode, and wp_query
type: string. enum['list', 'slideshow'] 
*/

$id = $args['atts'] ? strtolower($args['atts']['id']) : null;
$presentation_type = $args['atts'] ? strtolower($args['atts']['type']) : 'list';

$args = array(  
	'post_type' => 'video-functions',
	'p' => $id
);

$arr_videos = [];
$loop = new WP_Query( $args ); 

while ( $loop->have_posts() ) {
	$loop->the_post();

	if (get_field('video_items', $id)) {
		while( the_repeater_field('video_items') ) {
			$video_item = array("title" => get_sub_field('video_title'), "url" =>  get_sub_field('video_file')['url'] );
			$arr_videos[] = $video_item;
		}
	}
}	
// arr_videos ready

wp_reset_postdata();
?>

<?php if ($presentation_type == 'list') : ?>
<!-- FOREACH $arr_videos -->
<div class="video-listname-container">
	<?php if (count($arr_videos)): ?>
		<ul class="video-list list-rainbow" id="video-list-<?php echo $id; ?>" data-post-id="<?php echo $id; ?>">
		<?php $idx = 0; ?>
		<?php foreach ($arr_videos as $vid): ?>
			<li class="video-list-item list-item" data-idx="<?php echo $idx; ?>">
				<a class="link" data-video-id="123"><?php echo $vid['title']; ?></a>
			</li>
			<?php $idx++; ?>
		<?php endforeach;?>
		</ul>
	<?php endif; ?>
</div>
<?php endif; ?>
<!-- / REPEATER CPT -->

<?php if ($presentation_type == 'slider') : ?>
	<?php if (count($arr_videos)): ?>
		<div class="video-slider-container video-with-progressbar" id="video-container-<?php echo $id; ?>">
			<div class="fake-nav">
				<button class="prev" />
				<button class="next" />
			</div>
			<div class="video-carousel-v2 slick-container-v2" id="video-slider-<?php echo $id; ?>" data-post-id="<?php echo $id; ?>">
				<?php $idx = 0; ?>
				<?php foreach ($arr_videos as $vid): ?>
					<div class="video-item">
						<video controls playsinline muted>
							<source src="<?php echo $vid['url']; ?>" type="video/mp4">
						</video>
					</div>
					<?php $idx++; ?>
				<?php endforeach;?>
			</div>
		</div>
	<?php endif; ?>
<?php endif; ?>

<style>
.video-item {
	line-height: 0;
	opacity: 0;
}

.slick-slide .video-item {
	opacity: 1;
}

.video-slider-container .slick-slide {
	line-height: 0;
}

.video-with-progressbar {
	position: relative;
}

.video-with-progressbar .slick-dots {
	display: flex;
	gap: 8px;
}

.video-with-progressbar .slick-dots li {
	flex-grow: 1;
	margin: 0;
	height: 4px;
	border-radius: 2px;
	background: #E2E5E8;
	cursor: initial;
	position: relative;
}
.video-with-progressbar .video-carousel-v2 .slick-dots li button {
	width: 100%;
	height: 4px;
	background-color: transparent;
	cursor: initial;
	position: absolute;
	left: 0;
}

.video-with-progressbar .video-carousel-v2 .slick-dots li.slick-active button {
	/* progressbar */
	background-color: #ED2177;
	width: 0;
	pointer-events: none;
}

.video-with-progressbar .slick-arrow {
	display: none !important;
}

.fake-nav {
	width: 100%;
}

.fake-nav button {
	width: 64px;
    /* opacity: 0; */
    /* visibility: hidden; */
    height: 64px;
    background-color: #0B2541;
    border-radius: 22px;
    background-size: 11px;
	border: 0;
    margin-top: -32px;
    transition: all 0.3s;
    background-repeat: no-repeat;
    background-position: center;
	position: absolute;
    top: 50%;
    transition: all 0.3s;
    z-index: 1;
}

.fake-nav button.prev {
	left: -32px;
	background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'%3E%3Cpath d='M0 22L22 0l2.1 2.1L4.2 22l19.9 19.9L22 44 0 22z' fill='%23fff'/%3E%3C/svg%3E");	
}

.fake-nav button.next {
	right: -32px;
	background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'%3E%3Cpath d='M27 22L5 44l-2.1-2.1L22.8 22 2.9 2.1 5 0l22 22z' fill='%23fff'/%3E%3C/svg%3E");
}

.fake-nav button:hover {
	background-color: #1C4066;
    box-shadow: 0px 4px 14px 0px rgba(36, 70, 106, 0.6);
}

@media (max-width: 1024px) {
	.fake-nav button {
		width: 40px;
		height: 40px;
		margin-top: -15px;
		top: 50%;
		border-radius: 10px;
	}
	.fake-nav button.prev {
		left: -20px;
	}

	.fake-nav button.next {
		right: -20px;
	}
}
</style>

<?php /**********************************/?>
<?php if ($presentation_type == 'list') : ?>
<?php /**********************************/?>
<script>
var $ = jQuery;
$(document).ready(function() {
	/**********************************************************
	 *  VIDEO LIST NAMES, PLAY THE VID IS HERE
	 **********************************************************/
	$('#video-list-<?php echo $id; ?> .link').click(function(e) {
		// e.preventDefault();
		$('#video-list-<?php echo $id; ?> .active').removeClass('active');
		$(this).parent().addClass('active');

		var slideno = $(this).parent('.video-list-item').index();
		var total = $('#video-list-<?php echo $id; ?> .video-list-item').length;

		// STOP PREV VIDEO JUST IN CASE PLAYING
		var thePrevVid = $('#video-slider-<?php echo $id; ?> .slick-active video')[0];
		thePrevVid.pause();
		thePrevVid.currentTime = 0;
		
		$('#video-slider-<?php echo $id; ?>').slick('slickGoTo', slideno);

		// play the video
		if ($('#video-slider-<?php echo $id; ?> .slick-active  video').length) {
			var theVid = $('#video-slider-<?php echo $id; ?> .slick-active video')[0];
			console.log('prepare to play...');
			theVid.play();
			
			theVid.ontimeupdate = function() {
				var percentage = ( theVid.currentTime / theVid.duration ) * 100;
				
				$('#video-slider-<?php echo $id; ?> li.slick-active button').css("width", percentage+"%");
			};

			theVid.onended = function(e) {
				var idx = 0;
				if (slideno < total - 1) {
					// play next
					idx = slideno + 1;
				} else {
					// back to first vid
					idx = 0;
				}
				$('#video-list-<?php echo $id; ?> .link').eq(idx).click();
			};
		}
	});
});

</script>
<?php endif; ?>

<?php /************************************/?>
<?php if ($presentation_type == 'slider') : ?>
<?php /************************************/?>
<script>
var $ = jQuery;
$(document).ready(function() {
	$('#video-slider-<?php echo $id; ?>').on('init', function(event, slick) {
		if ($('#video-list-<?php echo $id; ?> .active').length == 0) {
			setTimeout(() => {
				$('#video-list-<?php echo $id; ?> .video-list-item:first-child .link').click();
				// pause
				var theVid = $('#video-slider-<?php echo $id; ?> .slick-active video')[0];
				theVid.pause();
			}, 1000);
		}
	});

	$("#video-slider-<?php echo $id; ?>").not('.slick-initialized').slick({
		autoplay: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		arrows: true,
	});
	
	/**********************************************************
	 *  VIDEOS SLIDER, when PREV NEXT BEFORE+AFTERCHANGE
	 **********************************************************/
	$('#video-container-<?php echo $id; ?> .fake-nav .prev').on('click', function(e) {
		var idx = $('#video-list-<?php echo $id; ?> .active').index();
		var ln = $('#video-list-<?php echo $id; ?> .video-list-item').length;

		if (idx !== 0) {
			$('#video-list-<?php echo $id; ?> .active').removeClass('.active');
			$('#video-list-<?php echo $id; ?> .video-list-item').eq(idx-1).find('a').click();
		} else {
			// loop to last vid
			$('#video-list-<?php echo $id; ?> .active').removeClass('.active');
			$('#video-list-<?php echo $id; ?> .video-list-item').eq(ln-1).find('a').click();
		}
		
	});

	$('#video-container-<?php echo $id; ?> .fake-nav .next').on('click', function(e) {
		var idx = $('#video-list-<?php echo $id; ?> .active').index();
		var ln = $('#video-list-<?php echo $id; ?> .video-list-item').length;

		if (idx != ln-1) {
			$('#video-list-<?php echo $id; ?> .active').removeClass('.active');
			$('#video-list-<?php echo $id; ?> .video-list-item').eq(idx+1).find('a').click();
		} else {
			// goto first vid
			$('#video-list-<?php echo $id; ?> .active').removeClass('.active');
			$('#video-list-<?php echo $id; ?> .video-list-item').eq(0).find('a').click();
		}
	});

	$( '#video-container-<?php echo $id; ?>').exopiteInViewPort({
		onWholeInside: function(element, inViewport) {
			// play the paused video
			var theVid = $('#video-slider-<?php echo $id; ?> .slick-active video')[0];
			console.log('onwhole inside, prepare to play');
			theVid.play();
		},
		onLeft:function(element, direction) {
			// pause the active vid
			var theVid = $('#video-slider-<?php echo $id; ?> .slick-active video')[0];
			console.log('on left prepare to pause');
			theVid.pause();
		}
    });
	
});

</script>
<?php endif; ?>