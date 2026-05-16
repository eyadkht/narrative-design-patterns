// Demo: Silent Data, bar chart with a ghosted 6th bar.
// The first five salaries sit on a normal scale. The CEO bar is hidden behind
// a dashed stub. On reveal the y-axis rescales and the hidden bar towers over
// everything, collapsing the other bars into near-invisible slivers.

const DATA = [
  { label: 'Teacher',       sublabel: 'K–12',         value:    45_000 },
  { label: 'Nurse',         sublabel: 'RN',            value:    58_000 },
  { label: 'Police',        sublabel: 'Officer',       value:    52_000 },
  { label: 'Engineer',      sublabel: 'Software',      value:    95_000 },
  { label: 'Doctor',        sublabel: 'GP',            value:   118_000 },
  { label: 'CEO',           sublabel: 'Fortune 500',   value: 14_800_000, silent: true },
];

// Phase 1: scale that makes the five visible bars look good
const SCALE_1 = 130_000;
// Phase 2: full scale to fit the CEO bar
const SCALE_2 = 16_000_000;

const CHART_H = 260; // px, height of the bars area
const MIN_BAR = 4;   // px minimum bar height so slivers stay visible

function barHeight(value, scale) {
  return Math.max(MIN_BAR, (value / scale) * CHART_H);
}

function formatValue(v) {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
  return `$${(v / 1_000).toFixed(0)}k`;
}

// ── Build chart DOM ─────────────────────────────────────────────────
const barsArea   = document.getElementById('bars-area');
const yAxisEl    = document.getElementById('y-axis');
const annotation = document.getElementById('ceo-annotation');
const revealBtn  = document.getElementById('reveal-btn');
const hintEl     = document.getElementById('chart-hint');

// Bar color by index
const COLORS = [
  'var(--cat-flow)',
  'var(--cat-flow)',
  'var(--cat-flow)',
  'var(--cat-emotion)',
  'var(--cat-emotion)',
  'var(--cat-argumentation)',
];

const barFills  = [];
const valLabels = [];

DATA.forEach((d, i) => {
  const col = document.createElement('div');
  col.className = 'bar-col';
  col.setAttribute('aria-label', `${d.label}: ${formatValue(d.value)}`);

  // Value label above the bar
  const valLbl = document.createElement('span');
  valLbl.className = 'bar-val-label';
  valLbl.textContent = d.silent ? '?' : formatValue(d.value);
  valLabels.push(valLbl);
  col.appendChild(valLbl);

  // Bar wrapper (provides the bottom-anchor context)
  const wrap = document.createElement('div');
  wrap.className = 'bar-wrap';

  const fill = document.createElement('div');
  fill.className = d.silent ? 'bar-fill bar-fill--ghost' : 'bar-fill';
  fill.style.background = d.silent ? 'transparent' : COLORS[i];
  fill.style.height = d.silent ? '12px' : `${barHeight(d.value, SCALE_1)}px`;
  if (!d.silent) fill.style.setProperty('--bar-color', COLORS[i]);
  barFills.push(fill);

  // Ghost bar click area
  if (d.silent) {
    fill.addEventListener('click', doReveal);
    fill.setAttribute('role', 'button');
    fill.setAttribute('aria-label', 'Click to reveal the hidden bar');
    fill.setAttribute('tabindex', '0');
    fill.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') doReveal(); });
  }

  wrap.appendChild(fill);
  col.appendChild(wrap);

  // x-axis label
  const xLbl = document.createElement('div');
  xLbl.className = 'bar-x-label';
  xLbl.innerHTML = `<strong>${d.label}</strong><br><span>${d.sublabel}</span>`;
  col.appendChild(xLbl);

  barsArea.appendChild(col);
});

// ── Y-axis ticks ────────────────────────────────────────────────────
function buildYAxis(scale) {
  yAxisEl.innerHTML = '';
  const ticks = scale === SCALE_1
    ? [0, 30_000, 60_000, 90_000, 120_000]
    : [0, 4_000_000, 8_000_000, 12_000_000, 16_000_000];

  ticks.forEach(v => {
    const pct  = v / scale;
    const tick = document.createElement('div');
    tick.className = 'y-tick';
    tick.style.bottom = `${pct * CHART_H}px`;
    tick.textContent = formatValue(v) || '$0';
    if (v === 0) tick.textContent = '$0';
    yAxisEl.appendChild(tick);

    if (v > 0) {
      const line = document.createElement('div');
      line.className = 'y-gridline';
      line.style.bottom = `${pct * CHART_H}px`;
      yAxisEl.appendChild(line);
    }
  });
}

// ── Reveal / reset ──────────────────────────────────────────────────
let revealed = false;

function doReveal() {
  if (revealed) return;
  revealed = true;

  revealBtn.textContent = '↺ Reset';
  hintEl.style.opacity = '0';

  // Animate all bars to phase-2 scale
  DATA.forEach((d, i) => {
    const fill = barFills[i];
    const h    = barHeight(d.value, SCALE_2);
    fill.style.height = `${h}px`;

    if (d.silent) {
      fill.classList.remove('bar-fill--ghost');
      fill.style.background    = COLORS[i];
      fill.style.borderStyle   = 'none';
      valLabels[i].textContent = formatValue(d.value);
      valLabels[i].style.color = COLORS[i];
    } else {
      // Re-color slightly dimmer so CEO bar dominates
      fill.style.opacity = '0.45';
      valLabels[i].style.opacity = '0.45';
    }
  });

  // Cross-fade y-axis labels
  yAxisEl.style.opacity = '0';
  setTimeout(() => {
    buildYAxis(SCALE_2);
    yAxisEl.style.opacity = '1';
  }, 350);

  // Show annotation after bars settle
  setTimeout(() => {
    annotation.removeAttribute('aria-hidden');
    annotation.style.opacity = '1';
  }, 750);
}

function doReset() {
  revealed = false;

  revealBtn.textContent = 'Reveal the 6th bar →';
  hintEl.style.opacity = '1';
  annotation.setAttribute('aria-hidden', 'true');
  annotation.style.opacity = '0';

  DATA.forEach((d, i) => {
    const fill = barFills[i];
    if (d.silent) {
      fill.classList.add('bar-fill--ghost');
      fill.style.background  = 'transparent';
      fill.style.height      = '12px';
      valLabels[i].textContent = '?';
      valLabels[i].style.color = '';
    } else {
      fill.style.height  = `${barHeight(d.value, SCALE_1)}px`;
      fill.style.opacity = '1';
      valLabels[i].style.opacity = '1';
    }
  });

  yAxisEl.style.opacity = '0';
  setTimeout(() => {
    buildYAxis(SCALE_1);
    yAxisEl.style.opacity = '1';
  }, 200);
}

revealBtn.addEventListener('click', () => {
  if (revealed) doReset();
  else doReveal();
});

// ── Init ─────────────────────────────────────────────────────────────
buildYAxis(SCALE_1);
