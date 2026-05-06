import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { WeightChart } from '../../src/components/WeightChart';
import {
  Badge,
  Button,
  Card,
  ProgressRing,
  Screen,
  SectionHeader,
} from '../../src/components/ui';
import {
  phaseLabels,
  useProgressStore,
  useSettingsStore,
} from '../../src/stores';
import { accentByDomain, colors, spacing, typography } from '../../src/theme';

export default function ProgressScreen() {
  const weights = useProgressStore((s) => s.weights);
  const injections = useProgressStore((s) => s.injections);
  const progressionWeek = useSettingsStore((s) => s.progressionWeek);
  const phase = useSettingsStore((s) => s.getPhase());
  const injectionDay = useSettingsStore((s) => s.injectionDay);

  const { latestWeight, weightDelta } = useMemo(() => {
    if (weights.length === 0) return { latestWeight: undefined, weightDelta: undefined };
    const latest = weights[weights.length - 1];
    const first = weights[0];
    return {
      latestWeight: latest.weight,
      weightDelta: weights.length > 1 ? latest.weight - first.weight : undefined,
    };
  }, [weights]);

  const lastInjection = injections.length > 0 ? injections[injections.length - 1] : undefined;
  const daysSince = useMemo(() => {
    if (!lastInjection) return undefined;
    const diff = Date.now() - new Date(lastInjection.date).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }, [lastInjection]);

  return (
    <Screen>
      <SectionHeader
        title="Progress"
        subtitle="Weight, injection cycle, and 8-week phase"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <Card>
          <View style={styles.row}>
            <ProgressRing
              progress={progressionWeek / 8}
              color={colors.sage}
              caption="of 8 weeks"
              label={`Wk ${progressionWeek}`}
            />
            <View style={{ flex: 1, gap: spacing.xs }}>
              <Text style={typography.cardTitle}>{phaseLabels[phase]} phase</Text>
              <Text style={typography.caption}>{phaseDescription(phase)}</Text>
              <Badge label={phaseLabels[phase]} background={colors.sageLight} />
            </View>
          </View>
        </Card>

        <Card accentColor={accentByDomain.injection}>
          <View style={styles.cardHead}>
            <Ionicons name="medical-outline" size={18} color={colors.terracotta} />
            <Text style={[typography.cardTitle, { flex: 1 }]}>
              Mounjaro 15mg
            </Text>
          </View>
          {lastInjection ? (
            <View style={{ marginTop: spacing.sm, gap: 2 }}>
              <Text style={typography.body}>
                Last injection: {formatDate(lastInjection.date)}
              </Text>
              <Text style={typography.caption}>
                {daysSince === 0
                  ? 'Today'
                  : daysSince === 1
                    ? 'Yesterday'
                    : `${daysSince} days ago`}
                {lastInjection.site ? ` · ${lastInjection.site}` : ''}
              </Text>
            </View>
          ) : (
            <Text style={[typography.body, { marginTop: spacing.sm }]}>
              No injections logged yet. Your scheduled day is{' '}
              {weekdayName(injectionDay)}.
            </Text>
          )}
          <Button
            label="Log injection"
            onPress={() => router.push('/log/injection')}
            color={colors.terracotta}
            size="md"
            style={{ marginTop: spacing.md }}
          />
        </Card>

        <Card>
          <View style={styles.cardHead}>
            <Ionicons name="trending-down-outline" size={18} color={colors.charcoal} />
            <Text style={[typography.cardTitle, { flex: 1 }]}>Weight</Text>
          </View>
          {latestWeight ? (
            <>
              <View style={{ marginTop: spacing.sm, gap: spacing.xs }}>
                <Text style={typography.metric}>
                  {latestWeight.toFixed(1)} lbs
                </Text>
                <Text style={typography.caption}>
                  {weights.length} entr{weights.length === 1 ? 'y' : 'ies'} logged
                  {weightDelta !== undefined &&
                    ` · ${weightDelta >= 0 ? '+' : ''}${weightDelta.toFixed(1)} lbs total`}
                </Text>
              </View>
              <View style={styles.chartWrap}>
                <WeightChart entries={weights} />
              </View>
            </>
          ) : (
            <Text style={[typography.body, { marginTop: spacing.sm }]}>
              No weight entries yet. Weekly logging works best — same day, same
              time, same conditions.
            </Text>
          )}
          <Button
            label="Log weight"
            onPress={() => router.push('/log/weight')}
            color={colors.blush}
            size="md"
            style={{ marginTop: spacing.md }}
          />
        </Card>

        <View style={{ height: spacing.xxxl }} />
      </ScrollView>
    </Screen>
  );
}

function phaseDescription(phase: keyof typeof phaseLabels): string {
  switch (phase) {
    case 'foundation':
      return 'Build the habit. Prioritize consistency over intensity.';
    case 'build':
      return 'Add weight or sets where exercises feel easy.';
    case 'intensify':
      return 'Slow the lowering phase. Add reps or weight again.';
    case 'refresh':
      return 'Swap in new variations to keep things interesting.';
  }
}

function weekdayName(idx: number): string {
  return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][idx] ?? 'Sunday';
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

const styles = StyleSheet.create({
  scroll: {
    paddingTop: spacing.base,
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  chartWrap: {
    marginTop: spacing.md,
    marginHorizontal: -spacing.sm,
  },
});
