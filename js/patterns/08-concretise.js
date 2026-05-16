// Demo: Concretise, slider sets a tonnage of plastic waste; the chart
// translates it into the closest physical equivalent the brain can picture:
// bin bags → London buses → Olympic pools → Wembley Stadiums.

// ── Scale ladder ─────────────────────────────────────────────────────
// Each scale has: max tonnage at which it applies, tonnes per single icon,
// the icon name, and the singular/plural labels.
const SCALES = [
  { upTo:        6, per:    0.05, icon: 'binbag',  one: 'bin bag',         many: 'household bin bags' },
  { upTo:     1200, per:   12,    icon: 'bus',     one: 'London bus',      many: 'London buses by weight' },
  { upTo:   250000, per: 2500,    icon: 'pool',    one: 'Olympic pool',    many: 'Olympic swimming pools by volume' },
  { upTo: Infinity, per: 1100000, icon: 'stadium', one: 'Wembley Stadium', many: 'Wembley Stadiums (full to the rim)' },
];

// All possible alt equivalents
const ALT_EQUIVS = [
  { icon: 'bottle',  per: 0.00002, one: 'plastic bottle',     many: 'plastic bottles' },
  { icon: 'bus',     per: 12,      one: 'London bus',         many: 'London buses by weight' },
  { icon: 'pool',    per: 2500,    one: 'Olympic pool',       many: 'Olympic pools by volume' },
  { icon: 'stadium', per: 1100000, one: 'Wembley Stadium',    many: 'Wembley Stadiums' },
];

// ── SVG icon library ────────────────────────────────────────────────
const ICONS = {
  binbag:  `<svg viewBox="0 0 24 32" aria-hidden="true">
    <path d="M7 7 L7 4 Q7 3 8 3 L16 3 Q17 3 17 4 L17 7 Q19 8 19 11 L21 28 Q21 30 19 30 L5 30 Q3 30 3 28 L5 11 Q5 8 7 7 Z"
          fill="var(--ink-2)"/>
    <path d="M9 12 Q12 14 15 12" stroke="var(--paper-2)" stroke-width="0.8" fill="none"/>
  </svg>`,
  bus: `<svg viewBox="0 0 40 24" aria-hidden="true">
    <rect x="3" y="4" width="34" height="14" rx="2" fill="var(--cat-engagement)"/>
    <rect x="5"  y="6" width="6" height="5" rx="0.5" fill="var(--paper)" opacity="0.55"/>
    <rect x="13" y="6" width="6" height="5" rx="0.5" fill="var(--paper)" opacity="0.55"/>
    <rect x="21" y="6" width="6" height="5" rx="0.5" fill="var(--paper)" opacity="0.55"/>
    <rect x="29" y="6" width="6" height="5" rx="0.5" fill="var(--paper)" opacity="0.55"/>
    <circle cx="10" cy="20" r="2.6" fill="var(--ink)"/>
    <circle cx="30" cy="20" r="2.6" fill="var(--ink)"/>
  </svg>`,
  pool: `<svg viewBox="0 0 48 18" aria-hidden="true">
    <rect x="1" y="2" width="46" height="14" rx="1" fill="var(--cat-emotion)"/>
    <line x1="3" y1="6"  x2="45" y2="6"  stroke="var(--paper)" stroke-width="0.6" opacity="0.55"/>
    <line x1="3" y1="9"  x2="45" y2="9"  stroke="var(--paper)" stroke-width="0.6" opacity="0.55"/>
    <line x1="3" y1="12" x2="45" y2="12" stroke="var(--paper)" stroke-width="0.6" opacity="0.55"/>
  </svg>`,
  stadium: `<svg viewBox="0 0 50 28" aria-hidden="true">
    <ellipse cx="25" cy="17" rx="22" ry="9" fill="var(--cat-flow)"/>
    <ellipse cx="25" cy="16" rx="16" ry="5" fill="var(--cat-framing)"/>
    <line x1="25" y1="11.5" x2="25" y2="20.5" stroke="var(--paper)" stroke-width="0.5" opacity="0.7"/>
  </svg>`,
  bottle: `<svg viewBox="0 0 12 24" aria-hidden="true">
    <rect x="5" y="1" width="2" height="3" rx="0.4" fill="var(--ink-3)"/>
    <path d="M4 4 L4 7 Q3 8 3 9 L3 21 Q3 23 5 23 L7 23 Q9 23 9 21 L9 9 Q9 8 8 7 L8 4 Z"
          fill="var(--cat-emotion)" opacity="0.85"/>
  </svg>`,
};

