import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import HealthBadge from "./HealthBadge";
import LogoutButton from "./LogoutButton";

export default function NavBar() {
  const hasToken = !!localStorage.getItem("access_token");

  return (
    <nav className="nav">
      <div className="brand">MedTrack</div>
      <div className="nav-links">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/patients">Patients</Link>
        <Link className="nav-link" to="/reports/daily">Reports</Link>
        <Link className="nav-link" to="/health">Health</Link>
      </div>
      <div className="nav-links">
        <HealthBadge />
        <ThemeToggle />
        {hasToken ? (
          <LogoutButton />
        ) : (
          <Link className="nav-link" to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}