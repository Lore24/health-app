import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BackHeader, Card, Screen } from '../../src/components/ui';
import { foodGuidelines } from '../../src/data';
import { colors, radii, spacing, typography } from '../../src/theme';
import { FoodGuidelineList } from '../../src/types';

const tabs: { key: FoodGuidelineList; label: string; color: string }[] = [
  { key: 'enjoy', label: 'Enjoy', color: colors.success },
  { key: 'limit', label: 'Limit', color: colors.warning },
  { key: 'avoid', label: 'Avoid', color: colors.terracotta },
];

export default function FoodGuidelinesScreen() {
  const [active, setActive] = useState<FoodGuidelineList>('enjoy');
  const activeColor = tabs.find((t) => t.key === active)!.color;
  const sections = foodGuidelines.filter((g) => g.list === active);

  return (
    <Screen>
      <BackHeader title="Food guidelines" subtitle="From your meal plan" />
      <View style={styles.tabRow}>
        {tabs.map((t) => {
          const isActive = t.key === active;
          return (
            <Pressable
              key={t.key}
              onPress={() => setActive(t.key)}
              style={({ pressed }) => [
                styles.tab,
                isActive
                  ? { backgroundColor: t.color }
                  : { backgroundColor: colors.warmWhite },
                pressed ? { opacity: 0.7 } : null,
              ]}
            >
              <Text
                style={[
                  typography.bodyEmphasized,
                  { color: isActive ? colors.warmWhite : colors.charcoal },
                ]}
              >
                {t.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {sections.map((sec) => (
          <Card key={sec.group} accentColor={activeColor}>
            <Text style={typography.cardTitle}>{sec.group}</Text>
            <View style={styles.itemList}>
              {sec.items.map((item, idx) => (
                <View key={idx} style={styles.itemRow}>
                  <Ionicons
                    name={
                      active === 'enjoy'
                        ? 'checkmark-circle-outline'
                        : active === 'limit'
                          ? 'alert-circle-outline'
                          : 'close-circle-outline'
                    }
                    size={16}
                    color={activeColor}
                  />
                  <Text style={[typography.body, { flex: 1 }]}>{item}</Text>
                </View>
              ))}
            </View>
          </Card>
        ))}
        <View style={{ height: spacing.xxxl }} />
      </ScrollView>
    </Screen>
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
  itemList: {
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  itemRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
});
