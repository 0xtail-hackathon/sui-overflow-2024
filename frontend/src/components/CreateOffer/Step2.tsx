// src/components/CreateOffer/Step2.tsx
import React from "react";
import styled from "styled-components";
import SuiLogo from "@assets/images/logo-sui.svg?react";
import ScallopLogo from "@assets/images/logo-scallop.svg?react";
import CetusLogo from "@assets/images/logo-cetus.svg?react";
import ArrowDownICon from "@assets/images/icon-arrow-down.svg?react";
import { useOfferStore } from "@stores/useOfferStore";
import { capitalizeFirstLetter } from "@/utils/helpers";

const FormField = styled.div`
	margin-bottom: 20px;

	label {
		display: block;
		font-size: 1rem;
		font-weight: 600;
		color: ${({ theme }) => theme.colors.gray};
		margin-bottom: 10px;

		strong {
			color: ${({ theme }) => theme.colors.primary};
		}
	}

	input,
	textarea {
		width: 100%;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	textarea {
		resize: none;
		height: 100px;
	}
`;

const TokenField = styled.div`
	display: flex;
	align-items: center;
	border: 1px solid #ccc;
	border-radius: 8px;
	padding: 8px;

	input {
		flex: 1;
		margin-right: 10px;
		font-size: 1rem;
		border: none;
		padding: 0 10px;

		&:focus {
			outline: none;
		}
	}
`;

const Dropdown = styled.div`
	position: relative;
	display: inline-block;
	width: 160px;
	height: 100%;
`;

const TokenOption = styled.div`
	width: 160px;
	display: flex;
	align-items: center;
	cursor: ${({ className }) => (className === "sui-token" ? "not-allowed" : "pointer")};
	gap: 10px;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 8px;
	background-color: ${({ theme }) => theme.colors.white};

	> svg {
		width: 30px;
		height: 30px;
	}

	&:hover {
		border: 1px solid ${({ theme, className }) => (className === "sui-token" ? "#ccc" : theme.colors.primary)};
	}

	${Dropdown}:hover & {
		border: 1px solid ${({ theme }) => theme.colors.primary};
	}
`;

const ArrowDown = styled(ArrowDownICon)`
	position: absolute;
	right: 16px;
	width: 16px !important;
	height: 16px !important;
	fill: ${({ theme }) => theme.colors.gray};

	${Dropdown}:hover & {
		fill: ${({ theme }) => theme.colors.primary};
		transform: rotate(180deg);
		transition: all 0.3s;
	}

	${TokenOption}:hover & {
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

			svg {
				fill: ${({ theme }) => theme.colors.white};
			}
		}

		svg {
			width: 30px;
			height: 30px;
			fill: ${({ theme }) => theme.colors.black};
		}
	}
`;

const Step2: React.FC = () => {
	const { offerType, offerToken, setOfferToken } = useOfferStore();

	return (
		<>
			<FormField>
				<label>
					Select <strong>{capitalizeFirstLetter(offerType)}</strong> Token (The amount of token you want to{" "}
					{offerType === "buying" ? "buy" : "sell"})
				</label>
				<TokenField>
					<input type="text" placeholder="Enter Amount" pattern="[0-9]+([.][0-9]+)?" />
					<Dropdown>
						<TokenOption>
							{offerToken.name === "Scallop" && <ScallopLogo />}
							{offerToken.name === "Cetus" && <CetusLogo />}
							{offerToken.name}
							<ArrowDown />
						</TokenOption>
						<DropdownContent>
							<div
								onClick={() =>
									setOfferToken({
										...offerToken,
										name: "Scallop",
									})
								}
							>
								<ScallopLogo /> Scallop
							</div>
							<div
								onClick={() =>
									setOfferToken({
										...offerToken,
										name: "Cetus",
									})
								}
							>
								<CetusLogo /> Cetus
							</div>
						</DropdownContent>
					</Dropdown>
				</TokenField>
			</FormField>
			<FormField>
				<label> SUI Token (The amount of token you will {offerType === "buying" ? "send" : "receive"})</label>
				<TokenField>
					<input type="text" placeholder="Enter Amount" pattern="[0-9]+([.][0-9]+)?" />
					<TokenOption className="sui-token">
						<SuiLogo />
						SUI
					</TokenOption>
				</TokenField>
			</FormField>
			<FormField>
				<label>Description (Optional)</label>
				<textarea placeholder="Write your description" maxLength={180} />
			</FormField>
		</>
	);
};

export default Step2;
