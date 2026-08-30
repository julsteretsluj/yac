const YAC_PEOPLE = {
  'jules-kitto-astrop': {
    name: 'Jules Kitto-Astrop',
    bio: 'Jules Kitto-Astrop is a student leader, designer, developer, and youth advocate who combines creativity with a drive to make an impact. Through projects spanning youth leadership, technology, design, MUN, and international collaboration, Jules focuses on creating opportunities for young people to connect, contribute, and have their perspectives heard. As part of YAC, Jules brings that same energy to building a conference that is genuinely created by young people, for young people.',
  },
  'katarina-bekovic': {
    name: 'Katarina Beković',
    bio: 'Katarina is a Serbian youth activist, journalist, and media specialist. Since her teenage days she has been a voice of Serbian youth in over 40 conferences in Europe. In April 2025 she founded Diplomatikum, an NGO aimed to help youth from WB6 countries to get equal opportunities and education in international relations. She is currently serving her home country as its Ambassador to the International Organization of Youth.',
  },
  'abgeeta-mekel': {
    name: 'Abgeeta Mekel',
    bio: 'Abgeeta is currently working on projects like banning forced conversions, forced interfaith marriages, legal safety, quality education for minority students, and economic stability of the minority in Pakistan.',
  },
  'ogbobi-favour': {
    name: 'Ogbobi Favour',
    bio: [
      'Favour Ogbobi is a public speaker and media and communications professional focused on youth empowerment, human rights, personal development, and meaningful conversations. Through speaking, media, content creation, and youth-focused initiatives, she uses communication and storytelling to encourage young people to find their voices, embrace opportunities, and contribute meaningfully to their communities.',
      'She is also the founder of Insight by Favour, a platform created to spark conversations, share insights, and inspire personal growth among young people.',
      'Favour believes that every young person has a voice worth hearing and the ability to create meaningful change, regardless of where they come from.',
    ],
  },
};

const FOUNDER_IDS = ['jules-kitto-astrop', 'katarina-bekovic', 'abgeeta-mekel'];

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function getBioParagraphs(person) {
  return Array.isArray(person.bio) ? person.bio : [person.bio];
}

function createBioMarkup(personId, variant) {
  const person = YAC_PEOPLE[personId];
  if (!person) return '';

  const paragraphs = getBioParagraphs(person).map((text) => `<p>${escapeHtml(text)}</p>`).join('');

  if (variant === 'speaker' || variant === 'founder') {
    const className = variant === 'speaker' ? 'speaker-bio' : 'founder-bio';
    return `<div class="${className}">${paragraphs}</div>`;
  }

  const paragraphsList = getBioParagraphs(person);
  if (paragraphsList.length === 1) {
    return `<p class="host-bio">${escapeHtml(paragraphsList[0])}</p>`;
  }

  return `<div class="host-bio host-bio--stacked">${paragraphs}</div>`;
}

function hydratePersonBios() {
  document.querySelectorAll('[data-person-bio]').forEach((slot) => {
    const personId = slot.getAttribute('data-person-bio');
    const variant = slot.getAttribute('data-bio-variant') || 'host';
    slot.outerHTML = createBioMarkup(personId, variant);
  });
}

function renderFoundersRoster(container) {
  container.innerHTML = FOUNDER_IDS.map((personId) => {
    const person = YAC_PEOPLE[personId];
    return `
      <article class="founder-entry">
        <h2 class="founder-name">${escapeHtml(person.name)}</h2>
        <p class="founder-label">Co-founder</p>
        ${createBioMarkup(personId, 'founder')}
      </article>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  hydratePersonBios();

  const roster = document.getElementById('founders-roster');
  if (roster) renderFoundersRoster(roster);
});
