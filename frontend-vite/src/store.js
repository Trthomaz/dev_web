import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      username: null,
      role: null,
      authMessage: null,
      setAuth: ({ token, username, role }) => set({ token, username, role, authMessage: null }),
      setAuthMessage: (authMessage) => set({ authMessage }),
      clearAuth: () => set({ token: null, username: null, role: null, authMessage: null }),
    }),
    { name: 'auth' }
  )
);

export const useInscricaoStore = create((set) => ({
  disciplinaId: null,
  turmaId: null,
  alunoId: null,
  filtro: '',
  page: 1,
  pageSize: 10,
  setDisciplina: (disciplinaId) => set({ disciplinaId, turmaId: null, alunoId: null, page: 1 }),
  setTurma: (turmaId) => set({ turmaId, alunoId: null, page: 1 }),
  setAluno: (alunoId) => set({ alunoId }),
  setFiltro: (filtro) => set({ filtro, page: 1 }),
  setPage: (page) => set({ page }),
  resetAfterEnroll: () => set({ alunoId: null }),
}));
