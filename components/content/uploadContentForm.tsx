import styled from "styled-components";
import Input from "../input";
import MarkDownEditor from "../markdown/markDownEditor";
import ImageInput from "../input/imageInput";
import FileInput from "../input/fileInput";
import { useActionState, useState } from "react";
import { uploadContentAction } from "./contentFormActions";
import Button from "../nav/button";

const Container = styled.form`
    display: grid;
    gap: 1rem;
    max-width: 100%;
`;

const Error = styled.p`
    margin: 0;
    color: red;
`;

const Label = styled.label`
    display: grid;
    gap: 1rem;
`;

const SplitContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
`;

export default function UploadContentForm() {
    const [state, action, pending] = useActionState(uploadContentAction, undefined);
    const [markdownBase64, setMarkdownBase64] = useState("");

    return (
        <Container action={action}>
            <input name={"description"} type={"hidden"} value={markdownBase64} />

            <SplitContainer>
                    <Input type="text" name="title" label="Title" placeholder="Title..." />
                    <Input name="releaseData" type="datetime-local" label="Release Date (Leave Empty If you want to release as soon as it is uploaded)." placeholder="Release Date..." />
                    {state?.errors?.title && <Error>{state.errors.title}</Error>}
                    {state?.errors?.releaseData && <Error>{state.errors.releaseData}</Error>}
            </SplitContainer>

            <Label>
                Description
                <MarkDownEditor placeholder={"Description...."} markdown={""} onChange={(e) => setMarkdownBase64(btoa(e))} />
            </Label>

            {state?.errors?.description && <Error>{state.errors.description}</Error>}

            <SplitContainer>
                <ImageInput name="thumbnail" imagesource="https://placehold.co/600x400" label="Thumbnail" />
            </SplitContainer>

            {state?.errors?.thumbnail && <Error>{state.errors.thumbnail}</Error>}

            <FileInput name="content" label="File" />
            {state?.errors?.content && <Error>{state.errors.content}</Error>}


            <Button disabled={pending}>{pending ? "...Submitting" : "Submit"}</Button>
        </Container>
    )
}