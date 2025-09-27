<?php
/**
 * page-me.php
 */
get_header(); ?>

<div class="page_body">
    <div class="page_body_content me">
        <div class="page_body_content_head">
            <div class="page_body_content_head_ttl">
                <h2>わたしに出会う</h2>
                <p>
                    火と、水と、風と、土。<br>
                    実際に平尾台を訪れ、<br>
                    この土地の力を、あなたの心と体で直接感じるための、<br>
                    いくつかの体験をご用意しています。<br><br>
                    どのプログラムも、専門のガイドが丁寧にご案内しますので、<br>
                    初めての方でも、安心してご参加いただけます。
                </p>
            </div>
            <div class="page_body_content_head_index">
                <p>目次</p>
                <ul>
                    <li><a href="#me01">大地とひとつになる。<br>〜裸足であるく平尾台〜</a></li>
                    <li><a href="#me02">洞窟の、しずけさに浸る<br>〜鍾乳洞ツアー〜</a></li>
                    <li><a href="#me03">石のひつじと、すごす時間<br>〜平尾台で過ごす時間〜</a></li>
                </ul>
            </div>
        </div>
        <div id="me01" class="page_body_content_wrap" style="background-color:#03581D;">
            <h3>見出し入ります24w見出<br>見出し入ります24w見出</h3>
            <div class="page_body_content_wrap_img">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/public/img/test/test_me01.jpg" alt="">
            </div>
            <div class="page_body_content_wrap_txt">
                <p>
                    毎日、たくさんの情報に囲まれて、頭で考えてばかりいませんか。<br>
                    やるべきことに追われ、過去を悔やみ、未来を心配する。<br>
                    いつの間にか、私たち自身の「からだ」や「こころ」の声を聞くことを、<br>
                    忘れてしまっているかもしれません。<br><br>
                    例えば、平尾台はそんなあなたのための、広大な「余白」です。<br><br>
                    ここでは、難しいことは何もありません。<br>
                    ただ、風の音を聴き、土の感触を確かめ、火の揺らぎを眺め、水の冷たさに驚く。<br>
                    子どもの頃のように、五感をすべて開いて、世界をまっすぐに感じてみる。<br><br>
                    そうしているうちに、頭の中を占めていた思考のノイズが、すっと静かになっていく。<br>
                    そして、忘れていた「心地よさ」や「確かな感覚」が、内側からゆっくりと目覚め始めます。<br><br>
                    ここは、知識を学ぶ場所ではありません。<br>
                    あなた自身が、あなたにとっての「こたえ」を、自分の感覚の中から「発見」する場所。<br><br>
                    『こころと、からだの、再起動』<br>
                    少し草原を歩きましょうか。平尾台で、ありのままの自分に出会うために。
                </p>
            </div>
            <div class="page_body_content_wrap_btn">
                <a class="green" href="<?php echo home_url(''); ?>">MORE</a>
            </div>
        </div>
        <div id="me02" class="page_body_content_wrap" style="background-color:#1F9DCC;">
            <h3>見出し入ります24w見出<br>見出し入ります24w見出</h3>
            <div class="page_body_content_wrap_img">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/public/img/test/test_me02.jpg" alt="">
            </div>
            <div class="page_body_content_wrap_txt">
                <p>
                    毎日、たくさんの情報に囲まれて、頭で考えてばかりいませんか。<br>
                    やるべきことに追われ、過去を悔やみ、未来を心配する。<br>
                    いつの間にか、私たち自身の「からだ」や「こころ」の声を聞くことを、<br>
                    忘れてしまっているかもしれません。<br><br>
                    例えば、平尾台はそんなあなたのための、広大な「余白」です。<br><br>
                    ここでは、難しいことは何もありません。<br>
                    ただ、風の音を聴き、土の感触を確かめ、火の揺らぎを眺め、水の冷たさに驚く。<br>
                    子どもの頃のように、五感をすべて開いて、世界をまっすぐに感じてみる。<br><br>
                    そうしているうちに、頭の中を占めていた思考のノイズが、すっと静かになっていく。<br>
                    そして、忘れていた「心地よさ」や「確かな感覚」が、内側からゆっくりと目覚め始めます。<br><br>
                    ここは、知識を学ぶ場所ではありません。<br>
                    あなた自身が、あなたにとっての「こたえ」を、自分の感覚の中から「発見」する場所。<br><br>
                    『こころと、からだの、再起動』<br>
                    少し草原を歩きましょうか。平尾台で、ありのままの自分に出会うために。
                </p>
            </div>
            <div class="page_body_content_wrap_btn">
                <a class="blue" href="<?php echo home_url(''); ?>">MORE</a>
            </div>
        </div>
        <?php 
            get_template_part('blocks/bl_lovers');
            get_template_part('blocks/bl_share');
            get_template_part('blocks/bl_popular');
        ?>
    </div>
</div>

<?php
    get_footer();
?>