import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '../hooks/useApi';
import { useAuthStore } from '../store';
import { getErrorMessage } from '../utils/errorMessage';

export function AlunosListPage() {
  const { get, del } = useApi();
  const qc = useQueryClient();
  const { role } = useAuthStore();
  const { data, isLoading, error } = useQuery({
    queryKey: ['alunos'],
    queryFn: get('/alunos'),
  });
  const [serverError, setServerError] = React.useState(null);
  const removeMut = useMutation({
    mutationFn: async (id) => await del(`/alunos/${id}`)(),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['alunos'] }),
  });

  const handleRemove = async (aluno) => {
    setServerError(null);
    try {
      await removeMut.mutateAsync(aluno.id);
    } catch (e) {
      const status = e?.response?.status;
      if (status === 401 || status === 403) {
        // Interceptor já redireciona e define a mensagem correta
        return;
      }
      setServerError(getErrorMessage(e, { context: 'alunos', action: 'delete' }));
    }
  };

  if (isLoading) return <p>Carregando alunos...</p>;
  if (error) return <p>Erro ao carregar alunos.</p>;

  const alunos = Array.isArray(data) ? data : data?.content || [];

  return (
    <div className='container'>
      <h2 className='title'>Alunos Cadastrados</h2>
      {serverError && <p style={{ color: 'crimson', marginBottom: 8 }}>{serverError}</p>}
      {alunos.length === 0 ? (
        <p>Nenhum aluno cadastrado.</p>
      ) : (
        <table border='1' cellPadding='8' style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>CPF</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.nome}</td>
                <td>{a.email}</td>
                <td>{a.cpf ?? '—'}</td>
                <td>
                  <button
                    onClick={() => handleRemove(a)}
                    disabled={removeMut.isPending}
                    style={{ padding: '0.4rem 0.8rem' }}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
