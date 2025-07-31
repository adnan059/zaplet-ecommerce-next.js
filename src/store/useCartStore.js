import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      selectedIds: [],

      // Add Item to Cart
      addToCart: (newItem) => {
        set((state) => {
          const cart = [...state.cartItems];

          const existingIndex = cart.findIndex((item) => {
            return newItem.variant_code
              ? item.variant_code === newItem.variant_code
              : !item.variant_code &&
                  item.product_code === newItem.product_code;
          });

          const existingItem = cart[existingIndex];
          const currentQty = existingItem?.quantity ?? 0;
          const maxQty = newItem.total_stock;
          const combinedQty = Math.min(maxQty, currentQty + newItem.quantity);

          if (existingItem) {
            cart[existingIndex] = {
              ...existingItem,
              quantity: combinedQty,
            };
            return { cartItems: cart };
          }

          return {
            cartItems: [
              ...cart,
              {
                ...newItem,
                quantity: Math.min(maxQty, newItem.quantity),
              },
            ],
          };
        });
      },

      // Update Quantity (Clamped)
      updateQuantity: (id, newQty) => {
        set((state) => {
          const updatedCart = state.cartItems.map((item) => {
            const matches =
              item.variant_code === id ||
              (!item.variant_code && item.product_code === id);
            const clampedQty = Math.max(1, Math.min(item.total_stock, newQty));
            return matches ? { ...item, quantity: clampedQty } : item;
          });
          return { cartItems: updatedCart };
        });
      },

      // Remove Specific Cart Item
      removeFromCart: (id) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => {
            const matchId = item.variant_code || item.product_code;
            return matchId !== id;
          }),
          selectedIds: state.selectedIds.filter((sid) => sid !== id),
        }));
      },

      // Clear Entire Cart
      clearCart: () => set({ cartItems: [], selectedIds: [] }),

      // Selection Management
      toggleSelection: (id) => {
        set((state) => {
          const alreadySelected = state.selectedIds.includes(id);
          return {
            selectedIds: alreadySelected
              ? state.selectedIds.filter((i) => i !== id)
              : [...state.selectedIds, id],
          };
        });
      },

      selectAll: () => {
        const allIds = get().cartItems.map(
          (item) => item.variant_code || item.product_code
        );
        set({ selectedIds: allIds });
      },

      clearSelection: () => set({ selectedIds: [] }),

      clearSelectedItems: () =>
        set((state) => {
          return {
            cartItems: state.cartItems.filter(
              (item) =>
                !state.selectedIds.includes(
                  item.variant_code || item.product_code
                )
            ),
            selectedIds: [],
          };
        }),
    }),
    {
      name: "cart-storage",
    }
  )
);
