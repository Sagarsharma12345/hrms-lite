import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Database, LogOut, X, Users } from "lucide-react";

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
          className="fixed inset-0 bg-black/50 z-[100] md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-[#D5DBDB] z-[110] flex flex-col transition-transform duration-300 md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-14 bg-[#232F3E] flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-[#FF9900] w-7 h-7 rounded flex items-center justify-center font-black text-[#232F3E] text-sm">
              AP
            </div>
            <span className="text-white font-bold text-sm tracking-widest uppercase ">
              Admin Panel
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-white/70 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 py-4">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `w-full flex items-center px-6 py-3 text-[13px] font-bold transition-all border-l-4 ${isActive ? "bg-[#F1FAFF] text-[#0073BB] border-[#0073BB]" : "text-[#545B64] border-transparent hover:bg-[#F2F3F3]"}`
              }
            >
              <span className="mr-4">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
