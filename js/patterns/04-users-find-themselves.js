// Demo: Users Find Themselves, scatter of work hours vs life satisfaction.
// Three dropdowns (region, age group, weekly hours) position a "You" dot
// among 70 background data points. The moment the dot lands, the abstract
// becomes personal.

// ── Background data (70 pts) ────────────────────────────────────────
// Each point: { x: weekly hours, y: satisfaction 1–10, r: region }
const DOTS = [
  // Europe, shorter hours, higher satisfaction
  {x:28,y:8.5,r:'eu'},{x:30,y:9.0,r:'eu'},{x:32,y:8.2,r:'eu'},{x:33,y:7.8,r:'eu'},
  {x:35,y:8.5,r:'eu'},{x:35,y:7.5,r:'eu'},{x:36,y:8.0,r:'eu'},{x:37,y:8.8,r:'eu'},
  {x:38,y:7.6,r:'eu'},{x:38,y:8.2,r:'eu'},{x:39,y:7.4,r:'eu'},{x:40,y:8.0,r:'eu'},
  {x:40,y:8.5,r:'eu'},{x:41,y:7.2,r:'eu'},{x:41,y:7.8,r:'eu'},{x:42,y:7.5,r:'eu'},
  {x:42,y:8.1,r:'eu'},{x:43,y:7.0,r:'eu'},{x:43,y:7.8,r:'eu'},{x:44,y:6.8,r:'eu'},
  {x:44,y:7.5,r:'eu'},{x:45,y:7.2,r:'eu'},{x:46,y:6.5,r:'eu'},{x:46,y:7.0,r:'eu'},
  {x:47,y:6.8,r:'eu'},
  // Americas, moderate hours, varied satisfaction
  {x:32,y:8.0,r:'am'},{x:34,y:8.5,r:'am'},{x:36,y:7.8,r:'am'},{x:38,y:8.2,r:'am'},
  {x:38,y:6.8,r:'am'},{x:40,y:7.5,r:'am'},{x:40,y:8.0,r:'am'},{x:42,y:7.2,r:'am'},
  {x:42,y:8.5,r:'am'},{x:44,y:7.0,r:'am'},{x:45,y:7.8,r:'am'},{x:46,y:6.5,r:'am'},
  {x:46,y:7.2,r:'am'},{x:48,y:6.8,r:'am'},{x:48,y:7.5,r:'am'},{x:50,y:6.2,r:'am'},
  {x:50,y:7.0,r:'am'},{x:52,y:6.5,r:'am'},{x:52,y:7.2,r:'am'},{x:54,y:6.0,r:'am'},
  {x:54,y:6.8,r:'am'},{x:56,y:5.8,r:'am'},{x:56,y:6.5,r:'am'},{x:58,y:5.5,r:'am'},
  {x:60,y:6.0,r:'am'},
  // Asia-Pacific, longer hours, lower-to-moderate satisfaction
  {x:38,y:7.5,r:'ap'},{x:40,y:8.0,r:'ap'},{x:42,y:7.0,r:'ap'},{x:44,y:7.8,r:'ap'},
  {x:46,y:6.8,r:'ap'},{x:48,y:7.2,r:'ap'},{x:50,y:6.5,r:'ap'},{x:52,y:7.0,r:'ap'},
  {x:54,y:6.2,r:'ap'},{x:56,y:6.8,r:'ap'},{x:58,y:5.8,r:'ap'},{x:60,y:6.5,r:'ap'},
  {x:62,y:5.5,r:'ap'},{x:64,y:6.0,r:'ap'},{x:66,y:5.2,r:'ap'},{x:68,y:5.8,r:'ap'},
  {x:70,y:5.0,r:'ap'},{x:50,y:5.5,r:'ap'},{x:54,y:5.8,r:'ap'},{x:58,y:6.2,r:'ap'},
];

const REGION_COLOR = {
  eu: 'var(--cat-emotion)',
  am: 'var(--cat-flow)',
  ap: 'var(--cat-argumentation)',
};

