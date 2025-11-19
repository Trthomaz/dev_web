import { create } from 'zustand';

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
