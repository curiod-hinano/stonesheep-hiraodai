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



// // トップ動画背景（YouTube埋め込み）
// (function(){
//   'use strict';
//   const el = document.getElementById('yt-bg-player');
//   if (!el) return;
//   const VIDEO_ID = el.getAttribute('data-video');
//   let player, lastKick = 0;

//   window.onYouTubeIframeAPIReady = function(){
//     player = new YT.Player('yt-bg-player', {
//       videoId: VIDEO_ID,
//       playerVars: {
//         // ------- UI/表示系の最適化 -------
//         controls: 0,            // コントロール非表示
//         modestbranding: 1,      // ロゴ最小化
//         rel: 0,                 // 関連は同チャンネルのみ
//         iv_load_policy: 3,      // 注釈非表示
//         fs: 0,                  // 全画面ボタン無効
//         disablekb: 1,           // キーボード操作無効
//         cc_load_policy: 0,      // 字幕自動表示しない
//         // ------- 再生系 -------
//         autoplay: 1,
//         mute: 1,
//         playsinline: 1,
//         loop: 1,
//         playlist: VIDEO_ID,     // ループに必須
//         enablejsapi: 1,
//         origin: location.origin
//       },
//       events: {
//         onReady: (e) => {
//           try { e.target.mute(); } catch(_){}
//           kickPlay();
//           // 初期チラつき防止：準備できたらフェードイン
//           requestAnimationFrame(()=> {
//             document.getElementById('bg-video')?.classList.add('is-ready');
//           });

//            // ▼ ここが追加：グローバル参照＋準備完了イベント
//           window.YT_BG = e.target;
//           document.dispatchEvent(new CustomEvent('ytbg:ready'));
//         },
//         onStateChange: (e) => {
//           if (e.data === YT.PlayerState.ENDED) {
//             try { e.target.seekTo(0, true); } catch(_){}
//             kickPlay();
//           }
//           if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.CUED) {
//             kickPlay();
//           }
//         }
//       },
//       host: 'https://www.youtube-nocookie.com' // ← これが重要
//     });
//   };

//   function kickPlay(){
//     if (!player || typeof player.playVideo !== 'function') return;
//     const now = Date.now();
//     if (now - lastKick < 300) return; // 連打しない
//     lastKick = now;
//     try { player.playVideo(); } catch(_){}
//   }

//   const rekick = () => kickPlay();
//   document.addEventListener('visibilitychange', rekick, {passive:true});
//   window.addEventListener('focus', rekick, {passive:true});
//   window.addEventListener('scroll', rekick, {passive:true});
//   window.addEventListener('touchmove', rekick, {passive:true});

//   try{
//     const io = new IntersectionObserver((ents)=>{
//       if (ents[0]?.isIntersecting) kickPlay();
//     }, {threshold: 0.01});
//     io.observe(document.getElementById('bg-video'));
//   }catch(_){}
// })();

// document.addEventListener("DOMContentLoaded", () => {
//   const buttons = document.querySelectorAll(".js-video-button");

//   function setState(btn, on){
//     btn.classList.toggle("on",  on);
//     btn.classList.toggle("off", !on);
//     btn.setAttribute("aria-pressed", on ? "true" : "false");
//     btn.setAttribute("aria-label",   on ? "サウンドをオフ" : "サウンドをオン");
//     const st = btn.querySelector(".status-text");
//     if (st) st.textContent = on ? "ON" : "OFF";
//   }

//   // --- 初期同期（YouTube > <video> > 見た目のみ）
//   function syncInitial(){
//     const hasYT = !!(window.YT_BG && typeof window.YT_BG.isMuted === "function");
//     if (hasYT){
//       const on = !window.YT_BG.isMuted();
//       buttons.forEach(b => setState(b, on));
//       return;
//     }
//     const video = document.querySelector(".js-video");
//     if (video){
//       buttons.forEach(b => setState(b, !video.muted));
//     } else {
//       // デフォはOFF（必要なら true に）
//       buttons.forEach(b => setState(b, false));
//     }
//   }
//   syncInitial();

//   // YouTube 側があとから ready になる場合
//   document.addEventListener("ytbg:ready", () => {
//     if (window.YT_BG && typeof window.YT_BG.isMuted === "function"){
//       const on = !window.YT_BG.isMuted();
//       buttons.forEach(b => setState(b, on));
//     }
//   }, { once:true });

