// src/components/pages/Home.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LogoCocktailFinance from "@assets/images/logo-cocktail.svg?react";
import OfferCard from "@components/common/OfferCard";
import { todayYYYYMMDD } from "@/utils/helpers";
import { useNavigate } from "react-router-dom";

const HomeContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	width: 100%;
`;

const HeaderSection = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: 3fr 2fr;
	justify-content: center;
	align-items: center;
	gap: 20px;
	border-radius: 8px;
	padding-top: 24px;
`;

const LogoContainer = styled.div`
	position: relative;
	width: 100%;
	height: 160px;
	display: grid;
	grid-template-columns: 1fr 2fr;
	align-items: center;
	justify-content: space-between;
	background: linear-gradient(90deg, #00b3ff 0%, #1f93ff 100%);
	padding: 20px;
	border-radius: 8px;
`;

const LogoImage = styled(LogoCocktailFinance)`
	position: relative;
	width: 180px;
	height: auto;
	top: -28px;
`;

const HeaderText = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;

	justify-content: space-evenly;
	color: #ffffff;
	h1 {
		font-size: 1.5rem;
		// 줄 간격 조정
		line-height: 1.5;
	}

	span {
		font-size: 0.8rem;
	}
`;

const OfferButtonContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 160px;
	border: 2px ${({ theme }) => theme.colors.primary} dashed;
	border-radius: 8px;
	padding: 20px;
	gap: 20px;
`;

const OfferText = styled.span`
	font-size: 1rem;
	text-align: center;
	color: ${({ theme }) => theme.colors.primary};
`;

const OfferButton = styled.button`
	background: linear-gradient(90deg, #00b3ff 0%, #1f93ff 100%);
	color: ${({ theme }) => theme.colors.white};
	padding: 10px 20px;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	font-size: 1rem;

	&:hover {
		background: linear-gradient(90deg, #1f93ff 0%, #00b3ff 100%);
	}
`;

const OffersSection = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); // 개수 최대 4개
	gap: 20px;
`;

const Home: React.FC = () => {
	const [today, setToday] = useState("YYYY.MM.DD");
	const navigate = useNavigate();
	const offerCards: CardProps[] = [
		{
			tokenName: "Cetus",
			tokenAmount: "100.0",
			suiAmount: "32.3",
			offerNumber: 3229,
			offerAccountAddress: "0x1234567890abcdef1234567890abcdef12345678",
			network: "SUI",
			offerType: "selling",
		},
		{
			tokenName: "Scallop",
			tokenAmount: "300.0",
			suiAmount: "100.0",
			offerNumber: 3230,
			offerAccountAddress: "0x1234567890abcdef1234567890abcdef12345678",
			network: "SUI",
			offerType: "buying",
		},
		{
			tokenName: "Cetus",
			tokenAmount: "100.0",
			suiAmount: "35.0",
			offerNumber: 3231,
			offerAccountAddress: "0x1234567890abcdef1234567890abcdef12345678",
			network: "SUI",
			offerType: "buying",
		},
		{
			tokenName: "Scallop",
			tokenAmount: "400.0",
			suiAmount: "150.0",
			offerNumber: 3232,
			offerAccountAddress: "0x1234567890abcdef1234567890abcdef12345678",
			network: "SUI",
			offerType: "selling",
		},
	];

	const handleCreateOfferClick = () => {
		navigate("/offer/create");
	};

	useEffect(() => {
		setToday(todayYYYYMMDD());
	}, []);

	return (
		<HomeContainer>
			<HeaderSection>
				<LogoContainer>
					<LogoImage />
					<HeaderText>
						<span>{today}</span>
						<h1>
							Today's <br />
							Cocktail.Finance
						</h1>
					</HeaderText>
				</LogoContainer>
				<OfferButtonContainer>
					<OfferText>
						Do you want to create an offer?
						<br />
						Create a new offer!
					</OfferText>
					<OfferButton onClick={handleCreateOfferClick}>+ Create an offer</OfferButton>
				</OfferButtonContainer>
			</HeaderSection>
			<OffersSection>
				{offerCards.map((offerCard) => (
					<OfferCard
						key={offerCard.offerNumber}
						offerNumber={offerCard.offerNumber}
						offerAccountAddress={offerCard.offerAccountAddress}
						tokenName={offerCard.tokenName}
						tokenAmount={offerCard.tokenAmount}
						suiAmount={offerCard.suiAmount}
						network={offerCard.network}
						offerType={offerCard.offerType}
					/>
				))}
				{/* Add more Card components as needed */}
			</OffersSection>
		</HomeContainer>
	);
};

export default Home;
