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


// // TOP fullpage.js [背景画像固定]
// jQuery(function ($) {
//     const el = document.getElementById('fullpage');
//     if (!el) return;

//     const opts = {
//         autoScrolling: false,   // ← これが最重要
//         scrollBar: true,
//         fitToSection: false,
//         // scrollOverflow: false, // 要らなければOFF
//         navigation: false
//     };

//     $('#fullpage').fullpage(opts);
// });



// TOP 背景固定 + 通常スクロール + クロスフェード切替
// (function () {
//   'use strict';

//   const onReady = (cb) =>
//     document.readyState === 'loading'
//       ? document.addEventListener('DOMContentLoaded', cb, { once: true })
//       : cb();

//   onReady(function () {
//     /* ===== 設定 ===== */
//     const DATA_ATTR        = 'data-bg';  // .special_section が持つ背景URL
//     const SWITCH_ANCHOR    = 0.50;       // どの高さ(0..1)で現在セクション判定
//     const RETURN_TO_FV_TOP = 2;          // 先頭（fv）判定px
//     const HEADER_OFFSET    = 0;          // 固定ヘッダー高があれば設定(px)
//     const PRELOAD_TIMEOUT  = 800;        // プリロード待ちタイムアウト(ms)

//     /* ===== 背景レイヤ（固定・2枚スロットでフェード） ===== */
//     let container = document.getElementById('bg-fixed');
//     if (!container) {
//       container = document.createElement('div');
//       container.id = 'bg-fixed';
//       document.body.prepend(container);
//     }
//     // スロット2枚
//     const slots = [0,1].map(i=>{
//       const d = document.createElement('div');
//       d.className = 'bg-slot slot-' + i;
//       container.appendChild(d);
//       return d;
//     });
//     let showing = 0;     // 現在表示中スロットのindex
//     let lastUrl = '';    // 直近で適用したURL

//     const preload = (url)=> new Promise((resolve, reject)=>{
//       const img = new Image();
//       img.onload  = ()=> resolve(url);
//       img.onerror = ()=> reject(url);
//       img.decoding = 'async';
//       img.src = url;
//     });

//     // async function fadeTo(url){
//     //   if (!url || url === lastUrl) return;

//     //   const nextIdx = (showing ^ 1); // 0⇄1切り替え
//     //   const nextEl  = slots[nextIdx];
//     //   const currEl  = slots[showing];

//     //   // 背景適用（先に裏面へ）
//     //   nextEl.style.backgroundImage = `url("${url}")`;

//     //   // 画像準備（ロード完了 or タイムアウトの早い方）
//     //   try {
//     //     await Promise.race([preload(url), new Promise(r=>setTimeout(r, PRELOAD_TIMEOUT))]);
//     //   } catch(_){ /* 失敗時もタイムアウトで続行 */ }

//     //   // リフローしてからフェード開始
//     //   // eslint-disable-next-line no-unused-expressions
//     //   nextEl.offsetWidth;

//     //   nextEl.classList.add('is-show');   // 次をフェードイン
//     //   currEl.classList.remove('is-show'); // 現在をフェードアウト

//     //   showing = nextIdx;
//     //   lastUrl = url;
//     // }

//     // ふわっと（入ってくる面だけ下→上）にする fadeTo
//   const running = new WeakMap();
// async function fadeTo(url){
//   if (!url || url === lastUrl) return;

//   const nextIdx = (showing ^ 1);
//   const nextEl  = slots[nextIdx];
//   const currEl  = slots[showing];

//   // 画像のデコードを待ってから適用（白チラ防止）
//   try {
//     const img = new Image();
//     img.decoding = 'async';
//     img.src = url;
//     // decode() は対応ブラウザでjankが少ない
//     if (img.decode) { await img.decode(); }
//     else { await new Promise((res, rej)=>{ img.onload=res; img.onerror=res; }); }
//   } catch(_) {}

//   nextEl.style.backgroundImage = `url("${url}")`;

//   // 既存アニメがあれば止める
//   running.get(nextEl)?.cancel?.();
//   running.get(currEl)?.cancel?.();

//   // 入口：下から＆フェードイン（合成: replace）
//   const enterAnim = nextEl.animate(
//     [
//       { opacity: 0, transform: `translate3d(0, var(--enter-distance), 0)` },
//       { opacity: 1, transform: 'translate3d(0, 0, 0)' }
//     ],
//     {
//       duration: parseFloat(getComputedStyle(document.documentElement)
//                  .getPropertyValue('--move-duration')) || 720,
//       easing: getComputedStyle(document.documentElement)
//                 .getPropertyValue('--move-ease').trim() || 'cubic-bezier(.22,.72,.1,1)',
//       fill: 'forwards',
//       composite: 'replace'
//     }
//   );

//   // 退出：その場でフェードアウト（位置は動かさない）
//   const exitAnim = currEl.animate(
//     [
//       { opacity: 1, transform: 'translate3d(0,0,0)' },
//       { opacity: 0, transform: 'translate3d(0,0,0)' }
//     ],
//     {
//       duration: parseFloat(getComputedStyle(document.documentElement)
//                  .getPropertyValue('--fade-duration')) || 420,
//       easing: getComputedStyle(document.documentElement)
//                 .getPropertyValue('--fade-ease').trim() || 'linear',
//       fill: 'forwards',
//       composite: 'replace'
//     }
//   );

//   // ハンドル保持（次の呼び出しで cancel 可能）
//   running.set(nextEl, enterAnim);
//   running.set(currEl, exitAnim);

//   showing = nextIdx;
//   lastUrl = url;

//   // 終了後の軽いクリーンアップ（任意）
//   Promise.allSettled([enterAnim.finished, exitAnim.finished]).then(()=>{
//     // Safariのちらつき対策：最終姿勢をCSSに反映しておく
//     nextEl.style.opacity = '1';
//     nextEl.style.transform = 'translate3d(0,0,0)';
//     currEl.style.opacity = '0';
//   });
// }

//     /* ===== ターゲット収集 ===== */
//     const specials = Array.from(document.querySelectorAll('.special_section'));

//     /* ===== 状態管理 =====
//        idx = -1（fv/通常ゾーン）, 0..N-1（special）
//     */
//     let idx = -1;
//     function setActive(newIdx) {
//   if (newIdx < -1 || newIdx > specials.length - 1) return;
//   if (idx === newIdx) return;
//   idx = newIdx;

//   // ▼配色フック用にクラスは付けるが、スクロールは殺さない方針
//   document.body.classList.toggle('is-special', idx !== -1);
//   document.body.classList.toggle('is-bg-mode', idx !== -1);

//   if (idx === -1) {
//     container.classList.remove('is-on');          // fvでは背景非表示（常時出したいなら消す）
//     specials.forEach(s => s.classList.remove('is-active'));
//   } else {
//     container.classList.add('is-on');
//     specials.forEach((s,i)=> s.classList.toggle('is-active', i === idx));
//     const url = specials[idx].getAttribute(DATA_ATTR);
//     fadeTo(url);                                   // ← フェードで切替
//   }

//   // ヘッダー配色イベント（既存スクリプトが使っている前提）
//   const detail = (idx === -1)
//     ? { mode: 'fv' }
//     : {
//         mode: 'special',
//         index: idx,
//         sectionId: specials[idx].id,
//         logo: specials[idx].dataset.logo,
//         newsBg: specials[idx].dataset.newsBg,
//         newsTx: specials[idx].dataset.newsText
//       };
//   document.dispatchEvent(new CustomEvent('special:activate', { detail }));
// }

