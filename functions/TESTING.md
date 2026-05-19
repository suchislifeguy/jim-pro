# Local Stripe webhook testing

## One-time setup
1. `stripe login` — links the CLI to your sandbox.
2. Set Worker secrets (only re-run if rotated):
   ```
   npx wrangler secret put FIREBASE_SA_KEY       # service account JSON
   npx wrangler secret put STRIPE_SECRET_KEY     # sk_test_...
   npx wrangler secret put STRIPE_WEBHOOK_SECRET # whsec_... from `stripe listen`
   npx wrangler secret put GEMINI_API_KEY        # shared Gemini key
   ```

## Each dev session (three terminals)

**Terminal 1 — Worker:**
```
cd functions && npm run dev
```
Worker listens on `http://localhost:8787`.

**Terminal 2 — Stripe → Worker tunnel:**
```
cd functions && npm run dev:webhook
```
Prints `whsec_...` — if it changed since last run, `wrangler secret put STRIPE_WEBHOOK_SECRET` again.

**Terminal 3 — Vite app:**
```
npm run dev
```
App on `http://localhost:5173`. `VITE_AI_PROXY_URL` should point at `http://localhost:8787` for local end-to-end.

## Triggering test events

From any terminal:
```
npm run test:checkout       # fakes a checkout.session.completed
npm run test:cancel         # fakes a customer.subscription.deleted
```

Or do a real test purchase: click the upgrade button in the app, use card `4242 4242 4242 4242`, any future expiry, any CVC, any ZIP.

## Verifying

- Worker terminal logs the event and any Firestore write errors.
- Firebase Console → Firestore → `users/{uid}` should show `isPro: true` after checkout, `false` after cancel.
- `curl -H "Authorization: Bearer <idToken>" http://localhost:8787/status` returns current tier.
