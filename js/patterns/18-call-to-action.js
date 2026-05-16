// Pattern 18, Call-to-action
// Demo: a self-referential CTA for this project. A short data lead
// (reader enthusiasm for AI content fell 60% → 26%) sets up a single
// ask: share the project. Two share buttons, copy link and LinkedIn.

// ── Animate the lead bars in once on load ───────────────────────────
const bar2023 = document.getElementById('cta-bar-2023');
const bar2025 = document.getElementById('cta-bar-2025');
requestAnimationFrame(() => {
  bar2023.style.width = '60%';
  bar2025.style.width = '26%';
});

// ── Share buttons ───────────────────────────────────────────────────
const PAGE_URL = 'https://eyadkht.github.io/narrative-design-patterns/';

const liShare = document.getElementById('cta-share-li');
liShare.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(PAGE_URL)}`;

const copyBtn   = document.getElementById('cta-share-copy');
const copyLabel = document.getElementById('cta-share-copy-label');
copyBtn.addEventListener('click', async () => {
  const orig = copyLabel.textContent;
  try {
    await navigator.clipboard.writeText(PAGE_URL);
    copyLabel.textContent = 'Copied';
  } catch {
    copyLabel.textContent = 'Copy failed';
  }
  setTimeout(() => { copyLabel.textContent = orig; }, 1800);
});
