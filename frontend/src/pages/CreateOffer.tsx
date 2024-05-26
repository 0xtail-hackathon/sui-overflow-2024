// src/components/CreateOffer/CreateOffer.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "@assets/images/icon-arrow-left.svg?react";
import Step1 from "@components/CreateOffer/Step1";
import Step2 from "@components/CreateOffer/Step2";
import Step3 from "@components/CreateOffer/Step3";
import { useOfferStore } from "@stores/useOfferStore";
import theme from "@/styles/theme";

const CreateOfferContainer = styled.div`
    position: relative;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
`;

const TitleBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;

    h2 {
        font-size: 1.5rem;
    }

    span {
        font-size: 0.9rem;
        color: ${({ theme }) => theme.colors.gray};
    }
`;

const BackToHomeButton = styled(ArrowLeftIcon)`
    cursor: pointer;
    width: 20px;
    height: 20px;
    fill: ${({ theme }) => theme.colors.gray};
`;

const CreateFormContainer = styled.div`
    position: absolute;
    top: 120px;
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 620px;
`;

const CreateFormBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: white;
    padding: 40px;
    border-radius: 8px;
    box-shadow: ${({ theme }) => theme.shadows.style1};
`;

const StepIndicator = styled.div`
    display: grid;
    grid-template-columns: 1fr 100px 1fr 100px 1fr;
    width: 100%;
    height: 60px;
    justify-content: space-between;
    align-items: center;
`;

const Step = styled.div<{ active: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: ${({ theme, active }) =>
        active ? theme.colors.primary : theme.colors.gray};
    width: 100%;
    gap: 8px;
    font-weight: ${({ active }) => (active ? "600" : "400")};
`;

const StepTitle = styled.div`
    font-size: 0.9rem;
`;

const StepNumber = styled.div<{ active: boolean }>`
    background-color: ${({ theme, active }) =>
        active ? theme.colors.secondary : "#ccc"};
    color: ${({ theme, active }) =>
        active ? theme.colors.primary : theme.colors.gray};
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
`;

const StepArrow = styled.div`
    position: relative;
    width: 100px;
    height: 2px;
    background-color: #ccc;
    top: 10px;

    &:after {
        content: "";
        position: relative;
        top: -4px;
        left: calc(100px - 8px);
        display: block;
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 8px solid #ccc;
    }
`;

const Divider = styled.hr`
    border: none;
    border-top: 2px solid ${({ theme }) => theme.colors.light_gray};
`;

const FormSection = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
`;

const Button = styled.button<{ primary?: boolean }>`
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background: ${({ primary }) =>
        primary
            ? "linear-gradient(90deg, #00b3ff 0%, #1f93ff 100%);"
            : theme.colors.gray};
    color: white;
    font-size: 1rem;
    width: 100%;

    &:hover {
        color: ${({ theme }) => theme.colors.black};
        background: ${({ primary }) =>
            primary
                ? "linear-gradient(90deg, #1f93ff 0%, #00b3ff 100%);"
                : theme.colors.light_gray};
    }
`;

const CreateOffer: React.FC = () => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const { network, type, setNetwork, setType } = useOfferStore();

    useEffect(() => {
        setNetwork("SUI");
        setType("selling");
    }, []);

    useEffect(() => {
        console.log(`[step ${step}] network: ${network}, type: ${type}`);
    }, [network, type, step]);

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
        if (step === 1) navigate(-1);
    };

    const handleSubmit = () => {
        // TODO: Submit the form
        navigate("/");
    };

    return (
        <CreateOfferContainer>
            <TitleBox>
                <BackToHomeButton onClick={handleBack} />
                <h2>Create Offer in OTC Market</h2>
                <span>(Step {step} of 3)</span>
            </TitleBox>
            <CreateFormContainer>
                <CreateFormBox>
                    <StepIndicator>
                        <Step active={step === 1}>
                            <StepTitle>Network & Type</StepTitle>
                            <StepNumber active={step === 1}>1</StepNumber>
                        </Step>
                        <StepArrow />
                        <Step active={step === 2}>
                            <StepTitle>Detail</StepTitle>
                            <StepNumber active={step === 2}>2</StepNumber>
                        </Step>
                        <StepArrow />
                        <Step active={step === 3}>
                            <StepTitle>Review & Create</StepTitle>
                            <StepNumber active={step === 3}>3</StepNumber>
                        </Step>
                    </StepIndicator>
                    <Divider />
                    <FormSection>
                        {step === 1 && <Step1 />}
                        {step === 2 && <Step2 />}
                        {step === 3 && <Step3 />}
                    </FormSection>
                </CreateFormBox>
                <ButtonGroup>
                    <Button onClick={handleBack}>Back</Button>
                    {step < 3 && (
                        <Button primary onClick={handleNext}>
                            Next
                        </Button>
                    )}
                    {step === 3 && (
                        <Button primary onClick={handleSubmit}>
                            Create Offer
                        </Button>
                    )}
                </ButtonGroup>
            </CreateFormContainer>
        </CreateOfferContainer>
    );
};

export default CreateOffer;
