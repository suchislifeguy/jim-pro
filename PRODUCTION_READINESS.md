# JIM — Production Readiness Report

Where the app stands today, what needs to happen before it can ship to real users, and a recommended order of operations.

_Last replanned: 2026-05-08._

---

## Where you are now

A single ~3,300-line `index.html` that runs as a PWA. React + Tailwind via CDN, Babel compiles JSX in the browser at runtime. All data lives in IndexedDB on one device. Gemini AI key is user-supplied and stored client-side — but the audience (sole-trader tradies) won't sign up for a Gemini key themselves, so AI is effectively gated behind tech-savviness today. Licence keys are hardcoded in the JavaScript. No tests, no error reporting, no backend.

The single-file HTML is staying for now: it's edited daily, easy to read end-to-end, and one `git push` ships it. We add a backend *next to* the HTML, not by tearing the HTML apart.

The UI is in good shape. The plumbing isn't.

## Where you need to be

The same single-file PWA, fronted by a single Firebase project doing everything: Auth, Firestore (data + quota counters + Pro entitlement), Cloud Functions (AI proxy + Stripe webhooks), Cloud Storage (images). One vendor, one console, one bill — chosen for ops simplicity over best-of-breed. Plus a Stripe account for billing and a Play Store listing. Roughly **3-4 months of solo work**, or **6-8 weeks with help**.

---

## 1. Build pipeline — deferred

Originally the first phase. Now intentionally deferred while the file is still small enough to navigate by hand and shipping is a `git push`.

Trade-offs you accept by keeping the single HTML:
- Babel transforms in-browser on every load (~100-300ms cold).
- Whole-file Tailwind CSS download.
- A single typo can crash the file — there's no build-time check.

Mitigations that don't require a build step:
- Pin React / Tailwind / lucide CDN URLs to specific versions (no `@latest`).
- Add `<meta http-equiv="Content-Security-Policy">` to lock down what scripts can run.
- Add a tiny CI check (GitHub Actions) that loads `index.html` headless and asserts a `window.__JIM_READY__` flag set at end of `<App/>` mount — catches the "blank white screen" class of typo before it ships.
- Service worker already caches CDN responses after first load.

**Revisit the migration when:** the file passes ~5,000 lines, you onboard a second developer, or AI-generated edits start corrupting unrelated regions.

**Effort when revisited:** 3-5 days for Vite + module split (components/, hooks/, utils/, data/).

---

## 2. Backend, accounts, and multi-device sync

**Why accounts are now non-negotiable.** The moment you charge a subscription, accounts stop being a "nice to have". Stripe needs a customer object to attach the sub to, and you can't enforce "you paid for Pro" across a reinstall, a new phone, or a wiped browser without an identity that lives off the device. Multi-device sync then falls out almost free — and it's the answer to *"I quoted on the phone at the site, can I print it from the laptop tonight?"*

**Offline-first stays.** The PWA still works on a job site with no signal: IndexedDB is the offline cache, Firestore is source of truth, sync runs when connectivity returns. The on-site experience is unchanged — bonus is the same data appears on the laptop at home.

**Chosen stack: Firebase. One console, one bill, one identity model.** Everything in §3, §4, §7 lives in the same Firebase project, deliberately, to keep the ops surface small. We're picking single-vendor consolidation over best-of-breed.

- **Auth** — Email/password + Google Sign-In. Tradies all have Gmail.
- **Firestore** — jobs, appointments, timesheets, templates, materials, *and* the §3 quota counters and the Pro entitlement flag.
- **Cloud Storage** — photos and logos (currently base64 in IndexedDB; this *will* hit the 50MB origin quota with real usage).
- **Cloud Functions** — AI proxy (§3), Stripe webhooks (§7), data deletion endpoint (§4).
- **Hosting** (optional) — can serve the static `index.html` too if you don't want a separate Vercel/Netlify.

One set of security rules, one place to revoke a key, one bill to read. Supabase is the only credible alternative (PostgreSQL, self-hostable) — slightly more long-term ownership, slightly more glue code; not worth it given the consolidation goal.

