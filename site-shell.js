const SITE_NAV = [
  { id: 'conference', href: 'conference.html', label: 'Conference' },
  { id: 'upcoming', href: 'upcoming.html', label: 'Upcoming' },
  { id: 'program', href: 'program.html', label: 'Program' },
  { id: 'speakers', href: 'speakers.html', label: 'Speakers' },
  { id: 'founders', href: 'founders.html', label: 'Founders' },
  { id: 'guidelines', href: 'guidelines.html', label: 'Guidelines' },
  { id: 'conduct', href: 'conduct.html', label: 'Conduct' },
  { id: 'safeguarding', href: 'safeguarding.html', label: 'Safeguarding' },
  { id: 'privacy', href: 'privacy.html', label: 'Privacy' },
  { id: 'register', href: 'register.html', label: 'Register', register: true },
];

function renderSiteNav(activePage) {
  const nav = document.querySelector('[data-site-nav]');
  if (!nav) return;

  nav.innerHTML = SITE_NAV.map((item) => {
    const isCurrent = item.id === activePage;
    const classes = item.register ? 'nav-register' : '';
    const current = isCurrent ? ' aria-current="page"' : '';
    const icon = item.register ? ' <span aria-hidden="true">↗</span>' : '';
    return `<li><a href="${item.href}" class="${classes}"${current}>${item.label}${icon}</a></li>`;
  }).join('');
}

function renderSiteFooter(activePage) {
  const footerNav = document.querySelector('[data-site-footer-nav]');
  if (!footerNav) return;

  const links = [
    { href: 'conference.html', label: 'About', id: 'conference' },
    { href: 'upcoming.html', label: 'Upcoming', id: 'upcoming' },
    { href: 'program.html', label: 'Program', id: 'program' },
    { href: 'speakers.html', label: 'Speakers', id: 'speakers' },
    { href: 'founders.html', label: 'Founders', id: 'founders' },
    { href: 'guidelines.html', label: 'Guidelines', id: 'guidelines' },
    { href: 'conduct.html', label: 'Conduct', id: 'conduct' },
    { href: 'safeguarding.html', label: 'Safeguarding', id: 'safeguarding' },
    { href: 'privacy.html', label: 'Privacy', id: 'privacy' },
    { href: 'register.html', label: 'Register', id: 'register' },
    { href: 'conference.html#partnership', label: 'Partner', id: 'partner' },
  ];

  footerNav.innerHTML = links.map((item) => {
    const isCurrent = item.id === activePage;
    const current = isCurrent ? ' aria-current="page"' : '';
    return `<li><a href="${item.href}"${current}>${item.label}</a></li>`;
  }).join('');
}

function initSiteShell() {
  const page = document.body.dataset.page;
  if (!page) return;
  renderSiteNav(page === 'home' ? null : page);
  renderSiteFooter(page === 'home' ? null : page);
}

initSiteShell();
