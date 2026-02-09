import "./component.css";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Sidebar({ isOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await API.post("/api/logout/");
    } catch (err) {
      console.warn("Logout API failed");
    }

    dispatch(logout());
    navigate("/login");
  };

  return (
    <aside id="sidebar" className={isOpen ? "sidebar-open" : ""}>
      <div id="sidebar-header">
        <h5>HRMS Panel</h5>
      </div>

      <nav id="sidebar-menu">
        <Link to="/dashboard" className="sidebar-link">Dashboard</Link>
        <Link to="/employees" className="sidebar-link">Employees</Link>
        <Link to="/attendance" className="sidebar-link">Attendance</Link>
        <Link onClick={handleLogout} className="sidebar-link">Logout</Link>
      </nav>
    </aside>
  );
}
