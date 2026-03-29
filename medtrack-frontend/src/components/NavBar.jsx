import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import HealthBadge from "./HealthBadge";
import LogoutButton from "./LogoutButton";
import { isDoctor, isPatient, myPatientId } from "../auth";

export default function NavBar() {
  const hasToken = !!localStorage.getItem("access_token");
  const pid = myPatientId();

  return (
    <nav className="nav">
      <div className="brand">MedTrack</div>

      <div className="nav-links">
        <Link className="nav-link" to="/">Početna</Link>

        {/* Samo doktor vidi listu pacijenata i izveštaje */}
        {hasToken && isDoctor() && (
          <>
            <Link className="nav-link" to="/patients">Pacijenti</Link>
            <Link className="nav-link" to="/reports">Izveštaji</Link>
          </>
        )}

        {/* Pacijent: ako nema karton -> link da ga kreira; ako ima -> link na svoj karton */}
        {hasToken && isPatient() && !pid && (
          <Link className="nav-link" to="/me/create-chart">Kreiraj moj karton</Link>
        )}
        {hasToken && isPatient() && pid && (
          <Link className="nav-link" to={`/patients/${pid}`}>Moj karton</Link>
        )}
        {hasToken && isPatient() && pid && (
  <>
    <Link className="nav-link" to={`/patients/${pid}`}>Moj karton</Link>
    <Link className="nav-link" to="/me/edit-chart">Uredi karton</Link>
  </>
)}
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