// スマホ時 ヘッダーナビ
//ハンバーガーメニュー
$(".header_wrap_hamburger").click(function () {//ボタンがクリックされたら
	$(this).toggleClass('active');//ボタン自身に activeクラスを付与し
  $(".header_menuList_wrap").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
});
$(".header_menuList_wrap a").click(function () {//ナビゲーションのリンクがクリックされたら
    $(".header_wrap_hamburger").removeClass('active');//ボタンの activeクラスを除去し
    $(".header_menuList_wrap").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
});

// TOPへ戻るボタン
document.addEventListener('click', function (e) {
  const btn = e.target.closest('.page_top');
  if (!btn) return;
  e.preventDefault();

  // スクロール先：ページ本体（ブラウザ依存を吸収）
  const scroller = document.scrollingElement || document.documentElement;
  scroller.scrollTo({ top: 0, behavior: 'smooth' });
});


//ヘッダー サイトのURLをコピーするボタンを作る
// function copyUrl() {
//     const element = document.createElement('input');
//     element.value = location.href;
//     document.body.appendChild(element);
//     element.select();
//     document.execCommand('copy');
//     document.body.removeChild(element);
// }

function copyUrl() {
  // 1) URLコピー（古い方法）
  const temp = document.createElement('input');
  temp.value = location.href;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand('copy');
  document.body.removeChild(temp);

  // 2) トーストをつくる
  const toast = document.createElement('div');
  toast.textContent = 'URLをコピーしました';
  toast.style.position = 'fixed';
  toast.style.bottom = '40px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.background = 'rgba(0,0,0,0.85)';
  toast.style.color = '#fff';
  toast.style.padding = '8px 16px';
  toast.style.borderRadius = '9999px';
  toast.style.fontSize = '14px';
  toast.style.zIndex = '99999';
  toast.style.opacity = '1';
  toast.style.transition = 'opacity .3s ease';

  document.body.appendChild(toast);

  // 3) 2秒後にフェードアウトして消す
  setTimeout(function() {
    toast.style.opacity = '0';
    setTimeout(function() {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 2000);
}


// ヘッダー 現在のページの表示を変える方法
document.addEventListener('DOMContentLoaded', () => {
  const normalize = (p) => {
    p = p.replace(/index\.html?$/i, '');
    if (p.length > 1) p = p.replace(/\/+$/, '');
    return p || '/';
  };

  const currentPath = normalize(location.pathname);
  // ① メインメニュー（必要なら _02, _03 もカンマで追加）
  const items = document.querySelectorAll(
    '.header_menuList_wrap_01 li.header_menuList_link'
  );
  items.forEach(li => {
    // <li>直下のリンク（<a> or <span>配下<a>）を取得
    const mainA = li.querySelector(':scope > a, :scope > span > a');
    if (!mainA) return;

    const linkUrl  = new URL(mainA.getAttribute('href'), location.origin);
    const linkPath = normalize(linkUrl.pathname);

    if (linkPath === currentPath) {
      li.classList.add('is-active');
    } else {
      li.classList.remove('is-active');
    }
  });
  // ②（任意）サブメニュー内のリンクが同じパスなら、親<li>もアクティブにする
  //    ※サブが同じページ内アンカー（#）でも親を光らせたい場合に有効
  const withSub = document.querySelectorAll(
    '.header_menuList_wrap_01 li.header_menuList_link .sub_menu'
  );
  withSub.forEach(ul => {
    const parentLi = ul.closest('li.header_menuList_link');
    if (!parentLi) return;
    const hit = Array.from(ul.querySelectorAll('a')).some(a => {
      const u = new URL(a.getAttribute('href'), location.origin);
      return normalize(u.pathname) === currentPath;
    });
    if (hit) parentLi.classList.add('is-active');
  });
});

// ページ共通 「平尾台ラバーズ」スライダー
document.addEventListener('DOMContentLoaded', () => {
  const SEL = '.page_body_content_lovers_swiper';
  const root = document.querySelector(SEL);
  if (!root || !window.Swiper) return;

  // 画像読み込み待ち（幅確定）
  const waitImages = (scope, timeoutMs = 4000) => new Promise((resolve) => {
    const imgs = [...scope.querySelectorAll('img')];
    if (!imgs.length) return resolve();
    let done = 0, total = imgs.length;
    const tick = () => (++done >= total) && resolve();
    const t = setTimeout(resolve, timeoutMs);
    imgs.forEach(img => {
      if (img.complete) return tick();
      img.addEventListener('load', tick, { once: true });
      img.addEventListener('error', tick, { once: true });
    });
  });

  // マウスホイールで横に動かされるのを抑止
  root.addEventListener('wheel', (e) => { e.preventDefault(); }, { passive: false });

  let sw = null;
  const initSwiper = () => {
    if (sw && !sw.destroyed) sw.destroy(true, true);
    sw = new Swiper(SEL, {
      slidesPerView: 'auto',
      spaceBetween: 20,
      allowTouchMove: false,   // 手動不可
      simulateTouch: false,
      freeMode: false,
      watchOverflow: true,
      observer: true,
      observeParents: true,
      preloadImages: false,
      lazy: { loadOnTransitionStart: true },
    });
  };
  // 原本を複製（原本+複製=2列）→ translateX を幅でモジュロ
  const duplicateSlides = () => {
    const wrapper = root.querySelector('.swiper-wrapper');
    if (!wrapper) return;
    if (wrapper.dataset.doubled === '1') return;
    const original = wrapper.innerHTML.trim();
    wrapper.insertAdjacentHTML('beforeend', original);
    wrapper.dataset.doubled = '1';
  };
  // rAF で完全等速（シームレス）。offset を trackW で剰余処理
  let rafId = null;
  let lastTs = 0;
  let offset = 0;      // 進行px
  let trackW = 0;      // 原本ぶんの幅（= wrapper.scrollWidth / 2）
  const PX_PER_SEC = 40; // 好みで 80〜200 あたり
  const step = (ts) => {
    if (!lastTs) lastTs = ts;
    const dt = (ts - lastTs) / 1000; // 秒
    lastTs = ts;
    // 進行
    offset += PX_PER_SEC * dt;
    if (trackW > 0) {
      // モジュロで折り返し（見た目は完全連続）
      if (offset >= trackW) offset -= trackW;
      const x = -offset;
      const wrapper = root.querySelector('.swiper-wrapper');
      if (wrapper) {
        // サブピクセルも滑らかに（GPU合成）
        wrapper.style.transform = `translate3d(${x}px,0,0)`;
      }
    }
    rafId = requestAnimationFrame(step);
  };
  const startTicker = () => {
    if (rafId) cancelAnimationFrame(rafId);
    lastTs = 0;
    rafId = requestAnimationFrame(step);
  };
  const stopTicker = () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  };
  const recalcTrackWidth = () => {
    const wrapper = root.querySelector('.swiper-wrapper');
    if (!wrapper) return;
    // 原本+複製構成なので 1/2 が原本幅
    trackW = wrapper.scrollWidth / 2;
  };
  // 可視状態にあわせて省電力＆復帰安定
  const bindVisibility = () => {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        // 再計算→再開
        if (sw && !sw.destroyed) sw.update();
        recalcTrackWidth();
        startTicker();
      } else {
        stopTicker();
      }
    });
  };
  // リサイズで速度バランス/幅再計算
  const bindResize = () => {
    let raf = null;
    window.addEventListener('resize', () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (sw && !sw.destroyed) sw.update();
        const wrapper = root.querySelector('.swiper-wrapper');
        // 現在の見かけ位置を保ったまま width 再計算
        if (wrapper) {
          const prevTrackW = trackW || 1;
          recalcTrackWidth();
          // 相対位置を維持（オフセットを新幅に合わせて再マップ）
          offset = (offset / prevTrackW) * trackW;
        }
      });
    });
  };
  // 実行
  (async () => {
    await waitImages(root);
    duplicateSlides();        // 継ぎ目ゼロの構成
    initSwiper();             // レイアウト（手動不可）
    recalcTrackWidth();       // 原本幅の計測
    startTicker();            // rAF等速開始
    bindVisibility();         // タブ復帰で再開
    bindResize();             // レスポンシブ対応
  })();
});

