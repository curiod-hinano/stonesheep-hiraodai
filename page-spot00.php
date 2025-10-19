<?php
/**
 * page-spot.php
 */
get_header(); ?>

<div class="page_body">
    <div class="page_body_content spot">
        <div class="page_body_content_googlemap">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3360.281138244281!2d130.8947815!3d33.758341099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3543c39e578a3163%3A0xdd4ed7127b45a289!2z44Gy44Gk44GYY2Fmw6kgSElSQU9EQUk!5e1!3m2!1sja!2sjp!4v1758943760923!5m2!1sja!2sjp" width="600" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <div class="page_body_content_googlemap_link">
                <a href="https://maps.app.goo.gl/ahocQnZPSzU2eywN8" target="_blank" rel="noopener">大きな地図で見る</a>
            </div>
        </div>
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
                                <img src="<?php echo get_template_directory_uri(); ?>/assets/public/img/common/no_image.png" alt="画像準備中">
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
                            <h3>ひつじcafé HIRAODAI</h3>
                            <p class="adress">住所：小倉南区平尾台１丁目１</p>
                            <p class="tel">電話：080-000-0000</p>
                            <p class="open">営業時間：金土日月11時から営業</p>
                        </div>
                    </a>
                <?php endwhile; ?>
                <?php wp_reset_postdata(); ?>
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