//     // 初期は fv 扱い
//     setActive(-1);

//     /* ===== 現在セクション判定（通常スクロール監視） ===== */
//     function pickIndexByViewport() {
//       if (!specials.length) { setActive(-1); return; }

//       const anchorY = window.innerHeight * SWITCH_ANCHOR + HEADER_OFFSET;
//       const docTop  = document.scrollingElement?.scrollTop || window.scrollY || 0;

//       if (docTop <= RETURN_TO_FV_TOP) { setActive(-1); return; }

//       const firstRect = specials[0].getBoundingClientRect();
//       if (firstRect.top > anchorY) { setActive(-1); return; }

//       // anchorY を含むセクションを現在扱い
//       let currentIdx = -1;
//       for (let i = 0; i < specials.length; i++) {
//         const r = specials[i].getBoundingClientRect();
//         if (r.top <= anchorY && anchorY < r.bottom) { currentIdx = i; break; }
//         if (r.bottom <= anchorY) currentIdx = i;
//       }
//       if (currentIdx === -1) currentIdx = specials.length - 1;

//       setActive(currentIdx);
//     }

//     // rAF間引きで監視
//     (function attachNaturalScroll(){
//       let ticking = false;
//       const onScroll = () => {
//         if (!ticking) {
//           ticking = true;
//           requestAnimationFrame(() => {
//             pickIndexByViewport();
//             ticking = false;
//           });
//         }
//       };
//       window.addEventListener('scroll', onScroll, { passive: true });
//       window.addEventListener('resize', onScroll, { passive: true });
//       window.addEventListener('orientationchange', onScroll, { passive: true });
//       pickIndexByViewport();
//     })();

//     /* ===== キーボードナビ（任意） ===== */
//     const isEditable = (t)=>{
//       const tag = (t && t.tagName) ? t.tagName.toUpperCase() : '';
//       return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (t && t.isContentEditable);
//     };
//     const scrollToSection = (i)=>{
//       if (i < 0) { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); return; }
//       const sec = specials[i]; if (!sec) return;
//       const y = window.scrollY + sec.getBoundingClientRect().top;
//       window.scrollTo({ top: y, left: 0, behavior: 'smooth' });
//     };
//     window.addEventListener('keydown', (e)=>{
//       if (isEditable(e.target)) return;
//       if (e.key === 'ArrowDown' || e.key === 'PageDown'){ e.preventDefault(); scrollToSection(idx < 0 ? 0 : Math.min(idx + 1, specials.length - 1)); }
//       if (e.key === 'ArrowUp'   || e.key === 'PageUp')  { e.preventDefault(); scrollToSection(idx <= 0 ? -1 : idx - 1); }
//       if (e.key === 'Home')     { e.preventDefault(); scrollToSection(-1); }
//       if (e.key === 'End')      { e.preventDefault(); scrollToSection(specials.length - 1); }
//     });

//     /* ===== 「トップへ戻る」など（任意） ===== */
//     document.addEventListener('click', (e)=>{
//       const a = e.target.closest('.feature_wrap_card_topBtn, .page_top');
//       if (!a) return;
//       e.preventDefault();
//       scrollToSection(-1);
//     });
//   });
// })();


// // TOP 背景固定 + 通常スクロール + クロスフェード切替 + セクションスナップ
// (function () {
//   'use strict';
//   const onReady = (cb) =>
//     document.readyState === 'loading'
//       ? document.addEventListener('DOMContentLoaded', cb, { once: true })
//       : cb();
//   onReady(function () {
//     /* ===== 設定 ===== */
//     const DATA_ATTR        = 'data-bg';
//     const SWITCH_ANCHOR    = 0.50;
//     const RETURN_TO_FV_TOP = 2;
//     const HEADER_OFFSET    = 0;
//     const PRELOAD_TIMEOUT  = 800;
    
//     // ▼ スナップ制御用の設定
//     const SNAP_THRESHOLD   = 30;        // ホイール累積の閾値
//     const SNAP_COOLDOWN    = 1000;      // 次のスクロール受付までの待ち時間(ms)
    
//     /* ===== 背景レイヤ ===== */
//     let container = document.getElementById('bg-fixed');
//     if (!container) {
//       container = document.createElement('div');
//       container.id = 'bg-fixed';
//       document.body.prepend(container);
//     }
//     const slots = [0,1].map(i=>{
//       const d = document.createElement('div');
//       d.className = 'bg-slot slot-' + i;
//       container.appendChild(d);
//       return d;
//     });
//     let showing = 0;
//     let lastUrl = '';
    
//     const preload = (url)=> new Promise((resolve, reject)=>{
//       const img = new Image();
//       img.onload  = ()=> resolve(url);
//       img.onerror = ()=> reject(url);
//       img.decoding = 'async';
//       img.src = url;
//     });
    
//     const running = new WeakMap();
//     async function fadeTo(url){
//       if (!url || url === lastUrl) return;
//       const nextIdx = (showing ^ 1);
//       const nextEl  = slots[nextIdx];
//       const currEl  = slots[showing];
      
//       try {
//         const img = new Image();
//         img.decoding = 'async';
//         img.src = url;
//         if (img.decode) { await img.decode(); }
//         else { await new Promise((res, rej)=>{ img.onload=res; img.onerror=res; }); }
//       } catch(_) {}
      
//       nextEl.style.backgroundImage = `url("${url}")`;
//       running.get(nextEl)?.cancel?.();
//       running.get(currEl)?.cancel?.();
      
//       const enterAnim = nextEl.animate(
//         [
//           { opacity: 0, transform: `translate3d(0, var(--enter-distance), 0)` },
//           { opacity: 1, transform: 'translate3d(0, 0, 0)' }
//         ],
//         {
//           duration: parseFloat(getComputedStyle(document.documentElement)
//                      .getPropertyValue('--move-duration')) || 720,
//           easing: getComputedStyle(document.documentElement)
//                     .getPropertyValue('--move-ease').trim() || 'cubic-bezier(.22,.72,.1,1)',
//           fill: 'forwards',
//           composite: 'replace'
//         }
//       );
      
//       const exitAnim = currEl.animate(
//         [
//           { opacity: 1, transform: 'translate3d(0,0,0)' },
//           { opacity: 0, transform: 'translate3d(0,0,0)' }
//         ],
//         {
//           duration: parseFloat(getComputedStyle(document.documentElement)
//                      .getPropertyValue('--fade-duration')) || 420,
//           easing: getComputedStyle(document.documentElement)
//                     .getPropertyValue('--fade-ease').trim() || 'linear',
//           fill: 'forwards',
//           composite: 'replace'
//         }
//       );
      
//       running.set(nextEl, enterAnim);
//       running.set(currEl, exitAnim);
//       showing = nextIdx;
//       lastUrl = url;
      
//       Promise.allSettled([enterAnim.finished, exitAnim.finished]).then(()=>{
//         nextEl.style.opacity = '1';
//         nextEl.style.transform = 'translate3d(0,0,0)';
//         currEl.style.opacity = '0';
//       });
//     }
    
