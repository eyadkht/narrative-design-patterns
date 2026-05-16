// Demo: Speed-up / Slow-down, playhead moves along a stock-price timeline.
// A rate slider (0.25×–4×) sets base speed. An "Auto-slow" toggle cuts speed
// to 0.3× inside volatile zones (market open & close), so critical moments
// get the screen time they deserve.

// ── Data: 5-minute intervals, 9:00–16:00 (85 points, indices 0–84) ─
const PRICES = [
  // 9:00–9:25  pre-market quiet (indices 0–5)
  148.0, 148.2, 147.9, 148.1, 148.3, 148.1,
  // 9:30–10:00  market open, volatile (indices 6–12)
  150.5, 153.2, 149.8, 154.1, 151.3, 155.2, 152.5,
  // 10:05–12:55  morning drift (indices 13–47)
  152.8, 153.1, 153.5, 153.2, 153.8, 154.1, 153.9, 154.3, 154.6, 154.4,
  154.8, 155.1, 154.9, 155.3, 155.6, 155.4, 155.8, 156.1, 155.9, 156.2,
  156.5, 156.3, 156.7, 157.0, 156.8, 157.1, 157.4, 157.2, 157.5, 157.8,
  157.6, 157.9, 158.1, 157.9, 158.2,
  // 13:00–13:55  lunch lull (indices 48–59)
  158.1, 158.0, 158.2, 158.1, 157.9, 158.0,
  158.1, 157.8, 158.0, 158.1, 157.9, 158.0,
  // 14:00–15:25  afternoon session (indices 60–77)
  158.3, 158.7, 158.5, 158.9, 159.2, 159.0,
  159.4, 159.7, 159.5, 159.8, 160.1, 159.9,
  160.2, 160.5, 160.3, 160.6, 160.4, 160.7,
  // 15:30–16:00  market close, volatile (indices 78–84)
  162.1, 159.5, 163.8, 161.2, 164.5, 162.8, 163.4,
];

const N    = PRICES.length - 1;  // 84 steps
const RATE = N / 10;              // traverse full range in 10 s at 1×

const VOLATILE = [
  { lo: 6,  hi: 12 },   // open rush
  { lo: 78, hi: N  },   // close rush
];

function isVolatile(pos) {
  return VOLATILE.some(z => pos >= z.lo && pos <= z.hi);
}

function priceAt(t) {
  const i    = Math.min(Math.floor(t), N - 1);
  const frac = t - i;
  return PRICES[i] * (1 - frac) + PRICES[i + 1] * frac;
}

function timeLabel(t) {
  const mins = 9 * 60 + Math.round(t) * 5;
  const h    = Math.floor(mins / 60);
  const m    = mins % 60;
  const ap   = h < 12 ? 'AM' : 'PM';
  const h12  = h > 12 ? h - 12 : h;
  return `${h12}:${String(m).padStart(2, '0')} ${ap}`;
}

function regionLabel(t) {
  if (t < 6)  return 'Pre-market quiet';
  if (t <= 12) return '⚡ Market open';
  if (t < 48)  return 'Morning session';
  if (t < 60)  return 'Lunch lull';
  if (t < 78)  return 'Afternoon session';
  return '⚡ Market close';
}

// ── SVG layout ──────────────────────────────────────────────────────
const W = 560, H = 180;
const PAD = { top: 20, right: 16, bottom: 32, left: 52 };
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top  - PAD.bottom;

const P_MIN = 147, P_MAX = 166;

function xAt(t) { return PAD.left + (t / N) * CW; }
function yAt(p) { return PAD.top + CH - (p - P_MIN) / (P_MAX - P_MIN) * CH; }

const NS = 'http://www.w3.org/2000/svg';
function svgEl(tag, attrs = {}) {
  const n = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  return n;
}

