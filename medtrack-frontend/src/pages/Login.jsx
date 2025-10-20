import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("access_token", "mock-token");
    alert(`Pokušaj prijave:
Email: ${email}
Lozinka: ${password}`);
    nav("/patients");
  }

  return (
    <div className="container center" style={{ maxWidth: 420 }}>
      <h2>Prijava</h2>
      <form onSubmit={handleSubmit}>
        <Input label="Email" type="email" placeholder="osoba@primer.com"
               value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label="Lozinka" type="password" placeholder="Unesite lozinku"
               value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit">Uloguj se</Button>
      </form>
    </div>
  );
}