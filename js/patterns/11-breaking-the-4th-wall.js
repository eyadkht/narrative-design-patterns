// Pattern 11, Breaking the 4th Wall
// Demo: a normal bar chart of daily screen time. On play, three of the bars
// take turns "speaking" to the reader. The animation highlights the bar in
// the chart, and a dedicated speaker panel below the chart shows that day's
// face (each day has its own expression) and its first-person message.
// Keeping speech in a fixed panel, rather than floating tooltips, means
// nothing has to be positioned against the bars.

const DATA = [
  { day:  1, label: 'Mon', hours: 4.1 },
  { day:  2, label: 'Tue', hours: 3.8 },
  { day:  3, label: 'Wed', hours: 4.4 },
  { day:  4, label: 'Thu', hours: 3.6 },
  { day:  5, label: 'Fri', hours: 9.2 },  // spike
  { day:  6, label: 'Sat', hours: 6.1 },
  { day:  7, label: 'Sun', hours: 6.4 },
  { day:  8, label: 'Mon', hours: 4.2 },
  { day:  9, label: 'Tue', hours: 1.1 },  // dip
  { day: 10, label: 'Wed', hours: 3.9 },
  { day: 11, label: 'Thu', hours: 4.0 },
  { day: 12, label: 'Fri', hours: 4.3 },
  { day: 13, label: 'Sat', hours: 5.8 },
  { day: 14, label: 'Sun', hours: 5.5 },
];

// Chart geometry
const W = 720, H = 360;
const M = { top: 32, right: 24, bottom: 32, left: 36 };
const innerW = W - M.left - M.right;
const innerH = H - M.top - M.bottom;
const Y_MAX = 10;
const Y_TICKS = [0, 2, 4, 6, 8, 10];

const slotW    = innerW / DATA.length;
const barWidth = slotW * 0.7;
const barGap   = slotW * 0.3;
const xFor = (i) => M.left + i * slotW + barGap / 2;
const yFor = (v) => M.top + innerH - (v / Y_MAX) * innerH;

