import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Encounters() {
  const { id } = useParams(); // ID pacijenta
  const navigate = useNavigate();

  const [encounters, setEncounters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  // Forma za KREIRANJE susreta
  const [visitTime, setVisitTime] = useState(""); // "2025-10-21T14:30"
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");

  const norm = (payload) =>
    Array.isArray(payload) ? payload :
    Array.isArray(payload?.data) ? payload.data : [];

  async function loadEncounters() {
    setLoading(true);
    setErrMsg("");
    try {
      const res = await api.get(`/patients/${id}/encounters`);
      setEncounters(norm(res.data));
    } catch (err) {
      setErrMsg("Greška pri učitavanju susreta.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEncounters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // helper: frontend value iz <input type="datetime-local"> pretvori u "Y-m-d H:i:s"
  function toSqlDateTime(v) {
    if (!v) return "";
    // "2025-10-21T14:30" -> "2025-10-21 14:30:00"
    return v.replace("T", " ") + ":00";
  }

  async function handleCreate(e) {
    e.preventDefault();
    setErrMsg("");
    try {
      const payload = {
        visit_time: toSqlDateTime(visitTime),
        type: (type || "").trim(),
        notes: (notes || "").trim(),
        status: (status || "").trim(),
        // user_id: backend obično sam popuni iz auth korisnika; dodaj ako ti je potrebno
      };
      await api.post(`/patients/${id}/encounters`, payload);
      // Očisti formu i osveži listu
      setVisitTime("");
      setType("");
      setNotes("");
      setStatus("");
      await loadEncounters();
      alert("Susret je dodat.");
    } catch (err) {
  const data = err?.response?.data;
  const msg =
    data?.message ||
    (data?.errors && Object.values(data.errors).flat().join(" | ")) ||
    "Greška pri kreiranju susreta.";
  setErrMsg(msg);
}
  }

  if (loading) {
    return <div className="container center"><p>Učitavanje susreta...</p></div>;
  }

  return (
    <div className="container center">
      <h1>Susreti pacijenta #{id}</h1>

      {/* Forma za dodavanje susreta */}
      <div className="card" style={{ maxWidth: 600, marginTop: 12, marginBottom: 12 }}>
        <h3 style={{ marginTop: 0 }}>Novi susret</h3>
        <form onSubmit={handleCreate}>
          <div className="field">
            <label className="label">Vreme posete</label>
            <input
              className="input"
              type="datetime-local"
              value={visitTime}
              onChange={(e) => setVisitTime(e.target.value)}
              required
            />
          </div>

          <div className="field">
  <label className="label">Tip susreta</label>
  <select
    className="input"
    value={type}
    onChange={(e) => setType(e.target.value)}
    required
  >
    <option value="">(odaberi)</option>
    <option value="visit">visit</option>
    <option value="telehealth">telehealth</option>
    <option value="emergency">emergency</option>
  </select>
</div>
          <div className="field">
  <label className="label">Status</label>
  <select
    className="input"
    value={status}
    onChange={(e) => setStatus(e.target.value)}
    required
  >
    <option value="">(odaberi)</option>
    <option value="open">open</option>
    <option value="closed">closed</option>
  </select>
</div>

          <div className="field">
            <label className="label">Beleške</label>
            <textarea
              className="input"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="kratke beleške..."
            />
          </div>

          {errMsg && <p style={{ color: "#dc2626" }}>{errMsg}</p>}
          <Button type="submit">Sačuvaj susret</Button>
        </form>
      </div>

      {/* Lista susreta */}
      {encounters.length === 0 ? (
        <p>Nema evidentiranih susreta.</p>
      ) : (
        <div className="grid mt-12">
          {encounters.map((e) => (
            <Card
              key={e.id}
              title={e.visit_time ? `Poseta: ${e.visit_time}` : `Susret #${e.id}`}
              description={[
                e.type ? `Tip: ${e.type}` : null,
                e.status ? `Status: ${e.status}` : null,
                e.notes ? `Beleške: ${e.notes}` : null,
              ].filter(Boolean).join(" • ")}
            >
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Button onClick={() => navigate(`/encounters/${e.id}/vitals`)}>Vitalni znaci</Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-12" style={{ display: "flex", gap: 8 }}>
        <Link className="nav-link" to={`/patients/${id}`}>⟵ Nazad na detalje pacijenta</Link>
        <Link className="nav-link" to="/patients">Pacijenti</Link>
      </div>
    </div>
  );
}