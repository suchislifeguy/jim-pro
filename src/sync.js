import { doc, getDoc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { get, set } from 'idb-keyval';
import { db } from './firebase';

const TS_KEY = '_jim_sync_ts';
const ref = (uid, key) => doc(db, 'users', uid, 'data', key);

// Called after every local save — fire-and-forget to Firestore
export async function syncWrite(uid, key, data) {
  const ts = (await get(TS_KEY)) || {};
  ts[key] = Date.now();
  await set(TS_KEY, ts);

  setDoc(ref(uid, key), { payload: data, lastUpdated: serverTimestamp() }).catch(() => {});
}

// Called after local load — pulls Firestore in background, returns map of updated keys
// so the caller can refresh only what changed.
export async function coldStartSync(uid, collections) {
  const updated = {};

  for (const { key, idbKey } of collections) {
    try {
      const snap = await getDoc(ref(uid, key));
      if (!snap.exists()) continue;

      const remote = snap.data();
      const remoteMs = remote.lastUpdated?.toMillis?.() ?? 0;

      // Read timestamp fresh after the async fetch so we don't race with concurrent saves
      const localTs = (await get(TS_KEY)) || {};
      const localMs = localTs[key] ?? 0;

      if (remoteMs > localMs) {
        await set(idbKey, remote.payload);
        localTs[key] = remoteMs;
        await set(TS_KEY, localTs);
        updated[key] = remote.payload;
      }
    } catch {
      // offline or rules not set — local data stands
    }
  }

  return updated;
}

// Called when coming back online — push all local data up
export async function syncAll(uid, collections) {
  for (const { key, idbKey } of collections) {
    try {
      const data = await get(idbKey);
      if (data !== undefined) {
        setDoc(ref(uid, key), { payload: data ?? [], lastUpdated: serverTimestamp() }).catch(() => {});
      }
    } catch {
      // ignore
    }
  }
}

export async function deleteUserDocs(uid, collections) {
  for (const { key } of collections) {
    try {
      await deleteDoc(ref(uid, key));
    } catch {}
  }
  try {
    await deleteDoc(doc(db, 'users', uid));
  } catch {}
}
