// Demo: Humans Behind the Dots, 100 UK rail commuters, one morning service.
// Each dot is one person; the grid mirrors the real age breakdown of UK rail
// commuters (ORR National Rail Travel Survey). Hover or focus a dot to meet
// one of them.

// Age group composition matches roughly real UK commuter demographics:
//   15% under 25  ·  50% age 25–44  ·  25% age 45–64  ·  10% age 65+
// The list below is ordered by age so the grid shows the structure visually.

const PEOPLE = [
  // ── 16–24  (15 people) ────────────────────────────────────────
  { n: 'Lillian',     a: 16, v: 'coming out to her grandmother today' },
  { n: 'Aiden',       a: 17, v: 'skipping school for the first time in his life' },
  { n: 'Clara',       a: 18, v: 'going to a protest for the first time' },
  { n: 'Jacob',       a: 19, v: 'moving to a new city with one suitcase' },
  { n: 'Róisín',      a: 19, v: 'leaving her small town for the very first time' },
  { n: 'Birdie',      a: 19, v: "her father's wedding to a stranger" },
  { n: 'Wren',        a: 21, v: 'first orchestra audition this morning' },
  { n: 'Sofia',       a: 22, v: "can't sit still, first day at university" },
  { n: 'Sigrid',      a: 22, v: "getting a tattoo of her grandmother's signature" },
  { n: 'Solène',      a: 22, v: 'performing a solo at the conservatory' },
  { n: 'Iris',        a: 23, v: 'submitting her PhD thesis tomorrow' },
  { n: 'Veda',        a: 23, v: "leaving her parents' faith" },
  { n: 'Tomi',        a: 23, v: 'picking up his first paycheck' },
  { n: 'Nico',        a: 24, v: 'auditioning to be a flight attendant' },
  { n: 'Lola',        a: 24, v: 'her first half-marathon on Sunday' },

  // ── 25–44  (50 people) ────────────────────────────────────────
  { n: 'Aleksy',      a: 25, v: 'first day teaching second grade' },
  { n: 'Lyra',        a: 25, v: 'stand-up comedy debut tonight' },
  { n: 'Hugo',        a: 26, v: 'moving home after a failed marriage' },
  { n: 'Zane',        a: 26, v: 'his comedy set airs on national TV tonight' },
  { n: 'Bram',        a: 26, v: 'packing his last day before deployment' },
  { n: 'Aaliyah',     a: 26, v: 'final divorce hearing this afternoon' },
  { n: 'Ezra',        a: 26, v: 'the funeral of the friend he lost in the crash' },
  { n: 'Yuki',        a: 27, v: 'about to hand in her resignation today' },
  { n: 'Maya',        a: 27, v: 'fleeing an abusive marriage this morning' },
  { n: 'Greta',       a: 28, v: "collecting her painting from a gallery's first show" },
  { n: 'Yara',        a: 28, v: 'visiting her brother in prison' },
  { n: 'Levi',        a: 28, v: 'coming home from rehab, day one' },
  { n: 'Florent',     a: 28, v: 'a chess tournament he trained a year for' },
  { n: 'Ada',         a: 29, v: 'reuniting with her estranged sister after six years' },
  { n: 'Casper',      a: 29, v: "telling his parents he's getting married" },
  { n: 'Ahmad',       a: 29, v: 'first day driving the ambulance' },
  { n: 'Jonas',       a: 30, v: 'proposing to his boyfriend in front of his parents' },
  { n: 'Saoirse',     a: 30, v: 'home after a year teaching in Tanzania' },
  { n: 'Nina',        a: 30, v: 'testifying about workplace harassment' },
  { n: 'Imogen',      a: 31, v: 'bringing her son home from the NICU' },
  { n: 'Adina',       a: 32, v: 'receiving a kidney from a stranger' },
  { n: 'Camila',      a: 32, v: 'tasting wedding cakes with her fiancée' },
  { n: 'Annika',      a: 33, v: 'IVF transfer scheduled for tomorrow' },
  { n: 'Devon',       a: 33, v: "finalising his daughter's adoption from foster care" },
  { n: 'Daniel',      a: 33, v: 'proposing to his partner over dinner tonight' },
  { n: 'Mira',        a: 34, v: 'heading to a job interview, hands shaking' },
  { n: 'Mateo',       a: 34, v: 'first day back at work after burnout leave' },
  { n: 'Hana',        a: 35, v: 'going to her first AA meeting alone' },
  { n: 'Tess',        a: 35, v: 'going to thank the surgeon who saved her son' },
  { n: 'Tarek',       a: 35, v: 'teaching his first university class today' },
  { n: 'Naveen',      a: 36, v: 'taking his daughter to choose her first dog' },
  { n: 'Patryk',      a: 36, v: 'crossing the country to take a chance on love' },
  { n: 'Estelle',     a: 36, v: 'getting her name legally changed today' },
  { n: 'Penelope',    a: 37, v: 'carrying twins as a surrogate for her best friend' },
  { n: 'Marcus',      a: 38, v: 'taking his son to his first football match' },
  { n: 'Inês',        a: 38, v: 'celebrating five years cancer-free' },
  { n: 'Karim',       a: 39, v: 'meeting his birth mother for the first time' },
  { n: 'Hamid',       a: 39, v: 'citizenship ceremony after a decade of waiting' },
  { n: 'Ravi',        a: 39, v: 'donating bone marrow to his cousin' },
  { n: 'Quinn',       a: 39, v: 'fostering their fourth child this year' },
  { n: 'Tatiana',     a: 40, v: 'meeting the editor for her first published book' },
  { n: 'Lin',         a: 41, v: 'closing the deal she has chased for three years' },
  { n: 'Vinh',        a: 41, v: 'buying his mother her dream house in cash' },
  { n: 'Erik',        a: 41, v: 'biopsy results back this afternoon' },
  { n: 'Frida',       a: 42, v: 'finishing her novel on the train this morning' },
  { n: 'Idris',       a: 42, v: 'adopting his foster son today' },
  { n: 'Otto',        a: 43, v: 'opening the bookshop he dreamed of for eight years' },
  { n: 'Theo',        a: 44, v: 'first city-council campaign event today' },
  { n: 'Bruno',       a: 44, v: 'a final visit to his father in hospice' },
  { n: 'Mara',        a: 44, v: 'chairing her first board meeting' },

  // ── 45–64  (25 people) ────────────────────────────────────────
  { n: 'Priya',       a: 45, v: "flying out to scatter her mother's ashes" },
  { n: 'Yumiko',      a: 45, v: 'translating for refugees, like every Saturday' },
  { n: 'Aurora',      a: 45, v: 'saying goodbye to her therapist of twelve years' },
  { n: 'Nikolai',     a: 47, v: 'terrified about the podcast interview today' },
  { n: 'Khalid',      a: 47, v: 'opening the school he and his wife built' },
  { n: 'Beatriz',     a: 48, v: 'testifying in court against her old boss' },
  { n: 'Pia',         a: 48, v: 'celebrating ten years sober' },
  { n: 'Liesl',       a: 49, v: 'leaving the law firm to open a bakery' },
  { n: 'Magnolia',    a: 50, v: 'voting in her home country for the first time in twenty years' },
  { n: 'Caius',       a: 50, v: 'voting in a country he reached after fleeing a war' },
  { n: 'Cassius',     a: 51, v: 'meeting the daughter he gave up for adoption' },
  { n: 'Tomás',       a: 51, v: 'on-call hospital weekend ahead' },
  { n: 'Cyrus',       a: 52, v: "accepting an award he doesn't think he deserves" },
  { n: 'Vincent',     a: 53, v: 'selling the family farm after three generations' },
  { n: 'Bartholomew', a: 54, v: "going to identify his estranged brother's body" },
  { n: 'Reza',        a: 55, v: 'going to confront his father about the past' },
  { n: 'Ferdinand',   a: 55, v: 'making peace with his estranged son' },
  { n: 'Naima',       a: 56, v: 'picking up her wedding dress after a year of training' },
  { n: 'Mei-Lin',     a: 58, v: 'retiring early to care for her father' },
  { n: 'Atticus',     a: 58, v: 'closing the door on his clinic of thirty years' },
  { n: 'Margot',      a: 59, v: 'a reunion of children from the orphanage' },
  { n: 'Felix',       a: 60, v: 'meeting an old army friend after forty years' },
  { n: 'Pavel',       a: 62, v: 'meeting the man whose life he saved thirty years ago' },
  { n: 'Esther',      a: 64, v: 'chemotherapy round seven of twelve' },
  { n: 'Olympia',     a: 64, v: "speaking at her granddaughter's graduation" },

  // ── 65+  (10 people) ──────────────────────────────────────────
  { n: 'Selma',       a: 65, v: 'burying her younger brother' },
  { n: 'David',       a: 67, v: 'meeting his new granddaughter for the first time' },
  { n: 'Cosima',      a: 67, v: 'finishing the marathon her late husband trained her for' },
  { n: 'Rafael',      a: 68, v: 'final shift before retirement at the docks' },
  { n: 'Sven',        a: 70, v: 'first day driving a school bus in retirement' },
  { n: 'Edward',      a: 71, v: 'visiting the grave of his wife of fifty years' },
  { n: 'Constance',   a: 71, v: 'her first watercolour class today' },
  { n: 'Henry',       a: 72, v: 'the same office, the fiftieth year running' },
  { n: 'Walter',      a: 75, v: "meeting the grandson he's only ever seen on a screen" },
  { n: 'Etta',        a: 81, v: 'going to flight school, finally' },
];

