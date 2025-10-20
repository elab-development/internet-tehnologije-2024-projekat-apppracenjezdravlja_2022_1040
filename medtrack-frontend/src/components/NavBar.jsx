import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import HealthBadge from "./HealthBadge";

export default function NavBar() {
  return (
    <nav className="nav">
      <div className="brand">MedTrack</div>
      <div className="nav-links">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/patients">Patients</Link>
        <Link className="nav-link" to="/login">Login</Link>
      </div>
      <div className="nav-links">
        <HealthBadge />
        <ThemeToggle />
      </div>
    </nav>
  );
}