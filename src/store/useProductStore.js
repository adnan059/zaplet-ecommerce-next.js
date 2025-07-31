import { create } from "zustand";

export const useProductStore = create((set) => ({
  selectedProduct: null,
  selectedVariant: null,
  selectedAttributes: {},
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  clearSelectedProduct: () => set({ selectedProduct: null }),
  setSelectedVariant: (variant) => set({ selectedVariant: variant }),
  setSelectedAttributes: (attributes) =>
    set({ selectedAttributes: attributes }),
  resetSelections: () =>
    set({
      selectedVariant: null,
      selectedAttributes: {},
    }),
}));
