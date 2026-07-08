import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FinancialData } from '../types/financial';

interface FinancialStore {
  data: FinancialData | null;
  setData: (data: FinancialData) => void;
  reset: () => void;
}

export const useFinancialStore = create<FinancialStore>()(
  persist(
    (set) => ({
      data: null,
      setData: (data) => set({ data }),
      reset: () => set({ data: null }),
    }),
    { name: 'planejai-storage' }
  )
);