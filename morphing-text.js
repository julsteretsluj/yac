const MORPH_TIME = 1.5;
const COOLDOWN_TIME = 0.5;

function ensureThresholdFilter() {
  if (document.getElementById('morphing-text-threshold')) return;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('id', 'morphing-text-filters');
  svg.setAttribute('class', 'morphing-text-filters');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = `
    <defs>
      <filter id="morphing-text-threshold">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140"
        />
      </filter>
    </defs>
  `;
  document.body.appendChild(svg);
}

function parseMorphingWords(raw) {
  const trimmed = raw.trim();
  if (trimmed.startsWith('[')) {
    return JSON.parse(trimmed);
  }
  return trimmed.split('|').map((word) => word.trim()).filter(Boolean);
}

function initMorphingText(container) {
  if (container.dataset.morphingReady === 'true') return;
  if (!container.dataset.morphingWords) return;

  const texts = parseMorphingWords(container.dataset.morphingWords);
  if (!texts.length) return;

  container.dataset.morphingReady = 'true';
  container.classList.add('morphing-text-host');
  ensureThresholdFilter();

  const text1 = document.createElement('span');
  const text2 = document.createElement('span');
  text1.className = 'morphing-text__layer';
  text2.className = 'morphing-text__layer';
  container.append(text1, text2);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let index = 0;
    text1.textContent = texts[0];
    text1.style.opacity = '1';
    text2.style.display = 'none';
    window.setInterval(() => {
      index = (index + 1) % texts.length;
      text1.textContent = texts[index];
    }, 3000);
    return;
  }

  let textIndex = 0;
  let morph = 0;
  let cooldown = 0;
  let lastTime = new Date();

  function setStyles(fraction) {
    text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    const invertedFraction = 1 - fraction;
    text1.style.filter = `blur(${Math.min(8 / invertedFraction - 8, 100)}px)`;
    text1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`;

    text1.textContent = texts[textIndex % texts.length];
    text2.textContent = texts[(textIndex + 1) % texts.length];
  }

  function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / MORPH_TIME;
    if (fraction > 1) {
      cooldown = COOLDOWN_TIME;
      fraction = 1;
    }

    setStyles(fraction);

    if (fraction === 1) {
      textIndex += 1;
    }
  }

  function doCooldownState() {
    morph = 0;
    text2.style.filter = 'none';
    text2.style.opacity = '100%';
    text1.style.filter = 'none';
    text1.style.opacity = '0%';
  }

  function animate() {
    window.requestAnimationFrame(animate);

    const now = new Date();
    const dt = (now.getTime() - lastTime.getTime()) / 1000;
    lastTime = now;

    cooldown -= dt;

    if (cooldown <= 0) {
      doMorph();
    } else {
      doCooldownState();
    }
  }

  animate();
}

document.querySelectorAll('[data-morphing-text]').forEach(initMorphingText);