//     /* ===== ターゲット収集 ===== */
//     const specials = Array.from(document.querySelectorAll('.special_section'));
    
//     /* ===== 状態管理 ===== */
//     let idx = -1;
//     function setActive(newIdx) {
//       if (newIdx < -1 || newIdx > specials.length - 1) return;
//       if (idx === newIdx) return;
//       idx = newIdx;
      
//       document.body.classList.toggle('is-special', idx !== -1);
//       document.body.classList.toggle('is-bg-mode', idx !== -1);
      
//       if (idx === -1) {
//         container.classList.remove('is-on');
//         specials.forEach(s => s.classList.remove('is-active'));
//       } else {
//         container.classList.add('is-on');
//         specials.forEach((s,i)=> s.classList.toggle('is-active', i === idx));
//         const url = specials[idx].getAttribute(DATA_ATTR);
//         fadeTo(url);
//       }
      
//       const detail = (idx === -1)
//         ? { mode: 'fv' }
//         : {
//             mode: 'special',
//             index: idx,
//             sectionId: specials[idx].id,
//             logo: specials[idx].dataset.logo,
//             newsBg: specials[idx].dataset.newsBg,
//             newsTx: specials[idx].dataset.newsText
//           };
//       document.dispatchEvent(new CustomEvent('special:activate', { detail }));
//     }
    
//     setActive(-1);
    
//     /* ===== 現在セクション判定 ===== */
//     function pickIndexByViewport() {
//       if (!specials.length) { setActive(-1); return; }
//       const anchorY = window.innerHeight * SWITCH_ANCHOR + HEADER_OFFSET;
//       const docTop  = document.scrollingElement?.scrollTop || window.scrollY || 0;
      
//       if (docTop <= RETURN_TO_FV_TOP) { setActive(-1); return; }
      
//       const firstRect = specials[0].getBoundingClientRect();
//       if (firstRect.top > anchorY) { setActive(-1); return; }
      
//       let currentIdx = -1;
//       for (let i = 0; i < specials.length; i++) {
//         const r = specials[i].getBoundingClientRect();
//         if (r.top <= anchorY && anchorY < r.bottom) { currentIdx = i; break; }
//         if (r.bottom <= anchorY) currentIdx = i;
//       }
//       if (currentIdx === -1) currentIdx = specials.length - 1;
//       setActive(currentIdx);
//     }
    
//     /* ===== セクションへスクロール ===== */
//     const scrollToSection = (i)=>{
//       if (i < 0) { 
//         window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
//         return;
//       }
//       const sec = specials[i]; 
//       if (!sec) return;
//       const y = window.scrollY + sec.getBoundingClientRect().top;
//       window.scrollTo({ top: y, left: 0, behavior: 'smooth' });
//     };
    
//     /* ===== ホイールイベントでのスナップ ===== */
//     let wheelDelta = 0;
//     let wheelCooldown = false;
    
//     window.addEventListener('wheel', (e) => {
//       if (wheelCooldown) {
//         e.preventDefault();
//         return;
//       }
      
//       // special_section内でのみスナップ動作
//       if (idx === -1 && window.scrollY > RETURN_TO_FV_TOP) {
//         // FV外だがまだspecial未到達の場合は通常スクロール
//         return;
//       }
      
//       if (idx === -1) {
//         // FV内は通常スクロール
//         return;
//       }
      
//       // special_section内ではスナップ
//       e.preventDefault();
      
//       wheelDelta += e.deltaY;
      
//       if (Math.abs(wheelDelta) >= SNAP_THRESHOLD) {
//         const direction = wheelDelta > 0 ? 1 : -1;
//         wheelDelta = 0;
//         wheelCooldown = true;
        
//         const targetIdx = idx + direction;
        
//         if (targetIdx >= -1 && targetIdx < specials.length) {
//           scrollToSection(targetIdx);
//         }
        
//         setTimeout(() => {
//           wheelCooldown = false;
//         }, SNAP_COOLDOWN);
//       }
//     }, { passive: false });
    
//     // rAF間引きでスクロール監視（位置判定のみ）
//     (function attachNaturalScroll(){
//       let ticking = false;
//       const onScroll = () => {
//         if (!ticking) {
//           ticking = true;
//           requestAnimationFrame(() => {
//             pickIndexByViewport();
//             ticking = false;
//           });
//         }
//       };
//       window.addEventListener('scroll', onScroll, { passive: true });
//       window.addEventListener('resize', onScroll, { passive: true });
//       window.addEventListener('orientationchange', onScroll, { passive: true });
//       pickIndexByViewport();
//     })();
    
//     /* ===== キーボードナビ ===== */
//     const isEditable = (t)=>{
//       const tag = (t && t.tagName) ? t.tagName.toUpperCase() : '';
//       return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (t && t.isContentEditable);
//     };
    
//     window.addEventListener('keydown', (e)=>{
//       if (isEditable(e.target)) return;
//       if (e.key === 'ArrowDown' || e.key === 'PageDown'){ 
//         e.preventDefault(); 
//         scrollToSection(idx < 0 ? 0 : Math.min(idx + 1, specials.length - 1)); 
//       }
//       if (e.key === 'ArrowUp'   || e.key === 'PageUp')  { 
//         e.preventDefault(); 
//         scrollToSection(idx <= 0 ? -1 : idx - 1); 
//       }
//       if (e.key === 'Home')     { e.preventDefault(); scrollToSection(-1); }
//       if (e.key === 'End')      { e.preventDefault(); scrollToSection(specials.length - 1); }
//     });
    
//     /* ===== トップへ戻る ===== */
//     document.addEventListener('click', (e)=>{
//       const a = e.target.closest('.feature_wrap_card_topBtn, .page_top');
//       if (!a) return;
//       e.preventDefault();
//       scrollToSection(-1);
//     });
//   });
// })();



// // トップ「特集」高さ割り出し① type02対応
// (function(){
//   'use strict';

//   // 数値化ヘルパ
//   const num = v => (isNaN(parseFloat(v)) ? 0 : parseFloat(v));

//   // p に入れる高さを計算・適用
//   function applyFeatureTextHeight(root=document){
//     // セクション内に複数カードがあってもOK：wrap単位で処理
//     root.querySelectorAll('.special_section .feature_wrap').forEach(wrap => {
//       const totalH = wrap.clientHeight;                 // feature_wrap の実高さ

//       // 同じ feature_wrap 内から見つける（無ければ 0 扱い）
//       const ttl1 = wrap.querySelector('.feature_wrap_card_specialttl');
//       const ttl2 = wrap.querySelector('.feature_wrap_card_sitettl02');
//       const h1   = ttl1 ? ttl1.offsetHeight : 0;
//       const h2   = ttl2 ? ttl2.offsetHeight : 0;

//       // 対象の p（複数あるならそれぞれに適用）
//       wrap.querySelectorAll('.feature_wrap_card_txt p').forEach(p => {
//         // p の上下パディングぶんは高さから差し引いておくとジャストになる
//         const csP    = getComputedStyle(p);
//         const pPadY  = num(csP.paddingTop) + num(csP.paddingBottom);

//         // 必要なら card や txt ラッパの上下paddingも差し引く
//         const txt    = p.closest('.feature_wrap_card_txt');
//         const csTxt  = txt ? getComputedStyle(txt) : null;
//         const txtPad = csTxt ? (num(csTxt.paddingTop) + num(csTxt.paddingBottom)) : 0;

