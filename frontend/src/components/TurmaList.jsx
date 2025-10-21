import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

export default function TurmaList() {
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    api.get("/turmas").then((res) => setTurmas(res.data));
  }, []);

  return (
    <div>
      <h2>Lista de Turmas</h2>
      <ul>
        {turmas.map((t) => (
          <li key={t.id}>
            <Link to={`/turmas/${t.id}`}>
              {t.codigo ? `${t.codigo} — ` : ""}
              {t.ano}/{t.periodo} — {t.disciplinaNome} (Prof. {t.professorNome})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
