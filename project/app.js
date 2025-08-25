import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
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
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

log.setLevel("info");
log.info("Firebase Initialized Successfully");

// Function: Register
window.register = async function () {
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const role = document.getElementById("registerRole").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store role in Firestore
    await setDoc(doc(db, "users", user.uid), {
    email: email,
    role: role,
    status: "pending"   // default until approved
    });

    document.getElementById("message").innerText = "✅ Registered Successfully!";
    log.info(`User Registered: ${email} as ${role}`);
  } catch (error) {
    document.getElementById("message").innerText = "❌ " + error.message;
    log.error("Registration Error:", error);
  }
};

// Function: Login
window.login = async function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Fetch role from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const role = userDoc.data().role;
      log.info("User Role:", role);

      // Redirect based on role
      if (role === "admin") {
        window.location.href = "admin-dashboard.html";
      } else if (role === "teacher") {
        window.location.href = "teacher-dashboard.html";
      } else {
        window.location.href = "student-dashboard.html";
      }
    }
  } catch (error) {
    document.getElementById("message").innerText = "❌ " + error.message;
    log.error("Login Error:", error);
  }
};

// Function: Logout
window.logout = async function () {
  try {
    await signOut(auth);
    document.getElementById("message").innerText = "✅ Logged Out!";
    log.info("User Logged Out");
  } catch (error) {
    document.getElementById("message").innerText = "❌ " + error.message;
    log.error("Logout Error:", error);
  }
};


