"use client"

import CustomInputType from "@/types/customInputType";
import styled from "styled-components"

const InputEl = styled.input`
    width: 100%;
    height: 35px;
    border: 1px solid var(--background);
    border-radius: 5px;
    outline: 0;
    padding: 0 10px;
    box-sizing: border-box;
    transition: border-color 300ms ease-in-out;

    &:focus-visible{
        border: 1px solid var(--primary);
    }

    &:disabled{
        background: #fbfbfb;
    }
`;

const Label = styled.label`
    display: grid;
    gap: 0.25rem;
`

export default function Input(props: CustomInputType) {
    return (
        <Label >
            {props.label}
            <InputEl {...props} />
        </Label>
    )
}