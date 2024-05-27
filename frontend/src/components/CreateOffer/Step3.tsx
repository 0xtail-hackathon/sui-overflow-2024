// src/components/CreateOffer/Step3.tsx
import React from "react";
import styled from "styled-components";
import { useOfferStore } from "@stores/useOfferStore";
import ScallopLogo from "@assets/images/logo-scallop.svg?react";
import SuiLogo from "@assets/images/logo-sui.svg?react";
import CetusLogo from "@assets/images/logo-cetus.svg?react";
import { commaInNumbers } from "@/utils/helpers";

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

const OfferDetailsBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 20px;
	background-color: ${({ theme }) => theme.colors.white};
	border-radius: 8px;
	border: 1px solid ${({ theme }) => theme.colors.light_gray};
`;

const OfferDetail = styled.div`
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

const Step3: React.FC = () => {
	const { offerType, offerToken, suiToken, description } = useOfferStore();

	return (
		<ReviewContainer>
			<TokenDetails>
				<div className="token-logo">
					<ScallopLogo className="offer-token-logo" />
					<SuiLogo className="sui-logo" />
				</div>
				<div>
					<span>#{commaInNumbers(1000)}</span>
					<h4>{offerToken.name}</h4>
				</div>
			</TokenDetails>
			{description && <Description>{description}</Description>}
			<OfferDetailsBox>
				<OfferDetail>
					<span className="label">Offer Type:</span>
					<span className="value offer-type">
						{offerType.charAt(0).toUpperCase() + offerType.slice(1)}
						<div></div>
					</span>
				</OfferDetail>
				<OfferDetail>
					<span className="label">Want to {offerType}:</span>
					<span className="value">
						{offerToken.amount} {offerToken.name}
						{offerToken.name === "Scallop" && <ScallopLogo />}
						{offerToken.name === "Cetus" && <CetusLogo />}
					</span>
				</OfferDetail>
				<OfferDetail>
					<span className="label">Total Dividend Received:</span>
					<span className="value">
						{suiToken.amount} {suiToken.name} <SuiLogoImage />
					</span>
				</OfferDetail>
				<OfferDetail>
					<span className="label">Listing Fee (0.1%):</span>
					<span className="value">
						{Number(suiToken.amount) * 0.001} {suiToken.name} <SuiLogoImage />
					</span>
				</OfferDetail>
			</OfferDetailsBox>
		</ReviewContainer>
	);
};

export default Step3;
