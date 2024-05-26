// src/components/CreateOffer/Step2.tsx
import React from "react";
import styled from "styled-components";
import SuiLogo from "@assets/images/logo-sui.svg?react";
import ScallopLogo from "@assets/images/logo-scallop.svg?react";

const FormField = styled.div`
    margin-bottom: 20px;

    label {
        display: block;
        font-size: 1rem;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.gray};
        margin-bottom: 10px;
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
    }
`;

const Step2: React.FC = () => {
    return (
        <>
            <FormField>
                <label>
                    Select Token (the amount of token you want to sell)
                </label>
                <input type="text" placeholder="Enter Amount" />
                <ScallopLogo />
            </FormField>
            <FormField>
                <label>
                    For (the amount of token you are seeking to acquire)
                </label>
                <input type="text" placeholder="Enter Amount" />
                <SuiLogo />
            </FormField>
            <FormField>
                <label>Description (Optional)</label>
                <textarea
                    placeholder="Write your description"
                    maxLength={180}
                />
            </FormField>
        </>
    );
};

export default Step2;
