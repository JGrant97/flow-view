"use client"

import Button from "@/components/nav/button"
import LoginForm from "@/components/user/loginForm"
import styled from "styled-components"

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

export default function Login(){
    return (
        <Container>
            <h1>Login</h1>
            <LoginForm/>
        </Container>
    )
}