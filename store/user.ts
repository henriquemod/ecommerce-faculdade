import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

export interface UserState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => Promise<void>;
}

export const useAuthStore = create<UserState>((set) => ({
  token: null,
  setToken: (token) => {
    SecureStore.setItem("authToken", token);
    set({ token });
  },
  clearToken: async () => {
    await SecureStore.deleteItemAsync("authToken");
    set({ token: null });
  },
}));
