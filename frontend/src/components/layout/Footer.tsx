// src/components/layout/Footer.tsx
import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
    background-color: ${({ theme }) => theme.colors.secondary};
    padding: 1rem;
    color: white;
    text-align: center;
    font-family: ${({ theme }) => theme.fonts.primary};
`;

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <p>Footer</p>
        </FooterContainer>
    );
};

export default Footer;
