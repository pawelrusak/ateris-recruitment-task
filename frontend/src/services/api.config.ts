import axios from "axios";

export const ACCESS_TOKEN = "access";
export const REFRESH_TOKEN = "refresh";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

/**
 * Attach access token
 */
api.interceptors.request.use((config) => {
  const access = localStorage.getItem(ACCESS_TOKEN);
  if (access) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

/**
 * Refresh on token_not_valid error
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) return Promise.reject(error);

    const status = error.response?.status;
    const code = error.response?.data?.code;

    const isAuthError = status === 401 && code === "token_not_valid";
    const isRefreshCall = originalRequest.url?.includes("/api/users/refresh/");

    if (!isAuthError || isRefreshCall) {
      return Promise.reject(error);
    }

    // Prevent infinite loops
    if (originalRequest._retry) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    const refresh = localStorage.getItem(REFRESH_TOKEN);
    if (!refresh) {
      localStorage.removeItem(ACCESS_TOKEN);
      return Promise.reject(error);
    }

    try {
      const refreshResponse = await axios.post(
        `${api.defaults.baseURL}/api/users/refresh/`,
        { refresh }
      );

      const newAccess = refreshResponse.data.access;
      localStorage.setItem(ACCESS_TOKEN, newAccess);

      originalRequest.headers = originalRequest.headers ?? {};
      originalRequest.headers.Authorization = `Bearer ${newAccess}`;

      return api(originalRequest);
    } catch (refreshError) {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      return Promise.reject(refreshError);
    }
  }
);

export default api;
