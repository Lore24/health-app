import { GroceryItem } from '../types';

export const groceryList: GroceryItem[] = [
  // Proteins
  { id: 'chicken-breast', name: 'Chicken breasts (boneless, skinless)', category: 'proteins', quantity: '5.25 lbs' },
  { id: 'chicken-ground', name: 'Ground chicken breast (93/7)', category: 'proteins', quantity: '1 lb' },
  { id: 'eggs', name: 'Eggs', category: 'proteins', quantity: '1 dozen' },
  { id: 'greek-yogurt', name: 'Greek yogurt (plain, low-fat)', category: 'proteins', quantity: '32 oz tub' },
  { id: 'cottage-cheese', name: 'Cottage cheese (low-fat)', category: 'proteins', quantity: '16 oz tub' },
  { id: 'protein-powder', name: 'Vanilla protein powder', category: 'proteins', quantity: '1 tub (stock)' },

  // Vegetables
  { id: 'spinach', name: 'Baby spinach', category: 'vegetables', quantity: '2 × 5 oz bags' },
  { id: 'mixed-greens', name: 'Mixed greens', category: 'vegetables', quantity: '1 × 8 oz clamshell' },
  { id: 'broccoli', name: 'Broccoli', category: 'vegetables', quantity: '2 crowns (~1.5 lbs)' },
  { id: 'bell-peppers', name: 'Bell peppers', category: 'vegetables', quantity: '2 medium' },
  { id: 'carrots', name: 'Carrots', category: 'vegetables', quantity: '1 lb bag' },
  { id: 'celery', name: 'Celery', category: 'vegetables', quantity: '1 small bunch' },
  { id: 'sweet-potatoes', name: 'Sweet potatoes', category: 'vegetables', quantity: '4 medium' },
  { id: 'brussels-sprouts', name: 'Brussels sprouts', category: 'vegetables', quantity: '1 lb' },
  { id: 'asparagus', name: 'Asparagus', category: 'vegetables', quantity: '1 bunch' },
  { id: 'cherry-tomatoes', name: 'Cherry tomatoes', category: 'vegetables', quantity: '2 pints' },
  { id: 'cucumber', name: 'English cucumber', category: 'vegetables', quantity: '1' },
  { id: 'onions', name: 'Yellow onions', category: 'vegetables', quantity: '2 medium' },
  { id: 'garlic', name: 'Garlic', category: 'vegetables', quantity: '1 head' },

  // Fruits
  { id: 'mixed-berries', name: 'Mixed berries (frozen)', category: 'fruits', quantity: '1 × 24 oz bag' },
  { id: 'apples', name: 'Apples', category: 'fruits', quantity: '3' },
  { id: 'bananas', name: 'Bananas', category: 'fruits', quantity: '5' },
  { id: 'lemons', name: 'Lemons', category: 'fruits', quantity: '2' },

  // Grains
  { id: 'brown-rice', name: 'Brown rice', category: 'grains', quantity: '1 lb (stock)' },
  { id: 'quinoa', name: 'Quinoa', category: 'grains', quantity: '1 cup dry' },
  { id: 'whole-wheat-bread', name: 'Whole wheat bread', category: 'grains', quantity: '1 loaf' },
  { id: 'whole-wheat-tortillas', name: 'Whole wheat tortillas', category: 'grains', quantity: '1 pack (8 ct)' },
  { id: 'whole-wheat-pasta', name: 'Whole wheat pasta', category: 'grains', quantity: '1 × 12 oz box' },
  { id: 'wild-rice', name: 'Wild rice pilaf', category: 'grains', quantity: '1 small bag' },

  // Legumes
  { id: 'black-beans', name: 'Black beans (canned, low-sodium)', category: 'legumes', quantity: '3 × 15 oz cans' },
  { id: 'white-beans', name: 'Cannellini beans (canned)', category: 'legumes', quantity: '1 × 15 oz can' },
  { id: 'hummus', name: 'Hummus (pre-made)', category: 'legumes', quantity: '1 × 10 oz tub' },

  // Healthy fats
  { id: 'olive-oil', name: 'Extra virgin olive oil', category: 'fats', quantity: '1 bottle (stock)' },
  { id: 'avocados', name: 'Avocados', category: 'fats', quantity: '4' },
  { id: 'almonds', name: 'Raw almonds', category: 'fats', quantity: '1 × 6 oz bag' },
  { id: 'walnuts', name: 'Walnut halves', category: 'fats', quantity: '1 × 6 oz bag' },
  { id: 'almond-butter', name: 'Almond butter', category: 'fats', quantity: '1 jar (stock)' },
  { id: 'flaxseed', name: 'Ground flaxseed', category: 'fats', quantity: '1 small bag (stock)' },

  // Dairy
  { id: 'almond-milk', name: 'Unsweetened almond milk', category: 'dairy', quantity: '1 × 64 oz carton' },
  { id: 'parmesan', name: 'Parmesan cheese (grated)', category: 'dairy', quantity: '1 small container' },
  { id: 'shredded-cheese', name: 'Shredded low-fat cheese', category: 'dairy', quantity: '1 × 8 oz bag' },

  // Pantry
  { id: 'balsamic', name: 'Balsamic vinegar', category: 'pantry', quantity: '1 bottle (stock)' },
  { id: 'dijon', name: 'Dijon mustard', category: 'pantry', quantity: '1 jar (stock)' },
  { id: 'marinara', name: 'Marinara sauce (low-sodium)', category: 'pantry', quantity: '1 × 24 oz jar' },
  { id: 'chicken-broth', name: 'Chicken broth (low-sodium)', category: 'pantry', quantity: '2 × 32 oz cartons' },
  { id: 'salsa', name: 'Salsa', category: 'pantry', quantity: '1 × 16 oz jar' },
  { id: 'honey', name: 'Honey', category: 'pantry', quantity: '1 jar (stock)' },
  { id: 'sun-dried-tomatoes', name: 'Sun-dried tomatoes (oil-packed)', category: 'pantry', quantity: '1 small jar' },
  { id: 'artichoke-hearts', name: 'Artichoke hearts (canned)', category: 'pantry', quantity: '1 × 14 oz' },
  { id: 'breadcrumbs', name: 'Whole wheat breadcrumbs', category: 'pantry', quantity: '1 small container' },

  // Herbs & spices
  { id: 'italian-seasoning', name: 'Italian seasoning', category: 'herbs', quantity: '1 jar (stock)' },
  { id: 'garlic-powder', name: 'Garlic powder', category: 'herbs', quantity: '1 jar (stock)' },
  { id: 'paprika', name: 'Sweet paprika', category: 'herbs', quantity: '1 jar (stock)' },
  { id: 'cumin', name: 'Cumin', category: 'herbs', quantity: '1 jar (stock)' },
  { id: 'oregano', name: 'Dried oregano', category: 'herbs', quantity: '1 jar (stock)' },
  { id: 'basil-dried', name: 'Dried basil', category: 'herbs', quantity: '1 jar (stock)' },
  { id: 'black-pepper', name: 'Black pepper', category: 'herbs', quantity: '1 jar (stock)' },
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
