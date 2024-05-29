// src/pages/Analytics.tsx
import React from "react";
import styled from "styled-components";

const AnalyticsContainer = styled.div`
	padding: 20px;
	background-color: #f0f4f8;
`;

const Analytics: React.FC = () => {
	return (
		<AnalyticsContainer>
			<h2>Analytics</h2>
			{/* Analytics content here */}
		</AnalyticsContainer>
	);
};

export default Analytics;
