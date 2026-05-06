import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Card, Screen } from '../../src/components/ui';
import { exerciseImage, workouts } from '../../src/data';
import { accentByDomain, colors, radii, spacing, typography } from '../../src/theme';
import { Exercise } from '../../src/types';

function findExercise(id: string): Exercise | undefined {
  for (const w of workouts) {
    const ex = w.exercises.find((e) => e.id === id);
    if (ex) return ex;
  }
  return undefined;
}

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const exercise = id ? findExercise(id) : undefined;

  if (!exercise) {
    return (
      <Screen edges={['top', 'bottom', 'left', 'right']}>
        <CloseButton />
        <View style={styles.empty}>
          <Text style={typography.title}>Exercise not found</Text>
        </View>
      </Screen>
    );
  }

  const img = exerciseImage(exercise.imageKey);

  return (
    <Screen edges={['top', 'bottom', 'left', 'right']}>
      <CloseButton />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.header}>
          <Text style={typography.title}>{exercise.name}</Text>
          <View style={styles.metaRow}>
            <Pill label={`${exercise.sets} sets`} />
            <Pill label={`${exercise.reps}`} />
          </View>
        </View>

        {img && (
          <View style={styles.imageWrap}>
            <Image
              source={img}
              style={styles.image}
              contentFit="contain"
              transition={150}
            />
          </View>
        )}

        {exercise.notes && (
          <Card accentColor={accentByDomain.workout}>
            <Text style={[typography.cardTitle, styles.cardTitle]}>
              How to do it
            </Text>
            <Text style={typography.body}>{exercise.notes}</Text>
          </Card>
        )}

        <Card>
          <Text style={[typography.cardTitle, styles.cardTitle]}>Form cues</Text>
          <BulletList
            items={[
              'Move slowly — control beats speed.',
              'Breathe out on the work, in on the return.',
              'Stop if you feel sharp pain (soreness is fine).',
              'Pick a weight where the last 2 reps feel hard but doable.',
            ]}
          />
        </Card>
        <View style={{ height: spacing.xxxl }} />
      </ScrollView>
    </Screen>
  );
}

function CloseButton() {
  return (
    <Pressable
      onPress={() => router.back()}
      hitSlop={12}
      style={({ pressed }) => [
        styles.closeButton,
        pressed ? { opacity: 0.6 } : null,
      ]}
    >
      <Ionicons name="close" size={22} color={colors.charcoal} />
    </Pressable>
  );
}

function Pill({ label }: { label: string }) {
  return (
    <View style={styles.pill}>
      <Text style={styles.pillText}>{label}</Text>
    </View>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <View style={{ gap: spacing.xs, marginTop: spacing.xs }}>
      {items.map((item, idx) => (
        <View key={idx} style={styles.bulletRow}>
          <View style={styles.bullet} />
          <Text style={[typography.body, { flex: 1 }]}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxxl,
    gap: spacing.lg,
  },
  closeButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.base,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.warmWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingHorizontal: spacing.xs,
    gap: spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  pill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
    backgroundColor: colors.sageLight,
  },
  pillText: {
    ...typography.badge,
    color: colors.charcoal,
  },
  imageWrap: {
    backgroundColor: colors.warmWhite,
    borderRadius: radii.lg,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 280,
  },
  cardTitle: {
    marginBottom: spacing.xs,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: accentByDomain.workout,
    marginTop: 9,
  },
});
