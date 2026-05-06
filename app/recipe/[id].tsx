import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Badge, Card, CheckableItem, Screen } from '../../src/components/ui';
import { getRecipe } from '../../src/data';
import { accentByDomain, colors, radii, spacing, typography } from '../../src/theme';
import { Recipe } from '../../src/types';

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const recipe = id ? getRecipe(id) : undefined;

  if (!recipe) {
    return (
      <Screen edges={['top', 'bottom', 'left', 'right']}>
        <CloseButton />
        <View style={styles.empty}>
          <Text style={typography.title}>Recipe not found</Text>
          <Text style={typography.caption}>
            That recipe isn't in the plan yet.
          </Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen edges={['top', 'bottom', 'left', 'right']}>
      <CloseButton />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <RecipeHeader recipe={recipe} />
        <IngredientsList recipe={recipe} />
        <StepsList recipe={recipe} />
        {recipe.nutrition && <NutritionPanel recipe={recipe} />}
        {recipe.mounjaroTip && <TipCard tip={recipe.mounjaroTip} />}
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

function RecipeHeader({ recipe }: { recipe: Recipe }) {
  const totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  return (
    <View style={styles.header}>
      <Text style={typography.title}>{recipe.title}</Text>
      <View style={styles.metaRow}>
        <MetaPill icon="time-outline" label={`${totalMinutes} min`} />
        <MetaPill icon="people-outline" label={`Serves ${recipe.servings}`} />
        {recipe.cookMinutes > 0 && (
          <MetaPill icon="flame-outline" label={`${recipe.cookMinutes} min cook`} />
        )}
      </View>
    </View>
  );
}

function MetaPill({
  icon,
  label,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}) {
  return (
    <View style={styles.metaPill}>
      <Ionicons name={icon} size={14} color={colors.warmGray} />
      <Text style={styles.metaText}>{label}</Text>
    </View>
  );
}

function IngredientsList({ recipe }: { recipe: Recipe }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const toggle = (idx: number) =>
    setChecked((prev) => ({ ...prev, [idx]: !prev[idx] }));

  return (
    <View style={styles.section}>
      <View style={styles.sectionHead}>
        <Text style={typography.sectionHeader}>Ingredients</Text>
        <Badge label={`${recipe.ingredients.length}`} background={colors.sand} />
      </View>
      <Card accentColor={accentByDomain.meal}>
        {recipe.ingredients.map((ing, idx) => (
          <CheckableItem
            key={idx}
            label={`${ing.amount} ${ing.item}`}
            detail={ing.notes}
            checked={!!checked[idx]}
            onToggle={() => toggle(idx)}
            accentColor={accentByDomain.meal}
            backgroundChecked={colors.blushLight}
          />
        ))}
      </Card>
    </View>
  );
}

function StepsList({ recipe }: { recipe: Recipe }) {
  return (
    <View style={styles.section}>
      <Text style={[typography.sectionHeader, styles.sectionHead]}>
        Instructions
      </Text>
      <View style={styles.stepsList}>
        {recipe.steps.map((step, idx) => (
          <View key={idx} style={styles.stepRow}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{idx + 1}</Text>
            </View>
            <Text style={[typography.body, styles.stepText]}>{step}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function NutritionPanel({ recipe }: { recipe: Recipe }) {
  const n = recipe.nutrition!;
  const items: { label: string; value: string }[] = [];
  if (n.calories) items.push({ label: 'Calories', value: `${n.calories}` });
  if (n.protein) items.push({ label: 'Protein', value: `${n.protein}g` });
  if (n.carbs) items.push({ label: 'Carbs', value: `${n.carbs}g` });
  if (n.fat) items.push({ label: 'Fat', value: `${n.fat}g` });
  if (n.fiber) items.push({ label: 'Fiber', value: `${n.fiber}g` });
  if (n.sodium) items.push({ label: 'Sodium', value: `${n.sodium}mg` });

  return (
    <View style={styles.section}>
      <Text style={[typography.sectionHeader, styles.sectionHead]}>
        Nutrition (per serving)
      </Text>
      <Card>
        <View style={styles.nutritionGrid}>
          {items.map((item) => (
            <View key={item.label} style={styles.nutritionCell}>
              <Text style={typography.metric}>{item.value}</Text>
              <Text style={typography.caption}>{item.label}</Text>
            </View>
          ))}
        </View>
      </Card>
    </View>
  );
}

function TipCard({ tip }: { tip: string }) {
  return (
    <View style={styles.section}>
      <Card
        accentColor={accentByDomain.injection}
        background={colors.terraLight}
      >
        <View style={styles.tipHeader}>
          <Ionicons name="bulb-outline" size={18} color={colors.terracotta} />
          <Text style={[typography.cardTitle, { color: colors.terracotta }]}>
            Mounjaro tip
          </Text>
        </View>
        <Text style={[typography.body, { marginTop: spacing.xs }]}>{tip}</Text>
      </Card>
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
    gap: spacing.sm,
  },
  header: {
    paddingHorizontal: spacing.xs,
    gap: spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
    backgroundColor: colors.warmWhite,
  },
  metaText: {
    ...typography.caption,
    color: colors.warmGray,
    fontWeight: '600',
  },
  section: {
    gap: spacing.sm,
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xs,
  },
  stepsList: {
    gap: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  stepRow: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.blushLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  stepNumberText: {
    ...typography.badge,
    color: colors.blush,
    fontWeight: '700',
  },
  stepText: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  nutritionCell: {
    width: '33.33%',
    paddingVertical: spacing.sm,
    alignItems: 'center',
    gap: 2,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
});
