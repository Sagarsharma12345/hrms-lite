import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Database, X, Users } from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const menu = [
    { path: "/", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { path: "/employees", label: "Employees", icon: <Users size={18} /> },
    { path: "/attendance", label: "Attendance", icon: <Database size={18} /> },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 z-[100] md:hidden backdrop-blur-[2px]"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-[#E5E7EB] z-[110] flex flex-col transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header Section - Clean White Look */}
        <div className="h-14 bg-white border-b border-[#E5E7EB] flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3">
            {/* Logo Icon - Soft Grey/Black Background */}
            <div className="bg-[#1F2937] w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-[12px]">
              AP
            </div>
            <span className="text-[#111827] font-bold text-sm tracking-tight">
              Admin <span className="text-[#6B7280] font-medium">Panel</span>
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation - Minimalist List */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center px-4 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#F3F4F6] text-[#111827]" // Active: Light grey background, Dark text
                    : "text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#111827]" // Inactive: Dim text
                }`
              }
            >
              <span className="mr-3 opacity-80">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Small Detail */}
        <div className="p-4 border-t border-[#F3F4F6]">
          <div className="flex items-center gap-3 px-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider italic">
              System Live
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
