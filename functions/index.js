// Cloudflare Worker — JIM AI Proxy

const GEMINI_BASE = 'https://generativelanguage.googleapis.com';
const FIREBASE_API_KEY = 'AIzaSyC8cLcvakuTxWP652GJ9eRDRW9_rnMVco8'; // public client key

const ALLOWED_ORIGINS = [
  'https://jim-pro-app-6acf6.web.app',
  'https://jim-pro-app-6acf6.firebaseapp.com',
  'http://localhost:5173',
  'http://localhost:4173',
];

const HEAVY_MODELS = ['gemini-2.5-flash-preview-05-20', 'gemini-2.0-flash', 'gemini-1.5-flash'];
const LIGHT_MODELS = ['gemini-2.0-flash-lite', 'gemini-2.0-flash', 'gemini-1.5-flash-8b'];

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
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
      if (res.status === 429 || res.status === 404 || res.status >= 500) {
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

async function verifyProStatus(uid, env) {
  const testers = (env.TESTER_UIDS || '').split(',');
  if (testers.includes(uid)) return true;

  try {
    // Firestore REST API: https://firestore.googleapis.com/v1/projects/{project_id}/databases/(default)/documents/users/{uid}
    const PROJECT_ID = 'jim-pro-app-6acf6';
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/users/${uid}`,
      { headers: { 'Authorization': `Bearer ${env.FIREBASE_TOKEN || ''}` } }
    );
    if (!res.ok) return false;
    const data = await res.json();
    return data.fields?.isPro?.booleanValue === true;
  } catch {
    return false;
  }
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

async function handleAiGenerate(request, env, origin) {
  const authHeader = request.headers.get('Authorization') || '';
  const idToken = authHeader.replace('Bearer ', '');
  if (!idToken) return jsonResponse({ error: 'Missing token' }, 401, origin);

  let uid;
  try { uid = await verifyFirebaseToken(idToken); }
  catch (err) { return jsonResponse({ error: err.message }, err.status || 401, origin); }

  const isPro = await verifyProStatus(uid, env);
  const hasQuota = await checkQuota(uid, env, isPro);
  if (!hasQuota) return jsonResponse({ error: 'Daily quota exceeded' }, 403, origin);

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

  const isPro = await verifyProStatus(uid, env);
  // TODO: Check daily quota if needed
  
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

async function handleStripeWebhook(request, env) {
  const sig = request.headers.get('stripe-signature');
  const body = await request.text();
  
  // Note: For simplicity and to avoid exposing secrets, you should verify the 
  // signature using the Stripe SDK/library in a real environment.
  const event = JSON.parse(body);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const uid = session.client_reference_id; // Pass this in your Stripe checkout link

    if (uid) {
      const PROJECT_ID = 'jim-pro-app-6acf6';
      await fetch(
        `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/users/${uid}?updateMask.fieldPaths=isPro`,
        {
          method: 'PATCH',
          headers: { 
            'Authorization': `Bearer ${env.FIREBASE_TOKEN}`,
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({ fields: { isPro: { booleanValue: true } } })
        }
      );
    }
  }

  return new Response('OK', { status: 200 });
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

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    if (url.pathname === '/aiGenerate')   return handleAiGenerate(request, env, origin);
    if (url.pathname === '/aiUploadFile') return handleAiUploadFile(request, env, origin);

    return new Response('Not Found', { status: 404 });
  },
};
