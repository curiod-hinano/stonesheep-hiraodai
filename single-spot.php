<?php
/**
 * single-spot.php
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
        <div class="post_body_content_main">
            <h2><?php the_title(); ?></h2>
            <div class="post_body_content_main_wrap">
                <div class="post_body_content_main_wrap_body">
                    <?php the_content(); ?>
                </div>
                <div class="post_body_content_main_wrap_info">
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
                <?php if( get_field('googlemap') ): ?>
                    <div class="post_body_content_main_googlemap">
                        <?php echo get_field('googlemap'); ?>
                    </div>
                <?php endif; ?>
            </div>
        </div>

        <div class="page_body_content_txt">
            <h2 style="margin-bottom: 25px;">HIRAODAI SPOT</h2>
            <div class="page_body_content_spot_wrap" style="padding-top:0;">
                <?php
                    $args = [
                        'post_type'              => 'spot',
                        'posts_per_page'         => 2,
                        'orderby'                => 'rand',
                        'post_status'            => 'publish',
                        'no_found_rows'          => true,  // ページングしないのでクエリ軽量化
                        'ignore_sticky_posts'    => true,
                        'update_post_meta_cache' => false,
                        'update_post_term_cache' => false,
                    ];
                    $the_query = new WP_Query($args);
                    if ( $the_query->have_posts() ):
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
    <div class="page_body_content spot">
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