// Cloudflare Worker — JIM AI Proxy

const GEMINI_BASE = 'https://generativelanguage.googleapis.com';
const FIREBASE_API_KEY = 'AIzaSyC8cLcvakuTxWP652GJ9eRDRW9_rnMVco8'; // public client key

const ALLOWED_ORIGINS = [
  'https://jim-pro-app-6acf6.web.app',
  'https://jim-pro-app-6acf6.firebaseapp.com',
  'http://localhost:5173',
  'http://localhost:4173',
];

const HEAVY_MODELS = ['gemini-3.5-flash', 'gemini-3.0-flash', 'gemini-2.5-flash'];
const LIGHT_MODELS = ['gemini-3.1-flash-lite', 'gemini-3.0-flash-lite', 'gemini-3.0-flash'];

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type, X-File-Size, X-User-Api-Key',
    'Access-Control-Max-Age': '3600',
  };
}

function jsonResponse(data, status = 200, origin = '') {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  });
}

function base64UrlEncode(input) {
  const bytes = typeof input === 'string' ? new TextEncoder().encode(input) : new Uint8Array(input);
  let str = '';
  for (let i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i]);
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function pemToArrayBuffer(pem) {
  const b64 = pem
    .replace(/-----BEGIN [A-Z ]+-----/g, '')
    .replace(/-----END [A-Z ]+-----/g, '')
    .replace(/\s+/g, '');
  const bin = atob(b64);
  const buf = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
  return buf.buffer;
}

let _cachedToken = null; // in-memory cache within a single isolate

async function getFirestoreAccessToken(env) {
  const now = Math.floor(Date.now() / 1000);
  if (_cachedToken && _cachedToken.exp > now + 60) return _cachedToken.token;

  const cached = await env.QUOTA_KV.get('sa_access_token', { type: 'json' });
  if (cached && cached.exp > now + 60) {
    _cachedToken = cached;
    return cached.token;
  }

  if (!env.FIREBASE_SA_KEY) throw new Error('FIREBASE_SA_KEY secret not set');
  const sa = JSON.parse(env.FIREBASE_SA_KEY);

  const header = { alg: 'RS256', typ: 'JWT' };
  const claims = {
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/datastore',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  };
  const signingInput = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(claims))}`;

  const keyData = pemToArrayBuffer(sa.private_key);
  const key = await crypto.subtle.importKey(
    'pkcs8',
    keyData,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(signingInput));
  const jwt = `${signingInput}.${base64UrlEncode(sig)}`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${encodeURIComponent(jwt)}`,
  });
  if (!tokenRes.ok) {
    throw new Error(`OAuth2 token exchange failed: ${tokenRes.status} ${await tokenRes.text()}`);
  }
  const { access_token, expires_in } = await tokenRes.json();
  const entry = { token: access_token, exp: now + (expires_in || 3600) - 60 };
  _cachedToken = entry;
  await env.QUOTA_KV.put('sa_access_token', JSON.stringify(entry), { expirationTtl: expires_in || 3600 });
  return access_token;
}

async function verifyFirebaseToken(idToken) {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    }
  );
  if (!res.ok) throw Object.assign(new Error('Invalid token'), { status: 401 });
  const data = await res.json();
  const uid = data.users?.[0]?.localId;
  if (!uid) throw Object.assign(new Error('User not found'), { status: 401 });
  return uid;
}

function buildModelList(taskType, hint) {
  const base = taskType === 'heavy' ? [...HEAVY_MODELS] : [...LIGHT_MODELS];
  if (hint) return [...new Set([hint, ...base])];
  return base;
}

