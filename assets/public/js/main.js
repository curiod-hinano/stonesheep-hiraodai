
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