//         // ここでボタン等も引きたい場合は offsetHeight を足していく
//         // 例）const btn = wrap.querySelector('.feature_wrap_card_topBtn');
//         //     const hBtn = btn ? btn.offsetHeight : 0;

//         let available = totalH - h1 - h2 - pPadY - txtPad /* - hBtn */;
//         available = Math.max(0, Math.floor(available));

//         p.style.height    = available + 'px';
//         p.style.overflowY = 'auto';
//       });
//     });
//   }

//   // 監視（レイアウト変化に追従）
//   function setupObservers(){
//     if (!('ResizeObserver' in window)) return;
//     const ro = new ResizeObserver(() => applyFeatureTextHeight());
//     document.querySelectorAll('.special_section .feature_wrap').forEach(wrap => {
//       ro.observe(wrap);
//       const t1 = wrap.querySelector('.feature_wrap_card_specialttl');
//       const t2 = wrap.querySelector('.feature_wrap_card_sitettl02');
//       if (t1) ro.observe(t1);
//       if (t2) ro.observe(t2);
//     });
//   }

//   const ready = (cb)=> (document.readyState==='loading')
//     ? document.addEventListener('DOMContentLoaded', cb, {once:true})
//     : cb();

//   ready(() => {
//     applyFeatureTextHeight();
//     setupObservers();

//     // 画像やフォント読み込み後にも1回
//     window.addEventListener('load', applyFeatureTextHeight);

//     // リサイズはrAFで間引き
//     let rid=0;
//     window.addEventListener('resize', ()=> {
//       if (rid) cancelAnimationFrame(rid);
//       rid = requestAnimationFrame(applyFeatureTextHeight);
//     });
//   });
// })();

// // トップ「特集」高さ割り出し② type05対応
// (function(){
//   'use strict';

//   const num = v => (isNaN(parseFloat(v)) ? 0 : parseFloat(v));
//   // 必要ならマージン込みの高さにしたい時に使うヘルパ
//   const hWithMargin = (el) => {
//     if (!el) return 0;
//     const cs = getComputedStyle(el);
//     return el.offsetHeight /* + num(cs.marginTop) + num(cs.marginBottom) */;
//   };

//   function applyFeatureTextHeight(root=document){
//     root.querySelectorAll('.special_section .feature_wrap').forEach(wrap => {
//       const totalH = wrap.clientHeight;

//       // type05 構成（見出しh2 + 画像img）の高さ
//       const ttl = wrap.querySelector('.feature_wrap_card_contents_wrap h2');
//       const img = wrap.querySelector('.feature_wrap_card_contents_wrap img');

//       // 他に邪魔する固定要素があればここで足す（例：特集タイトルやサイトタイトル）
//       // const specialTtl = wrap.querySelector('.feature_wrap_card_specialttl');
//       // const siteTtl    = wrap.querySelector('.feature_wrap_card_sitettl, .feature_wrap_card_sitettl01, .feature_wrap_card_sitettl02');

//       const blockH =
//         hWithMargin(ttl) +
//         hWithMargin(img);
//         // + hWithMargin(specialTtl)
//         // + hWithMargin(siteTtl)

//       // type05 の本文
//       const ps = wrap.querySelectorAll('.feature_wrap_card_contents_wrap_txt p');

//       ps.forEach(p => {
//         const csP    = getComputedStyle(p);
//         const pPadY  = num(csP.paddingTop) + num(csP.paddingBottom);

//         const txt    = p.closest('.feature_wrap_card_contents_wrap_txt');
//         const csTxt  = txt ? getComputedStyle(txt) : null;
//         const txtPad = csTxt ? (num(csTxt.paddingTop) + num(csTxt.paddingBottom)) : 0;

//         let available = totalH - blockH - pPadY - txtPad;
//         available = Math.max(0, Math.floor(available));

//         p.style.height    = available + 'px';
//         p.style.overflowY = 'auto';
//       });
//     });
//   }

//   function setupObservers(){
//     if (!('ResizeObserver' in window)) return;
//     const ro = new ResizeObserver(() => applyFeatureTextHeight());

//     document.querySelectorAll('.special_section .feature_wrap').forEach(wrap => {
//       ro.observe(wrap); // ラッパのサイズ変化

//       // 実際に高さへ影響する要素を監視
//       wrap.querySelectorAll(
//         '.feature_wrap_card_contents_wrap h2,' +
//         '.feature_wrap_card_contents_wrap img'
//         // 追加で監視したければ以下をアンコメント
//         // + ', .feature_wrap_card_specialttl' +
//         // ', .feature_wrap_card_sitettl, .feature_wrap_card_sitettl01, .feature_wrap_card_sitettl02'
//       ).forEach(el => el && ro.observe(el));

//       // 画像ロード後のサイズ変化拾い
//       wrap.querySelectorAll('.feature_wrap_card_contents_wrap img').forEach(img => {
//         img.addEventListener('load', applyFeatureTextHeight);
//       });
//     });
//   }

//   const ready = (cb)=> (document.readyState === 'loading')
//     ? document.addEventListener('DOMContentLoaded', cb, {once:true})
//     : cb();

//   ready(() => {
//     applyFeatureTextHeight();
//     setupObservers();

//     window.addEventListener('load', applyFeatureTextHeight);

//     let rid=0;
//     window.addEventListener('resize', ()=> {
//       if (rid) cancelAnimationFrame(rid);
//       rid = requestAnimationFrame(applyFeatureTextHeight);
//     });
//   });
// })();

// // // トップ「特集」高さ割り出し③ type07対応
// (function(){
//   'use strict';
//   const num = v => (isNaN(parseFloat(v)) ? 0 : parseFloat(v));

//   function applyType07(){
//     document.querySelectorAll('.feature_wrap_card_contents_wrap.type07_contents').forEach(cont=>{
//       const wrap = cont.closest('.feature_wrap'); // 100vh想定の親
//       const imgWrap = cont.querySelector('.feature_wrap_card_contents_wrap_img');
//       const txt = cont.querySelector('.feature_wrap_card_contents_wrap_txt');
//       if (!wrap || !imgWrap || !txt) return;

//       const totalH = wrap.clientHeight;
//       const imgH   = imgWrap.offsetHeight;

//       const csCont = getComputedStyle(cont);
//       const contPadY = num(csCont.paddingTop) + num(csCont.paddingBottom);
//       const contMarginY = num(csCont.marginTop) + num(csCont.marginBottom);

//       const csTxt  = getComputedStyle(txt);
//       const txtPadY = num(csTxt.paddingTop) + num(csTxt.paddingBottom);

//       let h = totalH - imgH - contPadY - contMarginY - txtPadY;
//       h = Math.max(0, Math.floor(h));

//       txt.style.minHeight = '0';
//       txt.style.overflowY = 'auto';
//       txt.style.height = h + 'px';
//     });
//   }

//   function setup(){
//     applyType07();
//     if ('ResizeObserver' in window){
//       const ro = new ResizeObserver(applyType07);
//       document.querySelectorAll(
//         '.feature_wrap, .feature_wrap_card_contents_wrap.type07_contents, .feature_wrap_card_contents_wrap_img, .feature_wrap_card_contents_wrap_img img'
//       ).forEach(el=> ro.observe(el));
//     }
//     window.addEventListener('load', applyType07);
//     let rid=0;
//     window.addEventListener('resize', ()=> {
//       cancelAnimationFrame(rid);
//       rid = requestAnimationFrame(applyType07);
//     });
//   }

