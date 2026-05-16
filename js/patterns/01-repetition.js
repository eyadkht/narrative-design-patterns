// Demo: Repetition, 9 small-multiples line charts.
// A segmented control highlights the same year across all charts simultaneously,
// showing how the same shock propagated through every corner of the economy.

const YEARS = Array.from({ length: 18 }, (_, i) => 2005 + i); // 2005–2022

// Economic metrics, values aligned to YEARS array.
// Two clear shared shocks: 2009 (financial crisis) and 2020 (pandemic).
const SERIES = [
  {
    title: 'GDP Growth (%)',
    values: [3.8, 4.0, 4.2, 1.8, -1.7, 5.4, 4.3, 2.9, 2.5, 2.6, 3.1, 2.9, 3.0, 2.9, -0.1, -3.1, 6.0, 3.2],
  },
  {
    title: 'Unemployment (%)',
    values: [5.1, 4.6, 4.6, 5.8, 9.3, 9.6, 8.9, 8.1, 7.4, 6.2, 5.3, 4.9, 4.4, 3.9, 3.5, 8.1, 5.4, 3.7],
  },
  {
    title: 'Stock Market',
    values: [100, 116, 135, 90, 68, 87, 105, 122, 135, 155, 185, 210, 240, 275, 295, 230, 335, 385],
  },
  {
    title: 'Oil Price ($/bbl)',
    values: [54, 65, 72, 98, 62, 80, 111, 111, 108, 99, 53, 44, 54, 71, 64, 42, 70, 101],
  },
  {
    title: 'Consumer Confidence',
    values: [100, 105, 103, 82, 56, 69, 79, 73, 75, 90, 97, 104, 106, 113, 115, 91, 108, 107],
  },
  {
    title: 'Trade Volume (% chg)',
    values: [7.8, 9.1, 7.2, 2.9, -10.4, 12.5, 7.0, 2.9, 3.1, 3.5, 2.8, 2.3, 5.0, 3.5, 0.9, -5.4, 10.1, 3.0],
  },
  {
    title: 'Manufacturing (PMI)',
    values: [52, 54, 53, 48, 39, 52, 54, 51, 50, 52, 51, 50, 53, 52, 50, 47, 55, 49],
  },
  {
    title: 'Housing Starts (k)',
    values: [2068, 1801, 1355, 906, 554, 587, 609, 780, 928, 1003, 1108, 1175, 1282, 1254, 1291, 991, 1380, 1550],
  },
  {
    title: 'Business Investment',
    values: [6.7, 7.1, 6.4, 0.8, -15.1, 5.8, 7.7, 8.4, 4.1, 5.9, 2.3, -0.5, 4.4, 4.5, 2.1, -6.3, 7.5, 4.1],
  },
];

// Highlight configs: { yearIndex, color }
const HIGHLIGHTS = {
  none:   null,
  crisis: { yearIndex: 4, label: '2009' },  // financial crisis bottom
  covid:  { yearIndex: 15, label: '2020' }, // pandemic
};

// ── SVG layout ──────────────────────────────────────────────────────
const VW = 160, VH = 80;
const PAD = { top: 6, right: 4, bottom: 18, left: 8 };
const CW = VW - PAD.left - PAD.right;   // 148
const CH = VH - PAD.top  - PAD.bottom;  // 56

const N = YEARS.length; // 18
const STEP = CW / (N - 1);

function xAt(i) { return PAD.left + i * STEP; }

function buildYScale(values) {
  const minV = Math.min(...values), maxV = Math.max(...values);
  const pad  = (maxV - minV) * 0.12;
  const lo = minV - pad, hi = maxV + pad;
  return v => PAD.top + CH - ((v - lo) / (hi - lo)) * CH;
}

// ── DOM + SVG helpers ───────────────────────────────────────────────
const NS = 'http://www.w3.org/2000/svg';

function svgEl(tag, attrs = {}) {
  const n = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  return n;
}