//   // --- クリックで切替
//   buttons.forEach(btn => {
//     btn.addEventListener("click", (e) => {
//       e.preventDefault();
//       e.stopPropagation();

//       // 1) YouTube IFrame API を使っている場合
//       if (window.YT_BG && typeof window.YT_BG.isMuted === "function"){
//         try{
//           if (window.YT_BG.isMuted()){
//             window.YT_BG.unMute();
//             window.YT_BG.setVolume?.(100);
//             window.YT_BG.playVideo?.();
//             setState(btn, true);
//           } else {
//             window.YT_BG.mute();
//             setState(btn, false);
//           }
//         } catch(_){}
//         return;
//       }

//       // 2) <video class="js-video"> がある場合
//       const video = document.querySelector(".js-video");
//       if (video){
//         video.muted = !video.muted;
//         if (!video.muted) video.play?.();
//         setState(btn, !video.muted);
//         return;
//       }

//       // 3) 連動先が無い場合は見た目だけトグル
//       setState(btn, !btn.classList.contains("on"));
//     });
//   });

//   // --- スクロールでボタンを隠す（あなたの元コード踏襲）
//   const hiddenBtn = document.querySelectorAll(".movie__btn");
//   const toggleStoppedClass = () => {
//     hiddenBtn.forEach(el => {
//       if (window.scrollY > 50) el.classList.add("hidden");
//       else el.classList.remove("hidden");
//     });
//   };
//   toggleStoppedClass();
//   window.addEventListener("scroll", toggleStoppedClass);
// });

