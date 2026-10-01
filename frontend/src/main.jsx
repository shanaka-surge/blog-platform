import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import keycloak from "./keycloak";
import App from "./App";
import "./styles.css";

// No <React.StrictMode>: its double-invoked effects break keycloak.init() in dev.
keycloak
  .init({ onLoad: "login-required", pkceMethod: "S256", checkLoginIframe: false })
  .then((authenticated) => {
    if (!authenticated) return keycloak.login();
    ReactDOM.createRoot(document.getElementById("root")).render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  })
  .catch((e) => {
    document.getElementById("root").textContent =
      "Could not reach the login server. Is Keycloak running on " + import.meta.env.VITE_KEYCLOAK_URL + "?";
    console.error(e);
  });
