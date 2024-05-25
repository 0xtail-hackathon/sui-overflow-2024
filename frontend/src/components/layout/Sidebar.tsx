// src/components/layout/Sidebar.tsx
import React from "react";
import styled from "styled-components";
import useMenuStore from "@stores/useMenuStore";

const SidebarContainer = styled.aside`
    background-color: ${({ theme }) => theme.colors.secondary};
    width: 250px;
    padding: 1rem;
    color: white;
`;

const Sidebar: React.FC = () => {
    const setSelectedMenu = useMenuStore((state) => state.setSelectedMenu);

    return (
        <SidebarContainer>
            <nav>
                <ul>
                    <li onClick={() => setSelectedMenu("home")}>Home</li>
                    <li onClick={() => setSelectedMenu("about")}>About</li>
                    <li onClick={() => setSelectedMenu("contact")}>Contact</li>
                </ul>
            </nav>
        </SidebarContainer>
    );
};

export default Sidebar;
