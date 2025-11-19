import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { CadastroDeAlunosPage } from './pages/CadastroDeAlunosPage';
import { AlunoPage } from './pages/AlunoPage';
import { InscricaoFlowPage } from './pages/InscricaoFlowPage';

export function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 10, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link to='/cadastro-alunos'>Cadastro Alunos</Link>
        <Link to='/inscricoes'>Inscrições</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Navigate to='/cadastro-alunos' replace />} />
        <Route path='/cadastro-alunos' element={<CadastroDeAlunosPage />} />
        <Route path='/aluno/:id' element={<AlunoPage />} />
        <Route path='/inscricoes' element={<InscricaoFlowPage />} />
      </Routes>
    </BrowserRouter>
  );
}
