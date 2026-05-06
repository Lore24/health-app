import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { asyncStorage, todayKey } from './persist';

export type WeightEntry = {
  date: string;
  weight: number;
};

export type InjectionEntry = {
  date: string;
  site?: string;
  notes?: string;
};

type ProgressState = {
  weights: WeightEntry[];
  injections: InjectionEntry[];
  logWeight: (weight: number, date?: string) => void;
  removeWeight: (date: string) => void;
  logInjection: (entry: Omit<InjectionEntry, 'date'> & { date?: string }) => void;
  removeInjection: (date: string) => void;
  lastInjection: () => InjectionEntry | undefined;
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      weights: [],
      injections: [],

      logWeight: (weight, date = todayKey()) =>
        set((state) => {
          const filtered = state.weights.filter((w) => w.date !== date);
          return {
            weights: [...filtered, { date, weight }].sort((a, b) =>
              a.date.localeCompare(b.date)
            ),
          };
        }),

      removeWeight: (date) =>
        set((state) => ({
          weights: state.weights.filter((w) => w.date !== date),
        })),

      logInjection: ({ date = todayKey(), site, notes }) =>
        set((state) => {
          const filtered = state.injections.filter((i) => i.date !== date);
          return {
            injections: [...filtered, { date, site, notes }].sort((a, b) =>
              a.date.localeCompare(b.date)
            ),
          };
        }),

      removeInjection: (date) =>
        set((state) => ({
          injections: state.injections.filter((i) => i.date !== date),
        })),

      lastInjection: () => {
        const list = get().injections;
        return list.length > 0 ? list[list.length - 1] : undefined;
      },
    }),
    {
      name: 'laurens-fitness-progress-v1',
      storage: asyncStorage(),
    }
  )
);