const svg = document.getElementById('bw-chart');
const SVGNS = 'http://www.w3.org/2000/svg';
const el = (tag, attrs = {}, text = '') => {
  const n = document.createElementNS(SVGNS, tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  if (text) n.textContent = text;
  return n;
};

// gridlines + y-tick labels
for (const tick of Y_TICKS) {
  const y = yFor(tick);
  svg.appendChild(el('line', {
    class: 'bw-gridline',
    x1: M.left, x2: M.left + innerW, y1: y, y2: y,
  }));
  svg.appendChild(el('text', {
    class: 'bw-y-label',
    x: M.left - 6, y: y + 3, 'text-anchor': 'end',
  }, tick + (tick === 10 ? 'h' : '')));
}

const baselineY = M.top + innerH;
svg.appendChild(el('line', {
  class: 'bw-axis-line',
  x1: M.left, x2: M.left + innerW, y1: baselineY, y2: baselineY,
}));

// bars
const bars = [];
DATA.forEach((d, i) => {
  const x = xFor(i);
  const y = yFor(d.hours);
  const h = baselineY - y;
  const bar = el('rect', {
    class: 'bw-bar',
    'data-idx': i,
    x, y, width: barWidth, height: h, rx: 2,
  });
  svg.appendChild(bar);
  bars.push(bar);

  if (i % 2 === 0 || i === DATA.length - 1) {
    svg.appendChild(el('text', {
      class: 'bw-day-label',
      x: x + barWidth / 2,
      y: baselineY + 16,
      'text-anchor': 'middle',
    }, d.label));
  }
});

// ── Speaker panel ────────────────────────────────────────────────
const speaker      = document.getElementById('bw-speaker');
const avatar       = document.getElementById('bw-avatar');
const speakerLabel = document.getElementById('bw-speaker-label');
const speakerText  = document.getElementById('bw-speaker-text');
const playBtn      = document.getElementById('bw-play-btn');
const prompt       = document.getElementById('bw-prompt');

// Each subject: which bar speaks, its label, its message, and the face it
// wears in the speaker panel. Faces are simple SVG circles + features so
// each day reads as a distinct character.
//
// Face palette uses the page's existing emotion colour. The SVG fills come
// from CSS custom properties so light/dark themes stay coherent.
const face = (bg, features) => `
  <svg viewBox="0 0 84 84" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="42" cy="42" r="40" fill="${bg}"/>
    ${features}
  </svg>`;

const FACE_FRIDAY = face('var(--cat-emotion)', `
  <!-- Frazzled: X-shaped eyes + wavy mouth -->
  <path d="M26 32 L34 40 M34 32 L26 40" stroke="white" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M50 32 L58 40 M58 32 L50 40" stroke="white" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M26 58 Q31 52 36 58 T46 58 T56 58" stroke="white" stroke-width="2.2" fill="none" stroke-linecap="round"/>
  <!-- Sweat drop -->
  <path d="M64 24 Q66 30 64 32 Q62 30 64 24 Z" fill="white" opacity=".75"/>
`);

const FACE_TUESDAY = face('var(--cat-emotion)', `
  <!-- Smug: half-closed eyes + smirk -->
  <path d="M24 36 Q30 41 36 36" stroke="white" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  <path d="M48 36 Q54 41 60 36" stroke="white" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  <path d="M28 58 Q40 64 54 54" stroke="white" stroke-width="2.6" fill="none" stroke-linecap="round"/>
`);

const FACE_SUNDAY = face('var(--cat-emotion)', `
  <!-- Calm: round dot eyes + gentle smile -->
  <circle cx="32" cy="36" r="3.2" fill="white"/>
  <circle cx="52" cy="36" r="3.2" fill="white"/>
  <path d="M30 54 Q42 62 54 54" stroke="white" stroke-width="2.4" fill="none" stroke-linecap="round"/>
`);

const SUBJECTS = [
  {
    idx: 4,
    label: 'Friday · 9.2 hours',
    text: "Hi reader, yes, you. I'm Friday, the spike. Before you judge me: the human had food poisoning and spent the whole day on the couch with their phone.",
    faceSvg: FACE_FRIDAY,
  },
  {
    idx: 8,
    label: 'Tuesday · 1.1 hours',
    text: "Tuesday speaking. I'm only this low because the human left their phone at home all day. I am not a success story.",
    faceSvg: FACE_TUESDAY,
  },
  {
    idx: 13,
    label: 'Sunday · 5.5 hours',
    text: "Sunday here. Most of my hours were one long evening of doomscrolling in bed.",
    faceSvg: FACE_SUNDAY,
  },
];

const wakeBar  = (idx) => bars[idx].classList.add('is-speaking');
const sleepBar = (idx) => bars[idx].classList.remove('is-speaking');
const sleepAll = () => bars.forEach((_, i) => sleepBar(i));

const showSpeaker = (subject) => {
  speaker.classList.remove('is-idle');
  avatar.innerHTML = subject.faceSvg;
  speakerLabel.textContent = subject.label;
  speakerText.innerHTML = subject.text;

  // Stagger the reveal so the avatar lands first, then the text speaks.
  requestAnimationFrame(() => {
    avatar.classList.add('is-visible');
    setTimeout(() => speakerLabel.classList.add('is-visible'), 180);
    setTimeout(() => speakerText.classList.add('is-visible'),  320);
  });
};

const hideSpeaker = () => {
  avatar.classList.remove('is-visible');
  speakerLabel.classList.remove('is-visible');
  speakerText.classList.remove('is-visible');
};

// Idle state shown before the first play (and after replay finishes).
const setIdleSpeaker = (message) => {
  hideSpeaker();
  speaker.classList.add('is-idle');
  avatar.innerHTML = '';
  speakerLabel.textContent = '';
  speakerText.innerHTML = message;
  // .is-idle styling overrides opacity, so .is-visible isn't needed here.
};

setIdleSpeaker('Press play. Three of these days have something to say.');

const wait = (ms) => new Promise(r => setTimeout(r, ms));

const runNarration = async () => {
  sleepAll();
  hideSpeaker();
  speaker.classList.remove('is-idle');
  playBtn.disabled = true;
  prompt.textContent = 'playing…';

  await wait(300);

  for (const s of SUBJECTS) {
    wakeBar(s.idx);
    showSpeaker(s);
    await wait(7000);
    hideSpeaker();
    await wait(500);
    sleepBar(s.idx);
    await wait(500);
  }

  setIdleSpeaker('That’s all three. Replay to hear them again.');
  playBtn.disabled = false;
  playBtn.textContent = '↻ Replay';
  prompt.textContent = 'done';
};

playBtn.addEventListener('click', runNarration);
