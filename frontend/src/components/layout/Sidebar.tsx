// src/components/layout/Sidebar.tsx
import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

// SVG 파일을 컴포넌트로 임포트
import HomeIcon from "@assets/images/icon-home.svg?react";
import PointMarketIcon from "@assets/images/icon-point-market.svg?react";
import OTCMarketIcon from "@assets/images/icon-otc-market.svg?react";
import AnalyticsIcon from "@assets/images/icon-analysis.svg?react";
import SettingsIcon from "@assets/images/icon-settings.svg?react";

const SidebarContainer = styled.aside`
    width: 250px;
    background-color: ${({ theme }) => theme.colors.sidebar_bg};
    padding: 1.5rem;
    margin: 30px;
    border-radius: 10px;
    box-shadow: ${({ theme }) => theme.shadows.style1};
`;

const Menu = styled.ul`
    list-style: none;
    padding: 0;
`;

const MenuItem = styled.li`
    margin: 10px 0;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.gray};

    a {
        text-decoration: none;
        color: inherit;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 10px;

        &:hover {
            color: ${({ theme }) => theme.colors.primary};
            border-radius: 4px;
        }

        &.active {
            background-color: ${({ theme }) => theme.colors.secondary};
            color: ${({ theme }) => theme.colors.primary};
            border-radius: 4px;

            svg {
                fill: ${({ theme }) => theme.colors.primary};
            }
        }
    }
`;

const MenuSplitter = styled.hr`
    border: 0;
    border-top: 1px solid ${({ theme }) => theme.colors.gray};
    margin: 10px 0;
`;

const MenuItemIcon = styled.span`
    margin-right: 10px;

    svg {
        width: 24px;
        height: 24px;
        fill: currentColor; // SVG의 fill 속성을 현재 색상으로 설정
    }
`;

const MenuTag = styled.span`
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.primary};
    padding: 5px 10px;
    border-radius: 10px;
    font-size: 0.8rem;
    margin-left: auto;
`;

const Sidebar: React.FC = () => {
    return (
        <SidebarContainer>
            <Menu>
                <MenuItem>
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        <MenuItemIcon>
                            <HomeIcon />
                        </MenuItemIcon>
                        Home
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink
                        to="/point-market"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        <MenuItemIcon>
                            <PointMarketIcon />
                        </MenuItemIcon>
                        Point Market
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink
                        to="/otc-market"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        <MenuItemIcon>
                            <OTCMarketIcon />
                        </MenuItemIcon>
                        OTC Market
                        <MenuTag>3</MenuTag>
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink
                        to="/analytics"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        <MenuItemIcon>
                            <AnalyticsIcon />
                        </MenuItemIcon>
                        Analytics
                        <MenuTag>NEW</MenuTag>
                    </NavLink>
                </MenuItem>
                <MenuSplitter />
                <MenuItem>
                    <NavLink
                        to="/settings"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        <MenuItemIcon>
                            <SettingsIcon />
                        </MenuItemIcon>
                        Settings
                    </NavLink>
                </MenuItem>
            </Menu>
        </SidebarContainer>
    );
};

export default Sidebar;
