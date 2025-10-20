import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    
    alert('Pokušaj prijave:\nEmail: ${email}\nLozinka: ${password}');
  }

  return (
    <div style={{ maxWidth: 360, margin: "60px auto" }}>
      <h2>Prijava</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          placeholder="petar@primer.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Lozinka"
          type="password"
          placeholder="Unesite lozinku"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Uloguj se</Button>
      </form>
    </div>
  );
}