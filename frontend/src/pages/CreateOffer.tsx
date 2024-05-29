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
import { commaInNumbers } from "@/utils/helpers";

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
	const navigate = useNavigate();
	const offerInfo = useCreateOfferStore();
	const wallet = useWallet();

	useEffect(() => {
		if (!wallet.connected) {
			navigate("/"); // 연결되지 않은 경우 홈 페이지로 리디렉션
		}
	}, [wallet.connected, navigate]);

	// 초기 설정
	useEffect(() => {
		offerInfo.setNetwork("SUI");
		offerInfo.setOfferType("selling");
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

	const handleSubmit = () => {
		// TODO: Submit the form
		offerInfo.setOfferNumber(123456); // 실제 offerNumber 생성 로직으로 대체 필요
		setStep(4);
	};

	const handleGoToHome = () => {
		navigate("/");
	};

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
							<Button $primary onClick={handleSubmit}>
								Create Offer
							</Button>
						)}
					</ButtonGroup>
				</ContentContainer>
			</CreateOfferContainer>
		);

	// Step 4 - Success page
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
				<span>Offer number is #{commaInNumbers(offerInfo.offerNumber || 0)}.</span>
				<span>
					Transaction link:{" "}
					<StyledLink
						href={`https://explorer.sui.io/tx/${offerInfo.offerNumber}`}
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
