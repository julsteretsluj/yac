let noiseTextureCount = 0;

function readNoiseOption(container, name, fallback) {
  const value = container.dataset[name];
  return value === undefined || value === '' ? fallback : value;
}

function createNoiseTexture(container) {
  const frequency = readNoiseOption(container, 'noiseFrequency', '0.4');
  const octaves = readNoiseOption(container, 'noiseOctaves', '6');
  const slope = readNoiseOption(container, 'noiseSlope', '0.15');
  const opacity = readNoiseOption(container, 'noiseOpacity', '0.6');
  const filterId = `noise-texture-${noiseTextureCount += 1}`;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'noise-texture');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('aria-hidden', 'true');

  const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
  filter.setAttribute('id', filterId);

  const turbulence = document.createElementNS('http://www.w3.org/2000/svg', 'feTurbulence');
  turbulence.setAttribute('type', 'fractalNoise');
  turbulence.setAttribute('baseFrequency', frequency);
  turbulence.setAttribute('numOctaves', octaves);
  turbulence.setAttribute('stitchTiles', 'stitch');

  const colorMatrix = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
  colorMatrix.setAttribute('type', 'saturate');
  colorMatrix.setAttribute('values', '0');

  const transfer = document.createElementNS('http://www.w3.org/2000/svg', 'feComponentTransfer');
  ['R', 'G', 'B'].forEach((channel) => {
    const fn = document.createElementNS('http://www.w3.org/2000/svg', `feFunc${channel}`);
    fn.setAttribute('type', 'linear');
    fn.setAttribute('slope', slope);
    transfer.appendChild(fn);
  });

  filter.append(turbulence, colorMatrix, transfer);

  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('width', '100%');
  rect.setAttribute('height', '100%');
  rect.setAttribute('filter', `url(#${filterId})`);
  rect.setAttribute('opacity', opacity);

  svg.append(filter, rect);
  container.replaceChildren(svg);
  container.classList.add('noise-texture-host', 'is-ready');
}

document.querySelectorAll('[data-noise-texture]').forEach(createNoiseTexture);
