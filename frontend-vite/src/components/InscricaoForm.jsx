import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';
import { useInscricaoStore } from '../store';
import { DisciplinaComboBox } from './DisciplinaComboBox';
import { TurmaComboBox } from './TurmaComboBox';
import { AlunoComboBox } from './AlunoComboBox';

export function InscricaoForm() {
  const { disciplinaId, turmaId, alunoId, resetAfterEnroll } = useInscricaoStore();
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => (await api.post('/inscricoes', { alunoId, turmaId })).data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['turma', { turmaId }] });
      qc.invalidateQueries({ queryKey: ['alunos-nao-inscritos', { turmaId }] });
      resetAfterEnroll();
    }
  });

  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end' }}>
      <DisciplinaComboBox />
      <TurmaComboBox />
      <AlunoComboBox />
      <button disabled={!disciplinaId || !turmaId || !alunoId || mutation.isPending} onClick={() => mutation.mutate()}>
        Inscrever Aluno
      </button>
      {mutation.isPending && <span>Inscrevendo...</span>}
      {mutation.isSuccess && <span style={{ color: 'green' }}>Inscrição concluída</span>}
    </div>
  );
}