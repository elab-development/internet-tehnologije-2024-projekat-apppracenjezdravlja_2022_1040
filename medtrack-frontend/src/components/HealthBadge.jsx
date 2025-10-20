import { useEffect, useState } from "react";

export default function HealthBadge() {
  const [status, setStatus] = useState("checking");

  async function ping() {
    try {
      const res = await fetch("http://localhost:8000/api/health");
      const data = await res.json();
     
      setStatus(data?.status === "ok" ? "ok" : "down");
    } catch {
      setStatus("down");
    }
  }

  useEffect(() => {
    ping();
    const t = setInterval(ping, 10000); // na 10s
    return () => clearInterval(t);
  }, []);

  if (status === "checking") return <span className="badge">checking...</span>;
  if (status === "ok") return <span className="badge ok">health: ok</span>;
  return <span className="badge down">health: down</span>;
}