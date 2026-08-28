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

// Program data
const schedules = {
  gmt7: [
    { time: '14:00 – 21:00', title: 'Day 1 · Session 1', detail: 'Sep 26 · Asia, Middle East & Africa', hosts: 'Jules Kitto-Astrop & Dominique Chloe Gwyneth Djamal', upcoming: true },
    { time: '21:00 – 02:00', title: 'Day 1 · Session 2', detail: 'Sep 26–27 · Americas & West Africa', hosts: 'Asomugha Zingisa' },
    { time: '21:00 – 02:00', title: 'Day 2 · Session 1', detail: 'Sep 27–28 · Americas & West Africa', hosts: 'Jules Kitto-Astrop' },
    { time: '02:00 – 09:00', title: 'Day 2 · Session 2', detail: 'Sep 28 · Asia & Pacific', hosts: 'Dominique Chloe Gwyneth Djamal' },
  ],
  gmt1: [
    { time: '08:00 – 14:00', title: 'Day 1 · Session 1', detail: 'Sep 26 · Asia, Middle East & Africa', hosts: 'Jules Kitto-Astrop & Dominique Chloe Gwyneth Djamal', upcoming: true },
    { time: '14:00 – 20:00', title: 'Day 1 · Session 2', detail: 'Sep 26 · Americas & West Africa', hosts: 'Asomugha Zingisa' },
    { time: '14:00 – 20:00', title: 'Day 2 · Session 1', detail: 'Sep 27 · Americas & West Africa', hosts: 'Jules Kitto-Astrop' },
    { time: '20:00 – 02:00', title: 'Day 2 · Session 2', detail: 'Sep 27–28 · Asia & Pacific', hosts: 'Dominique Chloe Gwyneth Djamal' },
  ],
  gmte4: [
    { time: '03:00 – 09:00', title: 'Day 1 · Session 1', detail: 'Sep 26 · Asia, Middle East & Africa', hosts: 'Jules Kitto-Astrop & Dominique Chloe Gwyneth Djamal', upcoming: true },
    { time: '09:00 – 15:00', title: 'Day 1 · Session 2', detail: 'Sep 26 · Americas & West Africa', hosts: 'Asomugha Zingisa' },
    { time: '09:00 – 15:00', title: 'Day 2 · Session 1', detail: 'Sep 27 · Americas & West Africa', hosts: 'Jules Kitto-Astrop' },
    { time: '15:00 – 21:00', title: 'Day 2 · Session 2', detail: 'Sep 27 · Asia & Pacific', hosts: 'Dominique Chloe Gwyneth Djamal' },
  ],
  gmt530: [
    { time: '12:30 – 18:30', title: 'Day 1 · Session 1', detail: 'Sep 26 · Asia, Middle East & Africa', hosts: 'Jules Kitto-Astrop & Dominique Chloe Gwyneth Djamal', upcoming: true },
    { time: '18:30 – 00:30', title: 'Day 1 · Session 2', detail: 'Sep 26–27 · Americas & West Africa', hosts: 'Asomugha Zingisa' },
    { time: '18:30 – 00:30', title: 'Day 2 · Session 1', detail: 'Sep 27–28 · Americas & West Africa', hosts: 'Jules Kitto-Astrop' },
    { time: '00:30 – 06:30', title: 'Day 2 · Session 2', detail: 'Sep 28 · Asia & Pacific', hosts: 'Dominique Chloe Gwyneth Djamal' },
  ],
  gmt0: [
    { time: '07:00 – 13:00', title: 'Day 1 · Session 1', detail: 'Sep 26 · Asia, Middle East & Africa', hosts: 'Jules Kitto-Astrop & Dominique Chloe Gwyneth Djamal', upcoming: true },
    { time: '13:00 – 19:00', title: 'Day 1 · Session 2', detail: 'Sep 26 · Americas & West Africa', hosts: 'Asomugha Zingisa' },
    { time: '13:00 – 19:00', title: 'Day 2 · Session 1', detail: 'Sep 27 · Americas & West Africa', hosts: 'Jules Kitto-Astrop' },
    { time: '19:00 – 01:00', title: 'Day 2 · Session 2', detail: 'Sep 27–28 · Asia & Pacific', hosts: 'Dominique Chloe Gwyneth Djamal' },
  ],
};

const tzLabels = {
  gmt7: 'GMT+7',
  gmt1: 'GMT+1',
  gmte4: 'GMT−4',
  gmt530: 'GMT+5:30',
  gmt0: 'GMT+0',
};

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

let currentDay = 1;
let currentTz = 'gmt7';

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

/** Session 1 start time for the selected day in the chosen timezone */
function getSessionStart(tz, day) {
  const sessions = schedules[tz];
  if (!sessions) return '00:00';
  const idx = day === 1 ? 0 : 2;
  return sessions[idx].time.split('–')[0].trim();
}

function offsetToClock(sessionStart, offset) {
  return formatClock(parseClock(sessionStart) + parseOffset(offset));
}

function renderSchedule() {
  const container = document.getElementById('tz-schedule');
  const title = document.getElementById('session-block-title');
  if (!container || !schedules[currentTz]) return;

  if (title) title.textContent = `Session times in ${tzLabels[currentTz]}`;

  container.innerHTML = schedules[currentTz].map((s) => `
    <li class="${s.upcoming ? 'upcoming' : ''}">
      <time>${s.time}</time>
      <div>
        <h4>${s.title}</h4>
        <p>${s.detail} · Hosts: ${s.hosts}</p>
      </div>
    </li>
  `).join('');
}

function renderTimetable() {
  const tbody = document.getElementById('timetable-body');
  if (!tbody) return;

  const sessionStart = getSessionStart(currentTz, currentDay);
  const label = tzLabels[currentTz];

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
  const labelText = `Day ${currentDay} program · ${label} · session starts ${sessionStart}`;

  if (caption) caption.textContent = labelText;
  if (timetableLabel) timetableLabel.textContent = labelText;
}

document.querySelectorAll('.day-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.day-tab').forEach((t) => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    currentDay = Number(tab.dataset.day);
    renderTimetable();
  });
});

const tzSelect = document.getElementById('tz-select');
if (tzSelect) {
  tzSelect.addEventListener('change', () => {
    currentTz = tzSelect.value;
    renderSchedule();
    renderTimetable();
  });
}

renderSchedule();
renderTimetable();

// Registration form
const form = document.querySelector('.register-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = 'Registered — check your email';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = original;
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}
