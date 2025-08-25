import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
  getFirestore, collection, addDoc, doc, updateDoc, onSnapshot 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

// Protect Teacher Page
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    loadAppointments(user.uid);
  }
});

// Elements
const appointmentsTable = document.getElementById("appointmentsTable");

// 🔹 Schedule Appointment
window.scheduleAppointment = async () => {
  const dateTime = document.getElementById("appointmentDateTime").value;
  if (!dateTime) {
    alert("Please select a date and time");
    return;
  }

  try {
    await addDoc(collection(db, "appointments"), {
      teacherId: auth.currentUser.uid,
      teacherEmail: auth.currentUser.email,
      dateTime: dateTime,
      status: "pending",
      createdAt: new Date()
    });
    alert("Appointment scheduled successfully!");
  } catch (err) {
    console.error("Error scheduling appointment:", err);
  }
};

// 🔹 Load Teacher's Appointments
function loadAppointments(teacherId) {
  const apptRef = collection(db, "appointments");
  onSnapshot(apptRef, (snapshot) => {
    appointmentsTable.innerHTML = "";

    snapshot.forEach((docSnap) => {
      let appt = docSnap.data();
      if (appt.teacherId === teacherId) {
        let row = `
          <tr>
            <td>${appt.studentEmail || "N/A"}</td>
            <td>${appt.dateTime}</td>
            <td><span class="status-${appt.status}">${appt.status}</span></td>
            <td>
              <button class="btn btn-approve" onclick="approveAppt('${docSnap.id}')">Approve</button>
              <button class="btn btn-reject" onclick="rejectAppt('${docSnap.id}')">Reject</button>
            </td>
          </tr>
        `;
        appointmentsTable.innerHTML += row;
      }
    });
  });
}

// 🔹 Approve Appointment
window.approveAppt = async (apptId) => {
  await updateDoc(doc(db, "appointments", apptId), { status: "approved" });
};

// 🔹 Reject Appointment
window.rejectAppt = async (apptId) => {
  await updateDoc(doc(db, "appointments", apptId), { status: "rejected" });
};

// 🔹 Logout
window.logout = async () => {
  await signOut(auth);
  alert("Logged out successfully");
  window.location.href = "index.html";
};
