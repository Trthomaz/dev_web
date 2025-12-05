import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useApi } from '../hooks/useApi';
import { useAuthStore } from '../store';
import { getErrorMessage } from '../utils/errorMessage';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const schema = z.object({
  username: z.string().min(3, 'Usuário mínimo 3 caracteres'),
  password: z.string().min(3, 'Senha mínima 3 caracteres'),
});

const resolver = (schema) => async (values) => {
  try { const data = schema.parse(values); return { values: data, errors: {} }; }
  catch (err) {
    const formErrors = {}; if (err.issues) for (const issue of err.issues) { const p = issue.path?.[0]; if (p) formErrors[p] = { type: 'validation', message: issue.message }; }
    return { values: {}, errors: formErrors };
  }
};

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { authMessage, setAuth } = useAuthStore();
  const setAuthMessage = useAuthStore((s) => s.setAuthMessage);
  const { post } = useApi();
  const loginMut = useMutation({ mutationFn: post('/auth/login') });
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: resolver(schema) });
  const [serverError, setServerError] = React.useState(null);

  // Limpa a mensagem quando veio do cadastro (state.fromSignup)
  React.useEffect(() => {
    if (location?.state?.fromSignup && setAuthMessage) {
      setAuthMessage(null);
    }
  }, [location, setAuthMessage]);

  // Limpa a mensagem SOMENTE quando a página foi recarregada (F5/Reload)
  React.useEffect(() => {
    try {
      const nav = performance.getEntriesByType?.('navigation')?.[0];
      const isReload = nav?.type === 'reload';
      if (isReload && setAuthMessage) setAuthMessage(null);
    } catch {}
  }, [setAuthMessage]);

  const onSubmit = async (values) => {
    try {
      const data = await loginMut.mutateAsync(values);
      setAuth({ token: data.token, username: data.username, role: data.role });
      navigate('/cadastro-alunos');
    } catch (e) {
      setServerError(getErrorMessage(e, { context: 'login' }));
    }
  };

  return (
    <div className='container'>
      <div className='card' style={{ maxWidth: 420, margin: '0 auto' }}>
        <h2 className='title'>Login</h2>
        {authMessage && <p className='error'>{authMessage}</p>}
        {serverError && <p className='error'>{serverError}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className='grid'>
          <div>
            <label>Usuário</label>
            <input {...register('username')} />
            {errors.username && <span className='error'>{errors.username.message}</span>}
          </div>
          <div>
            <label>Senha</label>
            <input type='password' {...register('password')} />
            {errors.password && <span className='error'>{errors.password.message}</span>}
          </div>
          <button className='btn' type='submit' disabled={isSubmitting}>Entrar</button>
        </form>
        <p className='muted' style={{ marginTop: 8 }}>Não tem conta? <Link to='/signup'>Criar conta</Link></p>
      </div>
    </div>
  );
}
