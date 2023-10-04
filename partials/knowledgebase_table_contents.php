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

<div class="kb-table-of-contents">
	<div class="filter-container">
		<h3 class="heading">Knowledge base</h3>
		<div class="input-container">
			<input type="search" class="query" placeholder="Search" />
			<div class="clear-query" />
		</div>
	</div>
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


<style>
.kb-table-of-contents {
	background: white;
	border-radius: 16px;
	padding: 16px;
}

.filter-container {
	border-bottom: 1px solid #E7E9EC;
	margin: 0px -16px 10px;
    padding: 0 15px;
}
.filter-container .heading {
	background: white url(/wp-content/themes/entrepreneur-child/img/kb-title.svg) left 0px no-repeat;
    color: #0B2541;
    font-weight: 700;
    font-size: 16px;
    padding-left: 33px;
    margin: 6px 0 0;
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
</style>