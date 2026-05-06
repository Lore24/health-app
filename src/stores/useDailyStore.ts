import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { asyncStorage, todayKey } from './persist';

type DayChecks = {
  meals: Record<string, boolean>;
  supplements: Record<string, boolean>;
  exerciseSets: Record<string, number>;
};

const emptyDay = (): DayChecks => ({
  meals: {},
  supplements: {},
  exerciseSets: {},
});

type DailyState = {
  byDate: Record<string, DayChecks>;
  toggleMeal: (id: string, date?: string) => void;
  toggleSupplement: (id: string, date?: string) => void;
  setExerciseSets: (id: string, count: number, date?: string) => void;
  resetDay: (date?: string) => void;
  getDay: (date?: string) => DayChecks;
};

function ensure(byDate: Record<string, DayChecks>, date: string): DayChecks {
  return byDate[date] ?? emptyDay();
}

export const useDailyStore = create<DailyState>()(
  persist(
    (set, get) => ({
      byDate: {},

      toggleMeal: (id, date = todayKey()) =>
        set((state) => {
          const day = ensure(state.byDate, date);
          return {
            byDate: {
              ...state.byDate,
              [date]: {
                ...day,
                meals: { ...day.meals, [id]: !day.meals[id] },
              },
            },
          };
        }),

      toggleSupplement: (id, date = todayKey()) =>
        set((state) => {
          const day = ensure(state.byDate, date);
          return {
            byDate: {
              ...state.byDate,
              [date]: {
                ...day,
                supplements: {
                  ...day.supplements,
                  [id]: !day.supplements[id],
                },
              },
            },
          };
        }),

      setExerciseSets: (id, count, date = todayKey()) =>
        set((state) => {
          const day = ensure(state.byDate, date);
          return {
            byDate: {
              ...state.byDate,
              [date]: {
                ...day,
                exerciseSets: { ...day.exerciseSets, [id]: count },
              },
            },
          };
        }),

      resetDay: (date = todayKey()) =>
        set((state) => ({
          byDate: { ...state.byDate, [date]: emptyDay() },
        })),

      getDay: (date = todayKey()) => ensure(get().byDate, date),
    }),
    {
      name: 'laurens-fitness-daily-v1',
      storage: asyncStorage(),
    }
  )
);
