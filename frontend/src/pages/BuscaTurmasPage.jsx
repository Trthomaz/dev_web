import { useEffect, useMemo, useState } from "react";
import api from "../api/api";

function normalize(str) {
  return (str || "").toString().toLowerCase();
}

function turmaLabel(t) {
  const cod = t.codigo?.trim();
  const disc = t.disciplinaNome?.trim();
  if (cod && disc) return `${cod} - ${disc}`;
  if (cod) return cod;
  if (disc) return disc;
  const idPad = String(t.id).padStart(3, "0");
  return `T${idPad}`;
}

export default function BuscaTurmasPage() {
  const [query, setQuery] = useState("");
  const [allTurmas, setAllTurmas] = useState([]);
  const [carregouTurmas, setCarregouTurmas] = useState(false);

  const [selectedTurmaId, setSelectedTurmaId] = useState(null);
  const [turmaDetalhe, setTurmaDetalhe] = useState(null);

  const [alunoCache, setAlunoCache] = useState({});

  // Paginação
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // Carrega turmas apenas quando houver pesquisa
  useEffect(() => {
    if (!carregouTurmas && query.trim().length > 0) {
      api
        .get("/turmas")
        .then((res) => {
          setAllTurmas(res.data || []);
          setCarregouTurmas(true);
        })
        .catch((err) => console.error("Erro ao carregar turmas:", err));
    }
  }, [carregouTurmas, query]);

  // Filtra turmas pelo texto (código, disciplina, professor, ano, período e id)
  const turmasFiltradas = useMemo(() => {
    const q = normalize(query);
    if (!q) return [];
    return (allTurmas || []).filter((t) => {
      const campos = [
        t.id,
        t.ano,
        t.periodo,
        t.codigo,
        t.disciplinaNome,
        t.professorNome,
      ]
        .map((v) => normalize(v))
        .join(" ");
      return campos.includes(q);
    });
  }, [allTurmas, query]);

  useEffect(() => {
    if (!selectedTurmaId) return;
    setTurmaDetalhe(null);
    setPage(1);
    api
      .get(`/turmas/${selectedTurmaId}`)
      .then((res) => setTurmaDetalhe(res.data))
      .catch((err) => console.error("Erro ao carregar detalhes da turma:", err));
  }, [selectedTurmaId]);

  const totalAlunos = turmaDetalhe?.alunos?.length || 0;
  const totalPages = Math.max(1, Math.ceil(totalAlunos / pageSize));
  const pageStart = (page - 1) * pageSize;
  const pageEnd = pageStart + pageSize;
  const alunosPagina = useMemo(() => {
    return turmaDetalhe?.alunos?.slice(pageStart, pageEnd) || [];
  }, [turmaDetalhe, pageStart, pageEnd]);

  useEffect(() => {
    if (!alunosPagina.length) return;
    const faltando = alunosPagina.filter((a) => !alunoCache[a.id]).map((a) => a.id);
    if (!faltando.length) return;
    Promise.all(
      faltando.map((id) =>
        api
          .get(`/alunos/${id}`)
          .then((res) => res.data)
          .catch(() => null)
      )
    ).then((detalhes) => {
      const novos = { ...alunoCache };
      detalhes.filter(Boolean).forEach((a) => {
        novos[a.id] = a;
      });
      setAlunoCache(novos);
    });
  }, [alunosPagina, alunoCache]);

  // UI
  return (
    <div style={{ padding: 16 }}>
      <h2>Pesquisar Turmas</h2>
      <div style={{ marginBottom: 12 }}>
        <label style={{ marginRight: 8 }}>Pesquisa:</label>
        <input
          type="text"
          placeholder="Digite para buscar turmas"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedTurmaId(null);
            setTurmaDetalhe(null);
          }}
          style={{ width: "60%", padding: 8 }}
        />
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        {/* Lista de turmas (esquerda) */}
        <div style={{ width: 280 }}>
          <h3>Turmas</h3>
          <div style={{
            border: "1px solid #ccc",
            borderRadius: 4,
            minHeight: 240,
            maxHeight: 360,
            overflowY: "auto",
          }}>
            {query.trim().length === 0 ? (
              <div style={{ padding: 16, color: "#6c757d", textAlign: "center" }}>
                <div
                  style={{
                    display: "inline-block",
                    background: "#f8f9fa",
                    border: "1px solid #e9ecef",
                    borderRadius: 8,
                    padding: "12px 16px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ fontSize: 13 }}>
                    Pesquise no campo acima para listar as turmas
                  </div>
                </div>
              </div>
            ) : turmasFiltradas.length === 0 ? (
              <div style={{ padding: 8, color: "#666" }}>Nenhuma turma encontrada</div>
            ) : (
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {turmasFiltradas.map((t) => {
                  const isSel = selectedTurmaId === t.id;
                  return (
                    <li
                      key={t.id}
                      onClick={() => setSelectedTurmaId(t.id)}
                      style={{
                        padding: "10px 12px",
                        cursor: "pointer",
                        background: isSel ? "#e9ecef" : "transparent",
                        borderBottom: "1px solid #eee",
                      }}
                      title={`${t.ano}/${t.periodo} — ${t.disciplinaNome} (Prof. ${t.professorNome})`}
                    >
                      <strong>{turmaLabel(t)}</strong>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        {/* Detalhes + Tabela de alunos (direita) */}
        <div style={{ flex: 1 }}>
          {selectedTurmaId && turmaDetalhe ? (
            <div>
              <div style={{ marginBottom: 12 }}>
                <strong>Ano:</strong> {turmaDetalhe.ano} &nbsp; &nbsp;
                <strong>Período:</strong> {turmaDetalhe.periodo} &nbsp; &nbsp;
                <strong>Disc:</strong> {turmaDetalhe.disciplinaNome} &nbsp; &nbsp;
                <strong>Prof:</strong> {turmaDetalhe.professorNome}
              </div>

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={th}>ID</th>
                      <th style={th}>Nome</th>
                      <th style={th}>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alunosPagina.map((a) => {
                      const det = alunoCache[a.id];
                      return (
                        <tr key={a.id}>
                          <td style={td}>{a.id}</td>
                          <td style={td}>{a.nome}</td>
                          <td style={td}>{det?.email || "—"}</td>
                        </tr>
                      );
                    })}
                    {alunosPagina.length === 0 && (
                      <tr>
                        <td style={td} colSpan={3}>
                          Nenhum aluno para exibir
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Paginação */}
              {totalAlunos > 0 && (
                <div style={{ display: "flex", gap: 8, marginTop: 12, alignItems: "center" }}>
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    ⬅
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      style={{
                        fontWeight: n === page ? 700 : 400,
                        textDecoration: n === page ? "underline" : "none",
                      }}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    ➡
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ color: "#666", paddingTop: 8 }}>
              {query.trim().length === 0
                ? "Nenhuma pesquisa realizada. Digite para buscar turmas."
                : "Selecione uma turma para ver os alunos."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const th = {
  textAlign: "left",
  borderBottom: "2px solid #ddd",
  padding: "8px 10px",
};

const td = {
  borderBottom: "1px solid #eee",
  padding: "8px 10px",
};
