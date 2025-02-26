"use client"

import Link from "next/link";
import { ReactNode } from "react";
import styled from "styled-components";

const Icon = styled.div`
    background: var(--accent);
    color: var(--foreground);
    border-radius: 100vw;
    text-align: center;
    margin: auto;
    padding: 0.5rem;
    width: 1rem;
    height: 1rem;
    font-weight: bold;
    font-size: 14pt;
    line-height: 0.9;
`;

const Container = styled(Link)`
    display: grid;
    align-items: center;
    grid-template-columns: auto auto;
    text-decoration: none;
    color: var(--accent);
    gap: 0.5rem;
`

const Title = styled.span`
    font-size: 12pt;
`

export default function LinkIconWithText({href, children, text}: {href: string, children: ReactNode, text: string}){
    return (
        <Container href={href}>
            <Icon >{children}</Icon>
            <Title>{text}</Title>
        </Container>
    )
}