
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container center">
      <h1>404</h1>
      <p>Stranica nije pronađena.</p>
      <Link className="nav-link" to="/">Vrati se na početnu</Link>
    </div>
  );
}