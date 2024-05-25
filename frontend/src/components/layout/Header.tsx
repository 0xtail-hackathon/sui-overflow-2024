// src/components/layout/Header.tsx
import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
    background-color: ${({ theme }) => theme.colors.primary};
    padding: 1rem;
    color: white;
    text-align: center;
`;

const Header: React.FC = () => {
    return (
        <HeaderContainer>
            <h1>Header</h1>
        </HeaderContainer>
    );
};

export default Header;