// トップ動画背景（YouTube埋め込み）- モバイル対応版
// トップ動画背景（YouTube埋め込み）- スマホ完全対応版
(function(){
  'use strict';
  
  const el = document.getElementById('yt-bg-player');
  if (!el) return;
  
  const VIDEO_ID = el.getAttribute('data-video');
  if (!VIDEO_ID) {
    console.warn('YouTube video ID not found');
    return;
  }
  
  let player;
  let lastKick = 0;
  let playAttempts = 0;
  const MAX_ATTEMPTS = 15;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  let userHasInteracted = false;

  // YouTube API準備完了を待つ
  window.onYouTubeIframeAPIReady = function(){
    console.log('YouTube API Ready');
    initPlayer();
  };

  // すでにAPIが読み込まれている場合（再読み込み時など）
  if (window.YT && window.YT.Player) {
    console.log('YouTube API already loaded');
    initPlayer();
  }

  function initPlayer(){
    console.log('Initializing player with video ID:', VIDEO_ID);
    
    player = new YT.Player('yt-bg-player', {
      videoId: VIDEO_ID,
      playerVars: {
        autoplay: 1,
        mute: 1,
        controls: 0,
        showinfo: 0,
        modestbranding: 1,
        loop: 1,
        playlist: VIDEO_ID,
        playsinline: 1,
        rel: 0,
        iv_load_policy: 3,
        fs: 0,
        disablekb: 1,
        cc_load_policy: 0,
        enablejsapi: 1,
        origin: window.location.origin,
        widget_referrer: window.location.href
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
        onError: onPlayerError
      }
    });
  }

  function onPlayerReady(event){
    console.log('Player Ready');
    window.YT_BG = event.target;
    
    // 確実にミュート
    try {
      event.target.mute();
      event.target.setVolume(0);
      console.log('Player muted');
    } catch(e){
      console.warn('Mute failed:', e);
    }

    // デスクトップはすぐ再生試行
    if (!isMobile) {
      setTimeout(() => {
        attemptPlay();
      }, 300);
    } else {
      // モバイルは即座に1回試行 + ユーザー操作待ち
      console.log('Mobile detected, setting up triggers');
      attemptPlay();
      setupMobileTriggers();
    }

    // 動画表示（フェードイン）
    setTimeout(() => {
      const bgEl = document.getElementById('bg-video');
      if (bgEl) {
        bgEl.classList.add('is-ready');
        console.log('Video container ready');
      }
    }, 500);

    // イベント発火
    document.dispatchEvent(new CustomEvent('ytbg:ready', {
      detail: { player: event.target }
    }));
  }

  function onPlayerStateChange(event){
    const state = event.data;
    const stateNames = {
      '-1': 'UNSTARTED',
      '0': 'ENDED',
      '1': 'PLAYING',
      '2': 'PAUSED',
      '3': 'BUFFERING',
      '5': 'CUED'
    };
    console.log('Player State Changed:', stateNames[state] || state);
    
    // 再生中になったら試行カウントリセット
    if (state === YT.PlayerState.PLAYING) {
      playAttempts = 0;
      userHasInteracted = true;
    }
    
    // 終了したらループ
    if (state === YT.PlayerState.ENDED) {
      try {
        event.target.seekTo(0);
        attemptPlay();
      } catch(e){
        console.warn('Seek failed:', e);
      }
    }
    
    // 停止・一時停止したら再生
    if (state === YT.PlayerState.PAUSED || state === YT.PlayerState.CUED) {
      setTimeout(() => attemptPlay(), 200);
    }
  }

  function onPlayerError(event){
    const errorCodes = {
      2: 'Invalid video ID',
      5: 'HTML5 player error',
      100: 'Video not found',
      101: 'Video not allowed to embed',
      150: 'Video not allowed to embed'
    };
    console.error('YouTube Error:', errorCodes[event.data] || event.data);
    
    // エラーでも再試行
    setTimeout(() => attemptPlay(), 2000);
  }

  function attemptPlay(){
    if (!player || typeof player.playVideo !== 'function') {
      console.warn('Player not ready');
      return;
    }
    
    if (playAttempts >= MAX_ATTEMPTS) {
      console.warn('Max play attempts reached');
      return;
    }
    
    const now = Date.now();
    if (now - lastKick < 300) return; // 連打防止
    lastKick = now;
    playAttempts++;

    try {
      player.mute();
      player.setVolume(0);
      player.playVideo();
      console.log('Play attempt #' + playAttempts);
    } catch(e){
      console.error('Play failed:', e);
    }
  }

  function setupMobileTriggers(){
    const triggerEvents = ['touchstart', 'touchend', 'touchmove', 'click', 'scroll'];
    
    function handleUserInteraction(e){
      if (userHasInteracted) return;
      
      console.log('User interaction detected:', e.type);
      attemptPlay();
      
      // 1秒後に再生状態を確認
      setTimeout(() => {
        if (player && typeof player.getPlayerState === 'function') {
          const state = player.getPlayerState();
          if (state === YT.PlayerState.PLAYING || state === YT.PlayerState.BUFFERING) {
            console.log('Playback started successfully');
            userHasInteracted = true;
            cleanupListeners();
          }
        }
      }, 1000);
    }

    function cleanupListeners(){
      triggerEvents.forEach(eventName => {
        document.removeEventListener(eventName, handleUserInteraction);
      });
      console.log('Mobile triggers cleaned up');
    }

    // すべてのイベントにリスナー登録
    triggerEvents.forEach(eventName => {
      document.addEventListener(eventName, handleUserInteraction, {
        passive: true,
        capture: true
      });
    });

    // 段階的な自動再試行（ユーザー操作がない場合のフォールバック）
    const retryDelays = [1000, 2000, 3000, 5000, 7000];
    retryDelays.forEach(delay => {
      setTimeout(() => {
        if (!userHasInteracted) {
          console.log('Auto retry after', delay, 'ms');
          attemptPlay();
        }
      }, delay);
    });
  }

  // ページ復帰時に再生
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      console.log('Page visible again');
      setTimeout(attemptPlay, 300);
    }
  });

  window.addEventListener('focus', () => {
    console.log('Window focused');
    setTimeout(attemptPlay, 300);
  });

  // IntersectionObserver（画面内に入ったら再生）
  try {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        console.log('Video in viewport');
        attemptPlay();
      }
    }, { 
      threshold: 0.1,
      rootMargin: '100px'
    });
    
    const bgVideo = document.getElementById('bg-video');
    if (bgVideo) {
      observer.observe(bgVideo);
    }
  } catch(e){
    console.warn('IntersectionObserver not supported');
  }

})();

