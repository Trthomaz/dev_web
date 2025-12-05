import axios from 'axios';
import { useAuthStore } from '../store';

const api = axios.create({ baseURL: 'http://localhost:8080' });

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (error) => {
    const status = error?.response?.status;
    const url = error?.config?.url || '';
    if (status === 401) {
      if (url.includes('/auth/login')) {
        return Promise.reject(error);
      }
      useAuthStore.getState().setAuthMessage('Necessário estar autenticado para acessar este recurso.');
      window.location.href = '/login';
    } else if (status === 403) {
      useAuthStore.getState().setAuthMessage('Você não tem permissão para acessar este recurso.');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export function useApi() {
  return {
    get: (url) => async () => (await api.get(url)).data,
    post: (url) => async (payload) => (await api.post(url, payload)).data,
    put: (url) => async (payload) => (await api.put(url, payload)).data,
    del: (url) => async () => (await api.delete(url)).data,
    client: api,
  };
}
