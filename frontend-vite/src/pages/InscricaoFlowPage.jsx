import React from 'react';
import { InscricaoForm } from '../components/InscricaoForm';
import { Pesquisa } from '../components/Pesquisa';
import { TabelaDeAlunosPorTurma } from '../components/TabelaDeAlunosPorTurma';
import { Paginacao } from '../components/Paginacao';

export function InscricaoFlowPage() {
  return (
    <div style={{ padding: 16, display: 'grid', gap: 16 }}>
      <h2>Inscrições</h2>
      <InscricaoForm />
      <Pesquisa />
      <TabelaDeAlunosPorTurma />
      <Paginacao />
    </div>
  );
}
