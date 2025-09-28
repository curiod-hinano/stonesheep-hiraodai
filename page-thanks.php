<?php
/**
 * page-contact.php
 */
get_header(); ?>

<div class="page_body">
    <div class="page_body_content contact">
        <h2>CONTACT</h2>
        <div class="page_body_content_contact_wrap">
            <p>お問い合わせありがとうございました。</p>
            <div class="page_body_content_contact_wrap_btn">
                <a href="<?php echo home_url(''); ?>">TOPへ戻る</a>
            </div>
        </div>
    </div>
    <div class="page_body_content spot">
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