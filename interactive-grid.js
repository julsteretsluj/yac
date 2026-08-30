const GRID_VARIANTS = ['pink', 'purple', 'blue', 'yellow'];

function initInteractiveGrid(container) {
  const squareSize = Number(container.dataset.gridSize) || 36;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let resizeFrame = null;

  function build() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) return;

    const cols = Math.ceil(width / squareSize);
    const rows = Math.ceil(height / squareSize);

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'interactive-grid__svg');
    svg.setAttribute('width', String(width));
    svg.setAttribute('height', String(height));
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('aria-hidden', 'true');

    const fragment = document.createDocumentFragment();

    for (let index = 0; index < cols * rows; index += 1) {
      const x = (index % cols) * squareSize;
      const y = Math.floor(index / cols) * squareSize;
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      const variant = GRID_VARIANTS[index % GRID_VARIANTS.length];

      rect.setAttribute('x', String(x));
      rect.setAttribute('y', String(y));
      rect.setAttribute('width', String(squareSize));
      rect.setAttribute('height', String(squareSize));
      rect.setAttribute('class', `interactive-grid__cell interactive-grid__cell--${variant}`);

      if (!prefersReducedMotion) {
        rect.addEventListener('mouseenter', () => rect.classList.add('is-hovered'));
        rect.addEventListener('mouseleave', () => rect.classList.remove('is-hovered'));
      }

      fragment.appendChild(rect);
    }

    svg.appendChild(fragment);
    container.replaceChildren(svg);
  }

  function scheduleBuild() {
    if (resizeFrame) cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => {
      resizeFrame = null;
      build();
    });
  }

  if (typeof ResizeObserver !== 'undefined') {
    const observer = new ResizeObserver(scheduleBuild);
    observer.observe(container);
  } else {
    window.addEventListener('resize', scheduleBuild);
  }

  scheduleBuild();
}

document.querySelectorAll('[data-interactive-grid]').forEach(initInteractiveGrid);
