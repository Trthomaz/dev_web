import React from 'react';
import { useInscricaoStore } from '../store';
import { useQuery } from '@tanstack/react-query';
import { useApi } from '../hooks/useApi';

export function Paginacao() {
  const { turmaId, page, pageSize, setPage, filtro } = useInscricaoStore();
  const { get } = useApi();
  const { data } = useQuery({
    queryKey: ['turma', { turmaId }],
    queryFn: get(`/turmas/${turmaId}`),
    enabled: !!turmaId,
  });
  if (!turmaId) return null;
  let alunos = data?.alunos ?? [];
  if (filtro) alunos = alunos.filter(a => a.nome.toLowerCase().includes(filtro.toLowerCase()));
  const pages = Math.max(1, Math.ceil(alunos.length / pageSize));
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>Anterior</button>
      <span>Página {page} de {pages}</span>
      <button onClick={() => setPage(Math.min(pages, page + 1))} disabled={page === pages}>Próxima</button>
    </div>
  );
}