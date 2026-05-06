import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { supplements } from '../data/supplements';
import { DayIndex, SupplementTime } from '../types';

const TAG_PREFIX = 'lf-';

const supplementTimes: Record<SupplementTime, { hour: number; minute: number }> = {
  morning: { hour: 8, minute: 0 },
  midday: { hour: 12, minute: 30 },
  evening: { hour: 18, minute: 30 },
  bedtime: { hour: 21, minute: 30 },
};

const supplementCopy: Record<SupplementTime, string> = {
  morning: 'Morning supplements with breakfast',
  midday: 'Midday supplements with lunch',
  evening: 'Evening supplements with dinner',
  bedtime: 'Bedtime fiber + water',
};

// Expo iOS uses 1=Sunday..7=Saturday for weekly triggers.
function expoWeekdayFromMondayIndex(d: DayIndex): number {
  // 0=Mon -> 2, 1=Tue -> 3, ... 5=Sat -> 7, 6=Sun -> 1
  return d === 6 ? 1 : d + 2;
}

export async function ensurePermission(): Promise<boolean> {
  const existing = await Notifications.getPermissionsAsync();
  if (existing.granted) return true;
  if (existing.canAskAgain) {
    const req = await Notifications.requestPermissionsAsync({
      ios: { allowAlert: true, allowBadge: true, allowSound: true },
    });
    return req.granted;
  }
  return false;
}

export async function configureHandler(): Promise<void> {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Reminders',
      importance: Notifications.AndroidImportance.DEFAULT,
      sound: 'default',
    });
  }
}

async function clearOurScheduled(): Promise<void> {
  const all = await Notifications.getAllScheduledNotificationsAsync();
  await Promise.all(
    all
      .filter((n) => typeof n.identifier === 'string' && n.identifier.startsWith(TAG_PREFIX))
      .map((n) => Notifications.cancelScheduledNotificationAsync(n.identifier))
  );
}

export async function scheduleAll(opts: {
  injectionDay: DayIndex;
}): Promise<{ scheduled: number }> {
  await clearOurScheduled();

  const slots = (Object.keys(supplementTimes) as SupplementTime[]).filter(
    (t) => supplements.some((s) => s.time === t)
  );

  let scheduled = 0;
  for (const slot of slots) {
    const { hour, minute } = supplementTimes[slot];
    const items = supplements.filter((s) => s.time === slot);
    if (items.length === 0) continue;

    const body =
      items.length === 1
        ? items[0].name
        : `${items.length} supplements: ${items.map((i) => i.name).join(', ')}`;

    await Notifications.scheduleNotificationAsync({
      identifier: `${TAG_PREFIX}supp-${slot}`,
      content: {
        title: supplementCopy[slot],
        body,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      },
    });
    scheduled += 1;
  }

  await Notifications.scheduleNotificationAsync({
    identifier: `${TAG_PREFIX}inj-day`,
    content: {
      title: 'Injection day',
      body: 'A reminder to take your Mounjaro dose when you have a quiet moment.',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
      weekday: expoWeekdayFromMondayIndex(opts.injectionDay),
      hour: 9,
      minute: 0,
    },
  });
  scheduled += 1;

  return { scheduled };
}

export async function cancelAll(): Promise<void> {
  await clearOurScheduled();
}

export async function listScheduled() {
  const all = await Notifications.getAllScheduledNotificationsAsync();
  return all.filter(
    (n) => typeof n.identifier === 'string' && n.identifier.startsWith(TAG_PREFIX)
  );
}