// サウンドボタン制御
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".js-video-button");
  if (!buttons.length) return;

  function setState(btn, isOn){
    btn.classList.toggle("on", isOn);
    btn.classList.toggle("off", !isOn);
    btn.setAttribute("aria-pressed", isOn ? "true" : "false");
    btn.setAttribute("aria-label", isOn ? "サウンドをオフ" : "サウンドをオン");
    
    const statusText = btn.querySelector(".status-text");
    if (statusText) {
      statusText.textContent = isOn ? "ON" : "OFF";
    }
  }

  function syncState(){
    if (window.YT_BG && typeof window.YT_BG.isMuted === "function"){
      try {
        const isMuted = window.YT_BG.isMuted();
        buttons.forEach(btn => setState(btn, !isMuted));
        console.log('Button state synced:', !isMuted ? 'ON' : 'OFF');
      } catch(e){
        console.warn('State sync failed:', e);
        buttons.forEach(btn => setState(btn, false));
      }
    } else {
      buttons.forEach(btn => setState(btn, false));
    }
  }

  // 初期状態同期
  syncState();
  
  // YouTube準備完了後に再同期
  document.addEventListener("ytbg:ready", () => {
    console.log('YouTube ready event received');
    setTimeout(syncState, 500);
  }, { once: true });

  // クリックイベント
  buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (!window.YT_BG || typeof window.YT_BG.isMuted !== "function"){
        console.warn('YouTube player not ready');
        alert('動画の読み込みをお待ちください');
        return;
      }

      try {
        const wasMuted = window.YT_BG.isMuted();
        
        if (wasMuted) {
          window.YT_BG.unMute();
          window.YT_BG.setVolume(100);
          window.YT_BG.playVideo();
          buttons.forEach(b => setState(b, true));
          console.log('Sound turned ON');
        } else {
          window.YT_BG.mute();
          window.YT_BG.setVolume(0);
          buttons.forEach(b => setState(b, false));
          console.log('Sound turned OFF');
        }
      } catch(err){
        console.error('Toggle sound failed:', err);
      }
    });
  });

  // スクロールでボタン非表示
  const movieBtns = document.querySelectorAll(".movie__btn");
  if (!movieBtns.length) return;
  
  let scrollTimer;
  function handleScroll(){
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      const shouldHide = window.scrollY > 50;
      movieBtns.forEach(btn => {
        btn.classList.toggle("hidden", shouldHide);
      });
    }, 100);
  }
  
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
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




