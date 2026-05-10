export type PageId = 'home' | 'menu' | 'order' | 'account' | 'about' | 'contact';

export type MenuCategory =
  | 'pizza'
  | 'subs'
  | 'wings'
  | 'pepperoni-rolls'
  | 'pasta'
  | 'sides'
  | 'drinks';

export interface MenuItem {
  id: string;
  category: MenuCategory;
  name: string;
  description: string;
  price: number;
  sizes?: { label: string; price: number }[];
  popular?: boolean;
  imageSlot?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  selectedSize?: { label: string; price: number };
}

export interface CustomerAccount {
  name: string;
  email: string;
  phone: string;
  favoriteOrder: string;
  preferDelivery: boolean;
  savedAddress: string;
}
