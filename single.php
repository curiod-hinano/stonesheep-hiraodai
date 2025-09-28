<?php
/**
 * single.php
 */
get_header(); ?>

<div class="page_body">
    <div class="page_body_content post_body_content spot">
        <div class="post_body_content_thumbnail">
            <?php if (has_post_thumbnail()) :?>
                <?php the_post_thumbnail(); ?>
            <?php else : ?>
                <img src="<?php echo get_template_directory_uri(); ?>/assets/public/img/common/no_img.png" alt="画像準備中">
            <?php endif ;?>
        </div>
        <div class="post_body_content_main">
            <h2><?php the_title(); ?></h2>
            <div class="post_body_content_main_wrap">
                <div class="post_body_content_main_wrap_body">
                    <?php the_content(); ?>
                </div>
            </div>
        </div>

        <div class="page_body_content_txt">
            <h2 style="margin-bottom: 25px;">NEWS</h2>
            <div class="page_body_content_spot_wrap" style="padding-top:0;">
                <?php
                    $paged = (int) get_query_var('paged');
                    $args=array( 
                        'post_type' => 'post', //カスタム投稿名
                        'posts_per_page'=> 2,
                        'paged' => $paged,
                        'orderby' => 'post_date',
                        'order' => 'DESC',
                        'post_status' => 'publish',
                    );
                    $the_query = new WP_Query( $args );
                    if( $the_query->have_posts() ):
                    while ( $the_query->have_posts() ) : $the_query->the_post();
                ?>
                    <a class="spot_bl" href="<?php the_permalink(); ?>">
                        <div class="spot_bl_img">
                            <!-- <img src="<?php echo get_template_directory_uri(); ?>/assets/public/img/test/test_spot01.jpg" alt=""> -->
                            <?php if (has_post_thumbnail()) :?>
                                <?php the_post_thumbnail(); ?>
                            <?php else : ?>
                                <img src="<?php echo get_template_directory_uri(); ?>/assets/public/img/common/no_img.png" alt="画像準備中">
                            <?php endif ;?>
                        </div>
                        <div class="spot_bl_txt">
                            <h3><?php the_title(); ?></h3>
                            <p class="date"><?php echo get_the_date('Y.m.d'); ?></p>
                        </div>
                    </a>
                <?php endwhile; ?>
                <?php wp_reset_postdata(); ?>
                <?php endif; ?>
            </div>
        </div>
    </div>
    <div class="page_body_content spot">
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