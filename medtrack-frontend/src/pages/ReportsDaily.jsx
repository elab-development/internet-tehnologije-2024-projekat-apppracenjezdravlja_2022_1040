import { useEffect, useMemo, useState } from "react";
import { api } from "../api";
import Button from "../components/Button";

export default function Reports() {
  const [days, setDays] = useState(7);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  async function load() {
    setLoading(true);
    setErrMsg("");
    try {
      const res = await api.get(`/stats/encounters/daily?days=${days}`);
      // očekujemo [{day:"2025-10-20", total: 3}, ...]
      setRows(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      const data = err?.response?.data;
      setErrMsg(data?.message || "Greška pri učitavanju izveštaja.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [days]);

  // max vrednost za skalu grafikona
  const max = useMemo(() => Math.max(1, ...rows.map(r => Number(r.total) || 0)), [rows]);

  return (
    <div className="container center">
      <h1>Izveštaji</h1>
      <p>Posete u (poslednjih {days} dana)</p>

      <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8, marginBottom: 8 }}>
        <span className="label">Opseg:</span>
        {[7, 14, 30].map(n => (
          <Button key={n} onClick={() => setDays(n)} style={days === n ? { opacity: 1 } : { opacity: .8 }}>
            {n} dana
          </Button>
        ))}
        <Button onClick={load} style={{ borderStyle: "dashed" }}>Osveži</Button>
      </div>

      {loading && <p>Učitavanje…</p>}
      {errMsg && <p style={{ color: "#dc2626" }}>{errMsg}</p>}

      {!loading && !errMsg && rows.length === 0 && <p>Nema podataka za izabrani period.</p>}

      {/* Mini bar chart bez biblioteka */}
      {!loading && rows.length > 0 && (
        <div style={{ marginTop: 16, border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, padding: 12 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${rows.length}, minmax(10px, 1fr))`,
              alignItems: "end",
              gap: 6,
              height: 160,
              padding: "10px 6px 0",
            }}
          >
            {rows.map(r => {
              const h = (Number(r.total) / max) * 120 + 20; // min visina da se vidi i 1
              return (
                <div key={r.day} style={{ display: "grid", gap: 6, justifyItems: "center" }}>
                  <div title={`${r.day}: ${r.total}`}
                       style={{
                         width: "100%",
                         height: h,
                         borderRadius: 8,
                         background: "linear-gradient(180deg, rgba(59,130,246,.9), rgba(59,130,246,.4))",
                       }} />
                  <small style={{ opacity: .7 }}>{r.total}</small>
                  <small style={{ opacity: .6 }}>{r.day.slice(5)}</small>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tabela */}
      {!loading && rows.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <table className="table">
            <thead>
              <tr><th>Dan</th><th>Broj susreta</th></tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.day}>
                  <td>{r.day}</td>
                  <td>{r.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}