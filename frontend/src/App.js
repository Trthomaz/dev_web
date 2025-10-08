import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AlunosPage from "./pages/AlunosPage";
import TurmasPage from "./pages/TurmasPage";
import TurmaDetalhesPage from "./pages/TurmaDetalhesPage";

function App() {
  return (
    <Router>
      <nav style={{ padding: 10 }}>
        <Link to="/alunos" style={{ marginRight: 10 }}>Alunos</Link>
        <Link to="/turmas">Turmas</Link>
      </nav>

      <Routes>
        <Route path="/alunos" element={<AlunosPage />} />
        <Route path="/turmas" element={<TurmasPage />} />
        <Route path="/turmas/:id" element={<TurmaDetalhesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
