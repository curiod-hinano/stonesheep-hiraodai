<?php
/**
 * セットアップ
 */
if ( ! function_exists( 'setup' ) ) :
    function setup() {
        //feedlinkを削除
        remove_action('do_feed_rdf', 'do_feed_rdf');
        remove_action('do_feed_rss', 'do_feed_rss');
        remove_action('do_feed_rss2', 'do_feed_rss2');
        remove_action('do_feed_atom', 'do_feed_atom');
        // サイト全体の記事更新フィード、サイト全体のコメントフィードリンクの削除
        remove_action('wp_head', 'feed_links', 2);
        // 記事のコメント、記事アーカイブ、カテゴリなどのフィードリンクの削除
        remove_action('wp_head', 'feed_links_extra', 3);

        //emoji削除する
        function disable_emojis() {
            remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
            remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
            remove_action( 'wp_print_styles', 'print_emoji_styles' );
            remove_action( 'admin_print_styles', 'print_emoji_styles' );
            remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
            remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
            remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
        }
        add_action( 'init', 'disable_emojis' );

        //thumbnail enable
        add_theme_support( 'post-thumbnails' );

        // 出力されるHTMLタグをHTML５に変換する
        add_theme_support(
            'html5',
            array(
                'search-form',
                'comment-form',
                'comment-list',
                'gallery',
                'caption',
            )
        );
	}
endif;
add_action( 'after_setup_theme', 'setup' );


/**
 * CSS・JavaScriptの読み込み
 */
