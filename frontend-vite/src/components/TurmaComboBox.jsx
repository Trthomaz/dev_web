import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import { useInscricaoStore } from '../store';

export function TurmaComboBox() {
  const { disciplinaId, turmaId, setTurma } = useInscricaoStore();
  const { data } = useQuery({
    queryKey: ['turmas', { disciplinaId }],
    queryFn: async () => (await api.get(`/disciplinas/${disciplinaId}/turmas`)).data,
    enabled: !!disciplinaId,
  });
  return (
    <div>
      <label>Turma</label><br />
      <select value={turmaId ?? ''} onChange={(e) => setTurma(e.target.value ? Number(e.target.value) : null)} disabled={!disciplinaId}>
        <option value=''>Selecione...</option>
        {data?.map(t => <option key={t.id} value={t.id}>{t.codigo} - {t.professorNome}</option>)}
      </select>
    </div>
  );
}