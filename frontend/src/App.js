import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import AlunosPage from "./pages/AlunosPage";
import TurmasPage from "./pages/TurmasPage";
import TurmaDetalhesPage from "./pages/TurmaDetalhesPage";
import BuscaTurmasPage from "./pages/BuscaTurmasPage";
import GrupoAlunosPage from "./pages/GrupoAlunosPage";
import CadastroDeAlunosPage from "./pages/CadastroDeAlunosPage";
import AlunoPage from "./pages/AlunoPage";
import InscricaoFlowPage from "./pages/InscricaoFlowPage";

function App() {
  return (
    <Router>
      <nav style={{ padding: 10 }}>
        <Link to="/buscar-turmas" style={{ marginRight: 10 }}>Buscar Turmas</Link>
        <Link to="/alunos" style={{ marginRight: 10 }}>Alunos</Link>
        <Link to="/turmas" style={{ marginRight: 10 }}>Turmas</Link>
        <Link to="/grupos">Grupos</Link>
        <span style={{ margin: '0 10px' }} />
        <Link to="/cadastro-alunos" style={{ marginRight: 10 }}>Cadastro Alunos</Link>
        <Link to="/inscricoes">Inscrições</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/buscar-turmas" replace />} />
        <Route path="/buscar-turmas" element={<BuscaTurmasPage />} />
        <Route path="/alunos" element={<AlunosPage />} />
        <Route path="/turmas" element={<TurmasPage />} />
        <Route path="/turmas/:id" element={<TurmaDetalhesPage />} />
        <Route path="/grupos" element={<GrupoAlunosPage />} />
        <Route path="/cadastro-alunos" element={<CadastroDeAlunosPage />} />
        <Route path="/aluno/:id" element={<AlunoPage />} />
        <Route path="/inscricoes" element={<InscricaoFlowPage />} />
      </Routes>
    </Router>
  );
}

export default App;
