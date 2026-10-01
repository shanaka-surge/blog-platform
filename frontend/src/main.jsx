import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import keycloak from "./keycloak";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import "./styles.css";

// No <React.StrictMode>: its double-invoked effects break keycloak.init() in dev.
keycloak
  .init({
    onLoad: "check-sso",                 // render our own page instead of auto-redirecting
    pkceMethod: "S256",
    checkLoginIframe: false,
    silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
  })
  .then((authenticated) => {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    if (authenticated) {
      root.render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
    } else {
      root.render(<LoginPage />);
    }
  })
  .catch((e) => {
    document.getElementById("root").textContent =
      "Could not reach the login server. Is Keycloak running on " + import.meta.env.VITE_KEYCLOAK_URL + "?";
    console.error(e);
  });
EOF