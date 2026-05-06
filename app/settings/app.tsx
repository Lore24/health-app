import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { BackHeader, Badge, Card, Screen } from '../../src/components/ui';
import {
  cancelAll,
  ensurePermission,
  scheduleAll,
} from '../../src/notifications/schedule';
import { phaseLabels, useSettingsStore } from '../../src/stores';
import { accentByDomain, colors, radii, spacing, typography } from '../../src/theme';
import { DayIndex } from '../../src/types';

const DAY_LABELS: { idx: DayIndex; short: string; full: string }[] = [
  { idx: 0, short: 'Mon', full: 'Monday' },
  { idx: 1, short: 'Tue', full: 'Tuesday' },
  { idx: 2, short: 'Wed', full: 'Wednesday' },
  { idx: 3, short: 'Thu', full: 'Thursday' },
  { idx: 4, short: 'Fri', full: 'Friday' },
  { idx: 5, short: 'Sat', full: 'Saturday' },
  { idx: 6, short: 'Sun', full: 'Sunday' },
];

export default function AppSettingsScreen() {
  const injectionDay = useSettingsStore((s) => s.injectionDay);
  const setInjectionDay = useSettingsStore((s) => s.setInjectionDay);
  const progressionWeek = useSettingsStore((s) => s.progressionWeek);
  const setProgressionWeek = useSettingsStore((s) => s.setProgressionWeek);
  const phase = useSettingsStore((s) => s.getPhase());
  const notificationsEnabled = useSettingsStore((s) => s.notificationsEnabled);
  const setNotificationsEnabled = useSettingsStore(
    (s) => s.setNotificationsEnabled
  );
  const [busy, setBusy] = useState(false);

  const handleNotificationsToggle = async (next: boolean) => {
    setBusy(true);
    try {
      if (next) {
        const granted = await ensurePermission();
        if (!granted) {
          Alert.alert(
            'Notifications disabled',
            'Enable notifications for Lauren\'s Fitness in iOS Settings to get supplement and injection reminders.'
          );
          return;
        }
        await scheduleAll({ injectionDay });
        setNotificationsEnabled(true);
      } else {
        await cancelAll();
        setNotificationsEnabled(false);
      }
    } finally {
      setBusy(false);
    }
  };

  const handleInjectionDayChange = async (day: DayIndex) => {
    setInjectionDay(day);
    if (notificationsEnabled) {
      await scheduleAll({ injectionDay: day });
    }
  };

  return (
    <Screen>
      <BackHeader title="App settings" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <Card accentColor={accentByDomain.injection}>
          <Text style={typography.cardTitle}>Injection day</Text>
          <Text style={[typography.caption, { marginTop: 2 }]}>
            Used to time the day-after "take it easy" banner.
          </Text>
          <View style={styles.dayRow}>
            {DAY_LABELS.map((d) => {
              const active = d.idx === injectionDay;
              return (
                <Pressable
                  key={d.idx}
                  onPress={() => handleInjectionDayChange(d.idx)}
                  style={({ pressed }) => [
                    styles.dayBtn,
                    active
                      ? { backgroundColor: colors.terracotta }
                      : { backgroundColor: colors.warmWhite },
                    pressed ? { opacity: 0.7 } : null,
                  ]}
                >
                  <Text
                    style={{
                      ...typography.badge,
                      color: active ? colors.warmWhite : colors.charcoal,
                    }}
                  >
                    {d.short}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </Card>

        <Card accentColor={accentByDomain.workout}>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={typography.cardTitle}>Progression week</Text>
              <Text style={[typography.caption, { marginTop: 2 }]}>
                Drives the 8-week phase shown on your dashboard.
              </Text>
            </View>
            <Badge label={phaseLabels[phase]} background={colors.sageLight} />
          </View>
          <View style={styles.weekRow}>
            <Pressable
              onPress={() => setProgressionWeek(progressionWeek - 1)}
              hitSlop={8}
              disabled={progressionWeek <= 1}
              style={({ pressed }) => [
                styles.stepBtn,
                {
                  opacity: progressionWeek <= 1 ? 0.3 : pressed ? 0.6 : 1,
                },
              ]}
            >
              <Ionicons name="remove" size={20} color={colors.charcoal} />
            </Pressable>
            <View style={styles.weekDisplay}>
              <Text style={typography.metric}>Week {progressionWeek}</Text>
              <Text style={typography.caption}>of 8</Text>
            </View>
            <Pressable
              onPress={() => setProgressionWeek(progressionWeek + 1)}
              hitSlop={8}
              disabled={progressionWeek >= 8}
              style={({ pressed }) => [
                styles.stepBtn,
                {
                  opacity: progressionWeek >= 8 ? 0.3 : pressed ? 0.6 : 1,
                },
              ]}
            >
              <Ionicons name="add" size={20} color={colors.charcoal} />
            </Pressable>
          </View>
        </Card>

        <Card>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={typography.cardTitle}>Notifications</Text>
              <Text style={[typography.caption, { marginTop: 2 }]}>
                Reminders for supplements and your injection day.
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleNotificationsToggle}
              disabled={busy}
              trackColor={{
                false: colors.sand,
                true: colors.sage,
              }}
              thumbColor={colors.warmWhite}
            />
          </View>
          {notificationsEnabled && (
            <Text style={[typography.caption, styles.notif]}>
              Daily at 8a / 12:30p / 6:30p / 9:30p, plus a weekly nudge on
              your injection day.
            </Text>
          )}
        </Card>

        <View style={{ height: spacing.xxxl }} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: spacing.xxxl,
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dayRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.md,
  },
  dayBtn: {
    flex: 1,
    minWidth: 44,
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
    alignItems: 'center',
  },
  weekRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  stepBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekDisplay: {
    alignItems: 'center',
    flex: 1,
  },
  notif: {
    marginTop: spacing.sm,
    fontStyle: 'italic',
  },
});
