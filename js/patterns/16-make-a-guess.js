// Pattern 16, Make-a-guess
// Demo: a blank line chart titled "Vinyl records sold in the US, 2000–2022".
// The reader presses and drags across the chart to draw their predicted
// curve; their guess is plotted live, snapped to one of 12 year-buckets.
// On reveal, the real (U-shaped) curve animates in over their drawing.
// Most readers draw a steady decline, reality has a vinyl revival.

const DATA = [
  { year: 2000, value: 1.5 },
  { year: 2002, value: 1.2 },
  { year: 2004, value: 1.0 },
  { year: 2006, value: 0.9 },
  { year: 2008, value: 1.9 },
  { year: 2010, value: 2.8 },
  { year: 2012, value: 4.6 },
  { year: 2014, value: 9.2 },
  { year: 2016, value: 13.1 },
  { year: 2018, value: 16.8 },
  { year: 2020, value: 27.5 },
  { year: 2022, value: 41.3 },
];

// Chart geometry (SVG units; preserveAspectRatio=none on the SVG)
const W = 720, H = 380;
const M = { top: 28, right: 28, bottom: 56, left: 60 };
const innerW = W - M.left - M.right;
const innerH = H - M.top - M.bottom;
const X_MIN = 2000, X_MAX = 2022;
const Y_MAX = 50;
const Y_TICKS = [0, 10, 20, 30, 40, 50];
const X_TICKS = [2000, 2004, 2008, 2012, 2016, 2020, 2022];

const xFor = (year) => M.left + ((year - X_MIN) / (X_MAX - X_MIN)) * innerW;
const yFor = (val)  => M.top + innerH - (val / Y_MAX) * innerH;
const yToValue = (svgY) => {
  const v = Y_MAX * ((M.top + innerH - svgY) / innerH);
  return Math.max(0, Math.min(Y_MAX, v));
};

