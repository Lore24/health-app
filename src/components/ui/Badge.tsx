import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '../../theme';

type BadgeProps = {
  label: string;
  background?: string;
  textColor?: string;
};

export function Badge({
  label,
  background = colors.sand,
  textColor = colors.charcoal,
}: BadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: background }]}>
      <Text style={[typography.badge, { color: textColor }]}>{label.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
    alignSelf: 'flex-start',
  },
});
