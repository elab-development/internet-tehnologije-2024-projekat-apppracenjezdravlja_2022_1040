import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { api } from "../api";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

 async function handleSubmit(e) {
  e.preventDefault();
  setErrMsg("");
  setLoading(true);
  try {
    const payload = {
      email: (email || "").trim(),
      password: (password || "").trim()
    };
    const res = await api.post("/login", payload);
    const token = res?.data?.access_token || res?.data?.token || res?.data?.data?.access_token;
    if (!token) throw new Error("Token nije vraćen iz API-ja.");
    localStorage.setItem("access_token", token);
    nav("/patients");
  } catch (err) {
    // prikaži poruku iz backenda ako postoji
    const msg = err?.response?.data?.message || err?.response?.data?.error || err?.message;
    setErrMsg(msg || "Prijava neuspešna. Proveri kredencijale.");
  } finally {
    setLoading(false);
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
      </form>
    </div>
  );
}