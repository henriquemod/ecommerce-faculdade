import { User } from "@/types/user";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

interface UserState {
  token: string | null;
  user: User | null;
  setToken: (token: string) => Promise<void>;
  setUser: (user: User) => Promise<void>;
  clearAuth: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<UserState>((set) => ({
  token: null,
  user: null,
  setToken: async (token: string) => {
    await SecureStore.setItemAsync("authToken", token);
    set({ token });
  },
  setUser: async (user: User) => {
    await SecureStore.setItemAsync("userData", JSON.stringify(user));
    set({ user });
  },
  clearAuth: async () => {
    await SecureStore.deleteItemAsync("authToken");
    await SecureStore.deleteItemAsync("userData");
    set({ token: null, user: null });
  },
  initializeAuth: async () => {
    const token = await SecureStore.getItemAsync("authToken");
    const userData = await SecureStore.getItemAsync("userData");
    if (token && userData) {
      set({ token, user: JSON.parse(userData) });
    }
  },
}));
