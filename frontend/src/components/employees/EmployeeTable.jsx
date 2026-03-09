import React, { useState } from "react";
import { Trash2, Edit3, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { apiService } from "../../services/api";

const EmployeeTable = ({ employees, onRefresh, onEdit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(employees.length / itemsPerPage);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete employee: ${name}?`)) {
      const res = await apiService.deleteEmployee(id);
      if (res?.success) {
        onRefresh();
      }
    }
  };

  return (
    <div className="w-full bg-white shadow-sm border border-[#DEE2E6] rounded-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead className="bg-[#F8F9FA] border-b border-[#DEE2E6]">
            <tr className="text-[11px] font-black text-[#495057] uppercase tracking-wider">
              <th className="px-4 py-3 text-center w-12">S.No</th>
              <th className="px-4 py-3">Emp ID</th>
              <th className="px-4 py-3">Employee Name</th>
              <th className="px-4 py-3">Email Address</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Designation</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3">Created At</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#DEE2E6]">
            {currentItems.map((emp, index) => (
              <tr
                key={emp.id}
                className="hover:bg-slate-50 transition-colors group text-sm"
              >
                <td className="px-4 py-4 text-center font-bold text-slate-400">
                  {indexOfFirstItem + index + 1}
                </td>

                <td className="px-4 py-4 font-black text-[#0D6EFD]">
                  {emp.emp_id}
                </td>

                <td className="px-4 py-4">
                  <span className="font-bold text-slate-700">
                    {emp.name || "-"}
                  </span>
                </td>

                <td className="px-4 py-4 text-slate-600">{emp.email}</td>

                <td className="px-4 py-4 text-slate-600">{emp.department}</td>

                <td className="px-4 py-4 text-slate-600">
                  {emp.designation || "-"}
                </td>

                <td className="px-4 py-4 text-center">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-black border ${
                      emp.is_active
                        ? "bg-green-50 text-green-600 border-green-200"
                        : "bg-red-50 text-red-600 border-red-200"
                    }`}
                  >
                    {emp.is_active ? "ACTIVE" : "INACTIVE"}
                  </span>
                </td>

                <td className="px-4 py-4 text-slate-500 text-[10px] font-bold">
                  {new Date(emp.created_at).toLocaleString()}
                </td>

                <td className="px-4 py-4 text-right">
                  <div className="flex justify-end items-center gap-1">
                    {/* Edit */}
                    <button
                      onClick={() => onEdit(emp)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      title="Edit Employee"
                    >
                      <Edit3 size={15} />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(emp.id, emp.name)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                      title="Delete Employee"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {currentItems.length === 0 && (
              <tr>
                <td
                  colSpan="9"
                  className="px-4 py-10 text-center text-slate-400 italic"
                >
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-[#F8F9FA] px-6 py-3 border-t border-[#DEE2E6] flex items-center justify-between">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          Showing {employees.length > 0 ? indexOfFirstItem + 1 : 0} to{" "}
          {Math.min(indexOfLastItem, employees.length)} of {employees.length}{" "}
          employees
        </span>

        <div className="flex items-center gap-1">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="p-1.5 border border-[#DEE2E6] bg-white rounded disabled:opacity-40"
          >
            <ChevronLeft size={16} />
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 text-xs font-bold rounded border ${
                currentPage === i + 1
                  ? "bg-[#0D6EFD] text-white border-[#0D6EFD]"
                  : "bg-white text-slate-600 border-[#DEE2E6]"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="p-1.5 border border-[#DEE2E6] bg-white rounded disabled:opacity-40"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;