// ── Build one mini-chart ────────────────────────────────────────────
function buildMiniChart(series) {
  const wrap = document.createElement('div');
  wrap.className = 'mini-chart';

  const titleEl = document.createElement('p');
  titleEl.className = 'mini-chart-title';
  titleEl.textContent = series.title;
  wrap.appendChild(titleEl);

  const svg = svgEl('svg', { viewBox: `0 0 ${VW} ${VH}`, role: 'img', 'aria-label': series.title });

  const yAt = buildYScale(series.values);
  const zeroY = yAt(0);

  // Zero baseline (only if range crosses zero)
  const minV = Math.min(...series.values);
  const maxV = Math.max(...series.values);
  if (minV < 0 && maxV > 0) {
    svg.appendChild(svgEl('line', {
      x1: PAD.left, y1: zeroY.toFixed(1),
      x2: PAD.left + CW, y2: zeroY.toFixed(1),
      stroke: 'var(--rule)', 'stroke-width': 0.5, 'stroke-dasharray': '2 3',
    }));
  }

  // Highlight bands (one per event, initially hidden)
  for (const [key, cfg] of Object.entries(HIGHLIGHTS)) {
    if (!cfg) continue;
    const x = xAt(cfg.yearIndex);
    svg.appendChild(svgEl('rect', {
      class: `hband hband-${key}`,
      x: (x - STEP * 0.6).toFixed(1), y: PAD.top,
      width: (STEP * 1.2).toFixed(1), height: CH,
      fill: 'var(--highlight)',
      opacity: 0,
    }));
  }

  // Data line
  const pts = series.values.map((v, i) => `${xAt(i).toFixed(1)},${yAt(v).toFixed(1)}`).join(' ');
  svg.appendChild(svgEl('polyline', {
    points: pts,
    fill: 'none',
    stroke: 'var(--cat-argumentation)',
    'stroke-width': 1.5,
    'stroke-linejoin': 'round',
    'stroke-linecap': 'round',
  }));

  // X-axis rule
  svg.appendChild(svgEl('line', {
    x1: PAD.left, y1: PAD.top + CH,
    x2: PAD.left + CW, y2: PAD.top + CH,
    stroke: 'var(--rule-2)', 'stroke-width': 0.75,
  }));

  // Year ticks: 2005, 2010, 2015, 2020
  [2005, 2010, 2015, 2020].forEach(yr => {
    const i = YEARS.indexOf(yr);
    if (i < 0) return;
    const x = xAt(i);
    svg.appendChild(svgEl('line', {
      x1: x.toFixed(1), y1: PAD.top + CH,
      x2: x.toFixed(1), y2: PAD.top + CH + 3,
      stroke: 'var(--rule-2)', 'stroke-width': 0.75,
    }));
    const label = svgEl('text', {
      x: x.toFixed(1), y: VH - 3,
      'text-anchor': 'middle', 'font-size': '7',
      fill: 'var(--ink-3)', 'font-family': 'var(--font-mono)',
    });
    label.textContent = yr;
    svg.appendChild(label);
  });

  wrap.appendChild(svg);
  return wrap;
}

// ── Render grid ─────────────────────────────────────────────────────
const grid = document.getElementById('small-multiples');
SERIES.forEach(s => grid.appendChild(buildMiniChart(s)));

// ── Toggle logic ────────────────────────────────────────────────────
let activeHighlight = 'none';

const HINT_TEXT = {
  none:   '',
  crisis: 'Same year, nine charts, the 2008–09 crash reached everywhere',
  covid:  'Same year, nine charts, the 2020 pandemic hit every metric at once',
};

const hintEl = document.getElementById('highlight-desc');

function applyHighlight(key) {
  activeHighlight = key;
  if (hintEl) hintEl.textContent = HINT_TEXT[key] ?? '';

  for (const [hKey, cfg] of Object.entries(HIGHLIGHTS)) {
    if (!cfg) continue;
    const bands = document.querySelectorAll(`.hband-${hKey}`);
    const target = key === hKey ? 0.25 : 0;
    bands.forEach(b => {
      b.style.transition = 'opacity 250ms';
      b.style.opacity = target;
    });
  }
}

document.querySelectorAll('.segmented button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.segmented button').forEach(b => b.setAttribute('aria-pressed', 'false'));
    btn.setAttribute('aria-pressed', 'true');
    applyHighlight(btn.dataset.highlight);
  });
});

// Initial state
applyHighlight('none');
