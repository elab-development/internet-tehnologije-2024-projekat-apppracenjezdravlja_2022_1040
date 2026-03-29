
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import Input from "../components/Input";
import Button from "../components/Button";
import { myPatientId } from "../auth";

export default function EditMyChart() {
  const nav = useNavigate();
  const pid = myPatientId();

  const [first_name, setFirst] = useState("");
  const [last_name, setLast] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // 1) Učitaj trenutne vrednosti
  useEffect(() => {
    if (!pid) { nav("/"); return; }
    (async () => {
      try {
        const res = await api.get(`/patients/${pid}`);
        const p = res?.data || {};
        setFirst(p.first_name || "");
        setLast(p.last_name || "");
        setDob(p.dob || "");
        setGender(p.gender || "");
        setAddress(p.address || "");
        setPhone(p.phone || "");
      } catch (e) {
        setErr("Ne mogu da učitam karton.");
      } finally {
        setLoading(false);
      }
    })();
  }, [pid, nav]);

  // 2) Snimi izmene
  async function handleSave(e) {
    e.preventDefault();
    setErr("");
    try {
      const payload = { first_name, last_name, dob, gender, address, phone };
      await api.put("/me/patient", payload);
      nav(`/patients/${pid}`);
    } catch (err) {
      const m = err?.response?.data?.message || "Greška pri čuvanju izmena.";
      setErr(m);
    }
  }

  if (loading) return <div className="container center"><p>Učitavanje...</p></div>;

  return (
    <div className="container center" style={{ maxWidth: 560 }}>
      <h1>Uredi moj karton</h1>
      <form onSubmit={handleSave}>
        <Input label="Ime" value={first_name} onChange={(e)=>setFirst(e.target.value)} />
        <Input label="Prezime" value={last_name} onChange={(e)=>setLast(e.target.value)} />
        <Input label="Datum rođenja" type="date" value={dob} onChange={(e)=>setDob(e.target.value)} />

        <div className="field">
          <label className="label">Pol</label>
          <select className="input" value={gender} onChange={(e)=>setGender(e.target.value)}>
            <option value="">(odaberi)</option>
            <option value="male">muški</option>
            <option value="female">ženski</option>
            <option value="other">drugo</option>
          </select>
        </div>

        <Input label="Adresa" value={address} onChange={(e)=>setAddress(e.target.value)} />
        <Input label="Telefon" value={phone} onChange={(e)=>setPhone(e.target.value)} />

        {err && <p style={{ color: "#dc2626" }}>{err}</p>}
        <Button type="submit">Sačuvaj</Button>
      </form>
    </div>
  );
}