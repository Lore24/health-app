import { Supplement } from '../types';

export const supplements: Supplement[] = [
  {
    id: 'vitamin-d3',
    name: 'Vitamin D3',
    dose: '2,000–4,000 IU',
    time: 'morning',
    reason:
      'Most common deficiency on Mounjaro. Supports bone health, calcium absorption, and may help blood pressure.',
    notes: 'Take with breakfast. Fat-soluble — absorbs better with a meal.',
  },
  {
    id: 'b12',
    name: 'Vitamin B12 (sublingual)',
    dose: '1,000 mcg',
    time: 'morning',
    reason:
      'GLP-1s are linked to B12 deficiency. Essential for energy, nerve function, and red blood cells.',
    notes: 'Sublingual form absorbs better with delayed gastric emptying.',
  },
  {
    id: 'iron',
    name: 'Iron + Vitamin C',
    dose: '18 mg',
    time: 'morning',
    reason:
      'GLP-1 users are at higher risk for iron deficiency. Supports energy and oxygen transport.',
    notes:
      'Take with orange juice or vitamin C. Avoid taking with calcium — they compete for absorption.',
  },
  {
    id: 'omega-3',
    name: 'Omega-3 (EPA/DHA)',
    dose: '1,000–2,000 mg',
    time: 'midday',
    reason:
      'Heart health and cholesterol support. Algae-based is a good non-fish option.',
    notes: 'Fat-soluble — take with a meal that contains some fat.',
  },
  {
    id: 'coq10',
    name: 'CoQ10',
    dose: '100–200 mg',
    time: 'midday',
    reason:
      'Especially important if taking a statin — statins reduce natural CoQ10 levels.',
    notes: 'Supports heart cell energy and may reduce statin-related muscle aches.',
  },
  {
    id: 'calcium',
    name: 'Calcium',
    dose: '500–600 mg',
    time: 'evening',
    reason:
      'Recommended during tirzepatide treatment for bone health, especially perimenopause.',
    notes: 'Take separately from iron. Pair with Vitamin D.',
  },
  {
    id: 'magnesium',
    name: 'Magnesium Glycinate',
    dose: '200–400 mg',
    time: 'evening',
    reason:
      'Supports blood pressure, heart, muscle function, and helps with constipation.',
    notes: 'Glycinate form is gentle on the stomach. Evening dose may support sleep.',
  },
  {
    id: 'fiber',
    name: 'Fiber (psyllium husk)',
    dose: '5–10 g',
    time: 'bedtime',
    reason: 'Supports cholesterol, blood sugar, and digestive regularity.',
    notes:
      'Take with a full glass of water, at least 2 hours after other supplements.',
  },
];

export function supplementsByTime(time: Supplement['time']): Supplement[] {
  return supplements.filter((s) => s.time === time);
}
