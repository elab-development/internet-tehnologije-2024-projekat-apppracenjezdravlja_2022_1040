import { useState, useEffect } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import { api } from "../api"; 
import { getRole, myPatientId } from "../auth";
import { useNavigate } from "react-router-dom"; 

export default function Patients() {
  const [q, setQ] = useState("");
  const [list, setList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPatients() {
      try {
        const res = await api.get("/patients");
        const patients = res?.data?.data || res?.data || [];
        setList(patients);
        setFiltered(patients);
      } catch (err) {
        console.error("Greška pri učitavanju pacijenata:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPatients();
  }, []);

  // pretraga
  useEffect(() => {
    const timer = setTimeout(() => {
      const s = q.trim().toLowerCase();
      if (!s) {
        setFiltered(list);
        return;
      }
      setFiltered(
        list.filter((p) =>
          (`${p.first_name} ${p.last_name}`.toLowerCase().includes(s)) ||
          (p.gender || "").toLowerCase().includes(s) ||
          (p.dob|| "").toLowerCase().includes(s)
        )
      );
    }, 250);
    return () => clearTimeout(timer);
  }, [q, list]);

  useEffect(() => {
  // ako nije doktor, vodi ga direktno na sopstveni karton
  if (getRole() !== "doctor") {
    const pid = myPatientId();
    if (pid) {
      navigate(`/patients/${pid}`, { replace: true });
    }
  }
}, [navigate]);

  if (loading) return <div className="container center">Učitavanje pacijenata...</div>;

  return (
    <div className="container center">
      <h1>Pacijenti</h1>
     

      <div style={{ maxWidth: 420 }}>
        <Input
          label="Pretraga"
          placeholder="Ime, pol, datum rođenja..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="grid mt-12">
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <Card
              key={p.id}
              title={`${p.first_name} ${p.last_name}`}
              description={`Pol: ${p.gender} • Rođen/a: ${p.dob}`}
            >
              <Button onClick={() => navigate(`/patients/${p.id}`)}>Detalji</Button>
            </Card>
          ))
        ) : (
          <p>Nema rezultata.</p>
        )}
      </div>
    </div>
  );
}