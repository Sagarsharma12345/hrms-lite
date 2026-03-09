import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/api";
import StatsCard from "../components/dashboard/StatsCard";
import SummaryPanel from "../components/dashboard/SummaryPanel";
import toast from "react-hot-toast";
import { RefreshCcw } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [empRes, attRes] = await Promise.all([
        apiService.fetchEmployees(),
        apiService.fetchAttendance(),
      ]);

      const empData = Array.isArray(empRes?.data) ? empRes.data : [];
      const attData = Array.isArray(attRes?.data) ? attRes.data : [];

      setEmployees(empData);
      setAttendance(attData);
    } catch (err) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Get today in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Filter attendance for today
  const todaysAttendance = attendance.filter((a) => a?.date === today);

  const presentCount = todaysAttendance.filter(
    (a) => a?.status === "PRESENT",
  ).length;
  const absentCount = todaysAttendance.filter(
    (a) => a?.status === "ABSENT",
  ).length;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-10 space-y-4">
        <RefreshCcw className="animate-spin text-[#0073BB]" size={32} />
        <span className="text-sm font-bold text-slate-500">
          Loading Dashboard...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          label="Total Employees"
          value={employees.length}
          type="total"
          onClick={() => navigate("/employees")}
        />

        <StatsCard
          label="Present Today"
          value={presentCount}
          type="success"
          onClick={() => navigate("/attendance")}
        />

        <StatsCard
          label="Absent Today"
          value={absentCount}
          type="warning"
          onClick={() => navigate("/attendance")}
        />
      </div>

      <SummaryPanel employees={employees} attendance={todaysAttendance} />
    </div>
  );
};

export default Dashboard;
