// const BASE_URL = "http://127.0.0.1:8000/api";
const BASE_URL = "https://backend.hrms.trafficvenue.co.in/api";

// ================= FETCH WRAPPER =================

const fetchAPI = async (url, options = {}) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    let errorData = {};
    try {
      errorData = await res.json();
    } catch {}

    const error = new Error(errorData.message || "API request failed");
    error.data = errorData;
    throw error;
  }

  return res.json();
};

// ================= API SERVICE =================

export const apiService = {
  // ================= EMPLOYEES =================

  fetchEmployees: () => fetchAPI(`${BASE_URL}/employees/`),

  getEmployee: (id) => fetchAPI(`${BASE_URL}/employees/${id}/`),

  createEmployee: (data) =>
    fetchAPI(`${BASE_URL}/employees/`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateEmployee: (id, data) =>
    fetchAPI(`${BASE_URL}/employees/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteEmployee: (id) =>
    fetchAPI(`${BASE_URL}/employees/${id}/`, {
      method: "DELETE",
    }),

  // ================= ATTENDANCE =================

  fetchAttendance: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url = query
      ? `${BASE_URL}/attendance/?${query}`
      : `${BASE_URL}/attendance/`;

    return fetchAPI(url);
  },

  getAttendance: (id) => fetchAPI(`${BASE_URL}/attendance/${id}/`),

  createAttendance: (data) =>
    fetchAPI(`${BASE_URL}/attendance/`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateAttendance: (id, data) =>
    fetchAPI(`${BASE_URL}/attendance/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteAttendance: (id) =>
    fetchAPI(`${BASE_URL}/attendance/${id}/`, {
      method: "DELETE",
    }),
};
