***

# JIM — Master Action Plan & Production Readiness

**Mission:** Transition JIM from an incredible single-file prototype into a secure, monetized, MRR-generating SaaS application, without losing its offline-first superpower.
**Tech Stack:** Vite (React/Tailwind) + Firebase (Auth, Firestore, Storage, Functions, Hosting) + Stripe.
**Target Audience:** Solo tradies (offline-tolerant, mobile-heavy, low-tech patience).

---

## The Core Philosophy
1. **Offline is Non-Negotiable:** If there is no 4G, JIM must still save jobs, log timesheets, and generate PDFs instantly.
2. **Dual-Friction Monetization:** Free users are squeezed by two limits: a **10-job cap** (ongoing UI friction) and a **3-AI-call daily cap** (daily capability friction). "JIM Pro" removes both.
3. **Single Vendor Backend:** Firebase handles Auth, Database, Storage, and Cloud Functions. Keep ops overhead near zero.

---

## Phase 1 — Foundation & Visibility (2-3 days)
*Goal: Stop in-browser transpilation, split the monolith into maintainable files, and get crash reporting online.*

- [ ] **Vite Migration:** Run `npm create vite@latest`. Move `index.html` logic into standard React folder structure (`/components`, `/hooks`, `/utils`, `/services`). 
- [ ] **Sentry Integration:** Add the Sentry browser SDK (free tier) to catch uncaught exceptions and promise rejections with full stack traces.
- [ ] **CI/CD Pipeline:** Set up GitHub Actions to auto-deploy to Firebase Hosting on `main` branch merges.
- [ ] **Lockdown:** Add strict Content Security Policy (`<meta http-equiv="Content-Security-Policy">`).
- [ ] **Unit Tests:** Write tests for the high-risk math: `parseTimeToMinutes`, `getQuoteTotals`, and currency formatting.

---

## Phase 2 — Auth & The Offline-First Sync Engine (1.5 - 2 weeks)
*Goal: Real accounts, zero data loss, and seamless offline-to-cloud syncing. This must happen before we touch the AI.*

**Auth & Identity**
- [ ] Create Firebase project (Blaze plan). Enable Firebase Auth (Email/Password + Google Sign-In).
- [ ] Build Sign-In / Register modals. 

**Firestore Sync (The Magic Cache)**
- [ ] Initialize Firestore with `persistentLocalCache()`. This natively replaces your `idb-keyval` code for text/data. Reads/writes apply instantly to the local cache and sync in the background when 4G returns.
- [ ] Write Firestore Security Rules: `allow read, write: if request.auth != null && request.auth.uid == userId;`
- [ ] **Migration Script:** On a user's first login, silently read their old `idb-keyval` data and push it into their new Firestore account.

**The Offline Image Queue (Crucial)**
*Firestore caches text offline, but Cloud Storage does not cache files offline. We must handle this.*
- [ ] Provision Firebase Cloud Storage.
- [ ] Write the Image Queue: When saving a task *offline*, save compressed base64 images to local IndexedDB. Show the local image in the UI.
- [ ] Write the Sync Worker: Listen for `window.addEventListener('online')`. When internet returns, iterate through IndexedDB, upload base64 images to Cloud Storage, update the Firestore document with the new `https://` URLs, and delete the local base64 data.

---

## Phase 3 — The AI Proxy & Quotas (1 week)
*Goal: Safely provide AI to non-techies, protect your API budget, and enforce the 3-call free limit.*

**Backend Proxy (Cloud Functions)**
- [ ] Store Gemini API key safely in Google Cloud Secret Manager.
- [ ] Create Cloud Function `POST /ai/generate`. It reads the Firebase Auth token to identify the user.
-[ ] Server-side model routing: Heavy tasks (quotes, OCR) hit better models; light tasks (chat) hit fast models. Return first success. Never log prompt bodies (PII).
- [ ] IP Rate limiting (~30 req / IP / hour) to stop scripted abuse.

**Quota Enforcement**
- [ ] Cloud Function checks/increments a `quotas/{userId}` daily counter in Firestore.
- [ ] If user `isPro == false` and counter > 3, reject with `{ error: "quota_exceeded", resetAt }`.

**Client Wiring**
- [ ] Re-point `smartFetchAI` to the new Cloud Function. 
- [ ] Delete all inline Gemini API calls from the client.
- [ ] Add the "Use my own Gemini key" toggle in Settings (bypasses Firebase quotas, bills their own Google account directly).

---

## Phase 4 — Monetization & Compliance (1.5 weeks)
*Goal: Take payments, upgrade accounts, and ensure legal compliance.*

**Stripe Integration**
- [ ] Create Stripe account. Create Monthly ($X) and Annual ($Y) subscription products.
- [ ] Implement Stripe Checkout (via Firebase Stripe Extension or custom Cloud Function).
- [ ] Stripe Webhook: When a subscription succeeds, set `isPro: true` on the Firebase User document.
- [ ] Delete the hardcoded `LICENCE_KEYS` array from the frontend.
- [ ] Update AI Proxy to read the `isPro` flag (grants 50 AI calls/day and unlocks premium models).
- [ ] Implement the **10-job client-side hard cap** for free users. 

**Legal & Compliance**
- [ ] **Privacy Policy & ToS:** Generate via Iubenda/Termly. Explicitly state AI prompt forwarding to Google and fair-use AI clauses.
- [ ] **Account Deletion:** Build a Cloud Function to wipe a user's Auth, Firestore docs, and Storage bucket (Mandatory for Google Play).
- [ ] **AU Tax Compliance:** Verify printed PDFs against ATO checklist (ABN, "Tax Invoice", GST breakdown).

---

## Phase 5 — Play Store Distribution (1-2 weeks)
*Goal: Get the wrapped PWA into the Google Play Store.*

- [ ] **Domain Setup:** Connect custom domain to Firebase Hosting (e.g., `app.jim.com`).
- [ ] **Digital Asset Links:** Host `/.well-known/assetlinks.json` to prove ownership of the app to Google.
- [ ] **TWA Generation:** Use Bubblewrap CLI or PWABuilder to wrap the PWA into a Trusted Web Activity (AAB format).
- [ ] **Play Console:** Pay $25 dev fee. Fill out Data Safety Questionnaire honestly (Auth + AI data forwarding).
- [ ] **Assets:** Upload 1024x500 feature graphic, phone/tablet screenshots.
- [ ] **Testing Tracks:** Push through Closed Testing → Open Testing → Production.

---

## Phase 6 — Deferred (Do Not Build for v1.0)
*Keep scope tight. Build these only when paying users request them.*

1. **iOS App Store Submission:** PWA-on-iOS works fine. Apple's review process for wrapped PWAs is notoriously hostile. Deal with iOS via Safari "Add to Homescreen" for v1.
2. **Play Billing API:** Rely on Stripe (web checkout) first to avoid Google's 15% cut and complex integration.
3. **Team / Multi-user Accounts:** Focus entirely on the solo-tradie persona. 
4. **Advanced Financial Reporting:** (FY, BAS exports). Out of scope; the CSV timesheet export is enough for MVP.
5. **Recurring Jobs / Reminders:** Keep scheduling basic for now. 

---

### Final Check Before Starting Phase 1
Save a copy of your 3,300-line `index.html` in a safe folder. It is your ultimate reference architecture. 

**Next step:** Open your terminal, run `npm create vite@latest jim-app -- --template react`, and let the build begin.
