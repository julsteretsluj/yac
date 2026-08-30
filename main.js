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

// Upcoming conference editions (bi-monthly, third weekend)
const upcomingConferences = [
  {
    start: '2026-09-26',
    end: '2026-09-27',
    dates: '26—27 Sep 2026',
    theme: 'Human Rights',
    tagline: 'Youth stances on human rights, from the classroom to the global stage',
    status: 'open',
    statusLabel: 'Registration open',
    accent: 'pink',
    cta: { href: '#register', label: 'Register ↗' },
  },
  {
    start: '2026-11-28',
    end: '2026-11-29',
    dates: '28—29 Nov 2026',
    theme: 'Climate Action',
    tagline: 'Youth-led solutions for a changing planet',
    status: 'soon',
    statusLabel: 'Save the date',
    accent: 'blue',
    cta: { href: '#upcoming', label: 'Save the date →' },
  },
  {
    start: '2027-01',
    end: '2027-01',
    dates: 'January 2027',
    theme: 'Education & Opportunity',
    tagline: 'Rethinking access, equity, and the future of learning',
    status: 'planned',
    statusLabel: 'Theme confirmed',
    accent: 'purple',
    cta: { href: '#upcoming', label: 'Save the date →' },
  },
  {
    start: '2027-03-20',
    end: '2027-03-21',
    dates: '20—21 Mar 2027',
    theme: 'Democracy & Civic Life',
    tagline: 'Young people shaping institutions and public discourse',
    status: 'planned',
    statusLabel: 'Theme confirmed',
    accent: 'yellow',
    cta: { href: '#upcoming', label: 'Save the date →' },
  },
  {
    start: '2027-05-15',
    end: '2027-05-16',
    dates: '15—16 May 2027',
    theme: 'Global Health & Wellbeing',
    tagline: 'SDGs, mental health, and what it means to thrive',
    status: 'tba',
    statusLabel: 'Details forthcoming',
    accent: 'pink',
    cta: { href: '#upcoming', label: 'Details forthcoming' },
  },
  {
    start: '2027-07-17',
    end: '2027-07-18',
    dates: '17—18 Jul 2027',
    theme: 'Digital Futures',
    tagline: 'Technology, media, and ethics in a connected world',
    status: 'tba',
    statusLabel: 'Details forthcoming',
    accent: 'blue',
    cta: { href: '#upcoming', label: 'Details forthcoming' },
  },
];

function renderEditionCards() {
  const container = document.getElementById('edition-cards');
  if (!container) return;

  container.innerHTML = upcomingConferences.map((edition) => `
    <article class="edition-card edition-card--${edition.accent}${edition.status === 'open' ? ' edition-card--featured' : ''}" role="listitem">
      <div class="edition-card-top">
        <time datetime="${edition.start}/${edition.end}">${edition.dates}</time>
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

// Program — canonical schedule in GMT+7, converted to any UTC offset
const REFERENCE_TZ_OFFSET = 420; // GMT+7

const sessionBlocks = [
  {
    conferenceDay: 1,
    title: 'Day 1 · Session 1',
    detail: 'Sep 26 · Asia, Middle East & Africa',
    hosts: 'Jules Kitto-Astrop & Dominique Chloe Gwyneth Djamal',
    upcoming: true,
    start: { date: 26, hour: 14, minute: 0 },
    end: { date: 26, hour: 21, minute: 0 },
  },
  {
    conferenceDay: 1,
    title: 'Day 1 · Session 2',
    detail: 'Sep 26–27 · Americas & West Africa',
    hosts: 'Asomugha Zingisa',
    start: { date: 26, hour: 21, minute: 0 },
    end: { date: 27, hour: 2, minute: 0 },
  },
  {
    conferenceDay: 2,
    title: 'Day 2 · Session 1',
    detail: 'Sep 27–28 · Americas & West Africa',
    hosts: 'Jules Kitto-Astrop',
    start: { date: 27, hour: 21, minute: 0 },
    end: { date: 28, hour: 2, minute: 0 },
  },
  {
    conferenceDay: 2,
    title: 'Day 2 · Session 2',
    detail: 'Sep 28 · Asia & Pacific',
    hosts: 'Dominique Chloe Gwyneth Djamal',
    start: { date: 28, hour: 2, minute: 0 },
    end: { date: 28, hour: 9, minute: 0 },
  },
];

const dayPrograms = {
  1: [
    ['0:00', 'Opening & welcome', 'Moderator introduction, icebreaker, objective setting'],
    ['0:30', 'Speaker masterclass', 'Keynote + live Q&A'],
    ['1:00', 'Q&A + breakout workshop', 'Activity under speaker oversight'],
    ['1:30', 'Break', 'Rest & leisure'],
    ['2:00', 'Breakout workshop', 'Activity under speaker oversight'],
    ['2:30', 'Speaker masterclass', 'Keynote + live Q&A'],
    ['3:00', 'Speaker masterclass', 'Keynote + live Q&A'],
    ['3:30', 'Break', 'Rest & leisure'],
    ['4:00', 'Speaker masterclass', 'Keynote + live Q&A'],
    ['4:30', 'Presentations', 'Selected solutions shown to full conference'],
    ['5:15', 'Awards', 'Outstanding contributor recognition'],
    ['5:45', 'Closing', 'Wrap-up, feedback, certificate preview'],
  ],
  2: [
    ['0:00', 'Opening & synthesis', 'Day 1 recap, setting the stage'],
    ['0:30', 'Speaker masterclass', 'Keynote + live Q&A'],
    ['1:00', 'Breakout workshop', 'Activity under speaker oversight'],
    ['1:30', 'Break', 'Rest & leisure'],
    ['2:00', 'Breakout workshop', 'Activity under speaker oversight'],
    ['2:30', 'Break & icebreakers', 'Rest or committee games'],
    ['3:30', 'Open panel debate', 'Floor discussion on adopted resolutions'],
    ['5:15', 'Closing keynote', 'Final remarks'],
    ['5:45', 'Awards & farewell', 'Certificates, feedback, closing'],
  ],
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
  const sessionStart = session.time.split('–')[0].trim();
  const label = formatOffsetLabel(currentTzOffset);
  currentDay = session.conferenceDay;
  syncDayTabs(currentDay);

  tbody.innerHTML = dayPrograms[currentDay].map(([offset, segment, desc]) => {
    const clock = offsetToClock(sessionStart, offset);
    return `
    <tr>
      <td><time datetime="${clock}">${clock}</time></td>
      <td>${segment}</td>
      <td>${desc}</td>
    </tr>
  `;
  }).join('');

  const caption = document.querySelector('.timetable caption');
  const timetableLabel = document.getElementById('timetable-label');
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
