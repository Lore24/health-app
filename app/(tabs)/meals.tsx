import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  Badge,
  Card,
  DaySelector,
  Screen,
  SectionHeader,
} from '../../src/components/ui';
import { getMealsForDay } from '../../src/data';
import { accentByDomain, colors, spacing, typography } from '../../src/theme';
import { Meal, MealSlot } from '../../src/types';

const slotLabels: Record<MealSlot, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snacks',
};

const slotOrder: MealSlot[] = ['breakfast', 'lunch', 'dinner', 'snack'];

function todayIndex(): number {
  const day = new Date().getDay();
  return day === 0 ? 6 : day - 1;
}

export default function MealsScreen() {
  const today = todayIndex();
  const [day, setDay] = useState(today);

  const dayData = getMealsForDay(day);

  const groupedMeals = useMemo(() => {
    if (!dayData) return [];
    return slotOrder
      .map((slot) => ({
        slot,
        meals: dayData.meals.filter((m) => m.slot === slot),
      }))
      .filter((group) => group.meals.length > 0);
  }, [dayData]);

  return (
    <Screen>
      <SectionHeader
        title="Meal plan"
        subtitle={dayData ? `${dayData.dayName} · DASH-based, ~1,400–1,600 cal` : undefined}
      />
      <DaySelector
        selectedIndex={day}
        onSelect={setDay}
        todayIndex={today}
        accentColor={accentByDomain.meal}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {groupedMeals.map((group) => (
          <View key={group.slot} style={styles.group}>
            <Text style={[typography.caption, styles.slotLabel]}>
              {slotLabels[group.slot].toUpperCase()}
            </Text>
            {group.meals.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </View>
        ))}
        <View style={{ height: spacing.xxxl }} />
      </ScrollView>
    </Screen>
  );
}

function MealCard({ meal }: { meal: Meal }) {
  const hasRecipe = Boolean(meal.recipeId);
  return (
    <Card
      accentColor={accentByDomain.meal}
      onPress={
        hasRecipe
          ? () =>
              router.push({
                pathname: '/recipe/[id]',
                params: { id: meal.recipeId! },
              })
          : undefined
      }
    >
      <View style={styles.cardHeader}>
        <Text style={[typography.cardTitle, styles.title]} numberOfLines={2}>
          {meal.title}
        </Text>
        {hasRecipe && <Badge label="Recipe" background={colors.blushLight} />}
      </View>
      <Text style={[typography.body, styles.description]}>
        {meal.description}
      </Text>
      {hasRecipe && (
        <Text style={[typography.caption, styles.hint]}>Tap for full recipe →</Text>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingTop: spacing.base,
    gap: spacing.lg,
  },
  group: {
    gap: spacing.sm,
  },
  slotLabel: {
    paddingHorizontal: spacing.xs,
    letterSpacing: 1.2,
    fontWeight: '600',
    color: colors.warmGray,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  title: {
    flex: 1,
  },
  description: {
    marginTop: spacing.xs,
    color: colors.charcoal,
  },
  hint: {
    marginTop: spacing.sm,
    color: accentByDomain.meal,
    fontWeight: '600',
  },
});
