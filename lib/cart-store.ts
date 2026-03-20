"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  count: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((entry) => entry.id === item.id);
          if (existing) {
            return {
              items: state.items.map((entry) =>
                entry.id === item.id
                  ? { ...entry, quantity: entry.quantity + 1 }
                  : entry
              ),
            };
          }

          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),
      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((entry) => entry.id !== id),
            };
          }
          return {
            items: state.items.map((entry) =>
              entry.id === id ? { ...entry, quantity } : entry
            ),
          };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((entry) => entry.id !== id),
        })),
      clear: () => set({ items: [] }),
      count: () =>
        get().items.reduce((total, entry) => total + entry.quantity, 0),
    }),
    {
      name: "sky-blue-cart",
    }
  )
);
