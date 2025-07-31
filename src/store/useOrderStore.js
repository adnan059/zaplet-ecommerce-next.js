// // ✅ useOrderStore.js
// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// export const useOrderStore = create(
//   persist(
//     (set) => ({
//       deliveryLocation: "", // "inside" or "outside"
//       agreedToTerms: false, // checkbox state
//       orderDetails: null, // stored order info

//       setDeliveryLocation: (location) => set({ deliveryLocation: location }),
//       setAgreedToTerms: (status) => set({ agreedToTerms: status }),
//       setOrderDetails: (details) => set({ orderDetails: details }),
//       clearOrderDetails: () => set({ orderDetails: null }),
//     }),
//     {
//       name: "order-storage", // localStorage key
//     }
//   )
// );

// ✅ useOrderStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useOrderStore = create(
  persist(
    (set) => ({
      // 🚚 Delivery logic
      deliveryLocation: "", // "inside" or "outside"
      agreedToTerms: false, // checkbox state

      // 📦 Order data
      orderDetails: null, // confirmation details

      // 🔄 Hydration guard
      _hasHydrated: false,

      // ✅ Setters
      setDeliveryLocation: (location) => set({ deliveryLocation: location }),
      setAgreedToTerms: (status) => set({ agreedToTerms: status }),
      setOrderDetails: (details) => set({ orderDetails: details }),
      setHydrated: () => set({ _hasHydrated: true }),

      // 🧹 Clear function
      clearOrderDetails: () => set({ orderDetails: null }),
    }),
    {
      name: "order-storage", // localStorage key

      // 🛡 Hydration tracker
      onRehydrateStorage: () => (state) => {
        state.setHydrated();
      },
    }
  )
);
