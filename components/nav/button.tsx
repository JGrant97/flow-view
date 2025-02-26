"use client"

import CustomButtonType from "@/types/customButtonType";
import styled from "styled-components"

const ButtonEl = styled.button`
    background: var(--foreground);
    color: var(--accent);
    padding: 0.5rem 1rem;
    border: 1px solid var(--background-lighter);
    border-radius: 0.5rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 200ms ease-in-out;

    &:hover{
        background: var(--background);
    }
`;

export default function Button(props: CustomButtonType) {
    return <ButtonEl {...props}>{props.children}</ButtonEl>
}