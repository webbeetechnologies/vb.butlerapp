<style>
.timeline-container {
	display: flex;
	flex-direction: row;
	gap: 40px;
	max-height: 100%;
}
.timeline-container .timeline-year {
	flex-grow: 0;
	width: 100px;
	border-right: 3px solid #D3D8DC;
}

.timeline-container .timeline-year .knobbar {
	position: absolute;
    right: -10px;
    padding-right: 25px;
	transition: all 0.3s;
}

.timeline-container .timeline-year .progressbar {
	top: 0;
	right: 0;
	position: absolute;
	border-right: 3px solid #0B2541;
	transition: all 0.3s;
}
.timeline-container .timeline-year .knobbar .year-label {
	margin-top: -1px;
    font-size: 13px;
    font-weight: bold;
}

.timeline-container .timeline-year .knobbar .knob {
	display: block;
    width: 15px;
    height: 15px;
    background: #0B2541;
    position: absolute;
    right: 4px;
    border-radius: 2px;
    top: 0px;
}

.timeline-container .timeline-body {
	overflow-y: auto;
}

.timeline-item {
    margin-bottom: 30px;
}

.timeline-container .img-container {
	border-radius: 20px;
	max-width: 100%;
	background-size: cover;
	padding-top: 40%;
}

.timeline-item .title {
    font-size: 30px;
    font-weight: 600;
}

.timeline-container .mCSB_inside > .mCSB_container {
	margin-right: 70px;
}
.timeline-container .mCSB_draggerRail {
	display: none;
}

.timeline-container .mCSB_draggerContainer .year {
	position: absolute;
    right: 20px;
    font-size: 14px;
    top: -3px;
}

.timeline-container .mCSB_draggerContainer .active-bar {
	content: "";
	position: absolute;
	width: 2px;
	display: block;
	top: 0;
	background-color: #0B2541;
	margin-left: 7px;
}

.timeline-container .mCSB_draggerContainer:after {
	content: "";
	width: 2px;
    height: 100%;
	background-color: rgba(0,0,0,0.15);
	display: block;
	margin-left: 7px;
}

.timeline-container .mCSB_dragger .mCSB_dragger_bar {
	background-color: #0B2541 !important;
    border-radius: 4px;
}
</style>

<div class="timeline-container">
	<?php $args = array(  
		'post_type' => 'timelines',
		'post_status' => 'publish',
		'posts_per_page' => -1,
		'order' => 'DESC'
	); 
	$loop = new WP_Query( $args );
	
	$timelines = array();
	while ( $loop->have_posts() ) {
		$loop->the_post();
		$year = get_field("year_label");

		$item = array(
			'title' => get_the_title(),
			'content' => get_the_content(),
			'image' => wp_get_attachment_url(get_post_thumbnail_id(get_the_ID())),
			'year' => $year,
		);
		
		$timelines[$year][] = $item;
	};
	wp_reset_postdata();

	$allKeys = array_keys($timelines);
	$first_year = $allKeys[0];
	?>

	<div class="timeline-body">
		<div class="inner">
			<?php foreach($timelines as $key => $items): ?>
				<div id="year-<?php echo $key; ?>" class="timeline-group" data-year="<?php echo $key; ?>">
					<?php foreach($items as $timeline): ?>
						<div class="timeline-item">
							<?php if ($timeline['image']): ?>
								<div class="img-container" style="background-image: url('<?php echo $timeline['image']?>');">
								</div>
							<?php endif; ?>
							<h3 class="title"><?php echo $timeline['title']; ?></h3>
							<div class="content"><?php echo $timeline['content']; ?></div>
						</div>
					<?php endforeach; ?>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</div>

<script>
function update_container_info(container = $('.timeline-body'), topPos, direction) {
	var visible_rows = [];
	
	var c_height 				= container.height() || 0;
	var c_scrollTop 			= topPos; // container.scrollTop() || 0;

	if ($('.timeline-group').length) {
		var active_year = '';
		$('.timeline-group').each(function() {
			var row_id 				= $(this).attr('id');
			var row_year 			= $(this).data('year');
			
			var r_position			= $(this).position();
			var r_height			= $(this).outerHeight();
			var r_position_top 		= topPos + r_position.top;
			var r_position_bottom 	= r_position_top + r_height;

			// Simple compare. 
			// If the row bottom is less than 0 then the user has scrolled past that item. 
			// If the row top is greater than the container height then the row is still below the scroll
			/*
			console.log('*****************');
			console.log(row_year);
			console.log('*****************');
			console.log('BOTTOM', r_position_bottom);
			console.log('TOP', r_position_top);
			console.log('ITEM HEIGHT', r_height);
			*/

			if ((r_position_bottom < 0)	|| (r_position_top > c_height)) {
				$(this).data('visible', 'N');	
			} else {
				$(this).data('visible', 'Y');						
				visible_rows[visible_rows.length] = row_year;
				active_year = row_year;
			}
		});
		// depends on the scroll direction, if down, get the last item, 
		// if up, get the first item
		if (direction == 'down') {
			active_year = visible_rows[visible_rows.length - 1];
		} else {
			active_year = visible_rows[0];
		}
		$('.mCSB_dragger .year').text(active_year);
	}
	
}

(function($){
	$(window).on("load",function(){
		var posY = 0;
		$(".timeline-container").mCustomScrollbar({
			theme: "rounded-dark",
			callbacks:{
				onScrollStart:function(){ 
					posY = this.mcs.top;
				 },
				whileScrolling: function() { 
					var container = $('.timeline-container');
					var contentPos = this.mcs.top;
					var direction = contentPos < posY ? 'down' : 'up';

					$('.timeline-container .mCSB_draggerContainer .active-bar').css('height', this.mcs.topPct+"%");
					update_container_info(container, contentPos, direction);
				}
			}
		});

		if (! $('.timeline-container .mCSB_draggerContainer .active-bar').length) {
			$('.timeline-container .mCSB_draggerContainer').prepend("<div class='active-bar' />");
		}

		if (! $('.mCSB_dragger .year').length) {
			$('.mCSB_dragger').prepend("<div class='year'><?php echo $first_year ?></div>")
		}
	});

})(jQuery);
</script>