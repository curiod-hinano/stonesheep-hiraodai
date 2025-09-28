
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
function copyUrl() {
    const element = document.createElement('input');
    element.value = location.href;
    document.body.appendChild(element);
    element.select();
    document.execCommand('copy');
    document.body.removeChild(element);
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
const swiper = new Swiper(".page_body_content_lovers_swiper", {
  speed: 5000,//スライドの切り替え時間
  slidesPerView: 1.9,//一度に表示するスライド枚数
  loop: true, //繰り返し
  centeredSlides: true, //アクティブなスライドをスライダーの中心に
  preventInteractionOnTransition: true, //クリックなどをしてもスライダーの停止を防ぐ
  autoplay: {
    delay: 0, //0にすることで流れ続けます。
  },
});


// ページ共通 フッターセクションに入ったらヘッダーを消す
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header') || document.querySelector('.header');
  const footer = document.getElementById('footer') || document.querySelector('.footer');
  if (!header || !footer) return;

  // 初期状態
  header.classList.add('visible');

  let hidden = false;
  let ticking = false;

  const getHeaderH = () => Math.ceil(header.getBoundingClientRect().height);

  function update() {
    ticking = false;

    const ih = window.innerHeight;
    const ftTop = footer.getBoundingClientRect().top; // フッター上端（viewport基準）
    const h = getHeaderH();

    // ヒステリシス：隠す閾値と出す閾値を分ける
    const HIDE_BUFFER = 24;   // 隠し始める余裕
    const SHOW_BUFFER = 160;  // 再表示に必要な戻り距離（大きめ）

    const hideThreshold = ih - (h + HIDE_BUFFER); // ← ここを下回ったら隠す
    const showThreshold = ih + SHOW_BUFFER;       // ← ここ以上に戻ったら出す

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
  onScroll(); // 初回判定
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
$(function(){
  $(".js-modal-landscape").modalVideo();
});