// ── Age group → colour token ────────────────────────────────────────
function ageGroup(a) {
  if (a < 25) return 'young';
  if (a < 45) return 'mid';
  if (a < 65) return 'senior';
  return 'elder';
}

// ── Build the dot grid ──────────────────────────────────────────────
const grid     = document.getElementById('dot-grid');
const nameEl   = document.getElementById('vignette-name');
const textEl   = document.getElementById('vignette-text');
const ageEl    = document.getElementById('vignette-age');
const promptEl = document.getElementById('vignette-prompt');
const cardEl   = document.getElementById('vignette-card');

PEOPLE.forEach((p, i) => {
  const btn = document.createElement('button');
  btn.className = 'dot';
  btn.type = 'button';
  btn.dataset.idx   = i;
  btn.dataset.group = ageGroup(p.a);
  btn.setAttribute('aria-label', `${p.n}, ${p.a}: ${p.v}`);
  grid.appendChild(btn);
});

// ── Vignette display ────────────────────────────────────────────────
const AGE_LABEL = {
  young:  '16–24',
  mid:    '25–44',
  senior: '45–64',
  elder:  '65+',
};

let activeIdx = -1;

function showPerson(idx) {
  if (idx === activeIdx) return;
  activeIdx = idx;

  grid.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('is-active', i === idx);
  });

  if (idx < 0) {
    grid.classList.remove('is-hovering');
    cardEl.classList.remove('is-visible');
    promptEl.classList.remove('is-hidden');
    return;
  }

  const p = PEOPLE[idx];
  nameEl.textContent = p.n;
  ageEl.textContent  = `${p.a} · ${AGE_LABEL[ageGroup(p.a)]}`;
  textEl.textContent = p.v;

  grid.classList.add('is-hovering');
  cardEl.classList.add('is-visible');
  promptEl.classList.add('is-hidden');
}

grid.addEventListener('mouseover', e => {
  const dot = e.target.closest('.dot');
  if (!dot) return;
  showPerson(parseInt(dot.dataset.idx, 10));
});

grid.addEventListener('mouseleave', () => showPerson(-1));

grid.addEventListener('focusin', e => {
  const dot = e.target.closest('.dot');
  if (!dot) return;
  showPerson(parseInt(dot.dataset.idx, 10));
});

grid.addEventListener('focusout', e => {
  if (!grid.contains(e.relatedTarget)) showPerson(-1);
});
