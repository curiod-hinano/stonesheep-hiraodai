<?php
/**
 * page-story.php
 */
get_header(); ?>

<div class="page_body">
    <div class="page_body_content story spot">
        <div class="page_body_content_head">
            <div class="page_body_content_head_ttl">
                <h2 class="tategaki">物語に出会う</h2>
                <p class="tategaki">
                    見えているものが、すべてではありません。<br>
                    あなたが歩いた、あの穏やかな丘。<br>
                    あなたが触れた、あの冷たい石。<br>
                    そのひとつひとつには、<br>
                    目には見えない、壮大な時間が眠っています。
                </p>
            </div>
        </div>
        <div class="page_body_content_archive_wrap">
            <div class="page_body_content_txt archive">
                <div class="page_body_content_spot_wrap">
                    <a class="spot_bl" href="<?php the_permalink(); ?>/story/story01">
                        <div class="spot_bl_img">
                            <img src="<?php echo wp_get_attachment_url(get_post_thumbnail_id('253')); ?>" alt="そして、石はひつじになる。">
                        </div>
                        <div class="spot_bl_txt">
                            <h3>そして、石はひつじになる。</h3>
                        </div>
                    </a>
                    <a class="spot_bl" href="<?php the_permalink(); ?>/story/story02">
                        <div class="spot_bl_img">
                            <img src="<?php echo wp_get_attachment_url(get_post_thumbnail_id('260')); ?>" alt="野焼きが生み出す風景">
                        </div>
                        <div class="spot_bl_txt">
                            <h3>野焼きが生み出す風景 — 草原に火を灯す理由</h3>
                        </div>
                    </a>
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