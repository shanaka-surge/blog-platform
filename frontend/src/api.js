import axios from "axios";
import keycloak from "./keycloak";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

// Attach a fresh access token to every request.
api.interceptors.request.use(async (config) => {
  try {
    await keycloak.updateToken(30); // refreshes if it expires within 30s
  } catch {
    keycloak.login(); // refresh token expired: send the user back to login
  }
  config.headers.Authorization = `Bearer ${keycloak.token}`;
  return config;
});

export const errorMessage = (err) =>
  err.response?.data?.message ||
  err.response?.data?.errors?.[0]?.defaultMessage ||
  (err.response?.status === 403 ? "You don't have permission to do that." : null) ||
  err.message ||
  "Something went wrong.";

export default api;
