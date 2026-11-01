/* Set the language before first paint. Content remains readable without JS. */
(() => {
  let language;
  try { language = localStorage.getItem('dmcnczy-language'); } catch (_) { /* Storage may be disabled. */ }
  if (language !== 'zh' && language !== 'en') {
    language = /^zh\b/i.test(navigator.language || '') ? 'zh' : 'en';
  }
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
})();
