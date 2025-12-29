// loadingアニメーション制御（初回訪問時のみ）
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.loading');
  const imgs = loader?.querySelectorAll('.loading_img img');
  const fv = document.getElementById('fv');
  if(!loader || !imgs || !imgs.length){ fv?.classList.add('is-show'); return; }

  // 初回訪問チェック（セッションストレージ使用）
  const hasVisited = sessionStorage.getItem('hasVisited');
  
  if (hasVisited) {
    // 2回目以降：ローディングをスキップ
    loader.style.display = 'none';
    fv?.classList.add('is-show');
    return;
  }

  // 初回訪問フラグを保存
  sessionStorage.setItem('hasVisited', 'true');

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



// document.addEventListener('DOMContentLoaded', function() {
//     const featureShell = document.querySelector('.feature-shell');
//     const scrollWrapper = document.querySelector('.feature-card__scroll-wrapper');
//     const header = document.querySelector('.header_wrap_bl01');
    
//     if (!featureShell || !scrollWrapper || !header) {
//         console.error('要素が見つかりません');
//         return;
//     }
    
//     let isFixed = false;
//     let isHeaderVisible = false;
//     let hideTimeout = null;
    
//     function checkPosition() {
//         const rect = featureShell.getBoundingClientRect();
        
//         console.log('rect.top:', rect.top, 'isFixed:', isFixed);
        
//         // feature-shellが画面上部に達したとき
//         if (rect.top <= 0 && !isFixed) {
//             isFixed = true;
            
//             // feature-shellを固定
//             featureShell.style.position = 'fixed';
//             featureShell.style.top = '0';
//             featureShell.style.left = '0';
//             featureShell.style.right = '0';
//             featureShell.style.width = '100%';
//             featureShell.style.height = '100vh';
//             featureShell.style.zIndex = '8000';
            
//             // scroll-wrapperのスクロールを有効化（CSSクラスを追加）
//             scrollWrapper.classList.add('enable-scroll');
            
//             console.log('Fixed mode enabled');
//             console.log('scrollHeight:', scrollWrapper.scrollHeight);
//             console.log('clientHeight:', scrollWrapper.clientHeight);
            
//             // header を表示
//             if (!isHeaderVisible) {
//                 isHeaderVisible = true;
//                 if (hideTimeout) {
//                     clearTimeout(hideTimeout);
//                     hideTimeout = null;
//                 }
//                 header.style.display = 'block';
//                 requestAnimationFrame(() => {
//                     requestAnimationFrame(() => {
//                         header.classList.add('visible');
//                     });
//                 });
//             }
//         }
//     }
    
//     // scroll-wrapper内のスクロールイベント
//     scrollWrapper.addEventListener('wheel', function(e) {
//         if (!isFixed) return;
        
//         const scrollTop = scrollWrapper.scrollTop;
//         const isScrollingUp = e.deltaY < 0;
        
//         console.log('Wheel:', scrollTop, 'deltaY:', e.deltaY);
        
//         // 最上部で上にスクロールしようとしたとき、FVに戻る
//         if (scrollTop === 0 && isScrollingUp) {
//             e.preventDefault();
            
//             isFixed = false;
            
//             featureShell.style.position = '';
//             featureShell.style.top = '';
//             featureShell.style.left = '';
//             featureShell.style.right = '';
//             featureShell.style.width = '';
//             featureShell.style.height = '';
//             featureShell.style.zIndex = '';
            
//             // scroll-wrapperのスクロールを無効化
//             scrollWrapper.classList.remove('enable-scroll');
//             scrollWrapper.scrollTop = 0;
            
//             // 少し上にスクロール
//             window.scrollBy(0, -100);
            
//             console.log('Fixed mode disabled');
            
//             // header を非表示
//             if (isHeaderVisible) {
//                 isHeaderVisible = false;
//                 header.classList.remove('visible');
//                 if (hideTimeout) {
//                     clearTimeout(hideTimeout);
//                 }
//                 hideTimeout = setTimeout(() => {
//                     header.style.display = 'none';
//                     hideTimeout = null;
//                 }, 600);
//             }
//         }
//     }, { passive: false });
    
//     window.addEventListener('scroll', checkPosition);
//     checkPosition();
// });


