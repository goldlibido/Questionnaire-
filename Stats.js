// stats.js
import { db } from './firebase-config.js';
import {
  ref, set, runTransaction, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

// Use your PeerJS id if you like; otherwise per-session
export function getUserId() {
  if (window.myPeerId) return window.myPeerId;
  if (!window.__anonId) window.__anonId = 'anon-' + Math.random().toString(36).slice(2);
  return window.__anonId;
}

function inc(path) {
  return runTransaction(ref(db, path), (cur) => (cur || 0) + 1);
}

function safeKey(s) {
  return String(s).replace(/[.#$[\]]/g, '_');
}

// === Public APIs ===

// Door clicked
export function recordDoorClick(doorId) {
  inc(`stats/doors/${safeKey(doorId)}/clicks`);
  const uid = getUserId();
  set(ref(db, `users/${uid}/doors/${safeKey(doorId)}`), { lastClickedAt: serverTimestamp() });
}

// Venue visit
export function recordVenueVisit(venueId) {
  inc(`stats/venues/${safeKey(venueId)}/visits`);
  const uid = getUserId();
  set(ref(db, `users/${uid}/venues/${safeKey(venueId)}/visitedAt`), serverTimestamp());
}

// RSVP (optionally per event)
export function recordRSVP(venueId, eventId) {
  inc(`stats/venues/${safeKey(venueId)}/rsvps`);
  const uid = getUserId();
  if (eventId) set(ref(db, `events/${safeKey(eventId)}/rsvps/${uid}`), true);
  set(ref(db, `users/${uid}/rsvps/${safeKey(eventId || venueId)}`), {
    venueId: venueId || null,
    at: serverTimestamp()
  });
}

// Quiz answer (per-user + aggregate)
export function saveQuizAnswer(questionId, answerValue) {
  const uid = getUserId();
  set(ref(db, `users/${uid}/quiz/${safeKey(questionId)}`), {
    answer: answerValue,
    at: serverTimestamp()
  });
  inc(`stats/quiz/${safeKey(questionId)}/answers/${safeKey(answerValue)}/count`);
}
