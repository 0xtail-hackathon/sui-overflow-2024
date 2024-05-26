// src/store.ts
import create from "zustand";

interface OfferState {
    network: string;
    type: "selling" | "buying";
    setNetwork: (network: string) => void;
    setType: (type: "selling" | "buying") => void;
}

export const useOfferStore = create<OfferState>((set) => ({
    network: "SUI",
    type: "selling",
    setNetwork: (network) => set({ network }),
    setType: (type) => set({ type }),
}));
