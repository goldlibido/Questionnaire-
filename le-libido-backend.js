// le-libido-backend.js  (ES module – do NOT wrap in <script> tags)
import { db, auth, storage } from './firebase-config.js';
import {
  collection, doc, setDoc, serverTimestamp,
  query, where, getCountFromServer
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  ref as storageRef, uploadBytesResumable,
  getDownloadURL, deleteObject
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

/* ---------- Archetype helpers ---------- */
export const archetypeToColor = (title) => {
  const blue  = new Set(["Tender Protector","Devoted Darling","Mood Multiplier","Heatwave"]);
  const green = new Set(["Promiscuous Plaything","Generous Giver","Bedroom Adventurer","Charmer in Charge"]);
  const red   = new Set(["Dungeon Master","Provoker","Punish Me","Claimed & Trained"]);
  if (blue.has(title))  return "blue";
  if (green.has(title)) return "green";
  if (red.has(title))   return "red";
  const t=(title||"").toLowerCase();
  if (/tender|devoted|mood|heat/.test(t)) return "blue";
  if (/promiscu|giver|adventurer|charmer/.test(t)) return "green";
  if (/dungeon|provoker|punish|claimed/.test(t))   return "red";
  return null;
};

export const toSlug = (name) =>
  name === "Claimed & Trained"
    ? "claimed_and_trained"
    : (name||"").toLowerCase().replace(/[^a-z0-9]+/g,"_");

/* ---------- Firestore: profiles at /profiles/{uid} ---------- */
/**
 * mode: "verified" | "anonymous"
 * data: profile fields (include photoURLs if available)
 * Structure:
 *   /profiles/{uid} {
 *     currentMode, archetypeColor, archetypeTitle, archetypeSlug, photoURLs, updatedAt, uid,
 *     verified:  {...},  // when mode === "verified"
 *     anonymous: {...}   // when mode === "anonymous"
 *   }
 */
export async function saveProfileToFirestore(mode, data){
  const user = auth.currentUser;
  if (!user) throw new Error("Not signed in");
  const ref = doc(db, "profiles", user.uid);

  const mirror = {
    currentMode: mode,
    archetypeColor: data.archetypeColor || null,
    archetypeTitle: data.archetypeTitle || null,
    archetypeSlug: data.archetypeSlug || null,
    photoURLs: Array.isArray(data.photoURLs) ? data.photoURLs : [],
    updatedAt: serverTimestamp(),
    uid: user.uid
  };

  const payload = {
    [mode]: { ...data, updatedAt: serverTimestamp(), uid: user.uid },
    ...mirror
  };

  await setDoc(ref, payload, { merge: true });
  return payload;
}

/* ---------- Lifetime counts by color (guest list threshold) ---------- */
export async function getProfileCountByColor(color){
  const q = query(collection(db, "profiles"), where("archetypeColor", "==", color));
  const snap = await getCountFromServer(q);
  return snap.data().count || 0;
}

/* ---------- Firebase Storage: upload & delete profile photos ---------- */
export async function uploadProfilePhoto({ file, mode, slot }){
  const user = auth.currentUser;
  if (!user) throw new Error("Not signed in");

  const extRaw = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g,'') || 'jpg';
  const safeExt = ['jpg','jpeg','png','webp','gif','heic','heif','bmp','tif','tiff'].includes(extRaw) ? extRaw : 'jpg';

  const path = `users/${user.uid}/photos/${mode}/${String(slot)}.${safeExt}`;
  const ref = storageRef(storage, path);
  const task = uploadBytesResumable(ref, file, { contentType: file.type || `image/${safeExt}` });

  await new Promise((resolve, reject) => task.on('state_changed', null, reject, resolve));
  const url = await getDownloadURL(ref);
  return { url, path };
}

export async function deleteProfilePhoto(path){
  if (!path) return;
  try { await deleteObject(storageRef(storage, path)); } catch(e){ /* ignore */ }
}

/* ---------- Optional utilities ---------- */
export const todayStr = () => {
  const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
};

/* ---------- Expose to window for inline pages ---------- */
window.LibidoBackend = {
  archetypeToColor, toSlug, saveProfileToFirestore,
  getProfileCountByColor, uploadProfilePhoto, deleteProfilePhoto, todayStr
};
