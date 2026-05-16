# Narrative Design Patterns — full catalog

Reference material for the `tell-data-story` skill.

## Contents

- [Categories](#categories)
- [01 — Repetition](#01--repetition)
- [02 — Silent Data](#02--silent-data)
- [03 — Exploration](#03--exploration)
- [04 — Users Find Themselves](#04--users-find-themselves)
- [05 — Humans Behind the Dots](#05--humans-behind-the-dots)
- [06 — Gradual Reveal](#06--gradual-reveal)
- [07 — Speed-up / Slow-down](#07--speed-up--slow-down)
- [08 — Concretise](#08--concretise)
- [09 — Familiarisation](#09--familiarisation)
- [10 — Rhetorical Question](#10--rhetorical-question)
- [11 — Breaking the 4th Wall](#11--breaking-the-4th-wall)
- [12 — Addressing the Audience](#12--addressing-the-audience)
- [13 — Compare](#13--compare)
- [14 — Convention Breaking](#14--convention-breaking)
- [15 — Defamiliarisation](#15--defamiliarisation)
- [16 — Make-a-guess](#16--make-a-guess)
- [17 — Physical Metaphor](#17--physical-metaphor)
- [18 — Call-to-action](#18--call-to-action)

## Categories

- **Argumentation** — Patterns that build a case, using contrast, omission, and repetition to make a point feel inevitable.
- **Engagement** — Patterns that pull readers in, letting them explore, identify with, and play with data on their own terms.
- **Flow** — Patterns that control pace and sequence, guiding readers through complexity without losing them.
- **Emotion** — Patterns that create feeling, humanising statistics, revealing scale, and making data unforgettable.
- **Framing** — Patterns that change perspective, showing the same data through the reader's own lens.

---

## 01 — Repetition

- **id**: `01-repetition`
- **Categories**: argumentation (primary), flow, emotion
- **Short**: Repeat the same visual motif across multiple views to make a pattern feel inescapable.
- **Why**: One chart can be dismissed. The same finding surfacing across 12 small multiples is harder to ignore, repetition builds conviction.
- **How**: Use small multiples with one highlighted element per chart, or loop an animation that keeps returning to the same visual beat.
- **Example**: [Bloomberg, Every Mass Shooting in America](https://www.bloomberg.com/graphics/2015-mass-shootings-in-america/)

## 02 — Silent Data

- **id**: `02-silent-data`
- **Categories**: argumentation (primary), emotion
- **Short**: Deliberately ghost a data point to create tension, then reveal it for maximum impact.
- **Why**: Absence speaks. A barely-visible bar that turns out to be 10x larger reframes everything the reader assumed.
- **How**: Show the chart with the silent element as a faint ghost or missing entirely. On click or scroll, reveal it with an animated entrance.
- **Example**: [Guardian, The Counted](https://www.theguardian.com/us-news/ng-interactive/2015/jun/01/the-counted-police-killings-us-database)

## 03 — Exploration

- **id**: `03-exploration`
- **Categories**: engagement (primary), flow
- **Short**: Let readers steer the story by filtering, sorting, and drilling into what matters to them.
- **Why**: Data is rarely one-size-fits-all. Different readers care about different slices. Giving them control increases relevance and time-on-story.
- **How**: Add a filter bar, segmented control, or dropdown that rewrites the chart in place. Keep transitions smooth (FLIP) so readers understand what changed.
- **Example**: [The Pudding, Film Dialogue by Gender](https://pudding.cool/2017/03/film-dialogue/)

## 04 — Users Find Themselves

- **id**: `04-users-find-themselves`
- **Categories**: engagement (primary), emotion
- **Short**: Invite readers to locate themselves in the data so the story becomes personally relevant.
- **Why**: Abstract population data feels remote. The moment readers see their own dot, the story becomes about them, engagement spikes.
- **How**: Add dropdowns (age, country, income) that reposition a highlighted dot among the population scatter.
- **Example**: [NYT, You Draw It: Family Income and College](https://www.nytimes.com/interactive/2015/05/28/upshot/you-draw-it-how-family-income-affects-childrens-college-chances.html)

## 05 — Humans Behind the Dots

- **id**: `05-humans-behind-the-dots`
- **Categories**: engagement (primary), emotion
- **Short**: Surface the individual story hiding inside aggregate data to rekindle empathy at scale.
- **Why**: Statistical compassion fatigue is real. One vivid personal detail does more emotional work than a thousand-row dataset.
- **How**: Render a grid of dots. Hovering reveals a short vignette about the real person that dot represents.
- **Example**: [Periscopic, US Gun Deaths](https://guns.periscopic.com/)

## 06 — Gradual Reveal

- **id**: `06-gradual-reveal`
- **Categories**: flow (primary), emotion
- **Short**: Introduce complexity layer by layer so each insight lands before the next arrives.
- **Why**: Dumping all information at once overwhelms. Staged disclosure creates a narrative arc and lets each finding land with full force.
- **How**: Use a "Next" button or scroll trigger to add layers: axes, data points, trend line, annotation, conclusion.
- **Example**: [NYT, How the Recession Reshaped the Economy](https://www.nytimes.com/interactive/2014/06/05/upshot/how-the-recession-reshaped-the-economy-in-255-charts.html)

## 07 — Speed-up / Slow-down

- **id**: `07-speed-up-slow-down`
- **Categories**: flow (primary), engagement
- **Short**: Control playback tempo so that dense, critical moments get the attention they deserve.
- **Why**: Uniform animation speed treats all moments as equal. Slowing down at complexity signals: pay attention here.
- **How**: Use a rate slider (0.25x to 4x) plus auto-slow logic that detects dense data regions and drops speed automatically.
- **Example**: [NYT Upshot, Marathon Pace](https://www.nytimes.com/interactive/2014/04/22/sports/marathons/how-the-clock-ticks-for-marathon-runners.html)

## 08 — Concretise

- **id**: `08-concretise`
- **Categories**: emotion (primary)
- **Short**: Translate abstract quantities into familiar physical equivalents so the scale finally clicks.
- **Why**: "700,000 tonnes" means nothing. "Enough to fill 280 Olympic swimming pools" does. Concrete anchors make magnitude visceral.
- **How**: A slider sets the quantity; JS maps it to stacked SVG icons of real-world objects (buses, pools, football fields).
- **Example**: [Information is Beautiful, Mountains Out of Molehills](https://informationisbeautiful.net/visualizations/mountains-out-of-molehills/)

## 09 — Familiarisation

- **id**: `09-familiarisation`
- **Categories**: framing (primary), emotion
- **Short**: Re-label the chart around the reader's own reference point so unfamiliar scales feel intuitive.
- **Why**: Readers can't feel the distance from London to Tokyo. But they can feel the distance from home to the supermarket, scaled up.
- **How**: User types their city and a reference distance; the chart redraws axis labels relative to that personal anchor.
- **Example**: [BBC, Syrian Refugees Journey](https://www.bbc.com/news/world-europe-34131911)

## 10 — Rhetorical Question

- **id**: `10-rhetorical-question`
- **Categories**: framing (primary), argumentation
- **Short**: Open with a question the reader is already half-asking, then let the chart deliver the answer.
- **Why**: A headline that asserts puts the reader on the defensive. A headline that asks puts them in the seat next to you, hunting for the answer in the same data.
- **How**: Lead with a punchy rhetorical question as the title. Hold the chart back until the reader opts in (a button, a scroll). Reveal so the answer lands as discovery, not lecture.
- **Example**: [FT, Have UK house prices really raced ahead of wages?](https://www.ons.gov.uk/peoplepopulationandcommunity/housing/bulletins/housingaffordabilityinenglandandwales/1997to2016)

## 11 — Breaking the 4th Wall

- **id**: `11-breaking-the-4th-wall`
- **Categories**: emotion (primary), framing
- **Short**: Let the subject inside the chart turn and address the reader, building trust and emotional connection.
- **Why**: A neutral chart keeps the reader at arm's length. When the subject inside the frame turns and speaks to the reader directly, the distance collapses, the data stops being a specimen on a slide and becomes someone in the room.
- **How**: Give the entity in the data a voice and aim it at the reader. A bar that looks back, a country that introduces itself, a dot with a speech bubble, anything that lets the subject step out of the frame and talk to the person reading.
- **Example**: [Mona Chalabi, illustrated data with characters that address the viewer](https://monachalabi.com/)

## 12 — Addressing the Audience

- **id**: `12-addressing-the-audience`
- **Categories**: emotion (primary), framing, engagement
- **Short**: Stop talking about people in the third person. Use **you** and **your**, the data becomes about the reader, not strangers.
- **Why**: Third-person copy keeps the reader at arm's length: this happens to other people. Second-person copy puts the reader inside the sentence, the data becomes a personal comparison, and empathy, curiosity, and a little self-recognition all kick in for free.
- **How**: Rewrite headlines, annotations, and captions in the second person. Replace "the average person", "users", "adults" with "you" and "your". Keep the numbers the same, only the pronouns change.
- **Example**: [How Much Do You Know About Milk?, infographic addressing readers in 2nd person](https://visual.ly/)

## 13 — Compare

- **id**: `13-compare`
- **Categories**: argumentation (primary)
- **Short**: Two things, side-by-side. The disparity **is** the chart.
- **Why**: A number on its own has no scale, readers can't tell if it's big, small, or normal. Putting it next to a second number, drawn to the same scale, gives the reader an instant verdict. The shape of the difference does the arguing for you.
- **How**: Pick two entities that belong to the same dimension (dollars, hours, kilograms, deaths). Draw them at proportional sizes. Resist the urge to break the scale so the small one looks bigger, the squashed-flat sliver is the entire point.
- **Example**: [Information is Beautiful, The Billion Dollar-o-Gram](https://informationisbeautiful.net/visualizations/the-billion-dollar-o-gram-2013/)

## 14 — Convention Breaking

- **id**: `14-convention-breaking`
- **Categories**: framing (primary)
- **Short**: Set up a chart convention. Then **break it**, and force the reader to look twice.
- **Why**: Conventions let readers skim. The eye fills in the rest from past charts it has seen, and the message you intended slides off. Breaking a convention, same axis instead of two, inverted scale, a missing category, a category that doesn't belong, stops the skim and demands a second look. The surprise is the point.
- **How**: Pick a convention readers expect (independent y-axes per chart, descending order, a stacked-to-100% bar). Show one or two charts that obey it so the convention is established. Then redraw with the convention broken, on the same data, and let the contrast do the work.
- **Example**: [Reuters, The Glass Ceiling Persists](https://graphics.reuters.com/)

## 15 — Defamiliarisation

- **id**: `15-defamiliarisation`
- **Categories**: framing (primary)
- **Short**: Take something the reader uses every day without noticing, and **re-draw it strangely**. The familiar object becomes a question.
- **Why**: Familiarity invites skimming. The eye recognises the shape from a thousand prior charts and moves on without absorbing what's actually there. Defamiliarisation strips the rug: the same data in a strange encoding forces the reader to look as if for the first time, and the assumptions they were riding on get named.
- **How**: Pick a visualization so common it has become invisible, a world map, a clock face, a calendar grid, the periodic table. Re-render it with one foundational assumption stripped out (orientation, projection, centering, ordering). Don't apologise for the strangeness, the strangeness is the point.
- **Example**: [Hobo-Dyer south-up world map projection](https://en.wikipedia.org/wiki/Hobo%E2%80%93Dyer_projection)

## 16 — Make-a-guess

- **id**: `16-make-a-guess`
- **Categories**: framing (primary), engagement
- **Short**: Before revealing the data, ask the reader to **draw their prediction**. The gap between their line and the real one is the point.
- **Why**: Numbers shown alone slide past. The same numbers compared against the reader's own prediction stick, there's an emotional investment, and a small embarrassment, baked into the guess. Curiosity becomes commitment the moment a line is on the page in the reader's own handwriting.
- **How**: Render the chart blank, axes only, no data. Ask the reader to draw what they think happened. On submit, animate the real line in over their prediction and highlight the gap. The NYT "You Draw It" is the canonical version; the same skeleton works for any non-obvious trend.
- **Example**: [NYT, You Draw It: Family Income and College Chances](https://www.nytimes.com/interactive/2015/05/28/upshot/you-draw-it-how-family-income-affects-childrens-college-chances.html)

## 17 — Physical Metaphor

- **id**: `17-physical-metaphor`
- **Categories**: framing (primary)
- **Short**: Direction carries feeling. **Up = good, down = bad, left = retreat, right = progress.**
- **Why**: Our sense of good and bad is wired into the body before it's wired into language: rising feels hopeful, falling feels grim, the future is "ahead" and the past is "behind". A chart that aligns its data direction with the emotional direction of the story gets understood almost pre-cognitively. Fight the convention and the reader has to do twice the work, once to read the chart, once to override their gut.
- **How**: Pick the direction that matches the story before you pick the chart. Good news climbing? Bars going up. A retreat from a policy or trend? A line moving left. Progress towards a target? A rightward arrow. The metaphor is doing real work, don't accidentally undo it with a flipped axis or a colour that disagrees.
- **Example**: [FT, A drop in China's demand could drag these countries down](https://www.ft.com/content/3eed7440-d8f9-11e5-a72f-1e7744c66818)

## 18 — Call-to-action

- **id**: `18-call-to-action`
- **Categories**: engagement (primary)
- **Short**: End with a clear next step. **Comprehension is fine. Intent is better.**
- **Why**: Readers will absorb a great chart, nod, and close the tab. A clear ask, vote, donate, sign, share, try it, converts the nod into a small commitment. The closer you put the action to the moment of understanding, the higher the chance the reader follows through.
- **How**: Pick one specific action, low-friction enough to complete now. Place it at the end. Name what happens next ("register in 60 seconds", not "learn more"). Show that others have already done it, social proof closes the deal.
- **Example**: [FT, COVID-19 tracker](https://www.ft.com/coronavirus-latest)
