import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useApi } from '../hooks/useApi';
import { useInscricaoStore } from '../store';

export function TurmaComboBox() {
  const { disciplinaId, turmaId, setTurma } = useInscricaoStore();
  const { get } = useApi();
  const { data } = useQuery({
    queryKey: ['turmas', { disciplinaId }],
    queryFn: get(`/disciplinas/${disciplinaId}/turmas`),
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