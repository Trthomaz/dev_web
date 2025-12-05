import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '../hooks/useApi';
import { useInscricaoStore, useAuthStore } from '../store';
import { getErrorMessage } from '../utils/errorMessage';

export function TabelaDeAlunosPorTurma() {
  const { turmaId, filtro, page, pageSize } = useInscricaoStore();
  const { get, del } = useApi();
  const qc = useQueryClient();
  const { role } = useAuthStore();
  const { data } = useQuery({
    queryKey: ['turma', { turmaId }],
    queryFn: get(`/turmas/${turmaId}`),
    enabled: !!turmaId,
  });
  const [serverError, setServerError] = React.useState(null);
  const removeMut = useMutation({
    // Accept a URL so we can delete by inscricaoId or by turma+aluno
    mutationFn: async (url) => await del(url)(),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['turma', { turmaId }] }),
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
  const handleRemove = async (aluno) => {
    setServerError(null);
    try {
      let url;
      if (aluno?.inscricaoId && !Number.isNaN(Number(aluno.inscricaoId))) {
        url = `/inscricoes/${aluno.inscricaoId}`;
      } else if (turmaId && aluno?.id) {
        // Fallback route: delete by turma+aluno quando o id da inscrição não estiver disponível
        url = `/inscricoes?turmaId=${turmaId}&alunoId=${aluno.id}`;
      } else {
        setServerError('Não foi possível identificar a inscrição para remoção.');
        return;
      }
      await removeMut.mutateAsync(url);
    } catch (e) {
      const status = e?.response?.status;
      if (status === 401 || status === 403) {
        // Interceptor já redireciona e define a mensagem correta; não abrir dialog
        return;
      }
      setServerError(getErrorMessage(e, { context: 'alunos', action: 'delete' }));
    }
  };

  return (
    <div>
      <p>Total filtrado: {total}</p>
      <table border='1' cellPadding='6'>
        <thead><tr><th>ID</th><th>Nome</th><th>CPF</th><th>Ações</th></tr></thead>
        <tbody>
          {slice.map(a => (
            <tr key={a.id}>
              <td>{a.id}</td><td>{a.nome}</td><td>{a.cpf ?? '-'}</td>
              <td>
                <button onClick={() => handleRemove(a)} disabled={removeMut.isPending}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {serverError && (
        <p style={{ color: 'crimson', marginTop: 8 }}>{serverError}</p>
      )}
    </div>
  );
}