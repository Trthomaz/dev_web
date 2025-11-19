import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlunoForm } from '../components/AlunoForm';

export function CadastroDeAlunosPage() {
  const navigate = useNavigate();
  const handleSaved = (id) => { if (id) navigate(`/aluno/${id}`); };
  return (
    <div style={{ padding: 16 }}>
      <h2>Cadastro de Alunos</h2>
      <AlunoForm onSaved={handleSaved} />
    </div>
  );
}
