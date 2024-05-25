// src/stores/useWalletStore.ts
import { create } from "zustand";

interface WalletState {
    isAuthenticated: boolean;
    user: string | null;
    login: (user: string) => void;
    logout: () => void;
}

export const useWalletStore = create<WalletState>((set) => ({
    isAuthenticated: false,
    user: null,
    login: (user) => set({ isAuthenticated: true, user }),
    logout: () => set({ isAuthenticated: false, user: null }),
}));
