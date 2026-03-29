import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api";
import Button from "../components/Button";
import { isPatient, myPatientId } from "../auth";
import { isDoctor } from "../auth";
import { useNavigate } from "react-router-dom";

export default function PatientDetails() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

async function handleDelete() {
  const ok = window.confirm("Da li sigurno želiš da obrišeš ovaj karton? Ova akcija je nepovratna.");
  if (!ok) return;
  try {
    await api.delete(`/patients/${id}`);
    alert("Karton je obrisan.");
    navigate("/patients"); // lista pacijenata
  } catch (e) {
    const msg = e?.response?.data?.message || "Brisanje nije uspelo.";
    alert(msg);
  }
}

  useEffect(() => {
    async function fetchPatient() {
      try {
        const res = await api.get(`/patients/${id}`);
        const data = res?.data?.data || res?.data;
        setPatient(data);
      } catch (err) {
        setErrMsg("Greška pri učitavanju podataka o pacijentu.");
      } finally {
        setLoading(false);
      }
    }
    fetchPatient();
  }, [id]);

  if (loading)
    return <div className="container center"><p>Učitavanje...</p></div>;
  if (errMsg)
    return <div className="container center"><p style={{ color: "#dc2626" }}>{errMsg}</p></div>;
  if (!patient)
    return <div className="container center"><p>Nema podataka.</p></div>;

  return (
    <div className="container center">
      <h1>{patient.first_name} {patient.last_name}</h1>
      <div className="card" style={{ textAlign: "left", maxWidth: "500px" }}>
       
        <p><strong>Datum rođenja:</strong> {patient.dob || "—"}</p>
        <p><strong>Pol:</strong> {patient.gender || "—"}</p>
        <p><strong>Adresa:</strong> {patient.address || "—"}</p>
        <p><strong>Telefon:</strong> {patient.phone || "—"}</p>
        <p><strong>Kreiran:</strong> {patient.created_at?.substring(0,10) || "—"}</p>
      </div>

      <div className="mt-12" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
  <Link className="nav-link" to={`/patients/${id}/encounters`}>
    Prikaži posete
  </Link>

 
  {isPatient() && String(myPatientId()) === String(id) && (
    <Link className="nav-link" to="/me/edit-chart">
      Uredi karton
    </Link>
  )}

  {isDoctor() && (
    <Button style={{ background: "#dc2626" }} onClick={handleDelete}>
      Obriši karton
    </Button>
  )}

  <Button onClick={() => window.history.back()}>Nazad</Button>
</div>
    </div>
  );
}