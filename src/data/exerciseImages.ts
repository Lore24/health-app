import type { ImageSourcePropType } from 'react-native';

export const exerciseImages: Record<string, ImageSourcePropType> = {
  'plank': require('../../assets/images/exercises/plank.png'),
  'tricep-kickback': require('../../assets/images/exercises/tricep-kickback.png'),
  'bent-over-row': require('../../assets/images/exercises/bent-over-row.png'),
  'hip-thrust': require('../../assets/images/exercises/hip-thrust.png'),
  'shoulder-press': require('../../assets/images/exercises/shoulder-press.png'),
  'walking-lunges': require('../../assets/images/exercises/walking-lunges.png'),
  'lateral-raises': require('../../assets/images/exercises/lateral-raises.png'),
  'renegade-row': require('../../assets/images/exercises/renegade-row.png'),
  'goblet-squat': require('../../assets/images/exercises/goblet-squat.png'),
  'bicep-curls': require('../../assets/images/exercises/bicep-curls.png'),
  'romanian-deadlift': require('../../assets/images/exercises/romanian-deadlift.png'),
  'thrusters': require('../../assets/images/exercises/thrusters.png'),
  'kettlebell-swings': require('../../assets/images/exercises/kettlebell-swings.png'),
  'step-ups': require('../../assets/images/exercises/step-ups.png'),
};

export function exerciseImage(key?: string): ImageSourcePropType | undefined {
  if (!key) return undefined;
  return exerciseImages[key];
}
