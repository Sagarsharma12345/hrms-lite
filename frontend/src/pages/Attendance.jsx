import React, { useState, useEffect, useMemo } from "react";
import { apiService } from "../services/api";
import AttendanceTable from "../components/attendance/AttendanceTable";
import AttendanceModal from "../components/attendance/AttendanceModal";
import { Plus, RefreshCcw, Search, Edit } from "lucide-react";

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editAttendance, setEditAttendance] = useState(null);
  const [viewAttendance, setViewAttendance] = useState(null);

  // Fetch all data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [empRes, attRes] = await Promise.all([
        apiService.fetchEmployees(),
        apiService.fetchAttendance(),
      ]);

      setEmployees(empRes?.data || []);
      setAttendance(attRes?.data || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Open modal to add attendance
  const handleAdd = () => {
    setEditAttendance(null);
    setIsModalOpen(true);
  };

  // Open modal to edit attendance
  const handleEdit = (record) => {
    const employeeObj = employees.find(
      (emp) =>
        emp.name === record.employee_name || emp.id === record.employee?.id,
    );
    setEditAttendance({
      ...record,
      employee: employeeObj || null,
    });
    setIsModalOpen(true);
  };

  // Function to handle View
  const handleView = (record) => {
    const employeeObj = employees.find(
      (emp) =>
        emp.name === record.employee_name || emp.id === record.employee?.id,
    );
    setViewAttendance({
      ...record,
      employee: employeeObj || null,
    });
    setIsModalOpen(true);
  };

  // Filtered attendance
  const filteredAttendance = useMemo(() => {
    return attendance.filter((att) => {
      const matchesSearch = att.employee_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesDate = dateFilter ? att.date === dateFilter : true;
      const matchesStatus = statusFilter ? att.status === statusFilter : true;
      return matchesSearch && matchesDate && matchesStatus;
    });
  }, [attendance, searchTerm, dateFilter, statusFilter]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-xl font-black text-[#232F3E] tracking-tight">
          All Employee Attendance
        </h1>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchData}
            className="p-2.5 text-slate-600 bg-white border border-[#D5DBDB] rounded-sm hover:bg-slate-50 shadow-sm transition-all"
          >
            <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
          </button>

          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-[#FF9900] hover:bg-[#ec8d00] text-[#232F3E] font-black text-xs py-2.5 px-6 rounded-sm shadow-sm uppercase tracking-wider"
          >
            <Plus size={16} /> Mark Attendance
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-3 border border-[#D5DBDB] rounded-sm shadow-sm flex flex-wrap gap-4 items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search by Employee Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-[#D5DBDB] rounded-sm text-sm focus:bg-white focus:border-[#0073BB] outline-none transition-all"
          />
        </div>

        {/* Date Filter */}
        <div>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border px-3 py-2 text-sm rounded"
          />
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-3 py-2 text-sm rounded"
          >
            <option value="">All Status</option>
            <option value="PRESENT">Present</option>
            <option value="ABSENT">Absent</option>
          </select>
        </div>

        {/* Clear All */}
        <div>
          <button
            onClick={() => {
              setSearchTerm("");
              setDateFilter("");
              setStatusFilter("");
            }}
            className="border px-3 py-2 text-sm uppercase tracking-widest text-red-600 hover:text-white hover:bg-red-600 rounded-sm border-red-600 transition-all"
          >
            Clear All
          </button>
        </div>

        {/* Record Count */}
        <div className="hidden sm:block text-[10px] font-black text-slate-400 uppercase ml-auto">
          Showing {filteredAttendance.length} Records
        </div>
      </div>

      {/* Table */}
      <div className="border-[#D5DBDB] rounded-sm min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 space-y-4">
            <RefreshCcw size={32} className="animate-spin text-[#0073BB]" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              Loading Attendance Data...
            </span>
          </div>
        ) : (
          <AttendanceTable
            attendance={filteredAttendance}
            onEdit={handleEdit}
            onView={handleView}
          />
        )}
      </div>

      {/* Modal */}
      <AttendanceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditAttendance(null);
          setViewAttendance(null);
        }}
        onSuccess={fetchData}
        editAttendance={editAttendance || viewAttendance}
        employees={employees}
        mode={viewAttendance ? "view" : "mark"}
      />
    </div>
  );
};

export default Attendance;
