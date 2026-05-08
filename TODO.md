# JIM — TODO

Tracks the work plan in [PRODUCTION_READINESS.md](./PRODUCTION_READINESS.md). Phases run in order; items inside a phase can mostly parallelize.

_Last updated: 2026-05-08._

---

## Phase 1 — Visibility (3-5 days)

Goal: see crashes when users hit them, before anything else changes.

- [ ] Sign up for Sentry (free tier, 5k events/mo)
- [ ] Drop Sentry browser SDK into `index.html`
- [ ] Pin CDN versions for React, Tailwind, lucide (no `@latest`)
- [ ] Add `<meta http-equiv="Content-Security-Policy">` lockdown
- [ ] Set `window.__JIM_READY__ = true` at end of `<App/>` mount
- [ ] GitHub Action: headless load of `index.html`, assert `__JIM_READY__` — catches blank-screen typos
- [ ] Per-view error boundaries (Dashboard, Detail, Schedule, Settings) — currently only the root is wrapped
- [ ] Unit tests: `parseTimeToMinutes`, `getQuoteTotals`, currency formatting, status cycling
- [ ] Playwright E2E: create job → add task → generate PDF

---

## Phase 2 — Firebase backend + AI proxy (1-1.5 weeks)

Goal: non-techies get AI; stand up the single backend everything else hangs off.

**Firebase project setup**
- [ ] Create Firebase project (Spark/free plan to start)
- [ ] Enable Firestore, Cloud Functions, (optionally) Hosting
- [ ] Store Gemini API key as Firebase secret — never in client code
- [ ] Decide subdomain for the API (e.g. `api.jim.app`) and wire CORS

**Anonymous device identity**
- [ ] Generate UUID on first run, persist in **IndexedDB** (not localStorage)
- [ ] Send as `x-jim-device-id` on every AI call

**AI proxy (Cloud Function `POST /ai/generate`)**
- [ ] Validate `x-jim-device-id`; (optional) Firebase ID token in `Authorization`
- [ ] Increment `quotas/{id}` daily counter in Firestore
- [ ] Reject with `{ error: "quota_exceeded", resetAt }` over cap (3 anon, 50 if Pro — Pro lands in Phase 4)
- [ ] Server-side model chain constants (heavy / light), no Gemini 1.5 or 2.0
- [ ] Walk chain server-side; return first success
- [ ] Strip Gemini key from any error before returning to client
- [ ] Never log request bodies

**Client wiring**
- [ ] Re-point `smartFetchAI` (`index.html:429`) at the proxy
- [ ] Remove the inline `gemini-2.0-flash` call at `index.html:26`
- [ ] Show "resets in 4h 12m" UI on `quota_exceeded`

**Abuse + cost**
- [ ] IP rate limit (~30 req / IP / hour)
- [ ] Spend alert at $X/day
- [ ] Per-device alert at >100 calls/day

---

## Phase 3 — Compliance (3-5 days)

Goal: legally launchable.

- [ ] Privacy Policy at public URL (iubenda or termly template)
  - [ ] Disclose AI prompt forwarding to Google Gemini
  - [ ] State that prompt bodies are not logged
- [ ] Terms of Service at public URL
  - [ ] Include AI quota terms + fair-use throttle clause
- [ ] AU tax invoice format: verify against ATO checklist (ABN, "Tax Invoice", GST breakdown, supplier, date)
- [ ] Cloud Function: data deletion endpoint (wipes Firestore + Storage + quota counter)
- [ ] Prep answers for Play Store Data Safety questionnaire
- [ ] (If targeting EU/UK) JSON export already covers GDPR data-portability — confirm

---

## Phase 4 — Auth + Stripe (1.5-2 weeks)

Goal: real accounts, real monetization. Licence array dies here.

**Firebase Auth**
- [ ] Enable Email/Password + Google Sign-In
- [ ] Sign-in screen / modal in app
- [ ] On first sign-in: migrate `device-id` quota counter → `user-id`
- [ ] AI proxy: prefer Firebase ID token from `Authorization` header when present

