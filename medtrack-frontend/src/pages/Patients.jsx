import { useState, useEffect, useMemo } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Patients() {
   const initial = useMemo(() => [
    { id: 1, first_name: "Petar", last_name: "Petrović", gender: "male", dob: "1987-01-01" },
    { id: 2, first_name: "Jovana", last_name: "Jovanović", gender: "female", dob: "1992-06-12" },
  ], []);

  const [q, setQ] = useState("");
  const [list, setList] = useState(initial);

  useEffect(() => {
    const t = setTimeout(() => {
      const s = q.trim().toLowerCase();
      if (!s) { setList(initial); return; }
      setList(
        initial.filter(p =>
          (`${p.first_name} ${p.last_name}`).toLowerCase().includes(s) ||
          (p.gender || "").toLowerCase().includes(s) ||
          (p.dob || "").toLowerCase().includes(s)
        )
      );
    }, 250);
    return () => clearTimeout(t);
  }, [q, initial]);

  return (
    <div className="container center">
      <h1>Pacijenti</h1>
      <p>lista</p>

      <div style={{ maxWidth: 420 }}>
        <Input label="Pretraga" placeholder="Ime, pol, datum rođenja..."
               value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      <div className="grid mt-12">
        {list.map((p) => (
          <Card
            key={p.id}
            title={`${p.first_name} ${p.last_name}`}
            description={`Pol: ${p.gender} • Rođen/a: ${p.dob}`}
          >
            <Button onClick={() => alert(`Otvaram detalje za ${p.first_name} ${p.last_name}`)}>
              Detalji
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}