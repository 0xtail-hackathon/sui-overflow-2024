import React from 'react';
import styled from "styled-components";

const PointMarketContainer = styled.div`
	padding: 20px;
	background-color: #f0f4f8;
`;

const PointMarket: React.FC = () => {
	return (
		<PointMarketContainer>
			<h2>Point Market</h2>
			{/* OTC Market content here */}
		</PointMarketContainer>
	);
};
export default PointMarket;
