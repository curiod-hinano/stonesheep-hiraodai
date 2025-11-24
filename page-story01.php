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
                    <li class="tategaki"><a href="#index01">1章：海の底から、丘のうえへ（3億5000万年前〜）</a></li>
                    <li class="tategaki"><a href="#index02">2章：雨がつくる、地下の世界</a></li>
                    <li class="tategaki"><a href="#index03">3章：ひとのものがたり。石と、人が出会う（数万年前〜江戸時代）</a></li>
                    <li class="tategaki"><a href="#index04">4章：石と人の、対話（明治時代〜昭和時代）</a></li>
                    <li class="tategaki"><a href="#index05">5章：「守る」と「使う」石の価値</a></li>
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
            <div class="page_body_content_container_storyLink">
                <p>
                    <span>NEXT STORY</span>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="132.459" height="1.975" viewBox="0 0 132.459 1.975">
                        <defs>
                            <clipPath id="clip-path">
                            <rect id="長方形_13" data-name="長方形 13" width="132.459" height="1.975" fill="none" stroke="#03581D" stroke-width="1"/>
                            </clipPath>
                        </defs>
                        <g id="グループ_28" data-name="グループ 28" transform="translate(0 0)">
                            <g id="グループ_25" data-name="グループ 25" transform="translate(0 0)" clip-path="url(#clip-path)">
                            <path id="パス_123" data-name="パス 123" d="M0,.142c3.153,0,3.153,1.8,6.306,1.8s3.152-1.8,6.3-1.8,3.152,1.8,6.306,1.8,3.152-1.8,6.3-1.8,3.153,1.8,6.306,1.8,3.152-1.8,6.3-1.8,3.154,1.8,6.307,1.8,3.154-1.8,6.308-1.8,3.154,1.8,6.307,1.8,3.154-1.8,6.307-1.8,3.154,1.8,6.308,1.8,3.155-1.8,6.309-1.8,3.154,1.8,6.308,1.8,3.153-1.8,6.306-1.8,3.154,1.8,6.307,1.8,3.154-1.8,6.307-1.8,3.155,1.8,6.308,1.8,3.155-1.8,6.311-1.8,3.154,1.8,6.308,1.8,3.157-1.8,6.313-1.8,3.156,1.8,6.313,1.8" transform="translate(0 -0.052)" fill="none" stroke="#03581D" stroke-miterlimit="10" stroke-width="1"/>
                            </g>
                        </g>
                    </svg>
                </p>
                <a href="<?php echo home_url(); ?>/story/story02">野焼きが生み出す風景<br>草原に火を灯す理由</a>
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