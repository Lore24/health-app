import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, radii, spacing, typography } from '../../theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: string;
  disabled?: boolean;
  style?: ViewStyle;
};

const sizeStyles: Record<ButtonSize, { padV: number; padH: number; fontSize: number }> = {
  sm: { padV: spacing.xs, padH: spacing.md, fontSize: 14 },
  md: { padV: spacing.sm + 2, padH: spacing.base, fontSize: 15 },
  lg: { padV: spacing.md, padH: spacing.lg, fontSize: 16 },
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  color = colors.blush,
  disabled = false,
  style,
}: ButtonProps) {
  const sz = sizeStyles[size];

  const baseStyle: ViewStyle = {
    paddingVertical: sz.padV,
    paddingHorizontal: sz.padH,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.5 : 1,
  };

  const variantStyle: ViewStyle =
    variant === 'primary'
      ? { backgroundColor: color }
      : variant === 'secondary'
      ? { backgroundColor: colors.warmWhite, borderWidth: 1, borderColor: color }
      : { backgroundColor: 'transparent' };

  const textColor =
    variant === 'primary' ? colors.warmWhite : color;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        baseStyle,
        variantStyle,
        pressed ? { opacity: 0.7 } : null,
        style,
      ]}
    >
      <Text
        style={[
          typography.button,
          { color: textColor, fontSize: sz.fontSize },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}
