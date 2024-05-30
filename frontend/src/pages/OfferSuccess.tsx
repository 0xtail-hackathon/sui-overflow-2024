// src/pages/OfferDetail.tsx
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "@assets/images/icon-arrow-left.svg?react";
import SuccessIcon from "@assets/images/icon-success.svg?react";
import StyledLink from "@/components/common/StyledLink";
import { useNewOfferStore } from "@/stores/useNewOfferStore";
import TransactionFailure from "@/components/common/TransactionFailure";

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
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 30px;
	width: 100%;
	height: 700px;
	padding: 40px;
`;

const TextBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
`;

const OkayButton = styled.button`
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

const OfferSuccess: React.FC = () => {
	const navigate = useNavigate();
	const newOfferInfo = useNewOfferStore();

	const handleGoHome = () => {
		navigate("/");
	};

	if (!newOfferInfo.transactionResult) {
		return <TransactionFailure />;
	}

	return (
		<OfferContainer>
			<TitleBox>
				<BackToHomeButton onClick={handleGoHome} />
				<h2>Offer Detail</h2>
			</TitleBox>
			<ContentContainer>
				<SuccessIcon />
				<TextBox>
					<h3>🎉Congratulations!🎉</h3>
					<h3>The offer has been successfully taken.</h3>
					<h3>Check your wallet for the transaction.</h3>
					<StyledLink
						href={`https://suiscan.xyz/devnet/tx/${newOfferInfo.transactionResult.digest || ""}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						View on Explorer
					</StyledLink>
				</TextBox>
				<OkayButton onClick={handleGoHome}>Okay</OkayButton>
			</ContentContainer>
		</OfferContainer>
	);
};

export default OfferSuccess;
