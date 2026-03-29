import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { api } from "../api";
import { Link } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [err, setErr] = useState("");

 async function handleSubmit(e) {
  e.preventDefault();
  setErr("");

  try {
    // 1) Login
    const res = await api.post("/login", { email, password });

    // 2) Token
    const token = res?.data?.access_token;
    if (!token) throw new Error("Nema tokena u odgovoru");
    localStorage.setItem("access_token", token);

    // 3) /me — role + patient_id
    let role = res?.data?.role || "patient";
    let patientId = res?.data?.patient_id || "";

    try {
      const me = await api.get("/me");
      if (me?.data?.role) role = me.data.role;
      if (me?.data?.patient_id != null) patientId = me.data.patient_id;
    } catch (_) {
      // u redu je i ako padne; koristićemo podatke iz login response-a
    }

    // 4) Sačuvaj
    localStorage.setItem("role", role);
    localStorage.setItem("patient_id", String(patientId || ""));

    // 5) Napred
    nav("/patients");
  } catch (err) {
    const data = err?.response?.data;
    const msg =
      data?.message ||
      "Neuspešan login. Proveri email/lozinku ili backend.";
    setErr(msg); // <-- sada postoji setErr
  }
}async function handleSubmit(e) {
  e.preventDefault();
  setErr("");

  try {
    // 1) Login
    const res = await api.post("/login", { email, password });

    // 2) Token
    const token = res?.data?.access_token;
    if (!token) throw new Error("Nema tokena u odgovoru");
    localStorage.setItem("access_token", token);

    // 3) /me — role + patient_id
    let role = res?.data?.role || "patient";
    let patientId = res?.data?.patient_id || "";

    try {
      const me = await api.get("/me");
      if (me?.data?.role) role = me.data.role;
      if (me?.data?.patient_id != null) patientId = me.data.patient_id;
    } catch (_) {
      
    }

    // 4) Sačuvaj
    localStorage.setItem("role", role);
    localStorage.setItem("patient_id", String(patientId || ""));

    // 5) Napred
    nav("/patients");
  } catch (err) {
    const data = err?.response?.data;
    const msg =
      data?.message ||
      "Neuspešan login. Proveri email/lozinku ili backend.";
    setErr(msg); 
  }
}
  return (
    <div className="container center" style={{ maxWidth: 420 }}>
      <h2>Prijava</h2>
      <form onSubmit={handleSubmit}>
        <Input label="Email" type="email" placeholder="osoba@primer.com"
               value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label="Lozinka" type="password" placeholder="Unesite lozinku"
               value={password} onChange={(e) => setPassword(e.target.value)} />
        {errMsg && <p style={{ color: "#dc2626" }}>{errMsg}</p>}
        <Button type="submit" style={{ opacity: loading ? 0.7 : 1 }}>
          {loading ? "Prijavljivanje..." : "Uloguj se"}
        </Button>
        <p style={{ marginTop: 12 }}>
  Nemate nalog? <Link to="/register">Registrujte se</Link>
</p>
      </form>
    </div>
  );
}