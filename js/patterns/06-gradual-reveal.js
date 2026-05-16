// Demo: Gradual Reveal, scatter plot built layer by layer.
// Steps: axes → low-income dots → all dots → trend line → annotation.

const DATA = [
  { name: 'Malawi',      gdp:   640, life: 63, group: 'low'  },
  { name: 'Ethiopia',    gdp:   950, life: 66, group: 'low'  },
  { name: 'Uganda',      gdp:   890, life: 63, group: 'low'  },
  { name: 'Tanzania',    gdp:  1080, life: 65, group: 'low'  },
  { name: 'Haiti',       gdp:  1760, life: 64, group: 'low'  },
  { name: 'Cambodia',    gdp:  1700, life: 69, group: 'low'  },
  { name: 'Nepal',       gdp:  1340, life: 71, group: 'low'  },
  { name: 'India',       gdp:  2380, life: 70, group: 'mid'  },
  { name: 'Egypt',       gdp:  4350, life: 72, group: 'mid'  },
  { name: 'Bolivia',     gdp:  3630, life: 72, group: 'mid'  },
  { name: 'Morocco',     gdp:  3450, life: 74, group: 'mid'  },
  { name: 'Vietnam',     gdp:  3760, life: 75, group: 'mid'  },
  { name: 'China',       gdp: 12720, life: 78, group: 'mid'  },
  { name: 'Brazil',      gdp:  9130, life: 76, group: 'mid'  },
  { name: 'Mexico',      gdp: 10270, life: 75, group: 'mid'  },
  { name: 'Germany',     gdp: 48450, life: 81, group: 'high' },
  { name: 'France',      gdp: 42330, life: 82, group: 'high' },
  { name: 'UK',          gdp: 46300, life: 81, group: 'high' },
  { name: 'Japan',       gdp: 39290, life: 84, group: 'high' },
  { name: 'Australia',   gdp: 55060, life: 83, group: 'high' },
  { name: 'USA',         gdp: 63540, life: 79, group: 'high' },
  { name: 'Switzerland', gdp: 84410, life: 84, group: 'high' },
  { name: 'Norway',      gdp: 82240, life: 83, group: 'high' },
];

const STEPS = [
  {
    show: new Set(),
    narrative: 'Two things determine how long you live: your genes, and where you were born. This chart asks: how much does national income predict life expectancy?',
    btn: 'Show the poorest countries →',
  },
  {
    show: new Set(['low']),
    narrative: 'The poorest nations cluster bottom-left. Despite their differences, most share one thing in common: shorter lives, cut short by poverty\'s reach.',
    btn: 'Add wealthier nations →',
  },
  {
    show: new Set(['low', 'mid', 'high']),
    narrative: 'As national income rises, life expectancy follows. But notice how high-income countries bunch together, beyond a point, more money buys less life.',
    btn: 'Draw the trend →',
  },
  {
    show: new Set(['low', 'mid', 'high', 'trend']),
    narrative: 'The trend is logarithmic. Doubling income from $1,000 to $2,000 adds years of life. Doubling from $40,000 to $80,000 barely moves the needle.',
    btn: 'See the key insight →',
  },
  {
    show: new Set(['low', 'mid', 'high', 'trend', 'annotation']),
    narrative: 'The steepest climb, from $1k to $10k, is where the most lives are at stake. Investment in public health and basic income here has the highest return of anywhere on this curve.',
    btn: '↺ Start over',
    isLast: true,
  },
];

// ── Layout constants ────────────────────────────────────────────────
const W = 540, H = 260;
const PAD = { top: 16, right: 20, bottom: 42, left: 54 };
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top  - PAD.bottom;

const GDP_MIN = 500, GDP_MAX = 100000;
const LIFE_MIN = 60, LIFE_MAX = 86;

function xScale(gdp) {
  const t = (Math.log(gdp) - Math.log(GDP_MIN)) / (Math.log(GDP_MAX) - Math.log(GDP_MIN));
  return PAD.left + t * CW;
}

function yScale(life) {
  const t = (life - LIFE_MIN) / (LIFE_MAX - LIFE_MIN);
  return PAD.top + CH - t * CH;
}

// ── SVG helpers ─────────────────────────────────────────────────────
const NS = 'http://www.w3.org/2000/svg';

function svgEl(tag, attrs = {}) {
  const node = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
}

function svgText(content, attrs = {}) {
  const node = svgEl('text', {
    'font-size': '9',
    fill: 'var(--ink-3)',
    'font-family': 'var(--font-mono)',
    ...attrs,
  });
  node.textContent = content;
  return node;
}

