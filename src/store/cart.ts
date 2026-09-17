"use client";

import { create } from "zustand";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  add: (product: Product, quantity?: number) => void;
  remove: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  count: () => number;
  subtotal: () => number;
}

export const useCart = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  add: (product, quantity = 1) =>
    set((state) => {
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          ),
          isOpen: true,
        };
      }
      return {
        items: [...state.items, { product, quantity }],
        isOpen: true,
      };
    }),
  remove: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.product.id !== id) })),
  setQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items
        .map((i) => (i.product.id === id ? { ...i, quantity } : i))
        .filter((i) => i.quantity > 0),
    })),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
  subtotal: () =>
    get().items.reduce((sum, i) => sum + i.quantity * i.product.price, 0),
}));
