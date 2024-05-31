// src/pages/OfferDetail.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "@assets/images/icon-arrow-left.svg?react";
import Step1 from "@components/CreateOffer/Step1";
import Step2 from "@components/CreateOffer/Step2";
import Step3 from "@components/CreateOffer/Step3";
import { useCreateOfferStore } from "@stores/useCreateOfferStore";
import theme from "@/styles/theme";
import OfferCard from "@/components/common/OfferCard";
import { useWallet } from "@suiet/wallet-kit";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import TransactionFailure from "@components/common/TransactionFailure";
import { useNewOfferStore } from "@/stores/useNewOfferStore";

const CreateOfferContainer = styled.div`
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
	position: absolute;
	top: 120px;
	left: 50%;
	transform: translate(-50%, 0);
	align-items: center;
	display: flex;
	flex-direction: column;
	gap: 20px;
	width: 620px;
`;

const CreateFormBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	background-color: white;
	padding: 40px;
	border-radius: 8px;
	box-shadow: ${({ theme }) => theme.shadows.style1};
`;

const StepIndicator = styled.div`
	display: grid;
	grid-template-columns: 1fr 100px 1fr 100px 1fr;
	width: 100%;
	height: 60px;
	justify-content: space-between;
	align-items: center;
`;

const Step = styled.div<{ $active: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 1rem;
	color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.gray)};
	width: 100%;
	gap: 8px;
	font-weight: ${({ $active }) => ($active ? "600" : "400")};
`;

const StepTitle = styled.div`
	font-size: 0.9rem;
`;

const StepNumber = styled.div<{ $active: boolean }>`
	background-color: ${({ theme, $active }) => ($active ? theme.colors.secondary : "#ccc")};
	color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.gray)};
	width: 30px;
	height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 8px;
`;

const StepArrow = styled.div`
	position: relative;
	width: 100px;
	height: 2px;
	background-color: #ccc;
	top: 10px;

	&:after {
		content: "";
		position: relative;
		top: -4px;
		left: calc(100px - 8px);
		display: block;
		width: 0;
		height: 0;
		border-top: 5px solid transparent;
		border-bottom: 5px solid transparent;
		border-left: 8px solid #ccc;
	}
`;

const Divider = styled.hr`
	border: none;
	border-top: 1px solid ${({ theme }) => theme.colors.light_gray};
	margin: 20px 0;
`;

const FormSection = styled.div`
	background-color: ${({ theme }) => theme.colors.white};
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	gap: 30px;
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

const StyledLink = styled.a`
	color: ${({ theme }) => theme.colors.primary};
	text-decoration: none;
	font-weight: bold;

	&:hover {
		text-decoration: underline;
		color: ${({ theme }) => theme.colors.secondary};
	}
