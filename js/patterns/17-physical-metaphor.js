// Pattern 17, Physical Metaphor
// Demo: a ladder of real US median annual earnings by education level
// (BLS 2023). A stick figure stands on a rung; "Climb up" / "Step down"
// buttons move it. The motion is the metaphor, up = raise (green),
// down = cut (red), driven by real numbers, not abstract arrows.

// salary  = BLS "Education pays" 2024, median weekly earnings × 52, rounded
//           to the nearest $100. Source: bls.gov/careeroutlook/2025/data-on-display/education-pays.htm
// share   = % of US adults 25+ at this level. The cumulative figures
//           (≥HS, ≥Bachelor's, etc.) are from US Census CPS / ACS 2023
//           via educationdata.org and Census press release 2025. The split
//           between Some-college and Associate uses 2018 proportions (Census
//           Bureau, 2018 attainment table), since 2023 only publishes the
//           combined "≥some college" cumulative, see SPEC.md for the math.
// Ordered by salary descending so the ladder is strictly monotonic,
// climbing = more money on every rung. NB: Professional outearns Doctoral
// in the BLS data, so Professional is at the top.
const RUNGS = [
  { label: 'Professional degree',     salary: 122900, share: 1.5  },
  { label: 'Doctoral degree',         salary: 118500, share: 2.2  },
  { label: 'Master&rsquo;s degree',   salary:  95700, share: 11.1 },
  { label: 'Bachelor&rsquo;s degree', salary:  80200, share: 23.5 },
  { label: 'Associate degree',        salary:  57100, share:  9.9 },
  { label: 'Some college, no degree', salary:  52300, share: 15.7 },
  { label: 'High school diploma',     salary:  48400, share: 27.5 },
  { label: 'Less than high school',   salary:  38400, share:  8.6 },
];
const MAX_SHARE = Math.max(...RUNGS.map(r => r.share));

const W = 720, H = 480;
const TOP = 50, BOTTOM = 440;
const LADDER_X = 330;            // centre of the ladder, shifted left to leave room for the share column
const RAIL_GAP = 55;             // half-distance between the two rails
const N = RUNGS.length;
const yFor = (i) => TOP + (i / (N - 1)) * (BOTTOM - TOP);   // i=0 top rung
const fmt = (n) => '$' + n.toLocaleString('en-US');

