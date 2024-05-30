// src/stores/useCreateOfferStore.ts
import { create } from "zustand";
import { SuiSignAndExecuteTransactionBlockOutput } from "@mysten/wallet-standard";

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
	transactionResult?: SuiSignAndExecuteTransactionBlockOutput;
	mintResult?: SuiSignAndExecuteTransactionBlockOutput;
	setNetwork: (network: string) => void;
	setOfferNumber: (offerNumber: number) => void;
	setOfferType: (offerType: "selling" | "buying") => void;
	setOfferToken: (offerToken: TokenInfo) => void;
	setSuiToken: (suiToken: TokenInfo) => void;
	setDescription: (description: string) => void;
	setTransactionResult: (transactionResult: SuiSignAndExecuteTransactionBlockOutput) => void;
	setMintResult: (mintResult: SuiSignAndExecuteTransactionBlockOutput) => void;
	setOfferInitialValues: () => void;
	setAll: (offer: {
		network: string;
		offerNumber?: number;
		offerType: "selling" | "buying";
		offerToken: TokenInfo;
		suiToken: TokenInfo;
		description: string;
		transactionResult?: SuiSignAndExecuteTransactionBlockOutput;
		mintResult?: SuiSignAndExecuteTransactionBlockOutput;
	}) => void;
}

export const useNewOfferStore = create<OfferState>((set) => ({
	network: "SUI",
	offerNumber: undefined,
	offerType: "selling",
	offerToken: {
		name: "Overflow",
		amount: "0",
	},
	suiToken: {
		name: "SUI",
		amount: "0",
	},
	description: "",
	transactionResult: undefined,
	mintResult: undefined,
	setNetwork: (network) => set({ network }),
	setOfferNumber: (offerNumber) => set({ offerNumber }),
	setOfferType: (offerType) => set({ offerType }),
	setOfferToken: (offerToken) => set({ offerToken }),
	setSuiToken: (suiToken) => set({ suiToken }),
	setDescription: (description) => set({ description }),
	setTransactionResult: (transactionResult) => set({ transactionResult }),
	setMintResult: (mintResult) => set({ mintResult }),
	setOfferInitialValues: () =>
		set({
			network: "SUI",
			offerNumber: undefined,
			offerType: "selling",
			offerToken: {
				name: "Overflow",
				amount: "0",
			},
			suiToken: {
				name: "SUI",
				amount: "0",
			},
			description: "",
			transactionResult: undefined,
			mintResult: undefined,
		}),
	setAll: (offer) => set({ ...offer }),
}));