//   document.readyState === 'loading'
//     ? document.addEventListener('DOMContentLoaded', setup, {once:true})
//     : setup();
// })();

// トップ「特集」のセクションごとにヘッダーのカラーを変える
// (() => {
//   const $  = (s, ctx=document) => ctx.querySelector(s);
//   const $$ = (s, ctx=document) => Array.from(ctx.querySelectorAll(s));

//   const newsBody    = $('.header_news_link_body');
//   const newsMidashi = $('.header_news_link_midashi');
//   const newsTexts   = $$('.header_news_link_body_ttl, .header_news_link_body_date, .header_news_link_body_time');
//   const logoParts   = $$('#headerLogo svg *').filter(el => {
//     const fill = getComputedStyle(el).fill;
//     return fill && fill !== 'none' && fill !== 'rgba(0, 0, 0, 0)';
//   });

//   if (!newsBody || !newsMidashi) return;

//   // PHP初期値（inline style が反映済み）を基準色として取得
//   const defaults = {
//     logo  : logoParts[0] ? getComputedStyle(logoParts[0]).fill : '#000',
//     newsBg: getComputedStyle(newsBody).backgroundColor,
//     newsTx: (newsTexts[0] ? getComputedStyle(newsTexts[0]).color
//                            : getComputedStyle(newsMidashi).color)
//   };

//   const setImp = (el, prop, val) => el.style.setProperty(prop, val, 'important');

//   const apply = (logo, bg, tx) => {
//     // ロゴ（fill / stroke 両対応）
//     logoParts.forEach(el => {
//       setImp(el, 'fill', logo);
//       const st = getComputedStyle(el).stroke;
//       if (st && st !== 'none') setImp(el, 'stroke', logo);
//     });

//     // EVENT/NEWS 見出し & 本文の背景・文字色
//     setImp(newsBody,    'background-color', bg);
//     setImp(newsMidashi, 'background-color', bg);
//     setImp(newsMidashi, 'color', tx);
//     newsTexts.forEach(el => setImp(el, 'color', tx));
//   };

//   // ふわっと切替
//   [newsBody, newsMidashi, ...newsTexts].forEach(el => {
//     el.style.transition = 'background-color .25s ease, color .25s ease';
//   });

//   // 背景フェードの段階遷移イベントで色を更新
//   document.addEventListener('special:activate', (e) => {
//     const d = e.detail || {};
//     if (d.mode === 'special') {
//       apply(d.logo  || defaults.logo,
//             d.newsBg|| defaults.newsBg,
//             d.newsTx|| defaults.newsTx);
//     } else {
//       // fv（動画ゾーン）に戻ったら初期色へ
//       apply(defaults.logo, defaults.newsBg, defaults.newsTx);
//     }
//   });

//   // 念のため初期適用（イベントが来る前でも破綻しないように）
//   apply(defaults.logo, defaults.newsBg, defaults.newsTx);
// })();

// (function(){
//   'use strict';

//   // DOM 構築を待ってから実行
//   const onReady = (cb) =>
//     document.readyState === 'loading'
//       ? document.addEventListener('DOMContentLoaded', cb, { once: true })
//       : cb();

//   onReady(function(){
//     const root = document.querySelector('.header_wrap_bl02');
//     if (!root) return;

//     // bl02 内のテキスト（見出し/各リンク/SNSリンクの <a>）
//     const textEls = Array.from(root.querySelectorAll(
//       '.header_menuList_wrap_headttl p,' +
//       '.header_menuList_wrap_01 a, .header_menuList_wrap_02 a, .header_menuList_wrap_03 a,' +
//       '.header_menuList_wrap_sns a'
//     ));

//     // bl02 内の SVG の可視パーツ（fill or stroke が有効なもの）
//     const svgParts = Array.from(root.querySelectorAll('svg *')).filter(el => {
//       const cs = getComputedStyle(el);
//       const visFill   = cs.fill   && cs.fill   !== 'none' && cs.fill   !== 'rgba(0, 0, 0, 0)';
//       const visStroke = cs.stroke && cs.stroke !== 'none' && cs.stroke !== 'rgba(0, 0, 0, 0)';
//       return visFill || visStroke;
//     });

//     // 初期色（PHP の inline style が適用された後の見た目を拾う）
//     const defaultsColor = (() => {
//       const t = textEls.find(el => !!getComputedStyle(el).color);
//       if (t) return getComputedStyle(t).color;
//       const f = svgParts.find(n => {
//         const v = getComputedStyle(n).fill;
//         return v && v !== 'none' && v !== 'rgba(0, 0, 0, 0)';
//       });
//       if (f) return getComputedStyle(f).fill;
//       const s = svgParts.find(n => {
//         const v = getComputedStyle(n).stroke;
//         return v && v !== 'none' && v !== 'rgba(0, 0, 0, 0)';
//       });
//       if (s) return getComputedStyle(s).stroke;
//       return '#000';
//     })();

//     // ふわっと
//     textEls.forEach(el => el.style.transition = 'color .25s ease');
//     svgParts.forEach(el => el.style.transition = 'fill .25s ease, stroke .25s ease');

//     const setImp = (el, prop, val) => el.style.setProperty(prop, val, 'important');

//     function applyColor(color){
//       const c = color || defaultsColor;

//       // テキスト（リンク含む）
//       textEls.forEach(el => setImp(el, 'color', c));

//       // SVG（fill / stroke 両対応 & 属性も更新）
//       svgParts.forEach(el => {
//         const cs = getComputedStyle(el);
//         if (cs.fill && cs.fill !== 'none' && cs.fill !== 'rgba(0, 0, 0, 0)'){
//           setImp(el, 'fill', c);
//           if (el.hasAttribute('fill')) el.setAttribute('fill', c);
//         }
//         if (cs.stroke && cs.stroke !== 'none' && cs.stroke !== 'rgba(0, 0, 0, 0)'){
//           setImp(el, 'stroke', c);
//           if (el.hasAttribute('stroke')) el.setAttribute('stroke', c);
//         }
//       });
//     }

//     // イベントを受けて反映（setActive は現状のままでOK）
//     document.addEventListener('special:activate', (e) => {
//       const d = e.detail || {};
//       // data-logo が未設定/空文字なら defaults にフォールバック
//       const color = (d.mode === 'special' && typeof d.logo === 'string' && d.logo.trim() !== '')
//         ? d.logo
//         : defaultsColor;
//       applyColor(color);
//     });

//     // 初期適用
//     applyColor(defaultsColor);


//     /* === ▼▼ サブメニュー配色：CSS変数方式（確実版） ▼▼ === */
// (function(){
//   const ACCENT_FALLBACK = '#1D9ECC';

//   // 1) まず過去の inline スタイルを除去して、CSS だけで制御できる状態に戻す
//   (function resetInline(){
//     const as = document.querySelectorAll('.header_wrap_bl02 .sub_menu li a');
//     as.forEach(a => {
//       a.style.removeProperty('background-color');
//       a.style.removeProperty('color');
//       a.style.removeProperty('padding');
//       a.style.removeProperty('border-radius');
//     });
//   })();

