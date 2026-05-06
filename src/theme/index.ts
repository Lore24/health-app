export { colors, accentByDomain } from './colors';
export type { ColorKey, AccentDomain } from './colors';
export { spacing } from './spacing';
export type { SpacingKey } from './spacing';
export { radii } from './radii';
export type { RadiusKey } from './radii';
export { typography } from './typography';
export type { TypographyKey } from './typography';
export { shadows } from './shadows';
export type { ShadowKey } from './shadows';

export const theme = {
  hitSlop: { top: 8, bottom: 8, left: 8, right: 8 },
  pressedOpacity: 0.7,
  animationTiming: {
    fast: 150,
    base: 220,
    slow: 320,
  },
};
