import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import log from "https://cdn.skypack.dev/loglevel"; // For logging actions

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUYUbeJ9_LZqzloVrUCd6L2z7AJ1MZ92o",
  authDomain: "student-teacher-booking-2696c.firebaseapp.com",
  projectId: "student-teacher-booking-2696c",
  storageBucket: "student-teacher-booking-2696c.firebasestorage.app",
  messagingSenderId: "344439614149",
  appId: "1:344439614149:web:cef93c56b62b5614821eac",
  measurementId: "G-2NC41R2L2B"
};
// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Track session
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("userEmail").innerText = 
      `You are logged in as: ${user.email}`;
    log.info("Dashboard Loaded for:", user.email);
  } else {
    // If not logged in, kick user back to login page
    window.location.href = "index.html";
  }
});

// Logout function
window.logout = async function () {
  try {
    await signOut(auth);
    log.info("User Logged Out");
    window.location.href = "index.html"; // Redirect after logout
  } catch (error) {
    log.error("Logout Error:", error);
  }
};
