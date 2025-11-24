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



// トップ動画背景(YouTube埋め込み) - スクロール処理を最適化
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
        controls: 0,
        modestbranding: 1,
        rel: 0,
        iv_load_policy: 3,
        fs: 0,
        disablekb: 1,
        cc_load_policy: 0,
        autoplay: 1,
        mute: 1,
        playsinline: 1,
        loop: 1,
        playlist: VIDEO_ID,
        enablejsapi: 1,
        origin: location.origin
      },
      events: {
        onReady: (e) => {
          try { e.target.mute(); } catch(_){}
          kickPlay();
          requestAnimationFrame(()=> {
            document.getElementById('bg-video')?.classList.add('is-ready');
          });
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
      host: 'https://www.youtube-nocookie.com'
    });
  };

  function kickPlay(){
    if (!player || typeof player.playVideo !== 'function') return;
    const now = Date.now();
    if (now - lastKick < 300) return;
    lastKick = now;
    try { player.playVideo(); } catch(_){}
  }

  const rekick = () => kickPlay();
  document.addEventListener('visibilitychange', rekick, {passive:true});
  window.addEventListener('focus', rekick, {passive:true});
  // ★スクロールイベントを削除してパフォーマンス向上
  // window.addEventListener('scroll', rekick, {passive:true});
  window.addEventListener('touchmove', rekick, {passive:true});

  try{
    const io = new IntersectionObserver((ents)=>{
      if (ents[0]?.isIntersecting) kickPlay();
    }, {threshold: 0.01});
    io.observe(document.getElementById('bg-video'));
  }catch(_){}
})();

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
      buttons.forEach(b => setState(b, false));
    }
  }
  syncInitial();

  document.addEventListener("ytbg:ready", () => {
    if (window.YT_BG && typeof window.YT_BG.isMuted === "function"){
      const on = !window.YT_BG.isMuted();
      buttons.forEach(b => setState(b, on));
    }
  }, { once:true });

  buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

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

      const video = document.querySelector(".js-video");
      if (video){
        video.muted = !video.muted;
        if (!video.muted) video.play?.();
        setState(btn, !video.muted);
        return;
      }

      setState(btn, !btn.classList.contains("on"));
    });
  });

  // ★requestAnimationFrameを使ってスクロールイベントを最適化
  const hiddenBtn = document.querySelectorAll(".movie__btn");
  let ticking = false;
  
  const toggleStoppedClass = () => {
    hiddenBtn.forEach(el => {
      if (window.scrollY > 50) el.classList.add("hidden");
      else el.classList.remove("hidden");
    });
    ticking = false;
  };
  
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(toggleStoppedClass);
      ticking = true;
    }
  }, {passive: true});
  
  toggleStoppedClass();
});





