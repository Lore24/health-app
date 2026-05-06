import { Platform, TextStyle } from 'react-native';
import { colors } from './colors';

const systemFont = Platform.select({
  ios: 'System',
  android: 'sans-serif',
  default: 'System',
});

export const typography = {
  greeting: {
    fontFamily: systemFont,
    fontSize: 28,
    fontWeight: '300' as TextStyle['fontWeight'],
    lineHeight: 34,
    color: colors.charcoal,
    letterSpacing: 0.2,
  },
  display: {
    fontFamily: systemFont,
    fontSize: 32,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 38,
    color: colors.charcoal,
  },
  title: {
    fontFamily: systemFont,
    fontSize: 22,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 28,
    color: colors.charcoal,
  },
  sectionHeader: {
    fontFamily: systemFont,
    fontSize: 18,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 24,
    color: colors.charcoal,
    letterSpacing: 0.1,
  },
  cardTitle: {
    fontFamily: systemFont,
    fontSize: 17,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 22,
    color: colors.charcoal,
  },
  body: {
    fontFamily: systemFont,
    fontSize: 16,
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: 22,
    color: colors.charcoal,
  },
  bodyEmphasized: {
    fontFamily: systemFont,
    fontSize: 16,
    fontWeight: '500' as TextStyle['fontWeight'],
    lineHeight: 22,
    color: colors.charcoal,
  },
  caption: {
    fontFamily: systemFont,
    fontSize: 13,
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: 18,
    color: colors.warmGray,
  },
  badge: {
    fontFamily: systemFont,
    fontSize: 12,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 16,
    color: colors.charcoal,
    letterSpacing: 0.4,
  },
  button: {
    fontFamily: systemFont,
    fontSize: 16,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 20,
    color: colors.warmWhite,
  },
  metric: {
    fontFamily: systemFont,
    fontSize: 24,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 28,
    color: colors.charcoal,
  },
} as const satisfies Record<string, TextStyle>;

export type TypographyKey = keyof typeof typography;