add_action('wp_enqueue_scripts', 'init_enqueue');
function init_enqueue()
{
    // CSS読み込み
    // wp_enqueue_style( 'css',get_template_directory_uri().'/assets/public/fullpage.css', array(), filemtime(get_template_directory() . '/assets/public/css/fullpage.css'));
    wp_enqueue_style( 'fullpage',get_template_directory_uri().'/assets/public/css/jquery.fullpage.min.css', array(), filemtime(get_template_directory() . '/assets/public/css/jquery.fullpage.min.css'));
    wp_enqueue_style( 'remodal',get_template_directory_uri().'/assets/public/css/remodal.css', array(), filemtime(get_template_directory() . '/assets/public/css/remodal.css'));
    wp_enqueue_style( 'remodal-default-theme',get_template_directory_uri().'/assets/public/css/remodal-default-theme.css', array(), filemtime(get_template_directory() . '/assets/public/css/remodal-default-theme.css'));
    wp_enqueue_style( 'swiper-min',get_template_directory_uri().'/assets/public/css/swiper.min.css', array(), filemtime(get_template_directory() . '/assets/public/css/swiper.min.css'));
    wp_enqueue_style( 'swiper-bundle-min',get_template_directory_uri().'/assets/public/css/swiper-bundle.min.css', array(), filemtime(get_template_directory() . '/assets/public/css/swiper-bundle.min.css'));
    wp_enqueue_style( 'modal-video-min',get_template_directory_uri().'/assets/public/css/modal-video.min.css', array(), filemtime(get_template_directory() . '/assets/public/css/modal-video.min.css'));
    wp_enqueue_style( 'css',get_template_directory_uri().'/assets/public/app.css', array(), filemtime(get_template_directory() . '/assets/public/app.css'));
   
    //script読み込み
    wp_enqueue_script( 'jquery-min', 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js','', '1.0.0', true );
    // wp_enqueue_script( 'fullpage', get_template_directory_uri() . '/assets/public/js/fullpage.js', array('jquery-min'), '1.0.0', true );
    wp_enqueue_script( 'fullpage-min', get_template_directory_uri() . '/assets/public/js/jquery.fullpage.min.js', array('jquery-min'), '1.0.0', true );
    wp_enqueue_script( 'remodal-min', get_template_directory_uri() . '/assets/public/js/remodal.min.js', array('jquery-min'), '1.0.0', true );
    wp_enqueue_script( 'swiper-bundle-min', get_template_directory_uri() . '/assets/public/js/swiper-bundle.min.js', array('jquery-min'), '1.0.0', true );
    wp_enqueue_script( 'jquery-modal-video-min', get_template_directory_uri() . '/assets/public/js/jquery-modal-video.min.js', array('jquery-min'), '1.0.0', true );
    wp_enqueue_script( 'main', get_template_directory_uri() . '/assets/public/js/main.js', array('jquery-min'), '1.0.0', true );
    if ( is_front_page() ) {
      wp_enqueue_script( 'top', get_template_directory_uri() . '/assets/public/js/top.js', array('jquery-min'), '1.0.0', true );
    }
}


//ナビゲーションメニュー
function register_my_menus() { 
	register_nav_menus( array( //複数のナビゲーションメニューを登録する関数
	//'「メニューの位置」の識別子' => 'メニューの説明の文字列',
	  'global-nav' => 'Menu',
	) );
}
add_action( 'after_setup_theme', 'register_my_menus' );


//worpressのバージョン情報を削除
remove_action( 'wp_head', 'wp_generator' );

//windows live writterから投稿ができる機能を削除
remove_action( 'wp_head', 'wlwmanifest_link' );

//外部ツールからの投稿ができる機能を削除
remove_action( 'wp_head', 'rsd_link' );

//投稿記事に出力される短縮URLを削除
remove_action( 'wp_head', 'wp_shortlink_wp_head' );

//embedリンク削除
remove_action('wp_head','rest_output_link_wp_head');
remove_action('wp_head','wp_oembed_add_discovery_links');
remove_action('wp_head','wp_oembed_add_host_js');
//httpレスポンス削除
remove_action('template_redirect', 'rest_output_link_header', 11 );

function my_registered_post_hierarchical( $post_type, $post_type_object ) {
  if ( $post_type == 'post' ) {
      $post_type_object->hierarchical = true;
      add_post_type_support( 'post', 'page-attributes' );
  }
}
add_action( 'registered_post_type', 'my_registered_post_hierarchical', 10, 2 );

//SVGファイルのアップロード
function add_file_types_to_uploads($file_types){

  $new_filetypes = array();
  $new_filetypes['svg'] = 'image/svg+xml';
  $file_types = array_merge($file_types, $new_filetypes );

  return $file_types;
}
add_action('upload_mimes', 'add_file_types_to_uploads');

//抜粋で取得する文字数制限
function twpp_change_excerpt_length( $length ) {
  return 50;
}
add_filter( 'excerpt_length', 'twpp_change_excerpt_length', 999 );

//抜粋省略後の入力文字変更
function twpp_change_excerpt_more( $more ) {
  return '・・・';
}
add_filter( 'excerpt_more', 'twpp_change_excerpt_more' );

/** エディターにスタイル適用 */
function my_editor_style() {
  add_theme_support( 'editor-styles' );
  add_editor_style( 'assets/public/main.css' );
}
add_action( 'after_setup_theme', 'my_editor_style', 0 );

/* ユーザ定義関数 */
function echo_srcset($name, $size='medium_large', $srcsize='medium_large', $id='', $lozad=true){

  $srcset      = "";
  $image_sizes = [
      'thumbnail'    => get_field($name, $id)['sizes']['thumbnail']    . ' 300w,',
      'medium'       => get_field($name, $id)['sizes']['medium']       . ' 300w,',
    'medium_large' => get_field($name, $id)['sizes']['medium_large'] . ' 768w,',
    'large'        => get_field($name, $id)['sizes']['large']        . ' 1240w,',
    '1536'         => get_field($name, $id)['sizes']['1536x1536']    . ' 1537w,',
  ];

  foreach($image_sizes as $key => $value){
      $srcset .= $value;

      if($key == $size) break;
  }

  if($lozad){
      echo 'data-src="' . get_field($name, $id)['sizes'][$srcsize] . '" data-srcset="' . $srcset .'"';
  }else{
      echo 'src="' . get_field($name, $id)['sizes'][$srcsize] . '" srcset="' . $srcset .'"';
  }
}

// 投稿のアーカイブページを作成する
function post_has_archive($args, $post_type)
{
  if ('post' == $post_type) {
      $args['rewrite'] = true; // リライトを有効にする
      $args['has_archive'] = 'news'; // 任意のスラッグ名
  }
  return $args;
}
add_filter('register_post_type_args', 'post_has_archive', 10, 2);

// // ページネーション
function pagination_archive( $pages, $paged, $range = 2, $show_only = false ) {

  $pages = ( int ) $pages;
  $paged = $paged ?: 1;
  
  if( $show_only && $pages === 1 ){
    echo '<div class="pagination"><span class="current pager">1</span></div>';
    return;
  }
  if( $pages === 1 ) return;
  if( 1 !== $pages ){
	  echo '<div class="pagination_wrap"><div class="number_area">';
    for( $i = 1; $i <= $pages; $i++ ){
      if( $i <= $paged + $range && $i >= $paged - $range ){
        if( $paged === $i ){
          echo '<span class="current page_number">'.$i.'</span>';
        }else{
          echo '<a href="'.get_pagenum_link($i).'" class="inactive page_number">', $i ,'</a>';
        }
      }
    }
    echo '</div></div>';
  }
}

//「特集」カスタム投稿タイプ
add_action( 'init', 'create_post_type00' );
function create_post_type00() {
  register_post_type( 'feature', //カスタム投稿名
    array(
      'labels' => array(
        'name' => __( '特集' ), //カスタム投稿のラベル
        'singular_name' => __( '特集' ),
        'add_new_item' => __('特集を追加'),
        'edit_item' => __('特集を編集'),
        'new_item' => __('特集を追加')
      ),
      'public' => true, //投稿の公開
      'supports' => array('title','editor','thumbnail','excerpt'),  //タイトルと本文を有効化
      'menu_position' =>5,  //メニューの位置
      'show_ui' => true,  //カスタム投稿タイプを表示するかどうか
      'has_archive' => true,  //アーカイブの生成
      'hierarchical' => false,  //階層構造の有無
      'show_in_rest' => true,   //Gutenberg(ブロックエディタ)に対応
      'rewrite' => array('width_front' => false), //パーマリンクの設定
    )
  );
  //カスタムタクソノミー
  register_taxonomy(
    'feature-cat',
    // 'trends',
    array(
      'hierarchical' => true,  //階層構造の有無。falseでタグ形式
      'label' => 'カテゴリー',  //タクソノミーのラベル
      'singular_label' => 'カテゴリー', //タクソノミーのラベル
      'public' => true,  //検索可能にするかどうか　trueで可能
      'show_in_rest' => true,
      'show_ui' => true,  //タームを管理するためにデフォルトのUIを用意
      // 'rewrite' => 'trends',
    )
  );
}

//「HIRAODAI SPOT」カスタム投稿タイプ
add_action( 'init', 'create_post_type01' );
function create_post_type01() {
  register_post_type( 'spot', //カスタム投稿名
    array(
      'labels' => array(
        'name' => __( '平尾台スポット' ), //カスタム投稿のラベル
        'singular_name' => __( '平尾台スポット' ),
        'add_new_item' => __('平尾台スポットを追加'),
        'edit_item' => __('平尾台スポットを編集'),
        'new_item' => __('平尾台スポットを追加')
      ),
      'public' => true, //投稿の公開
      'supports' => array('title','editor','thumbnail'),  //タイトルと本文を有効化
      'menu_position' =>6,  //メニューの位置
      'show_ui' => true,  //カスタム投稿タイプを表示するかどうか
      'has_archive' => true,  //アーカイブの生成
      'hierarchical' => false,  //階層構造の有無
      'show_in_rest' => true,   //Gutenberg(ブロックエディタ)に対応
      'rewrite' => array('width_front' => false), //パーマリンクの設定
    )
  );
  //カスタムタクソノミー
  register_taxonomy(
    'spot-cat',
    // 'trends',
    array(
      'hierarchical' => true,  //階層構造の有無。falseでタグ形式
      'label' => 'カテゴリー',  //タクソノミーのラベル
      'singular_label' => 'カテゴリー', //タクソノミーのラベル
      'public' => true,  //検索可能にするかどうか　trueで可能
      'show_in_rest' => true,
      'show_ui' => true,  //タームを管理するためにデフォルトのUIを用意
      // 'rewrite' => 'trends',
    )
  );
}

//「風景に出会う」カスタム投稿タイプ
add_action( 'init', 'create_post_type02' );
function create_post_type02() {
  register_post_type( 'landscape', //カスタム投稿名
    array(
      'labels' => array(
        'name' => __( '風景に出会う' ), //カスタム投稿のラベル
        'singular_name' => __( '風景に出会う' ),
        'add_new_item' => __('風景に出会うを追加'),
        'edit_item' => __('風景に出会うを編集'),
        'new_item' => __('風景に出会うを追加')
      ),
      'public' => true, //投稿の公開
      'supports' => array('title','editor','thumbnail'),  //タイトルと本文を有効化
      'menu_position' =>7,  //メニューの位置
      'show_ui' => true,  //カスタム投稿タイプを表示するかどうか
      'has_archive' => true,  //アーカイブの生成
      'hierarchical' => false,  //階層構造の有無
      'show_in_rest' => true,   //Gutenberg(ブロックエディタ)に対応
      'rewrite' => array('width_front' => false), //パーマリンクの設定
    )
  );
  //カスタムタクソノミー
  register_taxonomy(
    'landscape-cat',
    // 'trends',
    array(
      'hierarchical' => true,  //階層構造の有無。falseでタグ形式
      'label' => 'カテゴリー',  //タクソノミーのラベル
      'singular_label' => 'カテゴリー', //タクソノミーのラベル
      'public' => true,  //検索可能にするかどうか　trueで可能
      'show_in_rest' => true,
      'show_ui' => true,  //タームを管理するためにデフォルトのUIを用意
      // 'rewrite' => 'trends',
    )
  );
}