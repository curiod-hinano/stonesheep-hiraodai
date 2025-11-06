<?php
/**
 * page-map.php
 */
get_header(); ?>

<div class="page_body">
    <div class="page_body_content post_body_content privacy">
        <div class="post_body_content_main">
            <h2>Privacy Policy</h2>
            <div class="post_body_content_main_wrap">
                <div class="post_body_content_main_wrap_body">
                    <?php the_content(); ?>
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