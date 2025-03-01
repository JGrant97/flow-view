"use client"
import { styled } from "styled-components";
import Link from "next/link";
import Button from "../nav/button";
import Input from "../input";
import { register } from "./userFormActions";
import { useActionState } from "react";

const Form = styled.form`
    display: grid;
    gap: 1.25rem;

    label{
        font-weight: bold;;
    }
`;

const BottomContainer = styled.div`
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    align-items: center;
    
    p{
        padding: 0;
        margin: 0;
    }
`;

const Error = styled.p`
    margin: 0;
    color: red;
`;

const ErrorList = styled.ul`
    color: red;
    list-style-type: none;
    margin: 0;
    padding: 0;
`

export default function RegisterForm() {
    const [state, action, pending] = useActionState(register, undefined);

    return (
        <Form action={action}>
            <Input
                label="Username"
                name="displayname"
                placeholder="Username"
            />
            {state?.errors?.email && <Error>{state.errors.email}</Error>}
            <Input
                label="Email"
                name="email"
                placeholder="E-mail"
            />
            {state?.errors?.email && <Error>{state.errors.email}</Error>}
            <Input
                label="Password"
                name="password"
                placeholder="Password"
                type="password"
            />
            {state?.errors?.password && (
                <div>
                    <Error>Password must:</Error>
                    <ErrorList>
                        {state.errors.password.map((error) => (
                            <li key={error}>- {error}</li>
                        ))}
                    </ErrorList>
                </div>
            )}
            <BottomContainer>
                <Button disabled={pending}>{pending ? "Submitting..." : "Register"}</Button>
                <p>Already have an account? <Link href={"/login"}>Login</Link></p>
            </BottomContainer>
        </Form>
    )
}