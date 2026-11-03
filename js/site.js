(() => {
  'use strict';
  const root = document.documentElement;
  const languageButtons = [...document.querySelectorAll('[data-set-language]')];
  const map = document.querySelector('#site-map');
  const mapTrigger = document.querySelector('.map-trigger');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const gsap = window.gsap;
  let media;
  let mapOpener;

  function updateLabels() {
    const language = root.lang === 'en' ? 'en' : 'zh';
    document.title = document.body.dataset[language === 'en' ? 'titleEn' : 'titleZh'];
    const description = document.querySelector('meta[name="description"]');
    description.content = description.dataset[language];
    languageButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.setLanguage === language)));
    document.querySelectorAll('[data-label-zh]').forEach(element => {
      element.setAttribute('aria-label', element.dataset[language === 'en' ? 'labelEn' : 'labelZh']);
    });
  }

  function openMap() {
    if (!map || map.open || typeof map.showModal !== 'function') return;
    mapOpener = document.activeElement;
    map.showModal();
    if (gsap && !reduceMotion.matches) {
      gsap.fromTo(map, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: .25, clearProps: 'transform,opacity' });
    }
  }
  function closeMap() { if (map?.open) map.close(); }
  mapTrigger?.addEventListener('click', openMap);
  document.querySelector('.map-close')?.addEventListener('click', closeMap);
  map?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMap));
  map?.addEventListener('close', () => {
    if (!map.open && mapOpener?.isConnected) mapOpener.focus({ preventScroll: true });
  });
  map?.addEventListener('click', event => {
    if (event.target !== map) return;
    const bounds = map.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeMap();
  });
  document.addEventListener('keydown', event => {
    const editing = event.target instanceof Element && event.target.closest('input, textarea, select, [contenteditable="true"]');
    if (event.key === '/' && !editing && !event.ctrlKey && !event.metaKey && !event.altKey && !event.repeat) {
      event.preventDefault();
      openMap();
    }
  });

  // The route dock remains ordinary links, including when JavaScript is unavailable.
  let progressFrame = 0;
  function updateProgress() {
    progressFrame = 0;
    const max = root.scrollHeight - root.clientHeight;
    const progress = max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0;
    root.style.setProperty('--read-progress', progress.toFixed(4));
  }
  function requestProgress() {
    if (!progressFrame) progressFrame = requestAnimationFrame(updateProgress);
  }
  window.addEventListener('scroll', requestProgress, { passive: true });
  window.addEventListener('resize', requestProgress, { passive: true });
  window.addEventListener('pageshow', requestProgress);

  function animatePage(runEntrance = true) {
    if (!gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(window.ScrollTrigger);
    media = gsap.matchMedia();
    media.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 801px)' }, context => {
      if (!context.conditions.motion) return;
      const distance = context.conditions.desktop ? 26 : 14;
      if (runEntrance) {
        const entrance = [...document.querySelectorAll('[data-entrance]')].filter(element => element.getClientRects().length);
        gsap.from(entrance, { y: distance, opacity: 0, duration: .8, stagger: .1, ease: 'power3.out', clearProps: 'transform,opacity' });
      }
      document.querySelectorAll('[data-reveal]').forEach(element => {
        window.ScrollTrigger.create({ trigger: element, start: 'top 94%', once: true, onEnter: () => {
          gsap.from(element, { y: distance * .7, opacity: 0, duration: .65, ease: 'power2.out', clearProps: 'transform,opacity' });
          const title = element.querySelector('.section-title');
          if (title) gsap.fromTo(title, { '--rule-scale': 0 }, { '--rule-scale': 1, duration: .7 });
        } });
      });
      const scene = document.querySelector('.orbit-scene');
      if (scene && context.conditions.desktop) {
        const spin = gsap.to('.orbit-spinner', { rotation: 360, duration: 75, repeat: -1, ease: 'none' });
        window.ScrollTrigger.create({ trigger: scene, start: 'top bottom', end: 'bottom top', onToggle: self => spin.paused(!self.isActive) });
        gsap.to('.orbit-svg', { y: -24, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .7 } });
        if (runEntrance) gsap.from('.orbit-track', { opacity: 0, duration: 1.5, delay: .4, clearProps: 'opacity' });
      }
    });
  }

  languageButtons.forEach(button => button.addEventListener('click', () => {
    const language = button.dataset.setLanguage;
    if ((root.lang === 'en' ? 'en' : 'zh') === language) return;
    media?.revert();
    root.lang = language === 'zh' ? 'zh-CN' : 'en';
    try { localStorage.setItem('dmcnczy-language', language); } catch (_) { /* Storage can be disabled. */ }
    updateLabels();
    animatePage(false);
    if (gsap && !reduceMotion.matches) {
      gsap.fromTo('.main', { opacity: .55 }, { opacity: 1, duration: .22, clearProps: 'opacity' });
    }
    window.ScrollTrigger?.refresh();
    requestProgress();
  }));

  reduceMotion.addEventListener('change', () => {
    if (!gsap) return;
    gsap.killTweensOf('.main, .site-map');
    gsap.set('.main, .site-map', { clearProps: 'transform,opacity' });
  });
  updateLabels();
  animatePage();
  updateProgress();
  document.fonts?.ready.then(() => {
    window.ScrollTrigger?.refresh();
    requestProgress();
  });
})();
