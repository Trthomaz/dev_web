import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useApi } from '../hooks/useApi';
import { useInscricaoStore } from '../store';

export function DisciplinaComboBox() {
  const { disciplinaId, setDisciplina } = useInscricaoStore();
  const { get } = useApi();
  const { data } = useQuery({ queryKey: ['disciplinas'], queryFn: get('/disciplinas') });
  return (
    <div>
      <label>Disciplina</label><br />
      <select value={disciplinaId ?? ''} onChange={(e) => setDisciplina(e.target.value ? Number(e.target.value) : null)}>
        <option value=''>Selecione...</option>
        {data?.map(d => <option key={d.id} value={d.id}>{d.nome}</option>)}
      </select>
    </div>
  );
}