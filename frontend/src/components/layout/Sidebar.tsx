// src/components/layout/Sidebar.tsx
import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const SidebarContainer = styled.aside`
    width: 250px;
    background-color: #f7f9fc;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const Menu = styled.ul`
    list-style: none;
    padding: 0;
`;

const MenuItem = styled.li`
    margin: 20px 0;
    display: flex;
    align-items: center;
    cursor: pointer;

    a {
        text-decoration: none;
        color: inherit;
        display: flex;
        align-items: center;
        width: 100%;

        &.active {
            background-color: #e0e7ff;
            border-radius: 4px;
            padding: 10px;
        }
    }
`;

const MenuItemIcon = styled.span`
    margin-right: 10px;
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
                        <MenuItemIcon>🏠</MenuItemIcon>
                        Home
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink
                        to="/point-market"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        <MenuItemIcon>📈</MenuItemIcon>
                        Point Market
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink
                        to="/otc-market"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        <MenuItemIcon>💼</MenuItemIcon>
                        OTC Market
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink
                        to="/analytics"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        <MenuItemIcon>📊</MenuItemIcon>
                        Analytics
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink
                        to="/settings"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        <MenuItemIcon>⚙️</MenuItemIcon>
                        Settings
                    </NavLink>
                </MenuItem>
            </Menu>
        </SidebarContainer>
    );
};

export default Sidebar;
