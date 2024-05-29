// src/pages/OfferDetail.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "@assets/images/icon-arrow-left.svg?react";
import theme from "@/styles/theme";
import { useWallet } from "@suiet/wallet-kit";
import { useOfferDetailStore } from "@/stores/useOfferDetailStore";
import ScallopLogo from "@assets/images/logo-scallop.svg?react";
import SuiLogo from "@assets/images/logo-sui.svg?react";
import CetusLogo from "@assets/images/logo-cetus.svg?react";
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
	padding: 40px;
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
	padding: 20px;
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
	align-items: center;
	gap: 10px;
`;

const TokenBox = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;

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
									<label>You will be get</label>
									<TokenField>
										<input type="text" value={offerInfo.offerToken.amount} readOnly />
										<span>{offerInfo.offerToken.name}</span>
									</TokenField>
								</TokenBox>
								<TokenBox>
									<label>Cost you will pay</label>
									<TokenField>
										<input type="text" value={offerInfo.suiToken.amount} readOnly />
										<SuiLogoImage />
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
			</CreateOfferContainer>
		);
};

export default OfferDetail;
