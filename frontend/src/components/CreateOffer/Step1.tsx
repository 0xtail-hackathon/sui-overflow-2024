// src/components/CreateOffer/Step1.tsx
import React from "react";
import styled from "styled-components";
import SuiLogo from "@assets/images/logo-sui.svg?react";
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

const NetworkOption = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const Dropdown = styled.div`
    position: relative;
    display: inline-block;
    width: 100%;
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
    background-color: ${({ theme, selected }) =>
        selected ? theme.colors.secondary : "transparent"};
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
        border: 1px solid
            ${({ theme, selected }) =>
                selected ? theme.colors.secondary : theme.colors.light_gray};
        background-color: ${({ theme, selected }) =>
            selected ? theme.colors.secondary : theme.colors.white};

        &:after {
            content: "";
            width: 10px;
            height: 10px;
            background-color: ${({ theme, selected }) =>
                selected ? theme.colors.primary : "transparent"};
            border-radius: 50%;
        }
    }

    span {
        display: flex;
        flex-direction: column;
    }

    strong {
        font-size: 1rem;
        color: ${({ theme, selected }) =>
            selected ? theme.colors.black : theme.colors.gray};
    }

    p {
        font-size: 0.8rem;
        color: ${({ theme, selected }) =>
            selected ? theme.colors.black : theme.colors.gray};
        opacity: 0.5;
    }
`;

const Step1: React.FC = () => {
    const { network, type, setNetwork, setType } = useOfferStore();

    return (
        <>
            <FormField>
                <label>Network</label>
                <Dropdown>
                    <NetworkOption>
                        <SuiLogo /> {network} Network
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
                    <RadioButton selected={type === "selling"}>
                        <input
                            type="radio"
                            name="type"
                            value="selling"
                            checked={type === "selling"}
                            onChange={() => setType("selling")}
                        />
                        <div />
                        <span>
                            <strong>Selling</strong>
                            <p>You want to sell your tokens</p>
                        </span>
                    </RadioButton>
                    <RadioButton selected={type === "buying"}>
                        <input
                            type="radio"
                            name="type"
                            value="buying"
                            checked={type === "buying"}
                            onChange={() => setType("buying")}
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