const SVGNS = 'http://www.w3.org/2000/svg';
const el = (tag, attrs = {}, text = '') => {
  const n = document.createElementNS(SVGNS, tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  if (text) n.textContent = text;
  return n;
};

const svg     = document.getElementById('mg-chart');
const stage   = document.getElementById('mg-stage');
const hintEl  = document.getElementById('mg-hint');
const revealBtn = document.getElementById('mg-reveal-btn');
const resetBtn  = document.getElementById('mg-reset-btn');
const progress  = document.getElementById('mg-progress');
const summaryEl = document.getElementById('mg-summary');

// ── Static chart: gridlines, axes, ticks, anchor ─────────────────
const baselineY = M.top + innerH;

for (const tick of Y_TICKS) {
  const y = yFor(tick);
  svg.appendChild(el('line', {
    class: 'mg-gridline',
    x1: M.left, x2: M.left + innerW, y1: y, y2: y,
  }));
  svg.appendChild(el('text', {
    class: 'mg-tick-label',
    x: M.left - 8, y: y + 3, 'text-anchor': 'end',
  }, tick + (tick === Y_MAX ? 'M' : '')));
}

svg.appendChild(el('line', {
  class: 'mg-axis-line',
  x1: M.left, x2: M.left + innerW, y1: baselineY, y2: baselineY,
}));

for (const year of X_TICKS) {
  svg.appendChild(el('text', {
    class: 'mg-tick-label',
    x: xFor(year), y: baselineY + 18, 'text-anchor': 'middle',
  }, String(year)));
}

svg.appendChild(el('text', {
  class: 'mg-axis-title',
  x: M.left, y: M.top - 10,
}, 'MILLIONS OF UNITS PER YEAR'));

// Anchor, the "free tip" point at 2000
const anchorX = xFor(DATA[0].year);
const anchorY = yFor(DATA[0].value);
svg.appendChild(el('circle', {
  class: 'mg-anchor', cx: anchorX, cy: anchorY, r: 6,
}));
svg.appendChild(el('text', {
  class: 'mg-anchor-label',
  x: anchorX + 10, y: anchorY - 8,
}, 'start: 1.5M'));

// ── Drawing groups (layered above static chart) ─────────────────
const userLineEl = el('polyline', { class: 'mg-user-line', points: '' });
const userPointsG = el('g', { class: 'mg-user-points' });
svg.appendChild(userLineEl);
svg.appendChild(userPointsG);

// Actual line + points, populated, but hidden via stage class until reveal
const actualLineEl  = el('polyline', { class: 'mg-actual-line', points: '' });
const actualPointsG = el('g', { class: 'mg-actual-group' });
svg.appendChild(actualLineEl);
svg.appendChild(actualPointsG);

// ── User state ───────────────────────────────────────────────────
// year -> drawn value. Year 2000 is seeded from the anchor so the user's
// line always starts from the visible orange dot.
const userValues = new Map();
userValues.set(DATA[0].year, DATA[0].value);

const ALL_YEARS = DATA.map(d => d.year);
const DRAWABLE_YEARS = ALL_YEARS.slice(1);  // 11 years to fill in
const REVEAL_THRESHOLD = Math.ceil(DRAWABLE_YEARS.length * 0.6); // ~7 of 11

let isDrawing = false;
let revealed  = false;

const pointerToSvg = (e) => {
  const rect = svg.getBoundingClientRect();
  return {
    x: ((e.clientX - rect.left) / rect.width)  * W,
    y: ((e.clientY - rect.top)  / rect.height) * H,
  };
};

const snapYear = (svgX) => {
  let best = X_MIN, bestD = Infinity;
  for (const y of ALL_YEARS) {
    const dx = Math.abs(xFor(y) - svgX);
    if (dx < bestD) { bestD = dx; best = y; }
  }
  return best;
};

const renderUserLine = () => {
  // Build polyline from sorted (year, value) pairs that the user has set.
  const pts = ALL_YEARS
    .filter(y => userValues.has(y))
    .map(y => `${xFor(y)},${yFor(userValues.get(y))}`);
  userLineEl.setAttribute('points', pts.join(' '));

  // Update point markers
  userPointsG.innerHTML = '';
  for (const y of ALL_YEARS) {
    if (!userValues.has(y)) continue;
    if (y === DATA[0].year) continue; // anchor handles its own dot
    userPointsG.appendChild(el('circle', {
      class: 'mg-user-point',
      cx: xFor(y), cy: yFor(userValues.get(y)), r: 4,
    }));
  }
};

const updateProgress = () => {
  const drawn = DRAWABLE_YEARS.filter(y => userValues.has(y)).length;
  progress.textContent = `${drawn} / ${DRAWABLE_YEARS.length} points drawn`;
  revealBtn.disabled = drawn < REVEAL_THRESHOLD || revealed;
};

const handlePointer = (e) => {
  if (revealed || !isDrawing) return;
  const { x, y } = pointerToSvg(e);
  if (x < M.left || x > M.left + innerW) return;
  const year = snapYear(x);
  if (year === DATA[0].year) return; // don't let the user overwrite the anchor
  userValues.set(year, yToValue(y));
  renderUserLine();
  updateProgress();
};

stage.addEventListener('pointerdown', (e) => {
  if (revealed) return;
  isDrawing = true;
  stage.classList.add('is-drawing');
  stage.setPointerCapture(e.pointerId);
  handlePointer(e);
});

stage.addEventListener('pointermove', handlePointer);

const endDrawing = (e) => {
  isDrawing = false;
  try { stage.releasePointerCapture(e.pointerId); } catch (_) {}
};
stage.addEventListener('pointerup', endDrawing);
stage.addEventListener('pointercancel', endDrawing);

// ── Reveal ───────────────────────────────────────────────────────
const reveal = () => {
  if (revealed) return;
  revealed = true;
  stage.classList.add('is-revealed');

  // Build the actual polyline + draw-in animation
  const actualPts = DATA.map(d => `${xFor(d.year)},${yFor(d.value)}`);
  actualLineEl.setAttribute('points', actualPts.join(' '));

  // Estimate the total path length for the draw-in stroke effect
  // (polyline length isn't directly available cheaply, approximate).
  const lengthApprox = DATA.reduce((acc, d, i) => {
    if (i === 0) return 0;
    const p = DATA[i - 1];
    const dx = xFor(d.year)  - xFor(p.year);
    const dy = yFor(d.value) - yFor(p.value);
    return acc + Math.hypot(dx, dy);
  }, 0);

  actualLineEl.style.strokeDasharray  = lengthApprox + ' ' + lengthApprox;
  actualLineEl.style.strokeDashoffset = lengthApprox;
  // Force reflow so the transition starts from the offset state
  void actualLineEl.getBoundingClientRect();
  actualLineEl.style.transition = 'stroke-dashoffset 1400ms cubic-bezier(.5, .1, .2, 1), opacity 200ms';
  actualLineEl.style.strokeDashoffset = '0';

  // Stagger the actual-line dots in after the line has drawn most of itself
  setTimeout(() => {
    DATA.forEach((d, i) => {
      if (i === 0) return; // anchor already drawn
      setTimeout(() => {
        actualPointsG.appendChild(el('circle', {
          class: 'mg-actual-point',
          cx: xFor(d.year), cy: yFor(d.value), r: 4.5,
          style: 'opacity: 1',
        }));
      }, i * 60);
    });
  }, 900);

  revealBtn.disabled = true;
  showSummary();
};

const showSummary = () => {
  // Compute the reader's average miss across the drawn years
  const drawn = DRAWABLE_YEARS.filter(y => userValues.has(y));
  if (drawn.length === 0) return;

  let totalMissPct = 0;
  let endpointGuess = null;
  for (const y of drawn) {
    const guess  = userValues.get(y);
    const actual = DATA.find(d => d.year === y).value;
    totalMissPct += Math.abs(guess - actual) / Math.max(actual, 1);
    if (y === 2022) endpointGuess = guess;
  }
  const avgMissPct = Math.round((totalMissPct / drawn.length) * 100);

  const finalActual = DATA[DATA.length - 1].value;
  const trendDirection = (() => {
    // Did the user draw an upward trend? (last drawn y > first drawn y after anchor)
    const drawnSorted = drawn.sort((a, b) => a - b);
    const first = userValues.get(drawnSorted[0]);
    const last  = userValues.get(drawnSorted[drawnSorted.length - 1]);
    return last - first;
  })();

  let verdict;
  const predictedGrowth = trendDirection >= 5;
  if (predictedGrowth) {
    verdict = `<strong>You saw it coming.</strong> Most readers draw a steady decline, you drew a rebound.`;
  } else if (trendDirection >= 0) {
    verdict = `<strong>You hedged.</strong> Your line stayed roughly flat. The real curve actually shot upward.`;
  } else {
    verdict = `<strong>You drew the decline most people do.</strong> Vinyl records actually came back.`;
  }
  summaryEl.classList.toggle('is-success', predictedGrowth);

  const endpointLine = endpointGuess != null
    ? `Your line ended 2022 at <strong>${endpointGuess.toFixed(1)}M</strong>. The real number is <strong>${finalActual}M</strong>, a ${Math.round(finalActual / Math.max(endpointGuess, 0.1))}× difference.`
    : `The real 2022 number is <strong>${finalActual}M</strong>, more than 25× the 2006 low.`;

  summaryEl.innerHTML = `
    <p class="mg-summary-headline">${verdict}</p>
    <p class="mg-summary-sub">
      ${endpointLine}
      Across the curve, your guesses were off by an average of
      <strong>${avgMissPct}%</strong>. That gap, your line vs the real one,
      is the chart. Without your guess on the page first, the same numbers
      would have read as a simple line going up.
    </p>
  `;
  summaryEl.classList.add('is-visible');
};

revealBtn.addEventListener('click', reveal);

// ── Reset ─────────────────────────────────────────────────────────
const reset = () => {
  revealed = false;
  isDrawing = false;
  stage.classList.remove('is-drawing', 'is-revealed');

  userValues.clear();
  userValues.set(DATA[0].year, DATA[0].value);

  userLineEl.setAttribute('points', '');
  userPointsG.innerHTML = '';
  actualLineEl.setAttribute('points', '');
  actualLineEl.style.transition = 'none';
  actualLineEl.style.strokeDasharray = '';
  actualLineEl.style.strokeDashoffset = '';
  actualPointsG.innerHTML = '';

  summaryEl.classList.remove('is-visible', 'is-success');
  summaryEl.innerHTML = '';
  updateProgress();
};

resetBtn.addEventListener('click', reset);

updateProgress();
