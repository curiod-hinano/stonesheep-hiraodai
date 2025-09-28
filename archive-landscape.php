<?php
/**
 * archive-landscape.php
 */
get_header(); ?>

<div class="page_body">
    <div class="page_body_content page_body_content_landscape">
        <div class="page_body_content_landscape_head">
            <div class="page_body_content_landscape_head_ttl">
                <h2>風景に出会う</h2>
                <p>こだまする、丘の上のサンゴ。<span>ARCHIVES</span></p>
            </div>
            <div class="page_body_content_landscape_head_txt">
                <p>
                    平尾台の丘のおと。<br>
                    耳をすますと、聴こえてくる<br>
                    <span>3</span>億年前の、海の底から響いてくる、<br>
                    かすかな、こだま。<br>
                    さあ、時を超えた響きに、<br>
                    その身をゆだねてみよう。
                </p>
            </div>
        </div>
        <div class="page_body_content_landscape_archive">
            <h3>ARCHIVES</h3>
            <div class="page_body_content_landscape_archive_container">
                <div class="page_body_content_landscape_archive_wrap">
                    <?php
                        $paged = (int) get_query_var('paged');
                        $args=array( 
                            'post_type' => 'landscape', //カスタム投稿名
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
                        <button class="landscape_bl js-modal-btn js-modal-landscape" data-video-url="<?php the_field('movie'); ?>">
                            <div class="landscape_bl_img">
                                <!-- <img src="<?php echo get_template_directory_uri(); ?>/assets/public/img/test/test_spot01.jpg" alt=""> -->
                                <?php if (has_post_thumbnail()) :?>
                                    <?php the_post_thumbnail(); ?>
                                <?php else : ?>
                                    <img src="<?php echo get_template_directory_uri(); ?>/assets/public/img/common/no_img.png" alt="画像準備中">
                                <?php endif ;?>
                            </div>
                            <div class="landscape_bl_txt">
                                <h3><?php the_title(); ?></h3>
                                <p class="date"><?php echo get_the_date('Y.m.d'); ?></p>
                                <p class="time"><?php the_field('time');; ?></p>
                            </div>
                        </button>
                    <?php endwhile; ?>
                    <?php wp_reset_postdata(); ?>
                    <?php endif; ?>
                </div>
                <div class="page_body_content_landscape_archive_btn">
                    <p class="archive_btn_more">MORE</p>
                </div>
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