// User dot position lookup
const HOURS_X  = { under35: 30, '35to45': 40, '46to55': 50, '56plus': 62 };
const REGION_Y = { eu: 7.8, am: 7.2, ap: 6.7 };
const AGE_OFF  = { under30: 0.4, '30to44': 0.0, '45to59': -0.3, '60plus': 0.1 };

function userPos(region, age, hours) {
  const x = HOURS_X[hours];
  const y = Math.min(9.8, Math.max(4.2, REGION_Y[region] + AGE_OFF[age]));
  return { x, y };
}

function insight(region, age, hours) {
  const { y } = userPos(region, age, hours);
  if (y >= 8.2) return 'Your satisfaction sits well above average, shorter hours seem to be paying off.';
  if (y >= 7.2) return 'Above average for your region. You\'ve found a reasonable balance between work and life.';
  if (y >= 6.2) return 'Around average for your demographic. Many people in this cluster feel the same way.';
  return 'Long hours are showing in your score, you\'re not alone, but the data suggests a real cost.';
}

// ── SVG layout ──────────────────────────────────────────────────────
const W = 540, H = 260;
const PAD = { top: 20, right: 114, bottom: 40, left: 52 };
const CW = W - PAD.left - PAD.right;   // 374
const CH = H - PAD.top  - PAD.bottom;  // 200

const X_MIN = 20, X_MAX = 75;
const Y_MIN = 4,  Y_MAX = 10;

function xAt(h) { return PAD.left + (h - X_MIN) / (X_MAX - X_MIN) * CW; }
function yAt(s) { return PAD.top  + CH - (s - Y_MIN) / (Y_MAX - Y_MIN) * CH; }

const NS = 'http://www.w3.org/2000/svg';
function svgEl(tag, attrs = {}) {
  const n = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  return n;
}
function svgTxt(text, attrs = {}) {
  const n = svgEl('text', { 'font-family': 'var(--font-mono)', ...attrs });
  n.textContent = text;
  return n;
}

