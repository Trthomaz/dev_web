import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../api/api";
import AlunoRow from "./AlunoRow";

export default function AlunosTable({ turmaId, turmaCodigo }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["turma-detalhe", turmaId],
    queryFn: async () => (await api.get(`/turmas/${turmaId}`)).data,
    enabled: !!turmaId,
    staleTime: 60 * 1000,
  });

  // re-render when localStorage changes by our custom event
  const [, setBump] = useState(0);
  useEffect(() => {
    const handler = () => setBump((n) => n + 1);
    window.addEventListener("grupo-changed", handler);
    return () => window.removeEventListener("grupo-changed", handler);
  }, []);

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", paddingBottom: 8 }}>Id</th>
          <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", paddingBottom: 8 }}>Nome</th>
          <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", paddingBottom: 8 }}>Email</th>
          <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", paddingBottom: 8 }}>Ação</th>
        </tr>
      </thead>
      <tbody>
        {!turmaId ? null : isLoading ? (
          <tr><td colSpan={4}>Carregando alunos...</td></tr>
        ) : isError ? (
          <tr><td colSpan={4}>Erro ao carregar alunos</td></tr>
        ) : (data?.alunos || []).map((a) => (
          <AlunoRow key={a.id} aluno={a} turmaCodigo={turmaCodigo} />
        ))}
      </tbody>
    </table>
  );
}
