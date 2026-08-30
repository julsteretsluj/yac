import createGlobe from 'https://esm.sh/cobe@0.6.4';

const MOVEMENT_DAMPING = 1400;

const YAC_GLOBE_CONFIG = {
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [212 / 255, 20 / 255, 122 / 255],
  glowColor: [0.94, 0.92, 0.98],
  markers: [
    { location: [14.5995, 120.9842], size: 0.05 },
    { location: [19.076, 72.8777], size: 0.08 },
    { location: [6.5244, 3.3792], size: 0.07 },
    { location: [30.0444, 31.2357], size: 0.06 },
    { location: [39.9042, 116.4074], size: 0.07 },
    { location: [-23.5505, -46.6333], size: 0.08 },
    { location: [19.4326, -99.1332], size: 0.08 },
    { location: [40.7128, -74.006], size: 0.08 },
    { location: [35.6762, 139.6503], size: 0.06 },
    { location: [41.0082, 28.9784], size: 0.06 },
    { location: [44.7866, 20.4489], size: 0.05 },
    { location: [33.6844, 73.0479], size: 0.05 },
  ],
};

function initGlobe(container) {
  if (container.dataset.globeReady === 'true') return;
  container.dataset.globeReady = 'true';
  container.classList.add('globe-host');

  const canvas = document.createElement('canvas');
  canvas.className = 'globe-canvas';
  container.appendChild(canvas);

  let phi = 0;
  let width = 0;
  let pointerDownX = null;
  let rotationOffset = 0;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setPointerState = (clientX) => {
    pointerDownX = clientX;
    canvas.style.cursor = clientX === null ? 'grab' : 'grabbing';
  };

  const onResize = () => {
    width = container.offsetWidth;
  };

  const onPointerMove = (clientX) => {
    if (pointerDownX === null) return;
    rotationOffset += (clientX - pointerDownX) / MOVEMENT_DAMPING;
    pointerDownX = clientX;
  };

  onResize();

  const globe = createGlobe(canvas, {
    ...YAC_GLOBE_CONFIG,
    width: width * 2,
    height: width * 2,
    onRender: (state) => {
      if (!reducedMotion && pointerDownX === null) phi += 0.005;
      state.phi = phi + rotationOffset;
      state.width = width * 2;
      state.height = width * 2;
    },
  });

  window.requestAnimationFrame(() => {
    canvas.style.opacity = '1';
  });

  window.addEventListener('resize', onResize);
  canvas.addEventListener('pointerdown', (event) => setPointerState(event.clientX));
  canvas.addEventListener('pointerup', () => setPointerState(null));
  canvas.addEventListener('pointerout', () => setPointerState(null));
  canvas.addEventListener('pointermove', (event) => onPointerMove(event.clientX));
  canvas.addEventListener('touchmove', (event) => {
    if (event.touches[0]) onPointerMove(event.touches[0].clientX);
  }, { passive: true });
}

document.querySelectorAll('[data-globe]').forEach(initGlobe);
