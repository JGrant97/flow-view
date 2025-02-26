"use client"

import CustomInputType from "@/types/customInputType";
import styled from "styled-components"

const Container = styled.label`
    display: grid;
    gap: 0.25rem;
`;

const InputEl = styled.input`
    
`

export default function Input(props: CustomInputType) {
    return (
        <Container>
            {props.label}
            <InputEl {...props} />
        </Container>
    )
}