
import { useParams } from "react-router-dom";

export default function Vitals() {
  const { id } = useParams(); // id posete
    <div className="container center">
      <h1>Vitalni znaci</h1>
      <p>Encounter ID: {id}</p>
      <p>(Kasnije: /api/encounters/{id}/vital-signs)</p>
    </div>
  );
}