async function cascadeGenerate(models, body, apiKey) {
  let lastErr;
  for (const model of models) {
    try {
      const res = await fetch(
        `${GEMINI_BASE}/v1beta/models/${model}:generateContent?key=${apiKey}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
      );
      if (res.ok) return await res.json();
      const errText = await res.text();
      if (res.status === 429 || res.status === 404 || res.status === 400 || res.status >= 500) {
        lastErr = new Error(`[${model}] ${res.status}`);
        continue;
      }
      const err = new Error(`[${model}] ${res.status}: ${errText}`);
      err.geminiStatus = res.status;
      throw err;
    } catch (err) {
      if (err.geminiStatus !== undefined) throw err;
      lastErr = err;
    }
  }
  const err = lastErr || new Error('All models failed');
  err.cascadeExhausted = true;
  throw err;
}

async function getUserAccess(uid, env) {
  const testers = (env.TESTER_UIDS || '').split(',').map(s => s.trim()).filter(Boolean);
  const isTester = testers.includes(uid);

  let isPro = false;
  let createdAtMs = null;
  try {
    const PROJECT_ID = 'jim-pro-app-6acf6';
    const token = await getFirestoreAccessToken(env);
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/users/${uid}`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    if (res.ok) {
      const data = await res.json();
      isPro = data.fields?.isPro?.booleanValue === true;
      const ts = data.fields?.createdAt?.timestampValue;
      if (ts) createdAtMs = Date.parse(ts);
    }
  } catch (err) {
    console.error('getUserAccess failed:', err.message);
  }
  return { isPro, isTester, createdAtMs };
}

async function checkQuota(uid, env, isPro) {
  if (isPro) return true;

  const date = new Date().toISOString().split('T')[0];
  const key = `quota:${uid}:${date}`;
  const count = parseInt(await env.QUOTA_KV.get(key) || '0', 10);

  if (count >= 5) return false;

  await env.QUOTA_KV.put(key, (count + 1).toString(), { expirationTtl: 86400 });
  return true;
}

async function handleStatus(request, env, origin) {
  const authHeader = request.headers.get('Authorization') || '';
  const idToken = authHeader.replace('Bearer ', '');
  if (!idToken) return jsonResponse({ error: 'Missing token' }, 401, origin);

  let uid;
  try { uid = await verifyFirebaseToken(idToken); }
  catch (err) { return jsonResponse({ error: err.message }, err.status || 401, origin); }

  const { isPro, isTester, createdAtMs } = await getUserAccess(uid, env);

  if (isTester) {
    return jsonResponse({ tier: 'tester', quotaUsed: 0, quotaLimit: null, aiTrialActive: true }, 200, origin);
  }

  const date = new Date().toISOString().split('T')[0];
  const key = `quota:${uid}:${date}`;
  const quotaUsed = parseInt(await env.QUOTA_KV.get(key) || '0', 10);
  const quotaLimit = isPro ? 50 : 5;

  let aiTrialActive = true;
  let aiTrialDaysLeft = null;
  if (!isPro && createdAtMs) {
    const ageDays = (Date.now() - createdAtMs) / 86400000;
    aiTrialActive = ageDays <= 30;
    aiTrialDaysLeft = Math.max(0, Math.ceil(30 - ageDays));
  }

  return jsonResponse({
    tier: isPro ? 'pro' : 'free',
    quotaUsed,
    quotaLimit,
    aiTrialActive,
    aiTrialDaysLeft,
  }, 200, origin);
}

async function handleAiGenerate(request, env, origin) {
  const authHeader = request.headers.get('Authorization') || '';
  const idToken = authHeader.replace('Bearer ', '');
  if (!idToken) return jsonResponse({ error: 'Missing token' }, 401, origin);

  let uid;
  try { uid = await verifyFirebaseToken(idToken); }
  catch (err) { return jsonResponse({ error: err.message }, err.status || 401, origin); }

  const { isPro, isTester, createdAtMs } = await getUserAccess(uid, env);
  const effectivelyPro = isPro || isTester;

  // Free tier: AI available only during first 30 days from account creation.
  if (!effectivelyPro && createdAtMs) {
    const ageDays = (Date.now() - createdAtMs) / 86400000;
    if (ageDays > 30) {
      return jsonResponse({
        error: 'AI trial ended — upgrade to Pro for unlimited AI',
        code: 'AI_TRIAL_EXPIRED',
      }, 402, origin);
    }
  }

  const hasQuota = await checkQuota(uid, env, effectivelyPro);
  if (!hasQuota) return jsonResponse({ error: 'Daily quota exceeded', code: 'QUOTA_EXCEEDED' }, 403, origin);

  let body;
  try { body = await request.json(); }
  catch { return jsonResponse({ error: 'Invalid JSON' }, 400, origin); }

  const { taskType, contents, generationConfig, userModelHint, userApiKey } = body;
  if (!contents || !Array.isArray(contents)) {
    return jsonResponse({ error: 'Missing contents array' }, 400, origin);
  }

  const models = buildModelList(taskType || 'light', userModelHint || null);
  const apiKey = (userApiKey && userApiKey.length > 10) ? userApiKey : env.GEMINI_API_KEY;

  try {
    const data = await cascadeGenerate(
      models,
      { contents, generationConfig: generationConfig || {} },
      apiKey
    );
    return jsonResponse(data, 200, origin);
  } catch (err) {
    if (err.cascadeExhausted) {
      return jsonResponse({ error: 'AI overloaded — try again shortly', code: 'GEMINI_OVERLOADED' }, 503, origin);
    }
    return jsonResponse({ error: `AI request failed: ${err.message}`, code: 'GEMINI_ERROR' }, 502, origin);
  }
}

async function handleAiUploadFile(request, env, origin) {
  const authHeader = request.headers.get('Authorization') || '';
  const idToken = authHeader.replace('Bearer ', '');
  if (!idToken) return jsonResponse({ error: 'Missing token' }, 401, origin);

  let uid;
  try { uid = await verifyFirebaseToken(idToken); }
  catch (err) { return jsonResponse({ error: err.message }, err.status || 401, origin); }

  const { isPro, isTester, createdAtMs } = await getUserAccess(uid, env);
  const effectivelyPro = isPro || isTester;
  if (!effectivelyPro && createdAtMs && (Date.now() - createdAtMs) / 86400000 > 30) {
    return jsonResponse({ error: 'AI trial ended — upgrade to Pro', code: 'AI_TRIAL_EXPIRED' }, 402, origin);
  }
  
  const contentType = request.headers.get('Content-Type') || 'application/octet-stream';
  const fileSize = request.headers.get('X-File-Size') || '0';
  const userApiKey = request.headers.get('X-User-Api-Key') || null;
  const apiKey = (userApiKey && userApiKey.length > 10) ? userApiKey : env.GEMINI_API_KEY;
  const body = await request.arrayBuffer();

  try {
    const uploadRes = await fetch(`${GEMINI_BASE}/upload/v1beta/files?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'X-Goog-Upload-Protocol': 'raw',
        'X-Goog-Upload-Header-Content-Length': fileSize,
        'X-Goog-Upload-Header-Content-Type': contentType,
        'Content-Type': contentType,
      },
      body,
    });
    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      return jsonResponse({ error: `Gemini upload failed: ${errText}` }, 502, origin);
    }
    return jsonResponse(await uploadRes.json(), 200, origin);
  } catch (err) {
    return jsonResponse({ error: `Upload error: ${err.message}` }, 502, origin);
  }
}

async function verifyStripeSignature(rawBody, sigHeader, secret, toleranceSec = 300) {
  if (!sigHeader || !secret) return false;
  const parts = Object.fromEntries(
    sigHeader.split(',').map(kv => {
      const i = kv.indexOf('=');
      return [kv.slice(0, i).trim(), kv.slice(i + 1).trim()];
    })
  );
  const timestamp = parts.t;
  const v1 = parts.v1;
  if (!timestamp || !v1) return false;

  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - parseInt(timestamp, 10)) > toleranceSec) return false;

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sigBuf = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(`${timestamp}.${rawBody}`)
  );
  const computed = Array.from(new Uint8Array(sigBuf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  // constant-time compare
  if (computed.length !== v1.length) return false;
  let diff = 0;
  for (let i = 0; i < computed.length; i++) diff |= computed.charCodeAt(i) ^ v1.charCodeAt(i);
  return diff === 0;
}

async function handleStripeWebhook(request, env) {
  const sig = request.headers.get('stripe-signature');
  const body = await request.text();

  const ok = await verifyStripeSignature(body, sig, env.STRIPE_WEBHOOK_SECRET);
  if (!ok) {
    console.error('Stripe signature verification failed');
    return new Response('Invalid signature', { status: 400 });
  }

  let event;
  try { event = JSON.parse(body); }
  catch { return new Response('Invalid JSON', { status: 400 }); }

  const PROJECT_ID = 'jim-pro-app-6acf6';
  const token = await getFirestoreAccessToken(env);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const uid = session.client_reference_id;
    if (!uid) {
      console.error('checkout.session.completed missing client_reference_id');
      return new Response('OK', { status: 200 });
    }
    const fields = {
      isPro: { booleanValue: true },
      stripeCustomerId: { stringValue: session.customer || '' },
      stripeSubscriptionId: { stringValue: session.subscription || '' },
      proSince: { timestampValue: new Date().toISOString() },
    };
    const mask = 'updateMask.fieldPaths=isPro&updateMask.fieldPaths=stripeCustomerId&updateMask.fieldPaths=stripeSubscriptionId&updateMask.fieldPaths=proSince';
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/users/${uid}?${mask}`,
      {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields }),
      }
    );
    if (!res.ok) console.error('isPro:true write failed:', res.status, await res.text());
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object;
    const customerId = sub.customer;
    if (!customerId) return new Response('OK', { status: 200 });

    // Query users where stripeCustomerId == customerId
    const queryRes = await fetch(
      `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents:runQuery`,
      {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          structuredQuery: {
            from: [{ collectionId: 'users' }],
            where: {
              fieldFilter: {
                field: { fieldPath: 'stripeCustomerId' },
                op: 'EQUAL',
                value: { stringValue: customerId },
              },
            },
            limit: 1,
          },
        }),
      }
    );
    if (!queryRes.ok) {
      console.error('Customer lookup failed:', queryRes.status, await queryRes.text());
      return new Response('OK', { status: 200 });
    }
    const rows = await queryRes.json();
    const docName = rows?.[0]?.document?.name;
    if (!docName) {
      console.error('No user found for stripeCustomerId', customerId);
      return new Response('OK', { status: 200 });
    }
    const patchRes = await fetch(
      `https://firestore.googleapis.com/v1/${docName}?updateMask.fieldPaths=isPro&updateMask.fieldPaths=proEndedAt`,
      {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: {
            isPro: { booleanValue: false },
            proEndedAt: { timestampValue: new Date().toISOString() },
          },
        }),
      }
    );
    if (!patchRes.ok) console.error('isPro:false write failed:', patchRes.status, await patchRes.text());
  }

  return new Response('OK', { status: 200 });
}

