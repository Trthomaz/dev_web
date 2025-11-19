import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api';

export function AlunoPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ['aluno', { id }],
    queryFn: async () => (await api.get(`/alunos/${id}`)).data,
  });
  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar aluno.</p>;
  return (
    <div style={{ padding: 16 }}>
      <h2>Aluno</h2>
      <p><strong>ID:</strong> {data.id}</p>
      <p><strong>Nome:</strong> {data.nome}</p>
      <p><strong>Email:</strong> {data.email}</p>
    </div>
  );
}