**Stripe**
- [ ] Stripe account + monthly + annual price IDs
- [ ] Stripe Checkout flow launched from app
- [ ] Cloud Function: Stripe webhook → set `isPro: true` on Firebase user
- [ ] Stripe customer ID stored on Firebase user record

**Pro entitlement**
- [ ] AI proxy reads `isPro` flag → 50/day cap, full model chain
- [ ] Free → 10-job hard cap (already client-side); Pro → unlimited
- [ ] Upgrade prompt: show *both* "out of AI" and "10-job cap" together

**BYO key**
- [ ] Settings toggle: "Use my own Gemini key"
- [ ] When on, client sends user key as header; proxy uses it instead of pooled key
- [ ] BYO mode bypasses quota, full chain available

**Cleanup**
- [ ] Delete `LICENCE_KEYS` array from `index.html`
- [ ] Remove `handleUnlockSuccess` PayPal flow; replace with Stripe Checkout
- [ ] Move `geminiApiKey` from localStorage → IndexedDB (BYO only path)

---

## Phase 5 — Firestore sync + Storage (3-4 weeks)

Goal: multi-device, no more data loss. Offline-first preserved.

**Schema**
- [ ] Firestore collections: `jobs`, `appointments`, `timesheets`, `userTemplates`, `userMaterials`, `businessProfile`
- [ ] Security rules: user can read/write only their own documents

**Sync engine**
- [ ] On first sign-in: push existing IndexedDB data → Firestore
- [ ] IndexedDB stays as offline cache; Firestore is source of truth
- [ ] Last-write-wins conflict resolution
- [ ] Sync runs on connectivity restore; works offline on a job site as today

**Images**
- [ ] Cloud Storage bucket for photos and logos
- [ ] Convert existing base64 IndexedDB images → binary in Storage, store URLs
- [ ] Keep thumbnails in IndexedDB for offline preview

**Performance**
- [ ] Virtualise dashboard job list with `react-window` once >200 jobs is realistic

---

## Phase 6 — Onboarding (1 week)

- [ ] First-run walkthrough
- [ ] Help / FAQ content
- [ ] Sample job pre-loaded for new accounts
- [ ] Upgrade-prompt copy that names *both* friction points (AI + job cap)

---

## Phase 7 — Play Store (1-2 weeks)

- [ ] Domain + DNS (Cloudflare free tier)
- [ ] HTTPS hosting on stable domain (Vercel / Netlify / Firebase Hosting)
- [ ] `/.well-known/assetlinks.json` for Digital Asset Links
- [ ] Generate AAB via Bubblewrap or PWABuilder
- [ ] Google Play Developer account ($25 one-time)
- [ ] App listing: description, ≥2 phone screenshots, ≥1 tablet, 1024×500 feature graphic
- [ ] Data Safety questionnaire — answer honestly (incl. AI prompt forwarding)
- [ ] PEGI/IARC content rating
- [ ] Closed → open → production testing tracks (~2 week window)

---

## Phase 8 — Launch (as needed)

- [ ] Marketing site
- [ ] Status page (UptimeRobot or BetterStack)
- [ ] `support@` email forwarding
- [ ] Verify Firestore backup/restore actually works
- [ ] Play Billing parity for in-Play subs (Cloud Function notification handler)

---

## Cross-cutting / always-on

- [ ] Move active timer from localStorage → IndexedDB
- [ ] Bump model chain constants when Google rotates Gemini versions
- [ ] Watch `index.html` size — revisit Vite/module split when >5,000 lines or onboarding a second dev

---

## Deferred — not v1

Keep in the codebase, don't build out further until paying users ask:

- [ ] iOS App Store (PWA-on-iOS works for now)
- [ ] Team / multi-user accounts
- [ ] Advanced reporting (FY, BAS export)
- [ ] Recurring jobs
- [ ] Voice assistant ("Call JIM")
