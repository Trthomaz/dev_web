import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useApi } from '../hooks/useApi';
import { getErrorMessage } from '../utils/errorMessage';

const schema = z.object({
  username: z.string().min(3, 'Usuário mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(3, 'Senha mínima 3 caracteres'),
  role: z.enum(['USER', 'ADMIN']),
});

const resolver = (schema) => async (values) => {
  try { const data = schema.parse(values); return { values: data, errors: {} }; }
  catch (err) {
    const formErrors = {}; if (err.issues) for (const issue of err.issues) { const p = issue.path?.[0]; if (p) formErrors[p] = { type: 'validation', message: issue.message }; }
    return { values: {}, errors: formErrors };
  }
};

export function AdminUsersPage() {
  const { post } = useApi();
  const createMut = useMutation({ mutationFn: post('/admin/users') });
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: resolver(schema), defaultValues: { role: 'USER' } });
  const [serverError, setServerError] = React.useState(null);

  const onSubmit = async (values) => {
    try {
      await createMut.mutateAsync(values);
      setServerError(null);
      reset({ username: '', email: '', password: '', role: 'USER' });
    } catch (e) {
      setServerError(getErrorMessage(e, { context: 'adminUsers' }));
    }
  };

  return (
    <div className='container'>
      <div className='card' style={{ maxWidth: 560, margin: '0 auto' }}>
        <h2 className='title'>Gerenciar Usuários</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='grid'>
        <div>
          <label>Usuário</label>
          <input {...register('username')} />
          {errors.username && <span className='error'>{errors.username.message}</span>}
        </div>
        <div>
          <label>Email</label>
          <input type='email' {...register('email')} />
          {errors.email && <span className='error'>{errors.email.message}</span>}
        </div>
        <div>
          <label>Senha</label>
          <input type='password' {...register('password')} />
          {errors.password && <span className='error'>{errors.password.message}</span>}
        </div>
        <div>
          <label>Perfil</label>
          <select {...register('role')}>
            <option value='USER'>USER</option>
            <option value='ADMIN'>ADMIN</option>
          </select>
          {errors.role && <span className='error'>{errors.role.message}</span>}
        </div>
        <button className='btn' type='submit' disabled={isSubmitting}>Criar Usuário</button>
        </form>
        {serverError && <p className='error' style={{ marginTop: 8 }}>{serverError}</p>}
        {createMut.isSuccess && <p className='success' style={{ marginTop: 8 }}>Usuário criado com sucesso</p>}
      </div>
    </div>
  );
}
