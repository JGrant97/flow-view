'use client'

import Link from "next/link";
import { useContext } from "react";
import styled from "styled-components"
import { UserContext } from "../userContextProvider";

const Container = styled.div`
    background-color: var(--foreground);
    padding: 0.5rem 1rem;
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
`;

const ElementList = styled.ul`
    text-decoration: none;
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 1rem;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: var(--accent);
    padding: 0.5rem 0;
`;

const Icon = styled.div`
    background: var(--accent);
    color: var(--foreground);
    border-radius: 100vw;
    text-align: center;
    margin: auto;
    padding: 0.25rem;
    width: 1rem;
    font-weight: bold;
`;

const SearchInput = styled.input`
    width: 30rem;
    border: 0;
    border-radius: 0.75rem;
    padding: 0 0.5rem;
    background-color: var(--foreground);
    color: var(--accent);
    outline: 0.075rem solid var(--background);
    transition: outline-color 200ms ease-in-out;

    &:focus-visible{
        outline-color: var(--accent);
    }
`;

const AccountChildren = styled.div`
    position: absolute;
    right: 0;
    display: grid;
    width: 10rem;
    grid-template-columns: 1fr;
    gap: 0.25rem;
    background-color: var(--foreground);
    visibility: hidden;
    opacity: 0;
    transition: opacity 200ms ease-in-out;
`;

const AccountContainer = styled.div`
    position: relative;
    margin: auto;

    
    ${StyledLink}{
        padding: 1rem;
        transition: background-color 200ms ease-in-out;

        &:hover{
            background-color: var(--background-lighter);
        }
    }
    
    &:hover{
        ${AccountChildren}{
            opacity: 100%;
            visibility: visible;
        }
    }
`;

export default function TopNavBar() {
    const userContext = useContext(UserContext);
    return (
        <Container>
            <ElementList>
                <StyledLink href={"/"}>FlowView {userContext?.displayname}</StyledLink>
                <StyledLink href={"/browse"}>Browse</StyledLink>
                <StyledLink href={"/following"}>Following</StyledLink>
                <StyledLink href={"/trending"}>Trending</StyledLink>
            </ElementList>
            <ElementList>
                <SearchInput type="search" placeholder="Search" results={10} />
            </ElementList>
            <ElementList>
                {userContext ?
                    <AccountContainer>
                        <Icon>N</Icon>
                        <AccountChildren>
                            <StyledLink href={"/account/@NomadUK"}>Account</StyledLink>
                            <StyledLink href={"/contentmanager"}>Content Manager</StyledLink>
                            <StyledLink href={"/upload"}>Upload</StyledLink>
                            <StyledLink href={"/account"}>Sign out</StyledLink>
                        </AccountChildren>
                    </AccountContainer>
                    :
                    <>
                        <StyledLink href={"/login"}>Login</StyledLink>
                        <StyledLink href={"/signup"}>Sign Up</StyledLink>
                        <Icon>?</Icon>
                    </>
                }
            </ElementList>
        </Container>
    )
}