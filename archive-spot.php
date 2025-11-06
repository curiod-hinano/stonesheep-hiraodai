<?php
/**
 * archive-spot.php
 */
get_header(); ?>

<div class="page_body">
    <div class="page_body_content spot">
        <div class="page_body_content_googlemap">
            <iframe src="https://www.google.com/maps/d/embed?mid=1Qr1pPDRbEMqlvJSpzPSb_N7rtw7PDWk&ehbc=2E312F" width="640" height="480"></iframe>
            <div class="page_body_content_googlemap_link">
                <a href="https://www.google.com/maps/d/u/0/viewer?mid=1Qr1pPDRbEMqlvJSpzPSb_N7rtw7PDWk&femb=1&ll=33.76274170634599%2C130.89277305&z=14" target="_blank" rel="noopener">大きな地図で見る</a>
            </div>
        </div>
        <div class="page_body_content_spot_container">
            <div class="page_body_content_txt">
                <h2>HIRAODAI SPOT</h2>
                <div class="page_body_content_spot_wrap" style="padding-top:0;">
                    <?php
                        $paged = (int) get_query_var('paged');
                        $args=array( 
                            'post_type' => 'spot', //カスタム投稿名
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
                        <a class="spot_bl" href="<?php the_permalink(); ?>">
                            <div class="spot_bl_img">
                                <!-- <img src="<?php echo get_template_directory_uri(); ?>/assets/public/img/test/test_spot01.jpg" alt=""> -->
                                <?php if (has_post_thumbnail()) :?>
                                    <?php the_post_thumbnail(); ?>
                                <?php else : ?>
                                    <img src="<?php echo get_template_directory_uri(); ?>/assets/public/img/common/no_img.png" alt="画像準備中">
                                <?php endif ;?>
                                <ul class="info">
                                    <?php
                                        $functions = get_field('functions');
                                        $theme_uri = get_template_directory_uri();

                                        $icons = [
                                        'food'   => 'spot_food.svg',
                                        'toilet' => 'spot_toilet.svg',
                                        'info'   => 'spot_info.svg',
                                        'walk'   => 'spot_walk.svg',
                                        ];

                                        if ( $functions && is_array($functions) ) {
                                        foreach ($icons as $key => $file) {
                                            if ( !empty($functions[$key]) ) {
                                            printf(
                                                '<li class="info_%1$s"><img src="%2$s" alt="%1$s"></li>',
                                                esc_attr($key),
                                                esc_url($theme_uri . '/assets/public/img/page/' . $file)
                                            );
                                            }
                                        }
                                        }
                                    ?>
                                </ul>
                            </div>
                            <div class="spot_bl_txt">
                                <h3><?php the_title(); ?></h3>
                                <?php if( get_field('adress') ): ?>
                                    <p class="adress">住所：<?php the_field('adress'); ?></p>
                                <?php endif; ?>
                                <?php if( get_field('tel') ): ?>
                                    <p class="tel">電話：<?php the_field('tel'); ?></p>
                                <?php endif; ?>
                                <?php if( get_field('open') ): ?>
                                    <p class="open"><?php the_field('open'); ?></p>
                                <?php endif; ?>
                            </div>
                        </a>
                    <?php endwhile; ?>
                    <?php wp_reset_postdata(); ?>
                    <?php endif; ?>
                </div>
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