async function stripeApi(path, env, formBody) {
  const res = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBody,
  });
  const data = await res.json();
  if (!res.ok) throw Object.assign(new Error(data?.error?.message || 'Stripe API error'), { status: res.status, data });
  return data;
}

async function readUserDoc(uid, env) {
  const PROJECT_ID = 'jim-pro-app-6acf6';
  const token = await getFirestoreAccessToken(env);
  const res = await fetch(
    `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/users/${uid}`,
    { headers: { 'Authorization': `Bearer ${token}` } }
  );
  if (!res.ok) return null;
  return await res.json();
}

async function handleBillingPortal(request, env, origin) {
  const idToken = (request.headers.get('Authorization') || '').replace('Bearer ', '');
  if (!idToken) return jsonResponse({ error: 'Missing token' }, 401, origin);

  let uid;
  try { uid = await verifyFirebaseToken(idToken); }
  catch (err) { return jsonResponse({ error: err.message }, err.status || 401, origin); }

  const doc = await readUserDoc(uid, env);
  const customerId = doc?.fields?.stripeCustomerId?.stringValue;
  if (!customerId) return jsonResponse({ error: 'No active subscription found' }, 404, origin);

  let body;
  try { body = await request.json(); } catch { body = {}; }
  const returnUrl = body.returnUrl || 'https://jim-pro-app-6acf6.web.app';

  try {
    const session = await stripeApi(
      'billing_portal/sessions',
      env,
      `customer=${encodeURIComponent(customerId)}&return_url=${encodeURIComponent(returnUrl)}`
    );
    return jsonResponse({ url: session.url }, 200, origin);
  } catch (err) {
    return jsonResponse({ error: err.message }, err.status || 502, origin);
  }
}