// ── Build chart ─────────────────────────────────────────────────────
function buildChart() {
  const svg = document.getElementById('timeline-svg');

  // Volatile zone shading
  VOLATILE.forEach(z => {
    svg.appendChild(svgEl('rect', {
      x: xAt(z.lo).toFixed(1), y: PAD.top,
      width: (xAt(z.hi) - xAt(z.lo)).toFixed(1), height: CH,
      fill: 'var(--highlight)', opacity: 0.18,
    }));
  });

  // Volatile zone labels
  [
    { z: VOLATILE[0], text: 'Open rush' },
    { z: VOLATILE[1], text: 'Close rush' },
  ].forEach(({ z, text }) => {
    const midX = ((xAt(z.lo) + xAt(z.hi)) / 2).toFixed(1);
    const label = svgEl('text', {
      x: midX, y: PAD.top - 5,
      'text-anchor': 'middle', 'font-size': '8',
      fill: 'var(--ink-3)', 'font-family': 'var(--font-mono)',
    });
    label.textContent = text;
    svg.appendChild(label);
  });

  // Y-axis price grid lines
  [148, 152, 156, 160, 164].forEach(p => {
    const y = yAt(p).toFixed(1);
    svg.appendChild(svgEl('line', {
      x1: PAD.left - 4, y1: y, x2: PAD.left + CW, y2: y,
      stroke: 'var(--rule)', 'stroke-width': 0.5, 'stroke-dasharray': '3 4',
    }));
    const lbl = svgEl('text', {
      x: PAD.left - 8, y: parseFloat(y) + 3.5,
      'text-anchor': 'end', 'font-size': '9',
      fill: 'var(--ink-3)', 'font-family': 'var(--font-mono)',
    });
    lbl.textContent = `$${p}`;
    svg.appendChild(lbl);
  });

  // X-axis
  svg.appendChild(svgEl('line', {
    x1: PAD.left, y1: PAD.top + CH,
    x2: PAD.left + CW, y2: PAD.top + CH,
    stroke: 'var(--rule-2)', 'stroke-width': 1,
  }));

  // X-axis time ticks (every hour)
  [
    { i: 0,  lbl: '9 AM'  },
    { i: 12, lbl: '10 AM' },
    { i: 24, lbl: '11 AM' },
    { i: 36, lbl: '12 PM' },
    { i: 48, lbl: '1 PM'  },
    { i: 60, lbl: '2 PM'  },
    { i: 72, lbl: '3 PM'  },
    { i: 84, lbl: '4 PM'  },
  ].forEach(({ i, lbl }) => {
    const x = xAt(i).toFixed(1);
    svg.appendChild(svgEl('line', {
      x1: x, y1: PAD.top + CH,
      x2: x, y2: PAD.top + CH + 4,
      stroke: 'var(--rule-2)', 'stroke-width': 0.75,
    }));
    const t = svgEl('text', {
      x, y: H - 6,
      'text-anchor': 'middle', 'font-size': '8.5',
      fill: 'var(--ink-3)', 'font-family': 'var(--font-mono)',
    });
    t.textContent = lbl;
    svg.appendChild(t);
  });

  // Price line
  const pts = PRICES.map((p, i) => `${xAt(i).toFixed(1)},${yAt(p).toFixed(1)}`).join(' ');
  svg.appendChild(svgEl('polyline', {
    points: pts,
    fill: 'none',
    stroke: 'var(--cat-flow)',
    'stroke-width': 2,
    'stroke-linejoin': 'round',
    'stroke-linecap': 'round',
  }));

  // Playhead, vertical line (moveable)
  svg.appendChild(svgEl('line', {
    id: 'playhead-line',
    x1: xAt(0), y1: PAD.top,
    x2: xAt(0), y2: PAD.top + CH,
    stroke: 'var(--ink)', 'stroke-width': 1.5, opacity: 0,
  }));

  // Playhead, dot on price curve (moveable)
  svg.appendChild(svgEl('circle', {
    id: 'playhead-dot',
    cx: xAt(0), cy: yAt(PRICES[0]),
    r: 5, fill: 'var(--ink)', opacity: 0,
  }));

  // Playhead, price label (moveable text)
  const priceLbl = svgEl('text', {
    id: 'price-label',
    'font-size': '9', 'font-family': 'var(--font-mono)',
    fill: 'var(--ink)', 'font-weight': '600', opacity: 0,
  });
  svg.appendChild(priceLbl);
}

