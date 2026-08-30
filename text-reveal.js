function getScrollProgress(element) {
  const viewportHeight = window.innerHeight;
  const elementTop = window.scrollY + element.getBoundingClientRect().top;
  const elementHeight = element.offsetHeight;
  const start = elementTop - viewportHeight;
  const end = elementTop + elementHeight;
  return Math.max(0, Math.min(1, (window.scrollY - start) / (end - start)));
}

function getWordOpacity(progress, rangeStart, rangeEnd) {
  if (progress <= rangeStart) return 0;
  if (progress >= rangeEnd) return 1;
  return (progress - rangeStart) / (rangeEnd - rangeStart);
}

function initTextReveal(section) {
  if (section.dataset.textRevealReady === 'true') return;

  const text = (section.dataset.textReveal || section.textContent).trim();
  if (!text) return;

  const words = text.split(/\s+/).filter(Boolean);
  if (!words.length) return;

  const heightVh = Number(section.dataset.textRevealHeight || 200);
  section.dataset.textRevealReady = 'true';
  section.style.setProperty('--text-reveal-height', `${heightVh}vh`);
  section.textContent = '';

  const sticky = document.createElement('div');
  sticky.className = 'text-reveal__sticky';

  const paragraph = document.createElement('p');
  paragraph.className = 'text-reveal__text';

  const wordStates = words.map((word, index) => {
    const wrapper = document.createElement('span');
    wrapper.className = 'text-reveal__word';

    const ghost = document.createElement('span');
    ghost.className = 'text-reveal__ghost';
    ghost.textContent = word;
    ghost.setAttribute('aria-hidden', 'true');

    const revealed = document.createElement('span');
    revealed.className = 'text-reveal__revealed';
    revealed.textContent = word;
    revealed.style.opacity = '0';

    wrapper.append(ghost, revealed);
    paragraph.appendChild(wrapper);

    if (index < words.length - 1) {
      paragraph.appendChild(document.createTextNode(' '));
    }

    return {
      revealed,
      start: index / words.length,
      end: (index + 1) / words.length,
    };
  });

  sticky.appendChild(paragraph);
  section.appendChild(sticky);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function update() {
    const progress = prefersReducedMotion ? 1 : getScrollProgress(section);

    wordStates.forEach(({ revealed, start, end }) => {
      revealed.style.opacity = String(getWordOpacity(progress, start, end));
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
}

document.querySelectorAll('[data-text-reveal]').forEach(initTextReveal);
