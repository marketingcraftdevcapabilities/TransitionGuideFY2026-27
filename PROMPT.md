# Reusable build prompt

Paste the prompt below into Claude Code (or any capable coding agent) to regenerate
this dashboard in one shot, instead of iterating. It captures the final architecture,
layout, interactivity, responsive, and deploy requirements.

---

```
Build a single-page, static executive dashboard ("Transition Guide") that runs on
GitHub Pages with zero build step. Architecture and requirements:

ARCHITECTURE
- Three files only: index.html (shell + all CSS), data.js (ALL content), app.js
  (renders everything from data.js + wires interactivity). No frameworks, no bundler,
  vanilla JS (ES5-safe), CDN-free.
- data.js is the ONLY file edited for content updates. It exports one `const DATA = {...}`
  object with sections: meta, summary (headline + insights + resources + strategy),
  matrix (the decision items), partners, vendors, tools, workstreams, dashboards, people.
- All numbers shown anywhere (KPI cards, hero "1-minute read", chart totals, planner)
  must be COMPUTED from the matrix at render time — never hardcoded. Use {{tokens}} in
  prose (e.g. "{{count}} decisions, {{tbd}} still TBD, recover {{recover}}") that app.js
  fills from the data, so prose can never drift from the cards.
- Dates are computed live in the browser on page load (new Date()): the "Updated" stamp,
  a roadmap "Today" marker, and every "N days out" countdown. data.js uses "auto" / "TODAY"
  sentinels. Nothing about dates is hardcoded or deploy-stamped.

CONTENT MODEL (matrix item)
  { item, cat: "partner|vendor|tool", status: "stop|tbd|go|done", budget: number|null,
    due: "YYYYMMDD"|null, action: "..." }
  Status legend: stop=do not renew, tbd=decide later, go=continue, done=completed.
  Items that appear in both the matrix and a section array (e.g. a vendor) must be edited
  in BOTH places; everything downstream recomputes automatically.

LAYOUT (top to bottom)
- Header band (blue): title, prepared-by meta, confidential pill.
- TOP SECTION, no redundancy — each fact appears ONCE:
  * top-row: a "1-minute read" hero (narrative) BESIDE a prominent vertical
    "Key resources" card (bordered, tappable icon+label rows — not tiny inline links).
  * 4 computed KPI cards.
  * status legend, then a STICKY, vivid pill NAV bar (pinned on scroll, active tab = solid
    blue pill, each tab shows a live count badge). Tabs: Overview, Decisions, Partners,
    Vendors, Tools & Tech, Workstreams, Dashboards.
- OVERVIEW tab loads first (executive view for a NON-TECHNICAL CMO — simplicity + clarity),
  in this order:
  1. "How the work is organized" — full-width orientation strip (strategy frame), compact.
  2. "What's due when" — the roadmap timeline, FULL WIDTH with room to breathe (taller rows,
     wide spacing, a "tap a milestone" hint). Tapping a date filters the action list and
     highlights the active milestone.
  3. "Where things stand" donut (compact) BESIDE "What needs a decision now" (wide).
     Clicking a donut slice / legend row filters the action list IN PLACE (stays on Overview;
     click again or "Show all" to clear; active slice highlights).
  4. "Why this matters" — insight callouts, last.
  The action list = plain-language, prioritized (every Stop + every partner TBD), sorted by
  deadline then dollars, each card with dollar impact and days-remaining, plain verbs
  (Wind down / Decide on / Continue), minimal jargon.
- DECISIONS tab = the detailed/power-user data: full searchable+sortable matrix with
  status/category filters, expandable rows (contacts & links drawer), a live analytics
  strip, a donut + cross-tab + contract timeline that filter the matrix, and a "decision
  planner" what-if tool with CSV export. Top it with a "Detailed data" banner.
- Partners = rich cards; Vendors/Tools = searchable+sortable tables; Workstreams = cards
  with owner flags; Dashboards = table + key-people boxes. All rendered from data.js.

RESPONSIVE — must work on every surface (build AND verify in a real browser, all orientations):
- Desktop (>920px): multi-column grids as above.
- iPad / tablet (portrait ~768px and landscape ~1024px): top-row stacks, KPIs 2-up,
  resource links reflow 2-up, donut/action grid stacks, nav stays sticky and swipeable,
  tables remain usable.
- Phone (≤640px) and small phone (≤400px): single-column; tables scroll horizontally with
  a visible "swipe" hint; nav is edge-to-edge horizontally scrollable with ≥36px tap
  targets; KPIs 1-up on small phones; no fixed-position overflow.
- Use prefers-reduced-motion and a print stylesheet. Test portrait + landscape on phone,
  iPad, and desktop before declaring done.

DEPLOY / SAFETY
- GitHub Actions workflow: deploy to Pages on push to main (Pages source = "GitHub Actions").
- A second Actions workflow validates data.js on every push (node --check + a structure
  check: required sections present, every matrix status is one of stop|tbd|go|done) so a
  browser typo fails loudly with a red X instead of blanking the live site.
- Brand palette: super-blue #236CFF, blueberry #00254A; status colors stop #FF5C37,
  tbd #F9C741, go #3BD85E, done #236CFF. Avenir Next font stack.

Verify: render the page, confirm all sections populate, the computed numbers match across
hero/KPIs/charts, dates show today, every filter/tab/drawer/planner works, and the layout
holds on phone + iPad (both orientations) + desktop.
```
