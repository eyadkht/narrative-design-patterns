# tell-data-story

A skill that turns your data into a standalone HTML page built from 2-3 narrative design patterns.

## What it does

You give your AI agent some data (CSV, PDF, JSON, a pasted table, or a description) and tell it what you want the reader to take away. The skill:

1. Reads your data and notes its shape.
2. Asks up to three quick questions about goal, audience, and format (if you haven't already said).
3. Picks 2-3 narrative patterns suited to that data and goal, with a one-line rationale for each.
4. Writes `narrative-output.html` — a self-contained page with working demos built on your actual numbers. No framework, no build step, opens in any browser.

If you already know the pattern you want, pass its name or number as an argument to skip the auto-pick: `/tell-data-story compare`, `/tell-data-story 13`, `/tell-data-story 08-concretise`.

## Install

### Via skills.sh

```bash
npx skills add Eyadkht/narrative-design-patterns/skills/tell-data-story
```

### Manual install

Copy the `tell-data-story/` directory into your agent's skills location, then restart the agent (most also watch the directory for live changes).
ck your agent's docs for the exact path, the skill itself does not change.

## Use

```text
> /tell-data-story
> here is sales.csv — I want investors to feel how lopsided our revenue mix is

> /tell-data-story 13
> here is sales.csv — apply Compare specifically
```

The output is `./narrative-output.html` in your current working directory. Open it in a browser.

## The 18 patterns

`01-repetition`, `02-silent-data`, `03-exploration`, `04-users-find-themselves`, `05-humans-behind-the-dots`, `06-gradual-reveal`, `07-speed-up-slow-down`, `08-concretise`, `09-familiarisation`, `10-rhetorical-question`, `11-breaking-the-4th-wall`, `12-addressing-the-audience`, `13-compare`, `14-convention-breaking`, `15-defamiliarisation`, `16-make-a-guess`, `17-physical-metaphor`, `18-call-to-action`.

See [patterns.md](patterns.md) for the full catalog with the *why*, *how*, and a real-world example for each. Live demos for every pattern: <https://eyadkht.github.io/narrative-design-patterns/>.
