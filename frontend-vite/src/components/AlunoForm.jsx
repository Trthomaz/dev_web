import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';

const schema = z.object({
  nome: z.string().min(2, 'Nome mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
});

const makeZodResolver = (schema) => async (values) => {
  try { const data = schema.parse(values); return { values: data, errors: {} }; }
  catch (err) {
    const formErrors = {}; if (err.issues) for (const issue of err.issues) { const p = issue.path?.[0]; if (p) formErrors[p] = { type: 'validation', message: issue.message }; }
    return { values: {}, errors: formErrors };
  }
};

export function AlunoForm({ alunoId, onSaved }) {
  const qc = useQueryClient();
  const { data: existingAluno } = useQuery({
    queryKey: ['aluno', { alunoId }],
    queryFn: async () => (await api.get(`/alunos/${alunoId}`)).data,
    enabled: !!alunoId,
  });
  const createMut = useMutation({
    mutationFn: async (payload) => (await api.post('/alunos', payload)).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['alunos'] }),
  });
  const updateMut = useMutation({
    mutationFn: async ({ id, ...payload }) => (await api.put(`/alunos/${id}`, payload)).data,
    onSuccess: (_d, vars) => {
      qc.invalidateQueries({ queryKey: ['aluno', { alunoId: vars.id }] });
      qc.invalidateQueries({ queryKey: ['alunos'] });
    },
  });

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: makeZodResolver(schema),
    defaultValues: { nome: '', email: '' }
  });

  React.useEffect(() => { if (existingAluno) reset({ nome: existingAluno.nome, email: existingAluno.email }); }, [existingAluno, reset]);

  const onSubmit = async (values) => {
    let result;
    if (alunoId) {
      result = await updateMut.mutateAsync({ id: alunoId, ...values });
    } else {
      result = await createMut.mutateAsync(values);
    }
    reset({ nome: '', email: '' });
    if (onSaved) onSaved(result?.id ?? alunoId);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320 }}>
      <div>
        <label>Nome</label>
        <input {...register('nome')} />
        {errors.nome && <span style={{ color: 'red' }}>{errors.nome.message}</span>}
      </div>
      <div>
        <label>Email</label>
        <input {...register('email')} />
        {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
      </div>
      <button type='submit' disabled={isSubmitting}>{alunoId ? 'Atualizar' : 'Criar'} Aluno</button>
    </form>
  );
}