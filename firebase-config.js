// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getMessaging } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js"; // ⬅️ add this

const firebaseConfig = {
  apiKey: window.env.VITE_API_KEY,
  authDomain: window.env.VITE_AUTH_DOMAIN,
  projectId: window.env.VITE_PROJECT_ID,
  storageBucket: window.env.VITE_STORAGE_BUCKET,
  messagingSenderId: window.env.VITE_MESSAGING_SENDER_ID,
  appId: window.env.VITE_APP_ID,
  measurementId: window.env.VITE_MEASUREMENT_ID
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const messaging = getMessaging(app);
export const storage = getStorage(app); // ⬅️ add this