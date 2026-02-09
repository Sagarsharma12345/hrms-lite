import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { setAccessToken } from "../store/authSlice";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!form.username || !form.password) {
      toast.error("Both fields are required");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/api/login/", form);
      toast.success("Login successful!");
      dispatch(setAccessToken(res.data.access));
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.error || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light px-3">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "400px", borderRadius: "1rem" }}>
        <h3 className="text-center mb-4">Admin Login</h3>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter username"
            className="form-control"
            value={form.username}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 position-relative">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Enter password"
            className="form-control" // add padding-right for the icon
            value={form.password}
            onChange={handleChange}
          />
          <span
            className="position-absolute top-50 end-0 translate-middle-y pt-4"
            style={{ cursor: "pointer", paddingRight: "20px" }}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          className="btn btn-primary w-100 mt-3"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
