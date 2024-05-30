// src/pages/OfferDetail.tsx
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "@assets/images/icon-arrow-left.svg?react";
import theme from "@/styles/theme";
import { useOfferDetailStore } from "@/stores/useOfferDetailStore";
import ScallopLogo from "@assets/images/logo-scallop.svg?react";
import SuiLogo from "@assets/images/logo-sui.svg?react";
import CetusLogo from "@assets/images/logo-cetus.svg?react";
import { commaInNumbers } from "@/utils/helpers";
import {useWallet} from "@suiet/wallet-kit";
import {TransactionBlock} from "@mysten/sui.js/transactions";

const OfferContainer = styled.div`
	position: relative;
	padding: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
`;

const TitleBox = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 10px;

	h2 {
		font-size: 1.5rem;
	}

	span {
		font-size: 0.9rem;
		color: ${({ theme }) => theme.colors.gray};
	}
`;

const BackToHomeButton = styled(ArrowLeftIcon)`
	cursor: pointer;
	width: 20px;
	height: 20px;
	fill: ${({ theme }) => theme.colors.gray};
`;

const ContentContainer = styled.div`
	position: relative;
	display: flex;
	align-items: flex-start;
	flex-direction: row;
	gap: 20px;
	width: 100%;
	height: 700px;
	padding: 40px;
`;

const LeftContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	width: 50%;
`;

const RightContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	width: 50%;
`;

const FormBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	background-color: white;
	padding: 30px;
	border-radius: 8px;
	box-shadow: ${({ theme }) => theme.shadows.style1};
`;

const ButtonGroup = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	justify-content: space-between;
	gap: 20px;
	width: 100%;
	padding: 0 8px;
`;

const Button = styled.button<{ $primary?: boolean }>`
	padding: 10px 20px;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	background: ${({ $primary }) => ($primary ? "linear-gradient(90deg, #00b3ff 0%, #1f93ff 100%);" : theme.colors.gray)};
	color: white;
	font-size: 1rem;
	min-width: 160px;

	&:hover {
		color: ${({ theme }) => theme.colors.black};
		background: ${({ $primary }) =>
			$primary ? "linear-gradient(90deg, #1f93ff 0%, #00b3ff 100%);" : theme.colors.light_gray};
	}
`;
const ReviewContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	border-radius: 8px;
`;

const SuiLogoImage = styled(SuiLogo)`
	padding: 7px;
`;

const TokenDetails = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;

	span {
		font-size: 1rem;
		color: ${({ theme }) => theme.colors.gray};
	}

	h4 {
		font-size: 1.5rem;
		margin: 0;
	}

	.token-logo {
		position: relative;
	}

	.offer-token-logo {
		position: relative;
		width: 100px;
		height: 100px;
	}

	.sui-logo {
		position: absolute;
		left: 16px;
		bottom: 16px;
		width: 24px;
		height: 24px;
	}
`;

const Description = styled.p`
	font-size: 1rem;
	color: ${({ theme }) => theme.colors.gray};
	margin-top: 10px;
	margin-bottom: 20px;
	word-wrap: break-word;
`;

const AmountBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 30px;
	width: 100%;
`;

const TokenBox = styled.div`
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	gap: 10px;
	width: 100%;

	label {
		color: ${({ theme }) => theme.colors.gray};
		font-size: 1rem;
	}
`;

const TokenField = styled.div`
	display: flex;
	align-items: center;
	border: 1px solid #ccc;
	border-radius: 8px;
	padding: 8px;
	width: 100%;
	height: 50px;

	input {
		flex: 1;
		margin-right: 10px;
		font-size: 1rem;
		border: none;
		padding: 0 10px;

		&:focus {
			outline: none;
		}
	}

	> div {
		display: flex;
		align-items: center;
		gap: 5px;
		width: 100px;

		svg {
			width: 40px;
			height: 40px;
		}

		span {
			font-size: 1rem;
			color: ${({ theme }) => theme.colors.black};
		}
	}
`;

const DetailsBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 20px;
	background-color: ${({ theme }) => theme.colors.white};
	border-radius: 8px;
	border: 1px solid ${({ theme }) => theme.colors.light_gray};
