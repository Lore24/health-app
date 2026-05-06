import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BackHeader, Badge, Card, Screen } from '../../src/components/ui';
import { supplements } from '../../src/data';
import { accentByDomain, colors, spacing, typography } from '../../src/theme';
import { Supplement, SupplementTime } from '../../src/types';

const timeOrder: SupplementTime[] = ['morning', 'midday', 'evening', 'bedtime'];
const timeLabels: Record<SupplementTime, string> = {
  morning: 'Morning · with breakfast',
  midday: 'Midday · with lunch',
  evening: 'Evening · with dinner',
  bedtime: 'Before bed',
};

export default function SupplementReferenceScreen() {
  return (
    <Screen>
      <BackHeader
        title="Supplements"
        subtitle={`${supplements.length} daily, organized by time of day`}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {timeOrder.map((time) => {
          const items = supplements.filter((s) => s.time === time);
          if (items.length === 0) return null;
          return (
            <View key={time} style={styles.group}>
              <Text style={[typography.caption, styles.groupLabel]}>
                {timeLabels[time].toUpperCase()}
              </Text>
              {items.map((s) => (
                <SupplementCard key={s.id} supplement={s} />
              ))}
            </View>
          );
        })}
        <View style={{ height: spacing.xxxl }} />
      </ScrollView>
    </Screen>
  );
}

function SupplementCard({ supplement }: { supplement: Supplement }) {
  return (
    <Card accentColor={accentByDomain.supplement}>
      <View style={styles.row}>
        <Text style={[typography.cardTitle, { flex: 1 }]}>{supplement.name}</Text>
        <Badge label={supplement.dose} background={colors.terraLight} />
      </View>
      <Text style={[typography.body, styles.reason]}>{supplement.reason}</Text>
      {supplement.notes && (
        <Text style={[typography.caption, styles.notes]}>
          {supplement.notes}
        </Text>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: spacing.xxxl,
    gap: spacing.lg,
  },
  group: {
    gap: spacing.sm,
  },
  groupLabel: {
    paddingHorizontal: spacing.xs,
    letterSpacing: 1.2,
    fontWeight: '600',
    color: colors.warmGray,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  reason: {
    marginTop: spacing.xs,
  },
  notes: {
    marginTop: spacing.sm,
    fontStyle: 'italic',
  },
});
