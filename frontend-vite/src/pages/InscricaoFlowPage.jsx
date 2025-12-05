import React from 'react';
import { InscricaoForm } from '../components/InscricaoForm';
import { Pesquisa } from '../components/Pesquisa';
import { TabelaDeAlunosPorTurma } from '../components/TabelaDeAlunosPorTurma';
import { Paginacao } from '../components/Paginacao';

export function InscricaoFlowPage() {
  return (
    <div className='container'>
      <div className='grid'>
        <div className='card'>
          <h2 className='title'>Inscrições</h2>
          <InscricaoForm />
        </div>
        <div className='card'>
          <Pesquisa />
          <TabelaDeAlunosPorTurma />
          <Paginacao />
        </div>
      </div>
    </div>
  );
}
