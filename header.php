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
    
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-HQ6YJFPDXQ"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-HQ6YJFPDXQ');
    </script>

    <!-- 下層ページの背景が画像設定 -->
    <?php
        // トップページとsingle-feature.php以外の場合のみ適用
        if (!is_front_page() && !is_singular('feature')) :
            //背景画像設定
            $bg_img = '';
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
        <style>
            .page_body:before {
                background-image: url('<?php echo esc_url($bg_img); ?>');
                background-repeat: no-repeat;
                background-position: center top;
            }
        </style>
    <?php endif; ?>

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
    <?php if(is_front_page()):?>
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
    <?php endif; ?>
    <!-- ローディングアニメーション END -->


    <div id="page" class="site <?php echo $page_slug; ?>">
    
        <div class="d_only_pc">
            <header id="header" class="header">
                <div class="header_wrap">
                    <div class="header_wrap_bl01 <?php if ( !is_front_page() ) : ?>visible<?php endif; ?>">
                        <div class="header_logo">
                            <h1 id="headerLogo">
                                <a class="header_logo" href="<?php echo home_url(); ?>">
                                    <?php
                                        if ( is_front_page() ) :
                                            $colorLogo = '#03581D';
                                            $newsBkColor = '#03581D';
                                            $newsTxtColor = '#F3FC85';
                                        else:
                                            $colorLogo = '#03581D';
                                            $newsBkColor = '#03581D';
                                            $newsTxtColor = '#F3FC85';
                                        endif;
                                    ?>
                                    
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="294.79" height="249.334" viewBox="0 0 294.79 249.334">
                                        <defs>
                                            <clipPath id="clip-path">
                                            <rect id="長方形_1" data-name="長方形 1" width="122" height="78.031" fill="#03581d"/>
                                            </clipPath>
                                            <clipPath id="clip-path-2">
                                            <rect id="長方形_3" data-name="長方形 3" width="294.789" height="11.978" fill="#03581d"/>
                                            </clipPath>
                                            <clipPath id="clip-path-3">
                                            <rect id="長方形_68" data-name="長方形 68" width="294.79" height="111.345" fill="#03581d"/>
                                            </clipPath>
                                        </defs>
                                        <g id="グループ_1653" data-name="グループ 1653" transform="translate(-255 -96)">
                                            <g id="グループ_9" data-name="グループ 9" transform="translate(255 96)">
                                            <g id="グループ_1" data-name="グループ 1" transform="translate(0 0)" clip-path="url(#clip-path)">
                                                <path id="パス_1" data-name="パス 1" d="M5.171,69.562l1,1L.241,76.494,0,78.029H.826l4.345-4.344.916.916,5.027-5.027,1,1L4.662,78.029H6.784L11.115,73.7l.916.916,5.029-5.027,1,1-7.442,7.441h2.123l4.319-4.318.916.916L23,69.6l1,1-7.428,7.428H18.7L23,73.724l.916.915,5.027-5.027,1,1-7.415,7.417h2.121l4.294-4.294.916.918,5.029-5.029,1,1-7.4,7.4h2.123l4.281-4.281.916.916,5.027-5.027,1,1-7.391,7.391h2.123l4.268-4.268.916.916,5.027-5.027,1,1L40.4,78.029h2.121l4.256-4.256.918.918,5.027-5.029,1,1L46.36,78.029h2.121l4.244-4.244.918.916,5.026-5.027,1,1-7.354,7.354h2.121L58.668,73.8l.918.916,5.029-5.027,1,1-7.342,7.341H60.4l4.219-4.218.916.916L70.558,69.7l1,1-7.33,7.328h2.123l4.206-4.207.916.918L76.5,69.712l1,1-7.317,7.315h2.123L76.5,73.836l.916.918,5.029-5.029,1,1-7.305,7.3h2.123l4.182-4.181.916.916,5.027-5.027,1,1L82.1,78.029h2.121l4.169-4.168.916.916,5.029-5.027,1,1-7.28,7.278h2.123l4.157-4.155.916.916,5.027-5.027,1,1-7.267,7.265h2.123l4.144-4.144.916.916,5.027-5.027,1,1L99.97,78.029h2.123l4.131-4.131.916.916,5.029-5.027,1,1-7.241,7.241h2.121l4.119-4.118.916.916,5.027-5.027,1,1-7.228,7.228h2.121l4.107-4.105.916.916,2.344-2.345-2-11.119a7.306,7.306,0,0,1-.114-1.283V54.676a17.887,17.887,0,0,0-3.053-9.995l-9.839-14.6a17.932,17.932,0,0,1-1.477-2.655l-3.04-6.757q-.325-.719-.584-1.464L100,15.556a17.887,17.887,0,0,0-7.175-9.14L87.342,2.869A17.888,17.888,0,0,0,77.625,0H75.419a17.885,17.885,0,0,0-3.606.367L58.523,3.1,47.766,5.861a17.888,17.888,0,0,0-10.334,7.25l-1.84,2.7a17.807,17.807,0,0,1-2.3,2.735L18.737,32.729A17.886,17.886,0,0,0,16.2,35.834L5.6,52.234a17.9,17.9,0,0,0-2.645,6.931L.614,74.12Z" transform="translate(0 0.001)" fill="#03581d"/>
                                                <path id="パス_2" data-name="パス 2" d="M86.393,51.979l-3.837,3.837h2.121l2.038-2.038Z" transform="translate(35.283 22.215)" fill="#03581d"/>
                                            </g>
                                            </g>
                                            <g id="グループ_11" data-name="グループ 11" transform="translate(255 333.356)">
                                            <g id="グループ_5" data-name="グループ 5" transform="translate(0 0)" clip-path="url(#clip-path-2)">
                                                <path id="パス_22" data-name="パス 22" d="M7.237,7.057h-4.4a.642.642,0,0,1,0-1.284h4.4V4.307a2.95,2.95,0,1,0-5.9,0V11.2a.679.679,0,0,1-.669.669A.68.68,0,0,1,0,11.2V4.307A4.222,4.222,0,0,1,4.288,0,4.212,4.212,0,0,1,8.577,4.307V11.2a.67.67,0,0,1-1.339,0Z" transform="translate(0 0)" fill="#03581d"/>
                                                <path id="パス_23" data-name="パス 23" d="M20.861.778a.67.67,0,0,1,1.339,0V9.064a2.886,2.886,0,1,1-5.772,0V2.913a1.548,1.548,0,1,0-3.094,0V11.2A.67.67,0,1,1,12,11.2V2.913a2.886,2.886,0,1,1,5.772,0V9.064a1.548,1.548,0,1,0,3.094,0Z" transform="translate(0.525 0)" fill="#03581d"/>
                                                <path id="パス_24" data-name="パス 24" d="M26.292,11.732a.707.707,0,0,1-.706-.706V.931a.707.707,0,0,1,.706-.706h2.858a5.66,5.66,0,0,1,5.772,5.753,5.659,5.659,0,0,1-5.772,5.754Zm2.84-1.267a4.377,4.377,0,0,0,4.451-4.487,4.378,4.378,0,0,0-4.451-4.487H26.924v8.974Z" transform="translate(1.12 0.01)" fill="#03581d"/>
                                                <path id="パス_25" data-name="パス 25" d="M46.7,1.492h-3.4A.64.64,0,0,1,42.661.86a.64.64,0,0,1,.633-.634h8.142a.64.64,0,0,1,.633.634.64.64,0,0,1-.633.633h-3.4v9.7a.67.67,0,1,1-1.339,0Z" transform="translate(1.867 0.01)" fill="#03581d"/>
                                                <path id="パス_26" data-name="パス 26" d="M61.872,6.618H56.046v4.577a.669.669,0,0,1-1.338,0V.773a.669.669,0,0,1,1.338,0V5.351h5.826V.773a.67.67,0,0,1,1.339,0V11.195a.67.67,0,0,1-1.339,0Z" transform="translate(2.394 0.005)" fill="#03581d"/>
                                                <path id="パス_27" data-name="パス 27" d="M67.374,11.732a.707.707,0,0,1-.706-.706V.931a.706.706,0,0,1,.706-.7h5.862a.64.64,0,0,1,.634.633.64.64,0,0,1-.634.633H68.007V5.346h4.686a.634.634,0,0,1,0,1.267H68.007v3.853h5.228a.634.634,0,0,1,0,1.267Z" transform="translate(2.918 0.01)" fill="#03581d"/>
                                                <path id="パス_28" data-name="パス 28" d="M83.13,11.732a.634.634,0,0,1,0-1.267h4.235A1.911,1.911,0,0,0,89.372,8.53a1.883,1.883,0,0,0-2.007-1.9h-2.01a3.183,3.183,0,0,1-3.328-3.2,3.182,3.182,0,0,1,3.328-3.2h4.253a.641.641,0,0,1,.633.633.641.641,0,0,1-.633.633H85.373a1.912,1.912,0,0,0-2.007,1.937,1.883,1.883,0,0,0,2.007,1.9h2.009a3.2,3.2,0,1,1,0,6.4Z" transform="translate(3.59 0.01)" fill="#03581d"/>
                                                <path id="パス_29" data-name="パス 29" d="M97,1.492H93.6A.64.64,0,0,1,92.965.86.64.64,0,0,1,93.6.226h8.142a.64.64,0,0,1,.632.634.64.64,0,0,1-.632.633h-3.4v9.7a.67.67,0,1,1-1.339,0Z" transform="translate(4.068 0.01)" fill="#03581d"/>
                                                <path id="パス_30" data-name="パス 30" d="M110.568,11.977a5.989,5.989,0,1,1,6.007-5.989,5.976,5.976,0,0,1-6.007,5.989m4.668-5.989a4.668,4.668,0,1,0-9.335,0,4.668,4.668,0,1,0,9.335,0" transform="translate(4.576 0)" fill="#03581d"/>
                                                <path id="パス_31" data-name="パス 31" d="M128.3.778a.67.67,0,0,1,1.339,0V9.064a2.886,2.886,0,1,1-5.772,0V2.913a1.548,1.548,0,1,0-3.094,0V11.2a.67.67,0,1,1-1.339,0V2.913a2.886,2.886,0,1,1,5.772,0V9.064a1.548,1.548,0,1,0,3.094,0Z" transform="translate(5.227 0)" fill="#03581d"/>
                                                <path id="パス_32" data-name="パス 32" d="M133.731,11.732a.707.707,0,0,1-.706-.706V.931a.706.706,0,0,1,.706-.7h5.862a.641.641,0,0,1,.634.633.641.641,0,0,1-.634.633h-5.229V5.346h4.686a.634.634,0,1,1,0,1.267h-4.686v3.853h5.229a.634.634,0,0,1,0,1.267Z" transform="translate(5.822 0.01)" fill="#03581d"/>
                                                <path id="パス_33" data-name="パス 33" d="M149.5,11.732a.692.692,0,0,1-.7-.688V.931a.707.707,0,0,1,.7-.706h4.324a3.1,3.1,0,0,1,3.2,3.148,2.88,2.88,0,0,1-1.483,2.589,2.927,2.927,0,0,1,1.483,2.605,3.111,3.111,0,0,1-3.2,3.166Zm4.235-1.267a1.93,1.93,0,0,0,1.954-1.935,1.862,1.862,0,0,0-1.954-1.917H151.73a.629.629,0,0,1-.634-.635.64.64,0,0,1,.634-.633h2.008a1.893,1.893,0,0,0,1.954-1.917c0-1.285-.977-1.937-2.407-1.937h-3.148v8.974Z" transform="translate(6.512 0.01)" fill="#03581d"/>
                                                <path id="パス_34" data-name="パス 34" d="M161,11.732a.707.707,0,0,1-.706-.706V.931a.706.706,0,0,1,.706-.7h5.862a.641.641,0,0,1,.634.633.641.641,0,0,1-.634.633h-5.229V5.346h4.686a.634.634,0,1,1,0,1.267h-4.686v3.853h5.229a.634.634,0,0,1,0,1.267Z" transform="translate(7.015 0.01)" fill="#03581d"/>
                                                <path id="パス_35" data-name="パス 35" d="M175.839,11.732a5.659,5.659,0,0,1-5.772-5.754A5.659,5.659,0,0,1,175.839.226h2.243a.64.64,0,0,1,.634.633.64.64,0,0,1-.634.633h-2.225a4.378,4.378,0,0,0-4.451,4.487,4.377,4.377,0,0,0,4.451,4.487h2.225a.634.634,0,0,1,0,1.267Z" transform="translate(7.443 0.01)" fill="#03581d"/>
                                                <path id="パス_36" data-name="パス 36" d="M188.953,7.057h-4.4a.642.642,0,0,1,0-1.284h4.4V4.307a2.95,2.95,0,1,0-5.9,0V11.2a.67.67,0,0,1-1.339,0V4.307a4.288,4.288,0,1,1,8.577,0V11.2a.67.67,0,0,1-1.339,0Z" transform="translate(7.953 0)" fill="#03581d"/>
                                                <path id="パス_37" data-name="パス 37" d="M205.761,2.715a1.35,1.35,0,1,0-2.7,0V9.282a2.66,2.66,0,1,1-5.319,0V2.715a1.35,1.35,0,1,0-2.7,0V11.2a.669.669,0,1,1-1.338,0V2.734a2.687,2.687,0,1,1,5.373,0V9.3a1.323,1.323,0,1,0,2.642,0V2.734a2.687,2.687,0,1,1,5.373,0V11.2a.67.67,0,1,1-1.339,0Z" transform="translate(8.478 0)" fill="#03581d"/>
                                                <path id="パス_38" data-name="パス 38" d="M211.059,11.732a.707.707,0,0,1-.706-.706V.931a.706.706,0,0,1,.706-.7h5.862a.64.64,0,0,1,.634.633.64.64,0,0,1-.634.633h-5.228V5.346h4.686a.634.634,0,0,1,0,1.267h-4.686v3.853h5.228a.634.634,0,0,1,0,1.267Z" transform="translate(9.206 0.01)" fill="#03581d"/>
                                                <path id="パス_39" data-name="パス 39" d="M226.814,11.732a.634.634,0,0,1,0-1.267h4.235a1.911,1.911,0,0,0,2.007-1.935,1.883,1.883,0,0,0-2.007-1.9H229.04a3.183,3.183,0,0,1-3.329-3.2,3.183,3.183,0,0,1,3.329-3.2h4.252a.64.64,0,0,1,.633.633.64.64,0,0,1-.633.633h-4.235a1.912,1.912,0,0,0-2.007,1.937,1.883,1.883,0,0,0,2.007,1.9h2.009a3.2,3.2,0,1,1,0,6.4Z" transform="translate(9.878 0.01)" fill="#03581d"/>
                                                <path id="パス_40" data-name="パス 40" d="M244.593,6.618h-5.826v4.577a.669.669,0,1,1-1.338,0V.773a.669.669,0,0,1,1.338,0V5.351h5.826V.773a.67.67,0,0,1,1.339,0V11.195a.67.67,0,0,1-1.339,0Z" transform="translate(10.391 0.005)" fill="#03581d"/>
                                                <path id="パス_41" data-name="パス 41" d="M250.1,11.732a.707.707,0,0,1-.706-.706V.931a.706.706,0,0,1,.706-.7h5.862a.641.641,0,0,1,.634.633.641.641,0,0,1-.634.633h-5.229V5.346h4.686a.634.634,0,1,1,0,1.267h-4.686v3.853h5.229a.634.634,0,1,1,0,1.267Z" transform="translate(10.914 0.01)" fill="#03581d"/>
                                                <path id="パス_42" data-name="パス 42" d="M260.323,11.732a.707.707,0,0,1-.706-.706V.931a.706.706,0,0,1,.706-.7h5.862a.641.641,0,0,1,.634.633.641.641,0,0,1-.634.633h-5.229V5.346h4.686a.634.634,0,1,1,0,1.267h-4.686v3.853h5.229a.634.634,0,1,1,0,1.267Z" transform="translate(11.362 0.01)" fill="#03581d"/>
                                                <path id="パス_43" data-name="パス 43" d="M271.183,7.806v3.383a.669.669,0,1,1-1.338,0V.931a.706.706,0,0,1,.7-.706h3.818a3.79,3.79,0,1,1,0,7.581ZM274.35,6.54a2.468,2.468,0,0,0,2.479-2.514,2.473,2.473,0,0,0-2.479-2.534h-3.167V6.54Z" transform="translate(11.809 0.01)" fill="#03581d"/>
                                                <path id="パス_44" data-name="パス 44" d="M280.7,10.543a.9.9,0,1,1,.9.9.9.9,0,0,1-.9-.9" transform="translate(12.284 0.422)" fill="#03581d"/>
                                            </g>
                                            </g>
                                            <g id="グループ_1650" data-name="グループ 1650" transform="translate(255 204)">
                                            <g id="グループ_1647" data-name="グループ 1647">
                                                <g id="グループ_1646" data-name="グループ 1646" clip-path="url(#clip-path-3)">
                                                <path id="パス_1101" data-name="パス 1101" d="M123.741,151.06H96.174a.729.729,0,1,0,0,1.458h27.568a9.832,9.832,0,0,1,0,19.664.729.729,0,1,0,0,1.458,11.29,11.29,0,1,0,0-22.58" transform="translate(-46.338 -73.34)" fill="#03581d"/>
                                                <path id="パス_1102" data-name="パス 1102" d="M211.017,163.159a.729.729,0,0,0-.729.729,9.832,9.832,0,1,1-19.663,0V132.206a.729.729,0,0,0-1.459,0v31.682a11.29,11.29,0,0,0,22.58,0,.729.729,0,0,0-.729-.729" transform="translate(-91.841 -63.832)" fill="#03581d"/>
                                                <path id="パス_1103" data-name="パス 1103" d="M242.4,155.526a.729.729,0,0,0-.729.729v6.14a2.043,2.043,0,1,1-4.086,0V152.239a3.5,3.5,0,0,0-7,0v5.846a.729.729,0,0,0,1.459,0v-5.846a2.043,2.043,0,1,1,4.086,0V162.76a.727.727,0,0,0,.062.3,3.5,3.5,0,0,0,6.878,0,.727.727,0,0,0,.062-.3v-6.5a.729.729,0,0,0-.729-.729" transform="translate(-111.947 -72.213)" fill="#03581d"/>
                                                <path id="パス_1104" data-name="パス 1104" d="M303.75,159.044h16.791a.73.73,0,0,0,.336-.082,5.155,5.155,0,0,0,0-10.144.724.724,0,0,0-.336-.082h-20.4a.729.729,0,0,0,0,1.458h19.814a3.7,3.7,0,1,1,0,7.391H303.75a5.154,5.154,0,1,0,0,10.307H323.7a.729.729,0,0,0,0-1.458H303.75a3.7,3.7,0,1,1,0-7.391" transform="translate(-144.969 -72.212)" fill="#03581d"/>
                                                <path id="パス_1105" data-name="パス 1105" d="M285.037,167.352a.729.729,0,0,0-.729.729,4.551,4.551,0,1,1-9.1,0V136.239a.729.729,0,0,0-1.459,0v31.842a6.009,6.009,0,1,0,12.019,0,.729.729,0,0,0-.729-.729" transform="translate(-132.905 -65.79)" fill="#03581d"/>
                                                <path id="パス_1106" data-name="パス 1106" d="M256.127,7.2h30.684a.729.729,0,0,0,0-1.459H256.127a.729.729,0,0,0,0,1.459" transform="translate(-123.996 -2.786)" fill="#03581d"/>
                                                <path id="パス_1107" data-name="パス 1107" d="M258.192,14.407a.73.73,0,0,0-1.032,0L235.323,36.244a.729.729,0,0,0,1.032,1.031l21.837-21.837a.73.73,0,0,0,0-1.032" transform="translate(-114.146 -6.891)" fill="#03581d"/>
                                                <path id="パス_1108" data-name="パス 1108" d="M314.905,42.321a16.589,16.589,0,0,0-16.57-16.57H278.285a16.57,16.57,0,0,0,0,33.141h20.049a16.589,16.589,0,0,0,16.57-16.57m-16.57,15.112H278.285a15.112,15.112,0,0,1,0-30.224h20.049a15.112,15.112,0,0,1,0,30.224" transform="translate(-127.063 -12.502)" fill="#03581d"/>
                                                <path id="パス_1109" data-name="パス 1109" d="M390.232,50.158a.729.729,0,0,0,0-1.458,4.557,4.557,0,0,1-4.551-4.551V7.451a.729.729,0,0,0-1.459,0v36.7a6.016,6.016,0,0,0,6.01,6.009" transform="translate(-186.541 -3.264)" fill="#03581d"/>
                                                <path id="パス_1110" data-name="パス 1110" d="M421.057,48.472V32.328h9.714a.729.729,0,0,0,0-1.458h-9.714v-16.2h9.29a.729.729,0,1,0,0-1.459h-9.29V6.224a.729.729,0,1,0-1.459,0v6.991h-9.29a.729.729,0,1,0,0,1.459h9.29V30.9a9.166,9.166,0,0,0,.729,18.3.729.729,0,0,0,.73-.729m-1.459-.763a7.708,7.708,0,0,1,0-15.346Z" transform="translate(-198.852 -2.667)" fill="#03581d"/>
                                                <path id="パス_1111" data-name="パス 1111" d="M42.831,136.716H32.412a.729.729,0,0,0-.73.729V157.5a15.112,15.112,0,1,1-26.258-10.2l.028-.027L6.644,146.1a.722.722,0,0,0,.107-.132l8.413-8.412a.729.729,0,0,0-.516-1.245H4.228a.729.729,0,1,0,0,1.458h8.659l-7.5,7.5A16.571,16.571,0,1,0,33.141,157.5V138.174h9.691a.729.729,0,1,0,0-1.458" transform="translate(0 -66.18)" fill="#03581d"/>
                                                <path id="パス_1112" data-name="パス 1112" d="M10.021,32.412A11.3,11.3,0,0,0,21.311,43.7H35.374a.729.729,0,0,0,0-1.459H21.311a9.832,9.832,0,1,1,0-19.663H35.374a.729.729,0,0,0,0-1.459H16.03a4.551,4.551,0,0,1,0-9.1h6.684a6.01,6.01,0,0,0,0-12.02H15.336a.729.729,0,1,0,0,1.459h7.379a4.551,4.551,0,0,1,0,9.1H15.336a.733.733,0,0,0-.355.092,6.006,6.006,0,0,0,.811,11.916,11.3,11.3,0,0,0-5.771,9.843" transform="translate(-4.865)" fill="#03581d"/>
                                                <path id="パス_1113" data-name="パス 1113" d="M157.172,10.562h-5.749a16.57,16.57,0,1,0,0,33.141.729.729,0,0,0,0-1.459,15.112,15.112,0,1,1,0-30.224h5.749a6.01,6.01,0,1,0,0-12.019H137.134a.729.729,0,1,0,0,1.459h20.038a4.551,4.551,0,1,1,0,9.1" transform="translate(-65.471 0)" fill="#03581d"/>
                                                <path id="パス_1114" data-name="パス 1114" d="M87.129,43.7a11.3,11.3,0,0,0,11.29-11.29.729.729,0,0,0-1.459,0,9.832,9.832,0,1,1-19.663,0V.73a.729.729,0,0,0-1.459,0V32.412A11.3,11.3,0,0,0,87.129,43.7" transform="translate(-36.82 0)" fill="#03581d"/>
                                                <path id="パス_1115" data-name="パス 1115" d="M211.484,83.677a.729.729,0,0,0,1.031-1.031l-6.231-6.232a.729.729,0,1,0-1.032,1.032Z" transform="translate(-99.547 -36.996)" fill="#03581d"/>
                                                </g>
                                            </g>
                                            <g id="グループ_1649" data-name="グループ 1649">
                                                <g id="グループ_1648" data-name="グループ 1648" clip-path="url(#clip-path-3)">
                                                <path id="パス_1116" data-name="パス 1116" d="M496.138,159.532H479.293a3.87,3.87,0,1,1,0-7.739h16.845a5.328,5.328,0,0,0,0-10.655h-8.923a.729.729,0,1,0,0,1.458h8.923a3.87,3.87,0,0,1,0,7.739h-17.45a.727.727,0,0,0-.34.084,5.328,5.328,0,0,0,0,10.488.73.73,0,0,0,.341.084h17.45a8.468,8.468,0,0,1,0,16.936H479.293a3.87,3.87,0,1,1,3.869-3.87.729.729,0,0,0,1.459,0,5.328,5.328,0,1,0-6.273,5.244.73.73,0,0,0,.341.084h17.45a9.926,9.926,0,0,0,0-19.852" transform="translate(-230.111 -68.523)" fill="#03581d"/>
                                                <path id="パス_1117" data-name="パス 1117" d="M432.911,143.81a.729.729,0,0,0-.73.729v6.14a2.043,2.043,0,1,1-4.086,0v-6.04a3.5,3.5,0,1,0-7,0v16.2a9.166,9.166,0,0,0,.729,18.3.729.729,0,0,0,.73-.729V162.267h9.714a.729.729,0,0,0,0-1.458h-9.714V144.64a2.043,2.043,0,1,1,4.086,0v6.4a.727.727,0,0,0,.062.3,3.5,3.5,0,0,0,6.879,0,.727.727,0,0,0,.062-.3v-6.5a.729.729,0,0,0-.729-.729m-11.819,33.837a7.708,7.708,0,0,1,0-15.346Z" transform="translate(-200.346 -68.523)" fill="#03581d"/>
                                                <path id="パス_1118" data-name="パス 1118" d="M387.68,136.5h-9.29v-4.759a.729.729,0,0,0-1.459,0V136.5h-9.29a.729.729,0,1,0,0,1.458h9.29v25.465a.729.729,0,0,0,1.459,0V137.956h9.29a.729.729,0,0,0,0-1.458" transform="translate(-178.137 -63.606)" fill="#03581d"/>
                                                <path id="パス_1119" data-name="パス 1119" d="M562.858,201.864a3.5,3.5,0,1,0,3.5,3.5,3.505,3.505,0,0,0-3.5-3.5m0,5.545a2.043,2.043,0,1,1,2.043-2.044,2.046,2.046,0,0,1-2.043,2.044" transform="translate(-271.569 -98.005)" fill="#03581d"/>
                                                </g>
                                            </g>
                                            </g>
                                        </g>
                                    </svg>
                                </a>
                            </h1>
                        </div>
                        <div class="header_news">
                            <?php
                                $paged = (int) get_query_var('paged');
                                $args=array( 
                                    'post_type' => 'post', //カスタム投稿名
                                    'posts_per_page'=> 1,
                                    'paged' => $paged,
                                    'orderby' => 'post_date',
                                    'order' => 'DESC',
                                    'post_status' => 'publish',
                                );
                                $the_query = new WP_Query( $args );
                                if( $the_query->have_posts() ):
                                while ( $the_query->have_posts() ) : $the_query->the_post();
                            ?>
                                <a class="header_news_link" href="<?php the_permalink(); ?>">
                                    <span class="header_news_link_midashi" style="background-color: <?php echo $newsBkColor; ?>; color: <?php echo $newsTxtColor; ?>;">EVENT/NEWS</span>
                                    <span class="header_news_link_body" style="background-color: <?php echo $newsBkColor; ?>;">
                                        <img src="<?php echo get_the_post_thumbnail_url(); ?>" alt="">
                                        <span class="header_news_link_body_ttl" style="color: <?php echo $newsTxtColor; ?>;"><?php the_title(); ?></span>
                                        <span class="header_news_link_body_date" style="color: <?php echo $newsTxtColor; ?>;"><?php echo get_the_date('Y.m.d'); ?></span>
                                    </span>
                                </a>
                            <?php endwhile; ?>
                            <?php wp_reset_postdata(); ?>
                            <?php endif; ?>
                        </div>
                        <div class="header_link">
                            <a class="header_link_btn reservation_btn" href="https://hiraodai-ikimura.com/" target="_blank" rel="noopener">
                                <span class="header_link_btn_logo alltime">
                                    <img src="<?php echo get_template_directory_uri(); ?>/assets/public/img/common/ikimura_logo.png" alt="山の家 粋邑">
                                </span>
                                <span class="header_link_btn_logo hovertime">
                                    <img src="<?php echo get_template_directory_uri(); ?>/assets/public/img/common/ikimura_logo_green.png" alt="山の家 粋邑">
                                </span>
                                <span class="header_link_btn_txt">平尾台に泊まる</span>
                            </a>
                        </div>
                    </div>
                    <div class="header_wrap_bl02 <?php if ( !is_front_page() ) : ?>visible<?php endif; ?>">
                        <div class="header_menuList_wrap">
                            <div class="header_menuList_wrap_headttl">
                                <p style="color:<?php echo $colorLogo; ?>;">平尾台で出会う旅</p>
                            </div>
                            <ul class="header_menuList_wrap_01">
                                <li class="top"><a href="<?php echo home_url(); ?>" style="<?php echo $colorLogo; ?>">TOP</a></li>
                                <li class="page feature header_menuList_link">
                                    <svg class="active_logo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="31.27" height="20" viewBox="0 0 31.27 20">
                                        <defs>
                                            <clipPath id="clip-path">
                                            <rect id="長方形_1" data-name="長方形 1" width="31.27" height="20" fill="#03581D"/>
                                            </clipPath>
                                        </defs>
                                        <g id="グループ_15" data-name="グループ 15" transform="translate(0 0)">
                                            <g id="グループ_1" data-name="グループ 1" transform="translate(0 0)" clip-path="url(#clip-path)">
                                            <path id="パス_1" data-name="パス 1" d="M1.325,17.829l.256.256-1.52,1.52L0,20H.212l1.114-1.113.235.235,1.289-1.289.256.256L1.195,20h.544l1.11-1.11.235.235,1.289-1.289.256.256L2.722,20h.544l1.107-1.107.235.235L5.9,17.839l.256.257L4.249,20h.544l1.1-1.1.235.235,1.289-1.289.256.256L5.775,20h.544l1.1-1.1.235.235,1.289-1.289L9.2,18.1,7.3,20h.544l1.1-1.1.235.235,1.289-1.289.256.256L8.829,20h.544l1.094-1.094.235.235,1.289-1.289.257.256L10.355,20H10.9l1.091-1.091.235.235,1.289-1.289.257.256L11.882,20h.544l1.088-1.088.235.235,1.288-1.289.257.256L13.409,20h.544l1.084-1.084.235.235,1.289-1.289.256.256L14.936,20h.544l1.081-1.081.235.235,1.289-1.289.256.256L16.463,20h.544l1.078-1.078.235.235,1.289-1.289.256.257L17.989,20h.544l1.075-1.075.235.235,1.289-1.289.256.256L19.516,20h.544l1.072-1.072.235.235,1.289-1.289.256.256L21.043,20h.544l1.069-1.068.235.235,1.289-1.289.256.256L22.57,20h.544l1.065-1.065.235.235L25.7,17.881l.256.256L24.1,20h.544L25.7,18.938l.235.235,1.289-1.289.256.257L25.623,20h.544l1.059-1.059.235.235,1.289-1.289.256.256L27.15,20h.544l1.056-1.055.235.235,1.289-1.289.256.256L28.677,20h.544l1.053-1.052.235.235.6-.6-.511-2.85a1.873,1.873,0,0,1-.029-.329V14.014a4.585,4.585,0,0,0-.783-2.562L27.264,7.71a4.6,4.6,0,0,1-.379-.68L26.106,5.3q-.083-.184-.15-.375l-.325-.935a4.585,4.585,0,0,0-1.839-2.343L22.386.735A4.585,4.585,0,0,0,19.9,0H19.33a4.584,4.584,0,0,0-.924.094L15,.8,12.243,1.5A4.585,4.585,0,0,0,9.594,3.36l-.472.691a4.564,4.564,0,0,1-.588.7L4.8,8.389a4.584,4.584,0,0,0-.652.8l-2.715,4.2a4.589,4.589,0,0,0-.678,1.777L.157,19Z" transform="translate(0 0)" fill="#03581D"/>
                                            <path id="パス_2" data-name="パス 2" d="M83.54,51.979l-.983.983H83.1l.522-.522Z" transform="translate(-52.353 -32.962)" fill="#03581D"/>
                                            </g>
                                        </g>
                                    </svg>
                                    <span>
                                        <a href="<?php echo home_url(); ?>/feature/" style="<?php echo $colorLogo; ?>">特集</a>
                                    </span>
                                    <ul class="sub_menu">
                                        <li>
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
                                            ?>
                                                <a href="<?php the_permalink(); ?>" style="<?php echo $colorLogo; ?>">
                                                    <?php the_title(); ?>
                                                </a>
                                            <?php endif; wp_reset_postdata(); ?>
                                        </li>
                                    </ul>
                                </li>
                                <li class="page landscape header_menuList_link">
                                    <svg class="active_logo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="31.27" height="20" viewBox="0 0 31.27 20">
                                        <defs>
                                            <clipPath id="clip-path">
                                            <rect id="長方形_1" data-name="長方形 1" width="31.27" height="20" fill="#03581D"/>
                                            </clipPath>
                                        </defs>
                                        <g id="グループ_15" data-name="グループ 15" transform="translate(0 0)">
                                            <g id="グループ_1" data-name="グループ 1" transform="translate(0 0)" clip-path="url(#clip-path)">
                                            <path id="パス_1" data-name="パス 1" d="M1.325,17.829l.256.256-1.52,1.52L0,20H.212l1.114-1.113.235.235,1.289-1.289.256.256L1.195,20h.544l1.11-1.11.235.235,1.289-1.289.256.256L2.722,20h.544l1.107-1.107.235.235L5.9,17.839l.256.257L4.249,20h.544l1.1-1.1.235.235,1.289-1.289.256.256L5.775,20h.544l1.1-1.1.235.235,1.289-1.289L9.2,18.1,7.3,20h.544l1.1-1.1.235.235,1.289-1.289.256.256L8.829,20h.544l1.094-1.094.235.235,1.289-1.289.257.256L10.355,20H10.9l1.091-1.091.235.235,1.289-1.289.257.256L11.882,20h.544l1.088-1.088.235.235,1.288-1.289.257.256L13.409,20h.544l1.084-1.084.235.235,1.289-1.289.256.256L14.936,20h.544l1.081-1.081.235.235,1.289-1.289.256.256L16.463,20h.544l1.078-1.078.235.235,1.289-1.289.256.257L17.989,20h.544l1.075-1.075.235.235,1.289-1.289.256.256L19.516,20h.544l1.072-1.072.235.235,1.289-1.289.256.256L21.043,20h.544l1.069-1.068.235.235,1.289-1.289.256.256L22.57,20h.544l1.065-1.065.235.235L25.7,17.881l.256.256L24.1,20h.544L25.7,18.938l.235.235,1.289-1.289.256.257L25.623,20h.544l1.059-1.059.235.235,1.289-1.289.256.256L27.15,20h.544l1.056-1.055.235.235,1.289-1.289.256.256L28.677,20h.544l1.053-1.052.235.235.6-.6-.511-2.85a1.873,1.873,0,0,1-.029-.329V14.014a4.585,4.585,0,0,0-.783-2.562L27.264,7.71a4.6,4.6,0,0,1-.379-.68L26.106,5.3q-.083-.184-.15-.375l-.325-.935a4.585,4.585,0,0,0-1.839-2.343L22.386.735A4.585,4.585,0,0,0,19.9,0H19.33a4.584,4.584,0,0,0-.924.094L15,.8,12.243,1.5A4.585,4.585,0,0,0,9.594,3.36l-.472.691a4.564,4.564,0,0,1-.588.7L4.8,8.389a4.584,4.584,0,0,0-.652.8l-2.715,4.2a4.589,4.589,0,0,0-.678,1.777L.157,19Z" transform="translate(0 0)" fill="#03581D"/>
                                            <path id="パス_2" data-name="パス 2" d="M83.54,51.979l-.983.983H83.1l.522-.522Z" transform="translate(-52.353 -32.962)" fill="#03581D"/>
                                            </g>
                                        </g>
                                    </svg>
                                    <span>
                                        <a href="<?php echo home_url(); ?>/landscape" style="<?php echo $colorLogo; ?>">平尾台の風景</a>
                                    </span>
                                    <ul class="sub_menu">
                                        <li>
                                            <?php
                                                // ここから下は「普通のスクロール領域」
                                                $paged = (int) get_query_var('paged');
                                                $f_args = array(
                                                'post_type'      => 'landscape',
                                                'posts_per_page' => 1,
                                                'paged'          => $paged,
                                                'orderby'        => 'post_date',
                                                'order'          => 'DESC',
                                                'post_status'    => 'publish',
                                                );
                                                $f_q = new WP_Query($f_args);
                                                if ($f_q->have_posts()):
                                                $f_q->the_post();
                                            ?>
                                                <a href="<?php echo home_url(); ?>/landscape" style="<?php echo $colorLogo; ?>"><?php the_title(); ?></a>
                                            <?php endif; wp_reset_postdata(); ?>
                                        </li>
                                    </ul>
                                </li>
                                <li class="page story header_menuList_link">
                                    <svg class="active_logo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="31.27" height="20" viewBox="0 0 31.27 20">
                                        <defs>
                                            <clipPath id="clip-path">
                                            <rect id="長方形_1" data-name="長方形 1" width="31.27" height="20" fill="#03581D"/>
                                            </clipPath>
                                        </defs>
                                        <g id="グループ_15" data-name="グループ 15" transform="translate(0 0)">
                                            <g id="グループ_1" data-name="グループ 1" transform="translate(0 0)" clip-path="url(#clip-path)">
                                            <path id="パス_1" data-name="パス 1" d="M1.325,17.829l.256.256-1.52,1.52L0,20H.212l1.114-1.113.235.235,1.289-1.289.256.256L1.195,20h.544l1.11-1.11.235.235,1.289-1.289.256.256L2.722,20h.544l1.107-1.107.235.235L5.9,17.839l.256.257L4.249,20h.544l1.1-1.1.235.235,1.289-1.289.256.256L5.775,20h.544l1.1-1.1.235.235,1.289-1.289L9.2,18.1,7.3,20h.544l1.1-1.1.235.235,1.289-1.289.256.256L8.829,20h.544l1.094-1.094.235.235,1.289-1.289.257.256L10.355,20H10.9l1.091-1.091.235.235,1.289-1.289.257.256L11.882,20h.544l1.088-1.088.235.235,1.288-1.289.257.256L13.409,20h.544l1.084-1.084.235.235,1.289-1.289.256.256L14.936,20h.544l1.081-1.081.235.235,1.289-1.289.256.256L16.463,20h.544l1.078-1.078.235.235,1.289-1.289.256.257L17.989,20h.544l1.075-1.075.235.235,1.289-1.289.256.256L19.516,20h.544l1.072-1.072.235.235,1.289-1.289.256.256L21.043,20h.544l1.069-1.068.235.235,1.289-1.289.256.256L22.57,20h.544l1.065-1.065.235.235L25.7,17.881l.256.256L24.1,20h.544L25.7,18.938l.235.235,1.289-1.289.256.257L25.623,20h.544l1.059-1.059.235.235,1.289-1.289.256.256L27.15,20h.544l1.056-1.055.235.235,1.289-1.289.256.256L28.677,20h.544l1.053-1.052.235.235.6-.6-.511-2.85a1.873,1.873,0,0,1-.029-.329V14.014a4.585,4.585,0,0,0-.783-2.562L27.264,7.71a4.6,4.6,0,0,1-.379-.68L26.106,5.3q-.083-.184-.15-.375l-.325-.935a4.585,4.585,0,0,0-1.839-2.343L22.386.735A4.585,4.585,0,0,0,19.9,0H19.33a4.584,4.584,0,0,0-.924.094L15,.8,12.243,1.5A4.585,4.585,0,0,0,9.594,3.36l-.472.691a4.564,4.564,0,0,1-.588.7L4.8,8.389a4.584,4.584,0,0,0-.652.8l-2.715,4.2a4.589,4.589,0,0,0-.678,1.777L.157,19Z" transform="translate(0 0)" fill="#03581D"/>
                                            <path id="パス_2" data-name="パス 2" d="M83.54,51.979l-.983.983H83.1l.522-.522Z" transform="translate(-52.353 -32.962)" fill="#03581D"/>
                                            </g>
                                        </g>
                                    </svg>
                                    <span>
                                        <a href="<?php echo home_url(); ?>/story" style="<?php echo $colorLogo; ?>">平尾台の物語</a>
                                    </span>
                                    <ul class="sub_menu">
                                        <li><a href="<?php echo home_url(); ?>/story/story01" style="<?php echo $colorLogo; ?>">そして、石はひつじになる。</a></li>
                                        <li><a href="<?php echo home_url(); ?>/story/story02" style="<?php echo $colorLogo; ?>">野焼きが生み出す風景 — 草原に火を灯す理由</a></li>
                                        <!-- <li><a href="<?php echo home_url(); ?>/story#story03" style="<?php echo $colorLogo; ?>">三つの力と、丘という大地 — 先人たちの眼差し</a></li> -->
                                    </ul>
                                </li>
                                <li class="page me header_menuList_link">
                                    <svg class="active_logo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="31.27" height="20" viewBox="0 0 31.27 20">
                                        <defs>
                                            <clipPath id="clip-path">
                                            <rect id="長方形_1" data-name="長方形 1" width="31.27" height="20" fill="#03581D"/>
                                            </clipPath>
                                        </defs>
                                        <g id="グループ_15" data-name="グループ 15" transform="translate(0 0)">
                                            <g id="グループ_1" data-name="グループ 1" transform="translate(0 0)" clip-path="url(#clip-path)">
                                            <path id="パス_1" data-name="パス 1" d="M1.325,17.829l.256.256-1.52,1.52L0,20H.212l1.114-1.113.235.235,1.289-1.289.256.256L1.195,20h.544l1.11-1.11.235.235,1.289-1.289.256.256L2.722,20h.544l1.107-1.107.235.235L5.9,17.839l.256.257L4.249,20h.544l1.1-1.1.235.235,1.289-1.289.256.256L5.775,20h.544l1.1-1.1.235.235,1.289-1.289L9.2,18.1,7.3,20h.544l1.1-1.1.235.235,1.289-1.289.256.256L8.829,20h.544l1.094-1.094.235.235,1.289-1.289.257.256L10.355,20H10.9l1.091-1.091.235.235,1.289-1.289.257.256L11.882,20h.544l1.088-1.088.235.235,1.288-1.289.257.256L13.409,20h.544l1.084-1.084.235.235,1.289-1.289.256.256L14.936,20h.544l1.081-1.081.235.235,1.289-1.289.256.256L16.463,20h.544l1.078-1.078.235.235,1.289-1.289.256.257L17.989,20h.544l1.075-1.075.235.235,1.289-1.289.256.256L19.516,20h.544l1.072-1.072.235.235,1.289-1.289.256.256L21.043,20h.544l1.069-1.068.235.235,1.289-1.289.256.256L22.57,20h.544l1.065-1.065.235.235L25.7,17.881l.256.256L24.1,20h.544L25.7,18.938l.235.235,1.289-1.289.256.257L25.623,20h.544l1.059-1.059.235.235,1.289-1.289.256.256L27.15,20h.544l1.056-1.055.235.235,1.289-1.289.256.256L28.677,20h.544l1.053-1.052.235.235.6-.6-.511-2.85a1.873,1.873,0,0,1-.029-.329V14.014a4.585,4.585,0,0,0-.783-2.562L27.264,7.71a4.6,4.6,0,0,1-.379-.68L26.106,5.3q-.083-.184-.15-.375l-.325-.935a4.585,4.585,0,0,0-1.839-2.343L22.386.735A4.585,4.585,0,0,0,19.9,0H19.33a4.584,4.584,0,0,0-.924.094L15,.8,12.243,1.5A4.585,4.585,0,0,0,9.594,3.36l-.472.691a4.564,4.564,0,0,1-.588.7L4.8,8.389a4.584,4.584,0,0,0-.652.8l-2.715,4.2a4.589,4.589,0,0,0-.678,1.777L.157,19Z" transform="translate(0 0)" fill="#03581D"/>
                                            <path id="パス_2" data-name="パス 2" d="M83.54,51.979l-.983.983H83.1l.522-.522Z" transform="translate(-52.353 -32.962)" fill="#03581D"/>
                                            </g>
                                        </g>
                                    </svg>
                                    <span>
                                        <a href="<?php echo home_url(); ?>/experience" style="<?php echo $colorLogo; ?>">平尾台の体験</a>
                                    </span>
                                    <ul class="sub_menu">
                                        <li>
                                            <?php
                                                // ここから下は「普通のスクロール領域」
                                                $paged = (int) get_query_var('paged');
                                                $f_args = array(
                                                'post_type'      => 'experience',
                                                'posts_per_page' => 1,
                                                'paged'          => $paged,
                                                'orderby'        => 'post_date',
                                                'order'          => 'DESC',
                                                'post_status'    => 'publish',
                                                );
                                                $f_q = new WP_Query($f_args);
                                                if ($f_q->have_posts()):
                                                $f_q->the_post();
                                            ?>
                                                <a href="<?php the_permalink(); ?>" style="<?php echo $colorLogo; ?>"><?php the_title(); ?></a>
                                            <?php wp_reset_postdata(); ?>
                                            <?php endif; ?>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <ul class="header_menuList_wrap_02">
                                <li>
                                    <a href="<?php echo home_url(); ?>/map" style="<?php echo $colorLogo; ?>">HIRAODAI MAP</a>
                                </li>
                                <li>
                                    <a href="<?php echo home_url(); ?>/feature" style="<?php echo $colorLogo; ?>">BACK NUNBER</a>
                                </li>
                                <li>
                                    <a href="<?php echo home_url(); ?>/spot" style="<?php echo $colorLogo; ?>">HIRAODAI SPOT</a>
                                </li>
                            </ul>
                            <ul class="header_menuList_wrap_03">
                                <li><a href="<?php echo home_url(); ?>/contact" style="<?php echo $colorLogo; ?>">CONTACT</a></li>
                                <li><a href="<?php echo home_url(); ?>/news" style="<?php echo $colorLogo; ?>">NEWS</a></li>
                            </ul>
                            <ul class="header_menuList_wrap_sns">
                                <li>
                                    <a href="https://www.instagram.com/hitsujicafe_ikimura_hiraodai/" target="_blank" rel="noopener">
                                        <svg id="instagram" xmlns="http://www.w3.org/2000/svg" width="22.663" height="22.384" viewBox="0 0 22.663 22.384">
                                            <path id="パス_997" data-name="パス 997" d="M11.331,0C8.253,0,7.869.014,6.66.067a8.447,8.447,0,0,0-2.751.52A5.557,5.557,0,0,0,1.9,1.878,5.454,5.454,0,0,0,.595,3.861,8.14,8.14,0,0,0,.068,6.578C.011,7.772,0,8.151,0,11.192s.014,3.42.068,4.614a8.169,8.169,0,0,0,.527,2.717A5.483,5.483,0,0,0,1.9,20.506,5.548,5.548,0,0,0,3.909,21.8a8.457,8.457,0,0,0,2.751.52c1.209.056,1.593.067,4.671.067s3.463-.014,4.671-.067a8.477,8.477,0,0,0,2.751-.52,5.577,5.577,0,0,0,2.008-1.291,5.459,5.459,0,0,0,1.307-1.983,8.169,8.169,0,0,0,.527-2.717c.057-1.194.068-1.573.068-4.614s-.014-3.42-.068-4.614a8.188,8.188,0,0,0-.527-2.717A5.756,5.756,0,0,0,18.754.588,8.427,8.427,0,0,0,16,.067C14.794.011,14.41,0,11.331,0Zm0,2.015c3.025,0,3.385.015,4.58.066a6.311,6.311,0,0,1,2.1.387,3.524,3.524,0,0,1,1.305.836,3.454,3.454,0,0,1,.846,1.288,6.113,6.113,0,0,1,.39,2.077c.054,1.181.066,1.535.066,4.523s-.014,3.344-.07,4.523a6.231,6.231,0,0,1-.4,2.077A3.723,3.723,0,0,1,18,19.917a6.371,6.371,0,0,1-2.11.385c-1.2.053-1.557.065-4.588.065s-3.386-.014-4.588-.069A6.5,6.5,0,0,1,4.6,19.906a3.513,3.513,0,0,1-1.3-.838,3.4,3.4,0,0,1-.85-1.287,6.284,6.284,0,0,1-.4-2.085C2.012,14.521,2,14.158,2,11.178s.015-3.345.058-4.534a6.277,6.277,0,0,1,.4-2.084A3.314,3.314,0,0,1,3.3,3.273a3.356,3.356,0,0,1,1.3-.838,6.34,6.34,0,0,1,2.1-.393C7.9,2,8.259,1.987,11.289,1.987l.042.028Zm0,3.43a5.748,5.748,0,1,0,5.819,5.747A5.783,5.783,0,0,0,11.331,5.445Zm0,9.478a3.731,3.731,0,1,1,3.777-3.731A3.753,3.753,0,0,1,11.331,14.923Zm7.409-9.7a1.361,1.361,0,0,1-2.72,0,1.36,1.36,0,0,1,2.72,0Z" fill="<?php echo $colorLogo; ?>"/>
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </div>
        <div class="d_only_sp">
            <header id="header" class="header sp">
                <div class="header_wrap">
                    <div class="header_wrap_hamburger"><span></span><span></span><span></span></div>
                    <div class="header_menuList_wrap">
                        <div class="header_menuList_wrap_headttl">
                            <p style="color:<?php echo $colorLogo; ?>;">平尾台で出会う旅</p>
                        </div>
                        <ul class="header_menuList_wrap_01">
                            <?php
                                if ( is_front_page() ) :
                                    $colorLogo = '#03581D';
                                    $newsBkColor = '#1F9DCC';
                                    $newsTxtColor = '#F3FC85';
                                else:
                                    $colorLogo = '#03581D';
                                    $newsBkColor = '#03581D';
                                    $newsTxtColor = '#F3FC85';
                                endif;
                            ?>
                            <li class="top"><a href="<?php echo home_url(); ?>" style="<?php echo $colorLogo; ?>">TOP</a></li>
                            <li class="page feature header_menuList_link">
                                <svg class="active_logo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="31.27" height="20" viewBox="0 0 31.27 20">
                                    <defs>
                                        <clipPath id="clip-path">
                                        <rect id="長方形_1" data-name="長方形 1" width="31.27" height="20" fill="#03581D"/>
                                        </clipPath>
                                    </defs>
                                    <g id="グループ_15" data-name="グループ 15" transform="translate(0 0)">
                                        <g id="グループ_1" data-name="グループ 1" transform="translate(0 0)" clip-path="url(#clip-path)">
                                        <path id="パス_1" data-name="パス 1" d="M1.325,17.829l.256.256-1.52,1.52L0,20H.212l1.114-1.113.235.235,1.289-1.289.256.256L1.195,20h.544l1.11-1.11.235.235,1.289-1.289.256.256L2.722,20h.544l1.107-1.107.235.235L5.9,17.839l.256.257L4.249,20h.544l1.1-1.1.235.235,1.289-1.289.256.256L5.775,20h.544l1.1-1.1.235.235,1.289-1.289L9.2,18.1,7.3,20h.544l1.1-1.1.235.235,1.289-1.289.256.256L8.829,20h.544l1.094-1.094.235.235,1.289-1.289.257.256L10.355,20H10.9l1.091-1.091.235.235,1.289-1.289.257.256L11.882,20h.544l1.088-1.088.235.235,1.288-1.289.257.256L13.409,20h.544l1.084-1.084.235.235,1.289-1.289.256.256L14.936,20h.544l1.081-1.081.235.235,1.289-1.289.256.256L16.463,20h.544l1.078-1.078.235.235,1.289-1.289.256.257L17.989,20h.544l1.075-1.075.235.235,1.289-1.289.256.256L19.516,20h.544l1.072-1.072.235.235,1.289-1.289.256.256L21.043,20h.544l1.069-1.068.235.235,1.289-1.289.256.256L22.57,20h.544l1.065-1.065.235.235L25.7,17.881l.256.256L24.1,20h.544L25.7,18.938l.235.235,1.289-1.289.256.257L25.623,20h.544l1.059-1.059.235.235,1.289-1.289.256.256L27.15,20h.544l1.056-1.055.235.235,1.289-1.289.256.256L28.677,20h.544l1.053-1.052.235.235.6-.6-.511-2.85a1.873,1.873,0,0,1-.029-.329V14.014a4.585,4.585,0,0,0-.783-2.562L27.264,7.71a4.6,4.6,0,0,1-.379-.68L26.106,5.3q-.083-.184-.15-.375l-.325-.935a4.585,4.585,0,0,0-1.839-2.343L22.386.735A4.585,4.585,0,0,0,19.9,0H19.33a4.584,4.584,0,0,0-.924.094L15,.8,12.243,1.5A4.585,4.585,0,0,0,9.594,3.36l-.472.691a4.564,4.564,0,0,1-.588.7L4.8,8.389a4.584,4.584,0,0,0-.652.8l-2.715,4.2a4.589,4.589,0,0,0-.678,1.777L.157,19Z" transform="translate(0 0)" fill="#03581D"/>
                                        <path id="パス_2" data-name="パス 2" d="M83.54,51.979l-.983.983H83.1l.522-.522Z" transform="translate(-52.353 -32.962)" fill="#03581D"/>
                                        </g>
                                    </g>
                                </svg>
                                <span>
                                    <a href="<?php echo home_url(); ?>/feature" style="<?php echo $colorLogo; ?>">特集</a>
                                </span>
                                <ul class="sub_menu">
                                    <li>
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
                                        ?>
                                            <a href="<?php the_permalink(); ?>" style="<?php echo $colorLogo; ?>"><?php the_title(); ?></a>
                                        <?php wp_reset_postdata(); ?>
                                        <?php endif; ?>
                                    </li>
                                </ul>
                            </li>
                            <li class="page landscape header_menuList_link">
                                <svg class="active_logo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="31.27" height="20" viewBox="0 0 31.27 20">
                                    <defs>
                                        <clipPath id="clip-path">
                                        <rect id="長方形_1" data-name="長方形 1" width="31.27" height="20" fill="#03581D"/>
                                        </clipPath>
                                    </defs>
                                    <g id="グループ_15" data-name="グループ 15" transform="translate(0 0)">
                                        <g id="グループ_1" data-name="グループ 1" transform="translate(0 0)" clip-path="url(#clip-path)">
                                        <path id="パス_1" data-name="パス 1" d="M1.325,17.829l.256.256-1.52,1.52L0,20H.212l1.114-1.113.235.235,1.289-1.289.256.256L1.195,20h.544l1.11-1.11.235.235,1.289-1.289.256.256L2.722,20h.544l1.107-1.107.235.235L5.9,17.839l.256.257L4.249,20h.544l1.1-1.1.235.235,1.289-1.289.256.256L5.775,20h.544l1.1-1.1.235.235,1.289-1.289L9.2,18.1,7.3,20h.544l1.1-1.1.235.235,1.289-1.289.256.256L8.829,20h.544l1.094-1.094.235.235,1.289-1.289.257.256L10.355,20H10.9l1.091-1.091.235.235,1.289-1.289.257.256L11.882,20h.544l1.088-1.088.235.235,1.288-1.289.257.256L13.409,20h.544l1.084-1.084.235.235,1.289-1.289.256.256L14.936,20h.544l1.081-1.081.235.235,1.289-1.289.256.256L16.463,20h.544l1.078-1.078.235.235,1.289-1.289.256.257L17.989,20h.544l1.075-1.075.235.235,1.289-1.289.256.256L19.516,20h.544l1.072-1.072.235.235,1.289-1.289.256.256L21.043,20h.544l1.069-1.068.235.235,1.289-1.289.256.256L22.57,20h.544l1.065-1.065.235.235L25.7,17.881l.256.256L24.1,20h.544L25.7,18.938l.235.235,1.289-1.289.256.257L25.623,20h.544l1.059-1.059.235.235,1.289-1.289.256.256L27.15,20h.544l1.056-1.055.235.235,1.289-1.289.256.256L28.677,20h.544l1.053-1.052.235.235.6-.6-.511-2.85a1.873,1.873,0,0,1-.029-.329V14.014a4.585,4.585,0,0,0-.783-2.562L27.264,7.71a4.6,4.6,0,0,1-.379-.68L26.106,5.3q-.083-.184-.15-.375l-.325-.935a4.585,4.585,0,0,0-1.839-2.343L22.386.735A4.585,4.585,0,0,0,19.9,0H19.33a4.584,4.584,0,0,0-.924.094L15,.8,12.243,1.5A4.585,4.585,0,0,0,9.594,3.36l-.472.691a4.564,4.564,0,0,1-.588.7L4.8,8.389a4.584,4.584,0,0,0-.652.8l-2.715,4.2a4.589,4.589,0,0,0-.678,1.777L.157,19Z" transform="translate(0 0)" fill="#03581D"/>
                                        <path id="パス_2" data-name="パス 2" d="M83.54,51.979l-.983.983H83.1l.522-.522Z" transform="translate(-52.353 -32.962)" fill="#03581D"/>
                                        </g>
                                    </g>
                                </svg>
                                <span>
                                    <a href="<?php echo home_url(); ?>/landscape" style="<?php echo $colorLogo; ?>">平尾台の風景</a>
                                </span>
                                <ul class="sub_menu">
                                    <li>
                                        <?php
                                            // ここから下は「普通のスクロール領域」
                                            $paged = (int) get_query_var('paged');
                                            $f_args = array(
                                            'post_type'      => 'landscape',
                                            'posts_per_page' => 1,
                                            'paged'          => $paged,
                                            'orderby'        => 'post_date',
                                            'order'          => 'DESC',
                                            'post_status'    => 'publish',
                                            );
                                            $f_q = new WP_Query($f_args);
                                            if ($f_q->have_posts()):
                                            $f_q->the_post();
                                        ?>
                                            <a href="<?php the_permalink(); ?>" style="<?php echo $colorLogo; ?>"><?php the_title(); ?></a>
                                        <?php wp_reset_postdata(); ?>
                                        <?php endif; ?>
                                    </li>
                                </ul>
                            </li>
                            <li class="page story header_menuList_link">
                                <svg class="active_logo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="31.27" height="20" viewBox="0 0 31.27 20">
                                    <defs>
                                        <clipPath id="clip-path">
                                        <rect id="長方形_1" data-name="長方形 1" width="31.27" height="20" fill="#03581D"/>
                                        </clipPath>
                                    </defs>
                                    <g id="グループ_15" data-name="グループ 15" transform="translate(0 0)">
                                        <g id="グループ_1" data-name="グループ 1" transform="translate(0 0)" clip-path="url(#clip-path)">
                                        <path id="パス_1" data-name="パス 1" d="M1.325,17.829l.256.256-1.52,1.52L0,20H.212l1.114-1.113.235.235,1.289-1.289.256.256L1.195,20h.544l1.11-1.11.235.235,1.289-1.289.256.256L2.722,20h.544l1.107-1.107.235.235L5.9,17.839l.256.257L4.249,20h.544l1.1-1.1.235.235,1.289-1.289.256.256L5.775,20h.544l1.1-1.1.235.235,1.289-1.289L9.2,18.1,7.3,20h.544l1.1-1.1.235.235,1.289-1.289.256.256L8.829,20h.544l1.094-1.094.235.235,1.289-1.289.257.256L10.355,20H10.9l1.091-1.091.235.235,1.289-1.289.257.256L11.882,20h.544l1.088-1.088.235.235,1.288-1.289.257.256L13.409,20h.544l1.084-1.084.235.235,1.289-1.289.256.256L14.936,20h.544l1.081-1.081.235.235,1.289-1.289.256.256L16.463,20h.544l1.078-1.078.235.235,1.289-1.289.256.257L17.989,20h.544l1.075-1.075.235.235,1.289-1.289.256.256L19.516,20h.544l1.072-1.072.235.235,1.289-1.289.256.256L21.043,20h.544l1.069-1.068.235.235,1.289-1.289.256.256L22.57,20h.544l1.065-1.065.235.235L25.7,17.881l.256.256L24.1,20h.544L25.7,18.938l.235.235,1.289-1.289.256.257L25.623,20h.544l1.059-1.059.235.235,1.289-1.289.256.256L27.15,20h.544l1.056-1.055.235.235,1.289-1.289.256.256L28.677,20h.544l1.053-1.052.235.235.6-.6-.511-2.85a1.873,1.873,0,0,1-.029-.329V14.014a4.585,4.585,0,0,0-.783-2.562L27.264,7.71a4.6,4.6,0,0,1-.379-.68L26.106,5.3q-.083-.184-.15-.375l-.325-.935a4.585,4.585,0,0,0-1.839-2.343L22.386.735A4.585,4.585,0,0,0,19.9,0H19.33a4.584,4.584,0,0,0-.924.094L15,.8,12.243,1.5A4.585,4.585,0,0,0,9.594,3.36l-.472.691a4.564,4.564,0,0,1-.588.7L4.8,8.389a4.584,4.584,0,0,0-.652.8l-2.715,4.2a4.589,4.589,0,0,0-.678,1.777L.157,19Z" transform="translate(0 0)" fill="#03581D"/>
                                        <path id="パス_2" data-name="パス 2" d="M83.54,51.979l-.983.983H83.1l.522-.522Z" transform="translate(-52.353 -32.962)" fill="#03581D"/>
                                        </g>
                                    </g>
                                </svg>
                                <span>
                                    <a href="<?php echo home_url(); ?>/story" style="<?php echo $colorLogo; ?>">平尾台の物語</a>
                                </span>
                                <ul class="sub_menu">
                                    <li><a href="<?php echo home_url(); ?>/story/story01" style="<?php echo $colorLogo; ?>">そして、石はひつじになる。</a></li>
                                    <li><a href="<?php echo home_url(); ?>/story/story02" style="<?php echo $colorLogo; ?>">野焼きが生み出す風景 — 草原に火を灯す理由</a></li>
                                    <!-- <li><a href="<?php echo home_url(); ?>/story#story03" style="<?php echo $colorLogo; ?>">三つの力と、丘という大地 — 先人たちの眼差し</a></li> -->
                                </ul>
                            </li>
                            <li class="page me header_menuList_link">
                                <svg class="active_logo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="31.27" height="20" viewBox="0 0 31.27 20">
                                    <defs>
                                        <clipPath id="clip-path">
                                        <rect id="長方形_1" data-name="長方形 1" width="31.27" height="20" fill="#03581D"/>
                                        </clipPath>
                                    </defs>
                                    <g id="グループ_15" data-name="グループ 15" transform="translate(0 0)">
                                        <g id="グループ_1" data-name="グループ 1" transform="translate(0 0)" clip-path="url(#clip-path)">
                                        <path id="パス_1" data-name="パス 1" d="M1.325,17.829l.256.256-1.52,1.52L0,20H.212l1.114-1.113.235.235,1.289-1.289.256.256L1.195,20h.544l1.11-1.11.235.235,1.289-1.289.256.256L2.722,20h.544l1.107-1.107.235.235L5.9,17.839l.256.257L4.249,20h.544l1.1-1.1.235.235,1.289-1.289.256.256L5.775,20h.544l1.1-1.1.235.235,1.289-1.289L9.2,18.1,7.3,20h.544l1.1-1.1.235.235,1.289-1.289.256.256L8.829,20h.544l1.094-1.094.235.235,1.289-1.289.257.256L10.355,20H10.9l1.091-1.091.235.235,1.289-1.289.257.256L11.882,20h.544l1.088-1.088.235.235,1.288-1.289.257.256L13.409,20h.544l1.084-1.084.235.235,1.289-1.289.256.256L14.936,20h.544l1.081-1.081.235.235,1.289-1.289.256.256L16.463,20h.544l1.078-1.078.235.235,1.289-1.289.256.257L17.989,20h.544l1.075-1.075.235.235,1.289-1.289.256.256L19.516,20h.544l1.072-1.072.235.235,1.289-1.289.256.256L21.043,20h.544l1.069-1.068.235.235,1.289-1.289.256.256L22.57,20h.544l1.065-1.065.235.235L25.7,17.881l.256.256L24.1,20h.544L25.7,18.938l.235.235,1.289-1.289.256.257L25.623,20h.544l1.059-1.059.235.235,1.289-1.289.256.256L27.15,20h.544l1.056-1.055.235.235,1.289-1.289.256.256L28.677,20h.544l1.053-1.052.235.235.6-.6-.511-2.85a1.873,1.873,0,0,1-.029-.329V14.014a4.585,4.585,0,0,0-.783-2.562L27.264,7.71a4.6,4.6,0,0,1-.379-.68L26.106,5.3q-.083-.184-.15-.375l-.325-.935a4.585,4.585,0,0,0-1.839-2.343L22.386.735A4.585,4.585,0,0,0,19.9,0H19.33a4.584,4.584,0,0,0-.924.094L15,.8,12.243,1.5A4.585,4.585,0,0,0,9.594,3.36l-.472.691a4.564,4.564,0,0,1-.588.7L4.8,8.389a4.584,4.584,0,0,0-.652.8l-2.715,4.2a4.589,4.589,0,0,0-.678,1.777L.157,19Z" transform="translate(0 0)" fill="#03581D"/>
                                        <path id="パス_2" data-name="パス 2" d="M83.54,51.979l-.983.983H83.1l.522-.522Z" transform="translate(-52.353 -32.962)" fill="#03581D"/>
                                        </g>
                                    </g>
                                </svg>
                                <span>
                                    <a href="<?php echo home_url(); ?>/experience" style="<?php echo $colorLogo; ?>">平尾台の体験</a>
                                </span>
                                <ul class="sub_menu">
                                    <li>
                                        <?php
                                            // ここから下は「普通のスクロール領域」
                                            $paged = (int) get_query_var('paged');
                                            $f_args = array(
                                            'post_type'      => 'experience',
                                            'posts_per_page' => 1,
                                            'paged'          => $paged,
                                            'orderby'        => 'post_date',
                                            'order'          => 'DESC',
                                            'post_status'    => 'publish',
                                            );
                                            $f_q = new WP_Query($f_args);
                                            if ($f_q->have_posts()):
                                            $f_q->the_post();
                                        ?>
                                            <a href="<?php the_permalink(); ?>" style="<?php echo $colorLogo; ?>"><?php the_title(); ?></a>
                                        <?php wp_reset_postdata(); ?>
                                        <?php endif; ?>
                                    </li>
                                </ul>
                            </li>
                            <li class="page stay header_menuList_link">
                                <span>
                                    <a href="https://hiraodai-ikimura.com/" target="_blank" rel="noopener" style="<?php echo $colorLogo; ?>">平尾台に泊まる</a>
                                </span>
                            </li>
                            <?php 
                                // wp_nav_menu( array(
                                //     'theme_location'=>'global-nav', 
                                //     'container'     =>'', 
                                //     'menu_class'    =>'',
                                //     'items_wrap'    =>'%3$s'
                                // ));
                            ?>
                        </ul>
                        <ul class="header_menuList_wrap_02 ">
                            <li>
                                <a href="<?php echo home_url(); ?>/map" style="<?php echo $colorLogo; ?>">HIRAODAI MAP</a>
                            </li>
                            <li>
                                <a href="<?php echo home_url(); ?>/feature" style="<?php echo $colorLogo; ?>">BACK NUNBER</a>
                            </li>
                            <li>
                                <a href="<?php echo home_url(); ?>/spot" style="<?php echo $colorLogo; ?>">HIRAODAI SPOT</a>
                            </li>
                        </ul>
                        <ul class="header_menuList_wrap_03">
                            <li><a href="<?php echo home_url(); ?>/contact" style="<?php echo $colorLogo; ?>">CONTACT</a></li>
                            <li><a href="<?php echo home_url(); ?>/news" style="<?php echo $colorLogo; ?>">NEWS</a></li>
                        </ul>
                        <ul class="header_menuList_wrap_sns">
                            <!-- <li>
                                <a href="https://www.facebook.com/" target="_blank" rel="noopener">
                                    <svg id="facebook" xmlns="http://www.w3.org/2000/svg" width="12.087" height="22.663" viewBox="0 0 12.087 22.663">
                                        <path id="パス_998" data-name="パス 998" d="M15.807.163v3.6h-2.2a2.091,2.091,0,0,0-1.623.49,2.214,2.214,0,0,0-.42,1.471V8.294h4.1l-.546,4.031H11.568V22.663H7.287V12.326H3.72V8.294H7.287V5.325A5.189,5.189,0,0,1,8.742,1.4,5.363,5.363,0,0,1,12.618,0,23.765,23.765,0,0,1,15.807.163Z" transform="translate(-3.72)" fill="<?php echo $colorLogo; ?>"/>
                                    </svg>
                                </a>
                            </li> -->
                            <li>
                                <a href="https://www.instagram.com/hitsujicafe_ikimura_hiraodai/" target="_blank" rel="noopener">
                                    <svg id="instagram" xmlns="http://www.w3.org/2000/svg" width="22.663" height="22.384" viewBox="0 0 22.663 22.384">
                                        <path id="パス_997" data-name="パス 997" d="M11.331,0C8.253,0,7.869.014,6.66.067a8.447,8.447,0,0,0-2.751.52A5.557,5.557,0,0,0,1.9,1.878,5.454,5.454,0,0,0,.595,3.861,8.14,8.14,0,0,0,.068,6.578C.011,7.772,0,8.151,0,11.192s.014,3.42.068,4.614a8.169,8.169,0,0,0,.527,2.717A5.483,5.483,0,0,0,1.9,20.506,5.548,5.548,0,0,0,3.909,21.8a8.457,8.457,0,0,0,2.751.52c1.209.056,1.593.067,4.671.067s3.463-.014,4.671-.067a8.477,8.477,0,0,0,2.751-.52,5.577,5.577,0,0,0,2.008-1.291,5.459,5.459,0,0,0,1.307-1.983,8.169,8.169,0,0,0,.527-2.717c.057-1.194.068-1.573.068-4.614s-.014-3.42-.068-4.614a8.188,8.188,0,0,0-.527-2.717A5.756,5.756,0,0,0,18.754.588,8.427,8.427,0,0,0,16,.067C14.794.011,14.41,0,11.331,0Zm0,2.015c3.025,0,3.385.015,4.58.066a6.311,6.311,0,0,1,2.1.387,3.524,3.524,0,0,1,1.305.836,3.454,3.454,0,0,1,.846,1.288,6.113,6.113,0,0,1,.39,2.077c.054,1.181.066,1.535.066,4.523s-.014,3.344-.07,4.523a6.231,6.231,0,0,1-.4,2.077A3.723,3.723,0,0,1,18,19.917a6.371,6.371,0,0,1-2.11.385c-1.2.053-1.557.065-4.588.065s-3.386-.014-4.588-.069A6.5,6.5,0,0,1,4.6,19.906a3.513,3.513,0,0,1-1.3-.838,3.4,3.4,0,0,1-.85-1.287,6.284,6.284,0,0,1-.4-2.085C2.012,14.521,2,14.158,2,11.178s.015-3.345.058-4.534a6.277,6.277,0,0,1,.4-2.084A3.314,3.314,0,0,1,3.3,3.273a3.356,3.356,0,0,1,1.3-.838,6.34,6.34,0,0,1,2.1-.393C7.9,2,8.259,1.987,11.289,1.987l.042.028Zm0,3.43a5.748,5.748,0,1,0,5.819,5.747A5.783,5.783,0,0,0,11.331,5.445Zm0,9.478a3.731,3.731,0,1,1,3.777-3.731A3.753,3.753,0,0,1,11.331,14.923Zm7.409-9.7a1.361,1.361,0,0,1-2.72,0,1.36,1.36,0,0,1,2.72,0Z" fill="<?php echo $colorLogo; ?>"/>
                                    </svg>
                                </a>
                            </li>
                            <!-- <li>
                                <button onclick="copyUrl()">
                                    <svg id="ios-link" xmlns="http://www.w3.org/2000/svg" width="22.902" height="22.891" viewBox="0 0 22.902 22.891">
                                        <path id="パス_1012" data-name="パス 1012" d="M31.006,78.922l-.066.006a.91.91,0,0,0-.528.248L26.857,82.73a4.008,4.008,0,0,1-5.668-5.668l3.775-3.775a3.984,3.984,0,0,1,.627-.512,4.045,4.045,0,0,1,.814-.413,3.854,3.854,0,0,1,.825-.2,3.9,3.9,0,0,1,.561-.039c.077,0,.154.006.253.011a4,4,0,0,1,2.575,1.156,3.946,3.946,0,0,1,.941,1.5.866.866,0,0,0,1.062.556c.006,0,.011-.005.017-.005s.011,0,.011-.006a.86.86,0,0,0,.578-1.051,4.986,4.986,0,0,0-1.354-2.256,5.793,5.793,0,0,0-3.17-1.612c-.1-.017-.209-.033-.314-.044a5.681,5.681,0,0,0-.611-.033c-.143,0-.286.006-.424.017a5.549,5.549,0,0,0-.891.138c-.061.011-.116.028-.176.044a5.722,5.722,0,0,0-1.073.4,5.652,5.652,0,0,0-1.524,1.1l-3.775,3.775a5.8,5.8,0,0,0-1.678,4.1A5.786,5.786,0,0,0,28.112,84L31.705,80.4A.871.871,0,0,0,31.006,78.922Z" transform="translate(-18.24 -62.794)" fill="<?php echo $colorLogo; ?>"/>
                                        <path id="パス_1013" data-name="パス 1013" d="M86.089,19.929a5.8,5.8,0,0,0-8.182,0L74.4,23.435a.885.885,0,0,0,.556,1.508.894.894,0,0,0,.7-.253l3.511-3.5a4.008,4.008,0,0,1,5.668,5.668l-3.775,3.775a3.984,3.984,0,0,1-.627.512,4.045,4.045,0,0,1-.814.413,3.853,3.853,0,0,1-.825.2,3.9,3.9,0,0,1-.561.039c-.077,0-.16-.006-.253-.011A3.954,3.954,0,0,1,74.5,29.229a.879.879,0,0,0-1.051-.539.889.889,0,0,0-.622,1.128,5.027,5.027,0,0,0,1.3,2.064l.011.011a5.793,5.793,0,0,0,3.483,1.656,5.679,5.679,0,0,0,.611.033q.215,0,.429-.017a6.291,6.291,0,0,0,1.062-.176,5.724,5.724,0,0,0,1.073-.4,5.653,5.653,0,0,0,1.524-1.1L86.1,28.117a5.792,5.792,0,0,0-.011-8.188Z" transform="translate(-64.887 -18.24)" fill="<?php echo $colorLogo; ?>"/>
                                    </svg>
                                </button>
                            </li> -->
                        </ul>
                        <div class="header_menuList_wrap_illust">
                            <img src="<?php echo get_template_directory_uri(); ?>/assets/public/img/common/header_illust_sp.svg" alt="">
                        </div>
                    </div>
                </div>
            </header>
        </div>
        
        <main id="content" class="menu-blur" role="main">

        <?php if ( !is_front_page() ) : ?>
            <div class="feature-bg">
                <div class="feature-bg__ttl">
                    <div class="feature-bg__ttl_left">
                        <img src="http://localhost/stonesheep-hiraodai/wp-content/themes/stonesheep-hiraodai/assets/public/img/top/bk_ttl01.svg" alt="そして、石は">
                    </div>
                    <div class="feature-bg__ttl_right">
                        <img src="http://localhost/stonesheep-hiraodai/wp-content/themes/stonesheep-hiraodai/assets/public/img/top/bk_ttl02.svg" alt="ひつじになる。">
                    </div>
                </div>
            </div>
        <?php endif; ?>