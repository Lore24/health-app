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
import { accentByDomain, colors, radii, spacing, typography } from '../../src/theme';

const SITES = [
  'Left abdomen',
  'Right abdomen',
  'Left thigh',
  'Right thigh',
  'Left arm',
  'Right arm',
];

function suggestNextSite(lastSite?: string): string {
  if (!lastSite) return SITES[0];
  const idx = SITES.indexOf(lastSite);
  if (idx === -1) return SITES[0];
  return SITES[(idx + 1) % SITES.length];
}

export default function LogInjectionScreen() {
  const injections = useProgressStore((s) => s.injections);
  const logInjection = useProgressStore((s) => s.logInjection);
  const removeInjection = useProgressStore((s) => s.removeInjection);

  const lastSite = injections[injections.length - 1]?.site;
  const [site, setSite] = useState<string>(suggestNextSite(lastSite));
  const [notes, setNotes] = useState('');

  const recent = useMemo(() => injections.slice(-5).reverse(), [injections]);

  const handleSave = () => {
    logInjection({ site, notes: notes.trim() || undefined });
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
            <Text style={typography.title}>Log injection</Text>
            <Text style={typography.caption}>
              Rotating sites helps absorption and reduces irritation.
            </Text>
          </View>

          <Card accentColor={accentByDomain.injection}>
            <Text style={[typography.caption, styles.label]}>INJECTION SITE</Text>
            <View style={styles.siteGrid}>
              {SITES.map((s) => {
                const active = s === site;
                const suggested = !active && s === suggestNextSite(lastSite);
                return (
                  <Pressable
                    key={s}
                    onPress={() => setSite(s)}
                    style={({ pressed }) => [
                      styles.siteChip,
                      active
                        ? { backgroundColor: colors.terracotta }
                        : suggested
                          ? {
                              backgroundColor: colors.terraLight,
                              borderColor: colors.terracotta,
                              borderWidth: 1,
                            }
                          : { backgroundColor: colors.warmWhite },
                      pressed ? { opacity: 0.7 } : null,
                    ]}
                  >
                    <Text
                      style={{
                        ...typography.bodyEmphasized,
                        color: active ? colors.warmWhite : colors.charcoal,
                      }}
                    >
                      {s}
                    </Text>
                    {suggested && (
                      <Text
                        style={[typography.caption, { color: colors.terracotta }]}
                      >
                        suggested
                      </Text>
                    )}
                  </Pressable>
                );
              })}
            </View>

            <Text style={[typography.caption, styles.label, { marginTop: spacing.lg }]}>
              NOTES (OPTIONAL)
            </Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="Side effects, mood, anything to remember..."
              placeholderTextColor={colors.warmGray}
              multiline
              style={styles.input}
            />

            <Button
              label="Save injection"
              onPress={handleSave}
              color={colors.terracotta}
              size="lg"
              style={{ marginTop: spacing.md }}
            />
          </Card>

          {recent.length > 0 && (
            <View style={styles.section}>
              <Text style={[typography.sectionHeader, styles.sectionHead]}>
                Recent injections
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
                        {formatDate(entry.date)}
                      </Text>
                      {entry.site && (
                        <Text style={typography.caption}>{entry.site}</Text>
                      )}
                      {entry.notes && (
                        <Text
                          style={[typography.caption, { fontStyle: 'italic' }]}
                          numberOfLines={2}
                        >
                          {entry.notes}
                        </Text>
                      )}
                    </View>
                    <Pressable
                      onPress={() => removeInjection(entry.date)}
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
    year: 'numeric',
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
  siteGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  siteChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
    minWidth: '46%',
    alignItems: 'center',
  },
  input: {
    ...typography.body,
    minHeight: 80,
    padding: spacing.sm,
    backgroundColor: colors.cream,
    borderRadius: radii.md,
    textAlignVertical: 'top',
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
