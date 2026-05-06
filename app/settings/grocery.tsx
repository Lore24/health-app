import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  BackHeader,
  Badge,
  Card,
  CheckableItem,
  Screen,
} from '../../src/components/ui';
import { groceryCategoryLabels, groceryList } from '../../src/data';
import { useGroceryStore } from '../../src/stores';
import { accentByDomain, colors, spacing, typography } from '../../src/theme';
import { GroceryCategory } from '../../src/types';

const categoryOrder: GroceryCategory[] = [
  'proteins',
  'vegetables',
  'fruits',
  'grains',
  'legumes',
  'fats',
  'dairy',
  'pantry',
  'herbs',
];

export default function GroceryScreen() {
  const checks = useGroceryStore((s) => s.checked);
  const toggle = useGroceryStore((s) => s.toggle);
  const resetAll = useGroceryStore((s) => s.resetAll);

  const grouped = useMemo(() => {
    return categoryOrder
      .map((cat) => ({
        category: cat,
        items: groceryList.filter((g) => g.category === cat),
      }))
      .filter((g) => g.items.length > 0);
  }, []);

  const totalDone = Object.values(checks).filter(Boolean).length;

  return (
    <Screen>
      <BackHeader
        title="Grocery list"
        subtitle={`${totalDone} of ${groceryList.length} checked off`}
      />
      {totalDone > 0 && (
        <Pressable
          onPress={resetAll}
          hitSlop={8}
          style={({ pressed }) => [
            styles.resetBtn,
            pressed ? { opacity: 0.6 } : null,
          ]}
        >
          <Ionicons name="refresh" size={14} color={colors.warmGray} />
          <Text style={[typography.caption, { color: colors.warmGray }]}>
            Reset all
          </Text>
        </Pressable>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {grouped.map(({ category, items }) => {
          const doneInCat = items.filter((i) => checks[i.id]).length;
          return (
            <View key={category} style={styles.group}>
              <View style={styles.groupHeader}>
                <Text style={[typography.cardTitle, { flex: 1 }]}>
                  {groceryCategoryLabels[category]}
                </Text>
                <Badge
                  label={`${doneInCat}/${items.length}`}
                  background={colors.sand}
                />
              </View>
              <Card accentColor={accentByDomain.meal} padding="sm">
                {items.map((item) => (
                  <CheckableItem
                    key={item.id}
                    label={item.name}
                    checked={!!checks[item.id]}
                    onToggle={() => toggle(item.id)}
                    accentColor={accentByDomain.meal}
                    backgroundChecked={colors.blushLight}
                  />
                ))}
              </Card>
            </View>
          );
        })}
        <View style={{ height: spacing.xxxl }} />
      </ScrollView>
    </Screen>
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
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    alignSelf: 'flex-end',
    paddingHorizontal: spacing.xs,
    paddingBottom: spacing.sm,
  },
});
