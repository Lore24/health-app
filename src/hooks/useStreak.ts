import { useMemo } from 'react';
import { useDailyStore } from '../stores/useDailyStore';
import { getMealsForDay } from '../data/meals';
import { getWorkoutForDay } from '../data/workouts';
import { supplements } from '../data/supplements';

function dateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function dayIndexFor(d: Date): number {
  const j = d.getDay();
  return j === 0 ? 6 : j - 1;
}

type DayCounts = {
  meals: number;
  supps: number;
  sets: number;
  isRest: boolean;
};

function dayCounts(date: Date): DayCounts {
  const idx = dayIndexFor(date);
  const meals = getMealsForDay(idx)?.meals ?? [];
  const workout = getWorkoutForDay(idx);
  const sets =
    workout && workout.type !== 'rest'
      ? workout.exercises.reduce((sum, e) => sum + e.sets, 0)
      : 0;
  return {
    meals: meals.length,
    supps: supplements.length,
    sets,
    isRest: workout?.type === 'rest',
  };
}

export type DayProgress = {
  meals: number;
  supps: number;
  sets: number;
  totalMeals: number;
  totalSupps: number;
  totalSets: number;
  fraction: number;
  isComplete: boolean;
  isRest: boolean;
};

export function useDayProgress(date: Date = new Date()): DayProgress {
  const key = dateKey(date);
  const dayChecks = useDailyStore((s) => s.byDate[key]);

  return useMemo(() => {
    const counts = dayCounts(date);
    const mealDone = Object.values(dayChecks?.meals ?? {}).filter(Boolean).length;
    const suppDone = Object.values(dayChecks?.supplements ?? {}).filter(Boolean).length;
    const setDone = Object.values(dayChecks?.exerciseSets ?? {}).reduce(
      (sum, n) => sum + (typeof n === 'number' ? n : 0),
      0
    );

    const total = counts.meals + counts.supps + counts.sets;
    const done = mealDone + suppDone + Math.min(setDone, counts.sets);
    const fraction = total === 0 ? 0 : done / total;

    return {
      meals: mealDone,
      supps: suppDone,
      sets: Math.min(setDone, counts.sets),
      totalMeals: counts.meals,
      totalSupps: counts.supps,
      totalSets: counts.sets,
      fraction,
      isComplete: total > 0 && done >= total,
      isRest: counts.isRest,
    };
  }, [dayChecks, date]);
}

function isDayActive(
  checks: ReturnType<typeof useDailyStore.getState>['byDate'][string] | undefined,
  isRest: boolean
): boolean {
  if (!checks) return false;
  const meals = Object.values(checks.meals ?? {}).filter(Boolean).length;
  const supps = Object.values(checks.supplements ?? {}).filter(Boolean).length;
  const sets = Object.values(checks.exerciseSets ?? {}).reduce(
    (sum, n) => sum + (typeof n === 'number' ? n : 0),
    0
  );
  if (isRest) return meals > 0 || supps > 0;
  return sets > 0 || meals > 0;
}

export function useStreak(): { current: number; longest: number } {
  const byDate = useDailyStore((s) => s.byDate);

  return useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let current = 0;
    let longest = 0;
    let run = 0;

    for (let offset = 0; offset < 365; offset++) {
      const d = new Date(today);
      d.setDate(today.getDate() - offset);
      const counts = dayCounts(d);
      const active = isDayActive(byDate[dateKey(d)], counts.isRest);

      if (active) {
        run += 1;
      } else if (offset === 0) {
        // today not active yet — don't break the streak in progress
        continue;
      } else {
        longest = Math.max(longest, run);
        if (current === 0) current = run;
        run = 0;
      }
    }
    if (current === 0) current = run;
    longest = Math.max(longest, run);
    return { current, longest };
  }, [byDate]);
}
