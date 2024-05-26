import React, { useEffect } from "react";
import styled from "styled-components";
import { ConnectButton, useWallet } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import GlobalStyle from "@styles/globalStyles"; // 글로벌 스타일 임포트
import CocktailSimpleLogo from "@assets/images/logo-cocktail-simple.svg?react";
import SearchIcon from "@assets/images/icon-search.svg?react";
import NotificationIcon from "@assets/images/icon-notification.svg?react";
import SuiLogo from "@assets/images/logo-sui.svg?react";
import WalletIcon from "@assets/images/icon-wallet.svg?react";

const HeaderContainer = styled.header`
    background-color: ${({ theme }) => theme.colors.header_bg};
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1px 4fr 2fr;
    gap: 30px;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    box-shadow: ${({ theme }) => theme.shadows.style1};
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    font-weight: bold;
    gap: 10px;

    > svg {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
`;

const VerticalSplitter = styled.hr`
    border: 0;
    border-left: 1px solid ${({ theme }) => theme.colors.splitter};
    height: 40px;
`;

const SearchBarBox = styled.div`
    width: 360px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.search_bar_bg};
    border-radius: 8px;

    > svg {
        height: 100%;
        background-color: transparent;
        margin: 0 10px;
    }
`;

const SearchBar = styled.input`
    width: 300px;
    height: 100%;
    border: none;
    background-color: transparent;

    &:focus {
        outline: none;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    height: 40px;
    gap: 10px;
    align-items: center;

    > svg {
        width: 24px;
        fill: ${({ theme }) => theme.colors.gray};
    }
`;

const NotificationButton = styled.button`
    border: none;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    height: 40px;
    width: 40px;
    border-radius: 50%;

    &:hover {
        background-color: ${({ theme }) => theme.colors.secondary};
    }

    > svg {
        width: 24px;
        fill: ${({ theme }) => theme.colors.gray};
    }
`;

const NetworkButton = styled.button`
    border: none;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.black};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    padding: 0 10px;
    gap: 10px;

    &:hover {
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.white};
    }

    > svg {
        height: 30px;
    }
`;

const NetworkStatus = styled.span`
    display: flex;
    align-items: center;
    font-size: 1rem;
    white-space: nowrap;
`;

const CustomConnectButton = styled(ConnectButton)``;

const Header: React.FC = () => {
    const wallet = useWallet();

    useEffect(() => {
        if (!wallet.connected) return;
        console.log("connected wallet name: ", wallet.name);
        console.log("account address: ", wallet.account?.address);
        console.log("account publicKey: ", wallet.account?.publicKey);
        console.log("connected network: ", wallet.chain?.name);
    }, [
        wallet.account?.address,
        wallet.account?.publicKey,
        wallet.chain?.name,
        wallet.connected,
        wallet.name,
    ]);

    return (
        <HeaderContainer>
            <GlobalStyle /> {/* 글로벌 스타일 적용 */}
            <Logo>
                <CocktailSimpleLogo />
                Cocktail.OTC
            </Logo>
            <VerticalSplitter />
            <SearchBarBox>
                <SearchIcon />
                <SearchBar placeholder="Search for anything..." />
            </SearchBarBox>
            <ButtonGroup>
                <NotificationButton>
                    <NotificationIcon />
                </NotificationButton>
                <NetworkButton>
                    <SuiLogo />
                    <NetworkStatus>
                        {wallet.connected ? wallet.chain?.name : "SUI Network"}
                    </NetworkStatus>
                </NetworkButton>
                <CustomConnectButton>
                    <WalletIcon /> Connect Wallet
                </CustomConnectButton>
            </ButtonGroup>
        </HeaderContainer>
    );
};

export default Header;
