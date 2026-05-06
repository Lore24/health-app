import { Ionicons } from '@expo/vector-icons';
import { Href, router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card, Screen, SectionHeader } from '../../src/components/ui';
import { colors, spacing, typography } from '../../src/theme';

type Row = {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
  href?: Href;
  comingSoon?: boolean;
};

const referenceRows: Row[] = [
  {
    title: 'Grocery list',
    description: '78 items across 9 categories. Check off as you shop.',
    icon: 'cart-outline',
    iconColor: colors.blush,
    iconBg: colors.blushLight,
    href: '/settings/grocery',
  },
  {
    title: 'Supplement reference',
    description: 'All 8 supplements with timing, doses, and reasons.',
    icon: 'flask-outline',
    iconColor: colors.terracotta,
    iconBg: colors.terraLight,
    href: '/settings/supplements',
  },
  {
    title: 'Food guidelines',
    description: 'Enjoy / limit / avoid lists from your meal plan.',
    icon: 'restaurant-outline',
    iconColor: colors.blush,
    iconBg: colors.blushLight,
    href: '/settings/food-guidelines',
  },
  {
    title: 'Mounjaro tips',
    description: 'Eating and workout strategies while on tirzepatide.',
    icon: 'bulb-outline',
    iconColor: colors.terracotta,
    iconBg: colors.terraLight,
    href: '/settings/tips',
  },
];

const appRows: Row[] = [
  {
    title: 'App settings',
    description: 'Injection day, progression week, notifications.',
    icon: 'settings-outline',
    iconColor: colors.warmGray,
    iconBg: colors.sand,
    href: '/settings/app',
  },
];

export default function SettingsScreen() {
  return (
    <Screen>
      <SectionHeader title="Settings & references" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <Text style={[typography.caption, styles.groupLabel]}>REFERENCE</Text>
        {referenceRows.map((row) => (
          <SettingsRow key={row.title} row={row} />
        ))}

        <Text style={[typography.caption, styles.groupLabel]}>APP</Text>
        {appRows.map((row) => (
          <SettingsRow key={row.title} row={row} />
        ))}
        <View style={{ height: spacing.xxxl }} />
      </ScrollView>
    </Screen>
  );
}

function SettingsRow({ row }: { row: Row }) {
  return (
    <Card
      onPress={row.href ? () => router.push(row.href!) : undefined}
    >
      <View style={styles.row}>
        <View style={[styles.iconWrap, { backgroundColor: row.iconBg }]}>
          <Ionicons name={row.icon} size={20} color={row.iconColor} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={typography.cardTitle}>{row.title}</Text>
          <Text style={[typography.caption, { marginTop: 2 }]}>
            {row.description}
          </Text>
          {row.comingSoon && (
            <Text style={[typography.caption, styles.comingSoon]}>
              Coming soon
            </Text>
          )}
        </View>
        {row.href && (
          <Ionicons
            name="chevron-forward"
            size={18}
            color={colors.warmGray}
          />
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingTop: spacing.base,
    paddingBottom: spacing.xxxl,
    gap: spacing.sm,
  },
  groupLabel: {
    paddingHorizontal: spacing.xs,
    paddingTop: spacing.md,
    paddingBottom: spacing.xs,
    letterSpacing: 1.2,
    fontWeight: '600',
    color: colors.warmGray,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  comingSoon: {
    marginTop: spacing.xs,
    color: colors.warmGray,
    fontStyle: 'italic',
  },
});
