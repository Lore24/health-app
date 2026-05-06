import { useMemo } from 'react';
import { useProgressStore } from '../stores/useProgressStore';
import { useSettingsStore } from '../stores/useSettingsStore';

export type InjectionStatus =
  | { kind: 'today' }
  | { kind: 'day-after'; daysSince: number }
  | { kind: 'overdue'; daysOverdue: number; scheduledDay: number }
  | { kind: 'upcoming'; daysUntil: number; scheduledDay: number }
  | { kind: 'none' };

function todayDayIndex(): number {
  const j = new Date().getDay();
  return j === 0 ? 6 : j - 1;
}

function daysSinceDate(iso: string): number {
  const a = new Date(iso);
  a.setHours(0, 0, 0, 0);
  const b = new Date();
  b.setHours(0, 0, 0, 0);
  return Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

export function useInjectionStatus(): InjectionStatus {
  const injections = useProgressStore((s) => s.injections);
  const scheduledDay = useSettingsStore((s) => s.injectionDay);

  return useMemo(() => {
    const today = todayDayIndex();
    const last = injections[injections.length - 1];

    if (today === scheduledDay) {
      const sinceLast = last ? daysSinceDate(last.date) : Infinity;
      if (sinceLast === 0) return { kind: 'day-after', daysSince: 0 };
      return { kind: 'today' };
    }

    if (last) {
      const since = daysSinceDate(last.date);
      if (since === 1) return { kind: 'day-after', daysSince: 1 };
      if (since > 7) {
        return {
          kind: 'overdue',
          daysOverdue: since - 7,
          scheduledDay,
        };
      }
    }

    const daysUntil = (scheduledDay - today + 7) % 7;
    if (daysUntil === 0) return { kind: 'today' };
    return { kind: 'upcoming', daysUntil, scheduledDay };
  }, [injections, scheduledDay]);
}