// トップニュースティッカー(SP時のみ)
document.addEventListener('DOMContentLoaded', function(){
  const ticker = document.querySelector('.fv_news_ticker.js-ticker');
  if (!ticker) return;

  const uls = Array.from(ticker.querySelectorAll(':scope > ul'));
  if (uls.length === 0) return;

  const lane = document.createElement('div');
  lane.className = 'lane';

  uls.forEach(ul => {
    Array.from(ul.querySelectorAll('li')).forEach(li => {
      const item = document.createElement('span');
      item.className = 'item';
      item.innerHTML = li.innerHTML;
      lane.appendChild(item);
    });
  });

  ticker.appendChild(lane);
  const clone = lane.cloneNode(true);
  clone.classList.add('clone');
  ticker.appendChild(clone);

  function measure(){
    const w = lane.scrollWidth;
    lane.style.setProperty('--w', w + 'px');
    clone.style.setProperty('--w', w + 'px');

    const speed = Number(ticker.dataset.speed) || 160;
    const dur = (w / speed).toFixed(3) + 's';
    lane.style.setProperty('--dur', dur);
    clone.style.setProperty('--dur', dur);

    uls.forEach(ul => ul.style.visibility = 'hidden');
  }

  function scheduleMeasure(){ requestAnimationFrame(measure); }
  measure();
  window.addEventListener('resize', scheduleMeasure, { passive:true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  setTimeout(measure, 0);
});






// Feature背景スクロール連動(画像の実サイズベース) - パフォーマンス最適化版
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
      
      if (cardHeadImg.complete && cardHeadImg.naturalHeight > 0) {
        const imgNaturalWidth = cardHeadImg.naturalWidth;
        const imgNaturalHeight = cardHeadImg.naturalHeight;
        const imgAspectRatio = imgNaturalWidth / imgNaturalHeight;
        
        const cardWidth = featureCard.offsetWidth;
        const calculatedHeight = cardWidth / imgAspectRatio;
        
        featureCard.style.setProperty('--card-height', `${calculatedHeight}px`);
        console.log('Card height set:', calculatedHeight);
      }
    }
    
    // 背景画像の初期化
    function initBgImage() {
      if (bgImg.complete && bgImg.naturalHeight > 0) {
        bgNaturalHeight = bgImg.naturalHeight;
        bgNaturalWidth = bgImg.naturalWidth;
        isImageLoaded = true;
        console.log('BG image loaded:', { bgNaturalWidth, bgNaturalHeight });
        calculateAndSetTransform();
      } else {
        bgImg.addEventListener('load', () => {
          bgNaturalHeight = bgImg.naturalHeight;
          bgNaturalWidth = bgImg.naturalWidth;
          isImageLoaded = true;
          console.log('BG image loaded (event):', { bgNaturalWidth, bgNaturalHeight });
          calculateAndSetTransform();
        }, { once: true });
      }
    }
    
    // ★requestAnimationFrameを使った最適化されたスクロール処理
    let ticking = false;
    
    function calculateAndSetTransform() {
      if (!isImageLoaded) return;
      
      const scrollTop = scrollTarget.scrollTop;
      const scrollHeight = scrollTarget.scrollHeight;
      const clientHeight = scrollTarget.clientHeight;
      const maxScroll = scrollHeight - clientHeight;
      
      if (maxScroll <= 0) {
        bgInner.style.transform = 'translateY(0px)';
        ticking = false;
        return;
      }
      
      const scrollRatio = scrollTop / maxScroll;
      
      const containerWidth = bgInner.offsetWidth;
      const containerHeight = bgInner.offsetHeight;
      
      const bgAspectRatio = bgNaturalWidth / bgNaturalHeight;
      const containerAspectRatio = containerWidth / containerHeight;
      
      let renderedWidth, renderedHeight;
      
      if (bgAspectRatio > containerAspectRatio) {
        renderedHeight = containerHeight;
        renderedWidth = renderedHeight * bgAspectRatio;
      } else {
        renderedWidth = containerWidth;
        renderedHeight = renderedWidth / bgAspectRatio;
      }
      
      const maxTranslateY = renderedHeight - containerHeight;
      const translateY = -maxTranslateY * scrollRatio;
      
      bgInner.style.transform = `translateY(${translateY}px)`;
      ticking = false;
    }
    
    // ★スクロールイベントを間引いて処理
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(calculateAndSetTransform);
        ticking = true;
      }
    }
    
    // イベントリスナーの設定
    scrollTarget.addEventListener('scroll', onScroll, { passive: true });
    
    // リサイズ対応
    let resizeTicking = false;
    function onResize() {
      if (!resizeTicking) {
        requestAnimationFrame(() => {
          setCardHeight();
          calculateAndSetTransform();
          resizeTicking = false;
        });
        resizeTicking = true;
      }
    }
    
    window.addEventListener('resize', onResize, { passive: true });
    
    // 初期化
    setCardHeight();
    initBgImage();
    
    // カード画像のロード監視
    if (cardHeadImg && !cardHeadImg.complete) {
      cardHeadImg.addEventListener('load', setCardHeight, { once: true });
    }
    
    // MutationObserverで動的な変更を監視
    const observer = new MutationObserver(() => {
      if (!resizeTicking) {
        requestAnimationFrame(() => {
          setCardHeight();
          calculateAndSetTransform();
          resizeTicking = false;
        });
        resizeTicking = true;
      }
    });
    
    if (featureCard) {
      observer.observe(featureCard, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style']
      });
    }
    
    // フォントロード後に再計算
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        setCardHeight();
        calculateAndSetTransform();
      });
    }
    
    console.log('Feature scroll initialized');
  }
  
  // 初期化のタイミング
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFeatureScroll);
  } else {
    initFeatureScroll();
  }
  
  window.addEventListener('load', initFeatureScroll);
})();






// ページトップボタン - 最適化版
(function() {
  'use strict';

  function initPageTopButton() {
    console.log('=============================');
    console.log('Page Top Button Init');
    
    const scrollContainer = document.querySelector('.js-feature-scroll');
    const pageTopBtn = document.querySelector('.page-top');
    
    console.log('Elements found:', {
      scrollContainer: !!scrollContainer,
      pageTopBtn: !!pageTopBtn
    });
    
    if (!scrollContainer || !pageTopBtn) {
      console.warn('Required elements not found');
      return;
    }
    
    // ★requestAnimationFrameを使った最適化
    let ticking = false;
    
    function updateButtonVisibility() {
      const scrollTop = scrollContainer.scrollTop;
      const threshold = 100;
      
      if (scrollTop > threshold) {
        pageTopBtn.classList.add('is-show');
      } else {
        pageTopBtn.classList.remove('is-show');
      }
      
      ticking = false;
    }
    
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateButtonVisibility);
        ticking = true;
      }
    }
    
    scrollContainer.addEventListener('scroll', onScroll, { passive: true });
    
    pageTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Page top button clicked');
      
      scrollContainer.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    updateButtonVisibility();
    
    console.log('Page Top Button initialized successfully');
    console.log('=============================');
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPageTopButton);
  } else {
    initPageTopButton();
  }
  
  window.addEventListener('load', function() {
    console.log('Window loaded - reinitializing button listener');
    initPageTopButton();
  });
  
})();


