import React from 'react';
import { useInscricaoStore } from '../store';

export function Pesquisa() {
  const { filtro, setFiltro, turmaId } = useInscricaoStore();
  if (!turmaId) return null;
  return (
    <div>
      <label>Filtrar alunos por nome: </label>
      <input value={filtro} onChange={(e) => setFiltro(e.target.value)} placeholder='Digite para filtrar' />
    </div>
  );
}