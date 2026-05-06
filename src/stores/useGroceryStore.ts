import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { asyncStorage } from './persist';

type GroceryState = {
  checked: Record<string, boolean>;
  toggle: (id: string) => void;
  resetAll: () => void;
};

export const useGroceryStore = create<GroceryState>()(
  persist(
    (set) => ({
      checked: {},
      toggle: (id) =>
        set((state) => ({
          checked: { ...state.checked, [id]: !state.checked[id] },
        })),
      resetAll: () => set({ checked: {} }),
    }),
    {
      name: 'laurens-fitness-grocery-v1',
      storage: asyncStorage(),
    }
  )
);
