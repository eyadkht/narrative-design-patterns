// Pattern 13, Compare
// Demo: three pairs of numbers that share a dimension, drawn at honest
// proportional scale. The reader picks a topic chip and watches one bar
// tower over the other. The disparity itself is the chart, no axis
// tricks, no rescaling so the small one looks bigger.

const COMPARISONS = [
  {
    id: 'time',
    chip: 'Time',
    question: "How many hours a year does the average adult give each of these?",
    small: {
      label: 'Reading books',
      value: 17,
      unit: 'hours / year',
    },
    big: {
      label: 'Looking at a phone',
      value: 1168,
      unit: 'hours / year',
    },
    // The reader can't intuit a 68× gap from "3 hours a day". Seeing both
    // bars at honest scale makes it obvious.
    ratio: (s, b) => Math.round(b.value / s.value),
    punchline: (s, b, r) =>
      `Phones get <strong>${r}× more</strong> of your year than books do. Both numbers exist on the same calendar.`,
    source: 'Sources: BLS American Time Use Survey 2023; Data.ai State of Mobile 2024.',
  },
  {
    id: 'money',
    chip: 'Money',
    question: "Two line items, same currency. One you've heard of, one funds your local branch.",
    small: {
      label: 'Average annual budget of a US public library',
      value: 1.4,
      unit: 'million USD',
    },
    big: {
      label: 'Unit cost of one F-35A stealth fighter',
      value: 82.5,
      unit: 'million USD',
    },
    ratio: (s, b) => Math.round(b.value / s.value),
    punchline: (s, b, r) =>
      `One jet ≈ <strong>${r} libraries</strong> for a year. Both are paid for from the same pile.`,
    source: 'Sources: IMLS Public Libraries Survey FY2022; Lockheed Martin / DoD FY2024 procurement.',
  },
  {
    id: 'carbon',
    chip: 'Carbon',
    question: "Greenhouse gas per kilogram of food produced. Same metric, same kilo.",
    small: {
      label: 'Lentils',
      value: 0.9,
      unit: 'kg CO₂e / kg',
    },
    big: {
      label: 'Beef',
      value: 60,
      unit: 'kg CO₂e / kg',
    },
    ratio: (s, b) => Math.round(b.value / s.value),
    punchline: (s, b, r) =>
      `A kilo of beef costs the atmosphere about <strong>${r}× more</strong> than a kilo of lentils. Same plate, same weight.`,
    source: 'Source: Poore & Nemecek (2018), Science, life-cycle assessment of 38,700 farms.',
  },
];

const chipsEl    = document.getElementById('cmp-chips');
const cardEl     = document.getElementById('cmp-card');
const questionEl = document.getElementById('cmp-question');
const barsEl     = document.getElementById('cmp-bars');
const ratioNumEl = document.getElementById('cmp-ratio-num');
const ratioTxtEl = document.getElementById('cmp-ratio-text');
const sourceEl   = document.getElementById('cmp-source');

// Format value for the row "big number", keeps decimals where the input
// has decimals, otherwise just locale-formats with commas.
const fmt = (v) => {
  if (Number.isInteger(v)) return v.toLocaleString();
  if (v < 10)              return v.toFixed(1);
  return Math.round(v).toLocaleString();
};

// Render the bars block. We do this on every switch so the width animates
// from 0 → target each time, which feels intentional rather than abrupt.
const renderBars = (c) => {
  const max = Math.max(c.small.value, c.big.value);

  barsEl.innerHTML = `
    <div class="cmp-row small">
      <div class="cmp-row-head">
        <div class="cmp-row-label">${c.small.label}</div>
        <div class="cmp-row-value">
          ${fmt(c.small.value)}
          <span class="cmp-row-value-unit">${c.small.unit}</span>
        </div>
      </div>
      <div class="cmp-bar-track"><div class="cmp-bar-fill" data-target="${(c.small.value / max) * 100}"></div></div>
    </div>
    <div class="cmp-row big">
      <div class="cmp-row-head">
        <div class="cmp-row-label">${c.big.label}</div>
        <div class="cmp-row-value">
          ${fmt(c.big.value)}
          <span class="cmp-row-value-unit">${c.big.unit}</span>
        </div>
      </div>
      <div class="cmp-bar-track"><div class="cmp-bar-fill" data-target="${(c.big.value / max) * 100}"></div></div>
    </div>
  `;

  // Animate bars in on the next frame so the transition can run from 0.
  requestAnimationFrame(() => {
    barsEl.querySelectorAll('.cmp-bar-fill').forEach((fill) => {
      fill.style.width = fill.dataset.target + '%';
    });
  });
};

const renderCard = (c) => {
  const ratio = c.ratio(c.small, c.big);
  questionEl.textContent = c.question;
  renderBars(c);
  ratioNumEl.innerHTML   = `${ratio}×`;
  ratioTxtEl.innerHTML   = c.punchline(c.small, c.big, ratio);
  sourceEl.textContent   = c.source;
};

// Brief cross-fade between comparisons so the value swap doesn't feel jumpy.
const switchTo = (id) => {
  const next = COMPARISONS.find((c) => c.id === id);
  if (!next) return;

  cardEl.classList.add('is-fading');
  setTimeout(() => {
    renderCard(next);
    cardEl.classList.remove('is-fading');
  }, 280);

  chipsEl.querySelectorAll('.cmp-chip').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.id === id);
    btn.setAttribute('aria-selected', String(btn.dataset.id === id));
  });
};

// Build the chip nav.
chipsEl.innerHTML = COMPARISONS.map((c, i) => `
  <button class="cmp-chip ${i === 0 ? 'is-active' : ''}"
          role="tab"
          aria-selected="${i === 0}"
          data-id="${c.id}">${c.chip}</button>
`).join('');

chipsEl.querySelectorAll('.cmp-chip').forEach((btn) => {
  btn.addEventListener('click', () => switchTo(btn.dataset.id));
});

// Initial render, no fade, just paint.
renderCard(COMPARISONS[0]);
