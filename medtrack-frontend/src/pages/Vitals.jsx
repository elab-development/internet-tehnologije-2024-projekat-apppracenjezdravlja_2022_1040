import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api";
import Card from "../components/Card";
import Button from "../components/Button";
import { isDoctor } from "../auth";

export default function Vitals() {
  const { id } = useParams(); // encounter id
  const [vitals, setVitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  // forma
  const [temperature, setTemperature] = useState("");
  const [pulse, setPulse] = useState("");
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [respiration, setRespiration] = useState("");
  const [saturation, setSaturation] = useState("");

  const norm = (p) =>
    Array.isArray(p) ? p : Array.isArray(p?.data) ? p.data : [];

  async function loadVitals() {
    setLoading(true);
    setErrMsg("");
    try {
      const res = await api.get(`/encounters/${id}/vital-signs`);
      setVitals(norm(res.data));
    } catch (err) {
      setErrMsg("Greška pri učitavanju vitalnih znakova.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadVitals();
    
  }, [id]);

  async function handleCreate(e) {
    e.preventDefault();
    setErrMsg("");
    try {
      
      const payload = {};
      if (temperature !== "") payload.temperature = Number(temperature);
      if (pulse !== "") payload.pulse = Number(pulse);
      if (systolic !== "") payload.systolic = Number(systolic);
      if (diastolic !== "") payload.diastolic = Number(diastolic);
      if (respiration !== "") payload.respiration = Number(respiration);
      if (saturation !== "") payload.saturation = Number(saturation);


      if (Object.keys(payload).length === 0) {
        setErrMsg("Unesi bar jedno polje vitalnih znakova.");
        return;
      }

      await api.post(`/encounters/${id}/vital-signs`, payload);
      
      setTemperature("");
      setPulse("");
      setSystolic("");
      setDiastolic("");
      setRespiration("");
      setSaturation("");
      await loadVitals();
      alert("Vitalni znaci su dodati.");
    } catch (err) {
      console.error("Vital create error:", err?.response || err);
      const data = err?.response?.data;
      const msg =
        data?.message ||
        (data?.errors && Object.values(data.errors).flat().join(" | ")) ||
        "Greška pri dodavanju vitalnih znakova.";
      setErrMsg(msg);
    }
  }

  if (loading) return <div className="container center"><p>Učitavanje...</p></div>;

  return (
    <div className="container center">
      <h1>Vitalni znaci — Encounter #{id}</h1>

      {/* Forma */}
      {isDoctor() && (
      <div className="card" style={{ maxWidth: 680, marginTop: 12, marginBottom: 12 }}>
        <h3 style={{ marginTop: 0 }}>Dodaj vitalne znakove</h3>
        <form onSubmit={handleCreate}>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: 12 }}>
            <div className="field">
              <label className="label">Temperatura (°C)</label>
              <input className="input" type="number" step="0.1" value={temperature} onChange={(e) => setTemperature(e.target.value)} placeholder="npr. 36.8" />
            </div>
            <div className="field">
              <label className="label">Puls (bpm)</label>
              <input className="input" type="number" step="1" value={pulse} onChange={(e) => setPulse(e.target.value)} placeholder="npr. 75" />
            </div>
            <div className="field">
              <label className="label">Sistolički (mmHg)</label>
              <input className="input" type="number" step="1" value={systolic} onChange={(e) => setSystolic(e.target.value)} placeholder="npr. 120" />
            </div>
            <div className="field">
              <label className="label">Dijastolički (mmHg)</label>
              <input className="input" type="number" step="1" value={diastolic} onChange={(e) => setDiastolic(e.target.value)} placeholder="npr. 80" />
            </div>
            <div className="field">
              <label className="label">Disanje (resp/min)</label>
              <input className="input" type="number" step="1" value={respiration} onChange={(e) => setRespiration(e.target.value)} placeholder="npr. 16" />
            </div>
            <div className="field">
              <label className="label">Saturacija (%)</label>
              <input className="input" type="number" step="1" value={saturation} onChange={(e) => setSaturation(e.target.value)} placeholder="npr. 98" />
            </div>
          </div>

          {errMsg && <p style={{ color: "#dc2626", marginTop: 8 }}>{errMsg}</p>}
          <Button type="submit" style={{ marginTop: 8 }}>Sačuvaj</Button>
        </form>
      </div>
      )}

      {/* Lista */}
      {vitals.length === 0 ? (
        <p>Nema unosa vitalnih znakova.</p>
      ) : (
        <div className="grid mt-12">
          {vitals.map((v) => (
            <Card
              key={v.id}
              title={`Temp: ${v.temperature ?? "—"}°C  •  Puls: ${v.pulse ?? "—"} bpm`}
              description={[
                (v.systolic != null && v.diastolic != null) ? `TA: ${v.systolic}/${v.diastolic} mmHg` : null,
                (v.respiration != null) ? `Disanje: ${v.respiration}/min` : null,
                (v.saturation != null) ? `SpO2: ${v.saturation}%` : null,
                v.created_at ? `Zabeleženo: ${v.created_at}` : null
              ].filter(Boolean).join(" • ")}
            />
          ))}
        </div>
      )}

      <div className="mt-12" style={{ display: "flex", gap: 8 }}>
        <Link className="nav-link" to="/patients">⟵ Nazad na pacijente</Link>
      </div>
    </div>
  );
}