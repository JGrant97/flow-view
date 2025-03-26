"use client"
import UploadContentForm from "@/components/content/uploadContentForm";
import styled from "styled-components";

const Container = styled.div`
    display: grid;
    gap: 1rem;
    background-color:  var(--foreground);
    margin: 2rem auto;
    padding: 2rem;
    border-radius: 0.5rem;
    max-width: 100%;
`;

const Title = styled.h2`
    margin: 0;
    border-bottom:  1px solid var(--background-lighter);
    padding-bottom: 1rem;
`;

export default function Upload() {

    return (
        <Container>
            <Title>Upload Content</Title>
            <UploadContentForm />
        </Container>
    )
}