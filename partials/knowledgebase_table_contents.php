<?php
// GET URL SLUG AND GET ID AND CATEGORY ID
global $wp;
$current_url = $wp->request;
$slug = substr($current_url , strrpos($current_url , '/') + 1);

$post =  get_page_by_path($slug,  OBJECT, 'post');

$post_id = $post ? $post->ID : null;
$cat_id = wp_get_post_categories($post_id)[0];

$main_cat = get_category_by_slug( 'knowledgebase' );

$arg = array( 'hide_empty' => false, 'parent' => $main_cat->term_id );
$cats = get_terms( 'category', $arg );
?>

<div class="kb-table-of-contents">
	<!-- ONE ITEM CATEGORY -->
	<?php foreach( $cats as $cat ):?>
		<?php
		$args=array(
			'posts_per_page' => 10000, // basically, all :D
			'category' => $cat->term_id
		);
		
		// $wp_query = new WP_Query( $args );
		$posts = get_posts( $args );
		$is_accordion_opened = $cat_id == $cat->term_id;

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
						<li class="post-item <?php echo $is_active_post ? 'active': ''; ?>">
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
.kb-table-of-contents .category-title {
	display: flex;
	align-items: center;
	padding-right: 40px;
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
}

.kb-table-of-contents ul.post-list .post-item.active,
.kb-table-of-contents ul.post-list .post-item:hover {
	
	background: rgb(237,33,119);
	background: linear-gradient(90deg, rgba(237,33,119,0.3) 0%, rgba(253,208,58,0.3) 100%);
	
}

.kb-table-of-contents ul.post-list .post-item a {
	font-size: 14px;
	position: relative;
}

.kb-table-of-contents ul.post-list .post-item.active a,
.kb-table-of-contents ul.post-list .post-item:hover a {
	background: linear-gradient(90deg, #ED2177 0%, #F9A04B 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
	font-weight: bold;
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
</style>