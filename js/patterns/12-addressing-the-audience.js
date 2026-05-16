// Pattern 12, Addressing the Audience
// Demo: a "How well do you know your own phone?" quiz, mirroring the PDF's
// "How Much Do You Know About Milk?" example. Three questions, each framed
// in second person. The reader slides their guess, locks it in, and a
// two-bar comparison (your guess vs the real number) reveals how far off
// they were, with a kicker line that keeps talking *to* them, not about
// the average person.

const QUESTIONS = [
  {
    id: 'unlocks',
    prompt:  'How many times a day do <span class="you">you</span> unlock <span class="you">your</span> phone?',
    min: 0, max: 200, step: 5, default: 40,
    unit: 'times',
    actual: 80,
    kicker: (guess, actual) => {
      const ratio = actual / Math.max(guess, 1);
      if (ratio >= 2)         return `Off by more than half. <span class="you">You</span> reach for it about once every <strong>twelve waking minutes</strong>.`;
      if (ratio >= 1.25)      return `<span class="you">You</span> undercounted. The real number is roughly once every <strong>twelve waking minutes</strong>.`;
      if (ratio <= 0.6)       return `<span class="you">You</span> overshot, but only just. It still works out to once every twelve waking minutes.`;
      return `Pretty close. The real number works out to once every <strong>twelve waking minutes</strong>.`;
    },
  },
  {
    id: 'pickups',
    prompt:  'How many notifications do <span class="you">you</span> get on <span class="you">your</span> phone in a day?',
    min: 0, max: 300, step: 5, default: 50,
    unit: 'notifications',
    actual: 60,
    kicker: (guess, actual) => {
      const diff = Math.abs(guess - actual);
      if (diff <= 10) return `Almost spot on. Most of those land while <span class="you">you</span>’re trying to do something else.`;
      if (guess < actual) return `<span class="you">You</span> guessed lower than the real number, <span class="you">your</span> phone interrupts <span class="you">you</span> more often than <span class="you">you</span> notice.`;
      return `<span class="you">You</span> guessed high. The real average is lower, but <span class="you">yours</span> probably arrive in the worst possible moments.`;
    },
  },
  {
    id: 'hours',
    prompt:  'How many hours a day do <span class="you">you</span> spend on <span class="you">your</span> phone?',
    min: 0, max: 12, step: 0.5, default: 3,
    unit: 'hours',
    actual: 3.2,
    format: (v) => v.toFixed(1),
    kicker: (guess, actual) => {
      const diff = guess - actual;
      if (Math.abs(diff) < 0.5) return `Honest answer. That's about <strong>49 days a year</strong> with <span class="you">your</span> eyes on this screen.`;
      if (diff < 0)             return `<span class="you">You</span> guessed lower than reality. That's still <strong>49 days of <span class="you">your</span> year</strong> spent on this screen.`;
      return `<span class="you">You</span> guessed higher than the average, but that average is already <strong>49 days a year</strong> per person.`;
    },
  },
];

const questionsEl = document.getElementById('ata-questions');
const summaryEl   = document.getElementById('ata-summary');

const state = QUESTIONS.map(q => ({
  id: q.id,
  guess: q.default,
  answered: false,
}));

const formatValue = (q, v) => (q.format ? q.format(v) : String(v));

// ── Render question cards once ────────────────────────────────────
questionsEl.innerHTML = QUESTIONS.map((q, i) => `
  <li class="ata-q" data-q="${i}">
    <p class="ata-q-text">${q.prompt}</p>

    <div class="ata-input">
      <input
        type="range"
        class="ata-slider"
        id="ata-slider-${i}"
        min="${q.min}" max="${q.max}" step="${q.step}" value="${q.default}"
        aria-label="Your guess"
      >
      <div class="ata-input-value">
        <span id="ata-value-${i}">${formatValue(q, q.default)}</span>
        <span class="ata-input-value-unit">${q.unit}</span>
      </div>
    </div>

    <button class="btn btn-primary ata-submit" data-submit="${i}">
      Lock in <span class="you">your</span> guess
    </button>

    <div class="ata-reveal" id="ata-reveal-${i}"></div>
  </li>
`).join('');

