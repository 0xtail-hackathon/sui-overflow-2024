// src/components/common/Card.tsx
import React from "react";
import styled from "styled-components";
import CetusLogo from "@assets/images/logo-cetus.svg?react";
import ScallopLogo from "@assets/images/logo-scallop.svg?react";
import OverflowLogo from "@assets/images/logo-overflow.svg?react";
import SwapIcon from "@assets/images/icon-swap.svg?react";
import { commaInNumbers, elipsize, shortenAddress } from "@/utils/helpers";
import { useNavigate } from "react-router-dom";
import { useOfferDetailStore } from "@stores/useOfferDetailStore";

const CardContainer = styled.div<{ width?: string; height?: string }>`
	background-color: #ffffff;
	border-radius: 8px;
	box-shadow: ${({ theme }) => theme.shadows.style1};
	min-width: ${({ width }) => width || "300px"}; // 수정
	max-width: ${({ width }) => width || "400px"}; // 수정
	height: ${({ height }) => height || "220px"}; // 수정
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
	width: 70px;
	height: 70px;
	border-radius: 50%;

	svg {
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
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

const OfferCard: React.FC<CardProps> = ({
	logo,
	offerNumber,
	tokenName,
	offerAccountAddress,
	tokenAmount,
	suiAmount,
	offerType, // 추가
	network, // 추가
	width, // 추가
	height, // 추가
}) => {
	const navigate = useNavigate();
	const setOfferDetail = useOfferDetailStore((state) => state.setOfferDetail);

	const handleDetail = () => {
		setOfferDetail({
			network,
			offerNumber,
			offerType,
			offerToken: {
				name: tokenName,
				amount: tokenAmount,
			},
			suiToken: {
				name: "SUI",
				amount: suiAmount,
			},
			description: "", // 필요에 따라 설명 추가
		});
		navigate(`/offer/${offerNumber}`);
	};

	return (
		<CardContainer width={width} height={height}>
			<CardHeader>
				<CardLogoBox>
					{logo ? (
						<TokenLogoImage>{logo}</TokenLogoImage>
					) : (
						<>
							{tokenName === "Overflow" && (
								<TokenLogoImage>
									<OverflowLogo />
								</TokenLogoImage>
							)}
							{tokenName === "Scallop" && (
								<TokenLogoImage>
									<ScallopLogo />
								</TokenLogoImage>
							)}
							{tokenName === "Cetus" && (
								<TokenLogoImage>
									<CetusLogo />
								</TokenLogoImage>
							)}
						</>
					)}
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
					<h3>{offerType === "selling" ? `${shortenAddress(offerAccountAddress)}` : "Taker"}</h3>
					<h1>
						{elipsize(tokenAmount)} {tokenName}
					</h1>
				</CardText>
				<SwapIconImage />
				<CardText>
					<h3>{offerType === "selling" ? "Taker" : `${shortenAddress(offerAccountAddress)}`}</h3>
					<h1>{elipsize(suiAmount)} SUI</h1>
				</CardText>
			</CardContent>
		</CardContainer>
	);
};

export default OfferCard;
