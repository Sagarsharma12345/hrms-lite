import React, { useState, useEffect } from "react";
import { X, Loader2, CalendarCheck } from "lucide-react";
import { apiService } from "../../services/api";
import toast from "react-hot-toast";

const AttendanceModal = ({
  isOpen,
  onClose,
  onSuccess,
  editAttendance = null,
  employees = [],
  mode = "mark",
}) => {
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("PRESENT");
  const [loading, setLoading] = useState(false);

  const isViewMode = mode === "view";
  const isEditMode = !!editAttendance;

  useEffect(() => {
    if (!isOpen) return;

    if (isEditMode) {
      setEmployeeId(editAttendance.employee?.id || "");
      setDate(editAttendance.date || "");
      setStatus(editAttendance.status || "PRESENT");
    } else {
      setEmployeeId(employees.length === 1 ? employees[0].id : "");
      setDate(new Date().toISOString().split("T")[0]);
      setStatus("PRESENT");
    }
  }, [editAttendance, employees, isOpen, isEditMode]);

  if (!isOpen) return null;

  const inputClasses = (disabled) =>
    `w-full mt-1 border rounded-sm px-3 py-2 text-sm transition-all ${
      disabled
        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
        : "border-[#D5DBDB] focus:outline-none focus:border-[#0073BB]"
    }`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isViewMode) return;

    if (!employeeId || !date) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        employee: employeeId,
        date,
        status,
      };

      if (isEditMode) {
        await apiService.updateAttendance(editAttendance.id, payload);
        toast.success("Attendance updated successfully");
      } else {
        await apiService.createAttendance(payload);
        toast.success("Attendance marked successfully");
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      if (error.data) {
        const messages = Object.values(error.data).flat().join(" ");
        toast.error(messages);
      } else {
        toast.error(error.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 overflow-auto">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-3xl rounded-lg shadow-2xl border border-[#D5DBDB] overflow-hidden">
        {/* Header */}
        <div className="bg-[#232F3E] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <CalendarCheck size={18} />
            <h3 className="font-black text-sm uppercase tracking-widest">
              {isViewMode
                ? "View Attendance"
                : isEditMode
                  ? "Update Attendance"
                  : "Mark Attendance"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4 max-h-[90vh] overflow-y-auto"
        >
          {/* Employee */}
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Select Employee
            </label>
            <select
              required
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              disabled={isViewMode}
              className={inputClasses(isViewMode)}
            >
              <option value="">-- Select Employee --</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} ({emp.emp_id})
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Date
            </label>
            <input
              required
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={isViewMode}
              className={inputClasses(isViewMode)}
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={isViewMode}
              className={inputClasses(isViewMode)}
            >
              <option value="PRESENT">Present</option>
              <option value="ABSENT">Absent</option>
            </select>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-black text-slate-400 uppercase tracking-wider px-4 py-2 border border-[#D5DBDB] rounded-sm hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>

            {!isViewMode && (
              <button
                disabled={loading}
                type="submit"
                className="flex items-center gap-2 bg-indigo-500  hover:bg-indigo-600 text-white font-black text-xs py-2.5 px-6 rounded-sm shadow-sm uppercase tracking-wider transition-all disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : isEditMode ? (
                  "Update"
                ) : (
                  "Save"
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AttendanceModal;
