import axios from "axios";

export const TOKEN_STORAGE_KEY = "anrf_jwt_token";
export const USER_STORAGE_KEY = "anrf_auth_user";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

/** Base server origin (e.g. "http://localhost:5000") for resolving /uploads/... paths */
export const SERVER_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

export function resolveBackendUrl(url?: string | null): string {
  if (!url) return "";
  if (url === "#" || url.startsWith("http://") || url.startsWith("https://") || url.startsWith("blob:") || url.startsWith("data:")) {
    return url;
  }
  return `${SERVER_ORIGIN}${url.startsWith("/") ? "" : "/"}${url}`;
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach the JWT token from localStorage to the Authorization header
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
    }
    const message =
      error.response?.data?.message || error.message || "Request failed.";
    return Promise.reject(new Error(message));
  },
);