async function handleCreateCheckout(request, env, origin) {
  const idToken = (request.headers.get('Authorization') || '').replace('Bearer ', '');
  if (!idToken) return jsonResponse({ error: 'Missing token' }, 401, origin);

  let uid;
  try { uid = await verifyFirebaseToken(idToken); }
  catch (err) { return jsonResponse({ error: err.message }, err.status || 401, origin); }

  let body;
  try { body = await request.json(); } catch { body = {}; }
  const { priceId, successUrl, cancelUrl } = body;
  if (!priceId) return jsonResponse({ error: 'Missing priceId' }, 400, origin);

  const params = new URLSearchParams();
  params.append('mode', 'subscription');
  params.append('client_reference_id', uid);
  params.append('line_items[0][price]', priceId);
  params.append('line_items[0][quantity]', '1');
  params.append('success_url', successUrl || 'https://jim-pro-app-6acf6.web.app?pro=success');
  params.append('cancel_url', cancelUrl || 'https://jim-pro-app-6acf6.web.app?pro=cancel');
  params.append('allow_promotion_codes', 'true');

  // Reuse existing Stripe customer if present (avoids duplicate customer rows)
  const doc = await readUserDoc(uid, env);
  const existingCustomer = doc?.fields?.stripeCustomerId?.stringValue;
  if (existingCustomer) params.append('customer', existingCustomer);

  try {
    const session = await stripeApi('checkout/sessions', env, params.toString());
    return jsonResponse({ url: session.url, id: session.id }, 200, origin);
  } catch (err) {
    return jsonResponse({ error: err.message }, err.status || 502, origin);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (url.pathname === '/stripeWebhook' && request.method === 'POST') {
      return handleStripeWebhook(request, env);
    }

    if (url.pathname === '/status' && request.method === 'GET') {
      return handleStatus(request, env, origin);
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    if (url.pathname === '/aiGenerate')   return handleAiGenerate(request, env, origin);
    if (url.pathname === '/aiUploadFile') return handleAiUploadFile(request, env, origin);
    if (url.pathname === '/billingPortal')  return handleBillingPortal(request, env, origin);
    if (url.pathname === '/createCheckout') return handleCreateCheckout(request, env, origin);

    return new Response('Not Found', { status: 404 });
  },
};
