// src/components/layout/Footer.tsx
import React from "react";
import styled from "styled-components";
import TwitterIcon from "@assets/images/icon-twitter.svg?react";
import DiscordIcon from "@assets/images/icon-discord.svg?react";
import MediumIcon from "@assets/images/icon-medium.svg?react";

const FooterContainer = styled.footer`
    background-color: ${({ theme }) => theme.colors.primary};
    padding: 30px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: ${({ theme }) => theme.fonts.primary};
    flex-wrap: wrap;
`;

const FooterTop = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 6fr;
    justify-content: center;
    align-items: start;
    gap: 100px;
`;

const ProjectTitleBox = styled.div`
    display: flex;
    align-items: center;
    min-width: 160px;
`;

const CategoryBox = styled.div`
    display: flex;
    gap: 20px;
`;

const CategorySection = styled.div`
    flex: 1;
    min-width: 120px;

    & h4 {
        margin-bottom: 20px;
    }

    & ul {
        list-style: none;
        padding: 0;
    }

    & li {
        margin-bottom: 16px;
        font-size: 0.9rem;
    }

    & a {
        color: ${({ theme }) => theme.colors.white};
        opacity: 0.8;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
`;

const IconsBox = styled.div`
    display: flex;
    align-items: flex-end;
    justify-items: center;
    justify-content: flex-end;
    margin-bottom: 20px;
    gap: 20px;

    & a {
        color: ${({ theme }) => theme.colors.white};
        text-decoration: none;
        &:hover {
            opacity: 0.8;
            text-decoration: underline;
        }
    }
`;

const FooterBottom = styled.div`
    width: 100%;
    text-align: center;
    margin-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding-top: 10px;
    font-size: 0.9rem;
`;

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <FooterTop>
                <ProjectTitleBox>
                    <a href="#">
                        <h2>Cocktail.Finance</h2>
                    </a>
                </ProjectTitleBox>
                <CategoryBox>
                    <CategorySection>
                        <h4>Products</h4>
                        <ul>
                            <li>
                                <a href="#">Bonds</a>
                            </li>
                        </ul>
                    </CategorySection>
                    <CategorySection>
                        <h4>Learn</h4>
                        <ul>
                            <li>
                                <a href="#">Documentation</a>
                            </li>
                            <li>
                                <a href="#">Medium</a>
                            </li>
                        </ul>
                    </CategorySection>
                    <CategorySection>
                        <h4>Contact us</h4>
                        <ul>
                            <li>
                                <a href="#">Join Discord</a>
                            </li>
                        </ul>
                    </CategorySection>
                </CategoryBox>
                <IconsBox>
                    <a href="#">
                        <TwitterIcon />
                    </a>
                    <a href="#">
                        <DiscordIcon />
                    </a>
                    <a href="#">
                        <MediumIcon />
                    </a>
                </IconsBox>
            </FooterTop>
            <FooterBottom>
                © {new Date().getFullYear()} Cocktail.Finance. All rights
                reserved.
            </FooterBottom>
        </FooterContainer>
    );
};

export default Footer;
