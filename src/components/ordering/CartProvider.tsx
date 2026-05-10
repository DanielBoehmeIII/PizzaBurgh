import { useCallback, useEffect, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, MenuItem } from '../../types/pizza';
import { CartContext } from './CartContext';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD'; item: MenuItem; size?: { label: string; price: number } }
  | { type: 'REMOVE'; itemId: string; sizeLabel?: string }
  | { type: 'SET_QTY'; itemId: string; sizeLabel: string | undefined; qty: number }
  | { type: 'CLEAR' };

function cartKey(itemId: string, sizeLabel?: string) {
  return sizeLabel ? `${itemId}::${sizeLabel}` : itemId;
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const key = cartKey(action.item.id, action.size?.label);
      const existing = state.items.find(
        ci => cartKey(ci.item.id, ci.selectedSize?.label) === key,
      );
      if (existing) {
        return {
          items: state.items.map(ci =>
            cartKey(ci.item.id, ci.selectedSize?.label) === key
              ? { ...ci, quantity: ci.quantity + 1 }
              : ci,
          ),
        };
      }
      return {
        items: [...state.items, { item: action.item, quantity: 1, selectedSize: action.size }],
      };
    }
    case 'REMOVE': {
      const key = cartKey(action.itemId, action.sizeLabel);
      return { items: state.items.filter(ci => cartKey(ci.item.id, ci.selectedSize?.label) !== key) };
    }
    case 'SET_QTY': {
      const key = cartKey(action.itemId, action.sizeLabel);
      if (action.qty <= 0) {
        return { items: state.items.filter(ci => cartKey(ci.item.id, ci.selectedSize?.label) !== key) };
      }
      return {
        items: state.items.map(ci =>
          cartKey(ci.item.id, ci.selectedSize?.label) === key
            ? { ...ci, quantity: action.qty }
            : ci,
        ),
      };
    }
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

const STORAGE_KEY = 'pizzaburgh-cart';

function loadCart(): CartState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as CartState;
  } catch { /* ignore */ }
  return { items: [] };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadCart);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* ignore */ }
  }, [state]);

  const addItem = useCallback(
    (item: MenuItem, size?: { label: string; price: number }) =>
      dispatch({ type: 'ADD', item, size }),
    [],
  );
  const removeItem = useCallback(
    (itemId: string, sizeLabel?: string) =>
      dispatch({ type: 'REMOVE', itemId, sizeLabel }),
    [],
  );
  const setQty = useCallback(
    (itemId: string, sizeLabel: string | undefined, qty: number) =>
      dispatch({ type: 'SET_QTY', itemId, sizeLabel, qty }),
    [],
  );
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const totalCount = state.items.reduce((s, ci) => s + ci.quantity, 0);

  return (
    <CartContext.Provider value={{ items: state.items, totalCount, addItem, removeItem, setQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