//   // 2) 親<li>のメインリンク色を各<li>にキャッシュ（--linkColor）
//   function getMainA(li){
//     // 直下の <a> or <span>配下<a>（sub_menu 内は除外）
//     for (const ch of li.children){
//       if (ch.tagName === 'A') return ch;
//       if (ch.tagName === 'SPAN'){
//         const a = ch.querySelector('a');
//         if (a && !a.closest('.sub_menu')) return a;
//       }
//     }
//     const cand = li.querySelector('a');
//     if (!cand || cand.closest('.sub_menu')) return null;
//     return cand;
//   }
//   function cacheLinkColors(){
//     root.querySelectorAll('.header_menuList_link').forEach(li => {
//       const a = getMainA(li);
//       const c = a ? getComputedStyle(a).color : '';
//       if (c) li.style.setProperty('--linkColor', c);
//     });
//   }

//   // 3) 現在のセクションの data-menu-color を取って --submenuActiveBg に入れる
//   const sections = Array.from(document.querySelectorAll('.special_section[data-menu-color]'));

//   function headerHeight(){
//     const h = document.getElementById('header');
//     return h ? h.offsetHeight : 80;
//   }

//   // スクロール位置（ドキュメント座標）で「ヘッダー直下の基準線」がどのセクションにいるかで判定
//   function currentAccent(){
//     if (!sections.length) return ACCENT_FALLBACK;

//     const y = window.scrollY + headerHeight() + 1; // ヘッダー直下の1px下
//     let chosen = null;

//     for (const sec of sections){
//       const top = sec.offsetTop;
//       const bottom = top + sec.offsetHeight;
//       if (y >= top && y < bottom){ chosen = sec; break; }
//       if (y >= bottom) chosen = sec; // 通過した最後のセクション
//     }

//     const c = chosen?.dataset?.menuColor?.trim();
//     return c || ACCENT_FALLBACK;
//   }

//   function setAccent(c){
//     // 変数はスコープの取り違いを避けるため、念のため 2か所に置く
//     root.style.setProperty('--submenuActiveBg', c || ACCENT_FALLBACK);
//     document.documentElement.style.setProperty('--submenuActiveBg', c || ACCENT_FALLBACK);
//   }

//   // 初期反映
//   cacheLinkColors();
//   setAccent(currentAccent());

//   // rAF で間引きつつ更新
//   let ticking = false;
//   function onScrollResize(){
//     if (ticking) return;
//     ticking = true;
//     requestAnimationFrame(() => {
//       setAccent(currentAccent());
//       ticking = false;
//     });
//   }
//   window.addEventListener('scroll', onScrollResize, { passive: true });
//   window.addEventListener('resize', onScrollResize);

//   // ロゴ色変更イベント等のあとに親リンク色・アクセントを取り直す
//   document.addEventListener('special:activate', () => {
//     cacheLinkColors();
//     setAccent(currentAccent());
//   });

//   // 念のため、ロード完了後にもう一度（画像読み込みで高さが変わる場合対策）
//   window.addEventListener('load', () => setAccent(currentAccent()));
// })();
// /* === ▲▲ ここまで ▲▲ */

//   });
// })();



// トップ動画背景（YouTube埋め込み）
(function(){
  'use strict';
  const el = document.getElementById('yt-bg-player');
  if (!el) return;
  const VIDEO_ID = el.getAttribute('data-video');
  let player, lastKick = 0;

  window.onYouTubeIframeAPIReady = function(){
    player = new YT.Player('yt-bg-player', {
      videoId: VIDEO_ID,
      playerVars: {
        // ------- UI/表示系の最適化 -------
        controls: 0,            // コントロール非表示
        modestbranding: 1,      // ロゴ最小化
        rel: 0,                 // 関連は同チャンネルのみ
        iv_load_policy: 3,      // 注釈非表示
        fs: 0,                  // 全画面ボタン無効
        disablekb: 1,           // キーボード操作無効
        cc_load_policy: 0,      // 字幕自動表示しない
        // ------- 再生系 -------
        autoplay: 1,
        mute: 1,
        playsinline: 1,
        loop: 1,
        playlist: VIDEO_ID,     // ループに必須
        enablejsapi: 1,
        origin: location.origin
      },
      events: {
        onReady: (e) => {
          try { e.target.mute(); } catch(_){}
          kickPlay();
          // 初期チラつき防止：準備できたらフェードイン
          requestAnimationFrame(()=> {
            document.getElementById('bg-video')?.classList.add('is-ready');
          });

           // ▼ ここが追加：グローバル参照＋準備完了イベント
          window.YT_BG = e.target;
          document.dispatchEvent(new CustomEvent('ytbg:ready'));
        },
        onStateChange: (e) => {
          if (e.data === YT.PlayerState.ENDED) {
            try { e.target.seekTo(0, true); } catch(_){}
            kickPlay();
          }
          if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.CUED) {
            kickPlay();
          }
        }
      },
      host: 'https://www.youtube-nocookie.com' // ← これが重要
    });
  };

  function kickPlay(){
    if (!player || typeof player.playVideo !== 'function') return;
    const now = Date.now();
    if (now - lastKick < 300) return; // 連打しない
    lastKick = now;
    try { player.playVideo(); } catch(_){}
  }

  const rekick = () => kickPlay();
  document.addEventListener('visibilitychange', rekick, {passive:true});
  window.addEventListener('focus', rekick, {passive:true});
  window.addEventListener('scroll', rekick, {passive:true});
  window.addEventListener('touchmove', rekick, {passive:true});

  try{
    const io = new IntersectionObserver((ents)=>{
      if (ents[0]?.isIntersecting) kickPlay();
    }, {threshold: 0.01});
    io.observe(document.getElementById('bg-video'));
  }catch(_){}
})();

// ボタン制御 JS（ミュート切替）
// (function(){
//   'use strict';
//   const btn = document.getElementById('yt-audio-toggle');
//   if (!btn) return;

//   // プレイヤー準備を待ってから初期状態を反映
//   function initWithPlayer(){
//     if (!window.YT_BG || typeof window.YT_BG.isMuted !== 'function') return;
//     const muted = window.YT_BG.isMuted();
//     setBtnState(muted ? 'off' : 'on');
//   }

//   function setBtnState(state){ // 'on' = 音あり, 'off' = ミュート
//     const on = (state === 'on');
//     btn.classList.toggle('on', on);
//     btn.classList.toggle('off', !on);
//     btn.setAttribute('aria-pressed', on ? 'true' : 'false');
//     btn.setAttribute('aria-label', on ? 'サウンドをオフ' : 'サウンドをオン');
//   }

//   function toggleAudio(){
//     if (!window.YT_BG) return;
//     try {
//       if (window.YT_BG.isMuted()){
//         window.YT_BG.unMute();
//         window.YT_BG.setVolume(100); // 必要なら調整
//         window.YT_BG.playVideo();    // gesture後の再生を安定化
//         setBtnState('on');
//       } else {
//         window.YT_BG.mute();
//         setBtnState('off');
//       }
//     } catch(e){}
//   }

//   // クリックでトグル
//   btn.addEventListener('click', (e)=>{
//     e.preventDefault();
//     e.stopPropagation();
//     toggleAudio();
//   });

