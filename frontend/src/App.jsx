import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AlunoList from "./components/AlunoList";
import TurmaList from "./components/TurmaList";
import TurmaDetalhes from "./components/TurmaDetalhes";

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/alunos">Alunos</Link> | <Link to="/turmas">Turmas</Link>
      </nav>

      <Routes>
        <Route path="/alunos" element={<AlunoList />} />
        <Route path="/turmas" element={<TurmaList />} />
        <Route path="/turmas/:id" element={<TurmaDetalhes />} />
      </Routes>
    </Router>
  );
}
