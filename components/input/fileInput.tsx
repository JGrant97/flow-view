import CustomInputType from "@/types/customInputType";
import styled from "styled-components";

const FileButton = styled.div`
    padding: 1rem;
    background-color: var(--background-lighter);
    border-radius: 0.5rem;
    transition: background-color 300ms ease-in-out;
`;

const Container = styled.label`
    position: relative;
    display: grid;
    &:hover{
        ${FileButton}{
            background-color: var(--foreground);
        }
    }
`;
const InputContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    cursor: pointer;
`;


export default function FileInput(props: CustomInputType) {
    return (
        <Container>
            {props.label}
            <FileButton>Upload File</FileButton>
            <InputContainer>
                <input hidden type="file" {...props} />
            </InputContainer>
        </Container>
    );
}