//   // プレイヤー準備イベントで初期化
//   document.addEventListener('ytbg:ready', initWithPlayer, {once:true});
//   // 既に準備済みだった場合
//   if (window.YT_BG) initWithPlayer();
// })();
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".js-video-button");

  function setState(btn, on){
    btn.classList.toggle("on",  on);
    btn.classList.toggle("off", !on);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    btn.setAttribute("aria-label",   on ? "サウンドをオフ" : "サウンドをオン");
    const st = btn.querySelector(".status-text");
    if (st) st.textContent = on ? "ON" : "OFF";
  }

  // --- 初期同期（YouTube > <video> > 見た目のみ）
  function syncInitial(){
    const hasYT = !!(window.YT_BG && typeof window.YT_BG.isMuted === "function");
    if (hasYT){
      const on = !window.YT_BG.isMuted();
      buttons.forEach(b => setState(b, on));
      return;
    }
    const video = document.querySelector(".js-video");
    if (video){
      buttons.forEach(b => setState(b, !video.muted));
    } else {
      // デフォはOFF（必要なら true に）
      buttons.forEach(b => setState(b, false));
    }
  }
  syncInitial();

  // YouTube 側があとから ready になる場合
  document.addEventListener("ytbg:ready", () => {
    if (window.YT_BG && typeof window.YT_BG.isMuted === "function"){
      const on = !window.YT_BG.isMuted();
      buttons.forEach(b => setState(b, on));
    }
  }, { once:true });

  // --- クリックで切替
  buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      // 1) YouTube IFrame API を使っている場合
      if (window.YT_BG && typeof window.YT_BG.isMuted === "function"){
        try{
          if (window.YT_BG.isMuted()){
            window.YT_BG.unMute();
            window.YT_BG.setVolume?.(100);
            window.YT_BG.playVideo?.();
            setState(btn, true);
          } else {
            window.YT_BG.mute();
            setState(btn, false);
          }
        } catch(_){}
        return;
      }

      // 2) <video class="js-video"> がある場合
      const video = document.querySelector(".js-video");
      if (video){
        video.muted = !video.muted;
        if (!video.muted) video.play?.();
        setState(btn, !video.muted);
        return;
      }

      // 3) 連動先が無い場合は見た目だけトグル
      setState(btn, !btn.classList.contains("on"));
    });
  });

  // --- スクロールでボタンを隠す（あなたの元コード踏襲）
  const hiddenBtn = document.querySelectorAll(".movie__btn");
  const toggleStoppedClass = () => {
    hiddenBtn.forEach(el => {
      if (window.scrollY > 50) el.classList.add("hidden");
      else el.classList.remove("hidden");
    });
  };
  toggleStoppedClass();
  window.addEventListener("scroll", toggleStoppedClass);
});





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






