import axios from "axios";
import store from "../store/store";
const API = axios.create({
  // baseURL: "http://127.0.0.1:8000",
  baseURL: "https://backend.hrms.buynreadbooks.com",
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const access = store.getState().auth.accessToken;
    if (access) {
      config.headers["Authorization"] = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const refreshRes = await axios.post("https://backend.hrm.hypertonic.co.in/", {}, { withCredentials: true });
        const newAccess = refreshRes.data.access;
        store.dispatch({
          type: "auth/setAccessToken",
          payload: newAccess,
        });

        original.headers["Authorization"] = `Bearer ${newAccess}`;
        return API(original);

      } catch (refreshError) {
        store.dispatch({ type: "auth/logout" });
      }
    }

    return Promise.reject(err);
  }
);

export default API;
