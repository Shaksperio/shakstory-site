(() => {
  const root = document.querySelector('[data-writing-evolution]');
  if (!root) return;
  const slides = Array.from(root.querySelectorAll('.evolution-slide'));
  const dots = Array.from(root.querySelectorAll('.evolution-dot'));
  const prev = root.querySelector('[data-evolution-prev]');
  const next = root.querySelector('[data-evolution-next]');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0, timer = null, writingTimer = null, paused = false;
  const texts = slides.map(slide => slide.dataset.text || '');
  slides.forEach(slide => {
    const img = slide.querySelector('.evolution-person img');
    const wrapper = slide.querySelector('.evolution-person');
    if (img && wrapper) {
      img.addEventListener('error', () => wrapper.classList.add('has-error'));
      if (img.complete && img.naturalWidth === 0) wrapper.classList.add('has-error');
    }
  });
  function stopWriting() { if (writingTimer !== null) window.clearInterval(writingTimer); writingTimer = null; }
  function write(i) {
    stopWriting();
    const sl = slides[i], out = sl.querySelector('.evolution-written');
    if (!out) return;
    const message = texts[i];
    out.textContent = '';
    if (reduce.matches) { out.textContent = message; return; }
    let position = 0;
    const speed = sl.dataset.effect === 'pen' ? 55 : sl.dataset.effect === 'typewriter' ? 72 : 40;
    writingTimer = window.setInterval(() => {
      position += 1;
      out.textContent = Array.from(message).slice(0, position).join('');
      if (position >= Array.from(message).length) stopWriting();
    }, speed);
  }
  function show(nextIndex, fromUser = false) {
    index = (nextIndex + slides.length) % slides.length;
    slides.forEach((sl, i) => {const current=i===index;sl.classList.toggle('is-current', current);sl.setAttribute('aria-hidden', String(!current));sl.inert=!current;});
    dots.forEach((dot, i) => {const current=i===index;dot.classList.toggle('is-current',current);dot.setAttribute('aria-current',current?'true':'false');});
    write(index);
    if (fromUser) restart();
  }
  function pause() { if (timer!==null) window.clearInterval(timer);timer=null; }
  function restart() {
    pause();
    if (reduce.matches || paused || document.hidden) return;
    timer=window.setInterval(()=>show(index+1),7800);
  }
  prev?.addEventListener('click',()=>show(index-1,true));
  next?.addEventListener('click',()=>show(index+1,true));
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>show(i,true)));
  root.addEventListener('mouseenter',()=>{paused=true;pause();});
  root.addEventListener('mouseleave',()=>{paused=false;restart();});
  root.addEventListener('focusin',()=>{paused=true;pause();});
  root.addEventListener('focusout',e=>{if (!root.contains(e.relatedTarget)){paused=false;restart();}});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){pause();stopWriting();}else{write(index);restart();}});
  reduce.addEventListener?.('change',()=>{write(index);restart();});
  show(0);restart();
})();