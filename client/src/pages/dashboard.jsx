import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import "../styles/dashboard.css";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [stats, setStats] = useState({
    employees: 0,
    present: 0,
    absent: 0,
    leave: 0,
  });

  const [recent, setRecent] = useState([]);

  const fetchData = async () => {
    try {
      const empRes = await API.get("/api/employees/");
      const attRes = await API.get("/api/attendance/");

      const employees = empRes.data.data;
      const attendance = attRes.data.data;
      console.log(employees);
      console.log(attendance);

      const today = new Date().toISOString().split("T")[0];
      const todayRecords = attendance.filter(a => a.date === today);

      setStats({
        employees: employees.length,
        present: todayRecords.filter(a => a.status === "Present").length,
        absent: todayRecords.filter(a => a.status === "Absent").length,
        leave: todayRecords.filter(a => a.status === "Leave").length,
      });


      const recentSorted = attendance
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)
        .map(record => {
          const emp = employees.find(e => e.employee_id === record.employee || e.employee_id === record.employee_id);
          return {
            ...record,
          };
        });
      setRecent(recentSorted);

    } catch (err) {
      console.log(err);
      toast.error("Failed to load dashboard");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Chart data
  const pieData = {
    labels: ["Present", "Absent", "Leave"],
    datasets: [
      {
        label: "Today's Attendance",
        data: [stats.present, stats.absent, stats.leave],
        backgroundColor: ["#198754", "#dc3545", "#ffc107"], // green, red, yellow
        borderColor: ["#fff", "#fff", "#fff"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="container-fluid p-4">
      <h4 className="mb-4">Dashboard</h4>

      {/* KPI CARDS */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card shadow-sm border-0 text-center p-3 rounded">
            <h6 className="text-muted">Total Employees</h6>
            <h3 className="fw-bold">{stats.employees}</h3>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card shadow-sm border-0 text-center p-3 rounded border-start border-success border-4">
            <h6 className="text-success">Present Today</h6>
            <h3 className="fw-bold text-success">{stats.present}</h3>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card shadow-sm border-0 text-center p-3 rounded border-start border-danger border-4">
            <h6 className="text-danger">Absent Today</h6>
            <h3 className="fw-bold text-danger">{stats.absent}</h3>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card shadow-sm border-0 text-center p-3 rounded border-start border-warning border-4">
            <h6 className="text-warning">On Leave Today</h6>
            <h3 className="fw-bold text-warning">{stats.leave}</h3>
          </div>
        </div>
      </div>

      {/* ATTENDANCE CHART */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card shadow-sm p-3 rounded">
            <h5 className="mb-3">Today's Attendance</h5>
            <Pie data={pieData} />
          </div>
        </div>

        {/* RECENT ATTENDANCE */}
        <div className="col-md-6">
          <div className="card shadow-sm p-3 rounded h-100">
            <h5 className="mb-3">Recent Attendance</h5>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Employee</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.length > 0 ? (
                    recent.map((r, i) => (
                      <tr key={i}>
                        <td>{r.employee_name}</td>
                        <td>{r.date}</td>
                        <td>
                          <span className={`badge ${r.status === "Present" ? "bg-success" : r.status === "Absent" ? "bg-danger" : "bg-warning text-dark"}`}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center text-muted">
                        No records
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
