import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

export default function TurmaDetalhes() {
  const { id } = useParams();
  const [turma, setTurma] = useState(null);

  useEffect(() => {
    api.get(`/turmas/${id}`).then((res) => setTurma(res.data));
  }, [id]);

  if (!turma) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Detalhes da Turma</h2>
      {turma.codigo && (
        <p><strong>Código:</strong> {turma.codigo}</p>
      )}
      <p><strong>Ano:</strong> {turma.ano}</p>
      <p><strong>Período:</strong> {turma.periodo}</p>
  <p><strong>Disciplina:</strong> {turma.disciplinaNome}</p>
  <p><strong>Professor:</strong> {turma.professorNome}</p>

      <h3>Alunos Inscritos</h3>
      <ul>
        {turma.alunos?.map((a) => (
          <li key={a.id}>{a.nome}</li>
        ))}
      </ul>
    </div>
  );
}
