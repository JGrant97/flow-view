import {  GetContent } from '@/api/contentAPI';
import { GetRatingStats } from '@/api/ratingAPI';
import ContentDetails from '@/components/content/contentDetails'
import VideoPlayer from '@/components/player/videoPlayer'
import RatingStats from '@/components/rating/ratingStats';

export async function generateMetadata({ params }: { params: { id: string } }) {
    const { id } = await params;
    const video = await GetContent(id);
    cache: "no-cache";

    if (video instanceof Error) {
        return {
            title: video.message,
        };
    }

    return {
        title: video.title,
    };
}


export default async function Watch({ params }: { params: { id: string } }) {
    const { id } = await params;
    var stats: undefined | RatingStats = undefined;

    const video = await GetContent(id);
    cache: "no-cache";

    var result = await GetRatingStats(id);

    if (!(result instanceof Error)) {
        stats = result;
    }

    if (video instanceof Error) {
        return {
            title: video.message,
        };
    }

    return (
        <section style={{ display: "grid" }}>
            <VideoPlayer path={video.filePath} thumbnail={video.thumbnail} />
            <ContentDetails contentId={id} stats={stats} contentDescription={video.description} />
        </section>
    )
}