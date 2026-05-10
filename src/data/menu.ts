import type { MenuItem } from '../types/pizza';

export const MENU_ITEMS: MenuItem[] = [
  // ── Pizza ──────────────────────────────────────────────────
  {
    id: 'pizza-cheese',
    category: 'pizza',
    name: 'Classic Cheese',
    description: 'House-made tomato sauce, whole-milk mozzarella, baked to golden perfection.',
    price: 12.99,
    sizes: [
      { label: 'Small (10")', price: 12.99 },
      { label: 'Medium (14")', price: 15.99 },
      { label: 'Large (18")', price: 19.99 },
    ],
  },
  {
    id: 'pizza-pepperoni',
    category: 'pizza',
    name: 'Pepperoni',
    description: 'Loaded with cup-and-char pepperoni, mozzarella, and our signature red sauce.',
    price: 14.99,
    popular: true,
    sizes: [
      { label: 'Small (10")', price: 14.99 },
      { label: 'Medium (14")', price: 17.99 },
      { label: 'Large (18")', price: 22.99 },
    ],
  },
  {
    id: 'pizza-pittsburgh-special',
    category: 'pizza',
    name: 'Pittsburgh Special',
    description: 'Pepperoni, sausage, green peppers, onions, mushrooms — the full Steel City spread.',
    price: 18.99,
    popular: true,
    sizes: [
      { label: 'Medium (14")', price: 18.99 },
      { label: 'Large (18")', price: 24.99 },
    ],
  },
  {
    id: 'pizza-meat-lovers',
    category: 'pizza',
    name: 'Meat Lovers',
    description: 'Pepperoni, Italian sausage, bacon, ground beef, ham, mozzarella.',
    price: 19.99,
    sizes: [
      { label: 'Medium (14")', price: 19.99 },
      { label: 'Large (18")', price: 25.99 },
    ],
  },
  {
    id: 'pizza-white',
    category: 'pizza',
    name: 'White Pizza',
    description: 'Olive oil, garlic, ricotta, mozzarella, fresh basil, parmesan.',
    price: 16.99,
    sizes: [
      { label: 'Small (10")', price: 16.99 },
      { label: 'Medium (14")', price: 19.99 },
      { label: 'Large (18")', price: 23.99 },
    ],
  },
  {
    id: 'pizza-bbq-chicken',
    category: 'pizza',
    name: 'BBQ Chicken',
    description: 'Smoky BBQ sauce, grilled chicken, red onion, mozzarella, cilantro.',
    price: 17.99,
    sizes: [
      { label: 'Medium (14")', price: 17.99 },
      { label: 'Large (18")', price: 22.99 },
    ],
  },
  {
    id: 'pizza-veggie',
    category: 'pizza',
    name: 'Garden Veggie',
    description: 'Red sauce, roasted peppers, mushrooms, olives, onion, spinach, mozzarella.',
    price: 15.99,
    sizes: [
      { label: 'Small (10")', price: 15.99 },
      { label: 'Medium (14")', price: 18.99 },
      { label: 'Large (18")', price: 22.99 },
    ],
  },

  // ── Subs ───────────────────────────────────────────────────
  {
    id: 'sub-italian',
    category: 'subs',
    name: 'Italian Sub',
    description: 'Ham, salami, capicola, provolone, lettuce, tomato, onion, oil & vinegar.',
    price: 10.99,
    popular: true,
    sizes: [
      { label: '6"', price: 10.99 },
      { label: '12"', price: 14.99 },
    ],
  },
  {
    id: 'sub-meatball',
    category: 'subs',
    name: 'Meatball Parm',
    description: 'House-made beef meatballs, marinara, melted provolone, parmesan.',
    price: 11.99,
    sizes: [
      { label: '6"', price: 11.99 },
      { label: '12"', price: 15.99 },
    ],
  },
  {
    id: 'sub-chicken-parm',
    category: 'subs',
    name: 'Chicken Parm',
    description: 'Breaded chicken cutlet, marinara, melted mozzarella, fresh basil.',
    price: 12.49,
    sizes: [
      { label: '6"', price: 12.49 },
      { label: '12"', price: 16.99 },
    ],
  },
  {
    id: 'sub-steak',
    category: 'subs',
    name: 'Steak & Cheese',
    description: 'Shaved ribeye, provolone, sautéed onions and peppers on a toasted roll.',
    price: 12.99,
    sizes: [
      { label: '6"', price: 12.99 },
      { label: '12"', price: 17.99 },
    ],
  },
  {
    id: 'sub-veggie',
    category: 'subs',
    name: 'Veggie Delight',
    description: 'Roasted peppers, mushrooms, spinach, provolone, oil & vinegar.',
    price: 9.99,
    sizes: [
      { label: '6"', price: 9.99 },
      { label: '12"', price: 13.99 },
    ],
  },

  // ── Wings / Chicken ────────────────────────────────────────
  {
    id: 'wings-classic',
    category: 'wings',
    name: 'Wings',
    description: 'Hand-spun in your choice of sauce: Buffalo, BBQ, Garlic Parm, or Honey Hot.',
    price: 12.99,
    popular: true,
    sizes: [
      { label: '6 pieces', price: 12.99 },
      { label: '12 pieces', price: 22.99 },
      { label: '18 pieces', price: 31.99 },
    ],
  },
  {
    id: 'tenders-basket',
    category: 'wings',
    name: 'Chicken Tenders',
    description: 'Golden hand-breaded tenders with your choice of dipping sauce.',
    price: 11.99,
    sizes: [
      { label: '4 pieces', price: 11.99 },
      { label: '8 pieces', price: 19.99 },
    ],
  },
  {
    id: 'grilled-chicken',
    category: 'wings',
    name: 'Grilled Chicken',
    description: 'Marinated grilled chicken breast, served with a side.',
    price: 13.99,
  },

  // ── Pepperoni Rolls ────────────────────────────────────────
  {
    id: 'peproll-classic',
    category: 'pepperoni-rolls',
    name: 'Classic Pepperoni Roll',
    description: 'Soft dough filled with pepperoni and melted mozzarella. A Pittsburgh staple.',
    price: 3.99,
    popular: true,
    sizes: [
      { label: '1 roll', price: 3.99 },
      { label: '3 rolls', price: 10.99 },
      { label: '6 rolls', price: 19.99 },
    ],
  },
  {
    id: 'peproll-cheese',
    category: 'pepperoni-rolls',
    name: 'Double Cheese Roll',
    description: 'Extra mozzarella and provolone stuffed into our classic roll dough.',
    price: 4.49,
    sizes: [
      { label: '1 roll', price: 4.49 },
      { label: '3 rolls', price: 12.49 },
    ],
  },
  {
    id: 'peproll-supreme',
    category: 'pepperoni-rolls',
    name: 'Supreme Roll',
    description: 'Pepperoni, sausage, peppers, onions, and mozzarella all rolled up.',
    price: 4.99,
    sizes: [
      { label: '1 roll', price: 4.99 },
      { label: '3 rolls', price: 13.99 },
    ],
  },

  // ── Pasta ──────────────────────────────────────────────────
  {
    id: 'pasta-spaghetti',
    category: 'pasta',
    name: 'Spaghetti & Meatballs',
    description: 'Al dente spaghetti, house marinara, three hand-rolled beef meatballs.',
    price: 13.99,
  },
  {
    id: 'pasta-ziti',
    category: 'pasta',
    name: 'Baked Ziti',
    description: 'Ziti baked with ricotta, mozzarella, and marinara until bubbling and golden.',
    price: 12.99,
  },
  {
    id: 'pasta-alfredo',
    category: 'pasta',
    name: 'Fettuccine Alfredo',
    description: 'Fresh fettuccine, house-made cream sauce, parmesan, black pepper.',
    price: 12.49,
    sizes: [
      { label: 'Regular', price: 12.49 },
      { label: 'With Grilled Chicken', price: 16.49 },
    ],
  },
  {
    id: 'pasta-baked-ziti-meat',
    category: 'pasta',
    name: 'Meat Sauce Baked Pasta',
    description: 'Rigatoni baked with hearty Bolognese, mozzarella, and parmesan.',
    price: 14.99,
  },

  // ── Sides ──────────────────────────────────────────────────
  {
    id: 'side-garlic-bread',
    category: 'sides',
    name: 'Garlic Bread',
    description: 'Toasted Italian bread with garlic butter and herbs.',
    price: 4.49,
    sizes: [
      { label: 'Regular', price: 4.49 },
      { label: 'With Cheese', price: 5.99 },
    ],
  },
  {
    id: 'side-mozz-sticks',
    category: 'sides',
    name: 'Mozzarella Sticks',
    description: 'Six golden fried mozzarella sticks with marinara dipping sauce.',
    price: 7.99,
  },
  {
    id: 'side-fries',
    category: 'sides',
    name: 'French Fries',
    description: 'Crispy seasoned fries, served with your choice of dipping sauce.',
    price: 4.99,
    sizes: [
      { label: 'Regular', price: 4.99 },
      { label: 'Loaded', price: 7.49 },
    ],
  },
  {
    id: 'side-onion-rings',
    category: 'sides',
    name: 'Onion Rings',
    description: 'Beer-battered onion rings, golden and crispy.',
    price: 5.99,
  },
  {
    id: 'side-salad',
    category: 'sides',
    name: 'House Salad',
    description: 'Mixed greens, tomato, cucumber, red onion, croutons, your choice of dressing.',
    price: 6.99,
  },
  {
    id: 'side-breadsticks',
    category: 'sides',
    name: 'Breadsticks',
    description: 'Soft, pillowy breadsticks with garlic butter and marinara.',
    price: 5.49,
  },

  // ── Drinks ─────────────────────────────────────────────────
  {
    id: 'drink-soda',
    category: 'drinks',
    name: 'Fountain Soda',
    description: 'Coke, Diet Coke, Sprite, Root Beer, Dr Pepper.',
    price: 2.49,
    sizes: [
      { label: 'Regular', price: 2.49 },
      { label: 'Large', price: 3.29 },
    ],
  },
  {
    id: 'drink-lemonade',
    category: 'drinks',
    name: 'Fresh Lemonade',
    description: 'Made fresh daily with real lemons and just the right sweetness.',
    price: 3.49,
  },
  {
    id: 'drink-water',
    category: 'drinks',
    name: 'Bottled Water',
    description: 'Chilled still water.',
    price: 1.99,
  },
  {
    id: 'drink-juice',
    category: 'drinks',
    name: 'Juice',
    description: 'Orange, Apple, or Cranberry.',
    price: 2.99,
  },
];

export const CATEGORY_LABELS: Record<string, string> = {
  pizza: 'Pizza',
  subs: 'Subs',
  wings: 'Wings & Chicken',
  'pepperoni-rolls': 'Pepperoni Rolls',
  pasta: 'Pasta',
  sides: 'Sides',
  drinks: 'Drinks',
};

export const FEATURED_IDS = [
  'pizza-pittsburgh-special',
  'peproll-classic',
  'wings-classic',
  'sub-italian',
  'pasta-spaghetti',
  'tenders-basket',
];

export function getItemsByCategory(category: string): MenuItem[] {
  return MENU_ITEMS.filter(item => item.category === category);
}

export function getPopularItems(): MenuItem[] {
  return MENU_ITEMS.filter(item => item.popular);
}

export function getItemById(id: string): MenuItem | undefined {
  return MENU_ITEMS.find(item => item.id === id);
}
