"use client"

import { useContext, useState } from "react";
import { UserContext } from "../userContextProvider";
import RatingStats from "./ratingStats";
import Rating from "./rating";
import { CreateRating, DeleteRating, GetRatingStats, UpdateRating } from "@/api/ratingAPI";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa6";
import { CreateRatingType } from "./createRating";
import styled from "styled-components";
import Button from "../nav/button";

const UserAction = styled(Button)`
    display: grid;
    grid-template-columns: auto auto;
    gap: 0.5rem;
`

export default function RatingsButtons({ stats, contentId }: { stats: RatingStats, contentId: string }) {
    const userContext = useContext(UserContext);
    const [currentStates, setCurrentStats] = useState<RatingStats>(stats);

    async function onRatingClick(value: boolean, submittedStats: RatingStats) {
        var rating: Rating | undefined | Error = undefined;

        if(submittedStats?.rating && submittedStats.rating.like === value){
            await DeleteRating(submittedStats.rating.id);
        }

        else if (submittedStats?.rating && submittedStats?.rating?.id.length > 0) {
            rating = await UpdateRating({
                id: submittedStats.rating.id,
                userId: userContext?.sub,
                contentId: contentId,
                lastUpdated: submittedStats.rating.lastUpdated,
                like: value,
            } as Rating);
        } else {
            rating = await CreateRating({
                userId: userContext?.sub,
                contentId: contentId,
                like: value,
            } as CreateRatingType);
        }

        if (rating instanceof Error)
            return;

        const newStats = await GetRatingStats(contentId);

        if (newStats instanceof Error)
            return;

        setCurrentStats(newStats);
    }

    return (
        <>
            <UserAction onClick={() => onRatingClick(true, currentStates)} >
                <FaRegThumbsUp color={currentStates?.rating?.like === true ? "green" : "#fff"} />{currentStates?.likes}
            </UserAction>

            <UserAction onClick={() => onRatingClick(false, currentStates)} >
                <FaRegThumbsDown color={currentStates?.rating?.like === false ? "red" : "#fff"} />{currentStates?.dislikes}
            </UserAction>
        </>
    )
}