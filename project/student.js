import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
  getFirestore, collection, addDoc, onSnapshot, doc 
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

// Protect Student Page
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    loadAppointments(user.email);
  }
});

// Elements
const teacherList = document.getElementById("teacherList");
const studentAppointmentsTable = document.getElementById("studentAppointmentsTable");

// 🔹 Search Teacher (basic filter by name)
window.searchTeacher = () => {
  const query = document.getElementById("searchTeacher").value.toLowerCase();
  teacherList.innerHTML = "";

  onSnapshot(collection(db, "teachers"), (snapshot) => {
    snapshot.forEach((docSnap) => {
      let teacher = docSnap.data();
      if (teacher.name.toLowerCase().includes(query)) {
        let div = document.createElement("div");
        div.innerHTML = `
          <strong>${teacher.name}</strong> - ${teacher.department}, ${teacher.subject}
          <button class="btn btn-approve" onclick="bookAppointment('${docSnap.id}', '${teacher.name}')">Book</button>
        `;
        teacherList.appendChild(div);
      }
    });
  });
};

// 🔹 Book Appointment
window.bookAppointment = async (teacherId, teacherName) => {
  try {
    await addDoc(collection(db, "appointments"), {
      studentId: auth.currentUser.uid,
      studentEmail: auth.currentUser.email,
      teacherId: teacherId,
      teacherName: teacherName,
      status: "pending",
      createdAt: new Date()
    });
    alert("Appointment request sent!");
  } catch (err) {
    console.error("Error booking appointment:", err);
  }
};

// 🔹 Load Student's Appointments
function loadAppointments(studentEmail) {
  onSnapshot(collection(db, "appointments"), (snapshot) => {
    studentAppointmentsTable.innerHTML = "";
    snapshot.forEach((docSnap) => {
      let appt = docSnap.data();
      if (appt.studentEmail === studentEmail) {
        let row = `
          <tr>
            <td>${appt.teacherName || "N/A"}</td>
            <td>${appt.dateTime || "Not scheduled yet"}</td>
            <td><span class="status-${appt.status}">${appt.status}</span></td>
          </tr>
        `;
        studentAppointmentsTable.innerHTML += row;
      }
    });
  });
}

// 🔹 Logout
window.logout = async () => {
  await signOut(auth);
  alert("Logged out successfully");
  window.location.href = "index.html";
};
