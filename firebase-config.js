// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getMessaging } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBN0wDQhL2xZbFwq1gxw8VXeddVG2Gwh34",
  authDomain: "le-libido-mvp.firebaseapp.com",
  projectId: "le-libido-mvp",
  storageBucket: "le-libido-mvp.appspot.com",
  messagingSenderId: "131616941592",
  appId: "1:131616941592:web:e8773a0951f7b86c1a056d",
  measurementId: "G-8C9DXQ4M6T"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const messaging = getMessaging(app);
