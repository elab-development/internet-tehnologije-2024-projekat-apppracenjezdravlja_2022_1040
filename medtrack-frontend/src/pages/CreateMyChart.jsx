import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import Input from "../components/Input";
import Button from "../components/Button";
import { isPatient, myPatientId } from "../auth";
import { Link } from "react-router-dom";

export default function CreateMyChart() {
  const [first_name, setFirst] = useState("");
  const [last_name, setLast] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState(""); // YYYY-MM-DD
  const [err, setErr] = useState("");
  const nav = useNavigate();

  async function handleCreate(e) {
    e.preventDefault();
    setErr("");
    try {
      const payload = { first_name, last_name, gender, dob };
      // pošalji samo popunjena polja
      Object.keys(payload).forEach(k => (payload[k] === "" || payload[k] == null) && delete payload[k]);

      const res = await api.post("/me/patient", payload);
      // osveži localStorage patient_id iz /me
      try {
        const me = await api.get("/me");
        if (me?.data?.patient_id != null) {
          localStorage.setItem("patient_id", String(me.data.patient_id));
        }
      } catch (_) {}
      // vodi na svoj karton
      const pid = localStorage.getItem("patient_id");
      nav(pid ? `/patients/${pid}` : "/");
    } catch (err) {
      const m = err?.response?.data?.message || "Neuspešno kreiranje kartona.";
      setErr(m);
    }
  }

  return (
    <div className="container center" style={{ maxWidth: 560 }}>
      <h1>Kreiraj moj karton</h1>
      <p>Popuni osnovne podatke (opciono) i potvrdi.</p>
      <form onSubmit={handleCreate}>
        <Input label="Ime" value={first_name} onChange={(e)=>setFirst(e.target.value)} />
        <Input label="Prezime" value={last_name} onChange={(e)=>setLast(e.target.value)} />
        <div className="field">
          <label className="label">Pol</label>
          <select className="input" value={gender} onChange={e=>setGender(e.target.value)}>
           
            <option value="male">muški</option>
            <option value="female">ženski</option>
         
          </select>
        </div>
        <Input label="Datum rođenja" type="date" value={dob} onChange={(e)=>setDob(e.target.value)} />
        {err && <p style={{ color: "#dc2626" }}>{err}</p>}
        <Button type="submit">Kreiraj</Button>
      </form>
    </div>
  );
}