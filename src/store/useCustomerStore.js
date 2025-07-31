import { create } from "zustand";

export const useCustomerStore = create((set) => ({
  customerDetails: {
    fullName: "",
    phone: "",
    address: "",
    isSaved: false,
  },
  setCustomerDetails: (data) => set({ customerDetails: data }),
}));
