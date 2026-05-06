import { DayMeals } from '../types';

export const dayNames = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

export const mealPlan: DayMeals[] = [
  {
    day: 0,
    dayName: 'Monday',
    meals: [
      {
        id: 'mon-b',
        slot: 'breakfast',
        title: 'Greek yogurt parfait',
        description:
          'Greek yogurt with mixed berries, ground flaxseed, walnuts, and a slice of whole grain toast.',
        recipeId: 'greek-yogurt-parfait',
      },
      {
        id: 'mon-l',
        slot: 'lunch',
        title: 'Grilled chicken salad',
        description:
          'Grilled chicken breast over mixed greens, cherry tomatoes, cucumber, avocado, olive oil vinaigrette, with a small whole wheat roll.',
        recipeId: 'grilled-chicken-salad',
      },
      {
        id: 'mon-d',
        slot: 'dinner',
        title: 'Herb-roasted chicken & sweet potato',
        description:
          'Skinless herb-roasted chicken thigh with roasted sweet potato, steamed broccoli, and a side of quinoa.',
        recipeId: 'herb-roasted-chicken',
      },
      {
        id: 'mon-s',
        slot: 'snack',
        title: 'Apple + almond butter; carrots + hummus',
        description:
          'Apple slices with 2 tbsp almond butter. Baby carrots with hummus.',
      },
    ],
  },
  {
    day: 1,
    dayName: 'Tuesday',
    meals: [
      {
        id: 'tue-b',
        slot: 'breakfast',
        title: 'Veggie omelet',
        description:
          'Three-egg omelet with spinach, bell peppers, and mushrooms. Whole grain toast with avocado.',
        recipeId: 'veggie-omelet',
      },
      {
        id: 'tue-l',
        slot: 'lunch',
        title: 'Turkey & veggie wrap',
        description:
          'Whole wheat tortilla, sliced turkey breast, lettuce, tomato, avocado, mustard. Side of mixed fruit.',
        recipeId: 'turkey-wrap',
      },
      {
        id: 'tue-d',
        slot: 'dinner',
        title: 'Lean beef stir-fry',
        description:
          'Lean beef with bell peppers, snap peas, broccoli, and water chestnuts over brown rice. Low-sodium soy sauce and ginger.',
        recipeId: 'beef-stir-fry',
      },
      {
        id: 'tue-s',
        slot: 'snack',
        title: 'Mixed nuts; celery + peanut butter',
        description:
          'Handful of unsalted mixed nuts. Celery sticks with peanut butter.',
      },
    ],
  },
  {
    day: 2,
    dayName: 'Wednesday',
    meals: [
      {
        id: 'wed-b',
        slot: 'breakfast',
        title: 'Overnight oats',
        description:
          'Rolled oats with unsweetened almond milk, chia seeds, banana slices, and a drizzle of honey.',
        recipeId: 'overnight-oats',
      },
      {
        id: 'wed-l',
        slot: 'lunch',
        title: 'Black bean & chicken burrito bowl',
        description:
          'Brown rice, black beans, grilled chicken, corn, tomato salsa, lettuce, and a dollop of Greek yogurt.',
        recipeId: 'burrito-bowl',
      },
      {
        id: 'wed-d',
        slot: 'dinner',
        title: 'Turkey meatballs & whole wheat pasta',
        description:
          'Baked turkey meatballs with low-sodium marinara over whole wheat pasta. Side of steamed green beans with garlic.',
        recipeId: 'turkey-meatballs',
      },
      {
        id: 'wed-s',
        slot: 'snack',
        title: 'Cottage cheese + pineapple; crackers + cheese',
        description:
          'Cottage cheese with pineapple. Whole grain crackers with cheese.',
      },
    ],
  },
  {
    day: 3,
    dayName: 'Thursday',
    meals: [
      {
        id: 'thu-b',
        slot: 'breakfast',
        title: 'Berry protein smoothie',
        description:
          'Spinach, frozen mixed berries, banana, vanilla protein powder, unsweetened almond milk, and ground flaxseed.',
        recipeId: 'berry-smoothie',
      },
      {
        id: 'thu-l',
        slot: 'lunch',
        title: 'Chicken & vegetable soup',
        description:
          'Low-sodium broth with carrots, celery, onion, chicken breast, and whole grain noodles. Side salad with vinaigrette.',
        recipeId: 'chicken-soup',
      },
      {
        id: 'thu-d',
        slot: 'dinner',
        title: 'Grilled pork tenderloin',
        description:
          'Grilled pork tenderloin with roasted Brussels sprouts and baked sweet potato. Sauteed kale with garlic and olive oil.',
        recipeId: 'pork-tenderloin',
      },
      {
        id: 'thu-s',
        slot: 'snack',
        title: 'Trail mix; bell peppers + guac',
        description:
          'Trail mix (unsalted nuts, dried cranberries, dark chocolate chips). Sliced bell peppers with guacamole.',
      },
    ],
  },
  {
    day: 4,
    dayName: 'Friday',
    meals: [
      {
        id: 'fri-b',
        slot: 'breakfast',
        title: 'Whole grain waffle + scrambled eggs',
        description:
          'Whole grain waffle topped with almond butter, sliced strawberries, light maple syrup. Two scrambled eggs.',
        recipeId: 'waffle-eggs',
      },
      {
        id: 'fri-l',
        slot: 'lunch',
        title: 'Mediterranean grain bowl',
        description:
          'Farro with roasted chickpeas, cucumber, tomatoes, red onion, Kalamata olives, and lemon-tahini dressing.',
        recipeId: 'mediterranean-bowl',
      },
      {
        id: 'fri-d',
        slot: 'dinner',
        title: 'Slow-cooker Tuscan chicken thighs',
        description:
          'Chicken thighs with artichokes, sun-dried tomatoes, and white beans. Mixed green salad.',
        recipeId: 'tuscan-chicken',
      },
      {
        id: 'fri-s',
        slot: 'snack',
        title: 'Greek yogurt + granola; edamame',
        description: 'Greek yogurt with a handful of granola. Lightly salted edamame.',
      },
    ],
  },
  {
    day: 5,
    dayName: 'Saturday',
    meals: [
      {
        id: 'sat-b',
        slot: 'breakfast',
        title: 'Breakfast burrito',
        description:
          'Whole wheat tortilla, scrambled eggs, black beans, diced tomatoes, avocado, sprinkle of low-fat cheese.',
        recipeId: 'breakfast-burrito',
      },
      {
        id: 'sat-l',
        slot: 'lunch',
        title: 'Lentil & vegetable stew',
        description:
          'Lentils with carrots, celery, potatoes, and spinach. Slice of crusty whole grain bread.',
        recipeId: 'lentil-stew',
      },
      {
        id: 'sat-d',
        slot: 'dinner',
        title: 'Grilled chicken & wild rice',
        description:
          'Herb-marinated grilled chicken breast with roasted asparagus and wild rice pilaf. Sliced tomatoes with basil and balsamic.',
        recipeId: 'chicken-wild-rice',
      },
      {
        id: 'sat-s',
        slot: 'snack',
        title: 'Banana + peanut butter; almonds',
        description: 'Banana with peanut butter. Handful of raw almonds.',
      },
    ],
  },
  {
    day: 6,
    dayName: 'Sunday',
    meals: [
      {
        id: 'sun-b',
        slot: 'breakfast',
        title: 'Veggie frittata',
        description:
          'Eggs with zucchini, cherry tomatoes, fresh basil, and feta. Slice of whole grain toast.',
        recipeId: 'veggie-frittata',
      },
      {
        id: 'sun-l',
        slot: 'lunch',
        title: 'Chicken Caesar + minestrone',
        description:
          'Grilled chicken Caesar (light dressing, no croutons) with shaved Parmesan. Cup of low-sodium minestrone.',
        recipeId: 'chicken-caesar',
      },
      {
        id: 'sun-d',
        slot: 'dinner',
        title: 'Beef tenderloin & roasted roots',
        description:
          'Lean beef tenderloin with roasted carrots, parsnips, and beets. Side of garlic mashed cauliflower.',
        recipeId: 'beef-tenderloin',
      },
      {
        id: 'sun-s',
        slot: 'snack',
        title: 'Apple + walnuts; cucumber + tzatziki',
        description: 'Apple with walnuts. Cucumber slices with tzatziki.',
      },
    ],
  },
];

export function getMealsForDay(day: number): DayMeals | undefined {
  return mealPlan.find((d) => d.day === day);
}
