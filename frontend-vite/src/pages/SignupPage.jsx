import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useApi } from '../hooks/useApi';
import { getErrorMessage } from '../utils/errorMessage';
import { Link, useNavigate } from 'react-router-dom';

const schema = z.object({
  username: z.string().min(3, 'Usuário mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(3, 'Senha mínima 3 caracteres'),
});

const resolver = (schema) => async (values) => {
  try { const data = schema.parse(values); return { values: data, errors: {} }; }
  catch (err) {
    const formErrors = {}; if (err.issues) for (const issue of err.issues) { const p = issue.path?.[0]; if (p) formErrors[p] = { type: 'validation', message: issue.message }; }
    return { values: {}, errors: formErrors };
  }
};

export function SignupPage() {
  const { post } = useApi();
  const navigate = useNavigate();
  const signupMut = useMutation({ mutationFn: post('/auth/signup') });
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: resolver(schema) });
  const [serverError, setServerError] = React.useState(null);

  const onSubmit = async (values) => {
    try {
      await signupMut.mutateAsync(values);
      // Ao voltar para login após cadastro, limpar mensagens anteriores
      navigate('/login', { state: { fromSignup: true } });
    } catch (e) {
      setServerError(getErrorMessage(e, { context: 'signup' }));
    }
  };

  return (
    <div className='container'>
      <div className='card' style={{ maxWidth: 420, margin: '0 auto' }}>
        <h2 className='title'>Criar conta</h2>
        {serverError && <p className='error'>{serverError}</p>}
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
          <button className='btn' type='submit' disabled={isSubmitting}>Criar</button>
        </form>
        <p className='muted' style={{ marginTop: 8 }}>Já tem conta? <Link to='/login'>Entrar</Link></p>
      </div>
    </div>
  );
}
