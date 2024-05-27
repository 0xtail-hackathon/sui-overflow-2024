// src/stores/useOfferStore.ts
import { create } from "zustand";

interface TokenInfo {
	name: string;
	amount: string; // number string (e.g. "100.002")
}

interface OfferState {
	network: string;
	offerNumber?: number;
	offerType: "selling" | "buying";
	offerToken: TokenInfo;
	suiToken: TokenInfo;
	description: string;
	setNetwork: (network: string) => void;
	setOfferNumber: (offerNumber: number) => void;
	setOfferType: (offerType: "selling" | "buying") => void;
	setOfferToken: (offerToken: TokenInfo) => void;
	setSuiToken: (suiToken: TokenInfo) => void;
	setDescription: (description: string) => void;
}

export const useOfferStore = create<OfferState>((set) => ({
	network: "SUI",
	offerNumber: undefined,
	offerType: "selling",
	offerToken: {
		name: "Scallop",
		amount: "0",
	},
	suiToken: {
		name: "SUI",
		amount: "0",
	},
	description: "",
	setNetwork: (network) => set({ network }),
	setOfferNumber: (offerNumber) => set({ offerNumber }),
	setOfferType: (offerType) => set({ offerType }),
	setOfferToken: (offerToken) => set({ offerToken }),
	setSuiToken: (suiToken) => set({ suiToken }),
	setDescription: (description) => set({ description }),
}));
