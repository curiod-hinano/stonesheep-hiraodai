<?php
/**
 * archive-landscape.php
 */
get_header(); ?>

<div class="page_body">
    <div class="page_body_content page_body_content_landscape">
        <div class="page_body_content_landscape_head">
            <div class="page_body_content_landscape_head_ttl">
                <h2 class="tategaki">風景に出会う</h2>
                <p class="tategaki">こだまする、丘の上のサンゴ。<span>ARCHIVES</span></p>
            </div>
            <div class="page_body_content_landscape_head_txt">
                <p class="tategaki">
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
                <!-- <div class="page_body_content_landscape_archive_wrap">
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
                        <?php if(get_field('youtubeid')): ?>
                            <button class="landscape_bl js-modal-btn js-modal-landscape" data-video-id="<?php the_field('youtubeid'); ?>">
                                <div class="landscape_bl_img">
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
                        <?php else: ?>
                        <?php endif; ?>
                    <?php endwhile; ?>
                    <?php wp_reset_postdata(); ?>
                    <?php endif; ?>
                </div> -->

                <div class="page_body_content_landscape_archive_wrap">
                    <?php
                        $paged = (int) get_query_var('paged');
                        $args=array( 
                        'post_type'      => 'landscape',
                        'posts_per_page' => -1,
                        'paged'          => $paged,
                        'orderby'        => 'post_date',
                        'order'          => 'DESC',
                        'post_status'    => 'publish',
                        );
                        $the_query = new WP_Query( $args );
                        if( $the_query->have_posts() ):
                        while ( $the_query->have_posts() ) : $the_query->the_post();

                        // --- youtubeid 正規化（URL／IDどちらでもOK→IDに）
                        $yt_raw = function_exists('get_field') ? get_field('youtubeid') : get_post_meta(get_the_ID(), 'youtubeid', true);
                        $yt_raw = is_string($yt_raw) ? trim($yt_raw) : '';
                        $yt_id  = '';
                        if ($yt_raw !== '') {
                            if (strpos($yt_raw, 'http') === 0) {
                            if (preg_match('~(?:v=|youtu\.be/|embed/)([A-Za-z0-9_-]{6,64})~', $yt_raw, $m)) {
                                $yt_id = $m[1];
                            }
                            } elseif (preg_match('/^[A-Za-z0-9_-]{6,64}$/', $yt_raw)) {
                            $yt_id = $yt_raw;
                            }
                        }

                        // --- fvphoto URL 取得（ACF返り値：配列/ID/URL すべて対応）
                        $fv_url = '';
                        if (!$yt_id) {
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
                            } else {
                            $meta_fv = get_post_meta(get_the_ID(), 'fvphoto', true);
                            if (is_numeric($meta_fv)) {
                                $fv_url = wp_get_attachment_image_url((int)$meta_fv, 'full');
                            } elseif (is_string($meta_fv) && $meta_fv !== '') {
                                $fv_url = $meta_fv;
                            }
                            }
                        }
                        $fv_url = $fv_url ? esc_url($fv_url) : '';
                    ?>
                    
                    <?php if ($yt_id): ?>
                        <!-- YouTube: modal-video.js で開く -->
                        <a href="#" class="landscape_bl js-modal-landscape" data-video-id="<?php echo esc_attr($yt_id); ?>">
                        <div class="landscape_bl_img">
                            <?php if (has_post_thumbnail()) :?>
                            <?php the_post_thumbnail(); ?>
                            <?php else : ?>
                            <img src="<?php echo esc_url(get_template_directory_uri().'/assets/public/img/common/no_img.png'); ?>" alt="画像準備中">
                            <?php endif ;?>
                        </div>
                        <div class="landscape_bl_txt">
                            <h3><?php the_title(); ?></h3>
                            <p class="date"><?php echo esc_html(get_the_date('Y.m.d')); ?></p>
                            <p class="time"><?php echo esc_html(function_exists('get_field') ? (string)get_field('time') : (string)get_post_meta(get_the_ID(), 'time', true)); ?></p>
                        </div>
                        </a>
                    <?php else: ?>
                        <?php 
                            $fv_url = '';
                            if (function_exists('get_field')) {
                            $fv = get_field('fvphoto');
                            if (is_array($fv)) {
                                if (!empty($fv['ID']))      $fv_url = wp_get_attachment_image_url((int)$fv['ID'], 'full');
                                elseif (!empty($fv['id']))  $fv_url = wp_get_attachment_image_url((int)$fv['id'], 'full');
                                elseif (!empty($fv['url'])) $fv_url = $fv['url'];
                            } elseif (is_numeric($fv)) {
                                $fv_url = wp_get_attachment_image_url((int)$fv, 'full');
                            } elseif (is_string($fv) && $fv !== '') {
                                $fv_url = $fv;
                            }
                            }
                            // ★fvphotoが空ならアイキャッチのフルサイズでフォールバック
                            if (!$fv_url) {
                            $thumb_fallback = get_the_post_thumbnail_url(get_the_ID(), 'full');
                            if ($thumb_fallback) $fv_url = $thumb_fallback;
                            }
                        ?>
                        <a href="#" class="landscape_bl js-image-landscape" data-image="<?php echo esc_url($fv_url); ?>">
                            <div class="landscape_bl_img">
                                <?php if (has_post_thumbnail()) :?>
                                <?php the_post_thumbnail('medium_large'); ?>
                                <?php else : ?>
                                <img src="<?php echo esc_url(get_template_directory_uri().'/assets/public/img/common/no_img.png'); ?>" alt="画像準備中">
                                <?php endif ;?>
                            </div>
                            <div class="landscape_bl_txt">
                                <h3><?php the_title(); ?></h3>
                                <p class="date"><?php echo esc_html(get_the_date('Y.m.d')); ?></p>
                                <p class="time"><?php echo esc_html(function_exists('get_field') ? (string)get_field('time') : (string)get_post_meta(get_the_ID(), 'time', true)); ?></p>
                            </div>
                        </a>
                    <?php endif; ?>

                    <?php
                        endwhile;
                        wp_reset_postdata();
                        endif;
                    ?>
                </div>
                <div class="page_body_content_landscape_archive_btn">
                    <p class="archive_btn_more">MORE</p>
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

<div id="img-modal" class="imgmodal" aria-hidden="true" role="dialog" aria-modal="true">
  <div class="imgmodal__backdrop" data-close="1"></div>
  <div class="imgmodal__dialog" role="document">
    <button type="button" class="imgmodal__close" aria-label="Close" data-close="1">×</button>
    <div class="imgmodal__body">
      <img alt="" />
    </div>
  </div>
</div>

<?php
    get_footer();
?>