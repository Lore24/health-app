export const colors = {
  blush: '#E8A0BF',
  blushLight: '#F5D5E5',
  sage: '#A8C5A0',
  sageLight: '#D4E7CF',
  terracotta: '#D4856B',
  terraLight: '#F0C4B4',
  cream: '#FFF8F0',
  warmWhite: '#FFFDFB',
  sand: '#E8DDD3',
  warmGray: '#9B918A',
  charcoal: '#3D3531',
  waterBlue: '#7FB5D6',
  waterBlueLight: '#D6E9F4',
  restPurple: '#B8A9C9',
  restPurpleLight: '#E5DEEC',
  success: '#7FB069',
  warning: '#E8B86F',
  transparent: 'transparent',
} as const;

export type ColorKey = keyof typeof colors;

export const accentByDomain = {
  meal: colors.blush,
  workout: colors.sage,
  supplement: colors.terracotta,
  injection: colors.terracotta,
  water: colors.waterBlue,
  rest: colors.restPurple,
} as const;

export type AccentDomain = keyof typeof accentByDomain;
