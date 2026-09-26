# Tribunal demo repository

A tiny invoicing service with **planted defects**, so you can watch a cross-model review panel
find them before you trust it with your own code. Nothing here is real software: do not deploy
it, and do not fix the bugs upstream. Fork it and run the panel.

## What is planted

- `src/invoice.js`: an off-by-one that drops the last invoice line, a discount lookup on a plain
  object (a code named `constructor` is "valid"), and a customer dereference with no null check.
- `src/config.js`: a credential-shaped default committed in source, and a case-sensitive
  allowlist compared against lower-cased input.
- `docs/reference/goals/ship-discount-codes.md`: a goal statement whose plan tests nothing and
  whose success measure cannot fail.

A good panel finds most of these on the first round. A degraded panel (one seat missing) still
finds some, and says out loud that it was degraded.

## Run the panel on it

1. Install the plugin in Claude Code, then open this folder:

   ```text
   /plugin marketplace add ViktoriousLLC/tribunal-review
   /plugin install tribunal-review@viktorious
   ```

   Plugin repository: https://github.com/ViktoriousLLC/tribunal-review
2. Create `tribunal.config.json` at the root:

   ```json
   { "preset": "claude-only" }
   ```

   Use `claude-plus-chatgpt` if you also hold a ChatGPT plan.

3. Check the seats and the machine, then measure the isolation boundary once:

   ```text
   node "<installed-plugin-root>/scripts/doctor.mjs"
   node "<installed-plugin-root>/scripts/isolationProbe.mjs"
   ```

4. Review the goal statement, then a file:

   ```text
   node "<installed-plugin-root>/scripts/run.mjs" --file docs/reference/goals/ship-discount-codes.md
   node "<installed-plugin-root>/scripts/run.mjs" --file src/invoice.js
   ```

   Or from a Claude Code session: `/tribunal-review:tribunal src/invoice.js`.

5. Read the round. Each finding names how to check it. Compare against the list above; the
   comment at the bottom of the goal file lists what a panel should notice about the goal.

## What a run costs

The Claude and Codex seats run on the subscriptions you already hold; the runner prints
`$0 (plan)` for them and never a fabricated figure for anything metered. No telemetry leaves
your machine except the calls to the vendors you configured (the plugin's SECURITY.md states
the promise and the fixture that checks it).

## Licence

Apache-2.0, same as the plugin.
