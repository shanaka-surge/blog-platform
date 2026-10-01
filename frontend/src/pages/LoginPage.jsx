import { useState } from "react";
import keycloak from "../keycloak";

export default function LoginPage() {
  const [busy, setBusy] = useState(null); // which button was clicked, for a loading state

  const go = (opts) => (e) => {
    e.preventDefault();
    setBusy(opts?.idpHint || "password");
    keycloak.login(opts);
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <h1 className="login-brand">Marginalia</h1>
        <p className="login-tagline">A quiet place to write and read.</p>

        <button className="primary wide" onClick={go()} disabled={!!busy}>
          {busy === "password" ? "Redirecting…" : "Log in"}
        </button>

        <div className="divider"><span>or continue with</span></div>

        <div className="social-row">
          <button className="ghost wide" onClick={go({ idpHint: "google" })} disabled={!!busy}>
            {busy === "google" ? "Redirecting…" : "Google"}
          </button>
          <button className="ghost wide" onClick={go({ idpHint: "github" })} disabled={!!busy}>
            {busy === "github" ? "Redirecting…" : "GitHub"}
          </button>
        </div>

        <p className="login-footnote">
          New here?{" "}
          <button className="link" onClick={go({ action: "register" })} disabled={!!busy}>
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
}