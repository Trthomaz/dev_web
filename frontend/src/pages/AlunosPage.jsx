import { useEffect, useState } from "react";
import api from "../api/api";

function AlunosPage() {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    api.get("/alunos")
      .then(response => setAlunos(response.data))
      .catch(error => console.error("Erro ao carregar alunos:", error));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Lista de Alunos</h1>
      <ul>
        {alunos.map(aluno => (
          <li key={aluno.id}>
            {aluno.nome} ({aluno.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlunosPage;
