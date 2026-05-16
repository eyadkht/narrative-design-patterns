// Pattern 10, Rhetorical Question
// Demo: a big rhetorical headline about UK house prices vs wages.
// User clicks "Show me the data" → chart animates in with two lines
// (prices and wages, indexed to 1997 = 100), then end-labels and a
// takeaway fade in to deliver the answer.
//
// Data: ONS housing-affordability bulletin, England & Wales 1997–2016.
// Median house price +259%, median full-time wages +68% over the period.
// Series below are indexed to 1997 = 100 and approximate the published
// trajectory (peak in 2007, dip through 2009, recovery to 2016).

const PRICES = [
  { year: 1997, v: 100 },
  { year: 2000, v: 142 },
  { year: 2003, v: 225 },
  { year: 2005, v: 267 },
  { year: 2007, v: 308 },
  { year: 2009, v: 258 },
  { year: 2012, v: 275 },
  { year: 2014, v: 317 },
  { year: 2016, v: 359 },
];

const WAGES = [
  { year: 1997, v: 100 },
  { year: 2000, v: 112 },
  { year: 2003, v: 124 },
  { year: 2005, v: 132 },
  { year: 2007, v: 141 },
  { year: 2009, v: 147 },
  { year: 2012, v: 153 },
  { year: 2014, v: 156 },
  { year: 2016, v: 168 },
];

// Chart geometry (matches the SVG viewBox in the HTML)
const W = 720, H = 320;
const M = { top: 20, right: 110, bottom: 32, left: 40 };
const innerW = W - M.left - M.right;
const innerH = H - M.top - M.bottom;

const Y_MAX = 400; // headroom above the 359 peak
const Y_TICKS = [100, 200, 300, 400];

const xScale = (year) => M.left + ((year - 1997) / (2016 - 1997)) * innerW;
const yScale = (v)    => M.top + innerH - (v / Y_MAX) * innerH;

const pathFor = (data) =>
  data.map((d, i) => `${i ? 'L' : 'M'}${xScale(d.year).toFixed(1)} ${yScale(d.v).toFixed(1)}`).join(' ');

// ── Render the static SVG scaffolding ─────────────────────────────
const svg = document.getElementById('rq-chart');
const SVGNS = 'http://www.w3.org/2000/svg';

const el = (tag, attrs = {}, text = '') => {
  const n = document.createElementNS(SVGNS, tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  if (text) n.textContent = text;
  return n;
};

// gridlines + y-axis tick labels
for (const tick of Y_TICKS) {
  const y = yScale(tick);
  svg.appendChild(el('line', {
    class: 'rq-gridline',
    x1: M.left, x2: M.left + innerW, y1: y, y2: y,
  }));
  svg.appendChild(el('text', {
    class: 'rq-tick-label',
    x: M.left - 8, y: y + 3, 'text-anchor': 'end',
  }, String(tick)));
}

// x-axis baseline + year ticks
const xAxisY = M.top + innerH;
svg.appendChild(el('line', {
  class: 'rq-axis-line',
  x1: M.left, x2: M.left + innerW, y1: xAxisY, y2: xAxisY,
}));
for (const year of [1997, 2002, 2007, 2012, 2016]) {
  svg.appendChild(el('text', {
    class: 'rq-tick-label',
    x: xScale(year), y: xAxisY + 18, 'text-anchor': 'middle',
  }, String(year)));
}

// gap-shading band between the two lines (fades in after lines)
const gapPoints = [
  ...PRICES.map(d => `${xScale(d.year).toFixed(1)},${yScale(d.v).toFixed(1)}`),
  ...[...WAGES].reverse().map(d => `${xScale(d.year).toFixed(1)},${yScale(d.v).toFixed(1)}`),
].join(' ');
const gapBand = el('polygon', { class: 'rq-gap-band', points: gapPoints });
svg.appendChild(gapBand);

// the two lines themselves
const pricesPath = el('path', { class: 'rq-line rq-line--prices', d: pathFor(PRICES) });
const wagesPath  = el('path', { class: 'rq-line rq-line--wages',  d: pathFor(WAGES) });
svg.appendChild(pricesPath);
svg.appendChild(wagesPath);

// end-of-line labels (appear after the draw-in)
const lastPrice = PRICES[PRICES.length - 1];
const lastWage  = WAGES[WAGES.length - 1];
const pricesLabel = el('text', {
  class: 'rq-end-label rq-end-label--prices',
  x: xScale(lastPrice.year) + 8,
  y: yScale(lastPrice.v) + 4,
}, 'House prices');
const pricesValue = el('text', {
  class: 'rq-end-value rq-end-value--prices',
  x: xScale(lastPrice.year) + 8,
  y: yScale(lastPrice.v) + 20,
}, '+259%');
const wagesLabel = el('text', {
  class: 'rq-end-label rq-end-label--wages',
  x: xScale(lastWage.year) + 8,
  y: yScale(lastWage.v) + 4,
}, 'Wages');
const wagesValue = el('text', {
  class: 'rq-end-value rq-end-value--wages',
  x: xScale(lastWage.year) + 8,
  y: yScale(lastWage.v) + 20,
}, '+68%');
svg.append(pricesLabel, pricesValue, wagesLabel, wagesValue);

// ── Interaction ───────────────────────────────────────────────────
const stage     = document.getElementById('rq-stage');
const revealBtn = document.getElementById('rq-reveal-btn');
const takeaway  = document.getElementById('rq-takeaway');
const replayBtn = document.getElementById('rq-replay');

const animateIn = () => {
  // Set up draw-in: each line uses its own length as the dash pattern.
  for (const path of [pricesPath, wagesPath]) {
    path.classList.remove('is-drawing');
    // force reflow so the animation restarts on replay
    void path.getBoundingClientRect();
    path.style.setProperty('--len', path.getTotalLength().toFixed(1));
    path.classList.add('is-drawing');
  }

  // Stage the late-arriving elements (labels, gap band, takeaway).
  for (const node of [pricesLabel, pricesValue, wagesLabel, wagesValue]) {
    node.classList.remove('is-visible');
  }
  gapBand.classList.remove('is-visible');
  takeaway.classList.remove('is-visible');
  replayBtn.classList.remove('is-visible');

  // After the line draw completes (~2s incl. wages delay), fade in labels.
  setTimeout(() => {
    pricesLabel.classList.add('is-visible');
    pricesValue.classList.add('is-visible');
    wagesLabel.classList.add('is-visible');
    wagesValue.classList.add('is-visible');
    gapBand.classList.add('is-visible');
  }, 2100);

  setTimeout(() => {
    takeaway.classList.add('is-visible');
    replayBtn.classList.add('is-visible');
  }, 2400);
};

revealBtn.addEventListener('click', () => {
  stage.dataset.state = 'answer';
  animateIn();
});

replayBtn.addEventListener('click', animateIn);
