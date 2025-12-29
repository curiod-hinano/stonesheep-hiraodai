<?php
/**
 * archive-experience.php
 */
get_header(); ?>

<div class="page_body">
    <div class="page_body_content me">
        <div class="page_body_content_head">
            <div class="page_body_content_head_ttl">
                <h2 class="tategaki">わたしに出会う</h2>
                <p class="tategaki">
                    火と、水と、風と、土。<br>
                    実際に平尾台を訪れ、<br>
                    この土地の力を、あなたの心と体で直接感じるための、<br>
                    いくつかの体験をご用意しています。<br><br>
                    どのプログラムも、専門のガイドが丁寧にご案内しますので、<br>
                    初めての方でも、安心してご参加いただけます。
                </p>
            </div>
            <!-- <div class="page_body_content_head_index">
                <p>目次</p>
                <ul>
                    <li><a href="#me01">大地とひとつになる。<br>〜裸足であるく平尾台〜</a></li>
                    <li><a href="#me02">洞窟の、しずけさに浸る<br>〜鍾乳洞ツアー〜</a></li>
                    <li><a href="#me03">石のひつじと、すごす時間<br>〜平尾台で過ごす時間〜</a></li>
                </ul>
            </div> -->
        </div>

        <div class="page_body_content spot">
            <div class="page_body_content_archive_wrap">
                <div class="page_body_content_txt archive">
                    <?php
                        $paged = (int) get_query_var('paged');
                        $args=array( 
                            'post_type' => 'experience', //カスタム投稿名
                            'posts_per_page'=> -1,
                            'paged' => $paged,
                            'orderby' => 'post_date',
                            'order' => 'DESC',
                            'post_status' => 'publish',
                        );
                        $the_query = new WP_Query( $args );
                        if( $the_query->have_posts() ):
                    ?>
                    <div class="page_body_content_spot_wrap">
                        <?php
                            while ( $the_query->have_posts() ) : $the_query->the_post();
                        ?>
                            <a class="spot_bl" href="<?php the_permalink(); ?>">
                                <div class="spot_bl_img">
                                    <?php if (has_post_thumbnail()) :?>
                                        <?php the_post_thumbnail(); ?>
                                    <?php else : ?>
                                        <img src="<?php echo get_template_directory_uri(); ?>/assets/public/img/common/no_img.png" alt="画像準備中">
                                    <?php endif ;?>
                                </div>
                                <div class="spot_bl_txt">
                                    <h3><?php the_title(); ?></h3>
                                    <p class="date"><?php echo get_the_date('Y.m.d'); ?></p>
                                </div>
                            </a>
                        <?php endwhile; ?>
                        <?php wp_reset_postdata(); ?>
                    </div>
                    <?php else: ?>
                        <p>最新の記事はありません。</p>
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