// Feature背景スクロール連動（画像の実サイズベース）
(function() {
  'use strict';
  
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
      
      // 画像が読み込まれているか確認
      if (cardHeadImg.complete && cardHeadImg.naturalHeight > 0) {
        const imgNaturalWidth = cardHeadImg.naturalWidth;
        const imgNaturalHeight = cardHeadImg.naturalHeight;
        const imgAspectRatio = imgNaturalWidth / imgNaturalHeight;
        
        // カードの幅を取得
        const cardWidth = featureCard.offsetWidth;
        
        // 画像の高さを計算
        const imgDisplayHeight = cardWidth / imgAspectRatio;
        
        // カードの高さを設定（画像の高さ + body/footerの余白）
        // 最大80vhに制限
        const maxHeight = window.innerHeight * 0.8;
        const calculatedHeight = Math.min(imgDisplayHeight + 200, maxHeight); // 200pxは body + footer の概算
        
        featureCard.style.height = `${calculatedHeight}px`;
        
        console.log('Card height set:', {
          imgNaturalWidth,
          imgNaturalHeight,
          imgAspectRatio: imgAspectRatio.toFixed(2),
          cardWidth,
          imgDisplayHeight: imgDisplayHeight.toFixed(2),
          calculatedHeight: calculatedHeight.toFixed(2)
        });
      } else {
        // 画像が読み込まれていない場合は読み込みを待つ
        cardHeadImg.onload = function() {
          setCardHeight();
        };
      }
    }
    
    // 初期設定とリサイズ時の再計算
    function initCardHeight() {
      setCardHeight();
      
      let resizeTimer;
      window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setCardHeight, 100);
      }, { passive: true });
    }
    
    // 初期化時に実行
    initCardHeight();
    
    // feature-shellの表示状態を監視してヘッダー表示を制御
    if (featureShell) {
      // 初期状態をログ
      console.log('Initial body classes:', document.body.className);
      console.log('Header element:', document.querySelector('#header') || document.querySelector('.header'));
      
      let isInFeatureShell = false;
      let unlockTimeout = null; // 固定解除のタイマー
      
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1.0] // より細かく監視
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          console.log('IntersectionObserver triggered:', {
            intersectionRatio: entry.intersectionRatio,
            isIntersecting: entry.isIntersecting,
            target: entry.target.className
          });
          
          // feature-shellが50%以上画面に入ったら固定開始
          if (entry.intersectionRatio >= 0.5) {
            // タイマーキャンセル
            if (unlockTimeout) {
              clearTimeout(unlockTimeout);
              unlockTimeout = null;
            }
            
            isInFeatureShell = true;
            document.body.classList.add('is-special');
            document.body.classList.add('in-feature-shell');
            console.log('✓ Entered feature-shell - page locked');
            console.log('Body classes:', document.body.className);
            
            // トランジションを追加
            featureShell.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // feature-shellを画面に固定
            requestAnimationFrame(() => {
              featureShell.style.position = 'fixed';
              featureShell.style.top = '0';
              featureShell.style.left = '0';
              featureShell.style.width = '100%';
              featureShell.style.zIndex = '100';
            });
            
          } else if (entry.intersectionRatio < 0.5) {
            // 50%未満になったら固定解除の準備（すぐには解除しない）
            if (!unlockTimeout && isInFeatureShell) {
              unlockTimeout = setTimeout(() => {
                isInFeatureShell = false;
                document.body.classList.remove('is-special');
                document.body.classList.remove('in-feature-shell');
                console.log('✓ Exited feature-shell - page unlocked');
                console.log('Body classes:', document.body.className);
                
                // トランジション付きで固定解除
                featureShell.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                featureShell.style.position = 'relative';
                featureShell.style.top = '';
                featureShell.style.left = '';
                featureShell.style.width = '';
                featureShell.style.zIndex = '';
                
                unlockTimeout = null;
              }, 300); // 300ms待ってから解除
            }
          }
          
          // header要素の状態も確認
          const header = document.querySelector('#header') || document.querySelector('.header');
          if (header) {
            const styles = window.getComputedStyle(header);
            console.log('Header computed styles:', {
              opacity: styles.opacity,
              visibility: styles.visibility,
              display: styles.display
            });
          }
        });
      }, observerOptions);
      
      observer.observe(featureShell);
      console.log('IntersectionObserver attached to feature-shell');
      
      // ページ全体のスクロールを監視
      let lastScrollY = window.scrollY;
      let ticking = false;
      
      window.addEventListener('scroll', function() {
        lastScrollY = window.scrollY;
        
        if (!ticking && isInFeatureShell) {
          window.requestAnimationFrame(function() {
            // feature-shell内にいる間はページスクロールを防止
            const rect = featureShell.getBoundingClientRect();
            if (rect.top !== 0 && isInFeatureShell) {
              // 位置がずれたら修正
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
          console.log('Image already loaded:', { 
            naturalWidth: bgNaturalWidth, 
            naturalHeight: bgNaturalHeight 
          });
          resolve();
        } else {
          bgImg.onload = function() {
            bgNaturalWidth = bgImg.naturalWidth;
            bgNaturalHeight = bgImg.naturalHeight;
            isImageLoaded = true;
            console.log('Image loaded:', { 
              naturalWidth: bgNaturalWidth, 
              naturalHeight: bgNaturalHeight 
            });
            resolve();
          };
          bgImg.onerror = function() {
            console.error('Failed to load background image');
            resolve();
          };
        }
      });
    }
    
    // 背景画像の表示サイズを計算
    function calculateBgDisplaySize() {
      if (!isImageLoaded) return null;
      
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const imageAspect = bgNaturalWidth / bgNaturalHeight;
      const viewportAspect = viewportWidth / viewportHeight;
      
      let displayWidth, displayHeight;
      
      // object-fit: cover の計算
      if (imageAspect > viewportAspect) {
        // 画像が横長 → 高さ基準
        displayHeight = viewportHeight;
        displayWidth = displayHeight * imageAspect;
      } else {
        // 画像が縦長 → 幅基準
        displayWidth = viewportWidth;
        displayHeight = displayWidth / imageAspect;
      }
      
      console.log('Background display size:', {
        displayWidth: displayWidth.toFixed(2),
        displayHeight: displayHeight.toFixed(2),
        viewportWidth,
        viewportHeight,
        canMove: (displayHeight - viewportHeight).toFixed(2)
      });
      
      return { displayWidth, displayHeight };
    }
    
    // 背景のサイズを設定
    function setBgSize() {
      const size = calculateBgDisplaySize();
      if (!size) return;
      
      // bgInnerの高さを画像の表示高さに設定
      bgInner.style.height = `${size.displayHeight}px`;
    }
    
    // スクロールイベント
    function handleScroll() {
      const scrollTop = scrollTarget.scrollTop;
      const scrollHeight = scrollTarget.scrollHeight;
      const clientHeight = scrollTarget.clientHeight;
      const maxScroll = scrollHeight - clientHeight;
      
      if (maxScroll <= 0) {
        return;
      }
      
      // スクロール進捗率 (0〜1)
      const scrollProgress = scrollTop / maxScroll;
      
      // 背景を移動させる距離を計算
      const size = calculateBgDisplaySize();
      if (!size) return;
      
      const viewportHeight = window.innerHeight;
      const maxBgMove = size.displayHeight - viewportHeight;
      
      // 背景のY位置を計算
      const bgY = -(scrollProgress * maxBgMove);
      
      // transformで背景を移動
      bgInner.style.transform = `translate(-50%, ${bgY}px)`;
    }
    
    // feature-shell全体でマウスホイールを検知
    if (featureShell) {
      let unlockAnimating = false; // アニメーション中フラグ
      
      featureShell.addEventListener('wheel', function(e) {
        // アニメーション中はイベントを無視
        if (unlockAnimating) return;
        
        // スクロール可能かチェック
        const scrollHeight = scrollTarget.scrollHeight;
        const clientHeight = scrollTarget.clientHeight;
        const maxScroll = scrollHeight - clientHeight;
        
        if (maxScroll <= 0) {
          // スクロールできない場合はページスクロールを許可
          return;
        }
        
        // 現在のスクロール位置
        const currentScroll = scrollTarget.scrollTop;
        const delta = e.deltaY;
        
        // スクロールの端に達しているかチェック
        const atTop = currentScroll <= 0;
        const atBottom = currentScroll >= maxScroll - 1; // 1px の誤差を許容
        
        // 上端で上スクロール → 固定解除してFVエリアへ戻る
        if (atTop && delta < 0) {
          console.log('At top, scrolling up - releasing fixed position with transition');
          unlockAnimating = true;
          
          // トランジション付きで固定解除
          featureShell.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
          featureShell.style.position = 'relative';
          featureShell.style.top = '';
          featureShell.style.left = '';
          featureShell.style.width = '';
          featureShell.style.zIndex = '';
          document.body.classList.remove('in-feature-shell');
          document.body.classList.remove('is-special');
          
          // アニメーション完了後にフラグをリセット
          setTimeout(() => {
            unlockAnimating = false;
            featureShell.style.transition = '';
          }, 600);
          
          // ページスクロールを許可（preventDefaultしない）
          return;
        }
        
        // 下端で下スクロール → ページスクロールを許可（固定は維持）
        if (atBottom && delta > 0) {
          console.log('At bottom, scrolling down - allowing page scroll');
          // ページスクロールを許可（preventDefaultしない）
          return;
        }
        
        // それ以外はカード内スクロールのみ（ページスクロールをブロック）
        e.preventDefault();
        e.stopPropagation();
        
        // 新しいスクロール位置を計算
        let newScroll = currentScroll + delta;
        
        // 範囲制限
        newScroll = Math.max(0, Math.min(newScroll, maxScroll));
        
        // スクロール位置を設定
        scrollTarget.scrollTop = newScroll;
        
      }, { passive: false }); // passive: false でpreventDefaultを有効に
      
      // タッチイベントも同様に処理（モバイル対応）
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
        
        // 上端で上方向のタッチ → 固定解除
        if (atTop && deltaY < 0) {
          console.log('Touch: at top, releasing fixed position');
          featureShell.style.position = 'relative';
          featureShell.style.top = '';
          featureShell.style.left = '';
          featureShell.style.width = '';
          featureShell.style.zIndex = '';
          document.body.classList.remove('in-feature-shell');
          document.body.classList.remove('is-special');
          // ページスクロールを許可
          return;
        }
        
        // 下端で下方向のタッチ → ページスクロール許可（固定は維持）
        if (atBottom && deltaY > 0) {
          console.log('Touch: at bottom, allowing page scroll');
          // ページスクロールを許可
          return;
        }
        
        // カード内スクロール中はページスクロールをブロック
        e.preventDefault();
        
        touchStartY = touchY;
      }, { passive: false });
      
      console.log('Wheel event listener attached to feature-shell');
    }
    
    // 初期化
    async function init() {
      await loadImageDimensions();
      setBgSize();
      
      // スクロールイベントを登録
      scrollTarget.addEventListener('scroll', handleScroll, { passive: true });
      
      // リサイズ時に再計算
      let resizeTimer;
      window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          setBgSize();
          handleScroll(); // 現在のスクロール位置で再計算
        }, 100);
      }, { passive: true });
      
      console.log('Feature scroll initialized');
      
      // 初期状態のチェック
      setTimeout(() => {
        console.log('Content dimensions:', {
          scrollHeight: scrollTarget.scrollHeight,
          clientHeight: scrollTarget.clientHeight,
          canScroll: scrollTarget.scrollHeight > scrollTarget.clientHeight
        });
      }, 100);
    }
    
    init();
  }
  
  // DOM読み込み後に実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFeatureScroll);
  } else {
    initFeatureScroll();
  }
})();

