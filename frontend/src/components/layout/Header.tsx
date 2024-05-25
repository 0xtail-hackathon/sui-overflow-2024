// src/components/layout/Header.tsx
import React, { useEffect } from "react";
import styled from "styled-components";
import { ConnectButton, useWallet } from "@suiet/wallet-kit";
import '@suiet/wallet-kit/style.css';

const HeaderContainer = styled.header`
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;
`;

const SearchBar = styled.input`
    width: 300px;
    padding: 10px;
    margin: 0 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
`;

const NetworkButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    cursor: pointer;
`;

const CustomConnectButton = styled(ConnectButton)`
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    cursor: pointer;
`;

const Header: React.FC = () => {
    const wallet = useWallet();

    useEffect(() => {
        if (!wallet.connected) return;
        console.log("connected wallet name: ", wallet.name);
        console.log("account address: ", wallet.account?.address);
        console.log("account publicKey: ", wallet.account?.publicKey);
    }, [wallet.connected]);

    return (
        <HeaderContainer>
            <Logo>Cocktail.Fi</Logo>
            <SearchBar placeholder="Search for anything..." />
            <ButtonGroup>
                <NetworkButton>SUI Network</NetworkButton>
                <CustomConnectButton />
            </ButtonGroup>
        </HeaderContainer>
    );
};

export default Header;
