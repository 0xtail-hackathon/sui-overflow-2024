// src/components/common/Card.tsx
import React from "react";
import styled from "styled-components";
import SuiLogo from "@assets/images/logo-sui.svg?react";
import SwapIcon from "@assets/images/icon-swap.svg?react";
import { commaInNumbers, elipsize, shortenAddress } from "@/utils/helpers";
import { useNavigate } from "react-router-dom";

const CardContainer = styled.div`
	background-color: #ffffff;
	border-radius: 8px;
	box-shadow: ${({ theme }) => theme.shadows.style1};
	width: 340px;
	height: 220px;
	display: flex;
	flex-direction: column;
	padding: 20px;
`;

const CardHeader = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	align-items: center;
	justify-items: center;
	margin-bottom: 10px;
	height: 80px;
`;

const CardLogoBox = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	gap: 10px;
`;

const TokenLogoImage = styled.div`
	position: relative;
	width: 90px;
	height: 90px;
	border-radius: 50%;

	svg {
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
`;

const SuiLogoImage = styled(SuiLogo)`
	position: absolute;
	left: 8px;
	bottom: 8px;
	width: 24px;
	height: 24px;
`;

const CardHeaderTextBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;

	h2 {
		font-size: 1rem;
		color: ${({ theme }) => theme.colors.gray};
	}

	h1 {
		font-size: 1.2rem;
		color: #333;
	}
`;

const CardDetailButton = styled.button`
	background: linear-gradient(90deg, #00b3ff 0%, #1f93ff 100%);
	height: 40px;
	width: 80px;
	color: #ffffff;
	padding: 5px 10px;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	font-size: 0.9rem;

	&:hover {
		background: linear-gradient(90deg, #1f93ff 0%, #00b3ff 100%);
	}
`;

const Divider = styled.hr`
	border: none;
	border-top: 2px solid ${({ theme }) => theme.colors.light_gray};
	margin: 10px 0;
`;

const CardContent = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	justify-items: center;
	align-items: center;
	height: 60px;
`;

const CardText = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;

	h3 {
		font-size: 0.8rem;
		color: ${({ theme }) => theme.colors.gray};
	}

	h1 {
		font-size: 1rem;
		color: #333;
	}
`;

const SwapIconImage = styled(SwapIcon)`
	width: 36px;
	height: 36px;
`;

interface CardProps {
	logo: React.ReactNode;
	offerNumber: number;
	tokenName: string;
	offerAccountAddress: string;
	tokenAmount: string;
	suiAmount: string;
}

const OfferCard: React.FC<CardProps> = ({
	logo,
	offerNumber,
	tokenName,
	offerAccountAddress,
	tokenAmount,
	suiAmount,
}) => {
	const navigate = useNavigate();

	const handleDetail = () => {
		navigate(`/offer/${offerNumber}`);
	};

	return (
		<CardContainer>
			<CardHeader>
				<CardLogoBox>
					<TokenLogoImage>{logo}</TokenLogoImage>
					<SuiLogoImage />
				</CardLogoBox>
				<CardHeaderTextBox>
					<h2># {commaInNumbers(offerNumber)}</h2>
					<h1>{tokenName}</h1>
				</CardHeaderTextBox>
				<CardDetailButton onClick={handleDetail}>Detail</CardDetailButton>
			</CardHeader>
			<Divider />
			<CardContent>
				<CardText>
					<h3>{shortenAddress(offerAccountAddress)}</h3>
					<h1>
						{elipsize(tokenAmount)} {tokenName}
					</h1>
				</CardText>
				<SwapIconImage />
				<CardText>
					<h3>You</h3>
					<h1>{elipsize(suiAmount)} SUI</h1>
				</CardText>
			</CardContent>
		</CardContainer>
	);
};

export default OfferCard;
