import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BackHeader, Card, Screen } from '../../src/components/ui';
import { eatingTips, workoutTips, TipSection } from '../../src/data';
import { accentByDomain, colors, radii, spacing, typography } from '../../src/theme';

type TabKey = 'eating' | 'workout';

export default function MounjaroTipsScreen() {
  const [tab, setTab] = useState<TabKey>('eating');
  const sections = tab === 'eating' ? eatingTips : workoutTips;

  return (
    <Screen>
      <BackHeader
        title="Mounjaro tips"
        subtitle="Eating and workout strategies"
      />
      <View style={styles.tabRow}>
        <TabButton
          label="Eating"
          active={tab === 'eating'}
          onPress={() => setTab('eating')}
        />
        <TabButton
          label="Workout"
          active={tab === 'workout'}
          onPress={() => setTab('workout')}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {sections.map((section) => (
          <SectionCard key={section.id} section={section} />
        ))}
        <View style={{ height: spacing.xxxl }} />
      </ScrollView>
    </Screen>
  );
}

function TabButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.tab,
        active
          ? { backgroundColor: accentByDomain.injection }
          : { backgroundColor: colors.warmWhite },
        pressed ? { opacity: 0.7 } : null,
      ]}
    >
      <Text
        style={[
          typography.bodyEmphasized,
          { color: active ? colors.warmWhite : colors.charcoal },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function SectionCard({ section }: { section: TipSection }) {
  return (
    <Card accentColor={accentByDomain.injection}>
      <Text style={typography.cardTitle}>{section.title}</Text>
      <View style={styles.tipList}>
        {section.tips.map((tip, idx) => (
          <View key={idx} style={styles.tipRow}>
            <Ionicons
              name="bulb-outline"
              size={14}
              color={colors.terracotta}
              style={{ marginTop: 4 }}
            />
            <Text style={[typography.body, { flex: 1 }]}>{tip}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  tabRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingBottom: spacing.base,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
    alignItems: 'center',
  },
  scroll: {
    paddingBottom: spacing.xxxl,
    gap: spacing.md,
  },
  tipList: {
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  tipRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
});
