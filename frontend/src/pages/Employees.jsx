import React, { useState, useEffect } from "react";
import { apiService } from "../services/api";
import EmployeeTable from "../components/employees/EmployeeTable";
import EmployeeModal from "../components/employees/EmployeeModal";
import AttendanceModal from "../components/attendance/AttendanceModal";
import { Plus, RefreshCcw, Search } from "lucide-react";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);

  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [employeeAttendance, setEmployeeAttendance] = useState([]);

  // Fetch Employees
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await apiService.fetchEmployees();
      const finalData = res?.data || res;
      if (Array.isArray(finalData)) setEmployees(finalData);
    } catch (err) {
      console.error("Error fetching employees:", err);
    } finally {
      setLoading(false);
    }
  };

  // Open Employee Create/Edit Modal
  const handleCreateOpen = () => {
    setSelectedEmployee(null);
    setIsEmployeeModalOpen(true);
  };
  const handleEditOpen = (employee) => {
    setSelectedEmployee(employee);
    setIsEmployeeModalOpen(true);
  };

  const [attendanceMode, setAttendanceMode] = useState("view");

  const handleViewAttendance = async (employee) => {
    setSelectedEmployee(employee);
    setAttendanceMode("view");
    setIsAttendanceModalOpen(true);

    try {
      const res = await apiService.fetchAttendance({ employee: employee.id });
      setEmployeeAttendance(res?.data || []);
    } catch (err) {
      setEmployeeAttendance([]);
    }
  };

  const handleMarkAttendance = async (employee) => {
    setSelectedEmployee(employee);
    setAttendanceMode("mark");
    setIsAttendanceModalOpen(true);

    try {
      const res = await apiService.fetchAttendance({ employee: employee.id });
      setEmployeeAttendance(res?.data || []);
    } catch (err) {
      setEmployeeAttendance([]);
    }
  };

  // Filter Employees by name, email, or emp_id
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.emp_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-xl font-black text-[#232F3E] tracking-tight">
          All Employees
        </h1>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchEmployees}
            className="p-2.5 text-slate-600 bg-white border border-[#D5DBDB] rounded-sm hover:bg-slate-50 shadow-sm transition-all"
          >
            <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
          </button>

          <button
            onClick={handleCreateOpen}
            className="flex items-center gap-2 bg-indigo-500  hover:bg-indigo-600 text-white font-black text-xs py-2.5 px-6 rounded-sm shadow-sm uppercase tracking-wider transition-all "
          >
            <Plus size={16} />
            Create Employee
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-3 border border-[#D5DBDB] rounded-sm shadow-sm flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search by Name / ID / Email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-[#D5DBDB] rounded-sm text-sm focus:bg-white focus:border-[#0073BB] outline-none transition-all"
          />
        </div>

        <div className="hidden sm:block text-[10px] font-black text-slate-400 uppercase">
          Showing {filteredEmployees.length} Employees
        </div>
      </div>

      {/* Employee Table */}
      <div className="border-[#D5DBDB] rounded-sm min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 space-y-4">
            <RefreshCcw size={32} className="animate-spin text-[#0073BB]" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              Syncing Employee Data...
            </span>
          </div>
        ) : (
          <EmployeeTable
            employees={filteredEmployees}
            onRefresh={fetchEmployees}
            onEdit={handleEditOpen}
            onViewAttendance={handleViewAttendance}
            onMarkAttendance={handleMarkAttendance}
          />
        )}
      </div>

      {/* Employee Modal */}
      <EmployeeModal
        isOpen={isEmployeeModalOpen}
        onClose={() => setIsEmployeeModalOpen(false)}
        onSuccess={fetchEmployees}
        editEmployee={selectedEmployee}
      />

      {/* Attendance Modal */}
      <AttendanceModal
        isOpen={isAttendanceModalOpen}
        onClose={() => setIsAttendanceModalOpen(false)}
        onSuccess={fetchEmployees}
        employees={selectedEmployee ? [selectedEmployee] : []}
        mode={employeeAttendance.length > 0 ? "view" : "mark"}
        attendanceData={employeeAttendance}
      />
    </div>
  );
};

export default Employees;
