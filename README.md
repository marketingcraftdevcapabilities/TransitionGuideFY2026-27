# TransitionGuideFY2026-27

Source of truth for the team's key M&C Craft Development & Capabilities RTB workstreams — strategic partnerships, vendors, tools, technology, and dashboards. A structured handoff so an incoming owner can onboard, read current status, and prioritize the transition from this document alone.

**Live site:** https://marketingcraftdevcapabilities.github.io/TransitionGuideFY2026-27/

---

## How to update the guide (daily edits)

All content lives in **one file: [`data.js`](data.js)**. You never touch HTML or code.

1. Open `data.js` and edit the values — item names, statuses, budgets, contacts, actions, links.
2. Save, then publish:
   ```bash
   git add data.js
   git commit -m "Update transition guide"
   git push
   ```
3. GitHub Pages rebuilds automatically (~1 minute). The "Updated" date stamps itself — no need to change it by hand.

### Common edits

- **Change a decision status:** in the `matrix` array, set `status` to `"stop"`, `"tbd"`, `"go"`, or `"done"`. The KPIs, donut chart, cross-tab, and planner all recompute automatically.
- **Add a new item:** copy an existing entry in the relevant array (`matrix`, `partners`, `vendors`, `tools`, `workstreams`, `dashboards`) and edit its fields.
- **Update a budget:** set `budget` to a number (e.g. `90000`) or `null` if unknown.
- **Add a contract date:** set `due` to `"YYYYMMDD"` (e.g. `"20260731"`) or `null`.
- **Edit the 1-minute summary or insights:** see the `summary` object near the top.

> Tip: keep quotes straight. If a value contains a double quote, use a curly quote (`“ ”`) or escape it (`\"`).

---

## Files

| File | What it is | Edit it? |
|------|-----------|----------|
| `data.js` | All the content | ✅ Yes — this is the only file you edit |
| `index.html` | Page shell / layout | Rarely |
| `app.js` | Rendering + interactivity engine | No |
| `.github/workflows/deploy.yml` | Auto-deploy + date stamp | No |

---

## Local preview

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```
