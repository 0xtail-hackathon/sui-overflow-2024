// src/components/CreateOffer/Step1.tsx
import React from "react";
import styled from "styled-components";
import SuiLogo from "@assets/images/logo-sui.svg?react";
import ArrowDownICon from "@assets/images/icon-arrow-down.svg?react";
import { useOfferStore } from "@stores/useOfferStore";

const FormField = styled.div`
	margin-bottom: 20px;

	label {
		display: block;
		font-size: 1rem;
		font-weight: 600;
		color: ${({ theme }) => theme.colors.gray};
		margin-bottom: 10px;
	}
`;

const Dropdown = styled.div`
	position: relative;
	display: inline-block;
	width: 100%;
`;

const NetworkOption = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	gap: 10px;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 8px;

	&:hover {
		border: 1px solid ${({ theme }) => theme.colors.primary};
	}

	${Dropdown}:hover & {
		border: 1px solid ${({ theme }) => theme.colors.primary};
	}

	> svg {
		width: 24px;
		height: 24px;
	}
`;

const ArrowDown = styled(ArrowDownICon)`
	position: absolute;
	right: 16px;
	width: 16px;
	height: 16px;
	fill: ${({ theme }) => theme.colors.gray};

	${Dropdown}:hover & {
		fill: ${({ theme }) => theme.colors.primary};
		transform: rotate(180deg);
		transition: all 0.3s;
	}

	${NetworkOption}:hover & {
		fill: ${({ theme }) => theme.colors.primary};
		transform: rotate(180deg);
		transition: all 0.3s;
	}
`;

const DropdownContent = styled.div`
	display: none;
	position: absolute;
	background-color: ${({ theme }) => theme.colors.white};
	box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
	z-index: 1;
	width: 100%;
	border-radius: 8px;

	${Dropdown}:hover & {
		display: block;
	}

	div {
		color: ${({ theme }) => theme.colors.black};
		padding: 10px;
		text-decoration: none;
		display: flex;
		align-items: center;
		gap: 10px;
		justify-items: center;

		&:hover {
			background-color: ${({ theme }) => theme.colors.primary};
			color: ${({ theme }) => theme.colors.white};
			border-radius: 8px;
		}

		svg {
			width: 24px;
			height: 24px;
		}
	}
`;

const RadioButtonGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const RadioButton = styled.label<{ selected: boolean }>`
	display: flex !important;
	align-items: center;
	gap: 10px;
	padding: 10px;
	background-color: ${({ theme, selected }) => (selected ? theme.colors.secondary : "transparent")};
	border-radius: 8px;
	cursor: pointer;

	input {
		display: none;
	}

	div {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		border-radius: 8px;
		border: 1px solid ${({ theme, selected }) => (selected ? theme.colors.secondary : theme.colors.light_gray)};
		background-color: ${({ theme, selected }) => (selected ? theme.colors.secondary : theme.colors.white)};

		&:after {
			content: "";
			width: 10px;
			height: 10px;
			background-color: ${({ theme, selected }) => (selected ? theme.colors.primary : "transparent")};
			border-radius: 50%;
		}
	}

	span {
		display: flex;
		flex-direction: column;
	}

	strong {
		font-size: 1rem;
		color: ${({ theme, selected }) => (selected ? theme.colors.black : theme.colors.gray)};
	}

	p {
		font-size: 0.8rem;
		color: ${({ theme, selected }) => (selected ? theme.colors.black : theme.colors.gray)};
		opacity: 0.5;
	}
`;

const Step1: React.FC = () => {
	const { network, offerType, setNetwork, setOfferType } = useOfferStore();

	return (
		<>
			<FormField>
				<label>Network</label>
				<Dropdown>
					<NetworkOption>
						<SuiLogo /> {network} Network <ArrowDown />
					</NetworkOption>
					<DropdownContent>
						<div onClick={() => setNetwork("SUI")}>
							<SuiLogo /> SUI Network
						</div>
						<div onClick={() => setNetwork("Other")}>
							<SuiLogo /> Other Network
						</div>
					</DropdownContent>
				</Dropdown>
			</FormField>
			<FormField>
				<label>Offer Type</label>
				<RadioButtonGroup>
					<RadioButton selected={offerType === "selling"}>
						<input
							type="radio"
							name="type"
							value="selling"
							checked={offerType === "selling"}
							onChange={() => setOfferType("selling")}
						/>
						<div />
						<span>
							<strong>Selling</strong>
							<p>You want to sell your tokens</p>
						</span>
					</RadioButton>
					<RadioButton selected={offerType === "buying"}>
						<input
							type="radio"
							name="type"
							value="buying"
							checked={offerType === "buying"}
							onChange={() => setOfferType("buying")}
						/>
						<div />
						<span>
							<strong>Buying</strong>
							<p>You want to buy tokens</p>
						</span>
					</RadioButton>
				</RadioButtonGroup>
			</FormField>
		</>
	);
};

export default Step1;
