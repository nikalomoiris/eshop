import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Cart } from '@/lib/types/cart';
import { Product } from '@/lib/types/product';

interface CartStore extends Cart {
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,

      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );

          let newItems: CartItem[];
          if (existingItem) {
            newItems = state.items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            newItems = [...state.items, { product, quantity }];
          }

          const total = newItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          );
          const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

          return { items: newItems, total, itemCount };
        });
      },

      removeItem: (productId: string) => {
        set((state) => {
          const newItems = state.items.filter(
            (item) => item.product.id !== productId
          );

          const total = newItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          );
          const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

          return { items: newItems, total, itemCount };
        });
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => {
          const newItems = state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          );

          const total = newItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          );
          const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

          return { items: newItems, total, itemCount };
        });
      },

      clearCart: () => {
        set({ items: [], total: 0, itemCount: 0 });
      },

      getItemQuantity: (productId: string) => {
        const item = get().items.find((item) => item.product.id === productId);
        return item?.quantity || 0;
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