// ページ共通 フッターセクションに入ったらヘッダーを消す
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header') || document.querySelector('.header');
  const footer = document.getElementById('footer') || document.querySelector('.footer');
  if (!header || !footer) return;
  header.classList.add('visible');
  let hidden = false;
  let ticking = false;
  const getHeaderH = () => Math.ceil(header.getBoundingClientRect().height);
  function update() {
    ticking = false;
    const ih = window.innerHeight;
    const ftTop = footer.getBoundingClientRect().top;
    const h = getHeaderH();
    const HIDE_BUFFER = 24;
    const SHOW_BUFFER = 160;
    const hideThreshold = ih - (h + HIDE_BUFFER);
    const showThreshold = ih + SHOW_BUFFER;

    if (!hidden && ftTop <= hideThreshold) {
      header.classList.remove('visible');
      header.classList.add('hidden');
      hidden = true;
    } else if (hidden && ftTop >= showThreshold) {
      header.classList.add('visible');
      header.classList.remove('hidden');
      hidden = false;
    }
  }
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
});


// 「風景に出会う」ページ アーカイブの「もっと見る」「閉じる」
jQuery(function ($) {
  const INIT = 4;   // 初期表示
  const MORE = 4;   // 追加表示
  const DURATION = 320; // ms
  const EASE = 'cubic-bezier(0.22,0.61,0.36,1)'; // イージング
  const STAGGER = 36; // 1件ずつ遅延（ms）

  const prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // アニメユーティリティ
  function smoothShow(el, delay = 0) {
    // すでに表示中ならスキップ
    if (el.style.display !== 'none' && !el.classList.contains('is-hidden')) return Promise.resolve();

    // 初期状態を作る
    el.style.display = 'block';
    el.style.overflow = 'hidden';
    el.style.willChange = 'height, opacity, transform';
    el.style.height = '0px';
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';

    const endH = el.scrollHeight;

    if (prefersReduce || !el.animate) {
      // フォールバック：jQuery
      return new Promise(resolve => {
        $(el).stop(true, true).css({ opacity: 1, transform: 'none' }).animate(
          { height: endH },
          DURATION,
          () => {
            cleanup(el);
            resolve();
          }
        );
      });
    }

    return el.animate(
      [
        { height: '0px', opacity: 0, transform: 'translateY(8px)' },
        { height: endH + 'px', opacity: 1, transform: 'translateY(0)' }
      ],
      { duration: DURATION, easing: EASE, delay }
    ).finished.then(() => cleanup(el));
  }

  function smoothHide(el, delay = 0) {
    // すでに非表示ならスキップ
    if (el.style.display === 'none' || el.classList.contains('is-hidden')) return Promise.resolve();

    const startH = el.offsetHeight;
    el.style.overflow = 'hidden';
    el.style.willChange = 'height, opacity, transform';
    el.style.height = startH + 'px';
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';

    if (prefersReduce || !el.animate) {
      return new Promise(resolve => {
        $(el).stop(true, true).animate(
          { height: 0, opacity: 0 },
          DURATION,
          () => {
            el.style.display = 'none';
            cleanup(el, true);
            resolve();
          }
        );
      });
    }

    return el.animate(
      [
        { height: startH + 'px', opacity: 1, transform: 'translateY(0)' },
        { height: '0px',        opacity: 0, transform: 'translateY(8px)' }
      ],
      { duration: DURATION, easing: EASE, delay }
    ).finished.then(() => {
      el.style.display = 'none';
      cleanup(el, true);
    });
  }

  function cleanup(el, makeHidden = false) {
    el.style.height = '';
    el.style.opacity = '';
    el.style.transform = '';
    el.style.overflow = '';
    el.style.willChange = '';
    el.classList.toggle('is-hidden', !!makeHidden);
  }

  // 固定ヘッダー分のオフセット（CLOSEで戻るとき用）
  const headerOffset = (() => {
    const $h = $('#header');
    return ($h.length && $h.css('position') === 'fixed') ? $h.outerHeight() : 0;
  })();

  // 各コンテナを初期化
  $('.page_body_content_landscape_archive_container').each(function () {
    const $container = $(this);
    const $wrap  = $container.find('.page_body_content_landscape_archive_wrap');
    const items  = $wrap.find('.landscape_bl').toArray();
    const $more  = $container.find('.archive_btn_more');
    let   $close = $container.find('.archive_btn_close');

    if (!items.length) return;

    // CLOSEがなければ生成
    if (!$close.length) {
      $close = $('<p class="archive_btn_close" style="display:none;">CLOSE</p>');
      $container.find('.page_body_content_landscape_archive_btn').append($close);
    }

    // 初期：INIT件目以降をdisplay:noneで隠す（アニメ前提）
    items.slice(INIT).forEach(el => { el.style.display = 'none'; el.classList.add('is-hidden'); });

    if (items.length <= INIT) { $more.hide(); $close.hide(); return; }

    // もっと見る
    $more.on('click', async function (e) {
      e.preventDefault();
      const hidden = $wrap.find('.landscape_bl.is-hidden').toArray().slice(0, MORE);
      // ステップ（stagger）しながら順次表示
      await Promise.all(hidden.map((el, i) => smoothShow(el, i * STAGGER)));

      $close.stop(true, true).fadeIn(150);
      if ($wrap.find('.landscape_bl.is-hidden').length === 0) {
        $more.fadeOut(150);
      }
    });

    // 閉じる：INIT件だけ残して滑らかに畳む（後ろから閉じると安定）
    $close.on('click', async function (e) {
      e.preventDefault();
      const extra = items.slice(INIT).filter(el => el.style.display !== 'none');
      // 後ろから順に（重なりを感じにくい）
      await Promise.all(extra.reverse().map((el, i) => smoothHide(el, i * STAGGER)));

      $more.stop(true, true).fadeIn(150);
      $close.stop(true, true).fadeOut(150);

      // リスト先頭へ戻す
      const top = $container.get(0).getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top, behavior: prefersReduce ? 'auto' : 'smooth' });
    });
  });
});


