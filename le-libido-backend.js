<!-- libido-backend.js -->
<script type="module">
  import { db, auth } from './firebase-config.js';
  import {
    collection, doc, setDoc, serverTimestamp, query, where,
    getCountFromServer, addDoc
  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

  // ----- Archetype → color map (keep in sync with your quiz)
  export const archetypeToColor = (title) => {
    const blue = new Set(["Tender Protector","Devoted Darling","Mood Multiplier","Heatwave"]);
    const green = new Set(["Promiscuous Plaything","Generous Giver","Bedroom Adventurer","Charmer in Charge"]);
    const red = new Set(["Dungeon Master","Provoker","Punish Me","Claimed & Trained"]);
    if (blue.has(title)) return "blue";
    if (green.has(title)) return "green";
    if (red.has(title)) return "red";
    // fallback from slug styles
    const t = (title||"").toLowerCase();
    if (/tender|devoted|mood|heat/.test(t)) return "blue";
    if (/promiscu|giver|adventurer|charmer/.test(t)) return "green";
    if (/dungeon|provoker|punish|claimed/.test(t)) return "red";
    return null;
  };

  export const toSlug = (name) =>
    name === "Claimed & Trained"
      ? "claimed_and_trained"
      : (name||"").toLowerCase().replace(/[^a-z0-9]+/g, "_");

  export const todayStr = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  };

  // ----- Save profile (verified or anonymous)
  export async function saveProfileToFirestore(mode, data) {
    const user = auth.currentUser;
    if (!user) throw new Error("Not signed in");
    const ref = doc(db, "users", user.uid, "profiles", mode);
    const payload = {
      mode,
      ...data,
      updatedAt: serverTimestamp(),
      createdAt: data?.createdAt || serverTimestamp(),
      uid: user.uid
    };
    await setDoc(ref, payload, { merge: true });
    return payload;
  }

  // ----- Record a check-in (called when matching door opens)
  export async function recordCheckIn({ color, areaId }) {
    const user = auth.currentUser;
    if (!user) throw new Error("Not signed in");
    const payload = {
      uid: user.uid,
      date: todayStr(),
      color,
      areaId,
      createdAt: serverTimestamp()
    };
    await addDoc(collection(db, "checkins"), payload);
    return payload;
  }

  // ----- Count today’s check-ins for color across selected areas
  export async function getTodayGuestCount(color, areaIds) {
    // Firestore supports up to 10 values in an 'in' operator; if you have more, split.
    const areas = Array.isArray(areaIds) && areaIds.length ? areaIds.slice(0, 10) : ["central-nj"];
    const date = todayStr();
    let total = 0;

    // Sum counts per area (simpler & avoids composite index issues)
    for (const areaId of areas) {
      const q = query(
        collection(db, "checkins"),
        where("date", "==", date),
        where("color", "==", color),
        where("areaId", "==", areaId)
      );
      const snap = await getCountFromServer(q);
      total += snap.data().count || 0;
    }
    return total;
  }

  // Make available to other modules loaded after this <script>
  window.LibidoBackend = { archetypeToColor, toSlug, todayStr, saveProfileToFirestore, recordCheckIn, getTodayGuestCount };
</script>