(function() {
  'use strict';

  // 実際の機能本体
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

    // カード高さ合わせ
    function setCardHeight() {
      if (!cardHeadImg || !featureCard) return;

      if (cardHeadImg.complete && cardHeadImg.naturalHeight > 0) {
        const imgNaturalWidth = cardHeadImg.naturalWidth;
        const imgNaturalHeight = cardHeadImg.naturalHeight;
        const imgAspectRatio = imgNaturalWidth / imgNaturalHeight;
        const cardWidth = featureCard.offsetWidth;
        const imgDisplayHeight = cardWidth / imgAspectRatio;
        featureCard.style.height = `${imgDisplayHeight}px`;
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

    function handleScroll() {
      const scrollTop = scrollTarget.scrollTop;
      const scrollHeight = scrollTarget.scrollHeight;
      const clientHeight = scrollTarget.clientHeight;
      const maxScroll = scrollHeight - clientHeight;

      if (maxScroll <= 0) return;

      const scrollProgress = scrollTop / maxScroll;
      const size = calculateBgDisplaySize();
      if (!size) return;
      const viewportHeight = window.innerHeight;
      const maxBgMove = size.displayHeight - viewportHeight;
      const bgY = -(scrollProgress * maxBgMove);

      bgInner.style.transform = `translate(-50%, ${bgY}px)`;
    }

    // wheel/touch のブロックはそのまま
    if (featureShell) {
      let unlockAnimating = false;

      featureShell.addEventListener('wheel', function(e) {
        if (unlockAnimating) return;

        const scrollHeight = scrollTarget.scrollHeight;
        const clientHeight = scrollTarget.clientHeight;
        const maxScroll = scrollHeight - clientHeight;

        if (maxScroll <= 0) return;

        const currentScroll = scrollTarget.scrollTop;
        const delta = e.deltaY;
        const atTop = currentScroll <= 0;
        const atBottom = currentScroll >= maxScroll - 1;

        if (atTop && delta < 0) {
          unlockAnimating = true;
          featureShell.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
          featureShell.style.position = 'relative';
          featureShell.style.top = '';
          featureShell.style.left = '';
          featureShell.style.width = '';
          featureShell.style.zIndex = '';
          document.body.classList.remove('in-feature-shell');
          document.body.classList.remove('is-special');
          setTimeout(() => {
            unlockAnimating = false;
            featureShell.style.transition = '';
          }, 600);
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
          featureShell.style.position = 'relative';
          featureShell.style.top = '';
          featureShell.style.left = '';
          featureShell.style.width = '';
          featureShell.style.zIndex = '';
          document.body.classList.remove('in-feature-shell');
          document.body.classList.remove('is-special');
          return;
        }

        if (atBottom && deltaY > 0) {
          return;
        }

        e.preventDefault();
        touchStartY = touchY;
      }, { passive: false });
    }

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

    // ★ここで「初期化済み」をマークする
    document.body.classList.add('feature-scroll-initialized');
  }

  // 400px以上のときだけ初期化するやつ
  function initIfWideScreen() {
    if (window.innerWidth >= 400) {
      if (!document.body.classList.contains('feature-scroll-initialized')) {
        initFeatureScroll();
        console.log('Feature scroll initialized (>=400px)');
      }
    } else {
      console.log('Feature scroll disabled (<400px)');
    }
  }

  // DOM読み込み時
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIfWideScreen);
  } else {
    initIfWideScreen();
  }

  // リサイズでも判定
  window.addEventListener('resize', function() {
    clearTimeout(window._featureScrollResizeTimer);
    window._featureScrollResizeTimer = setTimeout(() => {
      if (window.innerWidth >= 400) {
        if (!document.body.classList.contains('feature-scroll-initialized')) {
          initFeatureScroll();
          console.log('Feature scroll re-initialized on resize (>=400px)');
        }
      } else {
        // ここで本気で解除したい場合はリスナーも外す処理を書く
        document.body.classList.remove('feature-scroll-initialized');
        console.log('Feature scroll disabled due to small screen');
      }
    }, 150);
  }, { passive: true });

})();



// ページトップボタン制御
(function() {
  'use strict';
  
  console.log('=== Page Top Button Script Loaded ===');
  
  function initPageTopButton() {
    console.log('=== Page Top Button Debug ===');
    
    // 複数のセレクタで試行
    const selectors = [
      '.feature-card_topBtn',
      '.page_top.feature-card_topBtn',
      'a.feature-card_topBtn',
      '.feature-card__scroll-wrapper .page_top',
      'a[href="#"]'
    ];
    
    let topBtn = null;
    
    for (let selector of selectors) {
      topBtn = document.querySelector(selector);
      if (topBtn) {
        console.log(`Found button with selector: ${selector}`);
        break;
      }
    }
    
    if (!topBtn) {
      console.error('❌ Page top button not found with any selector');
      console.log('Available buttons:', document.querySelectorAll('a[href="#"]'));
      console.log('Available with class*="top":', document.querySelectorAll('[class*="top"]'));
      return;
    }
    
    console.log('Button element:', topBtn);
    console.log('Button classes:', topBtn.className);
    console.log('Button href:', topBtn.href);
    
    const featureShell = document.querySelector('.feature-shell');
    const scrollTarget = document.querySelector('.js-feature-scroll');
    
    console.log('Feature shell:', featureShell);
    console.log('Scroll target:', scrollTarget);
    
    // イベント委譲も追加（念のため）
    document.body.addEventListener('click', function(e) {
      const target = e.target.closest('.feature-card_topBtn');
      if (target) {
        console.log('✓✓✓ Button clicked via delegation!');
        handleClick(e);
      }
    });
    
    // 直接イベントも設定
    topBtn.addEventListener('click', handleClick, true); // キャプチャフェーズ
    topBtn.addEventListener('click', handleClick, false); // バブリングフェーズ
    
    function handleClick(e) {
      console.log('==================');
      console.log('✓✓✓ CLICK EVENT FIRED!');
      console.log('Event type:', e.type);
      console.log('Target:', e.target);
      console.log('==================');
      
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      
      // 1. カード内のスクロールを最上部に戻す
      if (scrollTarget) {
        scrollTarget.scrollTop = 0;
        console.log('✓ Card scroll reset to top');
      }
      
      // 2. feature-shellの固定を完全に解除
      if (featureShell) {
        featureShell.style.transition = 'none';
        featureShell.style.position = 'static';
        featureShell.style.top = '';
        featureShell.style.left = '';
        featureShell.style.width = '';
        featureShell.style.zIndex = '';
        featureShell.style.transform = '';
        console.log('✓ Feature-shell reset');
      }
      
      // 3. bodyのクラスとスタイルを削除
      document.body.classList.remove('in-feature-shell');
      document.body.classList.remove('is-special');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      console.log('✓ Body reset');
      
      // 4. htmlのスタイルも削除
      document.documentElement.style.overflow = '';
      document.documentElement.style.position = '';
      console.log('✓ HTML reset');
      
      // 5. 強制的にページトップへ
      const scrollToTop = function() {
        window.scrollTo(0, 0);
        window.pageYOffset = 0;
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        console.log('✓ Scroll position:', window.pageYOffset);
      };
      
      scrollToTop();
      requestAnimationFrame(scrollToTop);
      setTimeout(scrollToTop, 0);
      setTimeout(scrollToTop, 10);
      setTimeout(scrollToTop, 50);
      
      console.log('✓✓✓ All operations completed!');
      
      return false;
    }
    
    // テスト用：ボタンをクリックしてみる
    console.log('✓ Page top button initialized');
    console.log('Try clicking the button or run: document.querySelector(".feature-card_topBtn").click()');
    console.log('=============================');
  }
  
  // DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPageTopButton);
  } else {
    initPageTopButton();
  }
  
  // load イベントでも試行
  window.addEventListener('load', function() {
    console.log('Window loaded - reinitializing button listener');
    initPageTopButton();
  });
  
})();