// ── Wire up slider + submit per question ─────────────────────────
QUESTIONS.forEach((q, i) => {
  const slider = document.getElementById(`ata-slider-${i}`);
  const value  = document.getElementById(`ata-value-${i}`);

  slider.addEventListener('input', () => {
    const v = q.step < 1 ? parseFloat(slider.value) : parseInt(slider.value, 10);
    state[i].guess = v;
    value.textContent = formatValue(q, v);
  });

  const submitBtn = questionsEl.querySelector(`[data-submit="${i}"]`);
  submitBtn.addEventListener('click', () => answer(i));
});

// ── Reveal logic ─────────────────────────────────────────────────
const answer = (i) => {
  if (state[i].answered) return;
  state[i].answered = true;

  const q = QUESTIONS[i];
  const card   = questionsEl.querySelector(`[data-q="${i}"]`);
  const slider = document.getElementById(`ata-slider-${i}`);
  const reveal = document.getElementById(`ata-reveal-${i}`);

  slider.disabled = true;
  card.classList.add('is-answered');

  const guess = state[i].guess;
  const actual = q.actual;
  const max = Math.max(guess, actual, q.max * 0.4); // shared scale for the two bars
  const guessPct  = (guess  / max) * 100;
  const actualPct = (actual / max) * 100;

  reveal.innerHTML = `
    <div class="ata-compare" aria-label="Your guess versus the real number">
      <div class="ata-compare-label">
        Your guess
        <strong>${formatValue(q, guess)} ${q.unit}</strong>
      </div>
      <div class="ata-bar-track"><div class="ata-bar-fill guess"  style="width:0"></div></div>
      <div class="ata-bar-value">${formatValue(q, guess)}</div>

      <div class="ata-compare-label">
        You, actually
        <strong>${formatValue(q, actual)} ${q.unit}</strong>
      </div>
      <div class="ata-bar-track"><div class="ata-bar-fill actual" style="width:0"></div></div>
      <div class="ata-bar-value">${formatValue(q, actual)}</div>
    </div>
    <p class="ata-kicker">${q.kicker(guess, actual)}</p>
  `;

  // Animate the bars in after the reveal block is in the DOM
  requestAnimationFrame(() => {
    reveal.querySelector('.ata-bar-fill.guess').style.width  = guessPct  + '%';
    reveal.querySelector('.ata-bar-fill.actual').style.width = actualPct + '%';
  });

  // If all answered → show the summary
  if (state.every(s => s.answered)) showSummary();
};

const showSummary = () => {
  // Average % miss across the three questions
  const miss = state.reduce((sum, s, i) => {
    const a = QUESTIONS[i].actual;
    return sum + Math.abs(s.guess - a) / a;
  }, 0) / state.length;

  const pct = Math.round(miss * 100);

  let verdict;
  if (pct < 15)      verdict = `<span class="you">You</span> actually know <span class="you">your</span> phone pretty well.`;
  else if (pct < 40) verdict = `<span class="you">You</span> were in the ballpark, but <span class="you">your</span> phone still surprises <span class="you">you</span>.`;
  else               verdict = `<span class="you">You</span> were off by quite a bit. <span class="you">Your</span> phone knows <span class="you">you</span> better than <span class="you">you</span> know it.`;

  summaryEl.innerHTML = `
    <p class="ata-summary-headline">${verdict}</p>
    <p class="ata-summary-sub">
      Across the three questions, <span class="you">your</span> guesses were off
      by an average of <strong>${pct}%</strong>. Same numbers, written about
      "the average user", would have bounced off without leaving a mark, but
      written about <span class="you">you</span>, they tend to stick.
    </p>
  `;
  summaryEl.classList.add('is-visible');
  summaryEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};
