import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Badge,
  Card,
  DaySelector,
  Screen,
  SectionHeader,
} from '../../src/components/ui';
import { exerciseImage, getWorkoutForDay, workoutTypeLabels } from '../../src/data';
import { todayKey, useDailyStore } from '../../src/stores';
import { accentByDomain, colors, radii, spacing, typography } from '../../src/theme';
import { Exercise, Workout, WorkoutType } from '../../src/types';

function todayIndex(): number {
  const day = new Date().getDay();
  return day === 0 ? 6 : day - 1;
}

const accentForType: Record<WorkoutType, string> = {
  strength: accentByDomain.workout,
  pool: accentByDomain.water,
  walk: accentByDomain.water,
  recovery: accentByDomain.rest,
  rest: accentByDomain.rest,
};

const badgeBgForType: Record<WorkoutType, string> = {
  strength: colors.sageLight,
  pool: colors.waterBlueLight,
  walk: colors.waterBlueLight,
  recovery: colors.restPurpleLight,
  rest: colors.restPurpleLight,
};

export default function WorkoutScreen() {
  const today = todayIndex();
  const [day, setDay] = useState(today);
  const workout = getWorkoutForDay(day);

  return (
    <Screen>
      <SectionHeader
        title="Workout"
        subtitle={
          workout
            ? `${workout.dayName} · ${workoutTypeLabels[workout.type]} · ~${workout.durationMinutes} min`
            : undefined
        }
      />
      <DaySelector
        selectedIndex={day}
        onSelect={setDay}
        todayIndex={today}
        accentColor={accentByDomain.workout}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {workout && <WorkoutBody workout={workout} />}
        <View style={{ height: spacing.xxxl }} />
      </ScrollView>
    </Screen>
  );
}

function WorkoutBody({ workout }: { workout: Workout }) {
  if (workout.type === 'rest') return <RestDayCard workout={workout} />;

  return (
    <View style={{ gap: spacing.md }}>
      <HeaderCard workout={workout} />
      {workout.warmup && (
        <Collapsible title="Warm-up" subtitle={`${workout.warmup.length} moves · 5 min`}>
          <BulletList items={workout.warmup} accent={accentForType[workout.type]} />
        </Collapsible>
      )}
      <View style={styles.exerciseList}>
        {workout.exercises.map((ex) => (
          <ExerciseCard
            key={ex.id}
            exercise={ex}
            accent={accentForType[workout.type]}
          />
        ))}
      </View>
      {workout.cooldown && (
        <Collapsible title="Cool-down" subtitle={`${workout.cooldown.length} moves · 5 min`}>
          <BulletList items={workout.cooldown} accent={accentForType[workout.type]} />
        </Collapsible>
      )}
    </View>
  );
}

function HeaderCard({ workout }: { workout: Workout }) {
  return (
    <Card accentColor={accentForType[workout.type]}>
      <View style={styles.cardHeader}>
        <View style={{ flex: 1 }}>
          <Text style={typography.cardTitle}>{workout.title}</Text>
          {workout.notes && (
            <Text style={[typography.caption, { marginTop: spacing.xs }]}>
              {workout.notes}
            </Text>
          )}
        </View>
        <Badge
          label={workoutTypeLabels[workout.type]}
          background={badgeBgForType[workout.type]}
        />
      </View>
    </Card>
  );
}

function RestDayCard({ workout }: { workout: Workout }) {
  return (
    <Card
      accentColor={accentByDomain.rest}
      background={colors.restPurpleLight}
    >
      <View style={styles.restHeader}>
        <Ionicons name="leaf-outline" size={22} color={colors.restPurple} />
        <Text style={[typography.cardTitle, { color: colors.restPurple }]}>
          {workout.title}
        </Text>
      </View>
      <Text style={[typography.body, { marginTop: spacing.sm }]}>
        {workout.notes}
      </Text>
    </Card>
  );
}

function ExerciseCard({
  exercise,
  accent,
}: {
  exercise: Exercise;
  accent: string;
}) {
  const date = todayKey();
  const doneSets = useDailyStore(
    (s) => s.byDate[date]?.exerciseSets[exercise.id] ?? 0
  );
  const setExerciseSets = useDailyStore((s) => s.setExerciseSets);
  const img = exerciseImage(exercise.imageKey);

  const toggleSet = (idx: number) => {
    const next = idx + 1 <= doneSets ? idx : idx + 1;
    setExerciseSets(exercise.id, next);
    Haptics.impactAsync(
      next > doneSets
        ? Haptics.ImpactFeedbackStyle.Medium
        : Haptics.ImpactFeedbackStyle.Light
    );
  };

  const allDone = doneSets === exercise.sets;

  return (
    <Card
      accentColor={accent}
      onPress={() =>
        router.push({
          pathname: '/exercise/[id]',
          params: { id: exercise.id },
        })
      }
    >
      <View style={styles.exRow}>
        {img ? (
          <Image source={img} style={styles.exImage} contentFit="contain" />
        ) : (
          <View style={[styles.exImage, styles.exImagePlaceholder]}>
            <Ionicons name="fitness-outline" size={28} color={colors.warmGray} />
          </View>
        )}
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={typography.cardTitle} numberOfLines={2}>
            {exercise.name}
          </Text>
          <Text style={typography.caption}>
            {exercise.sets} × {exercise.reps}
          </Text>
          {exercise.notes && (
            <Text
              style={[typography.caption, { marginTop: spacing.xs }]}
              numberOfLines={2}
            >
              {exercise.notes}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.setsRow}>
        {Array.from({ length: exercise.sets }).map((_, idx) => {
          const filled = idx < doneSets;
          return (
            <Pressable
              key={idx}
              hitSlop={6}
              onPress={(e) => {
                e.stopPropagation?.();
                toggleSet(idx);
              }}
              style={({ pressed }) => [
                styles.setDot,
                {
                  borderColor: accent,
                  backgroundColor: filled ? accent : colors.warmWhite,
                },
                pressed ? { opacity: 0.7 } : null,
              ]}
            >
              <Text
                style={[
                  typography.badge,
                  { color: filled ? colors.warmWhite : colors.warmGray },
                ]}
              >
                {idx + 1}
              </Text>
            </Pressable>
          );
        })}
        {allDone && (
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={accent}
            style={{ marginLeft: spacing.xs }}
          />
        )}
      </View>
    </Card>
  );
}

function Collapsible({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Card padding="base">
      <Pressable
        onPress={() => setOpen((v) => !v)}
        style={styles.collapsibleHeader}
      >
        <View style={{ flex: 1 }}>
          <Text style={typography.cardTitle}>{title}</Text>
          {subtitle && <Text style={typography.caption}>{subtitle}</Text>}
        </View>
        <Ionicons
          name={open ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={colors.warmGray}
        />
      </Pressable>
      {open && <View style={{ marginTop: spacing.sm }}>{children}</View>}
    </Card>
  );
}

function BulletList({
  items,
  accent,
}: {
  items: string[];
  accent: string;
}) {
  return (
    <View style={{ gap: spacing.sm }}>
      {items.map((item, idx) => (
        <View key={idx} style={styles.bulletRow}>
          <View style={[styles.bullet, { backgroundColor: accent }]} />
          <Text style={[typography.body, { flex: 1 }]}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingTop: spacing.base,
    paddingBottom: spacing.xxxl,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  restHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  exerciseList: {
    gap: spacing.md,
  },
  exRow: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  exImage: {
    width: 72,
    height: 72,
    borderRadius: radii.md,
    backgroundColor: colors.cream,
  },
  exImagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  setsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  setDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  collapsibleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 9,
  },
});
