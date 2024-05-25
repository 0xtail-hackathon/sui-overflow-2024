// src/components/layout/Header.tsx
import React from "react";
import styled from "styled-components";

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

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    cursor: pointer;
`;

const Header: React.FC = () => {
    return (
        <HeaderContainer>
            <Logo>Cocktail.Fi</Logo>
            <SearchBar placeholder="Search for anything..." />
            <ButtonGroup>
                <Button>SUI Network</Button>
                <Button>Connect wallet</Button>
            </ButtonGroup>
        </HeaderContainer>
    );
};

export default Header;
