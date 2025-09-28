<?php
/**
 * archive-feature.php
 */
get_header(); ?>

<div class="page_body">
    <div class="page_body_content">
        <div class="page_body_content_feature">
            <h2><span>特集</span>BACK NUMBER</h2>
            <div class="page_body_content_feature_wrap">
                <?php
                    $paged = (int) get_query_var('paged');
                    $args=array( 
                        'post_type' => 'feature', //カスタム投稿名
                        'posts_per_page'=> -1,
                        'paged' => $paged,
                        'orderby' => 'post_date',
                        'order' => 'DESC',
                        'post_status' => 'publish',
                    );
                    $the_query = new WP_Query( $args );
                    if( $the_query->have_posts() ):
                    while ( $the_query->have_posts() ) : $the_query->the_post();
                ?>
                    <a class="feature_bl" href="<?php the_permalink(); ?>">
                        <div class="feature_bl_img">
                            <?php if (has_post_thumbnail()) :?>
                                <?php the_post_thumbnail(); ?>
                            <?php else : ?>
                                <img src="<?php echo get_template_directory_uri(); ?>/assets/public/img/common/no_img.png" alt="画像準備中">
                            <?php endif ;?>
                        </div>
                        <div class="feature_bl_txt">
                            <h3><?php the_title(); ?></h3>
                            <?php the_excerpt(); ?>
                        </div>
                    </a>
                <?php endwhile; ?>
                <?php wp_reset_postdata(); ?>
                <?php endif; ?>
            </div>
        </div>
        <?php 
            get_template_part('blocks/bl_lovers');
            get_template_part('blocks/bl_share');
            get_template_part('blocks/bl_popular');
        ?>
    </div>
</div>

<?php
    get_footer();
?>