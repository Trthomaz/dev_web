import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '../hooks/useApi';
import { getErrorMessage } from '../utils/errorMessage';

const schema = z.object({
  nome: z.string().min(2, 'Nome mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  cpf: z.string().min(11, 'CPF mínimo 11 caracteres'),
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
  const { get, post, put } = useApi();
  const { data: existingAluno } = useQuery({
    queryKey: ['aluno', { alunoId }],
    queryFn: get(`/alunos/${alunoId}`),
    enabled: !!alunoId,
  });
  const createMut = useMutation({
    mutationFn: post('/alunos'),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['alunos'] }),
  });
  const updateMut = useMutation({
    mutationFn: async ({ id, ...payload }) => await put(`/alunos/${id}`)(payload),
    onSuccess: (_d, vars) => {
      qc.invalidateQueries({ queryKey: ['aluno', { alunoId: vars.id }] });
      qc.invalidateQueries({ queryKey: ['alunos'] });
    },
  });

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: makeZodResolver(schema),
    defaultValues: { nome: '', email: '', cpf: '' }
  });
  const [serverError, setServerError] = React.useState(null);
  const [dialogOpen] = React.useState(false);

  React.useEffect(() => { if (existingAluno) reset({ nome: existingAluno.nome, email: existingAluno.email, cpf: existingAluno.cpf ?? '' }); }, [existingAluno, reset]);

  const onSubmit = async (values) => {
    setServerError(null);
    try {
      let result;
      if (alunoId) {
        result = await updateMut.mutateAsync({ id: alunoId, ...values });
      } else {
        result = await createMut.mutateAsync(values);
      }
      reset({ nome: '', email: '', cpf: '' });
      if (onSaved) onSaved(result?.id ?? alunoId);
    } catch (e) {
      const status = e?.response?.status;
      if (status === 401 || status === 403) {
        // Interceptor já redireciona e define a mensagem correta; não abrir dialog
        return;
      }
      setServerError(getErrorMessage(e, { context: 'alunos', action: 'create' }));
    }
  };

  return (
    <>
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
        <div>
          <label>CPF</label>
          <input {...register('cpf')} />
          {errors.cpf && <span style={{ color: 'red' }}>{errors.cpf.message}</span>}
        </div>
        <button type='submit' disabled={isSubmitting}>{alunoId ? 'Atualizar' : 'Criar'} Aluno</button>
      </form>
      {serverError && (
        <p style={{ color: 'crimson', marginTop: 8 }}>{serverError}</p>
      )}
    </>
  );
}