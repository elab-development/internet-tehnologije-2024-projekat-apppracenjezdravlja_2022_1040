import Card from "../components/Card";
import Button from "../components/Button";

export default function Patients() {
  const samplePatients = [
    { id: 1, first_name: "Petar", last_name: "Petrović", gender: "male", dob: "1987-01-01" },
    { id: 2, first_name: "Jovana", last_name: "Jovanović", gender: "female", dob: "1992-06-12" },
  ];

  return (
    <div style={{ padding: 16 }}>
      <h1>Pacijenti</h1>
      <p>Za sada statična lista. Kasnije: GET /api/patients + search.</p>

      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
        {samplePatients.map((p) => (
          <Card
            key={p.id}
            title={`${p.first_name} ${p.last_name}`}
            description={'Pol: ${p.gender} • Rođen/a: ${p.dob}'}
          >
            <Button onClick={() => alert('Prikaz detalja za ${p.first_name} ${p.last_name}')}>
              Detalji
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}