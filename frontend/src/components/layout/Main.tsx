// src/components/layout/Main.tsx
import React from "react";
import styled from "styled-components";
import useMenuStore from "@stores/useMenuStore";

const MainContainer = styled.main`
    flex: 1;
    padding: 1rem;
`;

const HomeContent = () => <p>This is the home content.</p>;
const AboutContent = () => <p>This is the about content.</p>;
const ContactContent = () => <p>This is the contact content.</p>;

const Main: React.FC = () => {
    const selectedMenu = useMenuStore((state) => state.selectedMenu);

    const renderContent = () => {
        switch (selectedMenu) {
            case "home":
                return <HomeContent />;
            case "about":
                return <AboutContent />;
            case "contact":
                return <ContactContent />;
            default:
                return <HomeContent />;
        }
    };

    return (
        <MainContainer>
            <h2>Main Content</h2>
            {renderContent()}
        </MainContainer>
    );
};

export default Main;