// ── Build chart ─────────────────────────────────────────────────────
function buildChart() {
  const svg = document.getElementById('scatter-svg');

  // Grid lines + y-axis ticks
  [5, 6, 7, 8, 9, 10].forEach(s => {
    const y = yAt(s).toFixed(1);
    svg.appendChild(svgEl('line', {
      x1: PAD.left - 4, y1: y, x2: PAD.left + CW, y2: y,
      stroke: 'var(--rule)', 'stroke-width': 0.5, 'stroke-dasharray': '3 4',
    }));
    svg.appendChild(svgTxt(s, {
      x: PAD.left - 8, y: parseFloat(y) + 3.5,
      'text-anchor': 'end', 'font-size': '9', fill: 'var(--ink-3)',
    }));
  });

  // Axes
  svg.appendChild(svgEl('line', {
    x1: PAD.left, y1: PAD.top, x2: PAD.left, y2: PAD.top + CH,
    stroke: 'var(--rule-2)', 'stroke-width': 1,
  }));
  svg.appendChild(svgEl('line', {
    x1: PAD.left, y1: PAD.top + CH, x2: PAD.left + CW, y2: PAD.top + CH,
    stroke: 'var(--rule-2)', 'stroke-width': 1,
  }));

  // X ticks
  [20, 30, 40, 50, 60, 70].forEach(h => {
    const x = xAt(h).toFixed(1);
    svg.appendChild(svgEl('line', {
      x1: x, y1: PAD.top + CH, x2: x, y2: PAD.top + CH + 4,
      stroke: 'var(--rule-2)', 'stroke-width': 0.75,
    }));
    svg.appendChild(svgTxt(`${h}h`, {
      x, y: PAD.top + CH + 14, 'text-anchor': 'middle', 'font-size': '8.5', fill: 'var(--ink-3)',
    }));
  });

  // Axis labels
  const yLbl = svgEl('text', {
    transform: `translate(12,${PAD.top + CH / 2}) rotate(-90)`,
    'text-anchor': 'middle', 'font-size': '9',
    fill: 'var(--ink-3)', 'font-family': 'var(--font-mono)',
  });
  yLbl.textContent = 'Life satisfaction';
  svg.appendChild(yLbl);

  const xLbl = svgEl('text', {
    x: PAD.left + CW / 2, y: H - 4,
    'text-anchor': 'middle', 'font-size': '9',
    fill: 'var(--ink-3)', 'font-family': 'var(--font-mono)',
  });
  xLbl.textContent = 'Weekly work hours';
  svg.appendChild(xLbl);

  // Background dots
  DOTS.forEach(d => {
    const c = svgEl('circle', {
      cx: xAt(d.x).toFixed(1), cy: yAt(d.y).toFixed(1),
      r: 4.5,
      fill: REGION_COLOR[d.r],
      opacity: 0.55,
    });
    svg.appendChild(c);
  });

  // Legend (right side)
  [
    { r: 'eu', label: 'Europe'       },
    { r: 'am', label: 'Americas'     },
    { r: 'ap', label: 'Asia-Pacific' },
  ].forEach(({ r, label }, i) => {
    const lx = PAD.left + CW + 14;
    const ly = PAD.top + 20 + i * 22;
    svg.appendChild(svgEl('circle', {
      cx: lx + 5, cy: ly, r: 5, fill: REGION_COLOR[r], opacity: 0.7,
    }));
    svg.appendChild(svgTxt(label, {
      x: lx + 14, y: ly + 3.5, 'font-size': '9.5', fill: 'var(--ink-2)',
    }));
  });

  // Legend, You dot entry
  const lx = PAD.left + CW + 14;
  const ly = PAD.top + 90;
  svg.appendChild(svgEl('circle', {
    cx: lx + 5, cy: ly, r: 6,
    fill: 'var(--highlight)', stroke: 'var(--ink)', 'stroke-width': 1.5, opacity: 0.9,
  }));
  svg.appendChild(svgTxt('You', {
    x: lx + 14, y: ly + 3.5, 'font-size': '9.5', fill: 'var(--ink)',
    'font-weight': '600',
  }));

  // "You" dot group (initially hidden, positioned at chart center)
  const youG = svgEl('g', {
    id: 'you-dot',
    style: `transform: translate(${xAt(47.5).toFixed(1)}px,${yAt(7).toFixed(1)}px); opacity: 0; transition: transform 600ms cubic-bezier(.34,1.56,.64,1), opacity 300ms;`,
  });
  youG.appendChild(svgEl('circle', {
    cx: 0, cy: 0, r: 8,
    fill: 'var(--highlight)', stroke: 'var(--ink)', 'stroke-width': 2,
  }));
  const youLbl = svgEl('text', {
    x: 12, y: -10, 'font-size': '10', 'font-weight': '700',
    fill: 'var(--ink)', 'font-family': 'var(--font-mono)',
  });
  youLbl.textContent = 'You';
  youG.appendChild(youLbl);
  svg.appendChild(youG);
}

// ── Controls ────────────────────────────────────────────────────────
const selRegion  = document.getElementById('sel-region');
const selAge     = document.getElementById('sel-age');
const selHours   = document.getElementById('sel-hours');
const insightEl  = document.getElementById('you-insight');
const promptEl   = document.getElementById('you-prompt');
const youDot     = () => document.getElementById('you-dot');

function update() {
  const region = selRegion.value;
  const age    = selAge.value;
  const hours  = selHours.value;

  if (!region || !age || !hours) {
    youDot().style.opacity = '0';
    insightEl.style.opacity = '0';
    promptEl.style.opacity = '1';
    return;
  }

  const { x, y } = userPos(region, age, hours);
  const px = xAt(x).toFixed(1);
  const py = yAt(y).toFixed(1);

  youDot().style.transform = `translate(${px}px,${py}px)`;
  youDot().style.opacity   = '1';

  insightEl.textContent   = insight(region, age, hours);
  insightEl.style.opacity = '1';
  promptEl.style.opacity  = '0';
}

[selRegion, selAge, selHours].forEach(s => s.addEventListener('change', update));

// ── Init ─────────────────────────────────────────────────────────────
buildChart();
