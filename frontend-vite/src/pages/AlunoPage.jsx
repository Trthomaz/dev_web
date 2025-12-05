import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useApi } from '../hooks/useApi';

export function AlunoPage() {
  const { id } = useParams();
  const { get } = useApi();
  const { data, isLoading, error } = useQuery({
    queryKey: ['aluno', { id }],
    queryFn: get(`/alunos/${id}`),
  });
  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar aluno.</p>;
  return (
    <div style={{ padding: 16 }}>
      <h2>Aluno</h2>
      <p><strong>ID:</strong> {data.id}</p>
      <p><strong>Nome:</strong> {data.nome}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>CPF:</strong> {data.cpf ?? '-'}</p>
    </div>
  );
}
