# 🚀 HRMS Lite — Web-Based HR Management System

**HRMS Lite** ek professional aur easy-to-use Human Resource Management System hai. Ise specifically basic internal HR operations jaise employee database management aur daily attendance tracking ke liye banaya gaya hai.

---

## 🔗 Project Links

- **Live Demo:** [https://hrms.trafficvenue.co.in](https://hrms.trafficvenue.co.in/)
- **Developer:** Sagar Sharma

---

## ✨ Key Features

### 👥 Employee Management

- **Add Employees:** Unique ID, Name, Email, Designation, aur Department ke sath naye records jodein.
- **Directory:** Sabhi employees ki ek clean list view.
- **Status Tracking:** Employee ka current status (Active/Inactive) manage karein.
- **Delete Records:** Purane ya galat records ko asani se remove karein.

### 📅 Attendance Management

- **Daily Marking:** Ek click mein attendance (Present/Absent/Leave) mark karein.
- **History:** Har employee ka date-wise attendance record dekhein.
- **Visual Insights:** Dashboard par status ka overview (Chart.js ka use karke).

---

## 🛠 Technology Stack

### **Frontend**

- **Framework:** React (Vite)
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide-React
- **Notifications:** React Toastify
- **Charts:** Chart.js & React-Chartjs-2

### **Backend**

- **Framework:** Django 5 & Django REST Framework (DRF)
- **Database:** MySQL
- **API:** RESTful Architecture

---

## ⚙️ Installation & Setup

### 1. Backend Setup (Django)

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate venv
# Windows:
.\venv\Scripts\activate

# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser (Admin access)
python manage.py createsuperuser

# Start server
python manage.py runserver
```

Access URL: [http://localhost:8080](http://127.0.0.1:8000/)

### 2. Frontend Setup (React + Vite)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Access URL: [http://localhost:5173](http://localhost:5173/)

### API Endpoints

##### Employees API

| Method     | Endpoint               | Description               |
| :--------- | :--------------------- | :------------------------ |
| **GET**    | `/api/employees/`      | Get list of all employees |
| **POST**   | `/api/employees/`      | Add a new employee        |
| **PUT**    | `/api/employees/<id>/` | Update employee details   |
| **DELETE** | `/api/employees/<id>/` | Delete an employee        |

##### Attendance API

| Method   | Endpoint                    | Description                            |
| :------- | :-------------------------- | :------------------------------------- |
| **GET**  | `/api/attendance/`          | Get all attendance records             |
| **POST** | `/api/attendance/`          | Mark attendance for an employee        |
| **GET**  | `/api/attendance/<emp_id>/` | Get attendance for a specific employee |

### Project Structure

````bash
HRMS-LITE-MAIN/
├── backend/                  # Django Backend Project
│   ├── attendance/           # Attendance Management App (Models, Views, Serializers)
│   ├── common/               # Shared Utilities & Exception Handling
│   ├── core/                 # Project Settings & Root Configurations
│   ├── employees/            # Employee Management App
│   ├── manage.py             # Django CLI Tool
│   ├── passenger_wsgi.py     # Deployment Script (for hosting)
│   └── requirements.txt      # Python Dependencies
├── frontend/                 # React Frontend (Vite)
│   ├── public/               # Static Assets (Icons, Logos)
│   ├── src/                  # Application Source Code
│   │   ├── components/       # Reusable UI Elements (Navbar, Sidebar, Tables)
│   │   ├── pages/            # Main Page Views (Dashboard, Attendance Log)
│   │   ├── services/         # API Integration Logic (Fetch/Axios)
│   │   ├── App.jsx           # Root Component & Routes
│   │   └── main.jsx          # Entry Point
│   ├── package.json          # Project Metadata & Dependencies
│   └── vite.config.js        # Vite Configuration
├── .gitignore                # Files excluded from Version Control
└── README.md                 # Project Documentation```
````

### License

This project is open-source and free to use.

Developed by Sagar Sharma 🚀
