// Mobile nav
const toggle = document.querySelector('.nav-toggle');
const header = document.querySelector('.site-header');

if (toggle) {
  toggle.addEventListener('click', () => {
    const open = header.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('.nav-list a').forEach((link) => {
    link.addEventListener('click', () => {
      header.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Compact header on scroll
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('is-compact', window.scrollY > 80);
  }, { passive: true });
}

// Upcoming conference editions (bi-monthly)
const upcomingConferences = [
  {
    theme: 'Human Rights',
    tagline: 'Youth stances on human rights, from the classroom to the global stage',
    status: 'open',
    statusLabel: 'Registration open',
    accent: 'pink',
    cta: { href: 'register.html', label: 'Register ↗' },
  },
  {
    theme: 'Climate Action',
    tagline: 'Youth-led solutions for a changing planet',
    status: 'soon',
    statusLabel: 'Coming soon',
    accent: 'blue',
    cta: { href: 'upcoming.html', label: 'Coming soon →' },
  },
  {
    theme: 'Education & Opportunity',
    tagline: 'Rethinking access, equity, and the future of learning',
    status: 'planned',
    statusLabel: 'Theme confirmed',
    accent: 'purple',
    cta: { href: 'upcoming.html', label: 'Coming soon →' },
  },
  {
    theme: 'Democracy & Civic Life',
    tagline: 'Young people shaping institutions and public discourse',
    status: 'planned',
    statusLabel: 'Theme confirmed',
    accent: 'yellow',
    cta: { href: 'upcoming.html', label: 'Coming soon →' },
  },
  {
    theme: 'Global Health & Wellbeing',
    tagline: 'SDGs, mental health, and what it means to thrive',
    status: 'tba',
    statusLabel: 'Details forthcoming',
    accent: 'pink',
    cta: { href: 'upcoming.html', label: 'Details forthcoming' },
  },
  {
    theme: 'Digital Futures',
    tagline: 'Technology, media, and ethics in a connected world',
    status: 'tba',
    statusLabel: 'Details forthcoming',
    accent: 'blue',
    cta: { href: 'upcoming.html', label: 'Details forthcoming' },
  },
];

function renderEditionCards() {
  const container = document.getElementById('edition-cards');
  if (!container) return;

  container.innerHTML = upcomingConferences.map((edition) => `
    <article class="edition-card edition-card--${edition.accent}${edition.status === 'open' ? ' edition-card--featured' : ''}" role="listitem">
      <div class="edition-card-top">
        <span class="edition-status edition-status--${edition.status}">${edition.statusLabel}</span>
      </div>
      <h3 class="edition-theme">${edition.theme}</h3>
      <p class="edition-tagline">${edition.tagline}</p>
      <p class="edition-format">Virtual · Zoom / Google Meet</p>
      <a href="${edition.cta.href}" class="edition-cta">${edition.cta.label}</a>
    </article>
  `).join('');
}

renderEditionCards();

// Program — schedule TBA; timezone conversion kept for when sessions are published
const REFERENCE_TZ_OFFSET = 420; // GMT+7

const sessionBlocks = [];

const dayPrograms = {
  1: [],
  2: [],
};

const timezones = [
  { offset: -720, label: 'GMT−12 · Baker Island' },
  { offset: -660, label: 'GMT−11 · American Samoa' },
  { offset: -600, label: 'GMT−10 · Hawaii' },
  { offset: -570, label: 'GMT−9:30 · Marquesas Islands' },
  { offset: -540, label: 'GMT−9 · Alaska' },
  { offset: -480, label: 'GMT−8 · US Pacific' },
  { offset: -420, label: 'GMT−7 · US Mountain' },
  { offset: -360, label: 'GMT−6 · US Central' },
  { offset: -300, label: 'GMT−5 · US Eastern' },
  { offset: -240, label: 'GMT−4 · Atlantic / Caribbean' },
  { offset: -210, label: 'GMT−3:30 · Newfoundland' },
  { offset: -180, label: 'GMT−3 · Brazil / Argentina' },
  { offset: -120, label: 'GMT−2 · Mid-Atlantic' },
  { offset: -60, label: 'GMT−1 · Azores' },
  { offset: 0, label: 'GMT+0 · UTC / London' },
  { offset: 60, label: 'GMT+1 · West Africa / CET' },
  { offset: 120, label: 'GMT+2 · Central Africa / EET' },
  { offset: 180, label: 'GMT+3 · East Africa / Moscow' },
  { offset: 210, label: 'GMT+3:30 · Iran' },
  { offset: 240, label: 'GMT+4 · Gulf' },
  { offset: 270, label: 'GMT+4:30 · Afghanistan' },
  { offset: 300, label: 'GMT+5 · Pakistan' },
  { offset: 330, label: 'GMT+5:30 · India' },
  { offset: 345, label: 'GMT+5:45 · Nepal' },
  { offset: 360, label: 'GMT+6 · Bangladesh' },
  { offset: 390, label: 'GMT+6:30 · Myanmar' },
  { offset: 420, label: 'GMT+7 · Southeast Asia' },
  { offset: 480, label: 'GMT+8 · China / Singapore' },
  { offset: 525, label: 'GMT+8:45 · Western Australia' },
  { offset: 540, label: 'GMT+9 · Japan / Korea' },
  { offset: 570, label: 'GMT+9:30 · Central Australia' },
  { offset: 600, label: 'GMT+10 · Eastern Australia' },
  { offset: 630, label: 'GMT+10:30 · Lord Howe Island' },
  { offset: 660, label: 'GMT+11 · Solomon Islands' },
  { offset: 720, label: 'GMT+12 · New Zealand / Fiji' },
  { offset: 765, label: 'GMT+12:45 · Chatham Islands' },
  { offset: 780, label: 'GMT+13 · Tonga' },
  { offset: 840, label: 'GMT+14 · Kiribati' },
];

let currentDay = 1;
let currentSessionIndex = 0;
let currentTzOffset = REFERENCE_TZ_OFFSET;

function parseClock(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function parseOffset(offsetStr) {
  const [h, m] = offsetStr.split(':').map(Number);
  return h * 60 + m;
}

function formatClock(totalMinutes) {
  const normalized = ((totalMinutes % (24 * 60)) + (24 * 60)) % (24 * 60);
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function formatOffsetLabel(offsetMinutes) {
  const sign = offsetMinutes >= 0 ? '+' : '−';
  const abs = Math.abs(offsetMinutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  if (m === 0) return `GMT${sign}${h}`;
  return `GMT${sign}${h}:${String(m).padStart(2, '0')}`;
}

function toUtcMinutes(date, hour, minute, sourceOffset = REFERENCE_TZ_OFFSET) {
  const dayOffset = (date - 26) * 24 * 60;
  return dayOffset + hour * 60 + minute - sourceOffset;
}

function utcToLocalClock(utcMinutes, targetOffset) {
  return formatClock(utcMinutes + targetOffset);
}

function formatSessionRange(startUtc, endUtc, targetOffset) {
  return `${utcToLocalClock(startUtc, targetOffset)} – ${utcToLocalClock(endUtc, targetOffset)}`;
}

function getComputedSessions(offsetMinutes) {
  return sessionBlocks.map((block) => ({
    ...block,
    time: formatSessionRange(
      toUtcMinutes(block.start.date, block.start.hour, block.start.minute),
      toUtcMinutes(block.end.date, block.end.hour, block.end.minute),
      offsetMinutes,
    ),
  }));
}

function getSelectedSession(offsetMinutes = currentTzOffset) {
  const sessions = getComputedSessions(offsetMinutes);
  return sessions[currentSessionIndex] ?? sessions[0];
}

function syncDayTabs(day) {
  document.querySelectorAll('.day-tab').forEach((tab) => {
    const isActive = Number(tab.dataset.day) === day;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });
}

function selectSession(sessionIndex, { scrollToTimetable = true } = {}) {
  const sessions = getComputedSessions(currentTzOffset);
  if (!sessions[sessionIndex]) return;

  currentSessionIndex = sessionIndex;
  currentDay = sessions[sessionIndex].conferenceDay;
  syncDayTabs(currentDay);
  renderSchedule();
  renderTimetable();

  if (scrollToTimetable) {
    document.getElementById('program-timetable')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function offsetToClock(sessionStart, offset) {
  return formatClock(parseClock(sessionStart) + parseOffset(offset));
}

function renderTimezoneOptions() {
  const tzSelect = document.getElementById('tz-select');
  if (!tzSelect) return;

  const detectedOffset = -new Date().getTimezoneOffset();
  const hasDetected = timezones.some((tz) => tz.offset === detectedOffset);

  tzSelect.innerHTML = timezones.map((tz) => {
    const isDetected = tz.offset === detectedOffset;
    const suffix = isDetected ? ' · your timezone' : '';
    return `<option value="${tz.offset}"${isDetected ? ' selected' : ''}>${tz.label}${suffix}</option>`;
  }).join('');

  if (!hasDetected) {
    const detectedLabel = `${formatOffsetLabel(detectedOffset)} · your timezone`;
    const detectedOption = document.createElement('option');
    detectedOption.value = String(detectedOffset);
    detectedOption.textContent = detectedLabel;
    detectedOption.selected = true;
    tzSelect.insertBefore(detectedOption, tzSelect.firstChild);
    currentTzOffset = detectedOffset;
  } else {
    currentTzOffset = detectedOffset;
  }

  if (!tzSelect.value) {
    const fallback = timezones.find((tz) => tz.offset === REFERENCE_TZ_OFFSET);
    tzSelect.value = String(fallback?.offset ?? REFERENCE_TZ_OFFSET);
    currentTzOffset = Number(tzSelect.value);
  }
}

function renderSchedule() {
  const container = document.getElementById('tz-schedule');
  const title = document.getElementById('session-block-title');
  const sessions = getComputedSessions(currentTzOffset);
  if (!container) return;

  if (!sessions.length) {
    if (title) title.textContent = 'Session times';
    container.innerHTML = `
      <li role="listitem" class="session-item session-item--empty">
        <span class="session-item-body">
          <span class="session-item-title">Schedule coming soon</span>
          <span class="session-item-detail">Session blocks will appear here once published.</span>
        </span>
      </li>
    `;
    return;
  }

  if (title) title.textContent = `Session times in ${formatOffsetLabel(currentTzOffset)}`;

  container.innerHTML = sessions.map((session, index) => `
    <li role="listitem">
      <button
        type="button"
        class="session-item${index === currentSessionIndex ? ' session-item--active' : ''}"
        data-session-index="${index}"
        aria-pressed="${index === currentSessionIndex}"
      >
        <time datetime="${session.time.replace(' – ', '/')}">${session.time}</time>
        <span class="session-item-body">
          <span class="session-item-title">${session.title}</span>
          <span class="session-item-detail">${session.detail} · Hosts: ${session.hosts}</span>
        </span>
      </button>
    </li>
  `).join('');

  container.querySelectorAll('.session-item').forEach((button) => {
    button.addEventListener('click', () => {
      selectSession(Number(button.dataset.sessionIndex));
    });
  });
}

function renderTimetable() {
  const tbody = document.getElementById('timetable-body');
  if (!tbody) return;

  const session = getSelectedSession();
  const caption = document.querySelector('.timetable caption');
  const timetableLabel = document.getElementById('timetable-label');

  if (!session) {
    syncDayTabs(currentDay);
    tbody.innerHTML = `
      <tr>
        <td colspan="3">Program segments will appear here once the schedule is published.</td>
      </tr>
    `;
    const labelText = 'Schedule coming soon';
    if (caption) caption.textContent = labelText;
    if (timetableLabel) timetableLabel.textContent = labelText;
    return;
  }

  const sessionStart = session.time.split('–')[0].trim();
  const label = formatOffsetLabel(currentTzOffset);
  currentDay = session.conferenceDay;
  syncDayTabs(currentDay);

  const segments = dayPrograms[currentDay] ?? [];
  tbody.innerHTML = segments.length
    ? segments.map(([offset, segment, desc]) => {
      const clock = offsetToClock(sessionStart, offset);
      return `
    <tr>
      <td><time datetime="${clock}">${clock}</time></td>
      <td>${segment}</td>
      <td>${desc}</td>
    </tr>
  `;
    }).join('')
    : `
      <tr>
        <td colspan="3">Program segments will appear here once the schedule is published.</td>
      </tr>
    `;

  const labelText = `${session.title} · ${label} · starts ${sessionStart}`;

  if (caption) caption.textContent = labelText;
  if (timetableLabel) timetableLabel.textContent = labelText;
}

document.querySelectorAll('.day-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    const day = Number(tab.dataset.day);
    const sessionIndex = sessionBlocks.findIndex((block) => block.conferenceDay === day);
    selectSession(sessionIndex >= 0 ? sessionIndex : 0, { scrollToTimetable: false });
  });
});

const tzSelect = document.getElementById('tz-select');
if (tzSelect) {
  renderTimezoneOptions();
  tzSelect.addEventListener('change', () => {
    currentTzOffset = Number(tzSelect.value);
    renderSchedule();
    renderTimetable();
  });
}

renderSchedule();
renderTimetable();
