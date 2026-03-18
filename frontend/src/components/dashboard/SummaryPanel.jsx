import React from "react";
import {
  Users,
  CalendarCheck,
  ArrowRight,
  UserPlus,
  BarChart3,
  PieChart,
} from "lucide-react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

const SummaryPanel = ({ employees = [], attendance = [] }) => {
  const latestEmployees = [...employees]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);
  const recentAttendance = attendance
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const presentCount = attendance.filter((a) => a.status === "PRESENT").length;
  const absentCount = attendance.filter((a) => a.status === "ABSENT").length;

  const pieData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [presentCount, absentCount],
        backgroundColor: ["#10B981", "#F43F5E"],
        hoverOffset: 15,
        borderWidth: 0,
      },
    ],
  };

  const barData = {
    labels: ["Attendance Metric"],
    datasets: [
      {
        label: "Present",
        data: [presentCount],
        backgroundColor: "#10B981",
        borderRadius: 6,
      },
      {
        label: "Absent",
        data: [absentCount],
        backgroundColor: "#F43F5E",
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="rounded-3xl space-y-6">
      {/* Main Grid: 3 Columns on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1. New Joiners (Latest Employees) */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                <UserPlus size={20} />
              </div>
              <h3 className="font-bold text-gray-800 text-lg">New Joiners</h3>
            </div>
            <span className="text-[10px] bg-indigo-600 text-white px-2 py-1 rounded-full font-black uppercase tracking-tighter">
              Latest
            </span>
          </div>

          <div className="space-y-3 flex-grow">
            {latestEmployees.length > 0 ? (
              latestEmployees.map((emp) => (
                <div
                  key={emp.id}
                  className="group flex items-center justify-between p-3 rounded-xl hover:bg-indigo-50/50 border border-transparent transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
                      {(emp.name || emp.username).charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm leading-tight">
                        {emp.name || emp.username}
                      </p>
                      <p className="text-[11px] text-gray-400 font-medium">
                        Emp ID: {emp.emp_id}
                      </p>
                    </div>
                  </div>
                  <div className="p-1.5 bg-gray-50 rounded-full group-hover:bg-white group-hover:shadow-sm transition-all">
                    <ArrowRight
                      size={14}
                      className="text-gray-400 group-hover:text-indigo-600"
                    />
                  </div>
                </div>
              ))
            ) : (
              <EmptyState message="No new employees" />
            )}
          </div>
        </div>

        {/* 2. Recent Activity (Attendance) */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
              <CalendarCheck size={20} />
            </div>
            <h3 className="font-bold text-gray-800 text-lg">Recent Activity</h3>
          </div>

          <div className="space-y-3">
            {recentAttendance.length > 0 ? (
              recentAttendance.map((att) => (
                <div
                  key={att.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50/50 border border-gray-100 shadow-sm"
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-700 text-sm">
                      {att.employee_name || att.employee?.name}
                    </span>
                    <span className="text-[10px] text-gray-400 font-semibold">
                      {att.date}
                    </span>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-lg text-[10px] font-black ${
                      att.status === "PRESENT"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {att.status}
                  </div>
                </div>
              ))
            ) : (
              <EmptyState message="No attendance logged" />
            )}
          </div>
        </div>

        {/* 3. Visual Stats (Two Graphs) */}
        <div className="space-y-6">
          {/* Circle Chart */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
            <h4 className="w-full font-bold text-gray-800 mb-4 flex items-center gap-2">
              <PieChart size={18} className="text-orange-500" /> Distribution
            </h4>
            <div className="w-full max-w-[140px]">
              <Pie
                data={pieData}
                options={{ plugins: { legend: { display: false } } }}
              />
            </div>
            <div className="mt-4 flex gap-4 text-[10px] font-bold uppercase tracking-widest">
              <span className="flex items-center gap-1.5 text-emerald-600">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />{" "}
                {presentCount} Present
              </span>
              <span className="flex items-center gap-1.5 text-rose-600">
                <div className="w-2 h-2 rounded-full bg-rose-500" />{" "}
                {absentCount} Absent
              </span>
            </div>
          </div>

          {/* Bar Chart (New) */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
            <h4 className="w-full font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart3 size={18} className="text-indigo-500" /> Volume
              Comparison
            </h4>
            <div className="h-32 w-full">
              <Bar
                data={barData}
                options={{
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    y: { display: false },
                    x: { grid: { display: false } },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmptyState = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-10 opacity-30 italic">
    <Users size={32} strokeWidth={1.5} />
    <p className="text-xs mt-2 font-bold uppercase tracking-widest">
      {message}
    </p>
  </div>
);

export default SummaryPanel;
