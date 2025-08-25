import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
  getFirestore, collection, getDocs, updateDoc, doc, setDoc, onSnapshot, addDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import log from "https://cdn.skypack.dev/loglevel"; // For logging actions

// Firebase Config
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
const db = getFirestore(app);

log.setLevel("info");

// Protect Page: Only Admin can access
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    log.info("Admin logged in:", user.email);
    loadUsers();
  }
});

// Reference to table body
const usersTable = document.getElementById("usersTable");

// 🔹 Load all users into the table (real-time listener)
function loadUsers() {
  const usersRef = collection(db, "users");
  onSnapshot(usersRef, (snapshot) => {
    usersTable.innerHTML = ""; // clear old rows

    snapshot.forEach((docSnap) => {
      let user = docSnap.data();

      let email = user.email || "N/A";
      let role = user.role || "N/A";
      let status = user.status || "pending";

      let row = `
        <tr>
          <td>${email}</td>
          <td>${role}</td>
          <td><span class="status-${status}">${status}</span></td>
          <td>
            <button class="btn btn-approve" onclick="approveUser('${docSnap.id}')">Approve</button>
            <button class="btn btn-reject" onclick="rejectUser('${docSnap.id}')">Reject</button>
          </td>
        </tr>
      `;
      usersTable.innerHTML += row;
    });
  }, (error) => {
    console.error("Error loading users:", error);
  });
}

// 🔹 Approve a user
window.approveUser = async (userId) => {
  try {
    await updateDoc(doc(db, "users", userId), { status: "approved" });
    console.log("User approved:", userId);
  } catch (err) {
    console.error("Error approving user:", err);
  }
};

// 🔹 Reject a user
window.rejectUser = async (userId) => {
  try {
    await updateDoc(doc(db, "users", userId), { status: "rejected" });
    console.log("User rejected:", userId);
  } catch (err) {
    console.error("Error rejecting user:", err);
  }
};

// 🔹 Add Teacher
window.addTeacher = async () => {
  const name = document.getElementById("teacherName").value;
  const dept = document.getElementById("teacherDept").value;
  const subject = document.getElementById("teacherSubject").value;

  if (!name || !dept || !subject) {
    alert("Please fill all fields before adding a teacher.");
    return;
  }

  try {
    await addDoc(collection(db, "teachers"), {
      name: name,
      department: dept,
      subject: subject,
      createdAt: new Date()
    });
    alert("Teacher added successfully!");
    document.getElementById("teacherName").value = "";
    document.getElementById("teacherDept").value = "";
    document.getElementById("teacherSubject").value = "";
  } catch (err) {
    console.error("Error adding teacher:", err);
  }
};

// 🔹 Logout
window.logout = async () => {
  try {
    await signOut(auth);
    alert("Logged out successfully");
    window.location.href = "index.html";
  } catch (err) {
    console.error("Logout error:", err);
  }
};
