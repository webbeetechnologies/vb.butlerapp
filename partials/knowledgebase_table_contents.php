<?php
// GET URL SLUG AND GET ID AND CATEGORY ID
global $wp;
$current_url = $wp->request;
$slug = substr($current_url , strrpos($current_url , '/') + 1);

$post =  get_page_by_path($slug,  OBJECT, 'post');

$post_id = $post ? $post->ID : null;
$cat_ids = wp_get_post_categories($post_id); // can be more than 1

$main_cat = get_category_by_slug( 'knowledgebase' );

$arg = array( 'hide_empty' => false, 'parent' => $main_cat->term_id );
$cats = get_terms( 'category', $arg );
?>

<div class="kb-table-of-contents closed">
	<div class="button-view">
		<button class="toggler toggle-open">
			<img src="/wp-content/themes/entrepreneur-child/img/burger.svg" alt="toggle open">
		</button>
	</div>
	<div class="list-view">
		<div class="filter-container">
			<div class="heading-container">
				<button class="toggler toggle-close">
					<img src="/wp-content/themes/entrepreneur-child/img/kb-title.svg" alt="toggle close">
				</button>
				<h3 class="heading">Knowledge base</h3>
			</div>
			<div class="input-container">
				<input type="search" class="query" placeholder="Search" />
				<div class="clear-query"></div>
			</div>
		</div>
		<div class="list-container">
			<!-- ONE ITEM CATEGORY -->
			<?php foreach( $cats as $cat ):?>
				<?php
				$args=array(
					'posts_per_page' => 10000, // basically, all :D
					'category' => $cat->term_id
				);
				
				// $wp_query = new WP_Query( $args );
				$posts = get_posts( $args );
				$is_accordion_opened = in_array($cat->term_id, $cat_ids);

				$custom_title = get_field( 'custom_title', $cat );

				$title = $custom_title ? $custom_title : $cat->name;
				?>

				<div class="category-item accordion <?php echo $is_accordion_opened ? 'opened': ''; ?>">
					<div class="category-title accordion-title"><?php echo $title;?></div>

					<div class="category-children accordion-body">
						<ul class="post-list">
							<?php foreach ( $posts as $post ) : setup_postdata( $post ); ?>
								<?php $link = get_permalink();?>
								<?php $is_active_post = get_the_ID() == $post_id ?>
								<?php $post_title = get_the_title(); ?>
								<li class="post-item <?php echo $is_active_post ? 'active': ''; ?>" data-title="<?php echo strtolower($post_title); ?>">
									<a href="<?php echo $link;?>"><?php echo $post_title; ?></a>
								</li>
							<?php endforeach; ?>
						</ul>
					</div>
				</div>
				<?php wp_reset_query(); ?>
			<?php endforeach;?> 
			<!-- /ONE ITEM -->
		</div>
	</div>
</div>


<style>
.kb-table-of-contents {
	background: white;
	border-radius: 16px;
	padding: 16px;
	max-height: 85vh;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}

.kb-table-of-contents .toggler {
	padding: 0;
	border: none;
	background: transparent;
}

.kb-table-of-contents .list-view {
}

/* opened state, default */
.kb-table-of-contents .button-view {
	width: 0;
	height: 0;
	opacity: 0;
	transition: all 0.3s;
}

.filter-container {
	border-bottom: 1px solid #E7E9EC;
	margin: 0px -16px 10px;
    padding: 0 15px;
}

.filter-container .heading-container {
	display: flex;
}

.filter-container .heading-container {
	opacity: 1;
	color: #0B2541;
}
.filter-container .heading {
    color: #0B2541;
    font-weight: 700;
    font-size: 16px;
    margin: 0 0 0 5px;
}

.filter-container input.query {
	background: white url(/wp-content/themes/entrepreneur-child/img/kb-search.svg) 12px center no-repeat;
    border: 1px solid #E7E9EC !important;
    border-radius: 16px;
    height: 40px;
    display: flex;
    align-items: center;
    margin: 20px 0;
    padding-left: 43px;
	padding-right: 40px;
	position: relative;
    width: 100%;
    font-size: 15px;
}