`;

const CreateOffer: React.FC = () => {
	const [step, setStep] = useState(1);
	const [transactionFailed, setTransactionFailed] = useState(false);
	const navigate = useNavigate();
	const offerInfo = useCreateOfferStore();
	const newOfferInfo = useNewOfferStore();
	const wallet = useWallet();

	function makeSellOffer(offerTokenAmount: number, suiTokenAmount: number, sellerFeeObject: string) {
		const txb = new TransactionBlock();

		const contractAddress = "0xae636d4fcbc298aac86f42df99ad5bd7effc551991a53b71a2f588090d7117d3";
		const contractModule = "marketplace";
		const contractMethod = "list";

		const marketId = "0x0a407538e81bbd606b88ac206a926472f5c0e14fd5c0f3af07861e7e4328543f";
		const itemContractAddress = "0x58643225dab4e028d600b1b89d89fa613c4a0769d158fdaaf04d596055584a65";

		// TODO: 데모용으로 item object
		const item = "0x2a3c30a7adb88965a7925cb67b08625d38480ebdc397dfb0b496ab76299f65f5";

		const src_price = suiTokenAmount;

		const fee = sellerFeeObject;

		console.log(offerTokenAmount);
		txb.moveCall({
			target: `${contractAddress}::${contractModule}::${contractMethod}`,
			typeArguments: [`0x2::coin::Coin<${itemContractAddress}::managed::MANAGED>`, "0x2::sui::SUI"],
			arguments: [txb.object(marketId), txb.object(item), txb.pure(src_price), txb.object(fee)],
		});
		return txb;
	}

	async function sellOffer(offerTokenAmount: number, suiTokenAmount: number) {
		const response = await fetch("https://sui-devnet.blockeden.xyz/9ib8BrdidJqejt8L86bT", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				jsonrpc: "2.0",
				id: 1,
				method: "suix_getAllCoins",
				params: [wallet.account?.address, null, 10],
			}),
		});
		const data = await response.json();
		const coins = data.result.data;
		console.log(coins);

		let sellerFeeObject = null;

		for (const coin of coins) {
			if (parseInt(coin.balance) >= 10) {
				sellerFeeObject = coin.coinObjectId;
				break;
			}
		}
		console.log("sellerFeeObject: ", sellerFeeObject);
		// sui decimal is 9
		const txb = makeSellOffer(offerTokenAmount, 1_000_000_000 * suiTokenAmount, sellerFeeObject);
		try {
			console.log("Executing transaction block...");
			console.log(txb);

			const res = await wallet.signAndExecuteTransactionBlock({
				transactionBlock: txb,
			});
			console.log("sell offer made successfully!", res);
			offerInfo.setTransactionResult(res); // Update the state with the transaction result
			offerInfo.setMintResult(res);

			newOfferInfo.setNetwork(offerInfo.network);
			newOfferInfo.setOfferType(offerInfo.offerType);
			newOfferInfo.setOfferToken(offerInfo.offerToken);
			newOfferInfo.setSuiToken(offerInfo.suiToken);
		} catch (e) {
			console.error("sell offer failed", e);
			setTransactionFailed(true); // Update state to indicate transaction failure
		}
	}

	useEffect(() => {
		console.log(`New Offer Info: ${JSON.stringify(newOfferInfo)}`);
	}, [newOfferInfo]);

	useEffect(() => {
		if (!wallet.connected) {
			navigate("/"); // 연결되지 않은 경우 홈 페이지로 리디렉션
		}
	}, [wallet.connected, navigate]);

	// 초기 설정
	useEffect(() => {
		offerInfo.setOfferInitialValues();
	}, []);

	useEffect(() => {
		console.log(`[step ${step}] ${JSON.stringify(offerInfo)}`);
	}, [offerInfo.description, offerInfo.network, offerInfo.offerToken, offerInfo.offerType, offerInfo.suiToken]);

	const handleNext = () => {
		if (step < 3) setStep(step + 1);
	};

	const handleBack = () => {
		if (step > 1) setStep(step - 1);
		if (step === 1) navigate(-1);
	};

	const handleCreateOffer = async () => {
		await sellOffer(Number(offerInfo.offerToken.amount), Number(offerInfo.suiToken.amount));
		if (!transactionFailed) {
			setStep(4);
		}

		const response = await fetch("https://sui-devnet.blockeden.xyz/9ib8BrdidJqejt8L86bT", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				jsonrpc: "2.0",
				id: 1,
				method: "suix_getAllCoins",
				params: [wallet.account?.address, null, 10],
			}),
		});

		const data = await response.json();
		const coins = data.result.data;
		console.log("coins: ", coins);
	};

	const handleGoToHome = () => {
		navigate("/");
	};

	if (transactionFailed) return <TransactionFailure />;

	if (step < 4)
		return (
			<CreateOfferContainer>
				<TitleBox>
					<BackToHomeButton onClick={handleBack} />
					<h2>Create Offer in OTC Market</h2>
					<span>(Step {step} of 3)</span>
				</TitleBox>
				<ContentContainer>
					<CreateFormBox>
						<StepIndicator>
							<Step $active={step === 1}>
								<StepTitle>Network & Type</StepTitle>
								<StepNumber $active={step === 1}>1</StepNumber>
							</Step>
							<StepArrow />
							<Step $active={step === 2}>
								<StepTitle>Detail</StepTitle>
								<StepNumber $active={step === 2}>2</StepNumber>
							</Step>
							<StepArrow />
							<Step $active={step === 3}>
								<StepTitle>Review & Create</StepTitle>
								<StepNumber $active={step === 3}>3</StepNumber>
							</Step>
						</StepIndicator>
						<Divider />
						<FormSection>
							{step === 1 && <Step1 />}
							{step === 2 && <Step2 />}
							{step === 3 && <Step3 />}
						</FormSection>
					</CreateFormBox>
					<ButtonGroup>
						<Button onClick={handleBack}>Back</Button>
						{step < 3 && (
							<Button $primary onClick={handleNext}>
								Next
							</Button>
						)}
						{step === 3 && (
							<Button $primary onClick={handleCreateOffer}>
								Create Offer
							</Button>
						)}
					</ButtonGroup>
				</ContentContainer>
			</CreateOfferContainer>
		);

	// Step 4 - Success page
	if (step === 4 && offerInfo.transactionResult)
		return (
			<CreateOfferContainer>
				<TitleBox>
					<BackToHomeButton onClick={handleGoToHome} />
					<h2>Create Offer in OTC Market</h2>
				</TitleBox>
				<ContentContainer>
					<OfferCard
						offerNumber={offerInfo.offerNumber || 0}
						tokenName={offerInfo.offerToken.name}
						offerAccountAddress={wallet.account?.address || ""}
						tokenAmount={offerInfo.offerToken.amount}
						suiAmount={offerInfo.suiToken.amount}
						offerType={offerInfo.offerType}
						network={offerInfo.network}
					/>
					<span>Your offer has been created successfully.</span>
					<span>
						Transaction link:
						<StyledLink
							href={`https://suiscan.xyz/devnet/tx/${offerInfo.transactionResult.digest || ""}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							View on Explorer
						</StyledLink>
					</span>
					<Button $primary onClick={handleGoToHome}>
						Okay
					</Button>
				</ContentContainer>
			</CreateOfferContainer>
		);
};

export default CreateOffer;
