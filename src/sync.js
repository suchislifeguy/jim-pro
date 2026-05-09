import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
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

// Called on login — pull Firestore if it's newer than local
export async function coldStartSync(uid, collections) {
  const localTs = (await get(TS_KEY)) || {};

  for (const { key, idbKey } of collections) {
    try {
      const snap = await getDoc(ref(uid, key));
      if (!snap.exists()) continue;

      const remote = snap.data();
      const remoteMs = remote.lastUpdated?.toMillis?.() ?? 0;
      const localMs = localTs[key] ?? 0;

      if (remoteMs > localMs) {
        await set(idbKey, remote.payload);
        localTs[key] = remoteMs;
      }
    } catch {
      // offline or error — local data stands
    }
  }

  await set(TS_KEY, localTs);
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
