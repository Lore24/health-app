import { ReactNode } from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { colors, radii, shadows, spacing, theme } from '../../theme';

type CardProps = {
  children: ReactNode;
  accentColor?: string;
  background?: string;
  onPress?: () => void;
  style?: ViewStyle;
  padding?: keyof typeof spacing;
  elevated?: boolean;
};

export function Card({
  children,
  accentColor,
  background = colors.warmWhite,
  onPress,
  style,
  padding = 'base',
  elevated = false,
}: CardProps) {
  const baseStyle: ViewStyle = {
    backgroundColor: background,
    borderRadius: radii.lg,
    padding: spacing[padding],
    paddingLeft: accentColor ? spacing[padding] + 4 : spacing[padding],
    overflow: 'hidden',
    ...(elevated ? shadows.cardElevated : shadows.card),
  };

  const content = (
    <View style={[baseStyle, style]}>
      {accentColor && <View style={[styles.accent, { backgroundColor: accentColor }]} />}
      {children}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => ({ opacity: pressed ? theme.pressedOpacity : 1 })}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  accent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
});
