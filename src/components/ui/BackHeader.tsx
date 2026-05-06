import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';

type BackHeaderProps = {
  title: string;
  subtitle?: string;
};

export function BackHeader({ title, subtitle }: BackHeaderProps) {
  return (
    <View style={styles.row}>
      <Pressable
        onPress={() => router.back()}
        hitSlop={12}
        style={({ pressed }) => [
          styles.backBtn,
          pressed ? { opacity: 0.6 } : null,
        ]}
      >
        <Ionicons name="chevron-back" size={22} color={colors.charcoal} />
      </Pressable>
      <View style={{ flex: 1 }}>
        <Text style={typography.title}>{title}</Text>
        {subtitle && <Text style={typography.caption}>{subtitle}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingTop: spacing.sm,
    paddingBottom: spacing.base,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.warmWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
