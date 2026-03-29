export default function Home() {
  return (
    <div
      className="container center"
      style={{
        maxWidth: "700px",
        lineHeight: 1.6,
        padding: "20px",
        textAlign: "center"
      }}
    >
      <h1 style={{ fontSize: "28px", marginBottom: "16px" }}>
        Dobrodošli u MedTrack
      </h1>

      <p style={{ fontSize: "16px", marginBottom: "12px" }}>
        <strong>MedTrack</strong> je digitalna platforma za praćenje zdravstvenih
        podataka pacijenata. Omogućava jednostavno vođenje medicinskih kartona,
        pregled istorije poseta i beleženje vitalnih znakova.
      </p>

      <p style={{ fontSize: "16px", marginBottom: "8px" }}>
        Aplikacija je namenjena <strong>doktorima</strong> i{" "}
        <strong>pacijentima</strong>:
      </p>

      <ul
        style={{
          textAlign: "left",
          margin: "16px auto",
          maxWidth: "600px",
          fontSize: "15px",
          paddingLeft: "20px"
        }}
      >
        <li style={{ marginBottom: "6px" }}>
          Doktori mogu da pristupe listi pacijenata, dodaju nove posete i unose
          rezultate merenja.
        </li>
        <li>
          Pacijenti imaju mogućnost da pregledaju svoj karton, istoriju poseta i
          vitalne znake.
        </li>
      </ul>

      <p style={{ fontSize: "16px", marginBottom: "10px" }}>
        Cilj aplikacije je da omogući{" "}
        <strong>lakšu komunikaciju</strong> između pacijenata i lekara i da
        pojednostavi praćenje zdravstvenog stanja kroz vreme.
      </p>

      <p style={{ fontSize: "16px", marginBottom: "10px" }}>
        Za početak rada, prijavite se ili registrujte kao novi korisnik. Nakon
        prijave, sistem će vam automatski dodeliti ulogu pacijenta, dok su
        nalozi doktora dostupni administratorima.
      </p>

      <p
        style={{
          marginTop: "24px",
          fontStyle: "italic",
          color: "#555",
          fontSize: "14px"
        }}
      >
        Verzija aplikacije: 1.0 • Fakultet organizacionih nauka • Projekat ITEH
      </p>
    </div>
  );
}