# 🎓 Student-Teacher Appointment Booking System

A **web-based appointment booking system** that allows students and lecturers to schedule, manage, and track appointments online.  
This project is built with **HTML, CSS, JavaScript, Firebase (Auth + Firestore)** and follows modular coding standards.

---

## 🚀 Features

### 👩‍💼 Admin
- Approve / Reject student registrations  
- Add / Manage teachers  
- View all users and appointments in real-time  
- Logs every action for auditing  

### 👨‍🏫 Teacher
- Schedule available appointment slots  
- Approve / Reject student requests  
- View all appointments with students  

### 👩‍🎓 Student
- Register / Login securely  
- Search teachers by name or subject  
- Book appointments with teachers  
- Send messages (purpose of appointment)  

---

## 🛠️ Tech Stack
- **Frontend:** HTML, CSS (minimal custom styling), JavaScript (modular)  
- **Backend:** Firebase (Authentication + Firestore Database)  
- **Deployment:** Local (VS Code + Live Server)  
- **Logging:** Firestore `logs` collection  

---

## ⚙️ Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/your-username/student-teacher-booking.git
cd student-teacher-booking

PROJECT STRUCTURE:-

student-teacher-booking/
├─ index.html
├─ admin-dashboard.html
├─ teacher-dashboard.html
├─ student-dashboard.html
├─ css/
│  └─ style.css
├─ js/
│  ├─ admin.js
│  ├─ teacher.js
│  └─ student.js
├─ docs/
│  ├─ Architecture.md
│  ├─ LLD.md
│  ├─ Optimization.md
│  ├─ TestCases.md
│  ├─ ProjectReport.pdf
│  └─ screenshots/
│      ├─ main_page.png
│      ├─ admin_dashboard.png
│      ├─ teacher_dashboard.png
│      └─ student_dashboard.png
└─ README.md

📌 Deployment

This project runs locally using VS Code Live Server.

Justification: Local deployment is chosen for simplicity during academic evaluation.

Can be scaled to Firebase Hosting in future.
