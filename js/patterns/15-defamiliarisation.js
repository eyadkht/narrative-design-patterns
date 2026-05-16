// Pattern 15, Defamiliarisation
// Demo: the QWERTY keyboard, re-presented. Each key is colour-coded by how
// often English actually uses that letter (warmer = more frequent). One
// button reshuffles the same 26 keys into a frequency-ordered layout. In
// QWERTY mode the hot keys are scattered. In frequency mode they cluster
// on the top row. Same data, same letters, the convention you've used
// your whole life becomes visible only when it's broken.

// English letter frequencies (Norvig, ~3.5 trillion-letter corpus).
const FREQ = {
  E: 12.7, T: 9.1, A: 8.2, O: 7.5, I: 7.0, N: 6.7, S: 6.3, H: 6.1, R: 6.0,
  D: 4.3,  L: 4.0, C: 2.8, U: 2.8, M: 2.4, W: 2.4, F: 2.2, G: 2.0, Y: 2.0,
  P: 1.9,  B: 1.5, V: 1.0, K: 0.8, J: 0.15, X: 0.15, Q: 0.10, Z: 0.07,
};

const QWERTY = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['Z','X','C','V','B','N','M'],
];

// Descending by FREQ, then chunked 10/10/6 to mirror the QWERTY row sizes.
const FREQUENCY_ORDER = Object.keys(FREQ).sort((a, b) => FREQ[b] - FREQ[a]);
const BY_FREQUENCY = [
  FREQUENCY_ORDER.slice(0, 10),
  FREQUENCY_ORDER.slice(10, 20),
  FREQUENCY_ORDER.slice(20, 26),
];

// Key geometry in SVG units. ViewBox is 480 wide × 150 tall.
const KEY  = 40;
const GAP  = 4;
const STEP = KEY + GAP;

// QWERTY rows step staircase-right (half-key offsets) like a real keyboard.
// All offsets shifted +22 so the keyboard centres inside the 480-wide viewBox.
const QWERTY_X_OFFSET = [22, 44, 66];
// Frequency rows: first two are full-width 10-key rows; the 6-key tail row
// is centred under them so it doesn't read as dangling on the left.
const FREQ_X_OFFSET   = [22, 22, 110];

// Small y-pad so the top row doesn't hug the viewBox edge.
const Y_PAD = 8;

const positionFor = (letter, layout, xOffsets) => {
  for (let r = 0; r < layout.length; r++) {
    const idx = layout[r].indexOf(letter);
    if (idx >= 0) {
      return {
        x: xOffsets[r] + idx * STEP,
        y: Y_PAD + r * STEP,
      };
    }
  }
  return { x: 0, y: 0 };
};

// Build the SVG: one <g class="df-key"> per letter, transform-positioned.
const keyboard = document.getElementById('df-keyboard');
const SVGNS = 'http://www.w3.org/2000/svg';

const LETTERS = Object.keys(FREQ);
const maxFreq = FREQ.E; // 12.7%

const keyNodes = {};

LETTERS.forEach((letter) => {
  const g = document.createElementNS(SVGNS, 'g');
  g.setAttribute('class', 'df-key');
  g.setAttribute('data-letter', letter);

  const rect = document.createElementNS(SVGNS, 'rect');
  rect.setAttribute('class', 'df-key-rect');
  rect.setAttribute('width',  KEY);
  rect.setAttribute('height', KEY);
  rect.setAttribute('rx', 4);

  const text = document.createElementNS(SVGNS, 'text');
  text.setAttribute('class', 'df-key-text');
  text.setAttribute('x', KEY / 2);
  text.setAttribute('y', KEY / 2 + 1);
  text.textContent = letter;

  // Heat-colour the key by frequency. We use color-mix so both light and
  // dark themes pick up the right end-points from CSS variables.
  const intensity = Math.min(1, FREQ[letter] / maxFreq);
  const mix = Math.round(intensity * 100);
  rect.style.fill  = `color-mix(in srgb, var(--cat-framing) ${mix}%, var(--paper))`;
  text.style.fill  = intensity > 0.45 ? 'var(--paper)' : 'var(--ink)';

  g.appendChild(rect);
  g.appendChild(text);
  keyboard.appendChild(g);
  keyNodes[letter] = g;
});

// ── Layout switching ─────────────────────────────────────────────
const applyLayout = (mode) => {
  const layout    = mode === 'qwerty' ? QWERTY : BY_FREQUENCY;
  const xOffsets  = mode === 'qwerty' ? QWERTY_X_OFFSET : FREQ_X_OFFSET;

  LETTERS.forEach((letter) => {
    const pos = positionFor(letter, layout, xOffsets);
    keyNodes[letter].style.transform = `translate(${pos.x}px, ${pos.y}px)`;
  });
};

// ── Controls + copy ──────────────────────────────────────────────
const flipBtn   = document.getElementById('df-flip-btn');
const statusEl  = document.getElementById('df-status');
const punchline = document.getElementById('df-punchline');

const COPY = {
  qwerty: {
    status:    'QWERTY, the layout under your fingers right now',
    punchline: `Look at the warm-coloured keys. <strong>E, T, A, O, I, N</strong>, the letters English uses most, are sprinkled across the whole keyboard. Your fingers travel further on every word than they need to. This is the layout you have <em>never noticed</em> was making typing harder.`,
    btn:       'Re-order by frequency →',
  },
  frequency: {
    status:    'Frequency-ordered, same 26 letters, by how often you actually press them',
    punchline: `Same letters. The hot ones now cluster on a single row. QWERTY scatters them <em>on purpose</em>, Sholes designed the layout in 1878 to <strong>slow typists down</strong> so adjacent typewriter levers wouldn't jam. The keyboard under your fingers is still solving a problem from 150 years ago.`,
    btn:       '← Back to QWERTY',
  },
};

let mode = 'qwerty';

const apply = () => {
  applyLayout(mode);

  const c = COPY[mode];
  statusEl.textContent = c.status;
  flipBtn.textContent  = c.btn;

  punchline.classList.add('is-fading');
  setTimeout(() => {
    punchline.innerHTML = c.punchline;
    punchline.classList.remove('is-fading');
  }, 280);
};

flipBtn.addEventListener('click', () => {
  mode = (mode === 'qwerty') ? 'frequency' : 'qwerty';
  apply();
});

// Initial paint, position keys + render the QWERTY-mode punchline.
applyLayout(mode);
punchline.innerHTML = COPY.qwerty.punchline;
