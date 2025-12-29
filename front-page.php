<?php
/**
 * front-page.php
 */
get_header();
?>

<!-- ここは fullPage.js が面倒を見るエリア -->
<!-- <div id="fullpage"> -->

  <!-- 1. FVセクション -->
  <div id="fv" class="section">
    <div class="wrap" style="background:transparent; min-height:100%;">

      <?php
      // 最新の landscape 1件を取得
      $args = [
        'post_type'      => 'landscape',
        'posts_per_page' => 1,
        'orderby'        => 'date',
        'order'          => 'DESC',
      ];
      $latest = get_posts($args);

      $youtube_id  = '';
      if ($latest) {
        $pid = $latest[0]->ID;
        if (function_exists('get_field')) {
          $youtube_id = trim((string) get_field('youtubeid', $pid));
        } else {
          $youtube_id = trim((string) get_post_meta($pid, 'youtubeid', true));
        }
        // URLできたときはIDを抜く
        if ($youtube_id && strpos($youtube_id, 'http') === 0) {
          if (preg_match('~(?:v=|youtu\.be/|embed/)([A-Za-z0-9_-]{6,64})~', $youtube_id, $m)) {
            $youtube_id = $m[1];
          }
        }
        // 不正なら捨てる
        if (!$youtube_id || !preg_match('/^[A-Za-z0-9_-]{6,64}$/', $youtube_id)) {
          $youtube_id = '';
        }
      }
      ?>

      <div id="bg-video" aria-hidden="true">
        <div id="yt-bg-player" data-video="<?php echo esc_attr($youtube_id); ?>"></div>
      </div>

      <div class="movie__btn_wrap">
        <div class="movie__btn">
          <button class="js-video-button off" type="button">
            <span class="icon" aria-hidden="true">
              <span class="bar b1"></span>
              <span class="bar b2"></span>
              <span class="bar b3"></span>
              <span class="bar b4"></span>
              <span class="bar b5"></span>
              <span class="bar b6"></span>
              <span class="bar b7"></span>
            </span>
            <span class="status-text">OFF</span>
          </button>
        </div>
      </div>

      <script src="https://www.youtube.com/iframe_api"></script>

      <div class="fv_ttl_wrap">
        <h1>
          <img src="<?php echo get_template_directory_uri(); ?>/assets/public/img/top/fv_ttl.svg" alt="そして、石はひつじになる。 AND THE STONE BECAME SHEEP.">
        </h1>
      </div>

      <!-- ニュース（SP） -->
      <div class="d_only_sp">
        <?php
          $paged = (int) get_query_var('paged');
          $news_args = array(
              'post_type'      => 'post',
              'posts_per_page' => 1,
              'paged'          => $paged,
              'orderby'        => 'post_date',
              'order'          => 'DESC',
              'post_status'    => 'publish',
          );
          $news_q = new WP_Query($news_args);
          if ($news_q->have_posts()):
          while ($news_q->have_posts()): $news_q->the_post();
        ?>
          <div class="fv_news">
            <p class="fv_news_midashi">EVENT/NEWS</p>
            <div class="fv_news_ticker js-ticker" data-speed="60">
              <ul>
                <li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
              </ul>
              <ul>
                <li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
              </ul>
            </div>
          </div>
        <?php
          endwhile;
          wp_reset_postdata();
        endif;
        ?>
      </div>

    </div><!-- /.wrap -->
  </div><!-- /.section（FV） -->

<!-- </div> -->
<!-- /#fullpage （←ここでfullPage終わり） -->


