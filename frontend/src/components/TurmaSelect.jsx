import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

/**
 * TurmaSelect
 * Props:
 * - value: selected turma id (number | null)
 * - onChange: (turma: {id:number, codigo?:string, disciplina?:{nome?:string}} | null) => void
 */
export default function TurmaSelect({ value, onChange }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["turmas"],
    queryFn: async () => {
      const res = await api.get("/turmas");
      return res.data ?? [];
    },
    staleTime: 5 * 60 * 1000,
  });

  const handleChange = (e) => {
    const id = e.target.value ? Number(e.target.value) : null;
    if (!id) {
      onChange?.(null);
      return;
    }
    const turma = data?.find((t) => t.id === id) ?? null;
    onChange?.(turma ?? null);
  };

  return (
    <select value={value ?? ""} onChange={handleChange} style={{ padding: 6 }}>
      <option value="" disabled>{isLoading ? "Carregando turmas..." : "Selecione uma turma"}</option>
      {isError && <option value="" disabled>{String(error?.message || "Erro ao carregar turmas")}</option>}
      {data?.map((t) => (
        <option key={t.id} value={t.id}>
          {t.codigo ? `${t.codigo}` : `T${t.id.toString().padStart(3, "0")}`} - {t.disciplinaNome || "Sem disciplina"}
        </option>
      ))}
    </select>
  );
}
