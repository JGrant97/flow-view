import CustomInputType from "@/types/customInputType";
import styled from "styled-components";

const Container = styled.label`
    position: relative;
    display: grid;
    gap: 1rem;

    img{
        max-width: 100%;
        aspect-ratio: 16/9;
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

export default function ImageInput(props: CustomInputType) {
    return (
        <Container>
            {props.label}
            <img src={props.imagesource} alt="sdasd" />
            <InputContainer>
                <input hidden type="file" {...props} />
            </InputContainer>
        </Container>
    );
}