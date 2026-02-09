import { useEffect, useState } from "react";
import DataTable from "react-data-table-component"; // for system-like table
import Modal from "../components/Modal/Component";
import ViewAttendanceModal from "../components/Modal/viewAttendanceModal";

import API from "../api/axios";
import { toast } from "react-toastify";
import { FaTrash, FaEye } from "react-icons/fa";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [attendanceModal, setAttendanceModal] = useState({
    show: false,
    employee: null,
    records: []
  });

  const openAttendanceModal = async (row) => {
    try {
      const res = await API.get(`/api/attendance/${row.employee_id}/`);
      setAttendanceModal({
        show: true,
        employee: row,
        records: res.data.data
      });
    } catch (err) {
      toast.error("Failed to load attendance");
    }
  };

  const closeAttendanceModal = () => {
    setAttendanceModal({
      show: false,
      employee: null,
      records: []
    });
  };

  // Modal fields config
  const employeeFields = [
    { name: "employee_id", label: "Employee ID", type: "text" },
    { name: "first_name", label: "First Name", type: "text" },
    { name: "last_name", label: "Last Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "department", label: "Department", type: "text" },
  ];

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/api/employees/");
      setEmployees(res.data.data);
    } catch {
      toast.error("Failed to load employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const addEmployee = async (data) => {
    try {
      await API.post("/api/employees/", data);
      toast.success("Employee added");
      setShowModal(false);
      fetchEmployees();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add employee");
    }
  };

  const deleteEmployee = async (row) => {
    try {
      await API.delete(`/api/employees/${row.employee_id}/`);
      toast.success("Employee deleted");
      fetchEmployees();
    } catch {
      toast.error("Failed to delete employee");
    }
  };

  const columns = [
    { name: "ID", selector: row => row.employee_id, sortable: true },
    { name: "First Name", selector: row => row.first_name, sortable: true },
    { name: "Last Name", selector: row => row.last_name, sortable: true },
    { name: "Email", selector: row => row.email, sortable: true },
    { name: "Department", selector: row => row.department, sortable: true },
    {
      name: "Timestamps",
      selector: row => {
        const date = new Date(row.created_at);
        return date.toLocaleString();
      },
      sortable: true
    },

    {
      name: "Actions",
      cell: row => (
        <div className="d-flex gap-2">
          <FaEye
            role="button"
            size={18}
            className="text-primary"
            onClick={() => openAttendanceModal(row)}
            title="View Attendance"
          />
          <FaTrash
            role="button"
            size={18}
            className="text-danger"
            onClick={() => deleteEmployee(row)}
            title="Delete Employee"
          />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ];

  return (
    <div className="container-fluid p-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <h4 className="mb-3 mb-md-0">Employees</h4>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Add Employee
        </button>
      </div>

      <div className="card shadow-sm rounded">
        <div className="card-body">
          <DataTable
            title="Employees List"
            columns={columns}
            data={employees}
            pagination
            highlightOnHover
            responsive
            striped
          />
        </div>
      </div>

      <Modal
        show={showModal}
        title="Add Employee"
        fields={employeeFields}
        onSubmit={addEmployee}
        onClose={() => setShowModal(false)}
      />

      <ViewAttendanceModal
        show={attendanceModal.show}
        onClose={closeAttendanceModal}
        employee={attendanceModal.employee}
        records={attendanceModal.records}
      />
    </div>
  );
}
