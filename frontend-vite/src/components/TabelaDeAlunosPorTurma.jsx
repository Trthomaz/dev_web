import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useApi } from '../hooks/useApi';
import { useInscricaoStore } from '../store';

export function TabelaDeAlunosPorTurma() {
  const { turmaId, filtro, page, pageSize } = useInscricaoStore();
  const { get } = useApi();
  const { data } = useQuery({
    queryKey: ['turma', { turmaId }],
    queryFn: get(`/turmas/${turmaId}`),
    enabled: !!turmaId,
  });

  if (!turmaId) return <p>Selecione uma turma.</p>;

  let alunos = data?.alunos ?? [];
  if (filtro) {
    const f = filtro.toLowerCase();
    alunos = alunos.filter(a => a.nome.toLowerCase().includes(f));
  }
  const total = alunos.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const slice = alunos.slice(start, end);

  return (
    <div>
      <p>Total filtrado: {total}</p>
      <table border='1' cellPadding='6'>
        <thead><tr><th>ID</th><th>Nome</th><th>CPF</th></tr></thead>
        <tbody>
          {slice.map(a => (
            <tr key={a.id}>
              <td>{a.id}</td><td>{a.nome}</td><td>{a.cpf ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}