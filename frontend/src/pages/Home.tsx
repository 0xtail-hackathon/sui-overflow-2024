// src/components/pages/Home.tsx
import React from "react";
import styled from "styled-components";

const HomeContainer = styled.div`
    padding: 20px;
    background-color: #f0f4f8;
`;

const Home: React.FC = () => {
    return (
        <HomeContainer>
            <h2>Home</h2>
            {/* Home content here */}
        </HomeContainer>
    );
};

export default Home;
