"use client"

import LoginForm from "@/components/user/loginForm"
import styled from "styled-components"

const Container = styled.div`
    display: flex;
    flex: 1 1 auto;
`;

const FormContainer = styled.div`
    width: 35rem;
    margin: auto;
    padding: 1rem;
    background: var(--foreground);
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h1{
        margin: 0;
    }
`;

export default function Login() {
    return (
        <Container>
            <FormContainer>
                <h1>Login</h1>
                <LoginForm />
            </FormContainer>
        </Container>
    )
}