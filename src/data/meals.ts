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
          "Uses Sunday's pre-cooked chicken breast over mixed greens, cherry tomatoes, cucumber, and avocado with balsamic-Dijon vinaigrette. No cooking — just slice and assemble.",
        recipeId: 'grilled-chicken-salad',
      },
      {
        id: 'mon-d',
        slot: 'dinner',
        title: 'Herb-roasted chicken & sweet potato (cook 2 portions)',
        description:
          'Sheet-pan chicken breast with sweet potato cubes and broccoli, served over quinoa. Cook 2 portions — tomorrow\'s lunch becomes a power bowl from the leftovers.',
        recipeId: 'herb-roasted-chicken',
      },
      {
        id: 'mon-s',
        slot: 'snack',
        title: 'Apple + almond butter; carrots + hummus',
        description:
          'Apple slices with 2 tbsp almond butter. Baby carrots with 2 tbsp hummus.',
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
        title: 'Greek yogurt parfait',
        description:
          'Same as yesterday — Greek yogurt, berries, flaxseed, walnuts, toast.',
        recipeId: 'greek-yogurt-parfait',
      },
      {
        id: 'tue-l',
        slot: 'lunch',
        title: 'Chicken power bowl (leftover remix)',
        description:
          "Monday's herb chicken shredded over mixed greens with leftover sweet potato cubes, cherry tomatoes, and balsamic. Warm the chicken or serve it cold — no cooking required.",
      },
      {
        id: 'tue-d',
        slot: 'dinner',
        title: 'Chicken & vegetable soup (batch of 4)',
        description:
          'Low-sodium broth with carrots, celery, onion, chicken breast, and whole wheat pasta. Make the full batch — eat one bowl tonight and reheat tomorrow.',
        recipeId: 'chicken-soup',
      },
      {
        id: 'tue-s',
        slot: 'snack',
        title: 'Greek yogurt + walnuts + honey; banana',
        description:
          'Greek yogurt topped with walnuts and a drizzle of honey. Banana on the side.',
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
        title: 'Veggie omelet',
        description:
          'Three-egg omelet with spinach and bell peppers. Whole grain toast with avocado.',
        recipeId: 'veggie-omelet',
      },
      {
        id: 'wed-l',
        slot: 'lunch',
        title: 'Chicken soup (leftover)',
        description:
          "Reheat yesterday's batch — a second bowl of the same soup.",
        recipeId: 'chicken-soup',
      },
      {
        id: 'wed-d',
        slot: 'dinner',
        title: 'Chicken meatballs & pasta (batch of 4)',
        description:
          'Baked ground chicken meatballs in low-sodium marinara over whole wheat pasta with steamed broccoli. Cook the full batch — leftovers become tomorrow\'s meatball sub.',
        recipeId: 'chicken-meatballs',
      },
      {
        id: 'wed-s',
        slot: 'snack',
        title: 'Apple + almond butter; carrots + hummus',
        description:
          'Same combo as Monday. Apple slices with 2 tbsp almond butter, baby carrots with 2 tbsp hummus.',
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
        title: 'Veggie omelet',
        description:
          'Same as yesterday — three-egg omelet with spinach and bell peppers, avocado toast on the side.',
        recipeId: 'veggie-omelet',
      },
      {
        id: 'thu-l',
        slot: 'lunch',
        title: 'Meatball sub (leftover remix)',
        description:
          "2-3 of yesterday's reheated chicken meatballs on whole wheat bread with marinara and a sprinkle of Parmesan. Quick assembly, no extra cooking.",
      },
      {
        id: 'thu-d',
        slot: 'dinner',
        title: 'Black bean & chicken burrito bowl (cook 2 portions)',
        description:
          'Brown rice, black beans, chicken, salsa, and avocado. Cook 2 portions — tomorrow\'s lunch is a reheat of tonight\'s bowl.',
        recipeId: 'burrito-bowl',
      },
      {
        id: 'thu-s',
        slot: 'snack',
        title: 'Cottage cheese + berries; toast + almond butter',
        description:
          'Cottage cheese topped with mixed berries. Whole wheat toast with 1 tbsp almond butter.',
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
        title: 'Berry protein smoothie',
        description:
          'Spinach, frozen mixed berries, banana, vanilla protein powder, unsweetened almond milk, and ground flaxseed.',
        recipeId: 'berry-smoothie',
      },
      {
        id: 'fri-l',
        slot: 'lunch',
        title: 'Burrito bowl (leftover)',
        description:
          "Reheat yesterday's burrito bowl — same brown rice, black beans, chicken, salsa, and avocado.",
        recipeId: 'burrito-bowl',
      },
      {
        id: 'fri-d',
        slot: 'dinner',
        title: 'Slow-cooker Tuscan chicken breasts (batch of 4)',
        description:
          'Chicken breasts with artichokes, sun-dried tomatoes, and white beans. Mixed greens side salad. Cook the full slow-cooker batch — tomorrow\'s lunch is a leftover bowl.',
        recipeId: 'tuscan-chicken',
      },
      {
        id: 'fri-s',
        slot: 'snack',
        title: 'Greek yogurt + walnuts + honey; banana',
        description:
          'Same as Tuesday. Greek yogurt with walnuts and a drizzle of honey; banana on the side.',
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
          'Whole wheat tortilla, scrambled eggs, black beans, diced tomatoes, avocado, low-fat shredded cheese.',
        recipeId: 'breakfast-burrito',
      },
      {
        id: 'sat-l',
        slot: 'lunch',
        title: 'Tuscan chicken bowl (leftover remix)',
        description:
          "Yesterday's Tuscan chicken (with the artichokes, sun-dried tomatoes, and white beans) served over a bed of brown rice and spinach. Just reheat and plate.",
      },
      {
        id: 'sat-d',
        slot: 'dinner',
        title: 'Paprika roast chicken (cook 2 portions)',
        description:
          'Paprika-rubbed chicken breast with roasted Brussels sprouts and baked sweet potato, sautéed spinach with garlic. Cook both portions — leftovers become tomorrow\'s lunch wrap.',
        recipeId: 'paprika-chicken-sheet-pan',
      },
      {
        id: 'sat-s',
        slot: 'snack',
        title: 'Hard-boiled egg + apple + almonds',
        description:
          'One hard-boiled egg, an apple, and a small handful of raw almonds.',
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
        title: 'Berry protein smoothie',
        description:
          'Same as Friday — spinach, frozen berries, banana, protein powder, almond milk, flaxseed.',
        recipeId: 'berry-smoothie',
      },
      {
        id: 'sun-l',
        slot: 'lunch',
        title: 'Roast chicken wrap (leftover remix)',
        description:
          "Sliced leftover paprika chicken in a whole wheat tortilla with mixed greens and a smear of Dijon. No cooking — quick assembly.",
      },
      {
        id: 'sun-d',
        slot: 'dinner',
        title: 'Herb-marinated chicken & wild rice',
        description:
          "Grilled chicken breast over wild rice pilaf with asparagus. Cook an extra chicken breast for Monday's salad lunch — the whole leftover chain starts here.",
        recipeId: 'chicken-wild-rice',
      },
      {
        id: 'sun-s',
        slot: 'snack',
        title: 'Cottage cheese + berries; toast + almond butter',
        description:
          'Same as Thursday. Cottage cheese with berries; whole wheat toast with 1 tbsp almond butter.',
      },
    ],
  },
];

export function getMealsForDay(day: number): DayMeals | undefined {
  return mealPlan.find((d) => d.day === day);
}
