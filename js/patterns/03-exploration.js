// Demo: Exploration pattern, horizontal bar chart with FLIP reorder.
// Three views (Region / Duration / Rating) re-sort 6 cities; bars
// animate to new positions using the FLIP technique.

const DATA = [
  { name: 'Tokyo',    region: 'Asia',     duration: 55, rating: 4.5 },
  { name: 'Seoul',    region: 'Asia',     duration: 50, rating: 4.3 },
  { name: 'London',   region: 'Europe',   duration: 45, rating: 4.0 },
  { name: 'Paris',    region: 'Europe',   duration: 35, rating: 4.2 },
  { name: 'New York', region: 'Americas', duration: 40, rating: 3.5 },
  { name: 'Chicago',  region: 'Americas', duration: 30, rating: 3.8 },
];

const REGION_ORDER = ['Asia', 'Europe', 'Americas'];

const REGION_COLOR = {
  Asia:     'var(--cat-emotion)',
  Europe:   'var(--cat-engagement)',
  Americas: 'var(--cat-argumentation)',
};

const VIEWS = {
  category: {
    sort:  (a, b) => REGION_ORDER.indexOf(a.region) - REGION_ORDER.indexOf(b.region),
    width: d => (d.duration / 60) * 100,  // still show duration as bar width
    color: d => REGION_COLOR[d.region],
    value: d => d.region,
    desc:  'Grouped by world region, bar width = avg commute time',
    legend: REGION_ORDER.map(r => ({ label: r, color: REGION_COLOR[r] })),
  },
  duration: {
    sort:  (a, b) => b.duration - a.duration,
    width: d => (d.duration / 60) * 100,
    color: () => 'var(--cat-flow)',
    value: d => `${d.duration} min`,
    desc:  'Sorted by commute duration, longest first',
    legend: [],
  },
  rating: {
    sort:  (a, b) => b.rating - a.rating,
    width: d => ((d.rating - 3) / 2) * 100,  // normalise 3.0–5.0
    color: () => 'var(--cat-emotion)',
    value: d => `★ ${d.rating}`,
    desc:  'Sorted by transit satisfaction rating',
    legend: [],
  },
};

const chart  = document.getElementById('bar-chart');
const legend = document.getElementById('chart-legend');
const desc   = document.getElementById('view-desc');

// ── FLIP reorder ────────────────────────────────────────────────────
function flip(rows, update) {
  // First: snapshot positions
  const firsts = new Map();
  rows.forEach(el => firsts.set(el.dataset.name, el.getBoundingClientRect().top));

  update();

  // Last: new positions; invert then play
  chart.querySelectorAll('.bar-row').forEach(el => {
    const first = firsts.get(el.dataset.name);
    if (first === undefined) return;
    const last = el.getBoundingClientRect().top;
    const dy = first - last;
    if (dy === 0) return;
    el.style.transition = 'none';
    el.style.transform = `translateY(${dy}px)`;
    // double rAF ensures the browser has applied the style before removing it
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.transition = 'transform 400ms cubic-bezier(.2,.6,.2,1)';
      el.style.transform  = '';
    }));
  });
}

// ── Render ──────────────────────────────────────────────────────────
function render(viewId, animate) {
  const cfg    = VIEWS[viewId];
  const sorted = [...DATA].sort(cfg.sort);

  const existing = [...chart.querySelectorAll('.bar-row')];

  const update = () => {
    chart.innerHTML = '';
    sorted.forEach(d => {
      const row = document.createElement('div');
      row.className   = 'bar-row';
      row.dataset.name = d.name;

      const w = cfg.width(d).toFixed(1);
      row.innerHTML = `
        <span class="bar-name">${d.name}</span>
        <div class="bar-track">
          <div class="bar-fill" style="width:${w}%;background:${cfg.color(d)}"></div>
        </div>
        <span class="bar-value">${cfg.value(d)}</span>
      `;
      chart.appendChild(row);
    });
  };

  if (animate && existing.length) {
    flip(existing, update);
  } else {
    update();
  }

  // Description
  desc.textContent = cfg.desc;

  // Legend
  legend.innerHTML = cfg.legend.map(l => `
    <div class="legend-item">
      <span class="legend-dot" style="background:${l.color}"></span>
      ${l.label}
    </div>
  `).join('');
}

// ── Controls ────────────────────────────────────────────────────────
document.querySelectorAll('.segmented button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.segmented button').forEach(b => b.setAttribute('aria-pressed', 'false'));
    btn.setAttribute('aria-pressed', 'true');
    render(btn.dataset.view, true);
  });
});

// Initial render (no animation)
render('category', false);
