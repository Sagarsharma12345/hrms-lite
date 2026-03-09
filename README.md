# HRMS Lite — Web-Based HR Management System

**Developer:** Sagar Sharma

**Technology Stack:** Django + MySQL (Backend), React + Vite + Tailwind CSS v4 (Frontend)

**Live Demo:** [https://hrms.trafficvenue.co.in](https://hrms.trafficvenue.co.in/)

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
  - Designation
  - Status
  - Department
- **View a list of all employees**
- **Delete an employee**

---

### 2. Attendance Management

The application allows the admin to:

- **Mark attendance** for an employee with:
  - Select Employee
  - Date
  - Status (Present / Absent / Leave)
- **View attendance records** for each employee

---

## Technical Stack

### Backend

- Django 5
- Django REST Framework
- MySQL

### Frontend

- React (Vite)
- fetch
- Tailwind CSS
- React Toastify
- chart.js
- lucide-react
- react-chartjs-2

---

## Backend Setup

```bash
cd backend
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
cd frontend
npm create vite@latest .
npm install react-router-dom
Folder Structure (Manual)
mkdir src/components src/pages src/services
```

# Run Frontend

Frontend Run
cd frontend

npm install
npm run dev

Open in browser:
http://localhost:5173

# Backend Run

cd backend

.\venv\Scripts\activate
pip install -r requirements.txt

python manage.py runserver

Open in browser:
http://localhost:8000

# API Endpoints

Employees
GET /api/employees/
POST /api/employees/
PUT /api/employees/<employee_id>/
DELETE /api/employees/<employee_id>/

Attendance
GET /api/attendance/
POST /api/attendance/
PUT /api/attendance/<employee_id>/
GET /api/attendance/<employee_id>/

---

### ✅ This README includes:

- Problem Statement
- Functional Requirements
- Technical Stack
- MySQL
- API Endpoints
- Project Structure
