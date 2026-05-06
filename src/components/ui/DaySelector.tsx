import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '../../theme';

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as const;
const DAY_FULL = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

type DaySelectorProps = {
  selectedIndex: number;
  onSelect: (index: number) => void;
  todayIndex?: number;
  accentColor?: string;
};

export function DaySelector({
  selectedIndex,
  onSelect,
  todayIndex,
  accentColor = colors.blush,
}: DaySelectorProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {DAY_LABELS.map((letter, idx) => {
        const isSelected = idx === selectedIndex;
        const isToday = idx === todayIndex;

        return (
          <Pressable
            key={`${letter}-${idx}`}
            onPress={() => onSelect(idx)}
            hitSlop={6}
            style={({ pressed }) => [
              styles.day,
              isSelected ? { backgroundColor: accentColor } : null,
              !isSelected && isToday
                ? { borderWidth: 1.5, borderColor: accentColor }
                : null,
              pressed ? { opacity: 0.7 } : null,
            ]}
          >
            <Text
              style={[
                typography.caption,
                styles.letter,
                isSelected ? { color: colors.warmWhite } : null,
              ]}
            >
              {letter}
            </Text>
            <Text
              style={[
                typography.badge,
                styles.full,
                isSelected
                  ? { color: colors.warmWhite }
                  : { color: colors.warmGray },
              ]}
            >
              {DAY_FULL[idx]}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.base,
    gap: spacing.sm,
  },
  day: {
    width: 52,
    paddingVertical: spacing.sm,
    borderRadius: radii.lg,
    backgroundColor: colors.warmWhite,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  letter: {
    fontWeight: '600',
    color: colors.charcoal,
  },
  full: {
    letterSpacing: 0.6,
  },
});
