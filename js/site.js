(() => {
  'use strict';
  const root = document.documentElement;
  const languageButtons = [...document.querySelectorAll('[data-set-language]')];
  const menuButton = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = window.matchMedia('(max-width: 800px)');

  function updateLabels() {
    const language = root.lang === 'en' ? 'en' : 'zh';
    document.title = document.body.dataset[`title${language === 'en' ? 'En' : 'Zh'}`];
    const description = document.querySelector('meta[name="description"]');
    description.content = description.dataset[language];
    languageButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.setLanguage === language)));
    document.querySelectorAll('[data-label-zh]').forEach(element => {
      element.setAttribute('aria-label', element.dataset[language === 'en' ? 'labelEn' : 'labelZh']);
    });
    menuButton?.setAttribute('aria-label', language === 'zh'
      ? (menuButton.getAttribute('aria-expanded') === 'true' ? '收起导航' : '展开导航')
      : (menuButton.getAttribute('aria-expanded') === 'true' ? 'Close navigation' : 'Open navigation'));
  }

  function closeMenu() {
    sidebar?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    updateLabels();
  }
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    sidebar.classList.toggle('is-open', open);
    updateLabels();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && sidebar?.classList.contains('is-open')) {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener('click', event => {
    if (sidebar?.classList.contains('is-open') && !sidebar.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
  mobile.addEventListener('change', closeMenu);

  const gsap = window.gsap;
  let media;
  function animatePage(runEntrance = true) {
    if (!gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(window.ScrollTrigger);
    media = gsap.matchMedia();
    media.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 801px)' }, context => {
      if (!context.conditions.motion) return;
      const distance = context.conditions.desktop ? 24 : 12;
      const entrance = [...document.querySelectorAll('[data-entrance]')].filter(element => element.getClientRects().length);
      if (runEntrance) gsap.from(entrance, { y: distance, opacity: 0, duration: .65, stagger: .1, ease: 'power2.out', clearProps: 'transform,opacity' });
      document.querySelectorAll('[data-reveal]').forEach(element => {
        // Animate only on entry. Never hide offscreen content while it awaits scrolling.
        window.ScrollTrigger.create({ trigger: element, start: 'top 92%', once: true, onEnter: () => {
          gsap.from(element, { y: distance * .75, opacity: 0, duration: .5, ease: 'power2.out', clearProps: 'transform,opacity' });
          const title = element.querySelector('.section-title');
          if (title) gsap.fromTo(title, { '--rule-scale': 0 }, { '--rule-scale': 1, duration: .65 });
        } });
      });
      if (context.conditions.desktop && document.querySelector('.hero-art')) {
        gsap.fromTo('.hero-art', { y: 0 }, { y: 38, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .6 } });
        if (runEntrance) gsap.from('.flow-line', { strokeDashoffset: 1000, strokeDasharray: 1000, duration: 2.1, stagger: .06, ease: 'power2.out' });
      }
    });
  }

  languageButtons.forEach(button => button.addEventListener('click', () => {
    const language = button.dataset.setLanguage;
    if ((root.lang === 'en' ? 'en' : 'zh') === language) return;
    // Revert active animation styles before changing text or remeasuring the page.
    media?.revert();
    root.lang = language === 'zh' ? 'zh-CN' : 'en';
    try { localStorage.setItem('dmcnczy-language', language); } catch (_) { /* Keep switching usable. */ }
    updateLabels();
    animatePage(false);
    if (gsap && !reduceMotion.matches) {
      gsap.fromTo('.main', { opacity: .5 }, { opacity: 1, duration: .22, clearProps: 'opacity' });
    }
    // Avoid replaying entrance animations when switching languages.
    window.ScrollTrigger?.refresh();
  }));

  document.querySelectorAll('.quick-card').forEach(card => {
    function lift(raised) {
      if (!gsap || reduceMotion.matches || !window.matchMedia('(hover: hover)').matches) return;
      gsap.to(card, { y: raised ? -5 : 0, duration: .22, overwrite: 'auto', ease: 'power2.out' });
      gsap.to(card.querySelector('.icon'), { scale: raised ? 1.09 : 1, duration: .22, overwrite: 'auto' });
    }
    card.addEventListener('pointerenter', () => lift(true));
    card.addEventListener('pointerleave', () => lift(false));
    card.addEventListener('focus', () => lift(true));
    card.addEventListener('blur', () => lift(false));
  });
  reduceMotion.addEventListener('change', () => {
    if (!gsap) return;
    gsap.killTweensOf('.quick-card, .quick-card .icon, .main');
    gsap.set('.quick-card, .quick-card .icon, .main', { clearProps: 'transform,opacity' });
  });
  updateLabels();
  if (gsap && window.ScrollTrigger) animatePage();
  document.fonts?.ready.then(() => window.ScrollTrigger?.refresh());
})();
