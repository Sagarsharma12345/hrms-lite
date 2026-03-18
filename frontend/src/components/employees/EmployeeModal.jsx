import React, { useState, useEffect } from "react";
import { X, Loader2, CheckCircle2, Circle, UserPlus } from "lucide-react";
import { apiService } from "../../services/api";
import toast from "react-hot-toast";

const EmployeeModal = ({ isOpen, onClose, onSuccess, editEmployee = null }) => {
  const [empId, setEmpId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("Engineering");
  const [designation, setDesignation] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editEmployee) {
      setEmpId(editEmployee.emp_id || "");
      setName(editEmployee.name || "");
      setEmail(editEmployee.email || "");
      setDepartment(editEmployee.department || "Engineering");
      setDesignation(editEmployee.designation || "");
      setIsActive(editEmployee.is_active ?? true);
    } else {
      setEmpId("");
      setName("");
      setEmail("");
      setDepartment("Engineering");
      setDesignation("");
      setIsActive(true);
    }
  }, [editEmployee, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!empId || !name || !email || !department || !designation) {
      toast.error("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const employeeData = {
        emp_id: empId.trim(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        department: department.trim(),
        designation: designation.trim(),
        is_active: isActive,
      };

      if (editEmployee) {
        await apiService.updateEmployee(editEmployee.id, employeeData);
        toast.success("Employee updated successfully");
      } else {
        await apiService.createEmployee(employeeData);
        toast.success("Employee created successfully");
      }

      onSuccess();
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
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#232F3E]/75 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-2xl rounded shadow-2xl overflow-hidden border border-slate-300 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#232F3E] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-indigo-500 rounded-sm">
              <UserPlus size={16} className="text-[#232F3E]" />
            </div>
            <h3 className="text-white font-black text-xs uppercase tracking-widest">
              {editEmployee ? "Update Resource" : "Register New Employee"}
            </h3>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="divide-y divide-slate-100">
          <div className="p-8 space-y-6">
            {/* Status */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
                Employment Status
              </label>

              <div className="col-span-2">
                <button
                  type="button"
                  onClick={() => setIsActive(!isActive)}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-sm text-[10px] font-black border ${
                    isActive
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-red-50 text-red-600 border-red-200"
                  }`}
                >
                  {isActive ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                  {isActive ? "ACTIVE RESOURCE" : "INACTIVE / ON LEAVE"}
                </button>
              </div>
            </div>

            {/* Employee ID */}
            <div className="grid grid-cols-3 gap-4">
              <label className="text-[11px] font-black text-slate-500 uppercase">
                Employee ID <span className="text-red-500">*</span>
              </label>

              <div className="col-span-2">
                <input
                  required
                  value={empId}
                  onChange={(e) => setEmpId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-2 text-sm"
                />
              </div>
            </div>

            {/* Name */}
            <div className="grid grid-cols-3 gap-4">
              <label className="text-[11px] font-black text-slate-500 uppercase">
                Full Name <span className="text-red-500">*</span>
              </label>

              <div className="col-span-2">
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-2 text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div className="grid grid-cols-3 gap-4">
              <label className="text-[11px] font-black text-slate-500 uppercase">
                Email Address <span className="text-red-500">*</span>
              </label>

              <div className="col-span-2">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-2 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <label className="text-[11px] font-black text-slate-500 uppercase">
                Designation <span className="text-red-500">*</span>
              </label>

              <div className="col-span-2">
                <input
                  required
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-2 text-sm"
                />
              </div>
            </div>

            {/* Department */}
            <div className="grid grid-cols-3 gap-4">
              <label className="text-[11px] font-black text-slate-500 uppercase">
                Department <span className="text-red-500">*</span>
              </label>

              <div className="col-span-2">
                <select
                  required
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-2 text-sm"
                >
                  <option value="" disabled>
                    Select Department
                  </option>
                  <option value="Engineering">Engineering</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                  <option value="Operations">Operations</option>
                  <option value="Customer Support">Customer Support</option>
                  <option value="Product Management">Product Management</option>
                  <option value="Quality Assurance">Quality Assurance</option>
                  <option value="DevOps">DevOps</option>
                  <option value="IT Support">IT Support</option>
                  <option value="Administration">Administration</option>
                  <option value="Business Development">
                    Business Development
                  </option>
                  <option value="Legal">Legal</option>
                  <option value="Procurement">Procurement</option>
                  <option value="Research & Development">
                    Research & Development
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-slate-50 px-8 py-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-black text-slate-400 uppercase tracking-wider px-4 py-2 border border-[#D5DBDB] rounded-sm hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              type="submit"
              className="bg-indigo-500  hover:bg-indigo-600 text-white font-black text-[11px] px-8 py-2 rounded-sm shadow-md flex items-center gap-2 uppercase transition-all"
            >
              {loading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : editEmployee ? (
                "Update Record"
              ) : (
                "Save Employee"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;
