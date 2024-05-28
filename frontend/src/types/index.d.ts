// src/types/index.d.ts
declare interface CardProps {
	logo?: React.ReactNode;
	offerNumber: number;
	tokenName: string;
	offerAccountAddress: string;
	tokenAmount: string;
	suiAmount: string;
	offerType: "selling" | "buying"; // 추가
	network: string; // 추가
	width?: string; // 추가
	height?: string; // 추가
}
