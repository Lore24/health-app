export type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type MealSlot = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export type Meal = {
  id: string;
  slot: MealSlot;
  title: string;
  description: string;
  recipeId?: string;
};

export type DayMeals = {
  day: DayIndex;
  dayName: string;
  meals: Meal[];
};

export type Ingredient = {
  amount: string;
  item: string;
  notes?: string;
};

export type Recipe = {
  id: string;
  title: string;
  servings: number;
  prepMinutes: number;
  cookMinutes: number;
  ingredients: Ingredient[];
  steps: string[];
  nutrition?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    fiber?: number;
    sodium?: number;
  };
  mounjaroTip?: string;
};

export type SupplementTime = 'morning' | 'midday' | 'evening' | 'bedtime';

export type Supplement = {
  id: string;
  name: string;
  dose: string;
  time: SupplementTime;
  reason: string;
  notes?: string;
};

export type WorkoutType = 'strength' | 'pool' | 'walk' | 'recovery' | 'rest';

export type ExerciseSet = {
  reps: string;
  weight?: string;
};

export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: string;
  notes?: string;
  imageKey?: string;
  rest?: string;
};

export type Workout = {
  id: string;
  day: DayIndex;
  dayName: string;
  type: WorkoutType;
  title: string;
  durationMinutes: number;
  warmup?: string[];
  exercises: Exercise[];
  cooldown?: string[];
  notes?: string;
};

export type GroceryCategory =
  | 'proteins'
  | 'vegetables'
  | 'fruits'
  | 'grains'
  | 'legumes'
  | 'fats'
  | 'dairy'
  | 'pantry'
  | 'herbs';

export type GroceryItem = {
  id: string;
  name: string;
  category: GroceryCategory;
};

export type FoodGuidelineList = 'enjoy' | 'limit' | 'avoid';

export type FoodGuidelineEntry = {
  list: FoodGuidelineList;
  group: string;
  items: string[];
};
