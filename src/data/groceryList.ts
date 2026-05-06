import { GroceryItem } from '../types';

export const groceryList: GroceryItem[] = [
  // Proteins
  { id: 'chicken-breast', name: 'Chicken breasts (skinless)', category: 'proteins' },
  { id: 'chicken-thighs', name: 'Chicken thighs (skinless)', category: 'proteins' },
  { id: 'turkey-ground', name: 'Ground turkey breast', category: 'proteins' },
  { id: 'turkey-sliced', name: 'Sliced turkey breast', category: 'proteins' },
  { id: 'beef-tenderloin', name: 'Lean beef tenderloin', category: 'proteins' },
  { id: 'pork-tenderloin', name: 'Pork tenderloin', category: 'proteins' },
  { id: 'eggs', name: 'Eggs (1 dozen)', category: 'proteins' },
  { id: 'greek-yogurt', name: 'Greek yogurt (plain, low-fat)', category: 'proteins' },
  { id: 'cottage-cheese', name: 'Cottage cheese (low-fat)', category: 'proteins' },
  { id: 'tofu', name: 'Firm tofu', category: 'proteins' },
  { id: 'protein-powder', name: 'Vanilla protein powder', category: 'proteins' },

  // Vegetables
  { id: 'spinach', name: 'Spinach', category: 'vegetables' },
  { id: 'kale', name: 'Kale', category: 'vegetables' },
  { id: 'broccoli', name: 'Broccoli', category: 'vegetables' },
  { id: 'bell-peppers', name: 'Bell peppers (mixed colors)', category: 'vegetables' },
  { id: 'carrots', name: 'Carrots', category: 'vegetables' },
  { id: 'sweet-potatoes', name: 'Sweet potatoes', category: 'vegetables' },
  { id: 'brussels-sprouts', name: 'Brussels sprouts', category: 'vegetables' },
  { id: 'asparagus', name: 'Asparagus', category: 'vegetables' },
  { id: 'green-beans', name: 'Green beans', category: 'vegetables' },
  { id: 'zucchini', name: 'Zucchini', category: 'vegetables' },
  { id: 'cherry-tomatoes', name: 'Cherry tomatoes', category: 'vegetables' },
  { id: 'cucumber', name: 'Cucumber', category: 'vegetables' },
  { id: 'celery', name: 'Celery', category: 'vegetables' },
  { id: 'mushrooms', name: 'Mushrooms', category: 'vegetables' },
  { id: 'onions', name: 'Onions', category: 'vegetables' },
  { id: 'garlic', name: 'Garlic', category: 'vegetables' },

  // Fruits
  { id: 'mixed-berries', name: 'Mixed berries (fresh or frozen)', category: 'fruits' },
  { id: 'apples', name: 'Apples', category: 'fruits' },
  { id: 'bananas', name: 'Bananas', category: 'fruits' },
  { id: 'oranges', name: 'Oranges', category: 'fruits' },
  { id: 'lemons', name: 'Lemons', category: 'fruits' },
  { id: 'pineapple', name: 'Pineapple', category: 'fruits' },
  { id: 'strawberries', name: 'Strawberries', category: 'fruits' },
  { id: 'dried-cranberries', name: 'Dried cranberries', category: 'fruits' },

  // Grains
  { id: 'brown-rice', name: 'Brown rice', category: 'grains' },
  { id: 'quinoa', name: 'Quinoa', category: 'grains' },
  { id: 'rolled-oats', name: 'Rolled oats', category: 'grains' },
  { id: 'whole-wheat-bread', name: 'Whole wheat bread', category: 'grains' },
  { id: 'whole-wheat-tortillas', name: 'Whole wheat tortillas', category: 'grains' },
  { id: 'whole-wheat-pasta', name: 'Whole wheat pasta', category: 'grains' },
  { id: 'farro', name: 'Farro', category: 'grains' },
  { id: 'whole-grain-crackers', name: 'Whole grain crackers', category: 'grains' },
  { id: 'whole-grain-waffles', name: 'Whole grain waffles', category: 'grains' },

  // Legumes
  { id: 'black-beans', name: 'Black beans (canned, low-sodium)', category: 'legumes' },
  { id: 'chickpeas', name: 'Chickpeas', category: 'legumes' },
  { id: 'lentils', name: 'Lentils (dried or canned)', category: 'legumes' },
  { id: 'edamame', name: 'Edamame (frozen)', category: 'legumes' },
  { id: 'white-beans', name: 'White beans (canned)', category: 'legumes' },

  // Healthy fats
  { id: 'olive-oil', name: 'Extra virgin olive oil', category: 'fats' },
  { id: 'avocados', name: 'Avocados', category: 'fats' },
  { id: 'almonds', name: 'Almonds (unsalted)', category: 'fats' },
  { id: 'walnuts', name: 'Walnuts', category: 'fats' },
  { id: 'almond-butter', name: 'Almond butter', category: 'fats' },
  { id: 'peanut-butter', name: 'Peanut butter (natural)', category: 'fats' },
  { id: 'flaxseed', name: 'Ground flaxseed', category: 'fats' },
  { id: 'chia-seeds', name: 'Chia seeds', category: 'fats' },

  // Dairy
  { id: 'milk', name: 'Low-fat milk or unsweetened almond milk', category: 'dairy' },
  { id: 'mozzarella', name: 'Part-skim mozzarella', category: 'dairy' },
  { id: 'feta', name: 'Feta cheese', category: 'dairy' },
  { id: 'parmesan', name: 'Parmesan cheese', category: 'dairy' },
  { id: 'shredded-cheese', name: 'Low-fat shredded cheese', category: 'dairy' },

  // Pantry
  { id: 'soy-sauce', name: 'Low-sodium soy sauce', category: 'pantry' },
  { id: 'balsamic', name: 'Balsamic vinegar', category: 'pantry' },
  { id: 'dijon', name: 'Dijon mustard', category: 'pantry' },
  { id: 'marinara', name: 'Marinara sauce (low-sodium)', category: 'pantry' },
  { id: 'chicken-broth', name: 'Chicken broth (low-sodium)', category: 'pantry' },
  { id: 'honey', name: 'Honey', category: 'pantry' },
  { id: 'maple-syrup', name: 'Maple syrup', category: 'pantry' },
  { id: 'tahini', name: 'Tahini', category: 'pantry' },
  { id: 'hummus', name: 'Hummus', category: 'pantry' },
  { id: 'guacamole', name: 'Guacamole', category: 'pantry' },
  { id: 'salsa', name: 'Salsa', category: 'pantry' },

  // Herbs & spices
  { id: 'basil', name: 'Fresh basil', category: 'herbs' },
  { id: 'oregano', name: 'Dried oregano', category: 'herbs' },
  { id: 'garlic-powder', name: 'Garlic powder', category: 'herbs' },
  { id: 'onion-powder', name: 'Onion powder', category: 'herbs' },
  { id: 'cumin', name: 'Cumin', category: 'herbs' },
  { id: 'paprika', name: 'Sweet paprika', category: 'herbs' },
  { id: 'italian-seasoning', name: 'Italian seasoning', category: 'herbs' },
  { id: 'ginger', name: 'Ground ginger', category: 'herbs' },
  { id: 'cinnamon', name: 'Cinnamon', category: 'herbs' },
  { id: 'pepper', name: 'Black pepper', category: 'herbs' },
];

export const groceryCategoryLabels: Record<string, string> = {
  proteins: 'Proteins',
  vegetables: 'Vegetables',
  fruits: 'Fruits',
  grains: 'Grains',
  legumes: 'Legumes',
  fats: 'Healthy fats',
  dairy: 'Dairy',
  pantry: 'Pantry',
  herbs: 'Herbs & spices',
};
