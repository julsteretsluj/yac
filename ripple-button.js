function initRippleButton(button) {
  if (button.dataset.rippleReady === 'true') return;
  button.dataset.rippleReady = 'true';
  button.classList.add('ripple-button');

  if (!button.querySelector('.ripple-button__content')) {
    const content = document.createElement('span');
    content.className = 'ripple-button__content';
    while (button.firstChild) content.appendChild(button.firstChild);
    button.appendChild(content);
  }

  let rippleHost = button.querySelector('.ripple-button__ripples');
  if (!rippleHost) {
    rippleHost = document.createElement('span');
    rippleHost.className = 'ripple-button__ripples';
    rippleHost.setAttribute('aria-hidden', 'true');
    button.appendChild(rippleHost);
  }

  const rippleColor = button.dataset.rippleColor || '#ffffff';
  const duration = Number(button.dataset.rippleDuration || 600);

  button.addEventListener('click', (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple-button__ripple';
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.backgroundColor = rippleColor;
    ripple.style.setProperty('--ripple-duration', `${duration}ms`);

    rippleHost.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
}

document.querySelectorAll('[data-ripple-button], .btn-primary').forEach(initRippleButton);
