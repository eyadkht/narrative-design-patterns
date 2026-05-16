// Shared metadata for all 9 patterns (Part 1).
// categories[0] is the primary category (determines which section the pattern
// lives in on the index page). Remaining entries are secondary tags shown on
// cards and pattern pages for cross-category context.
// categories must match token ids: argumentation | engagement | flow | emotion | framing

var PATTERNS = [
  {
    id: '01-repetition',
    number: '01',
    title: 'Repetition',
    categories: ['argumentation', 'flow', 'emotion'],
    short: 'Repeat the same visual motif across multiple views to make a pattern feel inescapable.',
    why: 'One chart can be dismissed. The same finding surfacing across 12 small multiples is harder to ignore, repetition builds conviction.',
    how: 'Use small multiples with one highlighted element per chart, or loop an animation that keeps returning to the same visual beat.',
    example: { label: 'Bloomberg, Every Mass Shooting in America', url: 'https://www.bloomberg.com/graphics/2015-mass-shootings-in-america/' },
    illus: `<svg viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14"  y="12" width="44" height="18" rx="2" fill="var(--paper-3)" stroke="var(--rule)" stroke-width="1"/>
      <rect x="16"  y="22" width="28" height="6"  rx="1" fill="var(--ink)" opacity=".18"/>
      <rect x="14"  y="40" width="44" height="18" rx="2" fill="var(--paper-3)" stroke="var(--rule)" stroke-width="1"/>
      <rect x="16"  y="50" width="28" height="6"  rx="1" fill="var(--cat-argumentation)"/>
      <rect x="14"  y="68" width="44" height="18" rx="2" fill="var(--paper-3)" stroke="var(--rule)" stroke-width="1"/>
      <rect x="16"  y="78" width="28" height="6"  rx="1" fill="var(--ink)" opacity=".18"/>
      <rect x="70"  y="12" width="44" height="18" rx="2" fill="var(--paper-3)" stroke="var(--rule)" stroke-width="1"/>
      <rect x="72"  y="22" width="20" height="6"  rx="1" fill="var(--ink)" opacity=".18"/>
      <rect x="70"  y="40" width="44" height="18" rx="2" fill="var(--paper-3)" stroke="var(--rule)" stroke-width="1"/>
      <rect x="72"  y="50" width="20" height="6"  rx="1" fill="var(--cat-argumentation)"/>
      <rect x="70"  y="68" width="44" height="18" rx="2" fill="var(--paper-3)" stroke="var(--rule)" stroke-width="1"/>
      <rect x="72"  y="78" width="20" height="6"  rx="1" fill="var(--ink)" opacity=".18"/>
      <rect x="126" y="12" width="44" height="18" rx="2" fill="var(--paper-3)" stroke="var(--rule)" stroke-width="1"/>
      <rect x="128" y="22" width="32" height="6"  rx="1" fill="var(--ink)" opacity=".18"/>
      <rect x="126" y="40" width="44" height="18" rx="2" fill="var(--paper-3)" stroke="var(--rule)" stroke-width="1"/>
      <rect x="128" y="50" width="32" height="6"  rx="1" fill="var(--cat-argumentation)"/>
      <rect x="126" y="68" width="44" height="18" rx="2" fill="var(--paper-3)" stroke="var(--rule)" stroke-width="1"/>
      <rect x="128" y="78" width="32" height="6"  rx="1" fill="var(--ink)" opacity=".18"/>
    </svg>`,
  },
  {
    id: '02-silent-data',
    number: '02',
    title: 'Silent Data',
    categories: ['argumentation', 'emotion'],
    short: 'Deliberately ghost a data point to create tension, then reveal it for maximum impact.',
    why: 'Absence speaks. A barely-visible bar that turns out to be 10x larger reframes everything the reader assumed.',
    how: 'Show the chart with the silent element as a faint ghost or missing entirely. On click or scroll, reveal it with an animated entrance.',
    example: { label: 'Guardian, The Counted', url: 'https://www.theguardian.com/us-news/ng-interactive/2015/jun/01/the-counted-police-killings-us-database' },
    illus: `<svg viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15"  y="45" width="22" height="47" rx="2" fill="var(--cat-argumentation)"/>
      <rect x="47"  y="55" width="22" height="37" rx="2" fill="var(--cat-argumentation)"/>
      <rect x="79"  y="38" width="22" height="54" rx="2" fill="var(--cat-argumentation)"/>
      <rect x="111" y="50" width="22" height="42" rx="2" fill="var(--cat-argumentation)"/>
      <rect x="143" y="15" width="22" height="77" rx="2" fill="var(--cat-argumentation)" opacity=".12" stroke="var(--cat-argumentation)" stroke-width="1" stroke-dasharray="3 2"/>
    </svg>`,
  },
  {
    id: '03-exploration',
    number: '03',
    title: 'Exploration',
    categories: ['engagement', 'flow'],
    short: 'Let readers steer the story by filtering, sorting, and drilling into what matters to them.',
    why: 'Data is rarely one-size-fits-all. Different readers care about different slices. Giving them control increases relevance and time-on-story.',
    how: 'Add a filter bar, segmented control, or dropdown that rewrites the chart in place. Keep transitions smooth (FLIP) so readers understand what changed.',
    example: { label: 'The Pudding, Film Dialogue by Gender', url: 'https://pudding.cool/2017/03/film-dialogue/' },
    illus: `<svg viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="70" width="22" height="22" rx="2" fill="var(--cat-engagement)"/>
      <rect x="42" y="50" width="22" height="42" rx="2" fill="var(--cat-engagement)" opacity=".5"/>
      <rect x="74" y="30" width="22" height="62" rx="2" fill="var(--cat-flow)"/>
      <rect x="106" y="55" width="22" height="37" rx="2" fill="var(--cat-flow)" opacity=".5"/>
      <rect x="138" y="45" width="22" height="47" rx="2" fill="var(--cat-engagement)" opacity=".7"/>
      <rect x="10"  y="8" width="50" height="14" rx="7" fill="var(--ink)" opacity=".15"/>
      <rect x="68"  y="8" width="50" height="14" rx="7" stroke="var(--rule-2)" stroke-width="1"/>
      <rect x="126" y="8" width="44" height="14" rx="7" stroke="var(--rule-2)" stroke-width="1"/>
    </svg>`,
  },
  {
    id: '04-users-find-themselves',
    number: '04',
    title: 'Users Find Themselves',
    categories: ['engagement', 'emotion'],
    short: 'Invite readers to locate themselves in the data so the story becomes personally relevant.',
    why: 'Abstract population data feels remote. The moment readers see their own dot, the story becomes about them, engagement spikes.',
    how: 'Add dropdowns (age, country, income) that reposition a highlighted dot among the population scatter.',
    example: { label: 'NYT, You Draw It: Family Income and College', url: 'https://www.nytimes.com/interactive/2015/05/28/upshot/you-draw-it-how-family-income-affects-childrens-college-chances.html' },
    illus: `<svg viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20"  cy="20" r="4" fill="var(--ink)" opacity=".15"/>
      <circle cx="38"  cy="20" r="4" fill="var(--ink)" opacity=".15"/>
      <circle cx="56"  cy="20" r="4" fill="var(--ink)" opacity=".15"/>
      <circle cx="74"  cy="20" r="4" fill="var(--ink)" opacity=".15"/>
      <circle cx="92"  cy="20" r="4" fill="var(--ink)" opacity=".15"/>
      <circle cx="110" cy="20" r="4" fill="var(--ink)" opacity=".15"/>
      <circle cx="128" cy="20" r="4" fill="var(--ink)" opacity=".15"/>
      <circle cx="146" cy="20" r="4" fill="var(--ink)" opacity=".15"/>
      <circle cx="20"  cy="42" r="4" fill="var(--ink)" opacity=".15"/>
      <circle cx="38"  cy="42" r="4" fill="var(--ink)" opacity=".15"/>
      <circle cx="56"  cy="42" r="4" fill="var(--ink)" opacity=".15"/>
      <circle cx="74"  cy="42" r="4" fill="var(--ink)" opacity=".15"/>
      <circle cx="92"  cy="42" r="4" fill="var(--ink)" opacity=".15"/>
      <circle cx="110" cy="42" r="6" fill="var(--cat-engagement)"/>
      <circle cx="128" cy="42" r="4" fill="var(--ink)" opacity=".15"/>
      <circle cx="146" cy="42" r="4" fill="var(--ink)" opacity=".15"/>
      <circle cx="20"  cy="64" r="4" fill="var(--ink)" opacity=".15"/>
      <circle cx="38"  cy="64" r="4" fill="var(--ink)" opacity=".15"/>
      <circle cx="56"  cy="64" r="4" fill="var(--ink)" opacity=".15"/>
      <circle cx="74"  cy="64" r="4" fill="var(--ink)" opacity=".15"/>
      <circle cx="92"  cy="64" r="4" fill="var(--ink)" opacity=".15"/>
      <circle cx="110" cy="64" r="4" fill="var(--ink)" opacity=".15"/>
      <circle cx="128" cy="64" r="4" fill="var(--ink)" opacity=".15"/>
      <circle cx="146" cy="64" r="4" fill="var(--ink)" opacity=".15"/>
    </svg>`,
  },
  {
    id: '05-humans-behind-the-dots',
    number: '05',
    title: 'Humans Behind the Dots',
    categories: ['engagement', 'emotion'],
    short: 'Surface the individual story hiding inside aggregate data to rekindle empathy at scale.',
    why: 'Statistical compassion fatigue is real. One vivid personal detail does more emotional work than a thousand-row dataset.',
    how: 'Render a grid of dots. Hovering reveals a short vignette about the real person that dot represents.',
    example: { label: 'Periscopic, US Gun Deaths', url: 'https://guns.periscopic.com/' },
    illus: `<svg viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15"  cy="15" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="31"  cy="15" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="47"  cy="15" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="63"  cy="15" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="79"  cy="15" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="95"  cy="15" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="111" cy="15" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="127" cy="15" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="143" cy="15" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="159" cy="15" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="15"  cy="35" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="31"  cy="35" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="47"  cy="35" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="63"  cy="35" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="79"  cy="35" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="95"  cy="35" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="111" cy="35" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="127" cy="35" r="5" fill="var(--cat-emotion)"/>
      <circle cx="143" cy="35" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="159" cy="35" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="15"  cy="55" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="31"  cy="55" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="47"  cy="55" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="63"  cy="55" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="79"  cy="55" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="95"  cy="55" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="111" cy="55" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="127" cy="55" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="143" cy="55" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="159" cy="55" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="15"  cy="75" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="31"  cy="75" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="47"  cy="75" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="63"  cy="75" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="79"  cy="75" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="95"  cy="75" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="111" cy="75" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="127" cy="75" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="143" cy="75" r="3" fill="var(--ink)" opacity=".2"/>
      <circle cx="159" cy="75" r="3" fill="var(--ink)" opacity=".2"/>
    </svg>`,
  },
  {
    id: '06-gradual-reveal',
    number: '06',
    title: 'Gradual Reveal',
    categories: ['flow', 'emotion'],
    short: 'Introduce complexity layer by layer so each insight lands before the next arrives.',
    why: 'Dumping all information at once overwhelms. Staged disclosure creates a narrative arc and lets each finding land with full force.',
    how: 'Use a "Next" button or scroll trigger to add layers: axes, data points, trend line, annotation, conclusion.',
    example: { label: 'NYT, How the Recession Reshaped the Economy', url: 'https://www.nytimes.com/interactive/2014/06/05/upshot/how-the-recession-reshaped-the-economy-in-255-charts.html' },
    illus: `<svg viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40"  cy="60" r="6" fill="var(--cat-flow)" opacity=".2"/>
      <circle cx="65"  cy="45" r="6" fill="var(--cat-flow)" opacity=".4"/>
      <circle cx="90"  cy="35" r="6" fill="var(--cat-flow)" opacity=".65"/>
      <circle cx="115" cy="50" r="6" fill="var(--cat-flow)" opacity=".8"/>
      <circle cx="140" cy="30" r="6" fill="var(--cat-flow)"/>
      <line x1="30" y1="75" x2="150" y2="75" stroke="var(--rule-2)" stroke-width="1.5"/>
      <path d="M38 62 L65 47 L90 37 L115 52 L142 32" stroke="var(--cat-flow)" stroke-width="1.5" stroke-dasharray="3 2"/>
    </svg>`,
  },
  {
    id: '07-speed-up-slow-down',
    number: '07',
    title: 'Speed-up / Slow-down',
    categories: ['flow', 'engagement'],
    short: 'Control playback tempo so that dense, critical moments get the attention they deserve.',
    why: 'Uniform animation speed treats all moments as equal. Slowing down at complexity signals: pay attention here.',
    how: 'Use a rate slider (0.25x to 4x) plus auto-slow logic that detects dense data regions and drops speed automatically.',
    example: { label: 'NYT Upshot, Marathon Pace', url: 'https://www.nytimes.com/interactive/2014/04/22/sports/marathons/how-the-clock-ticks-for-marathon-runners.html' },
    illus: `<svg viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="20"  y1="60" x2="160" y2="60" stroke="var(--rule-2)" stroke-width="1.5"/>
      <line x1="20"  y1="52" x2="20"  y2="68" stroke="var(--rule-2)" stroke-width="1"/>
      <line x1="160" y1="52" x2="160" y2="68" stroke="var(--rule-2)" stroke-width="1"/>
      <circle cx="45" cy="60" r="7" fill="var(--cat-flow)"/>
      <circle cx="100" cy="60" r="3" fill="var(--ink-3)" opacity=".4"/>
      <circle cx="112" cy="60" r="3" fill="var(--ink-3)" opacity=".3"/>
      <circle cx="122" cy="60" r="3" fill="var(--ink-3)" opacity=".2"/>
      <circle cx="130" cy="60" r="3" fill="var(--ink-3)" opacity=".1"/>
    </svg>`,
  },
  {
    id: '08-concretise',
    number: '08',
    title: 'Concretise',
    categories: ['emotion'],
    short: 'Translate abstract quantities into familiar physical equivalents so the scale finally clicks.',
    why: '"700,000 tonnes" means nothing. "Enough to fill 280 Olympic swimming pools" does. Concrete anchors make magnitude visceral.',
    how: 'A slider sets the quantity; JS maps it to stacked SVG icons of real-world objects (buses, pools, football fields).',
    example: { label: 'Information is Beautiful, Mountains Out of Molehills', url: 'https://informationisbeautiful.net/visualizations/mountains-out-of-molehills/' },
    illus: `<svg viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="72" width="20" height="14" rx="2" fill="var(--cat-emotion)"/>
      <rect x="20" y="56" width="20" height="14" rx="2" fill="var(--cat-emotion)" opacity=".8"/>
      <rect x="20" y="40" width="20" height="14" rx="2" fill="var(--cat-emotion)" opacity=".6"/>
      <rect x="20" y="24" width="20" height="14" rx="2" fill="var(--cat-emotion)" opacity=".4"/>
      <rect x="50" y="72" width="20" height="14" rx="2" fill="var(--cat-emotion)"/>
      <rect x="50" y="56" width="20" height="14" rx="2" fill="var(--cat-emotion)" opacity=".8"/>
      <rect x="50" y="40" width="20" height="14" rx="2" fill="var(--cat-emotion)" opacity=".6"/>
      <rect x="80" y="72" width="20" height="14" rx="2" fill="var(--cat-emotion)"/>
      <rect x="80" y="56" width="20" height="14" rx="2" fill="var(--cat-emotion)" opacity=".8"/>
      <rect x="80" y="40" width="20" height="14" rx="2" fill="var(--cat-emotion)" opacity=".4"/>
      <rect x="110" y="72" width="20" height="14" rx="2" fill="var(--cat-emotion)" opacity=".5"/>
      <rect x="148" y="15" width="8" height="80" rx="4" fill="var(--ink)" opacity=".08"/>
      <rect x="148" y="55" width="8" height="40" rx="4" fill="var(--ink)" opacity=".3"/>
    </svg>`,
  },
  {
    id: '09-familiarisation',
    number: '09',
    title: 'Familiarisation',
    categories: ['framing', 'emotion'],
    short: "Re-label the chart around the reader's own reference point so unfamiliar scales feel intuitive.",
    why: "Readers can't feel the distance from London to Tokyo. But they can feel the distance from home to the supermarket, scaled up.",
    how: "User types their city and a reference distance; the chart redraws axis labels relative to that personal anchor.",
    example: { label: 'BBC, Syrian Refugees Journey', url: 'https://www.bbc.com/news/world-europe-34131911' },
    illus: `<svg viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="80" x2="160" y2="80" stroke="var(--rule-2)" stroke-width="1.5"/>
      <line x1="20" y1="80" x2="20"  y2="20" stroke="var(--rule-2)" stroke-width="1.5"/>
      <path d="M20 70 L55 55 L90 40 L125 28 L160 18" stroke="var(--cat-framing)" stroke-width="2" fill="none"/>
      <line x1="75" y1="20" x2="75"  y2="80" stroke="var(--cat-framing)" stroke-width="1" stroke-dasharray="3 2" opacity=".6"/>
      <circle cx="75" cy="43" r="4" fill="var(--cat-framing)"/>
    </svg>`,
  },
  {
    id: '10-rhetorical-question',
    number: '10',
    title: 'Rhetorical Question',
    categories: ['framing', 'argumentation'],
    short: 'Open with a question the reader is already half-asking, then let the chart deliver the answer.',
    why: 'A headline that asserts puts the reader on the defensive. A headline that asks puts them in the seat next to you, hunting for the answer in the same data.',
    how: 'Lead with a punchy rhetorical question as the title. Hold the chart back until the reader opts in (a button, a scroll). Reveal so the answer lands as discovery, not lecture.',
    example: { label: 'FT, Have UK house prices really raced ahead of wages?', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/housing/bulletins/housingaffordabilityinenglandandwales/1997to2016' },
    illus: `<svg viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="14" y="32" font-family="Fraunces, serif" font-style="italic" font-size="18" fill="var(--ink)">Really?</text>
      <line x1="14" y1="42" x2="78" y2="42" stroke="var(--cat-framing)" stroke-width="2"/>
      <rect x="100" y="20" width="68" height="44" rx="3" fill="var(--paper-3)" stroke="var(--rule)" stroke-width="1"/>
      <path d="M106 56 L120 50 L134 44 L148 36 L162 26" stroke="var(--cat-framing)" stroke-width="1.6" fill="none"/>
      <path d="M106 58 L120 56 L134 54 L148 52 L162 50" stroke="var(--cat-argumentation)" stroke-width="1.6" fill="none"/>
      <circle cx="162" cy="26" r="2.5" fill="var(--cat-framing)"/>
      <circle cx="162" cy="50" r="2.5" fill="var(--cat-argumentation)"/>
      <text x="14" y="84" font-family="ui-monospace, monospace" font-size="9" fill="var(--ink-3)">click to reveal ↓</text>
    </svg>`,
  },
  {
    id: '11-breaking-the-4th-wall',
    number: '11',
    title: 'Breaking the 4th Wall',
    categories: ['emotion', 'framing'],
    short: "Let the subject inside the chart turn and address the reader, building trust and emotional connection.",
    why: "A neutral chart keeps the reader at arm's length. When the subject inside the frame turns and speaks to the reader directly, the distance collapses, the data stops being a specimen on a slide and becomes someone in the room.",
    how: "Give the entity in the data a voice and aim it at the reader. A bar that looks back, a country that introduces itself, a dot with a speech bubble, anything that lets the subject step out of the frame and talk to the person reading.",
    example: { label: 'Mona Chalabi, illustrated data with characters that address the viewer', url: 'https://monachalabi.com/' },
    illus: `<svg viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20"  y="60" width="14" height="26" rx="1.5" fill="var(--cat-framing)" opacity=".55"/>
      <rect x="38"  y="48" width="14" height="38" rx="1.5" fill="var(--cat-framing)" opacity=".55"/>
      <rect x="56"  y="22" width="14" height="64" rx="1.5" fill="var(--cat-emotion)"/>
      <rect x="74"  y="54" width="14" height="32" rx="1.5" fill="var(--cat-framing)" opacity=".55"/>
      <rect x="92"  y="64" width="14" height="22" rx="1.5" fill="var(--cat-framing)" opacity=".55"/>
      <circle cx="60" cy="34" r="2" fill="var(--paper)"/>
      <circle cx="66" cy="34" r="2" fill="var(--paper)"/>
      <circle cx="60" cy="34" r="0.9" fill="var(--ink)"/>
      <circle cx="66" cy="34" r="0.9" fill="var(--ink)"/>
      <path d="M58 42 Q63 45 68 42" stroke="var(--paper)" stroke-width="1.2" stroke-linecap="round" fill="none"/>
      <path d="M95 28 Q108 22 138 22 L138 46 L118 46 L110 54 L112 46 Q98 46 95 40 Z" fill="var(--paper-3)" stroke="var(--rule-2)" stroke-width="1"/>
      <text x="103" y="33" font-family="Fraunces, serif" font-style="italic" font-size="8" fill="var(--ink-2)">Hi, yes,</text>
      <text x="103" y="42" font-family="Fraunces, serif" font-style="italic" font-size="8" fill="var(--ink-2)">you, reader.</text>
    </svg>`,
  },
  {
    id: '12-addressing-the-audience',
    number: '12',
    title: 'Addressing the Audience',
    categories: ['emotion', 'framing', 'engagement'],
    short: "Stop talking about people in the third person. Use <strong>you</strong> and <strong>your</strong>, the data becomes about the reader, not strangers.",
    why: "Third-person copy keeps the reader at arm's length: this happens to other people. Second-person copy puts the reader inside the sentence, the data becomes a personal comparison, and empathy, curiosity, and a little self-recognition all kick in for free.",
    how: "Rewrite headlines, annotations, and captions in the second person. Replace \"the average person\", \"users\", \"adults\" with \"you\" and \"your\". Keep the numbers the same, only the pronouns change.",
    example: { label: 'How Much Do You Know About Milk?, infographic addressing readers in 2nd person', url: 'https://visual.ly/' },
    illus: `<svg viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Quiz-card frame -->
      <rect x="10" y="10" width="160" height="80" rx="6" fill="var(--paper-3)" stroke="var(--rule)"/>
      <!-- Question (two lines), with "you" and "your" highlighted -->
      <text x="20" y="28" font-family="Fraunces, serif" font-size="11" fill="var(--ink-2)">How well do <tspan font-weight="700" fill="var(--cat-emotion)">you</tspan> know</text>
      <text x="20" y="42" font-family="Fraunces, serif" font-size="11" fill="var(--ink-2)"><tspan font-weight="700" fill="var(--cat-emotion)">your</tspan> phone?</text>
      <!-- Guess vs actual bars, same shape used inside the live demo -->
      <text x="20" y="58" font-family="ui-monospace, monospace" font-size="7" letter-spacing="0.5" fill="var(--ink-3)">YOUR GUESS</text>
      <rect x="20" y="61" width="130" height="5" rx="2.5" fill="var(--paper)" stroke="var(--rule)" stroke-width="0.5"/>
      <rect x="20" y="61" width="46"  height="5" rx="2.5" fill="var(--ink-3)" opacity="0.55"/>
      <text x="20" y="76" font-family="ui-monospace, monospace" font-size="7" letter-spacing="0.5" fill="var(--ink-3)">YOU, ACTUALLY</text>
      <rect x="20" y="79" width="130" height="5" rx="2.5" fill="var(--paper)" stroke="var(--rule)" stroke-width="0.5"/>
      <rect x="20" y="79" width="106" height="5" rx="2.5" fill="var(--cat-emotion)"/>
    </svg>`,
  },
  {
    id: '13-compare',
    number: '13',
    title: 'Compare',
    categories: ['argumentation'],
    short: "Two things, side-by-side. The disparity <strong>is</strong> the chart.",
    why: "A number on its own has no scale, readers can't tell if it's big, small, or normal. Putting it next to a second number, drawn to the same scale, gives the reader an instant verdict. The shape of the difference does the arguing for you.",
    how: "Pick two entities that belong to the same dimension (dollars, hours, kilograms, deaths). Draw them at proportional sizes. Resist the urge to break the scale so the small one looks bigger, the squashed-flat sliver is the entire point.",
    example: { label: 'Information is Beautiful, The Billion Dollar-o-Gram', url: 'https://informationisbeautiful.net/visualizations/the-billion-dollar-o-gram-2013/' },
    illus: `<svg viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Two proportional bars, one tiny, one large -->
      <text x="14" y="22" font-family="ui-monospace, monospace" font-size="7" letter-spacing="0.5" fill="var(--ink-3)">SMALL THING</text>
      <rect x="14" y="26" width="156" height="6" rx="3" fill="var(--paper-3)"/>
      <rect x="14" y="26" width="6"   height="6" rx="3" fill="var(--cat-argumentation)" opacity=".6"/>
      <text x="14" y="50" font-family="ui-monospace, monospace" font-size="7" letter-spacing="0.5" fill="var(--ink-3)">BIG THING</text>
      <rect x="14" y="54" width="156" height="6" rx="3" fill="var(--paper-3)"/>
      <rect x="14" y="54" width="148" height="6" rx="3" fill="var(--cat-argumentation)"/>
      <!-- Ratio punchline -->
      <text x="14" y="80" font-family="Fraunces, serif" font-style="italic" font-size="11" fill="var(--ink-2)">~25× bigger</text>
      <path d="M70 82 L90 82 L86 78 M90 82 L86 86" stroke="var(--ink-2)" stroke-width="1" fill="none"/>
    </svg>`,
  },
  {
    id: '14-convention-breaking',
    number: '14',
    title: 'Convention Breaking',
    categories: ['framing'],
    short: "Set up a chart convention. Then <strong>break it</strong>, and force the reader to look twice.",
    why: "Conventions let readers skim. The eye fills in the rest from past charts it has seen, and the message you intended slides off. Breaking a convention, same axis instead of two, inverted scale, a missing category, a category that doesn't belong, stops the skim and demands a second look. The surprise is the point.",
    how: "Pick a convention readers expect (independent y-axes per chart, descending order, a stacked-to-100% bar). Show one or two charts that obey it so the convention is established. Then redraw with the convention broken, on the same data, and let the contrast do the work.",
    example: { label: 'Reuters, The Glass Ceiling Persists (PDF example)', url: 'https://graphics.reuters.com/' },
    illus: `<svg viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Left panel: two short bars with their own scales, looks fine -->
      <rect x="10" y="14" width="74" height="72" rx="4" fill="var(--paper-3)" stroke="var(--rule)"/>
      <rect x="22" y="34" width="20" height="48" rx="1.5" fill="var(--cat-framing)" opacity=".55"/>
      <rect x="54" y="40" width="20" height="42" rx="1.5" fill="var(--cat-framing)" opacity=".55"/>
      <text x="20" y="28" font-family="ui-monospace, monospace" font-size="6" fill="var(--ink-3)">DIFFERENT AXES</text>
      <!-- Right panel: same data on shared axis, one shrinks to a sliver -->
      <rect x="96" y="14" width="74" height="72" rx="4" fill="var(--paper-3)" stroke="var(--rule)"/>
      <rect x="108" y="34" width="20" height="48" rx="1.5" fill="var(--cat-framing)"/>
      <rect x="140" y="76" width="20" height="6"  rx="1.5" fill="var(--cat-framing)"/>
      <text x="106" y="28" font-family="ui-monospace, monospace" font-size="6" fill="var(--ink-3)">SAME AXIS</text>
      <!-- Arrow between -->
      <path d="M86 50 L94 50 L91 47 M94 50 L91 53" stroke="var(--ink-3)" stroke-width="1" fill="none"/>
    </svg>`,
  },
  {
    id: '15-defamiliarisation',
    number: '15',
    title: 'Defamiliarisation',
    categories: ['framing'],
    short: "Take something the reader uses every day without noticing, and <strong>re-draw it strangely</strong>. The familiar object becomes a question.",
    why: "Familiarity invites skimming. The eye recognises the shape from a thousand prior charts and moves on without absorbing what's actually there. Defamiliarisation strips the rug: the same data in a strange encoding forces the reader to look as if for the first time, and the assumptions they were riding on get named.",
    how: "Pick a visualization so common it has become invisible, a world map, a clock face, a calendar grid, the periodic table. Re-render it with one foundational assumption stripped out (orientation, projection, centering, ordering). Don't apologise for the strangeness, the strangeness is the point.",
    example: { label: 'Hobo-Dyer south-up world map projection', url: 'https://en.wikipedia.org/wiki/Hobo%E2%80%93Dyer_projection' },
    illus: `<svg viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- LEFT: QWERTY layout, hot keys scattered -->
      <rect x="10" y="14" width="74" height="58" rx="3" fill="var(--paper-3)" stroke="var(--rule)"/>
      <g>
        <rect x="14" y="18" width="10" height="10" rx="1.5" fill="var(--paper)" stroke="var(--rule)"/>
        <rect x="26" y="18" width="10" height="10" rx="1.5" fill="var(--paper)" stroke="var(--rule)"/>
        <rect x="38" y="18" width="10" height="10" rx="1.5" fill="var(--cat-framing)"/>
        <rect x="50" y="18" width="10" height="10" rx="1.5" fill="var(--cat-framing)" opacity=".7"/>
        <rect x="62" y="18" width="10" height="10" rx="1.5" fill="var(--cat-framing)" opacity=".8"/>
        <rect x="20" y="32" width="10" height="10" rx="1.5" fill="var(--cat-framing)" opacity=".75"/>
        <rect x="32" y="32" width="10" height="10" rx="1.5" fill="var(--paper)" stroke="var(--rule)"/>
        <rect x="44" y="32" width="10" height="10" rx="1.5" fill="var(--paper)" stroke="var(--rule)"/>
        <rect x="56" y="32" width="10" height="10" rx="1.5" fill="var(--cat-framing)" opacity=".55"/>
        <rect x="68" y="32" width="10" height="10" rx="1.5" fill="var(--paper)" stroke="var(--rule)"/>
        <rect x="26" y="46" width="10" height="10" rx="1.5" fill="var(--paper)" stroke="var(--rule)"/>
        <rect x="38" y="46" width="10" height="10" rx="1.5" fill="var(--paper)" stroke="var(--rule)"/>
        <rect x="50" y="46" width="10" height="10" rx="1.5" fill="var(--paper)" stroke="var(--rule)"/>
        <rect x="62" y="46" width="10" height="10" rx="1.5" fill="var(--cat-framing)" opacity=".7"/>
      </g>
      <text x="14" y="68" font-family="ui-monospace, monospace" font-size="7" letter-spacing="0.5" fill="var(--ink-3)">QWERTY</text>
      <!-- RIGHT: by-frequency, hot keys cluster on top row -->
      <rect x="96" y="14" width="74" height="58" rx="3" fill="var(--paper-3)" stroke="var(--rule)"/>
      <g>
        <rect x="100" y="18" width="10" height="10" rx="1.5" fill="var(--cat-framing)"/>
        <rect x="112" y="18" width="10" height="10" rx="1.5" fill="var(--cat-framing)" opacity=".9"/>
        <rect x="124" y="18" width="10" height="10" rx="1.5" fill="var(--cat-framing)" opacity=".85"/>
        <rect x="136" y="18" width="10" height="10" rx="1.5" fill="var(--cat-framing)" opacity=".8"/>
        <rect x="148" y="18" width="10" height="10" rx="1.5" fill="var(--cat-framing)" opacity=".75"/>
        <rect x="160" y="18" width="10" height="10" rx="1.5" fill="var(--cat-framing)" opacity=".7"/>
        <rect x="100" y="32" width="10" height="10" rx="1.5" fill="var(--cat-framing)" opacity=".4"/>
        <rect x="112" y="32" width="10" height="10" rx="1.5" fill="var(--cat-framing)" opacity=".35"/>
        <rect x="124" y="32" width="10" height="10" rx="1.5" fill="var(--cat-framing)" opacity=".3"/>
        <rect x="136" y="32" width="10" height="10" rx="1.5" fill="var(--paper)" stroke="var(--rule)"/>
        <rect x="148" y="32" width="10" height="10" rx="1.5" fill="var(--paper)" stroke="var(--rule)"/>
        <rect x="160" y="32" width="10" height="10" rx="1.5" fill="var(--paper)" stroke="var(--rule)"/>
        <rect x="100" y="46" width="10" height="10" rx="1.5" fill="var(--paper)" stroke="var(--rule)"/>
        <rect x="112" y="46" width="10" height="10" rx="1.5" fill="var(--paper)" stroke="var(--rule)"/>
        <rect x="124" y="46" width="10" height="10" rx="1.5" fill="var(--paper)" stroke="var(--rule)"/>
      </g>
      <text x="100" y="68" font-family="ui-monospace, monospace" font-size="7" letter-spacing="0.5" fill="var(--ink-3)">BY FREQUENCY</text>
      <!-- Arrow between -->
      <path d="M86 44 L94 44 L91 41 M94 44 L91 47" stroke="var(--ink-3)" stroke-width="1" fill="none"/>
    </svg>`,
  },
  {
    id: '16-make-a-guess',
    number: '16',
    title: 'Make-a-guess',
    categories: ['framing', 'engagement'],
    short: "Before revealing the data, ask the reader to <strong>draw their prediction</strong>. The gap between their line and the real one is the point.",
    why: "Numbers shown alone slide past. The same numbers compared against the reader's own prediction stick, there's an emotional investment, and a small embarrassment, baked into the guess. Curiosity becomes commitment the moment a line is on the page in the reader's own handwriting.",
    how: "Render the chart blank, axes only, no data. Ask the reader to draw what they think happened. On submit, animate the real line in over their prediction and highlight the gap. The NYT \"You Draw It\" is the canonical version; the same skeleton works for any non-obvious trend.",
    example: { label: 'NYT, You Draw It: Family Income and College Chances', url: 'https://www.nytimes.com/interactive/2015/05/28/upshot/you-draw-it-how-family-income-affects-childrens-college-chances.html' },
    illus: `<svg viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Blank chart frame -->
      <rect x="14" y="14" width="152" height="72" rx="3" fill="var(--paper-3)" stroke="var(--rule)"/>
      <!-- Axes -->
      <line x1="22" y1="80" x2="160" y2="80" stroke="var(--rule-2)" stroke-width="1"/>
      <line x1="22" y1="20" x2="22"  y2="80" stroke="var(--rule-2)" stroke-width="1"/>
      <!-- User's guess: a straight decline (dashed, ink-3) -->
      <path d="M24 36 Q60 50 100 60 Q130 66 158 72" stroke="var(--ink-3)" stroke-width="1.4" stroke-dasharray="3 3" fill="none"/>
      <!-- The reality: a U-curve (solid, engagement) -->
      <path d="M24 36 Q42 65 64 70 Q92 68 122 48 Q146 30 158 22" stroke="var(--cat-engagement)" stroke-width="1.8" fill="none"/>
      <!-- Anchor dot -->
      <circle cx="24" cy="36" r="2.2" fill="var(--cat-engagement)" stroke="var(--paper)" stroke-width="1"/>
      <!-- Labels -->
      <text x="92" y="60" font-family="ui-monospace, monospace" font-size="6" letter-spacing="0.4" fill="var(--ink-3)">YOUR GUESS</text>
      <text x="125" y="38" font-family="ui-monospace, monospace" font-size="6" letter-spacing="0.4" fill="var(--cat-engagement)">ACTUAL</text>
    </svg>`,
  },
  {
    id: '17-physical-metaphor',
    number: '17',
    title: 'Physical Metaphor',
    categories: ['framing'],
    short: "Direction carries feeling. <strong>Up = good, down = bad, left = retreat, right = progress.</strong>",
    why: "Our sense of good and bad is wired into the body before it's wired into language: rising feels hopeful, falling feels grim, the future is 'ahead' and the past is 'behind'. A chart that aligns its data direction with the emotional direction of the story gets understood almost pre-cognitively. Fight the convention and the reader has to do twice the work, once to read the chart, once to override their gut.",
    how: "Pick the direction that matches the story before you pick the chart. Good news climbing? Bars going up. A retreat from a policy or trend? A line moving left. Progress towards a target? A rightward arrow. The metaphor is doing real work, don't accidentally undo it with a flipped axis or a colour that disagrees.",
    example: { label: "FT, A drop in China's demand could drag these countries down", url: 'https://www.ft.com/content/3eed7440-d8f9-11e5-a72f-1e7744c66818' },
    illus: `<svg viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Compass axes -->
      <line x1="90" y1="14" x2="90"  y2="86" stroke="var(--rule-2)" stroke-width="1" opacity=".5"/>
      <line x1="14" y1="50" x2="166" y2="50" stroke="var(--rule-2)" stroke-width="1" opacity=".5"/>
      <!-- Four directional arrows in their meaning-colours -->
      <path d="M90 50 L90 20 M84 26 L90 20 L96 26" stroke="var(--cat-framing)" stroke-width="2" fill="none" stroke-linejoin="round"/>
      <path d="M90 50 L90 80 M84 74 L90 80 L96 74" stroke="var(--cat-engagement)" stroke-width="2" fill="none" stroke-linejoin="round"/>
      <path d="M90 50 L26 50 M32 44 L26 50 L32 56" stroke="var(--ink-2)" stroke-width="2" fill="none" stroke-linejoin="round"/>
      <path d="M90 50 L154 50 M148 44 L154 50 L148 56" stroke="var(--cat-flow)" stroke-width="2" fill="none" stroke-linejoin="round"/>
      <!-- Labels -->
      <text x="90" y="12" font-family="ui-monospace, monospace" font-size="6" letter-spacing="0.5" text-anchor="middle" fill="var(--cat-framing)">GOOD</text>
      <text x="90" y="96" font-family="ui-monospace, monospace" font-size="6" letter-spacing="0.5" text-anchor="middle" fill="var(--cat-engagement)">BAD</text>
      <text x="18" y="46" font-family="ui-monospace, monospace" font-size="6" letter-spacing="0.5" fill="var(--ink-2)">RETREAT</text>
      <text x="138" y="46" font-family="ui-monospace, monospace" font-size="6" letter-spacing="0.5" fill="var(--cat-flow)">PROGRESS</text>
      <!-- Centre dot -->
      <circle cx="90" cy="50" r="3" fill="var(--ink)"/>
    </svg>`,
  },
  {
    id: '18-call-to-action',
    number: '18',
    title: 'Call-to-action',
    categories: ['engagement'],
    short: "End with a clear next step. <strong>Comprehension is fine. Intent is better.</strong>",
    why: "Readers will absorb a great chart, nod, and close the tab. A clear ask, vote, donate, sign, share, try it, converts the nod into a small commitment. The closer you put the action to the moment of understanding, the higher the chance the reader follows through.",
    how: "Pick one specific action, low-friction enough to complete now. Place it at the end. Name what happens next (\"register in 60 seconds\", not \"learn more\"). Show that others have already done it, social proof closes the deal.",
    example: { label: 'FT, COVID-19 tracker (every page ended with a share CTA)', url: 'https://www.ft.com/coronavirus-latest' },
    illus: `<svg viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Tiny "chart" up top -->
      <rect x="14" y="14" width="152" height="36" rx="3" fill="var(--paper-3)" stroke="var(--rule)"/>
      <path d="M22 42 L46 32 L70 36 L94 22 L118 28 L142 18 L158 24" stroke="var(--cat-engagement)" stroke-width="1.6" fill="none"/>
      <!-- The CTA button below the chart -->
      <rect x="40"  y="62" width="100" height="22" rx="11" fill="var(--cat-engagement)"/>
      <text x="90" y="77" font-family="Fraunces, serif" font-size="11" font-weight="600" text-anchor="middle" fill="var(--paper)">Try one this week →</text>
      <!-- Arrow pointing from chart to button -->
      <path d="M90 52 L90 60 M86 58 L90 62 L94 58" stroke="var(--ink-3)" stroke-width="1.2" fill="none" stroke-linejoin="round"/>
    </svg>`,
  },
];

var CATEGORIES = [
  {
    id: 'argumentation',
    label: 'Argumentation',
    blurb: 'Patterns that build a case, using contrast, omission, and repetition to make a point feel inevitable.',
  },
  {
    id: 'engagement',
    label: 'Engagement',
    blurb: 'Patterns that pull readers in, letting them explore, identify with, and play with data on their own terms.',
  },
  {
    id: 'flow',
    label: 'Flow',
    blurb: 'Patterns that control pace and sequence, guiding readers through complexity without losing them.',
  },
  {
    id: 'emotion',
    label: 'Emotion',
    blurb: 'Patterns that create feeling, humanising statistics, revealing scale, and making data unforgettable.',
  },
  {
    id: 'framing',
    label: 'Framing',
    blurb: "Patterns that change perspective, showing the same data through the reader's own lens.",
  },
];
