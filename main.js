// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const header = document.querySelector('.site-header');

if (toggle) {
  toggle.addEventListener('click', () => {
    const open = header.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', open);
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      header.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Timezone schedule data from conference planning doc
const schedules = {
  gmt7: [
    { time: '14:00 – 21:00', title: 'Day 1 · Session 1', date: 'Sep 26 · Asia, Middle East & Africa focus', hosts: 'Hosts: Jules Kitto-Astrop & Dominique Chloe Gwyneth Djamal', upcoming: true },
    { time: '21:00 – 02:00', title: 'Day 1 · Session 2', date: 'Sep 26–27 · Americas & West Africa focus', hosts: 'Host: Asomugha Zingisa' },
    { time: '21:00 – 02:00', title: 'Day 2 · Session 1', date: 'Sep 27–28 · Americas & West Africa focus', hosts: 'Host: Jules Kitto-Astrop' },
    { time: '02:00 – 09:00', title: 'Day 2 · Session 2', date: 'Sep 28 · Asia & Pacific focus', hosts: 'Host: Dominique Chloe Gwyneth Djamal' },
  ],
  gmt1: [
    { time: '08:00 – 14:00', title: 'Day 1 · Session 1', date: 'Sep 26 · Asia, Middle East & Africa focus', hosts: 'Hosts: Jules Kitto-Astrop & Dominique Chloe Gwyneth Djamal', upcoming: true },
    { time: '14:00 – 20:00', title: 'Day 1 · Session 2', date: 'Sep 26 · Americas & West Africa focus', hosts: 'Host: Asomugha Zingisa' },
    { time: '14:00 – 20:00', title: 'Day 2 · Session 1', date: 'Sep 27 · Americas & West Africa focus', hosts: 'Host: Jules Kitto-Astrop' },
    { time: '20:00 – 02:00', title: 'Day 2 · Session 2', date: 'Sep 27–28 · Asia & Pacific focus', hosts: 'Host: Dominique Chloe Gwyneth Djamal' },
  ],
  gmte4: [
    { time: '03:00 – 09:00', title: 'Day 1 · Session 1', date: 'Sep 26 · Asia, Middle East & Africa focus', hosts: 'Hosts: Jules Kitto-Astrop & Dominique Chloe Gwyneth Djamal', upcoming: true },
    { time: '09:00 – 15:00', title: 'Day 1 · Session 2', date: 'Sep 26 · Americas & West Africa focus', hosts: 'Host: Asomugha Zingisa' },
    { time: '09:00 – 15:00', title: 'Day 2 · Session 1', date: 'Sep 27 · Americas & West Africa focus', hosts: 'Host: Jules Kitto-Astrop' },
    { time: '15:00 – 21:00', title: 'Day 2 · Session 2', date: 'Sep 27 · Asia & Pacific focus', hosts: 'Host: Dominique Chloe Gwyneth Djamal' },
  ],
  gmt530: [
    { time: '12:30 – 18:30', title: 'Day 1 · Session 1', date: 'Sep 26 · Asia, Middle East & Africa focus', hosts: 'Hosts: Jules Kitto-Astrop & Dominique Chloe Gwyneth Djamal', upcoming: true },
    { time: '18:30 – 00:30', title: 'Day 1 · Session 2', date: 'Sep 26–27 · Americas & West Africa focus', hosts: 'Host: Asomugha Zingisa' },
    { time: '18:30 – 00:30', title: 'Day 2 · Session 1', date: 'Sep 27–28 · Americas & West Africa focus', hosts: 'Host: Jules Kitto-Astrop' },
    { time: '00:30 – 06:30', title: 'Day 2 · Session 2', date: 'Sep 28 · Asia & Pacific focus', hosts: 'Host: Dominique Chloe Gwyneth Djamal' },
  ],
  gmt0: [
    { time: '07:00 – 13:00', title: 'Day 1 · Session 1', date: 'Sep 26 · Asia, Middle East & Africa focus', hosts: 'Hosts: Jules Kitto-Astrop & Dominique Chloe Gwyneth Djamal', upcoming: true },
    { time: '13:00 – 19:00', title: 'Day 1 · Session 2', date: 'Sep 26 · Americas & West Africa focus', hosts: 'Host: Asomugha Zingisa' },
    { time: '13:00 – 19:00', title: 'Day 2 · Session 1', date: 'Sep 27 · Americas & West Africa focus', hosts: 'Host: Jules Kitto-Astrop' },
    { time: '19:00 – 01:00', title: 'Day 2 · Session 2', date: 'Sep 27–28 · Asia & Pacific focus', hosts: 'Host: Dominique Chloe Gwyneth Djamal' },
  ],
};

function renderSchedule(tz) {
  const container = document.getElementById('tz-schedule');
  if (!container || !schedules[tz]) return;

  container.innerHTML = schedules[tz].map((s) => `
    <li class="timeline-item${s.upcoming ? ' timeline-item--upcoming' : ''}">
      <time>${s.time}</time>
      <div>
        <h3>${s.title}</h3>
        <p>${s.date}</p>
        <p class="timeline-hosts">${s.hosts}</p>
      </div>
      ${s.upcoming ? '<span class="badge">Upcoming</span>' : ''}
    </li>
  `).join('');
}

document.querySelectorAll('.tz-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tz-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderSchedule(btn.dataset.tz);
  });
});

// Registration form — demo handler
const form = document.querySelector('.register-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'You\'re on the list!';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}