// document.addEventListener('DOMContentLoaded', function() {
//     const featureShell = document.querySelector('.feature-shell');
//     const scrollWrapper = document.querySelector('.feature-card__scroll-wrapper');
//     const header01 = document.querySelector('.header_wrap_bl01');
//     const header02 = document.querySelector('.header_wrap_bl02');
//     const topBtn = document.querySelector('.feature-card_topBtn');
    
//     if (!featureShell || !scrollWrapper || !header01 || !header02) {
//         console.error('要素が見つかりません');
//         return;
//     }
    
//     // 初期状態でヘッダーを確実に非表示
//     header01.style.display = 'none';
//     header02.style.display = 'none';
//     header01.classList.remove('visible');
//     header02.classList.remove('visible');
    
//     let isFixed = false;
    
//     function showHeaders() {
//         console.log('showHeaders called');
//         header01.style.display = 'block';
//         header02.style.display = 'block';
//         setTimeout(() => {
//             header01.classList.add('visible');
//             header02.classList.add('visible');
//         }, 10);
//     }
    
//     function hideHeaders() {
//         console.log('hideHeaders called');
//         header01.classList.remove('visible');
//         header02.classList.remove('visible');
//         setTimeout(() => {
//             header01.style.display = 'none';
//             header02.style.display = 'none';
//         }, 600);
//     }
    
//     function enableFixedMode() {
//         if (isFixed) return;
//         isFixed = true;
        
//         console.log('enableFixedMode');
        
//         featureShell.style.position = 'fixed';
//         featureShell.style.top = '0';
//         featureShell.style.left = '0';
//         featureShell.style.right = '0';
//         featureShell.style.width = '100%';
//         featureShell.style.height = '100vh';
//         featureShell.style.zIndex = '8000';
        
//         scrollWrapper.style.overflowY = 'auto';
//         scrollWrapper.style.maxHeight = '100vh';
        
//         showHeaders();
//     }
    
//     function disableFixedMode() {
//         if (!isFixed) return;
//         isFixed = false;
        
//         console.log('disableFixedMode');
        
//         featureShell.style.position = '';
//         featureShell.style.top = '';
//         featureShell.style.left = '';
//         featureShell.style.right = '';
//         featureShell.style.width = '';
//         featureShell.style.height = '';
//         featureShell.style.zIndex = '';
        
//         scrollWrapper.style.overflowY = 'hidden';
//         scrollWrapper.style.maxHeight = '';
//         scrollWrapper.scrollTop = 0;
        
//         hideHeaders();
//     }
    
//     let ticking = false;
//     function checkPosition() {
//         const rect = featureShell.getBoundingClientRect();
        
//         if (rect.top <= 0) {
//             enableFixedMode();
//         } else {
//             disableFixedMode();
//         }
        
//         ticking = false;
//     }
    
//     // scroll-wrapper内のスクロールイベント
//     scrollWrapper.addEventListener('wheel', function(e) {
//         if (!isFixed) return;
        
//         const scrollTop = scrollWrapper.scrollTop;
//         const isScrollingUp = e.deltaY < 0;
        
//         // 最上部で上にスクロールしようとしたとき、FVに戻る
//         if (scrollTop === 0 && isScrollingUp) {
//             e.preventDefault();
//             disableFixedMode();
//             window.scrollBy(0, -100);
//         }
//     }, { passive: false });
    
//     // トップに戻るボタンのクリックイベント
//     if (topBtn) {
//         topBtn.addEventListener('click', function(e) {
//             e.preventDefault();
            
//             scrollWrapper.scrollTop = 0;
//             disableFixedMode();
            
//             window.scrollTo({
//                 top: 0,
//                 behavior: 'smooth'
//             });
//         });
//     }
    
//     // requestAnimationFrameでスクロールイベントを最適化
//     window.addEventListener('scroll', function() {
//         if (!ticking) {
//             window.requestAnimationFrame(checkPosition);
//             ticking = true;
//         }
//     });
    
//     checkPosition();
// });



