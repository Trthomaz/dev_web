import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

function loadGrupo(codigo) {
  try {
    const raw = localStorage.getItem(codigo);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveGrupo(codigo, ids) {
  localStorage.setItem(codigo, JSON.stringify(ids));
}

export default function AlunoRow({ aluno, turmaCodigo }) {
  const { data: alunoFull } = useQuery({
    queryKey: ["aluno", aluno.id],
    queryFn: async () => (await api.get(`/alunos/${aluno.id}`)).data,
    staleTime: 5 * 60 * 1000,
    enabled: !!aluno?.id,
  });

  const [, setVersion] = useState(0);
  useEffect(() => {
    const handler = (e) => {
      if (e?.detail?.turmaCodigo === turmaCodigo) setVersion((v) => v + 1);
    };
    window.addEventListener("grupo-changed", handler);
    return () => window.removeEventListener("grupo-changed", handler);
  }, [turmaCodigo]);

  const grupoIds = new Set(loadGrupo(turmaCodigo));
  const isInGrupo = grupoIds.has(aluno.id);

  const toggle = () => {
    const ids = loadGrupo(turmaCodigo);
    const set = new Set(ids);
    if (set.has(aluno.id)) set.delete(aluno.id); else set.add(aluno.id);
    saveGrupo(turmaCodigo, Array.from(set));
    window.dispatchEvent(new CustomEvent("grupo-changed", { detail: { turmaCodigo } }));
  };

  return (
    <tr>
      <td style={{ width: 80 }}>{aluno.id}</td>
      <td>{aluno.nome}</td>
      <td>{alunoFull?.email ?? ""}</td>
      <td style={{ textAlign: "right", width: 140 }}>
        <button onClick={toggle} style={{ padding: "4px 10px" }}>
          {isInGrupo ? "Remover" : "Incluir"}
        </button>
      </td>
    </tr>
  );
}
