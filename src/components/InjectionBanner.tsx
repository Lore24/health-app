import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { InjectionStatus, useInjectionStatus } from '../hooks/useInjectionStatus';
import { colors, radii, spacing, typography } from '../theme';

const dayNames = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

type BannerCopy = {
  title: string;
  detail: string;
  bg: string;
  accent: string;
  icon: keyof typeof import('@expo/vector-icons/build/Ionicons').default.glyphMap;
  cta: string;
  onPress: () => void;
} | null;

function copyFor(status: InjectionStatus): BannerCopy {
  const goLog = () => router.push('/log/injection');

  switch (status.kind) {
    case 'today':
      return {
        title: 'Injection day',
        detail: 'Take your dose when you have a few quiet minutes.',
        bg: colors.terraLight,
        accent: colors.terracotta,
        icon: 'medical',
        cta: 'Log it',
        onPress: goLog,
      };
    case 'day-after':
      return {
        title: 'Take it easy today',
        detail:
          'Day after injection — pool, walk, or recovery is a great choice over a heavy lift.',
        bg: colors.terraLight,
        accent: colors.terracotta,
        icon: 'leaf-outline',
        cta: 'View progress',
        onPress: () => router.push('/progress'),
      };
    case 'overdue':
      return {
        title: 'Friendly reminder',
        detail: `It's been ${status.daysOverdue + 7} days since your last dose. Log it when you're ready.`,
        bg: colors.terraLight,
        accent: colors.terracotta,
        icon: 'time-outline',
        cta: 'Log injection',
        onPress: goLog,
      };
    case 'upcoming':
      if (status.daysUntil === 1) {
        return {
          title: 'Injection tomorrow',
          detail: `${dayNames[status.scheduledDay]} is your usual day.`,
          bg: colors.terraLight,
          accent: colors.terracotta,
          icon: 'calendar-outline',
          cta: 'View progress',
          onPress: () => router.push('/progress'),
        };
      }
      return null;
    default:
      return null;
  }
}

export function InjectionBanner() {
  const status = useInjectionStatus();
  const copy = copyFor(status);
  if (!copy) return null;

  return (
    <Pressable
      onPress={copy.onPress}
      style={({ pressed }) => [
        styles.row,
        { backgroundColor: copy.bg },
        pressed ? { opacity: 0.85 } : null,
      ]}
    >
      <View style={[styles.iconWrap, { backgroundColor: copy.accent }]}>
        <Ionicons name={copy.icon} size={18} color={colors.warmWhite} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[typography.cardTitle, { color: copy.accent }]}>
          {copy.title}
        </Text>
        <Text style={[typography.caption, { marginTop: 2 }]}>{copy.detail}</Text>
      </View>
      <View style={styles.ctaRow}>
        <Text style={[typography.badge, { color: copy.accent }]}>
          {copy.cta.toUpperCase()}
        </Text>
        <Ionicons name="chevron-forward" size={14} color={copy.accent} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radii.lg,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
});
