import { useState } from "react";
import "./attendanceModal.css";

export default function AttendanceModal({ show, onClose, onSubmit, employees }) {
  const [form, setForm] = useState({
    employee_id: "",
    date: "",
    status: "Present",
  });

  if (!show) return null;

  const submit = () => {
    if (!form.employee_id || !form.date) {
      return alert("Employee and date are required");
    }
    onSubmit(form);
    setForm({ employee_id: "", date: "", status: "Present" });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        {/* Header */}
        <div className="modal-header d-flex justify-content-between align-items-center mb-3">
          <h5 className="modal-title">Mark Attendance</h5>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="mb-3">
            <label className="form-label">Employee</label>
            <select
              className="form-select"
              value={form.employee_id}
              onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
            >
              <option value="">Select employee...</option>
              {employees.map((emp) => (
                <option key={emp.employee_id} value={emp.employee_id}>
                  {emp.full_name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Leave">Leave</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer d-flex justify-content-end gap-2 mt-3">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={submit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
