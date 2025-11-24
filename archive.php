<?php
/**
 * archive.php
 */
get_header(); ?>

<div class="page_body">
    <div class="page_body_content spot">
        <div class="page_body_content_archive_wrap">
            <div class="page_body_content_archive">
                <h2>NEWS</h2>
            </div>
            <div class="page_body_content_txt archive">
                <?php
                    $paged = (int) get_query_var('paged');
                    $args=array( 
                        'post_type' => 'post', //カスタム投稿名
                        'posts_per_page'=> -1,
                        'paged' => $paged,
                        'orderby' => 'post_date',
                        'order' => 'DESC',
                        'post_status' => 'publish',
                    );
                    $the_query = new WP_Query( $args );
                    if( $the_query->have_posts() ):
                ?>
                <div class="page_body_content_spot_wrap">
                    <?php
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
                </div>
                <?php else: ?>
                    <p>最新の記事はありません。</p>
                <?php endif; ?>
            </div>
        </div>
        <?php 
            get_template_part('sections/sec_lovers');
            get_template_part('sections/sec_share');
            get_template_part('sections/sec_popular');
        ?>
    </div>
</div>

<?php
    get_footer();
?>