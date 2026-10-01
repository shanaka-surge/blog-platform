import { NavLink } from "react-router-dom";
import keycloak from "../keycloak";

export default function Navbar({ isAdmin }) {
  const name = keycloak.tokenParsed?.preferred_username;
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <span className="brand">Marginalia</span>
        <nav>
          <NavLink to="/" end>Blogs</NavLink>
          {isAdmin && <NavLink to="/admin/users">Users</NavLink>}
        </nav>
        <div className="who">
          <span>{name}{isAdmin && <em className="badge">admin</em>}</span>
          <button className="link" onClick={() => keycloak.logout({ redirectUri: window.location.origin })}>
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
