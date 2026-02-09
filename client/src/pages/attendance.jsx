import { useEffect, useState, useMemo } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import AttendanceModal from "../components/Modal/attendanceModal";
import DataTable from "react-data-table-component";

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filterDate, setFilterDate] = useState("");

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/api/employees/");
      setEmployees(res.data.data);
    } catch {
      toast.error("Failed to load employees");
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await API.get("/api/attendance/");
      setAttendance(res.data.data);
    } catch {
      toast.error("Failed to load attendance");
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
  }, []);

  const filteredAttendance = useMemo(() => {
    if (!filterDate) return attendance;
    return attendance.filter(a => a.date === filterDate);
  }, [attendance, filterDate]);

  const addAttendance = async (data) => {
    try {
      await API.post("/api/attendance/", data);
      toast.success("Attendance marked");
      setShowModal(false);
      fetchAttendance();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to mark attendance");
    }
  };

  // Columns for DataTable
  const columns = [
    { name: "Employee", selector: row => row.employee_name, sortable: true },
    { name: "Date", selector: row => row.date, sortable: true },
    {
      name: "Status",
      selector: row => row.status,
      sortable: true,
      cell: row => (
        <span className={`badge ${
          row.status === "Present" ? "bg-success" :
          row.status === "Absent" ? "bg-danger" :
          "bg-warning text-dark"
        }`}>
          {row.status}
        </span>
      )
    },
  ];

  return (
    <div className="container-fluid p-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <h4 className="mb-3 mb-md-0">Attendance</h4>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Mark Attendance
        </button>
      </div>

      {/* Date Filter */}
      <div className="d-flex flex-wrap mb-4 gap-2">
        <input
          type="date"
          className="form-control w-auto"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        {filterDate && (
          <button
            className="btn btn-outline-secondary"
            onClick={() => setFilterDate("")}
          >
            Clear
          </button>
        )}
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={filteredAttendance}
        pagination
        highlightOnHover
        striped
        responsive
        noHeader
      />

      {/* Modal */}
      <AttendanceModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={addAttendance}
        employees={employees}
      />
    </div>
  );
}
