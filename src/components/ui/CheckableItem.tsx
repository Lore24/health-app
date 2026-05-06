import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { ReactNode, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { colors, radii, spacing, typography } from '../../theme';

type CheckableItemProps = {
  label: string;
  detail?: string;
  checked: boolean;
  onToggle: () => void;
  accentColor?: string;
  backgroundChecked?: string;
  rightSlot?: ReactNode;
};

export function CheckableItem({
  label,
  detail,
  checked,
  onToggle,
  accentColor = colors.blush,
  backgroundChecked,
  rightSlot,
}: CheckableItemProps) {
  const scale = useSharedValue(1);
  const checkOpacity = useSharedValue(checked ? 1 : 0);

  useEffect(() => {
    checkOpacity.value = withTiming(checked ? 1 : 0, { duration: 180 });
  }, [checked, checkOpacity]);

  const handlePress = () => {
    scale.value = withSequence(
      withTiming(0.95, { duration: 80 }),
      withTiming(1.05, { duration: 100 }),
      withTiming(1, { duration: 90 })
    );
    Haptics.impactAsync(
      checked ? Haptics.ImpactFeedbackStyle.Light : Haptics.ImpactFeedbackStyle.Medium
    );
    onToggle();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const checkAnimatedStyle = useAnimatedStyle(() => ({
    opacity: checkOpacity.value,
    transform: [{ scale: checkOpacity.value }],
  }));

  return (
    <Pressable onPress={handlePress} hitSlop={8}>
      <Animated.View
        style={[
          styles.row,
          animatedStyle,
          checked && backgroundChecked
            ? { backgroundColor: backgroundChecked }
            : null,
        ]}
      >
        <View
          style={[
            styles.checkbox,
            { borderColor: checked ? accentColor : colors.sand },
            checked ? { backgroundColor: accentColor } : null,
          ]}
        >
          <Animated.View style={checkAnimatedStyle}>
            <Ionicons name="checkmark" size={16} color={colors.warmWhite} />
          </Animated.View>
        </View>

        <View style={styles.textBlock}>
          <Text
            style={[
              typography.body,
              checked ? styles.labelChecked : null,
            ]}
            numberOfLines={2}
          >
            {label}
          </Text>
          {detail && (
            <Text
              style={[
                typography.caption,
                checked ? styles.detailChecked : null,
              ]}
              numberOfLines={2}
            >
              {detail}
            </Text>
          )}
        </View>

        {rightSlot && <View style={styles.right}>{rightSlot}</View>}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.md,
    gap: spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: radii.sm,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: {
    flex: 1,
    gap: 2,
  },
  labelChecked: {
    textDecorationLine: 'line-through',
    color: colors.warmGray,
  },
  detailChecked: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  right: {
    marginLeft: spacing.sm,
  },
});
