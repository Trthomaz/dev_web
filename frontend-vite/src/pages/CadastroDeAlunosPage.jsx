import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlunoForm } from '../components/AlunoForm';
// AlunosList removido desta página para manter apenas o cadastro

export function CadastroDeAlunosPage() {
  const navigate = useNavigate();
  const handleSaved = (id) => { if (id) navigate(`/aluno/${id}`); };
  return (
    <div className='container'>
      <div className='card' style={{ maxWidth: 560, margin: '0 auto' }}>
        <h2 className='title'>Cadastro de Alunos</h2>
        <AlunoForm onSaved={handleSaved} />
      </div>
    </div>
  );
}
