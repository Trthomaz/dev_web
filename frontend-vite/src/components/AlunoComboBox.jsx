import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import { useInscricaoStore } from '../store';

export function AlunoComboBox() {
  const { turmaId, alunoId, setAluno } = useInscricaoStore();
  const { data } = useQuery({
    queryKey: ['alunos-nao-inscritos', { turmaId }],
    queryFn: async () => (await api.get(`/turmas/${turmaId}/alunos-nao-inscritos`)).data,
    enabled: !!turmaId,
  });
  return (
    <div>
      <label>Aluno</label><br />
      <select value={alunoId ?? ''} onChange={(e) => setAluno(e.target.value ? Number(e.target.value) : null)} disabled={!turmaId}>
        <option value=''>Selecione...</option>
        {data?.map(a => <option key={a.id} value={a.id}>{a.nome}</option>)}
      </select>
    </div>
  );
}