// ── Playhead update ─────────────────────────────────────────────────
function movePlayhead(t) {
  const p  = priceAt(t);
  const px = xAt(t);
  const py = yAt(p);

  document.getElementById('playhead-line').setAttribute('x1', px);
  document.getElementById('playhead-line').setAttribute('x2', px);
  document.getElementById('playhead-line').setAttribute('opacity', 1);

  document.getElementById('playhead-dot').setAttribute('cx', px);
  document.getElementById('playhead-dot').setAttribute('cy', py);
  document.getElementById('playhead-dot').setAttribute('opacity', 1);

  // Price label: flip to left side near end of chart
  const lbl   = document.getElementById('price-label');
  const anchor = px > PAD.left + CW * 0.85 ? 'end' : 'start';
  const lx     = anchor === 'end' ? px - 8 : px + 8;
  lbl.setAttribute('x', lx);
  lbl.setAttribute('y', Math.max(PAD.top + 12, py - 8));
  lbl.setAttribute('text-anchor', anchor);
  lbl.setAttribute('opacity', 1);
  lbl.textContent = `$${p.toFixed(2)}`;
}

// ── Animation loop ──────────────────────────────────────────────────
let pos     = 0;
let playing = false;
let lastTs  = null;

const playBtn     = document.getElementById('play-btn');
const rateSlider  = document.getElementById('rate-slider');
const rateValue   = document.getElementById('rate-value');
const autoToggle  = document.getElementById('auto-toggle');
const regionEl    = document.getElementById('region-label');
const speedEl     = document.getElementById('speed-display');

function getEffectiveSpeed() {
  const user = parseInt(rateSlider.value) / 100;
  const auto = (autoToggle.checked && isVolatile(pos)) ? 0.3 : 1.0;
  return user * auto;
}

function updateStatus() {
  const effSpeed = getEffectiveSpeed();
  const inZone   = autoToggle.checked && isVolatile(pos);

  regionEl.textContent = regionLabel(pos) + '  ·  ' + timeLabel(pos);
  speedEl.textContent  = `${effSpeed.toFixed(2)}× speed`;
  speedEl.style.color  = inZone ? 'var(--cat-flow)' : 'var(--ink-3)';
}

function tick(ts) {
  if (!playing) return;

  if (lastTs !== null) {
    const dt    = (ts - lastTs) / 1000;
    const speed = getEffectiveSpeed();
    pos += dt * RATE * speed;

    if (pos >= N) {
      pos = N;
      playing = false;
      playBtn.textContent = '↺ Replay';
    }
  }
  lastTs = ts;

  movePlayhead(pos);
  updateStatus();

  if (playing) requestAnimationFrame(tick);
}

function startPlay() {
  if (pos >= N) pos = 0;
  playing = true;
  playBtn.textContent = '⏸ Pause';
  lastTs = null;
  requestAnimationFrame(tick);
}

function pausePlay() {
  playing = false;
  playBtn.textContent = '▶ Play';
}

playBtn.addEventListener('click', () => {
  if (pos >= N) {
    // Replay
    pos = 0;
    movePlayhead(0);
    startPlay();
  } else if (playing) {
    pausePlay();
  } else {
    startPlay();
  }
});

rateSlider.addEventListener('input', () => {
  const v = parseInt(rateSlider.value) / 100;
  rateValue.textContent = `${v.toFixed(2)}×`;
  updateStatus();
});

autoToggle.addEventListener('change', updateStatus);

// ── Init ─────────────────────────────────────────────────────────────
buildChart();
updateStatus();
