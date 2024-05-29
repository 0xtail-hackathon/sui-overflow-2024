// src/pages/OfferDetail.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "@assets/images/icon-arrow-left.svg?react";
import theme from "@/styles/theme";
import OfferCard from "@/components/common/OfferCard";
import CetusLogo from "@assets/images/logo-cetus.svg?react";
import ScallopLogo from "@assets/images/logo-scallop.svg?react";
import { useWallet } from "@suiet/wallet-kit";
import { commaInNumbers } from "@/utils/helpers";
import { useOfferDetailStore } from "@/stores/useOfferDetailStore";

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

const FormBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	background-color: white;
	padding: 40px;
	border-radius: 8px;
	box-shadow: ${({ theme }) => theme.shadows.style1};
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

const OfferDetail: React.FC = () => {
	const [step, setStep] = useState(1);
	const navigate = useNavigate();
	const offerInfo = useOfferDetailStore();
	const wallet = useWallet();

	const handleBack = () => {
		if (step > 1) setStep(step - 1);
		if (step === 1) navigate(-1);
	};

	const handleSubmit = () => {
		// TODO: Submit the form
		offerInfo.setOfferNumber(123456);
		setStep(4);
	};

	const handleGoToHome = () => {
		navigate("/");
	};

	useEffect(() => {
		console.log(`Offer Detail: ${JSON.stringify(offerInfo)}`);
		console.log(`Wallet: ${wallet.address}`);
	}, []);

	if (step < 4)
		return (
			<CreateOfferContainer>
				<TitleBox>
					<BackToHomeButton onClick={handleBack} />
					<h2>Offer Detail</h2>
				</TitleBox>
				<ContentContainer>
					<FormBox></FormBox>
					<ButtonGroup>
						<Button onClick={handleBack}>Back</Button>
						<Button $primary onClick={handleSubmit}>
							Take Offer
						</Button>
					</ButtonGroup>
				</ContentContainer>
				<ContentContainer>
					<FormBox></FormBox>
				</ContentContainer>
			</CreateOfferContainer>
		);
};

export default OfferDetail;