<?php
// ここから下は「普通のスクロール領域」
$paged = (int) get_query_var('paged');
$f_args = array(
  'post_type'      => 'feature',
  'posts_per_page' => 1,
  'paged'          => $paged,
  'orderby'        => 'post_date',
  'order'          => 'DESC',
  'post_status'    => 'publish',
);
$f_q = new WP_Query($f_args);
if ($f_q->have_posts()):
  $f_q->the_post();
  // $bg_img = get_template_directory_uri() . '/assets/public/img/top/background_top.jpg';

  $latest_post = get_posts(array(
      'posts_per_page' => 1,
      'post_type' => 'feature',
      'post_status' => 'publish'
  ));
  $bg_img = '';
  if (!empty($latest_post)) {
      // 最新投稿のカスタムフィールド「bkimg」を取得
      $custom_field_img = get_field('bkimg', $latest_post[0]->ID);
      if (!empty($custom_field_img)) {
          // カスタムフィールドに画像が設定されている場合
          $bg_img = is_array($custom_field_img) ? $custom_field_img['url'] : $custom_field_img;
      }
  }
  if (empty($bg_img)) {
      // 固定ページID:20のサムネイル画像を取得
      $page_thumbnail = get_the_post_thumbnail_url(20, 'full');
      if (!empty($page_thumbnail)) {
          $bg_img = $page_thumbnail;
      }
  }
  if (empty($bg_img)) {
      // デフォルト画像を設定
      $bg_img = get_template_directory_uri() . '/assets/public/img/top/background_top.jpg';
  }
?>

<section class="feature-shell" id="feature">
  <!-- 背景 -->
  <div class="feature-bg">
    <div class="feature-bg__inner">
      <img src="<?php echo esc_url($bg_img); ?>" alt="">
    </div>
    <div class="feature-bg__ttl">
      <div class="feature-bg__ttl_left">
        <img src="<?php echo get_template_directory_uri(); ?>/assets/public/img/top/bk_ttl01.svg" alt="そして、石は">
      </div>
      <div class="feature-bg__ttl_right">
        <img src="<?php echo get_template_directory_uri(); ?>/assets/public/img/top/bk_ttl02.svg" alt="ひつじになる。">
      </div>
    </div>
  </div>

  <!-- 手前のカード -->
    <div class="feature-card">
        <div class="feature-card__scroll-wrapper js-feature-scroll">

            <!-- ページトップに戻るボタン START -->
            <a href="#" class="feature-card_topBtn">
                <span class="feature-card_topBtn_img"></span>
            </a>
            <!-- ページトップに戻るボタン END -->

            <!-- CONTACTボタン START -->
            <div class="feature-card_contact">
                <a href="<?php echo home_url(); ?>/contact" style="color:#03581D;">CONTACT</a>
            </div>
            <!-- CONTACTボタン END -->

            <div class="feature-card__head">
                <div class="feature-card__head_title">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/public/img/top/featurecard_head_title.svg" alt="そして、石はひつじになる。">
                </div>
                <?php the_post_thumbnail('large'); ?>
            </div>
            <div class="feature-card__body">
                <?php the_content(); ?>
            </div>
            <div class="feature-card__footer">
              <?php if ($guest = get_field('guest')): ?>
                <div class="feature-card__footer_who">
                    <a href="#modalWho">
                        <img src="<?php echo esc_html($guest['img']); ?>" alt="">
                    </a>
                    <div class="remodal modal_who" data-remodal-id="modalWho">
                        <div class="modal_who_wrap">
                            <div class="modal_who_img">
                                <img src="<?php echo esc_html($guest['img']); ?>" alt="">
                            </div>
                            <div class="modal_who_txt">
                                <p class="name"><?php echo esc_html($guest['name']); ?></p>
                                <p class="txt"><?php echo esc_html($guest['message']); ?></p>
                                <div class="link">
                                    <?php if (!empty($guest['link'])): ?>
                                      <div class="web">
                                          <a href="<?php echo esc_html($guest['link']); ?>" target="_blank" rel="noopener">公式サイト</a>
                                      </div>
                                    <?php endif; ?>
                                    <?php if (!empty($guest['instagram'])): ?>
                                      <div class="instagram">
                                          <a href="<?php echo esc_html($guest['instagram']); ?>" target="_blank" rel="noopener">
                                              <img src="<?php echo get_template_directory_uri(); ?>/assets/public/img/top/instagram.svg" alt="">
                                          </a>
                                      </div>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </div>
                        <!-- クローズボタン -->
                        <button data-remodal-action="close" class="remodal-close"></button>
                    </div>
                </div>
              <?php endif; ?>
            </div>
            <!-- SHAREボタン START -->
            <?php
                get_template_part('sections/sec_share');
            ?>
            <!-- SHAREボタン END -->
        </div>
    </div>
</section>

<?php
  wp_reset_postdata();
endif;
?>

<?php get_footer(); ?>