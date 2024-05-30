// src/components/TransactionFailure.tsx
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "@assets/images/icon-arrow-left.svg?react";

const FailureContainer = styled.div`
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

const Message = styled.div`
	font-size: 1.2rem;
	color: ${({ theme }) => theme.colors.emphasis};
	text-align: center;
`;

const Button = styled.button<{ $primary?: boolean }>`
	padding: 10px 20px;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	background: ${({ $primary, theme }) =>
		$primary ? "linear-gradient(90deg, #00b3ff 0%, #1f93ff 100%);" : theme.colors.gray};
	color: white;
	font-size: 1rem;
	min-width: 160px;

	&:hover {
		color: ${({ theme }) => theme.colors.black};
		background: ${({ $primary, theme }) =>
			$primary ? "linear-gradient(90deg, #1f93ff 0%, #00b3ff 100%);" : theme.colors.light_gray};
	}
`;

const TransactionFailure: React.FC = () => {
	const navigate = useNavigate();

	const handleGoToHome = () => {
		navigate("/");
	};

	return (
		<FailureContainer>
			<TitleBox>
				<BackToHomeButton onClick={handleGoToHome} />
				<h2>Transaction Failed</h2>
			</TitleBox>
			<ContentContainer>
				<Message>Sorry, the transaction failed. Please try again later.</Message>
				<Button $primary onClick={handleGoToHome}>
					Back to Home
				</Button>
			</ContentContainer>
		</FailureContainer>
	);
};

export default TransactionFailure;
