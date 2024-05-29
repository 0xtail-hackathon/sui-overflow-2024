// src/pages/Settings.tsx
import React from "react";
import styled from "styled-components";

const SettingsContainer = styled.div`
	padding: 20px;
	background-color: #f0f4f8;
`;

const Settings: React.FC = () => {
	return (
		<SettingsContainer>
			<h2>Settings</h2>
			{/* Settings content here */}
		</SettingsContainer>
	);
};

export default Settings;