/**
 * feature-card_contactの表示制御 - 最適化版
 */
(function() {
  'use strict';
  
  const scrollContainer = document.querySelector('.js-feature-scroll');
  const contactBtn = document.querySelector('.feature-card_contact');
  const cardHead = document.querySelector('.feature-card__head');
  
  if (!scrollContainer || !contactBtn || !cardHead) {
    return;
  }
  
  contactBtn.style.transition = 'opacity 0.2s ease';
  
  // ★requestAnimationFrameを使った最適化
  let ticking = false;
  
  function toggleContactButton() {
    const headHeight = cardHead.offsetHeight;
    const scrollTop = scrollContainer.scrollTop;
    
    if (scrollTop < headHeight) {
      contactBtn.style.opacity = '1';
      contactBtn.style.pointerEvents = 'auto';
    } else {
      contactBtn.style.opacity = '0';
      contactBtn.style.pointerEvents = 'none';
    }
    
    ticking = false;
  }
  
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(toggleContactButton);
      ticking = true;
    }
  }
  
  scrollContainer.addEventListener('scroll', onScroll, { passive: true });
  toggleContactButton();

})();




// 特集の画像をPC時のみポップアップさせる
(function() {
  'use strict';

  function isDesktop() {
    return window.innerWidth >= 1000;
  }

  function createModal() {
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
    `;

    const modalImg = document.createElement('img');
    modalImg.className = 'image-popup-img';
    modalImg.style.cssText = `
      max-width: 100%;
      max-height: 90vh;
      width: auto;
      height: auto;
      display: block;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
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
    modalInner.appendChild(closeButton);
    modal.appendChild(modalInner);
    document.body.appendChild(modal);

    function closeModal() {
      modal.style.opacity = '0';
      modalInner.style.transform = 'translate(-50%, -50%) scale(0.9)';
      setTimeout(function() {
        modal.style.display = 'none';
      }, 300);
    }

    modal.addEventListener('click', function(e) {
      if (e.target === modal || e.target === closeButton) {
        closeModal();
      }
    });

    closeButton.addEventListener('click', closeModal);

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
      }
    });

    return { modal, modalImg, modalInner };
  }

  function initImagePopup() {
    if (!isDesktop()) return;

    const modalElements = createModal();
    const { modal, modalImg, modalInner } = modalElements;

    const figures = document.querySelectorAll('.feature-card__body figure.wp-block-image');

    figures.forEach(function(figure) {
      const img = figure.querySelector('img');
      if (!img) return;

      img.style.cursor = 'pointer';

      img.addEventListener('click', function(e) {
        if (!isDesktop()) return;
        
        e.preventDefault();
        e.stopPropagation();

        const imgSrc = img.src;
        const imgAlt = img.alt || '';

        modalImg.src = imgSrc;
        modalImg.alt = imgAlt;

        modal.style.display = 'flex';
        
        setTimeout(function() {
          modal.style.opacity = '1';
          modalInner.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 10);
      });

      img.addEventListener('mouseenter', function() {
        if (!isDesktop()) return;
        img.style.opacity = '0.85';
        img.style.transition = 'opacity 0.2s ease';
      });

      img.addEventListener('mouseleave', function() {
        if (!isDesktop()) return;
        img.style.opacity = '1';
      });
    });
  }

  window.addEventListener('resize', function() {
    const figures = document.querySelectorAll('.feature-card__body figure.wp-block-image img');
    figures.forEach(function(img) {
      if (isDesktop()) {
        img.style.cursor = 'pointer';
      } else {
        img.style.cursor = 'default';
        img.style.opacity = '1';
      }
    });
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initImagePopup);
  } else {
    initImagePopup();
  }

  if ('MutationObserver' in window) {
    const observer = new MutationObserver(function(mutations) {
      if (!isDesktop()) return;
      
      mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1) {
            if (node.matches && node.matches('.feature-card__body figure.wp-block-image')) {
              initImagePopup();
            } else if (node.querySelector) {
              const figures = node.querySelectorAll('.feature-card__body figure.wp-block-image');
              if (figures.length > 0) {
                initImagePopup();
              }
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

})();