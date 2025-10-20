
import { useParams } from "react-router-dom";

export default function Encounters() {
  const { id } = useParams(); // id pacijenta
  return (
    <div className="container center">
      <h1>Susreti pacijenta</h1>
      <p>Pacijent ID: {id}</p>
      <p>(Kasnije: /api/patients/{id}/encounters)</p>
    </div>
  );
}