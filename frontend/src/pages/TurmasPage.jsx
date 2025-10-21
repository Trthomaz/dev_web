import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

function TurmasPage() {
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    api.get("/turmas")
      .then(response => setTurmas(response.data))
      .catch(error => console.error("Erro ao carregar turmas:", error));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Lista de Turmas</h1>
      <ul>
        {turmas.map(t => (
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

export default TurmasPage;
