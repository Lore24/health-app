import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { CelebrationOverlay } from '../../src/components/CelebrationOverlay';
import { InjectionBanner } from '../../src/components/InjectionBanner';
import {
  Badge,
  Button,
  Card,
  CheckableItem,
  ProgressRing,
  Screen,
  SectionHeader,
} from '../../src/components/ui';
import {
  getMealsForDay,
  getWorkoutForDay,
  supplements,
  workoutTypeLabels,
} from '../../src/data';
import { useDayProgress, useStreak } from '../../src/hooks';
import {
  phaseLabels,
  todayKey,
  useDailyStore,
  useSettingsStore,
} from '../../src/stores';
import { accentByDomain, colors, spacing, typography } from '../../src/theme';

function todayIndex(): number {
  const day = new Date().getDay();
  return day === 0 ? 6 : day - 1;
}

function timeOfDayGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning, Lauren';
  if (hour < 18) return 'Good afternoon, Lauren';
  return 'Good evening, Lauren';
}

export default function TodayScreen() {
  const today = todayIndex();
  const dayData = getMealsForDay(today);
  const workout = getWorkoutForDay(today);
  const meals = dayData?.meals ?? [];
  const date = todayKey();

  const dayChecks = useDailyStore((s) => s.byDate[date]);
  const toggleMeal = useDailyStore((s) => s.toggleMeal);
  const toggleSupp = useDailyStore((s) => s.toggleSupplement);

  const progressionWeek = useSettingsStore((s) => s.progressionWeek);
  const phase = useSettingsStore((s) => s.getPhase());

  const dayProgress = useDayProgress();
  const { current: streak } = useStreak();

  const mealChecks = dayChecks?.meals ?? {};
  const suppChecks = dayChecks?.supplements ?? {};

  const mealsDone = meals.filter((m) => mealChecks[m.id]).length;
  const suppsDone = supplements.filter((s) => suppChecks[s.id]).length;

  const [celebrated, setCelebrated] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (dayProgress.isComplete && celebrated !== date) {
      setCelebrated(date);
      setShowCelebration(true);
    }
  }, [dayProgress.isComplete, celebrated, date]);

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.greetingBlock}>
          <Text style={typography.greeting}>{timeOfDayGreeting()}</Text>
          <Text style={typography.caption}>
            {dayData
              ? `${dayData.dayName} · here's what's on for today.`
              : "Here's what's on for today."}
          </Text>
        </View>

        <InjectionBanner />

        <View style={styles.heroRow}>
          <ProgressRing
            progress={dayProgress.fraction}
            color={colors.blush}
            caption="complete"
            size={108}
          />
          <View style={styles.streakBlock}>
            <View style={styles.streakLine}>
              <Ionicons
                name="flame"
                size={20}
                color={streak > 0 ? colors.terracotta : colors.warmGray}
              />
              <Text style={typography.metric}>
                {streak} day{streak === 1 ? '' : 's'}
              </Text>
            </View>
            <Text style={typography.caption}>
              {streak === 0 ? 'start a new streak today' : 'current streak'}
            </Text>
            <Badge
              label={`Wk ${progressionWeek} · ${phaseLabels[phase]}`}
              background={colors.sageLight}
            />
          </View>
        </View>

        <SectionHeader title="Today's workout" />
        {workout && workout.type !== 'rest' ? (
          <Card accentColor={accentByDomain.workout}>
            <View style={styles.cardHeader}>
              <View style={{ flex: 1 }}>
                <Text style={typography.cardTitle}>{workout.title}</Text>
                <Text style={typography.caption}>
                  {workout.exercises.length} exercises · ~
                  {workout.durationMinutes} min
                </Text>
              </View>
              <Badge
                label={workoutTypeLabels[workout.type]}
                background={colors.sageLight}
              />
            </View>
            <View style={{ height: spacing.md }} />
            <Button
              label="Start workout"
              color={accentByDomain.workout}
              onPress={() => router.push('/workout')}
            />
          </Card>
        ) : (
          <Card
            accentColor={accentByDomain.rest}
            background={colors.restPurpleLight}
          >
            <Text style={[typography.cardTitle, { color: colors.restPurple }]}>
              Rest day
            </Text>
            <Text style={[typography.body, { marginTop: spacing.xs }]}>
              {workout?.notes ?? 'Take it easy today.'}
            </Text>
          </Card>
        )}

        <SectionHeader
          title="Meals"
          subtitle={`${mealsDone} of ${meals.length} done`}
        />
        <Card accentColor={accentByDomain.meal}>
          {meals.map((m) => (
            <CheckableItem
              key={m.id}
              label={m.title}
              detail={m.description}
              checked={!!mealChecks[m.id]}
              onToggle={() => toggleMeal(m.id)}
              accentColor={accentByDomain.meal}
              backgroundChecked={colors.blushLight}
            />
          ))}
        </Card>

        <SectionHeader
          title="Supplements"
          subtitle={`${suppsDone} of ${supplements.length} done`}
        />
        <Card accentColor={accentByDomain.supplement}>
          {supplements.map((s) => (
            <CheckableItem
              key={s.id}
              label={s.name}
              detail={`${s.dose} · ${s.time}`}
              checked={!!suppChecks[s.id]}
              onToggle={() => toggleSupp(s.id)}
              accentColor={accentByDomain.supplement}
              backgroundChecked={colors.terraLight}
            />
          ))}
        </Card>

        <View style={{ height: spacing.xxxl }} />
      </ScrollView>
      <CelebrationOverlay
        visible={showCelebration}
        onDismiss={() => setShowCelebration(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingTop: spacing.sm,
    gap: spacing.sm,
  },
  greetingBlock: {
    paddingHorizontal: spacing.xs,
    paddingTop: spacing.sm,
    gap: spacing.xs,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.lg,
  },
  streakBlock: {
    flex: 1,
    gap: spacing.xs,
  },
  streakLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
});