//「風景に出会う」ページ 動画モーダル
// $(function(){
//   $(".js-modal-landscape").modalVideo();
// });

jQuery(function($){
  // 既存：YouTubeは modal-video.js
  $('.js-modal-landscape').modalVideo({
    channel: 'youtube',
    youtube: { rel: 0, playsinline: 1 }
  });

  // 画像モーダル
  var $imgModal  = $('#img-modal');
  var $imgTarget = $('#img-modal .imgmodal__body img');

  // 開く
  $(document).on('click', '.js-image-landscape', function(e){
    e.preventDefault();

    // 優先：data-image、フォールバック：内部の<img>のsrc
    var src = $.trim($(this).data('image') || '') ||
              $.trim($(this).find('img').attr('src') || '');

    if (!src) {
      console.warn('[img-modal] 画像URLが空です');
      return;
    }

    $imgTarget.attr('src', src);
    $imgModal.addClass('is-open').attr('aria-hidden', 'false');
  });

  // 閉じる（× or 背景）
  $(document).on('click', '#img-modal [data-close]', function(){
    closeImgModal();
  });

  // ダイアログ内クリックでは閉じない
  $(document).on('click', '#img-modal .imgmodal__dialog', function(e){
    e.stopPropagation();
  });

  // ESCで閉じる
  $(document).on('keydown', function(e){
    if (e.key === 'Escape' && $imgModal.hasClass('is-open')) {
      closeImgModal();
    }
  });

  function closeImgModal(){
    $imgModal.removeClass('is-open').attr('aria-hidden', 'true');
    // 読み込みを解放
    $imgTarget.attr('src', '');
  }
});


// loadingアニメーション制御
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.loading');
  const imgs = loader?.querySelectorAll('.loading_img img');
  const fv = document.getElementById('fv');
  if(!loader || !imgs || !imgs.length){ fv?.classList.add('is-show'); return; }

  // 初期化
  imgs.forEach((img,i)=>{ img.style.display='block'; img.classList.toggle('is-on', i===0); });

  const STEP_MS=800, LAST_WAIT_MS=0;
  let idx=0;
  const showNext=()=> {
    imgs[idx].classList.remove('is-on');
    idx++;
    if(idx < imgs.length){
      imgs[idx].classList.add('is-on');
      if(idx === imgs.length-1){ setTimeout(()=>{ loader.classList.add('is-hide'); fv?.classList.add('is-show'); }, LAST_WAIT_MS); }
      setTimeout(showNext, STEP_MS);
    }
  };
  setTimeout(showNext, STEP_MS);
});


