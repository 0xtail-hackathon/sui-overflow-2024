// src/components/pages/Home.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LogoCocktailFinance from "@assets/images/logo-cocktail.svg?react";
import ScallopLogo from "@assets/images/logo-scallop.svg?react";
import CetusLogo from "@assets/images/logo-cetus.svg?react";
import OfferCard from "@components/common/OfferCard";
import { todayYYYYMMDD } from "@/utils/helpers";
import { useNavigate } from "react-router-dom";

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const HeaderSection = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: 3fr 2fr;
    justify-content: center;
    align-items: center;
    gap: 20px;
    border-radius: 8px;
    height: 220px;
    box-shadow: ${({ theme }) => theme.shadows.style1};
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
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;

const Home: React.FC = () => {
    const [today, setToday] = useState("YYYY.MM.DD");
    const navigate = useNavigate();

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
                    <OfferButton onClick={handleCreateOfferClick}>
                        + Create an offer
                    </OfferButton>
                </OfferButtonContainer>
            </HeaderSection>
            <OffersSection>
                <OfferCard
                    logo={<ScallopLogo />}
                    offerNumber={3231}
                    offerAccountAddress="0x1234567890abcdef1234567890abcdef12345678"
                    tokenName="Scallop"
                    tokenAmount="100.0"
                    suiAmount="32.3"
                />
                <OfferCard
                    logo={<CetusLogo />}
                    offerNumber={3230}
                    offerAccountAddress="0x1234567890abcdef1234567890abcdef12345678"
                    tokenName="Cetus"
                    tokenAmount="100.01234123"
                    suiAmount="32.3"
                />
                <OfferCard
                    logo={<CetusLogo />}
                    offerNumber={3229}
                    offerAccountAddress="0x1234567890abcdef1234567890abcdef12345678"
                    tokenName="Cetus"
                    tokenAmount="100.0"
                    suiAmount="32.3"
                />
                {/* Add more Card components as needed */}
            </OffersSection>
        </HomeContainer>
    );
};

export default Home;
