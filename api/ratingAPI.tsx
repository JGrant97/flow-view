"use server"

import { CreateRatingType } from "@/components/rating/createRating";
import Rating from "@/components/rating/rating";
import RatingStats from "@/components/rating/ratingStats";
import { verifySession } from "@/components/session";

export async function GetRatingStats(contentId: string) {
    const session = await verifySession();
    
    const res = await fetch(`https://localhost:7260/rating/stats/${contentId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.token}`
        },
    })

    if (!res.ok) {
        switch (res.status) {
            default:
                return new Error(res.statusText)
        }
    }

    return await res.json() as RatingStats;
}

export async function CreateRating(rating: CreateRatingType) {
    const session = await verifySession();

    if (session == undefined)
        return new Error("Unauthorised");


    const res = await fetch(`https://localhost:7260/rating`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.token}`
        },
        body: JSON.stringify(rating)
    })

    if (!res.ok) {
        switch (res.status) {
            default:
                return new Error(res.statusText)
        }
    }

    return await res.json() as Rating;
}

export async function UpdateRating(rating: Rating) {
    const session = await verifySession();

    if (session == undefined)
        return new Error("Unauthorised");

    const res = await fetch(`https://localhost:7260/rating`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.token}`
        },
        body: JSON.stringify(rating)
    })

    if (!res.ok) {
        switch (res.status) {
            default:
                return new Error(res.statusText)
        }
    }

    return await res.json() as Rating;
}

export async function DeleteRating(ratingId: string) {

    console.log(ratingId)
    const session = await verifySession();

    if (session == undefined)
        return new Error("Unauthorised");

    const res = await fetch(`https://localhost:7260/rating/${ratingId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.token}`
        },
    })

    if (!res.ok) {
        switch (res.status) {
            default:
                return new Error(res.statusText)
        }
    }
}