// トップ動画背景（YouTube埋め込み）- 安定版
(function(){
  'use strict';
  const el = document.getElementById('yt-bg-player');
  if (!el) return;
  
  const VIDEO_ID = el.getAttribute('data-video');
  let player, lastKick = 0, isReady = false, initAttempts = 0;
  const MAX_INIT_ATTEMPTS = 3;

  // YouTube APIの読み込み状態を確認
  function ensureYouTubeAPI() {
    if (window.YT && window.YT.Player) {
      initPlayer();
      return;
    }
    
    // APIがまだ読み込まれていない場合
    if (!window.YT) {
      window.YT = { loading: 1, loaded: 0 };
    }
    
    // APIスクリプトが存在しない場合は追加
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.async = true;
      tag.onerror = () => {
        console.error('YouTube API読み込み失敗');
        retryInit();
      };
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }

  // 初期化リトライ処理
  function retryInit() {
    initAttempts++;
    if (initAttempts < MAX_INIT_ATTEMPTS) {
      console.log(`YouTube初期化リトライ (${initAttempts}/${MAX_INIT_ATTEMPTS})`);
      setTimeout(ensureYouTubeAPI, 2000 * initAttempts);
    }
  }

  // プレイヤー初期化
  function initPlayer() {
    if (player) return; // 既に初期化済み
    
    try {
      player = new YT.Player('yt-bg-player', {
        videoId: VIDEO_ID,
        playerVars: {
          // UI/表示系
          controls: 0,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          fs: 0,
          disablekb: 1,
          cc_load_policy: 0,
          // 再生系
          autoplay: 1,
          mute: 1,
          playsinline: 1,
          loop: 1,
          playlist: VIDEO_ID,
          enablejsapi: 1,
          origin: window.location.origin,
          // 追加の安定化パラメータ
          widget_referrer: window.location.href
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
          onError: onPlayerError
        },
        host: 'https://www.youtube-nocookie.com'
      });
    } catch(err) {
      console.error('プレイヤー作成エラー:', err);
      retryInit();
    }
  }

  // プレイヤー準備完了
  function onPlayerReady(e) {
    isReady = true;
    try {
      e.target.mute();
      e.target.setVolume(0);
    } catch(_){}
    
    // 確実に再生開始
    setTimeout(() => kickPlay(), 100);
    setTimeout(() => kickPlay(), 500);
    setTimeout(() => kickPlay(), 1000);
    
    // フェードイン表示
    requestAnimationFrame(() => {
      const bgVideo = document.getElementById('bg-video');
      if (bgVideo) {
        bgVideo.classList.add('is-ready');
        bgVideo.style.opacity = '1';
      }
    });

    // グローバル参照
    window.YT_BG = e.target;
    document.dispatchEvent(new CustomEvent('ytbg:ready', { detail: { player: e.target } }));
    
    console.log('YouTube背景動画：準備完了');
  }

  // 状態変化
  function onPlayerStateChange(e) {
    const state = e.data;
    
    // 終了時
    if (state === YT.PlayerState.ENDED) {
      try {
        e.target.seekTo(0, true);
        kickPlay();
      } catch(_){}
    }
    
    // 一時停止・停止時
    if (state === YT.PlayerState.PAUSED || state === YT.PlayerState.CUED) {
      setTimeout(() => kickPlay(), 100);
    }
    
    // 再生中になったら表示確保
    if (state === YT.PlayerState.PLAYING) {
      const bgVideo = document.getElementById('bg-video');
      if (bgVideo) {
        bgVideo.classList.add('is-ready');
      }
    }
  }

  // エラーハンドリング
  function onPlayerError(e) {
    console.error('YouTube再生エラー:', e.data);
    // エラーコード: 2=無効なID, 5=HTML5エラー, 100=動画が見つからない, 101/150=埋め込み不可
    
    // リカバリ試行
    setTimeout(() => {
      if (player && typeof player.loadVideoById === 'function') {
        try {
          player.loadVideoById(VIDEO_ID);
          kickPlay();
        } catch(_){}
      }
    }, 2000);
  }

  // 再生キック（デバウンス付き）
  function kickPlay() {
    if (!player || !isReady || typeof player.playVideo !== 'function') return;
    
    const now = Date.now();
    if (now - lastKick < 300) return;
    lastKick = now;
    
    try {
      const state = player.getPlayerState();
      if (state !== YT.PlayerState.PLAYING) {
        player.playVideo();
      }
    } catch(err) {
      console.warn('再生キック失敗:', err);
    }
  }

  // イベントリスナー設定（passive最適化）
  const rekick = () => {
    if (isReady) kickPlay();
  };

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && isReady) {
      setTimeout(kickPlay, 100);
    }
  }, { passive: true });
  
  window.addEventListener('focus', rekick, { passive: true });
  
  // スクロール・タッチは頻度を抑える
  let scrollTimer;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(rekick, 200);
  }, { passive: true });
  
  window.addEventListener('touchmove', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(rekick, 200);
  }, { passive: true });

  // Intersection Observer（ビューポート監視）
  try {
    const bgVideo = document.getElementById('bg-video');
    if (bgVideo) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && isReady) {
            setTimeout(kickPlay, 100);
          }
        });
      }, { 
        threshold: [0, 0.1],
        rootMargin: '50px'
      });
      io.observe(bgVideo);
    }
  } catch(_){}

  // YouTube APIコールバック
  window.onYouTubeIframeAPIReady = initPlayer;

  // 初期化開始
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureYouTubeAPI);
  } else {
    ensureYouTubeAPI();
  }

})();



