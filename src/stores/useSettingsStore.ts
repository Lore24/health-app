import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { asyncStorage } from './persist';
import { DayIndex } from '../types';

export type ProgressionPhase = 'foundation' | 'build' | 'intensify' | 'refresh';

type SettingsState = {
  injectionDay: DayIndex;
  progressionWeek: number;
  notificationsEnabled: boolean;
  setInjectionDay: (day: DayIndex) => void;
  setProgressionWeek: (week: number) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  getPhase: () => ProgressionPhase;
};

function phaseFor(week: number): ProgressionPhase {
  if (week <= 2) return 'foundation';
  if (week <= 4) return 'build';
  if (week <= 6) return 'intensify';
  return 'refresh';
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      injectionDay: 6,
      progressionWeek: 1,
      notificationsEnabled: false,
      setInjectionDay: (day) => set({ injectionDay: day }),
      setProgressionWeek: (week) =>
        set({ progressionWeek: Math.max(1, Math.min(8, week)) }),
      setNotificationsEnabled: (enabled) =>
        set({ notificationsEnabled: enabled }),
      getPhase: () => phaseFor(get().progressionWeek),
    }),
    {
      name: 'laurens-fitness-settings-v1',
      storage: asyncStorage(),
    }
  )
);

export const phaseLabels: Record<ProgressionPhase, string> = {
  foundation: 'Foundation',
  build: 'Build',
  intensify: 'Intensify',
  refresh: 'Refresh',
};
