import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

function TurmasPage() {
  const { data: turmas = [], isLoading, isError, error } = useQuery({
    queryKey: ["turmas"],
    queryFn: async () => (await api.get("/turmas")).data,
  });

  return (
    <div style={{ padding: 20 }}>
      <h1>Lista de Turmas</h1>
      {isLoading && <p>Carregando...</p>}
      {isError && <p style={{color:'red'}}>Erro: {String(error?.message || 'Falha ao carregar')}</p>}
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