// ── Build SVG ───────────────────────────────────────────────────────
function buildChart() {
  const svg = document.getElementById('scatter-svg');

  // Axes
  const axisG = svgEl('g');

  axisG.appendChild(svgEl('line', {
    x1: PAD.left, y1: PAD.top, x2: PAD.left, y2: PAD.top + CH,
    stroke: 'var(--rule-2)', 'stroke-width': 1,
  }));
  axisG.appendChild(svgEl('line', {
    x1: PAD.left, y1: PAD.top + CH, x2: PAD.left + CW, y2: PAD.top + CH,
    stroke: 'var(--rule-2)', 'stroke-width': 1,
  }));

  // Axis labels
  const yLabelNode = svgEl('text', {
    transform: `translate(12,${PAD.top + CH / 2}) rotate(-90)`,
    'text-anchor': 'middle', 'font-size': '9',
    fill: 'var(--ink-3)', 'font-family': 'var(--font-mono)',
  });
  yLabelNode.textContent = 'Life expectancy (years)';
  axisG.appendChild(yLabelNode);

  const xLabelNode = svgEl('text', {
    x: PAD.left + CW / 2, y: H - 4,
    'text-anchor': 'middle', 'font-size': '9',
    fill: 'var(--ink-3)', 'font-family': 'var(--font-mono)',
  });
  xLabelNode.textContent = 'GDP per capita (log scale)';
  axisG.appendChild(xLabelNode);

  // Y ticks
  [62, 66, 70, 74, 78, 82, 86].forEach(life => {
    const y = yScale(life);
    axisG.appendChild(svgEl('line', {
      x1: PAD.left - 4, y1: y, x2: PAD.left + CW, y2: y,
      stroke: 'var(--rule)', 'stroke-width': 0.5,
      'stroke-dasharray': '3 4',
    }));
    axisG.appendChild(svgText(life, { x: PAD.left - 8, y: y + 3.5, 'text-anchor': 'end' }));
  });

  // X ticks (log-spaced GDP values)
  [
    { v: 1000,   label: '$1k'   },
    { v: 3000,   label: '$3k'   },
    { v: 10000,  label: '$10k'  },
    { v: 30000,  label: '$30k'  },
    { v: 100000, label: '$100k' },
  ].forEach(({ v, label }) => {
    const x = xScale(v);
    axisG.appendChild(svgEl('line', {
      x1: x, y1: PAD.top, x2: x, y2: PAD.top + CH + 4,
      stroke: 'var(--rule)', 'stroke-width': 0.5,
    }));
    axisG.appendChild(svgText(label, { x, y: PAD.top + CH + 14, 'text-anchor': 'middle' }));
  });

  svg.appendChild(axisG);

  // Dot groups
  const GROUP_COLOR = {
    low:  'var(--cat-engagement)',
    mid:  'var(--cat-flow)',
    high: 'var(--cat-emotion)',
  };

  ['low', 'mid', 'high'].forEach(group => {
    const g = svgEl('g', { id: `dots-${group}` });
    DATA.filter(d => d.group === group).forEach(d => {
      const circle = svgEl('circle', {
        cx: xScale(d.gdp).toFixed(1),
        cy: yScale(d.life).toFixed(1),
        r: 5.5,
        fill: GROUP_COLOR[group],
        opacity: 0,
      });
      const title = svgEl('title');
      title.textContent = `${d.name}: $${d.gdp.toLocaleString()} · ${d.life} yrs`;
      circle.appendChild(title);
      g.appendChild(circle);
    });
    svg.appendChild(g);
  });

  // Trend line (log-fit curve through key anchor points)
  const trendAnchors = [
    { gdp: 500,    life: 62.0 },
    { gdp: 1000,   life: 64.5 },
    { gdp: 2000,   life: 67.5 },
    { gdp: 4000,   life: 71.0 },
    { gdp: 8000,   life: 74.0 },
    { gdp: 16000,  life: 77.0 },
    { gdp: 35000,  life: 80.5 },
    { gdp: 80000,  life: 83.5 },
  ];
  const trendPts = trendAnchors
    .map(p => `${xScale(p.gdp).toFixed(1)},${yScale(p.life).toFixed(1)}`)
    .join(' ');

  const trendLine = svgEl('polyline', {
    id: 'trend-line',
    points: trendPts,
    fill: 'none',
    stroke: 'var(--ink)',
    'stroke-width': 2,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    opacity: 0,
  });
  svg.appendChild(trendLine);

  // Annotation: shaded $1k–$10k region + label
  const annotG = svgEl('g', { id: 'annotation', opacity: 0 });
  const ax1 = xScale(1000), ax2 = xScale(10000);

  annotG.appendChild(svgEl('rect', {
    x: ax1.toFixed(1), y: PAD.top,
    width: (ax2 - ax1).toFixed(1), height: CH,
    fill: 'var(--cat-flow)', opacity: 0.1,
  }));

  const labelX = ((ax1 + ax2) / 2).toFixed(1);
  const labelY = PAD.top + 18;

  const line1 = svgEl('text', {
    x: labelX, y: labelY,
    'text-anchor': 'middle', 'font-size': '9.5',
    fill: 'var(--cat-flow)', 'font-family': 'var(--font-mono)',
    'font-weight': '600',
  });
  line1.textContent = 'Greatest gains';
  annotG.appendChild(line1);

  const line2 = svgEl('text', {
    x: labelX, y: labelY + 13,
    'text-anchor': 'middle', 'font-size': '9.5',
    fill: 'var(--cat-flow)', 'font-family': 'var(--font-mono)',
    'font-weight': '600',
  });
  line2.textContent = 'happen here';
  annotG.appendChild(line2);

  svg.appendChild(annotG);
}

