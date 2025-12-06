import React from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { CadastroDeAlunosPage } from './pages/CadastroDeAlunosPage';
import { AlunoPage } from './pages/AlunoPage';
import { AlunosListPage } from './pages/AlunosListPage';
import { InscricaoFlowPage } from './pages/InscricaoFlowPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { AdminUsersPage } from './pages/AdminUsersPage';
import { useAuthStore } from './store';
import { ProtectedRoute } from './routes/ProtectedRoute';

export function App() {
  const navigate = useNavigate();
  const { username, role, token } = useAuthStore();
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const setAuthMessage = useAuthStore((s) => s.setAuthMessage);
  const handleLogout = () => { clearAuth(); setAuthMessage(null); navigate('/login'); };
  return (
      <>
        <nav className='nav'>
          <>
            <Link to='/cadastro-alunos'>Cadastro Alunos</Link>
            <Link to='/alunos'>Alunos</Link>
            <Link to='/inscricoes'>Inscrições</Link>
            {role === 'ROLE_ADMIN' && <Link to='/admin/users'>Gerenciar Usuários</Link>}
          </>
          <span className='nav-spacer' />
          {username ? (
            <>
              <span className='nav-user'>Logado como: {username}</span>
              <button className='btn' style={{ marginLeft: 12 }} onClick={handleLogout}>Sair</button>
            </>
          ) : (
            <>
              <Link to='/login'>Entrar</Link>
              <Link to='/signup'>Criar conta</Link>
            </>
          )}
        </nav>
        <Routes>
          <Route path='/' element={<Navigate to='/cadastro-alunos' replace />} />
          <Route path='/cadastro-alunos' element={<CadastroDeAlunosPage />} />
          <Route path='/alunos' element={<AlunosListPage />} />
          <Route path='/aluno/:id' element={<ProtectedRoute><AlunoPage /></ProtectedRoute>} />
          <Route path='/inscricoes' element={<InscricaoFlowPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/admin/users' element={<ProtectedRoute requireAdmin><AdminUsersPage /></ProtectedRoute>} />
        </Routes>
      </>
  );
}
