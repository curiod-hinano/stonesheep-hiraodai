<?php
/**
 * single-landscape.php
 */
get_header();
?>

<div class="page_body">
    <div class="page_body_content post_body_content spot">
        <div class="post_body_content_single">
            <div class="post_body_content_main">
                <h2><?php the_title(); ?></h2>
                <div class="post_body_content_main_wrap">
                    <div class="post_body_content_main_wrap_body">
                        <div class="page_body_content_landscape_single">
                            <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

                                <?php
                                // --- youtubeid の正規化
                                $yt_raw = function_exists('get_field') ? get_field('youtubeid') : get_post_meta(get_the_ID(), 'youtubeid', true);
                                $yt_raw = is_string($yt_raw) ? trim($yt_raw) : '';
                                $yt_id  = '';
                                if ($yt_raw !== '') {
                                    if (strpos($yt_raw, 'http') === 0) {
                                        // URLで入っているとき
                                        if (preg_match('~(?:v=|youtu\.be/|embed/)([A-Za-z0-9_-]{6,64})~', $yt_raw, $m)) {
                                            $yt_id = $m[1];
                                        }
                                    } elseif (preg_match('/^[A-Za-z0-9_-]{6,64}$/', $yt_raw)) {
                                        // 純粋なIDで入っているとき
                                        $yt_id = $yt_raw;
                                    }
                                }

                                // --- 画像（fvphoto）取得
                                $fv_url = '';
                                if (function_exists('get_field')) {
                                    $fv = get_field('fvphoto');
                                    if (is_array($fv)) {
                                        if (!empty($fv['ID'])) {
                                            $fv_url = wp_get_attachment_image_url((int)$fv['ID'], 'full');
                                        } elseif (!empty($fv['id'])) {
                                            $fv_url = wp_get_attachment_image_url((int)$fv['id'], 'full');
                                        } elseif (!empty($fv['url'])) {
                                            $fv_url = $fv['url'];
                                        }
                                    } elseif (is_numeric($fv)) {
                                        $fv_url = wp_get_attachment_image_url((int)$fv, 'full');
                                    } elseif (is_string($fv) && $fv !== '') {
                                        $fv_url = $fv;
                                    }
                                }
                                // fvphoto がなければアイキャッチでフォールバック
                                if (!$fv_url) {
                                    $thumb_fallback = get_the_post_thumbnail_url(get_the_ID(), 'full');
                                    if ($thumb_fallback) {
                                        $fv_url = $thumb_fallback;
                                    }
                                }
                                ?>

                                <div class="landscape_bl">
                                    <?php if ( $yt_id ): ?>
                                        <!-- YouTubeをポップアップで開きたいとき -->
                                        <a href="#" class="js-modal-landscape" data-video-id="<?php echo esc_attr($yt_id); ?>">
                                            <div class="landscape_bl_img">
                                                <?php if ( has_post_thumbnail() ) : ?>
                                                    <?php the_post_thumbnail('large'); ?>
                                                <?php else : ?>
                                                    <img src="<?php echo esc_url(get_template_directory_uri().'/assets/public/img/common/no_img.png'); ?>" alt="画像準備中">
                                                <?php endif; ?>
                                            </div>
                                        </a>
                                    <?php else: ?>
                                        <!-- 画像をポップアップで表示 -->
                                        <a href="#" class="js-image-landscape" data-image="<?php echo esc_url($fv_url); ?>">
                                            <div class="landscape_bl_img">
                                                <?php if ( has_post_thumbnail() ) : ?>
                                                    <?php the_post_thumbnail('large'); ?>
                                                <?php else : ?>
                                                    <img src="<?php echo esc_url(get_template_directory_uri().'/assets/public/img/common/no_img.png'); ?>" alt="画像準備中">
                                                <?php endif; ?>
                                            </div>
                                        </a>
                                    <?php endif; ?>

                                    <!-- 必要なら本文も -->
                                    <div class="landscape_bl_content">
                                        <?php the_content(); ?>
                                    </div>
                                </div>

                            <?php endwhile; endif; ?>
                        </div>

                    </div>
                </div>
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

<?php get_footer(); ?>