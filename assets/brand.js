// Knowledge Library — small interactions
(function () {
  const KEY = 'kb-theme';
  const root = document.documentElement;

  // Initial theme: localStorage > system preference > light
  const saved = localStorage.getItem(KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : 'light');
  root.setAttribute('data-theme', initial);

  function setTheme(next) {
    root.setAttribute('data-theme', next);
    localStorage.setItem(KEY, next);
  }

  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-kb-toggle="theme"]');
    if (t) {
      const cur = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      setTheme(cur === 'dark' ? 'light' : 'dark');
    }
    const m = e.target.closest('[data-kb-toggle="menu"]');
    if (m) {
      const menu = document.querySelector('[data-kb-menu]');
      if (menu) menu.classList.toggle('is-open');
    }
  });
})();
