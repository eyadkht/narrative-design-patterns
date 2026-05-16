// Demo: Familiarisation, re-label a chart of famous journeys in the
// reader's own commute as the unit. 5,567 km becomes "278 of your daily
// commutes", a distance you can feel rather than read.

const JOURNEYS = [
  { label: 'Across your city',          sub: 'a typical urban diameter',  km:    25 },
  { label: 'London → Brighton',         sub: 'a UK weekend run',          km:    87 },
  { label: 'London → Paris',            sub: 'short-haul flight',          km:   344 },
  { label: 'London → Edinburgh',        sub: 'the East Coast Main Line',  km:   650 },
  { label: 'London → Rome',             sub: 'across Europe',             km:  1437 },
  { label: 'New York → Los Angeles',    sub: 'coast-to-coast US',         km:  3944 },
  { label: 'London → New York',         sub: 'transatlantic',             km:  5567 },
  { label: 'Tokyo → Sydney',            sub: 'long-haul',                 km:  7820 },
  { label: 'Around the Earth',          sub: 'at the equator',            km: 40075 },
];

const MOON_KM = 384_400;
const KM_PER_MILE = 1.60934;

// ── Number formatting ──────────────────────────────────────────────
function formatCount(n) {
  if (n < 1)      return n.toFixed(2);
  if (n < 10)     return n.toFixed(1);
  if (n < 10_000) return Math.round(n).toLocaleString();
  if (n < 1e6)    return `${(n / 1000).toFixed(n < 100_000 ? 1 : 0)}k`;
  return `${(n / 1e6).toFixed(1)}M`;
}

function formatDist(d) {
  if (d < 10)     return d.toFixed(1);
  if (d < 10000)  return Math.round(d).toLocaleString();
  return `${(d / 1000).toFixed(1)}k`;
}

// ── Bar scale (log, so small + huge journeys are both visible) ────
const LOG_MIN = Math.log10(20);
const LOG_MAX = Math.log10(40075);

function barPct(km) {
  const t = (Math.log10(km) - LOG_MIN) / (LOG_MAX - LOG_MIN);
  return Math.max(2, Math.min(100, t * 100));
}

// ── DOM refs ───────────────────────────────────────────────────────
const cityInput     = document.getElementById('city-input');
const commuteInput  = document.getElementById('commute-input');
const unitButtons   = document.querySelectorAll('[data-unit]');
const unitLabelEls  = document.querySelectorAll('.unit-label');
const chartEl       = document.getElementById('journey-chart');
const anchorEl      = document.getElementById('anchor-line');
const moonEl        = document.getElementById('moon-callout');
const promptEl      = document.getElementById('anchor-prompt');

let unit = 'km';   // 'km' | 'mi'

// ── Build journey rows once ────────────────────────────────────────
JOURNEYS.forEach((j, i) => {
  const row = document.createElement('div');
  row.className = 'journey-row';
  row.innerHTML = `
    <div class="journey-meta">
      <div class="journey-label">${j.label}</div>
      <div class="journey-sub">${j.sub}</div>
    </div>
    <div class="journey-bar"><div class="bar-fill" data-idx="${i}"></div></div>
    <div class="journey-numbers">
      <div class="bar-count" data-idx="${i}">,</div>
      <div class="bar-dist"  data-idx="${i}">,</div>
    </div>
  `;
  chartEl.appendChild(row);
});

// ── Update ─────────────────────────────────────────────────────────
function update() {
  const city = (cityInput.value || '').trim();
  const commuteRaw = parseFloat(commuteInput.value);

  // Sync the units label in the input
  unitLabelEls.forEach(el => { el.textContent = unit; });

  if (!commuteRaw || commuteRaw <= 0) {
    promptEl.style.opacity = '1';
    anchorEl.style.opacity = '0';
    moonEl.style.opacity   = '0.4';
    // Clear bars
    chartEl.querySelectorAll('.bar-fill').forEach(b => b.style.width = '0%');
    chartEl.querySelectorAll('.bar-count').forEach(b => b.textContent = ',');
    chartEl.querySelectorAll('.bar-dist').forEach(b => b.textContent = ',');
    return;
  }

  const commuteKm = unit === 'mi' ? commuteRaw * KM_PER_MILE : commuteRaw;

  // Anchor card
  promptEl.style.opacity = '0';
  anchorEl.style.opacity = '1';
  const cityPhrase = city ? ` around ${city}` : '';
  anchorEl.innerHTML = `
    <span class="anchor-label">Your daily commute</span>
    <span class="anchor-value">${commuteRaw.toLocaleString()} ${unit}${cityPhrase}</span>
    <span class="anchor-note">Every journey below is now measured in <em>your</em> commutes.</span>
  `;

  // Update each row
  JOURNEYS.forEach((j, i) => {
    const count = j.km / commuteKm;
    const dist  = unit === 'mi' ? j.km / KM_PER_MILE : j.km;

    const fill = chartEl.querySelector(`.bar-fill[data-idx="${i}"]`);
    const cnt  = chartEl.querySelector(`.bar-count[data-idx="${i}"]`);
    const dst  = chartEl.querySelector(`.bar-dist[data-idx="${i}"]`);

    fill.style.width   = `${barPct(j.km)}%`;
    cnt.innerHTML      = `<strong>${formatCount(count)}</strong> commutes`;
    dst.textContent    = `${formatDist(dist)} ${unit}`;
  });

  // Moon callout
  moonEl.style.opacity = '1';
  const moonCount  = MOON_KM / commuteKm;
  const moonDist   = unit === 'mi' ? MOON_KM / KM_PER_MILE : MOON_KM;
  const yearsDaily = moonCount / 365;
  const yearsStr   = yearsDaily < 1
    ? `${Math.round(yearsDaily * 12)} months`
    : yearsDaily < 100
      ? `${yearsDaily.toFixed(0)} years`
      : `${Math.round(yearsDaily).toLocaleString()} years`;

  moonEl.innerHTML = `
    <span class="moon-icon" aria-hidden="true">🌙</span>
    <div class="moon-body">
      <div class="moon-title">And the Moon?</div>
      <div class="moon-stat">
        <strong>${formatCount(moonCount)}</strong> of your commutes
       , that's <strong>${yearsStr}</strong> of commuting, every day, to reach it.
      </div>
      <div class="moon-sub">${formatDist(moonDist)} ${unit} from Earth</div>
    </div>
  `;
}

// ── Wire inputs ────────────────────────────────────────────────────
cityInput.addEventListener('input', update);
commuteInput.addEventListener('input', update);

unitButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    unitButtons.forEach(b => b.setAttribute('aria-pressed', 'false'));
    btn.setAttribute('aria-pressed', 'true');
    unit = btn.dataset.unit;
    update();
  });
});

// ── Init ───────────────────────────────────────────────────────────
update();
