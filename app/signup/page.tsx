"use client"
import RegisterForm from "@/components/user/registerForm";
import styled from "styled-components";

const Container = styled.div`
    width: 30%;
    margin: auto;
    padding: 1rem;
    background: var(--foreground);
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem ;

    h1{
        margin: 0;
    }
`

export default function SignUp() {
    return (
        <Container>
            <h1>Register</h1>
            <RegisterForm />
        </Container>
    )
}