// ── Number formatting ───────────────────────────────────────────────
function formatTonnes(t) {
  if (t < 1)        return `${t.toFixed(2)} t`;
  if (t < 10)       return `${t.toFixed(1)} t`;
  if (t < 1000)     return `${Math.round(t).toLocaleString()} t`;
  if (t < 1e6)      return `${(t / 1000).toFixed(t < 10000 ? 1 : 0)}k t`;
  return `${(t / 1e6).toFixed(2)}M t`;
}

function formatCount(n) {
  if (n < 1)        return n.toFixed(2);
  if (n < 10)       return n.toFixed(1);
  if (n < 1000)     return Math.round(n).toLocaleString();
  if (n < 1e6)      return `${(n / 1000).toFixed(n < 10000 ? 1 : 0)}k`;
  if (n < 1e9)      return `${(n / 1e6).toFixed(n < 1e7 ? 1 : 0)}M`;
  return `${(n / 1e9).toFixed(1)}B`;
}

// ── Slider → tonnes (log scale) ─────────────────────────────────────
// Slider 0–1000 maps to 0.05 → 5,000,000 tonnes
const MIN_T = 0.05;
const MAX_T = 5_000_000;
const LOG_MIN = Math.log10(MIN_T);
const LOG_MAX = Math.log10(MAX_T);

function sliderToTonnes(s) {
  const v = s / 1000;
  return Math.pow(10, LOG_MIN + v * (LOG_MAX - LOG_MIN));
}

function pickScale(t) {
  return SCALES.find(s => t <= s.upTo);
}

// ── DOM refs ────────────────────────────────────────────────────────
const slider       = document.getElementById('qty-slider');
const qtyValueEl   = document.getElementById('qty-value');
const qtyContextEl = document.getElementById('qty-context');
const iconGrid     = document.getElementById('icon-grid');
const iconCaption  = document.getElementById('icon-caption');
const altListEl    = document.getElementById('alt-list');
const presetBtns   = document.querySelectorAll('[data-preset]');

const MAX_ICONS = 50;

// ── Update loop ─────────────────────────────────────────────────────
function update() {
  const t      = sliderToTonnes(parseInt(slider.value, 10));
  const scale  = pickScale(t);
  const count  = t / scale.per;

  // Headline value
  qtyValueEl.textContent = formatTonnes(t);

  // Context, what this is in everyday terms
  if (t < 0.1)             qtyContextEl.textContent = 'About a week of one household\'s plastic waste';
  else if (t < 1)          qtyContextEl.textContent = 'About one household, one year';
  else if (t < 100)        qtyContextEl.textContent = 'A small village, one year';
  else if (t < 10000)      qtyContextEl.textContent = 'A medium-sized town, one year';
  else if (t < 500000)     qtyContextEl.textContent = 'A British city, one year';
  else if (t < 4000000)    qtyContextEl.textContent = 'A whole UK region, one year';
  else                     qtyContextEl.textContent = 'The entire UK, one year';

  // Icon grid
  const displayCount = Math.min(MAX_ICONS, Math.max(1, Math.round(count)));
  const iconHtml = ICONS[scale.icon];
  let gridHtml = '';
  for (let i = 0; i < displayCount; i++) {
    gridHtml += `<span class="icon-cell">${iconHtml}</span>`;
  }
  if (count > MAX_ICONS) {
    const extra = count - MAX_ICONS;
    gridHtml += `<span class="icon-overflow">+ ${formatCount(extra)} more</span>`;
  }
  iconGrid.dataset.icon = scale.icon;
  iconGrid.innerHTML = gridHtml;

  // Primary caption
  const countStr = formatCount(count);
  const label    = (count >= 2 || count < 1) ? scale.many : scale.one;
  iconCaption.innerHTML = `≈ <strong>${countStr}</strong> ${label}`;

  // Alt equivalents: pick 3 that aren't the same as current scale's icon
  const alts = ALT_EQUIVS
    .filter(a => a.icon !== scale.icon)
    .map(a => {
      const c = t / a.per;
      const cs = formatCount(c);
      const lb = (c >= 2 || c < 1) ? a.many : a.one;
      return `<li><strong>${cs}</strong> ${lb}</li>`;
    })
    .slice(0, 3)
    .join('');
  altListEl.innerHTML = alts;
}

// ── Inputs ──────────────────────────────────────────────────────────
slider.addEventListener('input', update);

presetBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = parseFloat(btn.dataset.preset);
    // Invert log scale to find slider value
    const v = (Math.log10(target) - LOG_MIN) / (LOG_MAX - LOG_MIN);
    slider.value = Math.round(v * 1000);
    update();
  });
});

// ── Init ────────────────────────────────────────────────────────────
slider.value = 500;  // start middle-ish, around 500 tonnes
update();
