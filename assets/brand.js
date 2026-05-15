// Knowledge Library — small interactions
(function () {
  const KEY = 'kb-theme';
  const root = document.documentElement;

  const saved = localStorage.getItem(KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.setAttribute('data-theme', saved || (prefersDark ? 'dark' : 'light'));

  function setTheme(next) {
    root.setAttribute('data-theme', next);
    localStorage.setItem(KEY, next);
  }

  function closeAllDropdowns(except) {
    document.querySelectorAll('.kb-dropdown-panel.is-open').forEach((p) => {
      if (p !== except) {
        p.classList.remove('is-open');
        const t = p.parentElement && p.parentElement.querySelector('.kb-dropdown-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      }
    });
  }

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-kb-toggle="theme"]')) {
      const cur = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      setTheme(cur === 'dark' ? 'light' : 'dark');
      return;
    }

    const m = e.target.closest('[data-kb-toggle="menu"]');
    if (m) {
      const menu = document.querySelector('[data-kb-menu]');
      if (menu) menu.classList.toggle('is-open');
      return;
    }

    const trigger = e.target.closest('.kb-dropdown-trigger');
    if (trigger) {
      const panel = trigger.parentElement.querySelector('.kb-dropdown-panel');
      if (!panel) return;
      const willOpen = !panel.classList.contains('is-open');
      closeAllDropdowns(panel);
      panel.classList.toggle('is-open', willOpen);
      trigger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      e.stopPropagation();
      return;
    }

    if (!e.target.closest('.kb-dropdown-panel')) closeAllDropdowns();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllDropdowns();
  });

  // Search form -> Google site-scoped search (works without an index)
  document.addEventListener('submit', (e) => {
    const f = e.target.closest('[data-kb-search]');
    if (!f) return;
    e.preventDefault();
    const input = f.querySelector('input[name="q"]') || f.querySelector('input[type="search"]') || f.querySelector('input');
    const q = (input && input.value) || '';
    if (!q.trim()) return;
    const site = f.getAttribute('data-site') || 'yuvarajsfcloud.github.io/Knowledge-Library';
    const url = 'https://www.google.com/search?q=' + encodeURIComponent('site:' + site + ' ' + q);
    window.open(url, '_blank', 'noopener');
  });
})();
