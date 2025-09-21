<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    
    <meta charset="<?php bloginfo( 'charset' ); ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <!-- フォント読み込み -->
    <link rel="stylesheet" href="https://use.typekit.net/yag0bkk.css">

    <script>
        (function(d) {
            var config = {
            kitId: 'jwf5xnf',
            scriptTimeout: 3000,
            async: true
            },
            h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
        })(document);
    </script>

    <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/yakuhanjp@3.4.1/dist/css/yakuhanjp.min.css">
    <link rel="stylesheet" href="https://use.typekit.net/jfv8vwc.css"> -->
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- Favicon -->
    <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/public/img/common/favicon.ico">
    <link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/assets/public/img/common/apple-touch-icon.png">
    <link rel="android-chrome" href="<?php echo get_template_directory_uri(); ?>/assets/public/img/common/android-chrome.png">
    
    <?php wp_head(); ?>
</head>

<body <?php body_class(''); ?>>

    <?php wp_body_open(); ?>

    <?php
        global $post;
        if ($post) {
            $post_name = $post->post_name;
        } else {
            $post_name = '';
        }
    ?>

    <!-- ローディングアニメーション START -->
    <div class="loading" aria-hidden="true">
        <div class="loading_inner">
            <div class="loading_img">
            <img class="loading_img01" src="<?php echo get_template_directory_uri(); ?>/assets/public/img/loading/loading01.jpg" alt="">
            <img class="loading_img02" src="<?php echo get_template_directory_uri(); ?>/assets/public/img/loading/loading02.jpg" alt="">
            <img class="loading_img03" src="<?php echo get_template_directory_uri(); ?>/assets/public/img/loading/loading03.jpg" alt="">
            <img class="loading_img04" src="<?php echo get_template_directory_uri(); ?>/assets/public/img/loading/loading04.jpg" alt="">
            <img class="loading_img05" src="<?php echo get_template_directory_uri(); ?>/assets/public/img/loading/loading05.jpg" alt="">
            <img class="loading_img06" src="<?php echo get_template_directory_uri(); ?>/assets/public/img/loading/loading06.jpg" alt="">
            <img class="loading_img07" src="<?php echo get_template_directory_uri(); ?>/assets/public/img/loading/loading07.jpg" alt="">
            <img class="loading_img08" src="<?php echo get_template_directory_uri(); ?>/assets/public/img/loading/loading08.jpg" alt="">
            </div>
        </div>
        <div class="loading_logo">
            <img class="loading_logo" src="<?php echo get_template_directory_uri(); ?>/assets/public/img/loading/loading_logo.svg" alt="">
        </div>
    </div>
    <!-- ローディングアニメーション END -->


    <div id="page" class="site <?php echo $page_slug; ?> <?php if( !is_front_page()):?>bcol_theme_blue_bk<?php endif; ?>">
    
        <header id="header" class="header">
            <div class="header_wrap">
                <h1 id="headerLogo" class="header_logo_wrap">
                    <a class="header_logo" href="<?php echo home_url(); ?>">
                        <img class="header_logo_main" src="<?php echo get_template_directory_uri(); ?>/assets/public/img/common/logo.svg" alt="">
                    </a>
                </h1>
            </div>
            <div class="header_btn">
                <!-- <div class="header_reserve d_only_pc">
                    <a href="<?php echo home_url(); ?>/reservation" class="header_reserve_link">
                        <span>RESERVE</span>
                    </a>
                </div> -->
                <div class="header_hamburger"><span></span><span></span><span></span></div>
            </div>
            <nav class="header_menuList">
                <ul class="header_menuList_wrap">
                    <?php wp_nav_menu( array(
                        'theme_location'=>'global-nav', 
                        'container'     =>'', 
                        'menu_class'    =>'',
                        'items_wrap'    =>'%3$s'));
                    ?>
                </ul>
            </nav>
        </header>

        <div class="d_only_sp">
            <div class="bottom_fixed">
                <a class="bottom_fixed_btn" href="">RESERVE</a>
            </div>
        </div>
        
        <main id="content" class="menu-blur" role="main">