// ========================================
// 1. スクロール制御
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const featureShell = document.querySelector('.feature-shell');
    const scrollWrapper = document.querySelector('.feature-card__scroll-wrapper');
    const topBtn = document.querySelector('.feature-card_topBtn');
    
    if (!featureShell || !scrollWrapper) {
        console.error('スクロール要素が見つかりません');
        return;
    }
    
    let isFixed = false;
    
    function enableFixedMode() {
        if (isFixed) return;
        isFixed = true;
        
        console.log('enableFixedMode - スクロール固定');
        
        featureShell.style.position = 'fixed';
        featureShell.style.top = '0';
        featureShell.style.left = '0';
        featureShell.style.right = '0';
        featureShell.style.width = '100%';
        featureShell.style.height = '100vh';
        featureShell.style.zIndex = '8000';
        
        scrollWrapper.style.setProperty('overflow-y', 'auto', 'important');
        scrollWrapper.style.setProperty('max-height', '100vh', 'important');
        
        console.log('scrollHeight:', scrollWrapper.scrollHeight);
        console.log('clientHeight:', scrollWrapper.clientHeight);
    }
    
    function disableFixedMode() {
        if (!isFixed) return;
        isFixed = false;
        
        console.log('disableFixedMode - スクロール解除');
        
        featureShell.style.position = '';
        featureShell.style.top = '';
        featureShell.style.left = '';
        featureShell.style.right = '';
        featureShell.style.width = '';
        featureShell.style.height = '';
        featureShell.style.zIndex = '';
        
        scrollWrapper.style.removeProperty('overflow-y');
        scrollWrapper.style.removeProperty('max-height');
        scrollWrapper.scrollTop = 0;
    }
    
    function checkPosition() {
        const rect = featureShell.getBoundingClientRect();
        
        console.log('checkPosition - rect.top:', rect.top, 'isFixed:', isFixed);
        
        if (rect.top <= 0) {
            enableFixedMode();
        } else if (rect.top > 0) {
            disableFixedMode();
        }
    }
    
    // ホイールイベント（最上部で上スクロール → FVに戻る）
    scrollWrapper.addEventListener('wheel', function(e) {
        if (!isFixed) return;
        
        const scrollTop = scrollWrapper.scrollTop;
        const isScrollingUp = e.deltaY < 0;
        
        console.log('Wheel - scrollTop:', scrollTop, 'deltaY:', e.deltaY);
        
        if (scrollTop === 0 && isScrollingUp) {
            e.preventDefault();
            disableFixedMode();
            window.scrollBy(0, -100);
        }
    }, { passive: false });
    
    // トップに戻るボタン
    if (topBtn) {
        topBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('トップボタンクリック');
            
            scrollWrapper.scrollTop = 0;
            disableFixedMode();
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    window.addEventListener('scroll', checkPosition);
    checkPosition();
});

// ========================================
// 2. ヘッダー表示制御
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const featureShell = document.querySelector('.feature-shell');
    const header01 = document.querySelector('.header_wrap_bl01');
    const header02 = document.querySelector('.header_wrap_bl02');
    
    if (!featureShell || !header01 || !header02) {
        console.error('ヘッダー要素が見つかりません');
        return;
    }
    
    // 初期状態で非表示
    header01.style.display = 'none';
    header02.style.display = 'none';
    header01.classList.remove('visible');
    header02.classList.remove('visible');
    
    let isHeaderVisible = false;
    let hideTimeout = null;
    
    function showHeaders() {
        if (isHeaderVisible) return;
        
        console.log('showHeaders - ヘッダー表示');
        
        if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
        }
        
        isHeaderVisible = true;
        header01.style.display = 'block';
        header02.style.display = 'block';
        
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                header01.classList.add('visible');
                header02.classList.add('visible');
            });
        });
    }
    
    function hideHeaders() {
        if (!isHeaderVisible) return;
        
        console.log('hideHeaders - ヘッダー非表示');
        
        if (hideTimeout) {
            clearTimeout(hideTimeout);
        }
        
        isHeaderVisible = false;
        header01.classList.remove('visible');
        header02.classList.remove('visible');
        
        hideTimeout = setTimeout(() => {
            header01.style.display = 'none';
            header02.style.display = 'none';
            hideTimeout = null;
        }, 600);
    }
    
    function checkHeaderVisibility() {
        const rect = featureShell.getBoundingClientRect();
        
        console.log('checkHeaderVisibility - rect.top:', rect.top);
        
        // 特集エリアが固定されているとき → ヘッダー表示
        if (rect.top <= 0) {
            showHeaders();
        } 
        // FVエリアに戻ったとき → ヘッダー非表示
        else if (rect.top > 0) {
            hideHeaders();
        }
    }
    
    window.addEventListener('scroll', checkHeaderVisibility);
    checkHeaderVisibility();
});