// トップニュースティッカー（SP時のみ）
document.addEventListener('DOMContentLoaded', function(){
  const ticker = document.querySelector('.fv_news_ticker.js-ticker');
  if (!ticker) return;

  // 1) 中のすべての <ul> の <li> を集めて1本の“lane”にする
  const uls = Array.from(ticker.querySelectorAll(':scope > ul'));
  if (uls.length === 0) return;

  const lane = document.createElement('div');
  lane.className = 'lane';

  uls.forEach(ul => {
    Array.from(ul.querySelectorAll('li')).forEach(li => {
      const item = document.createElement('span');
      item.className = 'item';
      item.innerHTML = li.innerHTML; // <li>の中身を移植
      lane.appendChild(item);
    });
  });

  // 2) lane を配置し、同一内容のクローンを後ろに並べる
  ticker.appendChild(lane);
  const clone = lane.cloneNode(true);
  clone.classList.add('clone');
  ticker.appendChild(clone);

  // 3) 実測幅(px)でアニメ距離と時間を設定（継ぎ目ゼロ）
  function measure(){
    // 計測のため一時的にlane可視化（元のULは後で隠す）
    const w = lane.scrollWidth;
    lane.style.setProperty('--w', w + 'px');
    clone.style.setProperty('--w', w + 'px');

    const speed = Number(ticker.dataset.speed) || 160; // px/sec
    const dur = (w / speed).toFixed(3) + 's';
    lane.style.setProperty('--dur', dur);
    clone.style.setProperty('--dur', dur);

    // 元のUL群は非表示に（高さは .fv_news_ticker で固定されている）
    uls.forEach(ul => ul.style.visibility = 'hidden');
  }

  // 初回 & リサイズ & フォント読み込み後に再計測
  function scheduleMeasure(){ requestAnimationFrame(measure); }
  measure();
  window.addEventListener('resize', scheduleMeasure, { passive:true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  setTimeout(measure, 0);
});


// // Feature背景スクロール連動（画像の実サイズベース）
// (function() {
//   'use strict';
  
//   function initFeatureScroll() {
//     const scrollTarget = document.querySelector('.js-feature-scroll');
//     const bgInner = document.querySelector('.feature-bg__inner');
//     const bgImg = bgInner?.querySelector('img');
//     const featureShell = document.querySelector('.feature-shell');
//     const featureCard = document.querySelector('.feature-card');
//     const cardHeadImg = document.querySelector('.feature-card__head img');
    
//     console.log('Feature scroll init:', { scrollTarget, bgInner, bgImg, featureShell, featureCard, cardHeadImg });
    
//     if (!scrollTarget || !bgInner || !bgImg) {
//       console.warn('Feature elements not found');
//       return;
//     }
    
//     let bgNaturalHeight = 0;
//     let bgNaturalWidth = 0;
//     let isImageLoaded = false;
    
//     // カード画像の高さを計算してカードの高さを設定
//     function setCardHeight() {
//       if (!cardHeadImg || !featureCard) return;
      
//       // 画像が読み込まれているか確認
//       if (cardHeadImg.complete && cardHeadImg.naturalHeight > 0) {
//         const imgNaturalWidth = cardHeadImg.naturalWidth;
//         const imgNaturalHeight = cardHeadImg.naturalHeight;
//         const imgAspectRatio = imgNaturalWidth / imgNaturalHeight;
        
//         // カードの幅を取得
//         const cardWidth = featureCard.offsetWidth;
        
//         // 画像の高さを計算
//         const imgDisplayHeight = cardWidth / imgAspectRatio;
        
//         // カードの高さを設定（画像の高さ + body/footerの余白）
//         // 最大80vhに制限
//         const maxHeight = window.innerHeight * 0.8;
//         const calculatedHeight = Math.min(imgDisplayHeight + 200, maxHeight); // 200pxは body + footer の概算
        
//         featureCard.style.height = `${calculatedHeight}px`;
        
//         console.log('Card height set:', {
//           imgNaturalWidth,
//           imgNaturalHeight,
//           imgAspectRatio: imgAspectRatio.toFixed(2),
//           cardWidth,
//           imgDisplayHeight: imgDisplayHeight.toFixed(2),
//           calculatedHeight: calculatedHeight.toFixed(2)
//         });
//       } else {
//         // 画像が読み込まれていない場合は読み込みを待つ
//         cardHeadImg.onload = function() {
//           setCardHeight();
//         };
//       }
//     }
    
//     // 初期設定とリサイズ時の再計算
//     function initCardHeight() {
//       setCardHeight();
      
//       let resizeTimer;
//       window.addEventListener('resize', function() {
//         clearTimeout(resizeTimer);
//         resizeTimer = setTimeout(setCardHeight, 100);
//       }, { passive: true });
//     }
    
//     // 初期化時に実行
//     initCardHeight();
    
//     // feature-shellの表示状態を監視してヘッダー表示を制御
//     if (featureShell) {
//       // 初期状態をログ
//       console.log('Initial body classes:', document.body.className);
//       console.log('Header element:', document.querySelector('#header') || document.querySelector('.header'));
      
//       let isInFeatureShell = false;
//       let unlockTimeout = null; // 固定解除のタイマー
      
//       const observerOptions = {
//         root: null,
//         rootMargin: '0px',
//         threshold: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1.0] // より細かく監視
//       };
      
//       const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//           console.log('IntersectionObserver triggered:', {
//             intersectionRatio: entry.intersectionRatio,
//             isIntersecting: entry.isIntersecting,
//             target: entry.target.className
//           });
          
//           // feature-shellが50%以上画面に入ったら固定開始
//           if (entry.intersectionRatio >= 0.5) {
//             // タイマーキャンセル
//             if (unlockTimeout) {
//               clearTimeout(unlockTimeout);
//               unlockTimeout = null;
//             }
            
//             isInFeatureShell = true;
//             document.body.classList.add('is-special');
//             document.body.classList.add('in-feature-shell');
//             console.log('✓ Entered feature-shell - page locked');
//             console.log('Body classes:', document.body.className);
            
//             // トランジションなしで即座に固定（チカチカ防止）
//             featureShell.style.transition = 'none';
            
//             // feature-shellを画面に固定
//             requestAnimationFrame(() => {
//               featureShell.style.position = 'fixed';
//               featureShell.style.top = '0';
//               featureShell.style.left = '0';
//               featureShell.style.width = '100%';
//               featureShell.style.zIndex = '100';
//             });
            
//           } else if (entry.intersectionRatio < 0.5) {
//             // 50%未満になったら固定解除の準備（すぐには解除しない）
//             if (!unlockTimeout && isInFeatureShell) {
//               unlockTimeout = setTimeout(() => {
//                 isInFeatureShell = false;
//                 document.body.classList.remove('is-special');
//                 document.body.classList.remove('in-feature-shell');
//                 console.log('✓ Exited feature-shell - page unlocked');
//                 console.log('Body classes:', document.body.className);
                
//                 // トランジションなしで即座に固定解除（チカチカ防止）
//                 featureShell.style.transition = 'none';
//                 featureShell.style.position = 'relative';
//                 featureShell.style.top = '';
//                 featureShell.style.left = '';
//                 featureShell.style.width = '';
//                 featureShell.style.zIndex = '';
                
//                 unlockTimeout = null;
//               }, 100); // 300ms → 100msに短縮
//             }
//           }
          
//           // header要素の状態も確認
//           const header = document.querySelector('#header') || document.querySelector('.header');
//           if (header) {
//             const styles = window.getComputedStyle(header);
//             console.log('Header computed styles:', {
//               opacity: styles.opacity,
//               visibility: styles.visibility,
//               display: styles.display
//             });
//           }
//         });
//       }, observerOptions);
      
//       observer.observe(featureShell);
//       console.log('IntersectionObserver attached to feature-shell');
      
//       // ページ全体のスクロールを監視
//       let lastScrollY = window.scrollY;
//       let ticking = false;
      
//       window.addEventListener('scroll', function() {
//         lastScrollY = window.scrollY;
        
//         if (!ticking && isInFeatureShell) {
//           window.requestAnimationFrame(function() {
//             // feature-shell内にいる間はページスクロールを防止
//             const rect = featureShell.getBoundingClientRect();
//             if (rect.top !== 0 && isInFeatureShell) {
//               // 位置がずれたら修正
//               featureShell.style.position = 'fixed';
//               featureShell.style.top = '0';
//             }
//             ticking = false;
//           });
//           ticking = true;
//         }
//       }, { passive: true });
//     }
    
//     // 画像の自然なサイズを取得
//     function loadImageDimensions() {
//       return new Promise((resolve) => {
//         if (bgImg.complete && bgImg.naturalHeight > 0) {
//           bgNaturalWidth = bgImg.naturalWidth;
//           bgNaturalHeight = bgImg.naturalHeight;
//           isImageLoaded = true;
//           console.log('Image already loaded:', { 
//             naturalWidth: bgNaturalWidth, 
//             naturalHeight: bgNaturalHeight 
//           });
//           resolve();
//         } else {
//           bgImg.onload = function() {
//             bgNaturalWidth = bgImg.naturalWidth;
//             bgNaturalHeight = bgImg.naturalHeight;
//             isImageLoaded = true;
//             console.log('Image loaded:', { 
//               naturalWidth: bgNaturalWidth, 
//               naturalHeight: bgNaturalHeight 
//             });
//             resolve();
//           };
//           bgImg.onerror = function() {
//             console.error('Failed to load background image');
//             resolve();
//           };
//         }
//       });
//     }
    
//     // 背景画像の表示サイズを計算
//     function calculateBgDisplaySize() {
//       if (!isImageLoaded) return null;
      
//       const viewportWidth = window.innerWidth;
//       const viewportHeight = window.innerHeight;
//       const imageAspect = bgNaturalWidth / bgNaturalHeight;
//       const viewportAspect = viewportWidth / viewportHeight;
      
//       let displayWidth, displayHeight;
      
//       // object-fit: cover の計算
//       if (imageAspect > viewportAspect) {
//         // 画像が横長 → 高さ基準
//         displayHeight = viewportHeight;
//         displayWidth = displayHeight * imageAspect;
//       } else {
//         // 画像が縦長 → 幅基準
//         displayWidth = viewportWidth;
//         displayHeight = displayWidth / imageAspect;
//       }
      
//       console.log('Background display size:', {
//         displayWidth: displayWidth.toFixed(2),
//         displayHeight: displayHeight.toFixed(2),
//         viewportWidth,
//         viewportHeight,
//         canMove: (displayHeight - viewportHeight).toFixed(2)
//       });
      
//       return { displayWidth, displayHeight };
//     }
    
//     // 背景のサイズを設定
//     function setBgSize() {
//       const size = calculateBgDisplaySize();
//       if (!size) return;
      
//       // bgInnerの高さを画像の表示高さに設定
//       bgInner.style.height = `${size.displayHeight}px`;
//     }
    
//     // スクロールイベント（throttle付きでチカチカ防止）
//     let scrollTimeout = null;
//     function handleScroll() {
//       if (scrollTimeout) return;
      
//       scrollTimeout = setTimeout(() => {
//         const scrollTop = scrollTarget.scrollTop;
//         const scrollHeight = scrollTarget.scrollHeight;
//         const clientHeight = scrollTarget.clientHeight;
//         const maxScroll = scrollHeight - clientHeight;
        
//         if (maxScroll <= 0) {
//           scrollTimeout = null;
//           return;
//         }
        
//         // スクロール進捗率 (0〜1)
//         const scrollProgress = scrollTop / maxScroll;
        
//         // 背景を移動させる距離を計算
//         const size = calculateBgDisplaySize();
//         if (!size) {
//           scrollTimeout = null;
//           return;
//         }
        
//         const viewportHeight = window.innerHeight;
//         const maxBgMove = size.displayHeight - viewportHeight;
        
//         // 背景のY位置を計算
//         const bgY = -(scrollProgress * maxBgMove);
        
//         // transformで背景を移動
//         bgInner.style.transform = `translate(-50%, ${bgY}px)`;
        
//         scrollTimeout = null;
//       }, 16); // 約60fps
//     }
    
//     // feature-shell全体でマウスホイールを検知
//     if (featureShell) {
//       let unlockAnimating = false; // アニメーション中フラグ
      
//       featureShell.addEventListener('wheel', function(e) {
//         // アニメーション中はイベントを無視
//         if (unlockAnimating) return;
        
//         // スクロール可能かチェック
//         const scrollHeight = scrollTarget.scrollHeight;
//         const clientHeight = scrollTarget.clientHeight;
//         const maxScroll = scrollHeight - clientHeight;
        
//         if (maxScroll <= 0) {
//           // スクロールできない場合はページスクロールを許可
//           return;
//         }
        
//         // 現在のスクロール位置
//         const currentScroll = scrollTarget.scrollTop;
//         const delta = e.deltaY;
        
//         // スクロールの端に達しているかチェック
//         const atTop = currentScroll <= 0;
//         const atBottom = currentScroll >= maxScroll - 1; // 1px の誤差を許容
        
//         // 上端で上スクロール → 固定解除してFVエリアへ戻る
//         if (atTop && delta < 0) {
//           console.log('At top, scrolling up - releasing fixed position instantly');
//           unlockAnimating = true;
          
//           // ★ ブラウザの再描画を1フレームに統合してチカチカを防止
//           requestAnimationFrame(() => {
//             // すべてのスタイル変更を一度に実行
//             featureShell.style.cssText = featureShell.style.cssText
//               .replace(/position:[^;]+;?/g, '')
//               .replace(/top:[^;]+;?/g, '')
//               .replace(/left:[^;]+;?/g, '')
//               .replace(/width:[^;]+;?/g, '')
//               .replace(/z-index:[^;]+;?/g, '')
//               .replace(/transition:[^;]+;?/g, '');
            
//             featureShell.style.position = 'relative';
            
//             document.body.classList.remove('in-feature-shell');
//             document.body.classList.remove('is-special');
            
//             // 次のフレームでフラグをリセット
//             requestAnimationFrame(() => {
//               unlockAnimating = false;
//             });
//           });
          
//           // ページスクロールを許可（preventDefaultしない）
//           return;
//         }
        
//         // 下端で下スクロール → ページスクロールを許可（固定は維持）
//         if (atBottom && delta > 0) {
//           console.log('At bottom, scrolling down - allowing page scroll');
//           // ページスクロールを許可（preventDefaultしない）
//           return;
//         }
        
//         // それ以外はカード内スクロールのみ（ページスクロールをブロック）
//         e.preventDefault();
//         e.stopPropagation();
        
//         // 新しいスクロール位置を計算
//         let newScroll = currentScroll + delta;
        
//         // 範囲制限
//         newScroll = Math.max(0, Math.min(newScroll, maxScroll));
        
//         // スクロール位置を設定
//         scrollTarget.scrollTop = newScroll;
        
//       }, { passive: false }); // passive: false でpreventDefaultを有効に
      
//       // タッチイベントも同様に処理（モバイル対応）
//       let touchStartY = 0;
      
//       featureShell.addEventListener('touchstart', function(e) {
//         touchStartY = e.touches[0].clientY;
//       }, { passive: true });
      
//       featureShell.addEventListener('touchmove', function(e) {
//         const scrollHeight = scrollTarget.scrollHeight;
//         const clientHeight = scrollTarget.clientHeight;
//         const maxScroll = scrollHeight - clientHeight;
        
//         if (maxScroll <= 0) return;
        
//         const currentScroll = scrollTarget.scrollTop;
//         const touchY = e.touches[0].clientY;
//         const deltaY = touchStartY - touchY;
        
//         const atTop = currentScroll <= 0;
//         const atBottom = currentScroll >= maxScroll - 1;
        
//         // 上端で上方向のタッチ → 固定解除
//         if (atTop && deltaY < 0) {
//           console.log('Touch: at top, releasing fixed position');
          
//           // ★ ブラウザの再描画を1フレームに統合してチカチカを防止
//           requestAnimationFrame(() => {
//             featureShell.style.cssText = featureShell.style.cssText
//               .replace(/position:[^;]+;?/g, '')
//               .replace(/top:[^;]+;?/g, '')
//               .replace(/left:[^;]+;?/g, '')
//               .replace(/width:[^;]+;?/g, '')
//               .replace(/z-index:[^;]+;?/g, '')
//               .replace(/transition:[^;]+;?/g, '');
            
//             featureShell.style.position = 'relative';
            
//             document.body.classList.remove('in-feature-shell');
//             document.body.classList.remove('is-special');
//           });
          
//           // ページスクロールを許可
//           return;
//         }
        
//         // 下端で下方向のタッチ → ページスクロール許可（固定は維持）
//         if (atBottom && deltaY > 0) {
//           console.log('Touch: at bottom, allowing page scroll');
//           // ページスクロールを許可
//           return;
//         }
        
//         // カード内スクロール中はページスクロールをブロック
//         e.preventDefault();
        
//         touchStartY = touchY;
//       }, { passive: false });
      
//       console.log('Wheel event listener attached to feature-shell');
//     }
    
//     // 初期化
//     async function init() {
//       await loadImageDimensions();
//       setBgSize();
      
//       // スクロールイベントを登録
//       scrollTarget.addEventListener('scroll', handleScroll, { passive: true });
      
//       // リサイズ時に再計算
//       let resizeTimer;
//       window.addEventListener('resize', function() {
//         clearTimeout(resizeTimer);
//         resizeTimer = setTimeout(() => {
//           setBgSize();
//           handleScroll(); // 現在のスクロール位置で再計算
//         }, 100);
//       }, { passive: true });
      
//       console.log('Feature scroll initialized');
      
//       // 初期状態のチェック
//       setTimeout(() => {
//         console.log('Content dimensions:', {
//           scrollHeight: scrollTarget.scrollHeight,
//           clientHeight: scrollTarget.clientHeight,
//           canScroll: scrollTarget.scrollHeight > scrollTarget.clientHeight
//         });
//       }, 100);
//     }
    
//     init();
//   }
  
//   // DOM読み込み後に実行
//   if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', initFeatureScroll);
//   } else {
//     initFeatureScroll();
//   }
// })();


// Feature背景スクロール連動（画像の実サイズベース）
(function() {
  'use strict';
  
  // 400px未満では何もしない（スマホでスクロール奪わない）
  function initIfWideScreen() {
    if (window.innerWidth < 400) {
      console.log('Feature scroll disabled (<400px)');
      return;
    }
    initFeatureScroll();
  }

  function initFeatureScroll() {
    const scrollTarget = document.querySelector('.js-feature-scroll');
    const bgInner = document.querySelector('.feature-bg__inner');
    const bgImg = bgInner?.querySelector('img');
    const featureShell = document.querySelector('.feature-shell');
    const featureCard = document.querySelector('.feature-card');
    const cardHeadImg = document.querySelector('.feature-card__head img');
    
    console.log('Feature scroll init:', { scrollTarget, bgInner, bgImg, featureShell, featureCard, cardHeadImg });
    
    if (!scrollTarget || !bgInner || !bgImg) {
      console.warn('Feature elements not found');
      return;
    }
    
    let bgNaturalHeight = 0;
    let bgNaturalWidth = 0;
    let isImageLoaded = false;
    
    // カード画像の高さを計算してカードの高さを設定
    function setCardHeight() {
      if (!cardHeadImg || !featureCard) return;
      
      if (cardHeadImg.complete && cardHeadImg.naturalHeight > 0) {
        const imgNaturalWidth = cardHeadImg.naturalWidth;
        const imgNaturalHeight = cardHeadImg.naturalHeight;
        const imgAspectRatio = imgNaturalWidth / imgNaturalHeight;
        
        const cardWidth = featureCard.offsetWidth;
        const imgDisplayHeight = cardWidth / imgAspectRatio;
        
        const maxHeight = window.innerHeight * 0.8;
        const calculatedHeight = Math.min(imgDisplayHeight + 200, maxHeight);
        
        featureCard.style.height = `${calculatedHeight}px`;
      } else {
        cardHeadImg.onload = setCardHeight;
      }
    }
    
    function initCardHeight() {
      setCardHeight();
      
      let resizeTimer;
      window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setCardHeight, 100);
      }, { passive: true });
    }
    initCardHeight();
    
    // feature-shellの表示状態を監視してヘッダー表示を制御
    if (featureShell) {
      let isInFeatureShell = false;
      let unlockTimeout = null;
      
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1.0]
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.intersectionRatio >= 0.5) {
            if (unlockTimeout) {
              clearTimeout(unlockTimeout);
              unlockTimeout = null;
            }
            
            isInFeatureShell = true;
            document.body.classList.add('is-special', 'in-feature-shell');
            
            featureShell.style.transition = 'none';
            requestAnimationFrame(() => {
              featureShell.style.position = 'fixed';
              featureShell.style.top = '0';
              featureShell.style.left = '0';
              featureShell.style.width = '100%';
              featureShell.style.zIndex = '100';
            });
          } else {
            if (!unlockTimeout && isInFeatureShell) {
              unlockTimeout = setTimeout(() => {
                isInFeatureShell = false;
                document.body.classList.remove('is-special', 'in-feature-shell');
                
                featureShell.style.transition = 'none';
                featureShell.style.position = 'relative';
                featureShell.style.top = '';
                featureShell.style.left = '';
                featureShell.style.width = '';
                featureShell.style.zIndex = '';
                
                unlockTimeout = null;
              }, 100);
            }
          }
        });
      }, observerOptions);
      
      observer.observe(featureShell);
      
      let ticking = false;
      window.addEventListener('scroll', function() {
        if (!ticking && isInFeatureShell) {
          window.requestAnimationFrame(function() {
            const rect = featureShell.getBoundingClientRect();
            if (rect.top !== 0 && isInFeatureShell) {
              featureShell.style.position = 'fixed';
              featureShell.style.top = '0';
            }
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    }
    
    // 画像の自然なサイズを取得
    function loadImageDimensions() {
      return new Promise((resolve) => {
        if (bgImg.complete && bgImg.naturalHeight > 0) {
          bgNaturalWidth = bgImg.naturalWidth;
          bgNaturalHeight = bgImg.naturalHeight;
          isImageLoaded = true;
          resolve();
        } else {
          bgImg.onload = function() {
            bgNaturalWidth = bgImg.naturalWidth;
            bgNaturalHeight = bgImg.naturalHeight;
            isImageLoaded = true;
            resolve();
          };
          bgImg.onerror = function() {
            console.error('Failed to load background image');
            resolve();
          };
        }
      });
    }
    
    function calculateBgDisplaySize() {
      if (!isImageLoaded) return null;
      
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const imageAspect = bgNaturalWidth / bgNaturalHeight;
      const viewportAspect = viewportWidth / viewportHeight;
      
      let displayWidth, displayHeight;
      
      if (imageAspect > viewportAspect) {
        displayHeight = viewportHeight;
        displayWidth = displayHeight * imageAspect;
      } else {
        displayWidth = viewportWidth;
        displayHeight = displayWidth / imageAspect;
      }
      
      return { displayWidth, displayHeight };
    }
    
    function setBgSize() {
      const size = calculateBgDisplaySize();
      if (!size) return;
      bgInner.style.height = `${size.displayHeight}px`;
    }
    
    // スクロールイベント（throttle付き）
    let scrollTimeout = null;
    function handleScroll() {
      if (scrollTimeout) return;
      
      scrollTimeout = setTimeout(() => {
        const scrollTop = scrollTarget.scrollTop;
        const scrollHeight = scrollTarget.scrollHeight;
        const clientHeight = scrollTarget.clientHeight;
        const maxScroll = scrollHeight - clientHeight;
        
        if (maxScroll <= 0) {
          scrollTimeout = null;
          return;
        }
        
        const scrollProgress = scrollTop / maxScroll;
        const size = calculateBgDisplaySize();
        if (!size) {
          scrollTimeout = null;
          return;
        }
        
        const viewportHeight = window.innerHeight;
        const maxBgMove = size.displayHeight - viewportHeight;
        const bgY = -(scrollProgress * maxBgMove);
        
        bgInner.style.transform = `translate(-50%, ${bgY}px)`;
        
        scrollTimeout = null;
      }, 16);
    }
    
    // feature-shell全体でマウスホイールを検知
    if (featureShell) {
      let unlockAnimating = false;
      
      featureShell.addEventListener('wheel', function(e) {
        if (unlockAnimating) return;
        
        const scrollHeight = scrollTarget.scrollHeight;
        const clientHeight = scrollTarget.clientHeight;
        const maxScroll = scrollHeight - clientHeight;
        
        if (maxScroll <= 0) {
          return;
        }
        
        const currentScroll = scrollTarget.scrollTop;
        const delta = e.deltaY;
        const atTop = currentScroll <= 0;
        const atBottom = currentScroll >= maxScroll - 1;
        
        if (atTop && delta < 0) {
          unlockAnimating = true;
          requestAnimationFrame(() => {
            featureShell.style.position = 'relative';
            featureShell.style.top = '';
            featureShell.style.left = '';
            featureShell.style.width = '';
            featureShell.style.zIndex = '';
            document.body.classList.remove('in-feature-shell', 'is-special');
            requestAnimationFrame(() => {
              unlockAnimating = false;
            });
          });
          return;
        }
        
        if (atBottom && delta > 0) {
          return;
        }
        
        e.preventDefault();
        e.stopPropagation();
        
        let newScroll = currentScroll + delta;
        newScroll = Math.max(0, Math.min(newScroll, maxScroll));
        scrollTarget.scrollTop = newScroll;
        
      }, { passive: false });
      
      // タッチ（ここもPC幅のときだけ動く前提なのでOK）
      let touchStartY = 0;
      
      featureShell.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
      }, { passive: true });
      
      featureShell.addEventListener('touchmove', function(e) {
        const scrollHeight = scrollTarget.scrollHeight;
        const clientHeight = scrollTarget.clientHeight;
        const maxScroll = scrollHeight - clientHeight;
        if (maxScroll <= 0) return;
        
        const currentScroll = scrollTarget.scrollTop;
        const touchY = e.touches[0].clientY;
        const deltaY = touchStartY - touchY;
        
        const atTop = currentScroll <= 0;
        const atBottom = currentScroll >= maxScroll - 1;
        
        if (atTop && deltaY < 0) {
          requestAnimationFrame(() => {
            featureShell.style.position = 'relative';
            featureShell.style.top = '';
            featureShell.style.left = '';
            featureShell.style.width = '';
            featureShell.style.zIndex = '';
            document.body.classList.remove('in-feature-shell', 'is-special');
          });
          return;
        }
        
        if (atBottom && deltaY > 0) {
          return;
        }
        
        e.preventDefault();
        scrollTarget.scrollTop = currentScroll + deltaY;
        touchStartY = touchY;
      }, { passive: false });
    }
    
    // 初期化
    (async function() {
      await loadImageDimensions();
      setBgSize();
      
      scrollTarget.addEventListener('scroll', handleScroll, { passive: true });
      
      let resizeTimer;
      window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          setBgSize();
          handleScroll();
        }, 100);
      }, { passive: true });
      
      console.log('Feature scroll initialized');
    })();
  }
  
  // DOM読み込み後に実行（ここで幅を見てから呼ぶ）
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIfWideScreen);
  } else {
    initIfWideScreen();
  }

  // もし「横にしたら400px超えた」ケースでも効かせたいならこれ
  window.addEventListener('resize', function() {
    // すでに初期化済みなら何もしないでいいならここは空でもいい
    // 今回はシンプルに「まだ初期化してなくて400px超えたら初期化」にしておく
    if (!document.body.classList.contains('feature-scroll-initialized') && window.innerWidth >= 400) {
      initFeatureScroll();
      document.body.classList.add('feature-scroll-initialized');
    }
  }, { passive: true });

})();

AOS.init();

