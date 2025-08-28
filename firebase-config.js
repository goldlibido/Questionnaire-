// firebase-config.js  (ES module, no bundler needed)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase }   from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
// Optional analytics (requires https + measurementId)
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyBN0wDQhL2xZbFwq1gxw8VXeddVG2Gwh34",
  authDomain: "le-libido-mvp.firebaseapp.com",
  databaseURL: "https://le-libido-mvp-default-rtdb.firebaseio.com",
  projectId: "le-libido-mvp",
  storageBucket: "le-libido-mvp.firebasestorage.app",
  messagingSenderId: "131616941592",
  appId: "1:131616941592:web:e8773a0951f7b86c1a056d",
  measurementId: "G-8C9DXQ4M6T"
};

export const app = initializeApp(firebaseConfig);
export const db  = getDatabase(app);
// export const analytics = getAnalytics(app); // optional