// ── Layer show/hide helpers ─────────────────────────────────────────
function showDots(group, animate) {
  const circles = document.querySelectorAll(`#dots-${group} circle`);
  circles.forEach((c, i) => {
    if (animate) {
      c.style.transition = 'none';
      c.style.opacity = '0';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        c.style.transition = `opacity 350ms ${i * 45}ms`;
        c.style.opacity = '0.8';
      }));
    } else {
      c.style.transition = 'none';
      c.style.opacity = '0.8';
    }
  });
}

function hideDots(group) {
  document.querySelectorAll(`#dots-${group} circle`).forEach(c => {
    c.style.transition = 'none';
    c.style.opacity = '0';
  });
}

function showTrend(animate) {
  const tl = document.getElementById('trend-line');
  if (animate) {
    const len = tl.getTotalLength();
    tl.style.transition = 'none';
    tl.style.strokeDasharray = len;
    tl.style.strokeDashoffset = len;
    tl.style.opacity = '1';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      tl.style.transition = 'stroke-dashoffset 900ms cubic-bezier(.4,0,.2,1)';
      tl.style.strokeDashoffset = '0';
    }));
  } else {
    tl.style.transition = 'none';
    tl.style.strokeDasharray = '';
    tl.style.strokeDashoffset = '0';
    tl.style.opacity = '1';
  }
}

function hideTrend() {
  const tl = document.getElementById('trend-line');
  tl.style.transition = 'none';
  tl.style.opacity = '0';
  tl.style.strokeDasharray = '';
  tl.style.strokeDashoffset = '0';
}

function showAnnotation(animate) {
  const ann = document.getElementById('annotation');
  if (animate) {
    ann.style.transition = 'none';
    ann.style.opacity = '0';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      ann.style.transition = 'opacity 500ms';
      ann.style.opacity = '1';
    }));
  } else {
    ann.style.transition = 'none';
    ann.style.opacity = '1';
  }
}

function hideAnnotation() {
  const ann = document.getElementById('annotation');
  ann.style.transition = 'none';
  ann.style.opacity = '0';
}

// ── Step controller ─────────────────────────────────────────────────
let currentStep = 0;
const prevShow = new Set();

const narrativeEl = document.getElementById('demo-narrative');
const counterEl   = document.getElementById('step-counter');
const btnEl       = document.getElementById('next-btn');

function applyStep(stepIndex, animate) {
  const step = STEPS[stepIndex];

  narrativeEl.textContent = step.narrative;
  counterEl.textContent   = `Step ${stepIndex + 1} of ${STEPS.length}`;
  btnEl.textContent       = step.btn;

  const show = step.show;

  ['low', 'mid', 'high'].forEach(group => {
    const wasVisible = prevShow.has(group);
    const willShow   = show.has(group);
    if (willShow && !wasVisible) showDots(group, animate);
    else if (willShow)           showDots(group, false);
    else                         hideDots(group);
  });

  if (show.has('trend') && !prevShow.has('trend')) showTrend(animate);
  else if (show.has('trend'))                      showTrend(false);
  else                                             hideTrend();

  if (show.has('annotation') && !prevShow.has('annotation')) showAnnotation(animate);
  else if (show.has('annotation'))                           showAnnotation(false);
  else                                                       hideAnnotation();

  prevShow.clear();
  show.forEach(v => prevShow.add(v));
}

btnEl.addEventListener('click', () => {
  if (STEPS[currentStep].isLast) {
    currentStep = 0;
    applyStep(0, false);
  } else {
    currentStep++;
    applyStep(currentStep, true);
  }
});

// ── Init ─────────────────────────────────────────────────────────────
buildChart();
applyStep(0, false);
