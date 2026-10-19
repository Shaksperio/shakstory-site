(() => {
  const root = document.querySelector('[data-writing-evolution]');
  if (!root) return;
  const slides = Array.from(root.querySelectorAll('.evolution-slide'));
  const dots = Array.from(root.querySelectorAll('.evolution-dot'));
  if (slides.length < 2) return;
  const prev = root.querySelector('[data-evolution-prev]');
  const next = root.querySelector('[data-evolution-next]');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const texts = slides.map(slide => Array.from(slide.dataset.text || ''));
  let index = 0;
  let slideTimer = null;
  let writingTimer = null;
  let hovering = false;

  // GIFs originais hospedados no proprio GitHub Pages. Não substituir por
  // PNGs antigos por configuração de movimento reduzido ou foco no celular.
  // A preferência por movimento reduzido continua desativando as animações
  // do texto e a passagem automática dos slides.
  for (const slide of slides) {
    const img = slide.querySelector('.evolution-person img');
    const wrapper = slide.querySelector('.evolution-person');
    if (!img || !wrapper) continue;
    img.addEventListener('load', () => wrapper.classList.remove('has-error'));
    img.addEventListener('error', () => {
      wrapper.classList.add('has-error');
      console.warn('Shakstory: GIF do carrossel não foi carregado:', img.currentSrc);
    });
    if (img.complete && img.naturalWidth === 0) wrapper.classList.add('has-error');
  }
  function stopWriting() {
    if (writingTimer !== null) window.clearTimeout(writingTimer);
    writingTimer = null;
  }
  function animateWriting(i) {
    stopWriting();
    const output = slides[i].querySelector('.evolution-written');
    if (!output) return;
    const chars = texts[i];
    if (reduce.matches) {
      output.textContent = chars.join('');
      return;
    }
    output.textContent = '';
    const effect = slides[i].dataset.effect;
    const delay = effect === 'pen' ? 50 : effect === 'typewriter' ? 67 : 35;
    let position = 0;
    function tick() {
      if (position >= chars.length) {
        writingTimer = null;
        return;
      }
      position++;
      output.textContent = chars.slice(0, position).join('');
      writingTimer = window.setTimeout(tick, delay);
    }
    tick();
  }
  function cancelSlideTimer() {
    if (slideTimer !== null) window.clearTimeout(slideTimer);
    slideTimer = null;
  }
  function schedule() {
    cancelSlideTimer();
    if (document.hidden || reduce.matches || hovering) return;
    slideTimer = window.setTimeout(() => show(index + 1), 6500);
  }
  function show(position) {
    index = (position + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle('is-current', active);
      slide.setAttribute('aria-hidden', String(!active));
      slide.inert = !active;
    });
    dots.forEach((dot, i) => {
      const active = i === index;
      dot.classList.toggle('is-current', active);
      dot.setAttribute('aria-current', active ? 'true' : 'false');
    });
    animateWriting(index);
    schedule();
  }
  prev?.addEventListener('click', () => show(index - 1));
  next?.addEventListener('click', () => show(index + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
  // Mouse hover pauses on desktop only. A tapped button retains focus on
  // phones, so focusin/focusout must NOT pause automatic rotation.
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  root.addEventListener('mouseenter', () => {
    if (!finePointer.matches) return;
    hovering = true;
    cancelSlideTimer();
  });
  root.addEventListener('mouseleave', () => {
    hovering = false;
    schedule();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelSlideTimer();
      stopWriting();
    } else {
      animateWriting(index);
      schedule();
    }
  });
  reduce.addEventListener?.('change', () => {
    animateWriting(index);
    schedule();
  });
  show(0);
})();
