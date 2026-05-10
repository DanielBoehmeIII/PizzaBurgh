import { createContext, useContext } from 'react';
import type { CartItem, MenuItem } from '../../types/pizza';

export interface CartContextValue {
  items: CartItem[];
  totalCount: number;
  addItem: (item: MenuItem, size?: { label: string; price: number }) => void;
  removeItem: (itemId: string, sizeLabel?: string) => void;
  setQty: (itemId: string, sizeLabel: string | undefined, qty: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
