// ── Hero dot-grid ──────────────────────────────────────────────────
const CAT_COLORS = {
  argumentation: 'var(--cat-argumentation)',
  engagement:    'var(--cat-engagement)',
  flow:          'var(--cat-flow)',
  emotion:       'var(--cat-emotion)',
  framing:       'var(--cat-framing)',
};

function buildHeroDots() {
  const g = document.getElementById('hero-dots');
  if (!g) return;
  const cx = 160, cy = 160, r = 148;
  const cols = 8, rows = 8, spacing = 38;
  const offsetX = cx - ((cols - 1) * spacing) / 2;
  const offsetY = cy - ((rows - 1) * spacing) / 2;
  const catIds = Object.keys(CAT_COLORS);
  const COLOR_RATIO = 0.25;
  let catIndex = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = offsetX + col * spacing;
      const y = offsetY + row * spacing;
      if ((x - cx) ** 2 + (y - cy) ** 2 > (r - 10) ** 2) continue;
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', x);
      circle.setAttribute('cy', y);
      circle.setAttribute('r', '9');
      if (Math.random() < COLOR_RATIO) {
        const color = CAT_COLORS[catIds[catIndex % catIds.length]];
        circle.setAttribute('fill', color);
        circle.setAttribute('opacity', '0.9');
        catIndex++;
      } else {
        circle.setAttribute('fill', 'var(--ink)');
        circle.setAttribute('opacity', '0.85');
      }
      g.appendChild(circle);
    }
  }
}

// ── Category chip row ──────────────────────────────────────────────
function buildChips() {
  const row = document.getElementById('chip-row');
  if (!row) return;

  CATEGORIES.forEach(cat => {
    const count = PATTERNS.filter(p => p.categories[0] === cat.id).length;
    const a = document.createElement('a');
    a.href = `#cat-${cat.id}`;
    a.className = 'chip';
    a.setAttribute('data-cat', cat.id);
    a.innerHTML = `
      <span class="swatch" aria-hidden="true"></span>
      ${cat.label}
      <span class="count">${count}</span>
    `;
    row.appendChild(a);
  });
}

// ── Card HTML ──────────────────────────────────────────────────────
function cardHTML(p) {
  const tags = p.categories.map(c => {
    const cat = CATEGORIES.find(x => x.id === c);
    return `<span class="tag" data-cat="${c}">${cat.label}</span>`;
  }).join('');

  return `
    <a href="patterns/${p.id}.html" class="card" aria-label="${p.number} ${p.title}">
      <div class="card-illus" aria-hidden="true">${p.illus}</div>
      <div class="card-body">
        <div class="card-tags tag-row">${tags}</div>
        <h3 class="card-title">${p.title}</h3>
        <p class="card-short">${p.short}</p>
        <div class="card-footer">
          <span class="mono">${p.number}</span>
          <span class="card-arrow" aria-hidden="true">→</span>
        </div>
      </div>
    </a>
  `;
}

// ── Category sections ──────────────────────────────────────────────
function buildSections() {
  const container = document.getElementById('pattern-sections');
  if (!container) return;

  const catNumbers = ['01', '02', '03', '04', '05'];

  CATEGORIES.forEach((cat, i) => {
    const patterns = PATTERNS.filter(p => p.categories[0] === cat.id);

    const section = document.createElement('section');
    section.className = 'cat-section';
    section.setAttribute('data-cat', cat.id);
    section.id = `cat-${cat.id}`;

    section.innerHTML = `
      <div class="container">
        <header>
          <p class="cat-number">${catNumbers[i]}</p>
          <div>
            <h2>
              ${cat.label}
              <span class="count-pill">${patterns.length} pattern${patterns.length !== 1 ? 's' : ''}</span>
            </h2>
            <p class="cat-blurb">${cat.blurb}</p>
          </div>
        </header>
        <div class="cards">
          ${patterns.map(cardHTML).join('')}
        </div>
      </div>
    `;

    container.appendChild(section);
  });
}

// ── Init ───────────────────────────────────────────────────────────
buildHeroDots();
buildChips();
buildSections();
