# HRMS Lite — Web-Based HR Management System

**Developer:** Sagar Sharma  

**Technology Stack:** Django + MySQL (Backend), React + Vite + Redux + Bootstrap (Frontend)

**Live Demo:** [https://hrms.buynreadbooks.com](https://hrms.buynreadbooks.com/)

**Test Credentials:**  
- **Admin:**  
  - Username: `sagar`  
  - Password: `sagar`
---

## Problem Statement

Build a web-based **HRMS Lite** application that allows an admin to:

1. Manage employee records
2. Track daily attendance

The system simulates a basic internal HR tool, focusing on essential HR operations with a **simple, usable, and professional interface**.

---

## Functional Requirements

### 1. Employee Management

The application allows the admin to:

- **Add a new employee** with the following details:
  - Employee ID (unique)
  - Full Name
  - Email Address
  - Department
- **View a list of all employees**
- **Delete an employee**

---

### 2. Attendance Management

The application allows the admin to:

- **Mark attendance** for an employee with:
  - Date
  - Status (Present / Absent / Leave)
- **View attendance records** for each employee

---

## Technical Stack

### Backend
- Django 5
- Django REST Framework
- MySQL
- JWT / Session Authentication
- CSRF Protection
- CORS + Cookies

### Frontend
- React (Vite)
- Redux Toolkit
- Axios
- Bootstrap 5
- React Toastify

---

## Backend Setup

```bash
cd server
python3 -m venv venv
source venv/bin/activate    # mac/linux
.\venv\Scripts\activate    # windows
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## Frontend Setup
```bash
cd client
npm create vite@latest .
Redux aur Zaruri Libraries
npm install @reduxjs/toolkit react-redux axios react-router-dom
Folder Structure (Manual)
mkdir src/store src/components src/pages src/services
npm i redux-persist
```

# Run Frontend
Frontend Run
cd client
npm install
npm run dev

Open in browser:
http://localhost:5173


# Backend Run
cd server

.\venv\Scripts\activate
pip install -r requirements.txt

python manage.py runserver

Open in browser:
http://localhost:8000


# API Endpoints
Auth
POST /api/login/
POST /api/logout/
GET  /api/get-csrf/

Employees
GET    /api/employees/
POST   /api/employees/
DELETE /api/employees/<employee_id>/

Attendance
GET  /api/attendance/
POST /api/attendance/
GET  /api/attendance/<employee_id>/   # Individual history

---
### ✅ This README includes:
- Problem Statement  
- Functional Requirements  
- Technical Stack  
- Admin credentials (username: `sagar`, password: `sagar`)  
- MySQL credentials (db name: `brb_hrms`, db password: `brb_hrms@123`, db user: `brb_hrms`, port : `3306` )
- API Endpoints  
- Project Structure
