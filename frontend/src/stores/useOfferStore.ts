// src/stores/useOfferStore.ts
import { create } from "zustand";

interface OfferToken {
	name: string;
	amount: string; // number string (e.g. "100.002")
}

interface OfferState {
	network: string;
	offerType: "selling" | "buying";
	offerToken: OfferToken;
	suiToken: string;
	description: string;
	setNetwork: (network: string) => void;
	setOfferType: (offerType: "selling" | "buying") => void;
	setOfferToken: (offerToken: OfferToken) => void;
	setSuiToken: (suiToken: string) => void;
	setDescription: (description: string) => void;
}

export const useOfferStore = create<OfferState>((set) => ({
	network: "SUI",
	offerType: "selling",
	offerToken: {
		name: "Scallop",
		amount: "0",
	},
	suiToken: "Sui",
	description: "",
	setNetwork: (network) => set({ network }),
	setOfferType: (offerType) => set({ offerType }),
	setOfferToken: (offerToken) => set({ offerToken }),
	setSuiToken: (suiToken) => set({ suiToken }),
	setDescription: (description) => set({ description }),
}));
