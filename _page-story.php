<?php
/**
 * page-story.php
 */
get_header(); ?>

<div class="page_body">
    <div class="page_body_content story">
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
            <div class="page_body_content_head_index">
                <p>目次</p>
                <ul>
                    <li class="tategaki"><a href="#story01">そして、石はひつじになる。</a></li>
                    <li class="tategaki"><a href="#story02">野焼きが生み出す風景 ー 草原に火を灯す理由</a></li>
                    <!-- <li class="tategaki"><a href="#story03">三つの力と、丘という大地 — 先人たちの眼差し</a></li> -->
                </ul>
            </div>
        </div>
        <div class="page_body_content_container">
            <div id="story01" class="page_body_content_wrap bk_white">
                <div class="page_body_content_wrap_txt01">
                    <div class="feature-card__body">
                        <?php the_content(); ?>
                    </div>
                </div>
            </div>
            <!-- <div class="page_body_content_wrap_img full">
                <img class="inline" src="<?php echo get_template_directory_uri(); ?>/assets/public/img/page/story02.jpg" alt="">
            </div> -->
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