/**
 * feature-card_contactの表示制御
 * js-feature-scroll内をスクロールした際に、
 * feature-card__headのエリアにいる時だけfeature-card_contactを表示
 */
(function() {
  'use strict';
  // スクロール可能なコンテナを取得
  const scrollContainer = document.querySelector('.js-feature-scroll');
  // コンタクトボタンを取得
  const contactBtn = document.querySelector('.feature-card_contact');
  // ヘッダーエリアを取得
  const cardHead = document.querySelector('.feature-card__head');
  // 要素が存在しない場合は処理を終了
  if (!scrollContainer || !contactBtn || !cardHead) {
    return;
  }
  /**
   * スクロール位置に応じてコンタクトボタンの表示/非表示を切り替え
   */
  function toggleContactButton() {
    // ヘッダーエリアの高さを取得
    const headHeight = cardHead.offsetHeight;
    // 現在のスクロール位置を取得
    const scrollTop = scrollContainer.scrollTop;
    // スクロール位置がヘッダーエリア内にある場合は表示
    if (scrollTop < headHeight) {
      contactBtn.style.opacity = '1';
      contactBtn.style.pointerEvents = 'auto';
    } else {
      // ヘッダーエリアを超えたら非表示
      contactBtn.style.opacity = '0';
      contactBtn.style.pointerEvents = 'none';
    }
  }
  // 初期状態を設定（トランジション用のスタイル追加）
  contactBtn.style.transition = 'opacity 0.2s ease';
  // スクロールイベントリスナーを追加
  scrollContainer.addEventListener('scroll', toggleContactButton);
  // 初期表示を設定
  toggleContactButton();

})();


///WordPress のブロックエディタで出力される .wp-block-image img を自動で <div class="img-wrap"> で囲む
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.wp-block-image img');
  images.forEach(img => {
    if (!img.parentElement.classList.contains('img-wrap')) {
      const wrapper = document.createElement('div');
      wrapper.classList.add('img-wrap');
      img.parentNode.insertBefore(wrapper, img);
      wrapper.appendChild(img);
    }
  });
});

