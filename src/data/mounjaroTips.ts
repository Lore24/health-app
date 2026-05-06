export type TipSection = {
  id: string;
  title: string;
  tips: string[];
};

export const eatingTips: TipSection[] = [
  {
    id: 'reduced-appetite',
    title: 'Managing reduced appetite',
    tips: [
      'Eat protein first at every meal — it is your top priority when appetite is low.',
      'Keep meals small but nutrient-dense. Quality over quantity.',
      'Use a protein shake or smoothie on days when solid food feels difficult.',
      'Set reminders to eat if you find yourself skipping meals unintentionally.',
      'Chew slowly and stop when you feel satisfied — overeating can cause nausea.',
    ],
  },
  {
    id: 'side-effects',
    title: 'Managing side effects through diet',
    tips: [
      'Nausea: eat bland, cool foods. Avoid greasy or fried items. Try ginger tea or chews.',
      'Constipation: increase fiber gradually (fruits, vegetables, whole grains). Drink plenty of water.',
      'Bloating: avoid carbonated drinks. Eat slowly and take a short walk after meals.',
      'Fatigue: ensure adequate protein and iron. Stay hydrated. Consider a multivitamin.',
    ],
  },
  {
    id: 'hydration',
    title: 'Daily hydration',
    tips: [
      'Aim for at least 64 oz (8 cups) of fluids daily.',
      'Plain water, water with lemon or cucumber, or unsweetened herbal teas all count.',
      'Sparkling water (unflavored) and broth-based soups are good options too.',
      'Avoid sugary drinks, excessive caffeine, and alcohol.',
    ],
  },
];

export const workoutTips: TipSection[] = [
  {
    id: 'energy-nutrition',
    title: 'Energy & nutrition',
    tips: [
      'Eat protein 1–2 hours before strength training if appetite allows.',
      'Have 25–40g protein within an hour after your workout.',
      'Stay well hydrated before, during, and after every session.',
      'On low-appetite days, a protein shake counts as post-workout fuel.',
    ],
  },
  {
    id: 'listening',
    title: 'Listening to your body',
    tips: [
      'Some days you will have less energy on Mounjaro — that is normal.',
      'Schedule lighter days (pool/walk) for the day after your injection.',
      'Soreness for 1–2 days is normal. Sharp pain during exercise is not.',
      'Muscle preservation is the goal. You do not need to train to exhaustion.',
      'Pair this with your meal plan to ensure adequate protein (1.2–1.6g/kg daily).',
      'Weight on the scale may stall as you add muscle — that is a GOOD thing.',
    ],
  },
];
