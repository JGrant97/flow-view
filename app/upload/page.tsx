"use client"
import Input from "@/components/input";
import { useState } from "react";
import MarkDownEditor from "../../components/markdown/markDownEditor";
import styled from "styled-components";
import ImageInput from "@/components/input/imageInput";
import FileInput from "@/components/input/fileInput";

const Container = styled.form`
    width: 50%;
    margin: auto;
    display: grid;
    gap: 1rem;
`

export default function Upload() {
    const [markdownBase64, setMarkdownBase64] = useState("");

    return (
        <Container action="s">
            <input name={"Description"} type={"hidden"} value={markdownBase64} />
            <Input type="text" label="Title" placeholder="Title..." />
            <MarkDownEditor placeholder={"Description...."} markdown={""} onChange={(e) => setMarkdownBase64(btoa(e))} />
            <ImageInput imagesource="https://placehold.co/600x400" label="Thumbnail"/>
            <FileInput label="File"/>
            <Input type="datetime-local" label="Release Date (Leave Empty If you want to release as soon as it is uploaded)." placeholder="Release Date..." />
        </Container>
    )
}