`;

const DetailContent = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	/* &:not(:last-child) {
		border-bottom: 1px solid ${({ theme }) => theme.colors.light_gray};
	} */

	span {
		font-size: 1rem;
	}

	.label {
		color: ${({ theme }) => theme.colors.gray};
	}

	.value {
		font-weight: bold;
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.offer-type {
		color: ${({ theme }) => theme.colors.emphasis};
	}

	svg {
		width: 40px;
		height: 40px;
	}

	div {
		width: 40px;
	}
`;

const OfferDetail: React.FC = () => {
	// const [buyResult, setBuyResult] = useState<any>(null);
	const navigate = useNavigate();
	const offerInfo = useOfferDetailStore();
	const wallet = useWallet();

	function takeOfferTransaction(gasCoinForToken: string, gasCoinForFee: string) {
		const txb = new TransactionBlock();

		const contractAddress = "0xae636d4fcbc298aac86f42df99ad5bd7effc551991a53b71a2f588090d7117d3";
		const contractModule = "marketplace";
		const contractMethod = "buy_and_take";

		const marketId = "0x0a407538e81bbd606b88ac206a926472f5c0e14fd5c0f3af07861e7e4328543f";
		const item = "0xc28b7c882d28bd99ffa963b6171e050f6ba39cdfb69694677ee509e9b59d7c17";
		const itemContractAddress = "0x58643225dab4e028d600b1b89d89fa613c4a0769d158fdaaf04d596055584a65";
		console.log(txb.gas);

		txb.moveCall({
			target: `${contractAddress}::${contractModule}::${contractMethod}`,
			typeArguments: [
				`0x2::coin::Coin<${itemContractAddress}::managed::MANAGED>`,
				"0x2::sui::SUI",
			],
			arguments: [
				txb.object(marketId),         // MARKET_ID
				txb.pure(item),             // ITEM_ID
				txb.object(gasCoinForToken),  // BUYER_TOKEN_PAID_OBJECT
				txb.object(gasCoinForFee),    // BUYER_FEE_PAID_OBJECT
			],
		});

		// Logging for debugging
		console.log("Transaction Block:", txb);
		console.log("Market ID:", marketId);
		console.log("Item ID:", item);
		console.log("Gas Coin for Token:", gasCoinForToken);
		console.log("Gas Coin for Fee:", gasCoinForFee);

		return txb;
	}

	async function takeOffer(tokenPrice: number, fee: number) {
		if (!wallet.connected) {
			console.error('Wallet is not connected.');
			return;
		}

		// Replace with your actual API call and response handling
		const response = await fetch('https://sui-devnet.blockeden.xyz/9ib8BrdidJqejt8L86bT', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"jsonrpc": "2.0",
				"id": 1,
				"method": "suix_getAllCoins",
				"params": [
					wallet.account?.address,
					null,
					10
				]
			})
		});

		const data = await response.json();
		const coins = data.result.data;
		console.log("coins: ", coins);

		let gasCoinForToken = null;
		let gasCoinForFee = null;

		// Find a coin with balance greater than tokenPrice
		for (const coin of coins) {
			if (parseInt(coin.balance) >= tokenPrice) {
				gasCoinForToken = coin.coinObjectId;
				break;
			}
		}

		// Find a different coin with balance greater than fee
		for (const coin of coins) {
			if (parseInt(coin.balance) >= fee) {
				if (coin.coinObjectId !== gasCoinForToken) {
					gasCoinForFee = coin.coinObjectId;
					break;
				}
			}
		}

		// If no different coin was found, attempt to find a coin that covers both tokenPrice and fee
		if (!gasCoinForFee) {
			for (const coin of coins) {
				if (parseInt(coin.balance) >= (tokenPrice + fee)) {
					gasCoinForFee = coin.coinObjectId;
					break;
				}
			}
		}

		// If gasCoinForToken and gasCoinForFee are not assigned, handle the error appropriately
		if (!gasCoinForToken || !gasCoinForFee) {
			console.error('Insufficient balance for either token purchase or fee.');
			return;
		}

		const txb = takeOfferTransaction(gasCoinForToken, gasCoinForFee);

		try {
			console.log('Executing transaction block...');
			console.log(txb);
			const res = await wallet.signAndExecuteTransactionBlock({
				transactionBlock: txb
			});
			console.log("Take offer success!", res);
			// setBuyResult(res);
		} catch (e) {
			console.error("Take offer failed", e);
		}
	}
	const handleBack = () => {
		navigate(-1);
	};

	const handleSubmit = async () => {
		await takeOffer(10000000000, 1000000000);
		// TODO: Submit the form
		offerInfo.setOfferNumber(123456);
		// TODO: deliver transaction digest to offer success page
		navigate("/offer/success");
	};

	return (
		<OfferContainer>
			<TitleBox>
				<BackToHomeButton onClick={handleBack} />
				<h2>Offer Detail</h2>
			</TitleBox>
			<ContentContainer>
				<LeftContent>
					<FormBox>
						<ReviewContainer>
							<TokenDetails>
								<div className="token-logo">
									<ScallopLogo className="offer-token-logo" />
									<SuiLogo className="sui-logo" />
								</div>
								<div>
									<span>#{commaInNumbers(1000)}</span>
									<h4>{offerInfo.offerToken.name}</h4>
								</div>
							</TokenDetails>
							{offerInfo.description && <Description>{offerInfo.description}</Description>}
						</ReviewContainer>
						<AmountBox>
							<TokenBox>
								<label>{offerInfo.offerType === "selling" ? "You will be receiving:" : "You will be paying:"}</label>
								<TokenField>
									<input type="text" value={offerInfo.offerToken.amount} readOnly />
									<div>
										{offerInfo.offerToken.name === "Scallop" && <ScallopLogo />}
										{offerInfo.offerToken.name === "Cetus" && <CetusLogo />}
										<span>{offerInfo.offerToken.name}</span>
									</div>
								</TokenField>
							</TokenBox>
							<TokenBox>
								<label>{offerInfo.offerType === "selling" ? "You will be paying:" : "You will be receiving:"}</label>
								<TokenField>
									<input
										type="text"
										value={offerInfo.offerType === "buying" ? offerInfo.suiToken.amount : offerInfo.suiToken.amount}
										readOnly
									/>
									<div>
										<SuiLogoImage />
										<span>SUI</span>
									</div>
								</TokenField>
							</TokenBox>
						</AmountBox>
					</FormBox>
					<ButtonGroup>
						<Button onClick={handleBack}>Back</Button>
						<Button $primary onClick={handleSubmit}>
							Take Offer
						</Button>
					</ButtonGroup>
				</LeftContent>
				<RightContent>
					<FormBox>
						<label>More Details</label>
						<DetailsBox>
							<DetailContent>
								<span className="label">Offer Type:</span>
								<span className="value offer-type">
									{offerInfo.offerType.charAt(0).toUpperCase() + offerInfo.offerType.slice(1)}
									<div></div>
								</span>
							</DetailContent>
							<DetailContent>
								<span className="label">Want to {offerInfo.offerType}:</span>
								<span className="value">
									{offerInfo.offerToken.amount} {offerInfo.offerToken.name}
									{offerInfo.offerToken.name === "Scallop" && <ScallopLogo />}
									{offerInfo.offerToken.name === "Cetus" && <CetusLogo />}
								</span>
							</DetailContent>
							<DetailContent>
								<span className="label">Total Dividend Received:</span>
								<span className="value">
									{offerInfo.suiToken.amount} {offerInfo.suiToken.name} <SuiLogoImage />
								</span>
							</DetailContent>
							<DetailContent>
								<span className="label">Listing Fee (0.1%):</span>
								<span className="value">
									{Number(offerInfo.suiToken.amount) * 0.001} {offerInfo.suiToken.name} <SuiLogoImage />
								</span>
							</DetailContent>
						</DetailsBox>
					</FormBox>
				</RightContent>
			</ContentContainer>
		</OfferContainer>
	);
};

export default OfferDetail;
