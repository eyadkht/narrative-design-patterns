// Pattern 14, Convention Breaking
// Demo: two bar charts of women's representation in US Fortune 500 roles.
// In "broken" mode each chart picks its own y-axis (a common convention
// in editorial graphics), the two bars look similar. Flip the toggle and
// both charts re-scale to a shared 0–100% axis; the CEO bar collapses
// into a sliver. Same data, same numbers, only the axis convention
// changed, and the message changed with it.

const CHARTS = [
  {
    id: 'workforce',
    title: 'Women in the US labor force',
    barLabel: 'Workforce',
    value: 47,        // %
    // Independent-axis mode: choose a tight max so the bar fills the panel.
    brokenMax: 60,
    brokenTicks: [0, 20, 40, 60],
  },
  {
    id: 'ceos',
    title: 'Women among Fortune 500 CEOs',
    barLabel: 'CEOs',
    value: 8.8,       // %
    brokenMax: 12,
    brokenTicks: [0, 3, 6, 9, 12],
  },
];

const HONEST_MAX   = 100;
const HONEST_TICKS = [0, 25, 50, 75, 100];

const chartsEl    = document.getElementById('cb-charts');
const punchlineEl = document.getElementById('cb-punchline');
const btnBroken   = document.getElementById('cb-btn-broken');
const btnHonest   = document.getElementById('cb-btn-honest');

let mode = 'broken';

// ── Build the two chart panels once ────────────────────────────────
const buildCharts = () => {
  chartsEl.innerHTML = CHARTS.map((c) => `
    <div class="cb-chart" data-id="${c.id}">
      <p class="cb-chart-title">${c.title}</p>
      <p class="cb-chart-value">
        ${c.value}%
        <span class="cb-chart-value-unit">share of role</span>
      </p>
      <div class="cb-plot">
        <div class="cb-ticks" data-ticks></div>
        <div class="cb-bar-area" data-area>
          <div class="cb-bar" data-bar style="height: 0%"></div>
          <div class="cb-bar-label">${c.barLabel}</div>
        </div>
      </div>
    </div>
  `).join('');
};

// ── Render ticks (and gridlines) inside a panel ───────────────────
const renderTicks = (panel, ticks, max) => {
  const ticksEl = panel.querySelector('[data-ticks]');
  const areaEl  = panel.querySelector('[data-area]');

  ticksEl.innerHTML = ticks.map((t) => {
    const pct = (t / max) * 100;
    // top is measured from top of panel; tick at value t sits at (100 - pct)% from the top.
    return `<span class="cb-tick" style="top: ${100 - pct}%">${t}%</span>`;
  }).join('');

  // Remove old gridlines, draw new ones inside the bar area.
  areaEl.querySelectorAll('.cb-gridline').forEach((g) => g.remove());
  ticks.forEach((t) => {
    if (t === 0) return; // baseline already shown by the area border
    const g = document.createElement('span');
    g.className = 'cb-gridline';
    g.style.top = (100 - (t / max) * 100) + '%';
    areaEl.appendChild(g);
  });
};

// ── Apply current mode to both charts ─────────────────────────────
const applyMode = () => {
  CHARTS.forEach((c) => {
    const panel = chartsEl.querySelector(`[data-id="${c.id}"]`);
    const bar   = panel.querySelector('[data-bar]');

    const max   = (mode === 'broken') ? c.brokenMax   : HONEST_MAX;
    const ticks = (mode === 'broken') ? c.brokenTicks : HONEST_TICKS;
    const barPct = (c.value / max) * 100;

    renderTicks(panel, ticks, max);
    // Slight delay so the ticks animate at the same beat as the bar.
    requestAnimationFrame(() => {
      bar.style.height = barPct + '%';
    });
  });

  // Punchline copy
  const text = (mode === 'broken')
    ? `Both bars reach near the top of their panels, workforce share and CEO share <em>look</em> similar. That's the convention working as expected: each chart picked the y-axis that flattered it.`
    : `Same numbers, shared y-axis. The CEO bar collapses to <strong>~9%</strong> next to a workforce bar at <strong>47%</strong>. The disparity was hiding in the axis choice, not in the data.`;

  punchlineEl.classList.add('is-fading');
  setTimeout(() => {
    punchlineEl.innerHTML = text;
    punchlineEl.classList.remove('is-fading');
  }, 280);

  btnBroken.classList.toggle('is-active', mode === 'broken');
  btnHonest.classList.toggle('is-active', mode === 'honest');
  btnBroken.setAttribute('aria-selected', String(mode === 'broken'));
  btnHonest.setAttribute('aria-selected', String(mode === 'honest'));
};

buildCharts();
applyMode();

btnBroken.addEventListener('click', () => {
  if (mode === 'broken') return;
  mode = 'broken';
  applyMode();
});
btnHonest.addEventListener('click', () => {
  if (mode === 'honest') return;
  mode = 'honest';
  applyMode();
});
