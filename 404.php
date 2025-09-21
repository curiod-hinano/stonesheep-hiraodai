<?php
/**
 * 404.php
 */
    get_header();
?>

<section id="head" class="page_head pt_130_pc pt_80">
    <div class="sec_inner">
        <div class="page_head_wrap">
            <div class="page_head_wrap_txt">
                <?php
                    get_template_part('blocks/heading_2', null, [
                        'ttl-en' => '404 NOT FOUND',
                        'ttl-ja' => 'お探しのページは見つかりませんでした',
                        'class' => ''
                    ]);
                ?>
            </div>
        </div>
    </div>
</section>

<section id="page" class="single pt_100_pc pt_60 pb_200_pc pb_100">
    <div class="sec_inner">
        <div class="single_post_body">
            <h2>お探しのページは見つかりませんでした。</h2>
            <p>お探しのページは移動または削除された可能性があります。<br>
                直接URLを入力された場合は、URLが正しく入力されているかご確認ください。</p>
            <?php
                get_template_part('blocks/btn', null, [
                    'link'    => '/',
                    'txt'     => 'HOME',
                    'class'   => 'mt_50_pc mt_30 mb_30_pc mb_50',
                ]);
            ?>
        </div>
    </div>
</section>

<?php
    get_template_part('sections/sec_reserve');
    get_template_part('sections/sec_footer_links');
    get_template_part('sections/sec_access');
    get_footer();
?>
