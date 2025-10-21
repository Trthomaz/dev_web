import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AlunoList from "./components/AlunoList";
import TurmaList from "./components/TurmaList";
import TurmaDetalhes from "./components/TurmaDetalhes";
import BuscaTurmasPage from "./pages/BuscaTurmasPage";

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/alunos">Alunos</Link> | {" "}
        <Link to="/turmas">Turmas</Link> | {" "}
        <Link to="/buscar-turmas">Buscar Turmas</Link>
      </nav>

      <Routes>
        <Route path="/alunos" element={<AlunoList />} />
        <Route path="/turmas" element={<TurmaList />} />
        <Route path="/turmas/:id" element={<TurmaDetalhes />} />
        <Route path="/buscar-turmas" element={<BuscaTurmasPage />} />
      </Routes>
    </Router>
  );
}