// 特集の画像をPC時のみポップアップさせる
(function() {
  'use strict';

  function isDesktop() {
    return window.innerWidth >= 1000;
  }

  let modalInstance = null; // モーダルを1つだけ保持

  // モーダル要素を作成（初回のみ）
  function getModal() {
    if (modalInstance) return modalInstance;

    const modal = document.createElement('div');
    modal.className = 'image-popup-modal';
    modal.style.cssText = `
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.75);
      z-index: 10000;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;

    const modalInner = document.createElement('div');
    modalInner.className = 'image-popup-inner';
    modalInner.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.9);
      max-width: 90vw;
      max-height: 90vh;
      transition: transform 0.3s ease;
      text-align: left;
    `;

    const modalImg = document.createElement('img');
    modalImg.className = 'image-popup-img';
    modalImg.style.cssText = `
      max-width: 100%;
      max-height: 70vh;
      width: auto;
      height: auto;
      display: block;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
      margin-bottom: 10px;
    `;

    const modalCaption = document.createElement('div');
    modalCaption.className = 'image-popup-caption';
    modalCaption.style.cssText = `
      color: #fff;
      font-size: 14px;
      line-height: 1.5;
      max-width: 80vw;
      word-break: break-word;
    `;

    const closeButton = document.createElement('button');
    closeButton.className = 'image-popup-close';
    closeButton.innerHTML = '×';
    closeButton.style.cssText = `
      position: absolute;
      top: -25px;
      right: -42px;
      border: none;
      background: unset;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      font-size: 30px;
      line-height: 1;
      cursor: pointer;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s ease;
      z-index: 10001;
    `;

    modalInner.appendChild(modalImg);
    modalInner.appendChild(modalCaption);
    modalInner.appendChild(closeButton);
    modal.appendChild(modalInner);
    document.body.appendChild(modal);

    function closeModal() {
      modal.style.opacity = '0';
      modalInner.style.transform = 'translate(-50%, -50%) scale(0.9)';
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    closeButton.addEventListener('click', (e) => {
      e.stopPropagation();
      closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
      }
    });

    modalInstance = { modal, modalImg, modalInner, modalCaption };
    return modalInstance;
  }

  function initImagePopup() {
    if (!isDesktop()) return;

    const { modal, modalImg, modalInner, modalCaption } = getModal();
    const figures = document.querySelectorAll('.feature-card__body .wp-block-image figure');

    figures.forEach((figure) => {
      const img = figure.querySelector('img');
      if (!img) return;

      // 重複登録を防止
      if (img.dataset.popupEnabled) return;
      img.dataset.popupEnabled = 'true';

      img.style.cursor = 'pointer';

      img.addEventListener('click', (e) => {
        if (!isDesktop()) return;
        e.preventDefault();
        e.stopPropagation();

        modalImg.src = img.src;
        modalImg.alt = img.alt || '';

        const figcap = figure.querySelector('figcaption');
        if (figcap && figcap.textContent.trim()) {
          modalCaption.textContent = figcap.textContent.trim();
          modalCaption.style.display = 'block';
        } else {
          modalCaption.textContent = '';
          modalCaption.style.display = 'none';
        }

        modal.style.display = 'flex';
        setTimeout(() => {
          modal.style.opacity = '1';
          modalInner.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 10);
      });

      img.addEventListener('mouseenter', () => {
        if (!isDesktop()) return;
        img.style.opacity = '0.85';
        img.style.transition = 'opacity 0.2s ease';
      });

      img.addEventListener('mouseleave', () => {
        if (!isDesktop()) return;
        img.style.opacity = '1';
      });
    });
  }

  window.addEventListener('resize', () => {
    const imgs = document.querySelectorAll('.feature-card__body .wp-block-image figure img');
    imgs.forEach((img) => {
      img.style.cursor = isDesktop() ? 'pointer' : 'default';
      if (!isDesktop()) img.style.opacity = '1';
    });
  });

  // 初期化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initImagePopup, 200); // img-wrapの処理完了を待つ
    });
  } else {
    setTimeout(initImagePopup, 200);
  }

  // 動的追加対応
  if ('MutationObserver' in window) {
    const observer = new MutationObserver((mutations) => {
      if (!isDesktop()) return;
      
      let needsReinit = false;
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            if (node.matches?.('.feature-card__body .wp-block-image') ||
                node.querySelector?.('.feature-card__body .wp-block-image')) {
              needsReinit = true;
            }
          }
        });
      });
      
      if (needsReinit) {
        initImagePopup();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
})();

