(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    nav?.classList.toggle('open', open);
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', 'Abrir menu');
  }));
  document.getElementById('year')?.replaceChildren(document.createTextNode(String(new Date().getFullYear())));
})();