const SVGNS = 'http://www.w3.org/2000/svg';
const el = (tag, attrs = {}, text) => {
  const n = document.createElementNS(SVGNS, tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  if (text != null) {
    if (text.includes('&')) n.innerHTML = text; else n.textContent = text;
  }
  return n;
};

const svg     = document.getElementById('pm-svg');
const stage   = document.getElementById('pm-stage');
const upBtn   = document.getElementById('pm-btn-up');
const dnBtn   = document.getElementById('pm-btn-down');
const headEl  = document.getElementById('pm-story-headline');
const capEl   = document.getElementById('pm-story-caption');

// ── Build the ladder ───────────────────────────────────────────────
// Left rail + right rail
svg.appendChild(el('line', { class: 'pm-rail', x1: LADDER_X - RAIL_GAP, x2: LADDER_X - RAIL_GAP, y1: TOP - 10, y2: BOTTOM + 10 }));
svg.appendChild(el('line', { class: 'pm-rail', x1: LADDER_X + RAIL_GAP, x2: LADDER_X + RAIL_GAP, y1: TOP - 10, y2: BOTTOM + 10 }));

// "% of US adults" column header, anchored absolutely so it always fits
const SHARE_BAR_X = 560;
const SHARE_BAR_MAX = 70;      // px, keeps "27.9%" label inside the 720-wide viewBox

svg.appendChild(el('text', {
  class: 'pm-share-header',
  x: SHARE_BAR_X, y: TOP - 24,
  'text-anchor': 'start',
}, '% OF US ADULTS 25+'));

// Rungs + labels + share bars
const rungEls = [];
const labelEls = [];
const salaryEls = [];
const shareEls = [];

RUNGS.forEach((r, i) => {
  const y = yFor(i);
  const rung   = el('line', { class: 'pm-rung', x1: LADDER_X - RAIL_GAP, x2: LADDER_X + RAIL_GAP, y1: y, y2: y });
  const lblEl  = el('text', { class: 'pm-rung-label',  x: LADDER_X - RAIL_GAP - 14, y, 'text-anchor': 'end' }, r.label);
  const salEl  = el('text', { class: 'pm-rung-salary', x: LADDER_X + RAIL_GAP + 14, y, 'text-anchor': 'start' }, fmt(r.salary) + '/yr');

  // Share bar + numeric label
  const barW = (r.share / MAX_SHARE) * SHARE_BAR_MAX;
  const bar  = el('rect', {
    class: 'pm-share-bar',
    x: SHARE_BAR_X, y: y - 5, width: barW, height: 10, rx: 1.5,
  });
  const shareLbl = el('text', {
    class: 'pm-share-label',
    x: SHARE_BAR_X + barW + 6, y, 'text-anchor': 'start',
  }, `${r.share}%`);

  svg.appendChild(rung);
  svg.appendChild(lblEl);
  svg.appendChild(salEl);
  svg.appendChild(bar);
  svg.appendChild(shareLbl);
  rungEls.push(rung);
  labelEls.push(lblEl);
  salaryEls.push(salEl);
  shareEls.push({ bar, label: shareLbl });
});

// ── Figure (stick person standing on a rung) ───────────────────────
const figure = el('g', { class: 'pm-figure', id: 'pm-figure' });
//  centred on LADDER_X, drawn to stand on the rung at y = 0 (local)
//  head, torso, arms, legs
const FIG_H = 56;  // figure height in svg units
figure.appendChild(el('circle', { class: 'head', cx: 0, cy: -FIG_H + 8, r: 7 }));                  // head
figure.appendChild(el('line', { x1: 0, y1: -FIG_H + 15, x2: 0, y2: -FIG_H + 36 }));                // torso
figure.appendChild(el('line', { x1: -10, y1: -FIG_H + 22, x2: 0,  y2: -FIG_H + 28 }));             // left arm (grips rail)
figure.appendChild(el('line', { x1: 10,  y1: -FIG_H + 22, x2: 0,  y2: -FIG_H + 28 }));             // right arm
figure.appendChild(el('line', { x1: 0, y1: -FIG_H + 36, x2: -7, y2: -2 }));                        // left leg
figure.appendChild(el('line', { x1: 0, y1: -FIG_H + 36, x2:  7, y2: -2 }));                        // right leg
svg.appendChild(figure);

// Delta badge that floats next to the figure on each move
const deltaEl = el('text', { class: 'pm-delta', id: 'pm-delta', x: LADDER_X + 110, y: 0 }, '');
svg.appendChild(deltaEl);

// ── State + interactions ───────────────────────────────────────────
// Start at "High school diploma" (index 6 of 8), a recognisable baseline.
let currentIdx = 6;

const renderFigure = (animate) => {
  const y = yFor(currentIdx);
  figure.setAttribute('transform', `translate(${LADDER_X} ${y})`);
  if (!animate) figure.style.transition = 'none';
  else figure.style.transition = '';
};

const renderHighlight = () => {
  rungEls.forEach((r, i)   => r.classList.toggle('is-current', i === currentIdx));
  labelEls.forEach((l, i)  => l.classList.toggle('is-current', i === currentIdx));
  salaryEls.forEach((s, i) => s.classList.toggle('is-current', i === currentIdx));
  shareEls.forEach((s, i) => {
    s.bar.classList.toggle('is-current', i === currentIdx);
    s.label.classList.toggle('is-current', i === currentIdx);
  });
};

const flashDelta = (deltaDollars, dir) => {
  const sign = deltaDollars >= 0 ? '+' : '−';
  deltaEl.textContent = `${sign}${Math.abs(deltaDollars).toLocaleString('en-US')}`;
  deltaEl.classList.remove('is-up', 'is-down');
  deltaEl.classList.add(dir === 'up' ? 'is-up' : 'is-down');
  // Anchor the badge next to the figure's current y
  deltaEl.setAttribute('y', yFor(currentIdx) - 30);
  deltaEl.setAttribute('x', LADDER_X + RAIL_GAP + 140);
  // Force reflow then add visible class so the transition runs
  void deltaEl.getBoundingClientRect();
  deltaEl.classList.add('is-visible');
  clearTimeout(flashDelta._t);
  flashDelta._t = setTimeout(() => deltaEl.classList.remove('is-visible'), 2200);
};

const updateStory = (dir, prevIdx) => {
  const cur = RUNGS[currentIdx];
  const prev = RUNGS[prevIdx];
  const delta = cur.salary - prev.salary;
  const sign = delta >= 0 ? '+' : '−';
  const moodWord = dir === 'up'
    ? `<em>That&rsquo;s a raise of ${sign}${fmt(Math.abs(delta)).slice(1)} a year.</em>`
    : `<em>That&rsquo;s a pay cut of ${sign}${fmt(Math.abs(delta)).slice(1)} a year.</em>`;

  const curLabel = cur.label.replace(/&[a-z]+;/g, m => m === '&rsquo;' ? '’' : m);

  // Special endpoints, make reaching the top/bottom feel like an arrival.
  if (currentIdx === 0) {
    const climbedPast = (100 - cur.share).toFixed(1);
    headEl.innerHTML = `Top of the ladder: <strong>${curLabel}</strong>, ${fmt(cur.salary)}/yr. Only <strong>${cur.share}%</strong> of US adults get here. ${moodWord}`;
    capEl.innerHTML = `You climbed past ${climbedPast}% of US adults to reach this rung. The chart didn&rsquo;t need to say &ldquo;winner&rdquo; &mdash; the visual of <em>standing at the top</em> already did. That&rsquo;s the metaphor.`;
    return;
  }
  if (currentIdx === N - 1) {
    headEl.innerHTML = `Bottom of the ladder: <strong>${curLabel}</strong>, ${fmt(cur.salary)}/yr. <strong>${cur.share}%</strong> of US adults stop here. ${moodWord}`;
    capEl.innerHTML = `Falling all the way to the floor <em>feels</em> like a loss before you read a single number. Down&nbsp;=&nbsp;bad is wired in that deeply.`;
    return;
  }

  headEl.innerHTML = `You moved ${dir === 'up' ? 'up' : 'down'} to <strong>${curLabel}</strong> &mdash; where <strong>${cur.share}%</strong> of US adults end up. ${moodWord}`;
  capEl.innerHTML = dir === 'up'
    ? `Notice how the climbing motion already <em>felt</em> like good news, before you read the dollar figure. That&rsquo;s the metaphor doing its job &mdash; up&nbsp;=&nbsp;good is wired in.`
    : `The downward step <em>felt</em> like bad news before the number arrived. Down&nbsp;=&nbsp;bad is wired in just as deeply.`;
};

const move = (dir) => {
  const prevIdx = currentIdx;
  if (dir === 'up' && currentIdx > 0)     currentIdx--;     // up = lower index (top of array is highest paid)
  else if (dir === 'down' && currentIdx < N - 1) currentIdx++;
  else return;

  stage.dataset.mood = dir;
  renderFigure(true);
  renderHighlight();
  flashDelta(RUNGS[currentIdx].salary - RUNGS[prevIdx].salary, dir);
  updateStory(dir, prevIdx);
  syncBtnState();
};

const syncBtnState = () => {
  upBtn.disabled = currentIdx === 0;
  dnBtn.disabled = currentIdx === N - 1;
};

upBtn.addEventListener('click', () => move('up'));
dnBtn.addEventListener('click', () => move('down'));

renderFigure(false);
renderHighlight();
syncBtnState();