.input-container {
	position: relative;
}
.input-container .clear-query {
	background: white url(/wp-content/themes/entrepreneur-child/img/kb-x.svg) center center no-repeat;
	position: absolute;
    width: 20px;
    height: 20px;
    cursor: pointer;
    right: 15px;
    top: 10px;
	transition: all 0.2s;
	opacity: 0;
}
.on-searching .input-container .clear-query {
	opacity: 1;
}

.filter-container input.query:focus-visible {
	outline: 1px solid #E7E9EC;
}

.kb-table-of-contents .list-container {
	margin-right: -15px;
    padding-right: 15px;
	overflow-y: scroll;
	flex-grow: 1;
}
.kb-table-of-contents .category-title {
	display: flex;
	align-items: center;
	padding-right: 40px;
	padding-top: 6px;
    padding-bottom: 6px;
	font-weight: bold;
	min-height: 28px;
	cursor: pointer;
	position: relative;
}

.kb-table-of-contents .category-title:after {
	background: white url(/wp-content/themes/entrepreneur-child/img/arrow-down2.svg) center center no-repeat;
	content: "";
	width: 20px;
	height: 23px;
	display: block;
	position: absolute;
	right: 0;
	transition: all 0.3s;
	transform-origin: center center;
	
}
	
.kb-table-of-contents .category-item.opened .category-title:after {
	transform: rotate(180deg);
}

.kb-table-of-contents ul.post-list {
	list-style: none;
	padding: 0;
}

.kb-table-of-contents ul.post-list .post-item {
	transition: all 0.3s;
	border-radius: 8px;
	padding: 5px 15px;
	margin: 2px 0;
	overflow: hidden;
}

.kb-table-of-contents ul.post-list .post-item.active,
.kb-table-of-contents ul.post-list .post-item:hover {
	
	background: rgb(237,33,119);
	background: linear-gradient(90deg, rgba(237,33,119,0.3) 0%, rgba(253,208,58,0.3) 100%);
	
}

.kb-table-of-contents ul.post-list .post-item a {
	font-size: 14px;
	position: relative;
	display: block;
}

.kb-table-of-contents ul.post-list .post-item.active a,
.kb-table-of-contents ul.post-list .post-item:hover a {
	color: #ED2177;
	text-decoration: none;
}

.kb-table-of-contents ul.post-list .post-item.active a {
	font-weight: bold;
	background: linear-gradient(90deg, #ED2177 0%, #F9A04B 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
}

.kb-table-of-contents ul.post-list .post-item.active a:before {
	content: "";
	width: 4px;
	border-radius: 0 2px 2px 0;
	background-color: #ED2177;
	height: 100%;
	position: absolute;
	left: -15px;
	top: 0;
}

/* ON SEARCHING... */
.kb-table-of-contents.on-searching .category-title {
	display: none;
}
.kb-table-of-contents.on-searching .accordion-body {
	display: block !important;
}

@media (min-width: 768px) {
	/* closed state ONLY IN DESKTOP */
	body.kb-table-of-contents-closed .kb-supercontainer .e-con-inner {
		gap: 0 !important;
	}

	body.kb-table-of-contents-closed .kb-table-container {
		width: 0 !important;
		padding: 0 !important;
	}

	.kb-table-of-contents.closed {
		position: absolute;
		right: 0;
	}
	.kb-table-of-contents.closed .button-view {
		width: 24px;
		height: 24px;
		opacity: 1;
	}

	.kb-table-of-contents.closed .list-view {
		width: 0;
		height: 0;
		overflow: hidden;
	}
}

</style>

<script>
var $ = jQuery;

$(document).ready(function() {
	$('.kb-table-of-contents .toggler').on('click', function() {
		if ($(this).hasClass('toggle-close')) {
			$(this).parents('.kb-table-of-contents').addClass('closed');
			$('body').addClass('kb-table-of-contents-closed');
		} else {
			$(this).parents('.kb-table-of-contents').removeClass('closed');
			$('body').removeClass('kb-table-of-contents-closed');
		}
	})
});
</script>
