import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

function TurmaDetalhesPage() {
  const { id } = useParams();
  const { data: turma, isLoading, isError, error } = useQuery({
    queryKey: ["turma", { id }],
    queryFn: async () => (await api.get(`/turmas/${id}`)).data,
  });

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div style={{color:'red'}}>Erro: {String(error?.message || 'Falha ao carregar')}</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Detalhes da Turma</h1>
      {turma.codigo && (
        <p><strong>Código:</strong> {turma.codigo}</p>
      )}
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
