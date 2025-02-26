import ContentDetails from '@/components/content/contentDetails'
import VideoPlayer from '@/components/player/videoPlayer'

export default function Watch() {
    return (
        <section style={{display: "grid"}}>
            <VideoPlayer />
            <ContentDetails/>
        </section>
    )
}