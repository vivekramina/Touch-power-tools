import { create } from 'zustand';
import { Product } from '../data/dummyData';

export interface CartItem extends Product {
  cartItemId: string; // unique id for cart entry
  quantity: number;
  selectedVariant: { id: string; name: string; price: number };
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) => set((state) => {
    // Check if item with same id and variant exists
    const existingItem = state.items.find(
      (i) => i.id === item.id && i.selectedVariant.id === item.selectedVariant.id
    );
    if (existingItem) {
      return {
        items: state.items.map((i) =>
          i.cartItemId === existingItem.cartItemId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        ),
      };
    }
    return { items: [...state.items, item] };
  }),
  removeItem: (cartItemId) => set((state) => ({
    items: state.items.filter((i) => i.cartItemId !== cartItemId),
  })),
  updateQuantity: (cartItemId, quantity) => set((state) => ({
    items: state.items.map((i) =>
      i.cartItemId === cartItemId ? { ...i, quantity: Math.max(1, quantity) } : i
    ),
  })),
  clearCart: () => set({ items: [] }),
  getCartTotal: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.selectedVariant.price * item.quantity, 0);
  },
  getCartCount: () => {
    const { items } = get();
    return items.reduce((count, item) => count + item.quantity, 0);
  },
}));
