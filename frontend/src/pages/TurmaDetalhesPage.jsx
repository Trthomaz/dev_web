import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

function TurmaDetalhesPage() {
  const { id } = useParams();
  const [turma, setTurma] = useState(null);

  useEffect(() => {
    api.get(`/turmas/${id}`)
      .then(response => setTurma(response.data))
      .catch(error => console.error("Erro ao carregar detalhes da turma:", error));
  }, [id]);

  if (!turma) {
    return <div>Carregando...</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Detalhes da Turma</h1>
      <p><strong>Ano:</strong> {turma.ano}</p>
      <p><strong>Período:</strong> {turma.periodo}</p>
      <p><strong>Disciplina:</strong> {turma.disciplinaNome}</p>
      <p><strong>Professor:</strong> {turma.professorNome}</p>
      <h2>Alunos Inscritos</h2>
      <ul>
        {turma.alunos?.map(aluno => (
          <li key={aluno.id}>{aluno.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default TurmaDetalhesPage;
