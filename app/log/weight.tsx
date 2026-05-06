import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Button, Card, Screen } from '../../src/components/ui';
import { useProgressStore } from '../../src/stores';
import { colors, radii, spacing, typography } from '../../src/theme';

export default function LogWeightScreen() {
  const [value, setValue] = useState('');
  const logWeight = useProgressStore((s) => s.logWeight);
  const removeWeight = useProgressStore((s) => s.removeWeight);
  const weights = useProgressStore((s) => s.weights);

  const recent = useMemo(() => weights.slice(-7).reverse(), [weights]);

  const numericValue = parseFloat(value);
  const isValid = !isNaN(numericValue) && numericValue > 0 && numericValue < 1000;

  const handleSave = () => {
    if (!isValid) return;
    logWeight(numericValue);
    setValue('');
    router.back();
  };

  return (
    <Screen edges={['top', 'bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <CloseButton />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={typography.title}>Log weight</Text>
            <Text style={typography.caption}>
              Same day of week, same time, same conditions for the cleanest trend.
            </Text>
          </View>

          <Card>
            <Text style={[typography.caption, styles.label]}>WEIGHT (LBS)</Text>
            <TextInput
              autoFocus
              value={value}
              onChangeText={setValue}
              keyboardType="decimal-pad"
              placeholder="0.0"
              placeholderTextColor={colors.warmGray}
              style={styles.input}
              returnKeyType="done"
              onSubmitEditing={handleSave}
            />
            <Button
              label="Save weight"
              onPress={handleSave}
              disabled={!isValid}
              color={colors.blush}
              size="lg"
              style={{ marginTop: spacing.md }}
            />
          </Card>

          {recent.length > 0 && (
            <View style={styles.section}>
              <Text style={[typography.sectionHeader, styles.sectionHead]}>
                Recent entries
              </Text>
              <Card>
                {recent.map((entry, idx) => (
                  <View
                    key={entry.date}
                    style={[
                      styles.entryRow,
                      idx > 0 ? styles.entryDivider : null,
                    ]}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={typography.bodyEmphasized}>
                        {entry.weight.toFixed(1)} lbs
                      </Text>
                      <Text style={typography.caption}>
                        {formatDate(entry.date)}
                      </Text>
                    </View>
                    <Pressable
                      onPress={() => removeWeight(entry.date)}
                      hitSlop={8}
                      style={({ pressed }) => [
                        styles.delBtn,
                        pressed ? { opacity: 0.6 } : null,
                      ]}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={16}
                        color={colors.warmGray}
                      />
                    </Pressable>
                  </View>
                ))}
              </Card>
            </View>
          )}
          <View style={{ height: spacing.xxxl }} />
        </ScrollView>
      </KeyboardAvoidingView>
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

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
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
  header: {
    paddingHorizontal: spacing.xs,
    gap: spacing.xs,
  },
  label: {
    letterSpacing: 1.2,
    fontWeight: '600',
    color: colors.warmGray,
    marginBottom: spacing.xs,
  },
  input: {
    fontSize: 36,
    fontWeight: '600',
    color: colors.charcoal,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.sand,
  },
  section: {
    gap: spacing.sm,
  },
  sectionHead: {
    paddingHorizontal: spacing.xs,
  },
  entryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  entryDivider: {
    borderTopWidth: 1,
    borderTopColor: colors.sand,
  },
  delBtn: {
    width: 32,
    height: 32,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cream,
  },
});
