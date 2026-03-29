
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Register() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErrMsg("");
    setLoading(true);

    try {
      // 1) Registracija (podrazumevano role='patient' na backendu)
      await api.post("/register", { name, email, password });

      // 2) Auto-login
      const loginRes = await api.post("/login", { email, password });
      const token = loginRes?.data?.access_token;
      localStorage.setItem("access_token", token);

      // 3) Učitaj /me (da znamo role i patient_id)
      const meRes = await api.get("/me");
      localStorage.setItem("role", meRes?.data?.role || "patient");
      localStorage.setItem("patient_id", String(meRes?.data?.patient_id || ""));

      alert("Uspešno ste se registrovali!");
      // 4) Preusmeri:
      const role = meRes?.data?.role || "patient";
      const pid = meRes?.data?.patient_id;
      if (role === "doctor") {
        nav("/patients");
      } else if (pid) {
        nav(`/patients/${pid}`);
      } else {
        nav("/patients");
      }
    } catch (err) {
      // Prikaži validacione poruke 422 ili poruku greške
      const data = err?.response?.data;
      const msg =
        data?.message ||
        (data?.errors && Object.values(data.errors).flat().join(" | ")) ||
        "Greška pri registraciji.";
      setErrMsg(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container center" style={{ maxWidth: 420 }}>
      <h1>Kreiraj nalog</h1>
      <p>Registracija za pacijente. Za doktore nalog kreira administrator.</p>

      <form onSubmit={handleSubmit} style={{ marginTop: 12 }}>
        <Input label="Ime i prezime" value={name} onChange={(e) => setName(e.target.value)} placeholder="npr. Petar Petrović" />
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="npr. petar@mail.com" />
        <Input label="Lozinka" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="min. 8 karaktera" />

        {errMsg && <p style={{ color: "#dc2626", marginTop: 6 }}>{errMsg}</p>}

        <Button type="submit" disabled={loading}>
          {loading ? "Slanje..." : "Registruj se"}
        </Button>
      </form>

      <p style={{ marginTop: 12 }}>
        Već imate nalog? <Link to="/login">Ulogujte se</Link>
      </p>
    </div>
  );
}