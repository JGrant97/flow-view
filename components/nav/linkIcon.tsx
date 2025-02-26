"use client"

import Link from "next/link";
import { ReactNode } from "react";
import styled from "styled-components";

const Icon = styled(Link)`
    background: var(--accent);
    color: var(--foreground);
    border-radius: 100vw;
    text-align: center;
    margin: auto;
    padding: 0.25rem;
    width: 1rem;
    font-weight: bold;
    text-decoration: none;
`;

export default function LinkIcon({href, children}: {href: string, children: ReactNode}){
    return (
        <Icon href={href}>{children}</Icon>
    )
}