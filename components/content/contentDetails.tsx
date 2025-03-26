"use client"

import styled from "styled-components"
import LinkIconWithText from "../nav/linkIconWithText";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Button from "../nav/button";
import { RiUserFollowLine } from "react-icons/ri";
import RatingStats from "../rating/ratingStats";
import RatingsButtons from "../rating/ratingsButtons";

const Title = styled.h2`
    margin: 0;
`;

const Container = styled.div`
    padding: 1rem;
    width: 80%;
    margin: auto;

    @media only screen and (max-width: 900px) {

    }
`;

const Header = styled.header`
    display: grid;
    justify-content: space-between;
    grid-template-columns: auto auto ;
    align-items: center;

    @media only screen and (max-width: 900px) {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
`;

const UserDetailsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    @media only screen and (max-width: 560px) {
        flex-direction: column;
        align-items: start;
    }
`;

const Break = styled.hr`
    opacity: 0.1;
`;

const UserAction = styled(Button)`
    display: grid;
    grid-template-columns: auto auto;
    gap: 0.5rem;
`
export default function ContentDetails({ stats, contentDescription, contentId }: { stats?: RatingStats, contentDescription: string, contentId: string }) {

    return (
        <Container>
            <Header>
                <Title>Title</Title>
                <UserDetailsContainer>
                    <LinkIconWithText href={"/@NomadUK"} text="Nomad_UK">N</LinkIconWithText>
                    <UserAction >
                        <RiUserFollowLine />
                        Follow
                    </UserAction>
                    {stats ? <RatingsButtons stats={stats} contentId={contentId} /> : null}
                </UserDetailsContainer>
            </Header>
            <Break />
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}>
                {atob(contentDescription)}
            </ReactMarkdown>
            <Break />
        </Container>
    )
}