import { Platform, ViewStyle } from 'react-native';

const warm = (opacity: number) => `rgba(61, 53, 49, ${opacity})`;

export const shadows = {
  none: {} as ViewStyle,
  card: Platform.select({
    ios: {
      shadowColor: warm(1),
      shadowOpacity: 0.06,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },
    },
    android: {
      elevation: 2,
    },
    default: {},
  }) as ViewStyle,
  cardElevated: Platform.select({
    ios: {
      shadowColor: warm(1),
      shadowOpacity: 0.1,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 6 },
    },
    android: {
      elevation: 5,
    },
    default: {},
  }) as ViewStyle,
  pressed: Platform.select({
    ios: {
      shadowColor: warm(1),
      shadowOpacity: 0.04,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
    },
    android: {
      elevation: 1,
    },
    default: {},
  }) as ViewStyle,
} as const;

export type ShadowKey = keyof typeof shadows;
