// ============================================================
//  TRANSITION GUIDE DATA — edit this file to update the page
//  Push to GitHub → GitHub Pages updates automatically
// ============================================================

const DATA = {

  meta: {
    title:       "Transition Guide FY2026/27",
    team:        "Marketing Craft Development & Capabilities",
    preparedBy:  "Maria Boukhval",
    onBehalfOf:  "Mos Okediji",
    preparedFor: "Chief Marketing Officer",
    preparedDate:"Jun 4, 2026",
    // "updatedDate" is auto-stamped by GitHub Actions on each push.
    // To override locally, set it here: "Jun 16, 2026"
    updatedDate: "Jun 15, 2026",
    confidential: true,
  },

  summary: {
    headline: `<b>18 decisions</b> sit in the matrix — <b class="warn">9 still TBD</b>,
      <b>5 to stop</b>, 2 to continue, 2 closing out. Non-renewals of
      <b>LinkedIn &amp; Reforge</b> recover roughly <b class="go">$133K</b> a year.
      Three partner contracts land on <b class="warn">Jul 31, 2026 — 46 days out</b>. The critical path isn't money:
      <b>every Run-the-Business workstream is currently unassigned</b>, and several admin
      seats sit with people who have left.`,
    resources: [
      { label: "Google Workspace (L&D + Capabilities)", url: "https://drive.google.com/drive/folders/0AKQLI34evSaKUk9PVA" },
      { label: "Exit & Transition Folder",              url: "https://drive.google.com/drive/folders/1KrgSHBzkxugbQw9DFA0gtVXIzSDFtlyQ" },
      { label: "Team Google Folder",                    url: "https://drive.google.com/drive/folders/1aMBIc77DdpjbikjyzdgyiRcRxDkTG8YC?usp=drive_link" },
      { label: "Craft Website",                         url: "https://growyourcraft.intuit.com/craft/home?i=X-KxbAEreg8pd7030IivDk_8XlizTR76" },
      { label: "FY26 AI Adoption dashboard",            url: "https://marketingcraftdevcapabilities.github.io/fy26_ai_adoption_dashboard/" },
    ],
    strategicDirections: [
      { title: "Run the Business (RTB)",   desc: "Ongoing operations across five workstreams: Onboarding · Learning Experiences · Strategic Partnerships · Tools & Tech · GenAI Hub & Digest." },
      { title: "Big Rock 1 — WOW",         desc: "Improving ways of working." },
      { title: "Big Rock 2 — AI Transformation", desc: "Driving the AI strategy." },
    ],
    openAction: "Access to all shared folders, admin seats, tools and dashboards must be transitioned.",
    insights: [
      { status: "tbd",  title: "Ownership is the critical path.", body: "Every Run-the-Business workstream is unassigned (“TBD, finding”). Naming owners gates almost every other action in this guide." },
      { status: "stop", title: "Two clean non-renewals recover ~$133K.", body: "LinkedIn (200 seats, 25 active) and Reforge (100 seats, ~80% dormant). Communicate the wind-down and migrate any active users." },
      { status: "tbd",  title: "Deadline cliff on Jul 31, 2026 — 46 days out.", body: "Three partner contracts converge: renew ANA, finalize the Reforge wind-down (comms before the 31st), and decide The Work / WARC." },
      { status: "go",   title: "Two clear keeps.", body: "ANA (22-year partner, unlimited seats for all of Intuit) and Google Workspace (core infrastructure). Continue as-is and transition access." },
      { status: "stop", title: "Access risk from departures.", body: "Admin seats are held by people who have left — Sylvia Luong, Emily Valencia, Paulina. Re-establish Intuit admins before access lapses." },
      { status: "done", title: "Closing out clean.", body: "BW Events and Bright Idea Sparks delivered their work; reconcile the final invoices and close the open POs." },
    ],
  },

  // ── DECISION MATRIX ──────────────────────────────────────
  // status: "stop" | "tbd" | "go" | "done"
  // cat:    "partner" | "vendor" | "tool"
  // budget: number (annual $) or null
  // due:    "YYYYMMDD" or null
  matrix: [
    { item: "ANA",                          cat: "partner", status: "go",   budget: 76370,  due: "20260731", action: "Intuit-wide. Assign a new relationship owner and lock the activation plan." },
    { item: "LinkedIn Learning Hub",        cat: "partner", status: "stop", budget: 43000,  due: "20260816", action: "No renewal: 200 seats, 25 active. Hold the pending invoice; communicate the end of the partnership." },
    { item: "Reforge",                      cat: "partner", status: "stop", budget: 90000,  due: "20260731", action: "No renewal: 100 seats, ~80% dormant. Communicate in <a href='https://intuit-teams.slack.com/archives/C4511F4CU'>#reforge-marketing</a> before Jul 31." },
    { item: "IA — Insights Association",    cat: "partner", status: "tbd",  budget: 25000,  due: "20261231", action: "Research team only. Leverage the credit; confirm need with Christine Chu." },
    { item: "The Work / WARC / Lions OS",   cat: "partner", status: "tbd",  budget: 90500,  due: "20260731", action: "Ask the brand whether to keep it; reach out to partners to communicate the decision." },
    { item: "MTM",                          cat: "partner", status: "tbd",  budget: 25000,  due: "20261231", action: "Decide next steps; right to refuse by Oct 31. Reach out to the partner." },
    { item: "BW Events",                    cat: "vendor",  status: "done", budget: 113225, due: "20260430", action: "Make changes on the <a href='https://growyourcraft.intuit.com/craft/home?i=X-KxbAEreg8pd7030IivDk_8XlizTR76#search'>Craft website</a>; close out completed POs." },
    { item: "Bright Idea Sparks · Ikezi Kamanu", cat: "vendor", status: "done", budget: 48763, due: "20260529", action: "No actions beyond closeout; session 2 in payment, work completed." },
    { item: "Electric Thinking Co.",        cat: "vendor",  status: "tbd",  budget: 28000,  due: null,       action: "WoW_D4D Skills MVP via Magnit. Request came in 06/15 — WIP. No PO; scheduled through Magnit." },
    { item: "Sendoso",                      cat: "tool",    status: "tbd",  budget: 10200,  due: null,       action: "Intuit-wide gifting + inventory. Transfer inventory to a new/existing group." },
    { item: "Splash / Cvent",               cat: "tool",    status: "stop", budget: null,   due: null,       action: "Terminate the partnership; remove departed licenses." },
    { item: "Swoogo",                       cat: "tool",    status: "tbd",  budget: null,   due: null,       action: "Decide the future of the Craft website (hosted here). Invite new owners or freeze." },
    { item: "Docebo",                       cat: "tool",    status: "tbd",  budget: 2750,   due: "20260430", action: "Migration complete (14 courses). Manage remaining hours with BW." },
    { item: "Google Analytics",             cat: "tool",    status: "tbd",  budget: null,   due: null,       action: "Craft website analytics. Requires a new Admin; request access." },
    { item: "Workato",                      cat: "tool",    status: "tbd",  budget: null,   due: null,       action: "Terminate or update licenses and access via the IT Portal." },
    { item: "Intuit Insights web & Slack",  cat: "tool",    status: "tbd",  budget: null,   due: null,       action: "Remove/adjust outdated pages; maintain <a href='https://intuit-teams.slack.com/archives/C4511F4CU'>#mktg-comms-all</a>, #reforge-marketing, #genai-mc-connect." },
    { item: "M&C Zoom",                     cat: "tool",    status: "stop", budget: null,   due: null,       action: "Rescope/delete; not working. Confirm an LLE replacement first, then transfer/rename." },
    { item: "Outlook",                      cat: "tool",    status: "stop", budget: null,   due: null,       action: "Archive the data. Disconnect or rename the shared mailbox." },
    { item: "Google WS",                    cat: "tool",    status: "go",   budget: null,   due: null,       action: "Core infrastructure. Maintain via Identity Manager; request Drive access for past data." },
  ],

  // Contract calendar milestones (for timeline)
  timeline: [
    { date: "Apr 30", sortKey: "20260430", label: "past",  items: ["BW Events · completed", "Docebo · TBD"],         meta: "POs closing · migration done" },
    { date: "May 29", sortKey: "20260529", label: "past",  items: ["Bright Idea Sparks · completed"],                meta: "Session 2 in payment" },
    { date: "Jun 15 · Today", sortKey: "20260615", label: "now", items: [],                                         meta: "Source last updated" },
    { date: "Jul 31", sortKey: "20260731", label: "cliff", items: ["ANA · renew", "Reforge · stop", "The Work · decide"], meta: "The cliff — 3 contracts", days: "46 days" },
    { date: "Aug 16", sortKey: "20260816", label: "soon",  items: ["LinkedIn · stop"],                               meta: "Non-renewal comms", days: "62 days" },
    { date: "Oct 31", sortKey: "20261031", label: "",      items: ["MTM · right to refuse"],                        meta: "Decision deadline", days: "138 days" },
    { date: "Dec 31", sortKey: "20261231", label: "",      items: ["IA · TBD", "MTM · TBD"],                        meta: "Year-end renewals", days: "199 days" },
  ],

  // ── STRATEGIC PARTNERS ───────────────────────────────────
  partners: [
    {
      name: "ANA",
      type: "Association of National Advertisers · 22-year partner",
      status: "go",
      facts: { Contract: "$76,370–77,120", Renewal: "Jul 31, 2026", Seats: "Unlimited · all of Intuit" },
      contacts: [
        { name: "Mike Mangan",   role: "VP, Member Relations",       phone: "(212) 455-8021", email: "mmangan@ana.net" },
        { name: "April Rueppel", role: "VP, Mktg Training & Dev.",   phone: "646.825.0225",  email: "arueppel@ana.net" },
      ],
      rec: "<b>Renew for FY27.</b> Put an activation plan in place and resolve the pending invoice increase (from $72,040). POC meeting set for 06/19 to decide scope. FY27 goal: activate the leaderboard and track activities by role and seniority. Engagement wasn't tracked before. Access via Intuit SSO — no admin seat.",
      links: [
        { label: "Google folder",    url: "https://drive.google.com/drive/folders/1kwRkVCbu4-qwnlffoocJwiYEEOsgkEtO" },
        { label: "PO US0133816",     url: "https://intuit.coupahost.com/order_headers/133816", type: "po" },
        { label: "PO US0089583",     url: "https://intuit.coupahost.com/order_headers/89583",  type: "po" },
        { label: "ANA site",         url: "https://www.ana.net/" },
        { label: "ANA Amplify",      url: "https://www.ana.net/amplify" },
        { label: "Events Calendar",  url: "https://www.ana.net/calendar/index/calendar_filter/industry" },
      ],
    },
    {
      name: "LinkedIn Learning Hub",
      type: "Learning platform partner",
      status: "stop",
      facts: { Contract: "$43,000 · not paid", Renewal: "Aug 16, 2026", Usage: "200 seats · 25 active" },
      contacts: [
        { name: "Ryan Field", role: "Large Enterprise Account Director", phone: "+1 (415) 290-0823", email: "rfield@linkedin.com" },
        { name: "Tracy Diop", role: "Principal CSM", email: "tdiop@linkedin.com" },
      ],
      rec: "<b>Do not renew.</b> New PO is open but unpaid — hold before paying. Communicate license termination, then migrate active users to a new single-admin group (LinkedIn can do this in bulk). Group owner Sylvia Luong has left. A 52-week FY27 activation plan exists if leadership reverses — contact Maria Boukhval.",
      links: [
        { label: "Google folder",            url: "https://drive.google.com/drive/folders/1HIVXvhVT4W1efIegkx82IOpIobF7rY8T" },
        { label: "PO US0154356 (new)",       url: "https://intuit.coupahost.com/order_headers/154356", type: "po" },
        { label: "Prev PO US0126270",        url: "https://intuit.coupahost.com/order_headers/126270", type: "po" },
        { label: "Activation Plan dashboard",url: "https://drive.google.com/file/d/1pHh3prcmaGevSYaBheuckFRqFOkZikJp/view" },
        { label: "Course Content Corner",    url: "https://learning.linkedin.com/customer-success-center/linkedin-learning-course-content-corner#content-maps" },
      ],
    },
    {
      name: "Reforge",
      type: "Learning partner since 2020",
      status: "stop",
      facts: { Contract: "$90,000", Renewal: "Jul 31, 2026", Usage: "100 seats · ~80% dormant" },
      contacts: [
        { name: "Jonathan Palay", role: "Head of Sales, Reforge Learning", phone: "215.518.0817", email: "jonathan.palay@reforge.com" },
      ],
      rec: "<b>No renewal.</b> Reps disconnected from Slack Connect on 05/29/26. Communicate termination and decide the fate of <a href='https://intuit-teams.slack.com/archives/C4511F4CU'>#reforge-marketing</a> (116 members): archive or repurpose. A Slack manager and plan are needed. Comms before Jul 31.",
      links: [
        { label: "Google folder",        url: "https://drive.google.com/drive/folders/1JhqaFr2waXdF6uCchzstsSY70OvH-4bU" },
        { label: "PO US0125336",         url: "https://intuit.coupahost.com/order_headers/125336", type: "po" },
        { label: "Reforge site",         url: "https://edu.reforge.com/" },
        { label: "Slack manager plan",   url: "https://docs.google.com/document/d/1cOK2a8GJ29D4g5hIzTGaH_Z8Z9nXFto7ty6Zi-GR6nc/edit" },
      ],
    },
    {
      name: "IA — Insights Association",
      type: "Research membership",
      status: "tbd",
      facts: { Contract: "$25,000", Credit: "$18,289", Renewal: "Dec 31, 2026" },
      contacts: [
        { name: "Nicole Symelidis", role: "COO",                  phone: "(202) 370-6120", email: "nicole.symelidis@insightsassociation.org" },
        { name: "Meg Collins",      role: "Director, Membership",                           email: "meg.collins@insightsassociation.org" },
      ],
      rec: "<b>Rescope.</b> Review the activation-plan proposal (received 05/25/26) and decide how to use the $18,289 credit — e.g., event sponsorship Sept 15–17 or Ignite Small Business. Dormant, research teams only. Decision held until Sept 2026; can transfer to Christine Chu.",
      links: [
        { label: "Google folder",       url: "https://drive.google.com/drive/folders/10GorM48zIyfaKw2z0y54QSu57rk6W9U_" },
        { label: "Insights Association",url: "http://insightsassociation.org" },
      ],
    },
    {
      name: "The Work / WARC / Lions OS",
      type: "Effy · creative intelligence",
      status: "tbd",
      facts: { "New proposal": "$90,500", "2025 spend": "$94,556", Due: "Mar 30 / Jul 31, 2026" },
      contacts: [
        { name: "Amy-Eloise Phoenix", role: "Sr Account Manager, Lions Intelligence", email: "Amy.Phoenix@warc.com" },
        { name: "Matt Rattee",        role: "AI tool",  email: "Matt.Rattee@informa.com" },
        { name: "James Inglis",       role: "MCP",      email: "James.Inglis@informa.com" },
      ],
      rec: "<b>Decide — urgent.</b> One of two contracts already expired (Mar 2026); the second is due Jul 31. Underutilized, no visibility into usage. Decide the $90,500 proposal (20 WARC + 20 The Work + 10 Lions OS) — new POs and SOW required — or research a new AI tool with Talent Acquisition. Ask the brand whether to keep it.",
      links: [
        { label: "Google folder",     url: "https://drive.google.com/drive/folders/1puskRSjOEI5Loywv1mdKGWKRFV7sW9DP" },
        { label: "New proposal deck", url: "https://docs.google.com/presentation/d/1MuNhmj7UrsjAp6yTO5V1tQ_TYoBsXGM0/edit" },
      ],
    },
    {
      name: "MTM — Marketers That Matter",
      type: "Executive networking platform",
      status: "tbd",
      facts: { Contract: "$25,000 · paid", "Right to refuse": "Oct 31, 2026", Due: "Dec 31, 2026" },
      contacts: [
        { name: "Jennie Stark", role: "VP, Marketers That Matter", email: "jennie@marketersthatmatter.com" },
      ],
      rec: "<b>Rescope.</b> Review the activation plan before the Oct 31 right-to-refuse, then respond to Jennie. No engagement data and no control over content — partners email our employees directly with live-event invites. Audience: CMO, C-level, Directors, Group Managers. Strong exec networking value worth examining.",
      links: [
        { label: "Google folder",          url: "https://drive.google.com/drive/folders/1fO0Ac3-P7prSehxaXDmrz_bgBdP_3bTT" },
        { label: "PO US0139147",           url: "https://intuit.coupahost.com/order_headers/139147", type: "po" },
        { label: "Marketers That Matter",  url: "https://www.marketersthatmatter.com/" },
      ],
    },
  ],

  // ── VENDORS ──────────────────────────────────────────────
  vendors: [
    {
      name: "Electric Thinking Co.",
      subtitle: "via Magnit",
      status: "tbd",
      poValue: "$28,000 · no PO",
      poSort: 28000,
      workstream: "WoW_D4D Skills MVP.",
      contacts: [
        { name: "Kenny White", role: "2645 San Benito Dr, Walnut Creek, CA 94598", phone: "+1 415 378 2263", email: "kenny@electricthinking.ai" },
        { name: "Jenn Haugh",  role: "Working through Intuit CW via Magnit", email: "Jenn_Haugh@intuit.com" },
      ],
      nextStep: "Request came in on 06/15 — WIP. No PO; all work was scheduled through Magnit.",
      links: [
        { label: "Google folder", url: "https://drive.google.com/drive/folders/1lPVQrY3kE_5DNb-E3NXLCSVXOphoEoPb?usp=drive_link" },
      ],
    },
    {
      name: "BW Events LLC",
      subtitle: "Intuit-wide",
      status: "done",
      poValue: "$113,225 paid",
      poSort: 113225,
      workstream: "RTB — M&C Craft Academy: architecture consulting, API dev, event tech, Craft website (Swoogo), Docebo integration, Skill Hub.",
      contacts: [
        { name: "Brandon Wernli",   phone: "(801) 473-3212", email: "brandon@bweventstech.com" },
        { name: "Radhika Kathuria", email: "radhika.kathuria@bweventstech.com" },
        { name: "Jeremy Kenaston",  role: "Intuit CW, Swoogo", email: "jeremy_kenaston@intuit.com" },
      ],
      nextStep: "Close completed POs; relationship continues for the website. Obtain Swoogo-Admin & Docebo-Admin access.",
      links: [
        { label: "Google folder", url: "https://drive.google.com/drive/folders/1m6hkmc2kK5yEVCQWATdq4e0W-BMoLd3b" },
        { label: "Craft website", url: "https://growyourcraft.intuit.com/craft/home?i=X-KxbAEreg8pd7030IivDk_8XlizTR76#search" },
        { label: "Skill Hub",     url: "https://script.google.com/a/macros/intuit.com/s/AKfycbyJSsmOGZQvUdL8IrdxhUPWdqkLN1ss_N5hf-y2tgcL3Z-nCsUTPD2x48GRWkK78Rdc/exec" },
      ],
    },
    {
      name: "Studio Rover LLC",
      subtitle: "Intuit-wide · primary creative",
      status: "done",
      poValue: "$62,000 paid",
      poSort: 62000,
      workstream: "BR1 (WOW) & RTB — design & beautify M&C customer-facing slides and visual assets; works with BW on web pages.",
      contacts: [
        { name: "Gabe Ruane",    role: "Co-founder", phone: "415-944-0470", email: "gabe@studiorover.co" },
        { name: "Patrick Craig", role: "Designer",                           email: "patrick@studiorover.co" },
      ],
      nextStep: "Close all POs. Verify the duplicate PO (US0144022 vs US0131841, both $10,000) before closing.",
      links: [
        { label: "Google folder", url: "https://drive.google.com/drive/folders/14OcpPuMyCoqOIbMSfeY2t-OaHFnN7f2-" },
        { label: "US0130938", url: "https://intuit.coupahost.com/order_headers/130938", type: "po" },
        { label: "US0137882", url: "https://intuit.coupahost.com/order_headers/137882", type: "po" },
        { label: "US0147884", url: "https://intuit.coupahost.com/order_headers/147884", type: "po" },
        { label: "US0125221", url: "https://intuit.coupahost.com/order_headers/125221", type: "po" },
      ],
    },
    {
      name: "Merging Path Consulting",
      subtitle: "",
      status: "done",
      poValue: "$23,460 pre-paid",
      poSort: 23460,
      workstream: "BR1 (WoW) — Peer Coaching Certification: Decision-Making facilitation with Brooks E. Scott.",
      contacts: [
        { name: "Brooks E. Scott", role: "Executive Coach", phone: "510-662-9800", email: "Brooks@mergingpath.com" },
      ],
      nextStep: "Completed — close the contract.",
      links: [
        { label: "Google folder", url: "https://drive.google.com/drive/folders/1KlPqGp-BLkfXlXQMkEYDknGZDIRl9ECr" },
        { label: "PO US0145280",  url: "https://intuit.coupahost.com/order_headers/145280", type: "po" },
      ],
    },
    {
      name: "Bright Idea Sparks",
      subtitle: "IdeaSparks · Ikezi Kamanu",
      status: "done",
      poValue: "$48,763 pending",
      poSort: 48763,
      workstream: "BR2 — Live Learning Events (LLE) / AI Transformation.",
      contacts: [
        { name: "Ikezi Kamanu", phone: "530-346-3359", email: "ekz@ideasparks.io" },
      ],
      nextStep: "Close the contract. Reconcile the partially paid invoice and the pending-approval requisition first. Awaiting PO and final payment.",
      links: [
        { label: "Google folder",   url: "https://drive.google.com/drive/folders/1sw1jGYX4Zx7zfYZkIL-C-ug7H7mI-cpZ" },
        { label: "PO US0158122",    url: "https://intuit.coupahost.com/order_headers/158122", type: "po" },
        { label: "Req 254836",      url: "https://intuit.coupahost.com/requisition_headers/254836", type: "po" },
        { label: "Coupa supplier",  url: "https://intuit.coupahost.com/suppliers/show/49548" },
      ],
    },
    {
      name: "Coast Third Films",
      subtitle: "MindSpring LLC",
      status: "done",
      poValue: "$35,400 of $59,000",
      poSort: 35400,
      workstream: "BR1 (WoW) — Course Creation.",
      contacts: [
        { name: "Jeff Joanisse", role: "Chief Experience Officer", email: "Jeff.Joanisse@gomindspring.com" },
      ],
      nextStep: "60% of work delivered; this PO is complete and can be closed.",
      links: [
        { label: "Google folder", url: "https://drive.google.com/drive/folders/1m8luEHjqyTnIlOldTeazmO7W93MVHpC6" },
        { label: "PO US0145909",  url: "https://intuit.coupahost.com/order_headers/145909", type: "po" },
      ],
    },
    {
      name: "Blue Goose Events & Marketing",
      subtitle: "",
      status: "done",
      poValue: "$36,296 + $45,810 old",
      poSort: 36296,
      workstream: "BR2 (AI Transformation) — external event production; Learn & Connect events; organized the Hackathon.",
      contacts: [
        { name: "Kimberly Goosherst", role: "Owner", email: "kimberly@bluegooseevents.com" },
        { name: "Shari Weissner",               email: "shari@bluegooseevents.com" },
        { name: "Katie Woywod",                 email: "katie@bluegooseevents.com" },
      ],
      nextStep: "Completed for the cycle. Align on dates and book early each fiscal year. No performance data — prior relationship via Sylvia Luong.",
      links: [
        { label: "Google folder",   url: "https://drive.google.com/drive/folders/1zjU6REzT0eYPeonk9wDnL3Nxxmot7BF3?usp=drive_link" },
        { label: "PO US0149610",    url: "https://intuit.coupahost.com/order_headers/149610", type: "po" },
        { label: "US0110680 (old)", url: "https://intuit.coupahost.com/order_headers/110680", type: "po" },
      ],
    },
  ],

  // ── TOOLS & TECH ─────────────────────────────────────────
  // status: "stop" | "tbd" | "go"
  tools: [
    {
      name: "Splash / Cvent",
      status: "stop",
      poc: "Jonathan O'Leary <Jonathan.Oleary@cvent.com> · Rachel Schweitzer <Rachel.Schweitzer@cvent.com>",
      use: "Event registration. Access: needs Admin; remove and regroup.",
      nextStep: "Terminate; reach out to Rachel & Jonathan. Remove departed licenses (still billed for seats).",
      links: [],
    },
    {
      name: "M&C Zoom",
      status: "stop",
      poc: "Account: marketingcommsld@intuit.com",
      use: "Hosts all Live Learning Events — invites, polls, recordings. Access via Zoom.us through the account owner.",
      nextStep: "Flagged as not working and no longer needed. Confirm an LLE replacement before retiring, then transfer/rename.",
      links: [],
    },
    {
      name: "Microsoft Outlook",
      status: "stop",
      poc: "marketingcommscraftdevelopment@intuit.com",
      use: "Teams Outlook email (shared mailbox); Microsoft 365.",
      nextStep: "Archive the data. Disconnect the licenses or rename and reuse.",
      links: [],
    },
    {
      name: "Calendly",
      status: "stop",
      poc: "Credentials TBD",
      use: "Used for the Peer Coaching Program (closing).",
      nextStep: "Get access and disconnect or rescope. Subscription plan unclear.",
      links: [],
    },
    {
      name: "Airtable",
      status: "tbd",
      poc: "Chelsey Monroe <chelsey.monroe@airtable.com> · Zach Tucker <zachary.tucker@airtable.com> · Internal: Cindy Juengling & Kelly Bernie",
      use: "PgM intake form, scheduling, database. Access: needs Admin; remove and regroup.",
      nextStep: "Remove departed licenses (still billed). Data is chaotic — reorganize; could be the backup dataset for the AI website.",
      links: [
        { label: "Projects base", url: "https://airtable.com/appPKq6MTak5PJw6S/pagSJ7P9v9ldd01Jf" },
      ],
    },
    {
      name: "Sendoso / Shopify",
      status: "tbd",
      poc: "Andie Moll <Andie.Moll@sendoso.com> · Rob Schotta <rob.schotta@sendoso.com> · Lauren Pinheiro (Intuit)",
      use: "Gifting + inventory (Intuit-wide). 31 licenses, 30 in use. Space admins Paulina & Sylvia have left.",
      nextStep: "Migrate to a new group with reps; remove departed licenses. Close the open 2023 PO ($10,200, unpaid).",
      links: [
        { label: "Google folder",     url: "https://drive.google.com/drive/folders/1B2Xhd3ZTmnc_tK5Ahe42Ttu5gKWNACRD" },
        { label: "PO US0053602",      url: "https://intuit.coupahost.com/order_headers/53602", type: "po" },
        { label: "Sendoso overview",  url: "https://docs.google.com/document/d/1N6OilQ2W4JEgq7VitlWB6DxmTRM0tVfZuKpk1vXz8qo/edit" },
      ],
    },
    {
      name: "Swoogo (via BW)",
      status: "tbd",
      poc: "Jeremy Kenaston <jeremy_kenaston@intuit.com> · Radhika Kathuria (BW) <radhika.kathuria@bweventstech.com> · Adam Verdin <Adam_Verdin@intuit.com>",
      use: "Event tech / website. The Craft website is live on Swoogo. Access: by invitation, then Intuit SSO.",
      nextStep: "Invite new owners to manage environments; remove departed licenses. Connect with Adam Verdin.",
      links: [
        { label: "Craft website",  url: "https://growyourcraft.intuit.com/craft/home?i=X-KxbAEreg8pd7030IivDk_8XlizTR76#search" },
        { label: "Swoogo login",   url: "https://id.swoogo.com/?redirect_to=https%3A%2F%2Fwww.swoogo.com%2Fsite%2Fauthorize&login_hint=maria_boukhval%40intuit.com" },
      ],
    },
    {
      name: "Docebo",
      status: "tbd",
      poc: "Brian Dominguez <brian.dominguez@docebo.com> · Ben Clark <ben.clark@docebo.com> · Adam Verdin <Adam_Verdin@intuit.com>",
      use: "LMS / enablement (Intuit-wide). Migration complete. Access: Intuit SSO after invitation.",
      nextStep: "Close and manage remaining hours with BW (content published to the catalog).",
      links: [
        { label: "Learning Catalog", url: "https://growyourcraft.intuit.com/craft/catalog?i=X-KxbAEreg8pd7030IivDk_8XlizTR76" },
        { label: "Google folder",    url: "https://drive.google.com/drive/folders/1sUENYivN_YFxuhgaW9vH6DK9GM9apeS7" },
        { label: "PO US0135114",     url: "https://intuit.coupahost.com/order_headers/135114", type: "po" },
      ],
    },
    {
      name: "SurveyMonkey",
      status: "tbd",
      poc: "Owner: Mos Okediji (group add)",
      use: "Team-level survey tool within an Intuit-wide license.",
      nextStep: "Transition access only. Migrate the team's private group so historical data isn't lost; add members via Mos.",
      links: [],
    },
    {
      name: "Google Analytics",
      status: "tbd",
      poc: "Request via Jeremy (Swoogo); external admin Radhika (BW)",
      use: "Tracks Keep Crafting site. Tracking ID: G-443BSZ3J23. Ensure menu integrity when Rohini pushes newsletter updates.",
      nextStep: "Needs a new Intuit Admin — author is view-only and prior admins (incl. Paulina) have left.",
      links: [
        { label: "Google Analytics", url: "https://analytics.google.com/analytics/web/" },
      ],
    },
    {
      name: "Workato",
      status: "tbd",
      poc: "IT / T4I Access Portal",
      use: "Slack automation for event communications (Intuit-wide). Access via IT Portal + training.",
      nextStep: "Rescope. Update licenses and access via the IT Portal; remove departed users.",
      links: [],
    },
    {
      name: "Credly",
      status: "tbd",
      poc: "Adam Verdin / Sylvia Luong",
      use: "Digital badge issuance; badges awarded monthly.",
      nextStep: "Confirm ownership and ongoing need.",
      links: [],
    },
    {
      name: "Intuit Insights & Slack",
      status: "tbd",
      poc: "Insights Intuit team & Slack admins",
      use: "MCLRC web pages (outdated) + Slack channels.",
      nextStep: "Remove/adjust outdated pages; assign admins & schedule maintenance.",
      links: [
        { label: "MCLRC page",          url: "https://sites.intuit.com/home/ls/content/5014469611225088/department-pages-all/transformation-office/marketing-and-communications-learning-and-development" },
        { label: "Platform Marketing",  url: "https://sites.intuit.com/home/ls/content/4862765518922165/department-pages-all/intuit-platform-marketing" },
        { label: "Learning & Training", url: "https://insight.app.intuit.com/resources/learning-and-training" },
        { label: "#mktg-comms-all",     url: "https://intuit-teams.slack.com/archives/C4511F4CU", type: "slack" },
      ],
    },
    {
      name: "Google Workspace",
      status: "go",
      poc: "Grace Scherbarth (EA) · Shared inbox: marketingcommscraftdevelopment@intuit.com",
      use: "Drive, Docs, Calendar, shared inbox. Access via Identity Manager.",
      nextStep: "Core infrastructure. Maintain access via Identity Manager (EasyCare ticket for mailbox); transition only.",
      links: [],
    },
    {
      name: "Workday",
      status: "go",
      poc: "Intuit IT",
      use: "TAM list / Intuit Public Directory roster. Access via Intuit SSO.",
      nextStep: "Transition only. Pull the Public Directory monthly into the roster sheet plus the leadership sheet.",
      links: [],
    },
  ],

  // ── WORKSTREAMS ──────────────────────────────────────────
  workstreams: [
    {
      name: "Onboarding",
      type: "Welcome experience for new M&Cs",
      status: "tbd",
      owner: { name: "TBD (finding)", departed: false },
      rec: "<b>What's left:</b> define & document a new onboarding process across all orgs; confirm welcome-swag licensing (Sendoso). <b>Note:</b> recommend moving onboarding to the culture initiative led by Katie P.",
      links: [
        { label: "Welcome Presentation", url: "https://docs.google.com/presentation/d/1rtBcDQEHIkq2JQTkLi3Fapx3Mds8dSVMoqvl7h-_0_I/edit?usp=sharing" },
        { label: "Onboarding folder",    url: "https://drive.google.com/drive/folders/1B2Xhd3ZTmnc_tK5Ahe42Ttu5gKWNACRD" },
        { label: "Sendoso overview",     url: "https://docs.google.com/document/d/1N6OilQ2W4JEgq7VitlWB6DxmTRM0tVfZuKpk1vXz8qo/edit" },
      ],
    },
    {
      name: "GenAI — Claude Skills Hub",
      type: "Skills library on the Craft website",
      status: "tbd",
      owner: { name: "TBD (finding)", departed: false },
      rec: "<b>What's left:</b> document owner, cadence & distribution. Migrate to GitHub for easier updates. <b>Note:</b> the Google Sheet & App Script are owned by a deactivated user — transfer via the Workspace super admin (IT).",
      links: [
        { label: "Claude Skills Hub", url: "https://script.google.com/a/macros/intuit.com/s/AKfycbyJSsmOGZQvUdL8IrdxhUPWdqkLN1ss_N5hf-y2tgcL3Z-nCsUTPD2x48GRWkK78Rdc/exec" },
      ],
    },
    {
      name: "GenAI — Digest",
      type: "Monthly newsletter",
      status: "tbd",
      owner: { name: "TBD (finding)", departed: false },
      rec: "<b>What's left:</b> monthly cadence, not yet transferred. Capture owner, cadence & resources before handoff.",
      links: [
        { label: "GenAI Digest", url: "https://growyourcraft.intuit.com/craft/Newsletter?i=X-KxbAEreg8pd7030IivDk_8XlizTR76" },
      ],
    },
    {
      name: "Peer Coaching",
      type: "Certification & booking program",
      status: "stop",
      owner: { name: "TBD (finding)", departed: false },
      rec: "<b>What's left:</b> remove the program from the website and disconnect the Calendly booking links. <b>Note:</b> deprioritized — low engagement despite reported interest.",
      links: [
        { label: "Peer Coaching",   url: "https://growyourcraft.intuit.com/craft/learn-teach-grow?i=X-KxbAEreg8pd7030IivDk_8XlizTR76" },
        { label: "Coach Directory", url: "https://growyourcraft.intuit.com/craft/peer-coach-directory?i=X-KxbAEreg8pd7030IivDk_8XlizTR76" },
      ],
    },
    {
      name: "Learning Experiences",
      type: "Craft website, LLE & intake",
      status: "go",
      owner: { name: "TBD (finding)", departed: false },
      rec: "<b>What's left:</b> maintain the Craft website (Swoogo); replace LLE hosting (M&C Zoom retiring); migrate the intake form off the retired MarketingDev automation to Google Drive.",
      links: [
        { label: "Craft website",         url: "https://growyourcraft.intuit.com/craft/home" },
        { label: "Intake Form (Airtable)",url: "https://airtable.com/appLABKQP8jXwvm1T/shrOGwWPfPXJscweT" },
      ],
    },
    {
      name: "Strategic Partnerships",
      type: "See Strategic Partners tab",
      status: "go",
      owner: { name: "Emily Valencia (departed)", departed: true },
      rec: "<b>What's left:</b> execute per-partner decisions — renew ANA; decide IA, The Work & MTM; stop LinkedIn & Reforge.",
      links: [],
    },
    {
      name: "Tools & Tech",
      type: "See Tools & Tech tab",
      status: "tbd",
      owner: { name: "TBD (finding)", departed: false },
      rec: "<b>What's left:</b> license cleanup for departed users; re-establish admin owners; execute per-tool actions. Decide the future of the Craft website (some links inactive) and the comms channels (Slack, Outlook).",
      links: [
        { label: "Craft website", url: "https://growyourcraft.intuit.com/craft/home?i=X-KxbAEreg8pd7030IivDk_8XlizTR76" },
      ],
    },
  ],

  // ── DASHBOARDS & ACCESS ───────────────────────────────────
  dashboards: [
    {
      name: "FY26 AI Adoption dashboard",
      status: "go",
      detail: "github.io/fy26_ai_adoption_dashboard",
      url: "https://marketingcraftdevcapabilities.github.io/fy26_ai_adoption_dashboard/",
      action: "Transfer ownership Maria → <b>Lisa Rodriguez</b>.",
      notes: "Transfer initiated on 06/04/2026.",
    },
    {
      name: "Google Analytics tracking",
      status: "tbd",
      detail: "G-443BSZ3J23",
      url: "https://analytics.google.com/analytics/web/",
      action: "Re-grant admin.",
      notes: "Tracks the Keep Crafting site. External admin Radhika (BW); re-establish an Intuit admin — prior admins have left.",
    },
    {
      name: "LinkedIn Activation Plan dashboard",
      status: "tbd",
      detail: "",
      url: "https://drive.google.com/file/d/1pHh3prcmaGevSYaBheuckFRqFOkZikJp/view",
      action: "Hand off for FY27.",
      notes: "Contact Maria Boukhval to obtain it. Tied to the LinkedIn rescope.",
    },
    {
      name: "Sendoso inventory dashboard",
      status: "tbd",
      detail: "",
      url: "https://claude.ai/artifacts/latest/ae986943-486d-4be2-9d60-2ba5ed17d600",
      action: "Migrate with reps.",
      notes: "Inventory list and stock dashboard. Migrate to a new group with Sendoso reps.",
    },
    {
      name: "PgM intake / project base",
      status: "tbd",
      detail: "Airtable base",
      url: "https://airtable.com/appPKq6MTak5PJw6S/pagSJ7P9v9ldd01Jf",
      action: "Reorganize / migrate.",
      notes: "Move the intake form to Google Drive off the retired MarketingDev automation.",
    },
    {
      name: "All other dashboards",
      status: "go",
      detail: "Various",
      url: null,
      action: "Transfer access.",
      notes: "Make all dashboards transfer. Confirm ownership and admin seats for each as access is handed over.",
    },
  ],

  // ── KEY PEOPLE ────────────────────────────────────────────
  people: [
    {
      group: "Incoming & preparers",
      entries: [
        { name: "Lisa Rodriguez",  detail: "FY26 AI Adoption dashboard owner (transfer initiated 06/04)" },
        { name: "Maria Boukhval", detail: "Prepared this guide" },
        { name: "Mos Okediji",    detail: "On whose behalf; SurveyMonkey group owner" },
      ],
    },
    {
      group: "Access risk — departed",
      entries: [
        { name: "Sylvia Luong",    detail: "Held LinkedIn group, Sendoso, Credly & vendor relationships" },
        { name: "Emily Valencia",  detail: "Prior Strategic Partnerships owner" },
        { name: "Paulina",         detail: "Prior Sendoso & Analytics admin" },
      ],
    },
    {
      group: "Pull in for decisions",
      entries: [
        { name: "Christine Chu",   detail: "Can own the IA — Insights Association decision" },
        { name: "Katie P",         detail: "Culture initiative (onboarding)" },
        { name: "Adam Verdin",     detail: "Swoogo / Docebo / Credly", email: "Adam_Verdin@intuit.com" },
        { name: "Jeremy Kenaston", detail: "Swoogo (Intuit)", email: "jeremy_kenaston@intuit.com" },
      ],
    },
  ],

};
