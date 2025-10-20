
import { useParams } from "react-router-dom";

export default function PatientDetails() {
  const { id } = useParams();
  return (
    <div className="container center">
      <h1>Detalj pacijenta</h1>
      <p>ID: {id}</p>
      <p>(Ovde ćemo kasnije dohvatiti /api/patients/{id})</p>
    </div>
  );
}