<div class="page_body_content_popular">
    <div class="page_body_content_popular_wrap">
        <div class="page_body_content_popular_wrap_border">
            <p>人気の記事<span>POPULAR</span></p>
            <div class="page_body_content_popular_wrap_post">
                <ul>
                    <?php
                    // 人気順にとる
                    $popular_query = new WP_Query(array(
                        'post_type'      => array('post', 'page', 'feature', 'spot', 'landscape'),
                        'posts_per_page' => 3,
                        'meta_key'       => 'post_views_count', // ←PVが入っているメタキー
                        'orderby'        => 'meta_value_num',
                        'order'          => 'DESC',
                        'post_status'    => 'publish',
                        'no_found_rows'  => true,
                    ));

                    if ( $popular_query->have_posts() ) :
                        $i = 1;
                        while ( $popular_query->have_posts() ) : $popular_query->the_post();
                            // 1つめ・2つめ・3つめにクラス付けたいなら
                            $class_name = $i === 1 ? 'one' : ( $i === 2 ? 'two' : 'three' );
                            ?>
                            <li class="popular_post_bl <?php echo esc_attr($class_name); ?>">
                                <a href="<?php the_permalink(); ?>">
                                    <div class="popular_post_bl_img">
                                        <?php if ( has_post_thumbnail() ) : ?>
                                            <?php the_post_thumbnail('medium'); ?>
                                        <?php else : ?>
                                            <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/public/img/noimg.jpg'); ?>" alt="">
                                        <?php endif; ?>
                                    </div>
                                    <div class="popular_post_bl_details">
                                        <p class="popular_post_bl_details_ttl"><?php the_title(); ?></p>
                                        <p class="popular_post_bl_details_date">
                                            <?php echo get_the_date('Y.m.d'); ?>
                                        </p>
                                        <?php
                                        // もしタグ表示したければ（post以外は空になることもある）
                                        $post_tags = get_the_tags();
                                        if ( $post_tags && ! is_wp_error($post_tags) ) :
                                            // 1つだけ出す例
                                            $tag = $post_tags[0];
                                            ?>
                                            <p class="popular_post_bl_details_tag"><?php echo esc_html($tag->name); ?></p>
                                        <?php else : ?>
                                            <p class="popular_post_bl_details_tag"></p>
                                        <?php endif; ?>
                                    </div>
                                </a>
                            </li>
                            <?php
                            $i++;
                        endwhile;
                        wp_reset_postdata();
                    else :
                        ?>
                        <li class="popular_post_bl">
                            <p>人気の記事はまだありません。</p>
                        </li>
                    <?php endif; ?>
                </ul>
            </div>
        </div>
    </div>
</div>
