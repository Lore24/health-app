import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { colors, radii, spacing, typography } from '../theme';

type CelebrationOverlayProps = {
  visible: boolean;
  onDismiss: () => void;
};

export function CelebrationOverlay({ visible, onDismiss }: CelebrationOverlayProps) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.7);
  const fired = useRef(false);

  useEffect(() => {
    if (visible) {
      if (!fired.current) {
        fired.current = true;
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      opacity.value = withTiming(1, { duration: 220 });
      scale.value = withSequence(
        withTiming(1.05, { duration: 260, easing: Easing.out(Easing.cubic) }),
        withTiming(1, { duration: 160 }),
        withDelay(2400, withTiming(0.9, { duration: 200 })),
      );
      opacity.value = withDelay(
        2600,
        withTiming(0, { duration: 280 }, (done) => {
          if (done) runOnJS(onDismiss)();
        })
      );
    } else {
      fired.current = false;
      opacity.value = 0;
      scale.value = 0.7;
    }
  }, [visible, opacity, scale, onDismiss]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  if (!visible) return null;

  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.backdrop, containerStyle]}>
      <Pressable style={StyleSheet.absoluteFill} onPress={onDismiss} />
      <Animated.View style={[styles.card, cardStyle]}>
        <View style={styles.iconWrap}>
          <Ionicons name="sparkles" size={36} color={colors.warmWhite} />
        </View>
        <Text style={[typography.title, styles.title]}>Day complete</Text>
        <Text style={[typography.body, styles.body]}>
          Every meal, every supplement, every set. You showed up today, Lauren.
        </Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(61, 53, 49, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  card: {
    backgroundColor: colors.warmWhite,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.lg,
    alignItems: 'center',
    gap: spacing.sm,
    marginHorizontal: spacing.lg,
    maxWidth: 320,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.blush,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    textAlign: 'center',
  },
  body: {
    textAlign: 'center',
    color: colors.warmGray,
  },
});
