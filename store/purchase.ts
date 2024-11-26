import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import { Purchase } from "@/types/purchase";

interface PurchaseState {
  purchases: Purchase[];
  addPurchase: (purchase: Purchase) => Promise<void>;
  initializePurchases: () => Promise<void>;
  clearPurchases: () => Promise<void>;
}

export const usePurchaseStore = create<PurchaseState>((set) => ({
  purchases: [],

  addPurchase: async (purchase: Purchase) => {
    try {
      const currentPurchases = await SecureStore.getItemAsync("purchases");
      let updatedPurchases: Purchase[] = [];

      if (currentPurchases) {
        updatedPurchases = JSON.parse(currentPurchases);
      }

      updatedPurchases.push(purchase);
      await SecureStore.setItemAsync(
        "purchases",
        JSON.stringify(updatedPurchases)
      );
      set({ purchases: updatedPurchases });
    } catch (error) {
      console.error("Error adding purchase:", error);
    }
  },

  initializePurchases: async () => {
    try {
      const currentPurchases = await SecureStore.getItemAsync("purchases");
      if (currentPurchases) {
        set({ purchases: JSON.parse(currentPurchases) });
      }
    } catch (error) {
      console.error("Error initializing purchases:", error);
    }
  },

  clearPurchases: async () => {
    try {
      await SecureStore.deleteItemAsync("purchases");
      set({ purchases: [] });
    } catch (error) {
      console.error("Error clearing purchases:", error);
    }
  },
}));
