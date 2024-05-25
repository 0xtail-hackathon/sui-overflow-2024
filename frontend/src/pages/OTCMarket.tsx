// src/components/pages/OTCMarket.tsx
import React from "react";
import styled from "styled-components";

const OTCMarketContainer = styled.div`
    padding: 20px;
    background-color: #f0f4f8;
`;

const OTCMarket: React.FC = () => {
    return (
        <OTCMarketContainer>
            <h2>OTC Market</h2>
            {/* OTC Market content here */}
        </OTCMarketContainer>
    );
};

export default OTCMarket;
