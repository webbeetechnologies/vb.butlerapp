<?php
$cat = get_category_by_slug( 'knowledgebase' );

$child_arg = array( 'hide_empty' => false, 'parent' => $cat->term_id );
$child_cat = get_terms( 'category', $child_arg );
?>

<div class="kb-list">
<?php foreach( $child_cat as $child_term ):?>
	<?php
	$args=array(
		'posts_per_page' => 1,
		'category' => $child_term->term_id
	);
	$wp_query = new WP_Query( $args );

	if ($wp_query->have_posts()) : 
		$wp_query->the_post();
		$custom_title = get_field( 'custom_title', $child_term );

		$title = $custom_title ? $custom_title : $child_term->name;
	?>	
		<?php $link = get_permalink();?>
		<a href="<?php echo $link;?>" class="kb-item">
			<h5><?php echo $title; ?></h5>
			<span class="elementor-button-icon elementor-align-icon-left">
				<svg aria-hidden="true" class="e-font-icon-svg e-fas-chevron-right" viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>
			</span>
		</a>
	<?php endif; ?>
	<?php wp_reset_query(); ?>
<?php endforeach;?> 
</div>
