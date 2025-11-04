import React, { useState } from "react";
import TurmaSelect from "../components/TurmaSelect";
import AlunosTable from "../components/AlunosTable";

export default function GrupoAlunosPage() {
  const [turma, setTurma] = useState(null);

  const codigo = turma?.codigo ?? "";
  const turmaLabel = turma ? `${turma.codigo ?? `T${String(turma.id).padStart(3, "0")}`} - ${turma.disciplinaNome || "Sem disciplina"}` : "";

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ marginTop: 0 }}>Gerenciar Grupo de Alunos por Turma</h2>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <label htmlFor="turmaSelect" style={{ fontWeight: 600 }}>Turma</label>
        <TurmaSelect
          value={turma?.id ?? null}
          onChange={setTurma}
          id="turmaSelect"
        />
      </div>

      {turma && (
        <div style={{ marginTop: 8, color: "#666" }}>
          Selecionada: <strong>{turmaLabel}</strong>
        </div>
      )}

      <AlunosTable turmaId={turma?.id ?? null} turmaCodigo={codigo} />
    </div>
  );
}