**Migration story:**
- Existing users have IndexedDB data. On first sign-in, push that data to Firestore.
- Keep IndexedDB as offline cache; Firestore is source of truth.
- The anonymous device-id from §3 quietly migrates to a Firebase user-id on first sign-in (carry today's quota forward, attach future Pro entitlement to the user record).
- Conflict resolution: last-write-wins is fine for solo tradies; more complex if you ever support teams.

**Effort:** Auth slice (sign-in, attach to Stripe customer): 3-4 days, lands inside Phase 4 alongside Stripe. Full Firestore sync of app data: 3-4 weeks (Phase 5) — the biggest single chunk of work.

---

## 3. AI: app-supplied key, server proxy, model cycling

This is now load-bearing, not optional. The audience won't get a Gemini key. JIM has to provide one — safely, with a daily cap, and with a sensible fallback when a model rate-limits or 5xx's.

### Model strategy (May 2026)

Gemini 1.5 and 2.0 are retired. The fallback shape already in `smartFetchAI` (`index.html:429`) is correct — keep it, move execution server-side, and gate by plan:

- **Heavy tasks** (quote generation, receipt parsing, structured extraction): Pro-tier first, fall back through fast-tier on rate-limit / 5xx.
- **Light tasks** (rewrites, suggestions, short answers): fast-tier only.
- One stale `gemini-2.0-flash` call at `index.html:26` needs to go — it's the only path that bypasses `smartFetchAI`.
- Keep the chain in a single server-side constant so swapping models as Google rotates them is a one-line change.

### Three modes a user can be in

| Mode | Daily cap | Models available | Key source |
|------|-----------|------------------|------------|
| Free (app key) | **3 calls / device / UTC day** | fast-tier only | App's pooled key |
| Pro (app key) | **50 calls / account / UTC day** | full chain incl. Pro-tier | App's pooled key |
| BYO key (any tier) | unlimited (their bill) | full chain | User's own key, stored locally |

BYO stays as an explicit Settings toggle for the small minority who already have a Gemini key. Costs nothing to keep, protects the power-user audience, and gives a pressure-relief valve if the pooled key ever runs hot.

### Proxy contract

Hosted on **Firebase Cloud Functions**, with **Firestore** as the per-identity counter store — same project as everything else (§2). One contract:

```
POST /ai/generate
  headers: x-jim-device-id, x-jim-licence (optional)
  body:    { taskType: "heavy"|"light", contents, generationConfig }
  returns: Gemini response, OR { error: "quota_exceeded", resetAt }
```

Server responsibilities:
1. Resolve identity → device-id (free) or licence → account-id (Pro).
2. Increment per-identity daily counter; reject over cap with `resetAt` so the client can show "resets in 4h 12m".
3. Walk the model chain server-side; return first success. Log model used for cost-tuning, never log prompt bodies (PII).
4. Never echo the upstream Gemini key. Strip it from any error returned to the client.

### Quota identity: anonymous now, Firebase user once Auth lands

Phase 2 ships with anonymous identity: a UUID generated on first run, persisted in **IndexedDB** (not localStorage — survives storage clears better), sent as `x-jim-device-id`. Trivial to abuse (clear storage = new 3-pack), acceptable for the short window before Phase 4.

Phase 4 swaps it: once Firebase Auth is in, the proxy reads the user from a Firebase ID token in the `Authorization` header — no separate JWT to manage, Firebase already signs and verifies it. Existing device-id counters get carried forward to the user-id on first sign-in so day-of-sign-in isn't a free 3-pack reset.

Add an IP-based rate limit on top (e.g. 30 req / IP / hour) to slow scripted abuse without punishing shared-NAT users.

### Other security work in this phase

- **Content Security Policy** — currently none. Add one in `<meta http-equiv="Content-Security-Policy">`.
- **Strip the inline Gemini key path** at `index.html:26` so all AI traffic flows through the proxy. (BYO mode targets the proxy too, but with a header telling the server to use the caller's key instead of the pooled one.)

**Hardcoded licence keys deferred to Phase 4.** Once Firebase Auth + Stripe land together, "is this user Pro?" is just an `isPro` flag on the Firebase user record — no separate licence service, no custom JWT. Until Phase 4 the device-id quota does the heavy lifting and the licence array is a known leak you live with for ~6-8 weeks.

**Effort:** 1-1.5 weeks. Firebase project setup is the bulk of it; the proxy itself is a thin Cloud Function.

---

## 4. Privacy & compliance — the legal floor

You're handling real customer data: names, addresses, phone numbers, email, payment status. There are laws about that, and the Play Store will refuse the app without these.

- **Privacy Policy** — public URL, must say what data you collect, where it lives, how it's deleted, and how to contact you. Must call out that AI prompts are forwarded to Google's Gemini API; that prompt bodies are not logged; that only quota counters and request metadata are retained. Templates on iubenda.com or termly.io if you don't want to hire a lawyer.
- **Terms of Service** — same. Include the AI quota terms and a "fair use" clause so you can throttle a runaway device without breaching contract.
- **AU tax invoice format compliance** — invoices over $82.50 must include ABN, "Tax Invoice" wording, GST breakdown, supplier details, date. Most of this is already in the print template; verify against ATO checklist.
- **Data deletion endpoint** — a user must be able to wipe their account *and* their device-id quota record. Required for Google Play Data Safety questionnaire.
- **GDPR** — only if you take EU/UK users. Add data export (you already have JSON export — that satisfies it) and account deletion.

**Effort:** 3-5 days, mostly writing copy.

---

## 5. Quality & monitoring

You currently have **zero** tests and **zero** error reporting. Real users will find ways to break it that you've never imagined. You need to know when they do.

- **Sentry** — drop-in error reporting. Free tier covers up to 5k events/month. Catches every uncaught exception with stack trace and context. Single most valuable add for a solo dev. Add it to both the HTML and the serverless host.
- **Tests** — at minimum:
  - Unit tests on `parseTimeToMinutes`, `getQuoteTotals`, currency formatting, status cycling.
  - One Playwright E2E test for the golden path: create job → add task → generate PDF.
  - One test against the AI proxy: 3 calls succeed, 4th returns `quota_exceeded`.
- **Analytics** — PostHog or Plausible. Tells you which features are actually used so you don't pour effort into dead features.
- **Cost dashboard** — graph daily Gemini spend by model. Pooled-key economics break the moment you can't see them.

**Effort:** 1 week.

---

## 6. Distribution: the Play Store path

Best path for a PWA → Android: **Trusted Web Activity (TWA)**. Your existing PWA loads inside a thin native shell. No rewrite, no Capacitor, no React Native.

**Requirements:**
- HTTPS-served PWA at a stable domain.
- Valid `manifest.json` (you have one — needs `start_url`, icons in 192px and 512px, you have those).
- Service worker (you have `sw.js`).
- **Digital Asset Links** — a `/.well-known/assetlinks.json` file proving you control both the website and the Android package.
- Use **Bubblewrap** CLI or **PWABuilder** to generate the Android APK/AAB.

**Play Console requirements:**
- Google Play Developer account: **$25 one-time**.
- App listing: description, screenshots (at least 2 phone, 1 tablet), feature graphic 1024×500.
- Privacy Policy URL (from §4).
- Data Safety questionnaire — answer honestly about what data you collect and share, including AI prompt forwarding.
- Content rating: PEGI/IARC questionnaire.
- Closed testing → open testing → production. Plan ~2 weeks of testing window before going live.

**iOS:** harder. PWAs on iOS work but with limitations (7-day storage purge if not added to home screen, no push notifications until iOS 16.4+). For App Store presence, you'd need to wrap with **Capacitor**. Recommend skipping iOS until v2.

**Effort:** 1-2 weeks.

---

## 7. Monetization model

You currently have a 3-job free limit, then a one-off PayPal Pro purchase. For real revenue:

**Recommended: subscription model. Both caps apply concurrently on Free — by design.**

| Tier | Jobs | AI calls / day | Models | Price |
|------|------|----------------|--------|-------|
| Free | 10 (hard cap) | **3** | fast-tier only | $0 |
| Pro | unlimited | **50** | full chain incl. Pro-tier | $5-10/mo or $50-80/yr |
| BYO key | tier rules apply | unlimited (own bill) | full chain | tier price |

The two caps create different shapes of friction and they should both stay live:

- **Job cap = ongoing friction.** A free user who wants to keep using JIM without paying has to keep culling old jobs to stay under 10. That's a deletion treadmill they feel every week, not just once. Lower = more pressure (3 is current, 10 is the proposed launch number — you can dial this).
- **AI cap = daily friction.** "Out of AI for today" hits every active user, every day they push the tool.

Show both reasons in the upgrade prompt. "You've hit your 10-job cap *and* you're out of AI for today — Pro removes both." Don't pick one to lead with; the combined squeeze is the point.

Mechanically: the job cap stays client-side (it's already there), the AI cap is the new server-side check from §3. They don't share infrastructure, just a single Pro flag.

**Payments:**
- **On Web:** Stripe. Cleanest API, lowest fees (~2.9% + 30¢). Stripe customer ID is stored on the Firebase user record — one place to look up "is this person Pro?".
- **On Play Store:** Google **requires** Play Billing for digital subscriptions — they take 15% (under $1M ARR) or 30%. You can offer both: Play Billing for users who installed via Play, Stripe for users who signed up via web. Play store policy lets you do this if you tag users by install source. Both paths write the same `isPro` flag onto the Firebase user.

This phase is also when the **hardcoded licence array dies.** Pro-status is a flag on the Firebase user, set by a Stripe webhook (or Play Billing notification) hitting a Cloud Function. The AI proxy from §3 already reads the Firebase token, so it picks up the new entitlement automatically — no separate licence service.

**Effort:** 1.5-2 weeks. Firebase Auth (sign-in UI, Google + email) + Stripe Checkout + webhook + Pro flag plumbing + a BYO-key toggle in Settings. All on the same Firebase project from §3.

---

## 8. Code & data hygiene

Smaller items but they accumulate:

- **Move data out of `localStorage`** — `joblog-timer`, `joblog-extratax`, `theme`, `geminiApiKey`, etc. Some are user prefs (fine in localStorage). The active timer and the device-id from §3 should live in IndexedDB so they survive storage clears better.
- **Image storage** — base64 in IndexedDB is wasteful (~33% size overhead vs binary). When you have Cloud Storage, push images there and store URLs. Keep a thumbnail in IndexedDB for offline.
- **Pagination** — once a tradie has 200+ jobs, dashboard performance will tank. Add virtualised list (react-window) or infinite scroll.
- **Error boundary** — you have one wrapping `<App/>` but child components can still crash silently. Wrap each top-level view (Dashboard, Detail, Schedule, Settings) in its own boundary so a crash in Schedule doesn't take down the whole app.

**Effort:** ongoing, prioritise as friction shows up.

---

## 9. Operations

The unsexy work that makes the difference between "side project" and "real product":

- **Domain name** + DNS (Cloudflare free).
- **Hosting:** Vercel/Netlify free tier handles the static PWA. Firebase Hosting is fine too. The serverless host for §3 is separate from the static host — wire a subdomain like `api.jim.app` so the HTML can point at it without CORS pain.
- **Status page** — UptimeRobot or BetterStack free tier. Public-facing helps trust. Monitor both the static PWA and `/ai/generate`.
- **Support email** — `support@yourdomain.com`. Even just a Gmail forwarding rule is fine to start.
- **Update channel** — service worker handles silent PWA updates. For TWA installs, you'll bump version codes in Play Console for major changes; minor changes ship via PWA refresh and bypass the store entirely (this is the killer feature of TWAs).
- **Backup of user data** — Firebase auto-backs-up Firestore; verify you can restore.
- **Pooled-key safety** — alert on daily spend > $X, and on any single device-id exceeding 100 calls/day (free or Pro). Catches abuse before the bill does.

**Effort:** ~2 days to set up, ongoing maintenance afterwards.

---

## Suggested order of operations

A pragmatic build order. Each phase produces something usable. The biggest reshuffle from the old plan: AI proxy + licence validation move ahead of the Firebase migration, because they unlock real users on the existing single-file HTML.

| Phase | Work | Time | Output |
|-------|------|------|--------|
| 1 | Sentry + basic tests on the existing HTML | 3-5 days | Visibility into crashes |
| 2 | Firebase project + Cloud Functions AI proxy + 3/50 quota in Firestore + CSP | 1-1.5 weeks | Non-techies get AI; the single backend everything else hangs off |
| 3 | Privacy Policy + ToS + compliance | 3-5 days | Legally launchable |
| 4 | Firebase Auth + Stripe subs + Pro flag on user record + BYO toggle. Licence array dies here | 1.5-2 weeks | Real accounts, real monetization, single source of "is Pro" |
| 5 | Firestore sync of jobs/timesheets/templates/materials + Cloud Storage for images (migrate device-id → user-id, IndexedDB stays as offline cache) | 3-4 weeks | Multi-device, no more data loss, on-site offline still works |
| 6 | Onboarding flow + help content | 1 week | Self-serve users |
| 7 | TWA + Play Store submission | 1-2 weeks | App on Play Store |
| 8 | Marketing site + launch | as needed | First customers |
| Later | Vite / module migration | 3-5 days | When the single file outgrows itself |

**Solo timeline: 3-4 months.** With one collaborator: 6-8 weeks.

---

## What I'd cut from scope for v1

To ship faster, drop these from the launch list. Add them in v1.1:

- **iOS app** — PWA-on-iOS works, App Store submission can wait.
- **Team/multi-user accounts** — solo tradies are the audience; teams come later.
- **Advanced reporting** (financial year, BAS export) — nice to have, not blocking.
- **Recurring jobs** — niche, complex.
- **Voice assistant ("Call JIM")** — feature-complete but not load-bearing for v1.

Keep them in the codebase, but don't build them out further until paying users ask.

---

## What's already production-ready

Worth noting because not everything is broken:

- **PWA + service worker** — solid.
- **The UI** — calm, consistent, after the recent design pass.
- **Offline-first behaviour** — a real strength; preserve it through the Firebase migration. AI calls degrade gracefully when offline (already the case).
- **Multi-country support** — already handles AU/NZ/US/CA/GB/IE; expand by adding to `COUNTRY_CONFIGS`.
- **AI plumbing** — `smartFetchAI`'s task-type + fallback-chain shape is the right design. §3 lifts it onto the server, drops the retired 1.5 / 2.0 references, and gates by plan.
- **PDF generation** — html2pdf works; keep it.
