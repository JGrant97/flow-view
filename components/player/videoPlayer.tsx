'use client';

import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import {
    ChapterTitle,
    isHLSProvider,
    MediaPlayer,
    MediaPlayerInstance,
    MediaProvider,
    MediaProviderAdapter,
    MediaProviderChangeEvent,
    Poster,
    useMediaStore,
} from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const PlayerContainer = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  background: black;
`;

const StyledPlayer = styled(MediaPlayer)`
  width: 80%;
  border: none !important;
  outline: none !important;
  border-radius: 0;

  .vds-poster{
    z-index: 0;
  }
`;

const StyledMediaProvider = styled(MediaProvider)`
  border-radius: unset;
  display: unset;
`;

export default function VideoPlayer({path, thumbnail}: {path: string, thumbnail: string}) {
    const player = useRef<MediaPlayerInstance>(null);
    const { playing, paused } = useMediaStore(player);

    const [watchTime, setWatchTime] = useState(0); // Total time spent watching in seconds
    const lastTimestampRef = useRef<number>(0); // Last timestamp when the video was playing
    const accumulatedTimeRef = useRef<number>(0); // Accumulated time the user has been watching

    // Track watch time on every tick
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        const updateWatchTime = () => {
            if (playing) {
                const now = Date.now();
                if (lastTimestampRef.current !== 0) {
                    // Calculate how much time has passed since the last update
                    const timeElapsed = (now - lastTimestampRef.current) / 1000; // Convert from ms to seconds

                    // Accumulate the time spent watching the video
                    accumulatedTimeRef.current += timeElapsed;

                    // Update the watch time state with the accumulated time
                    setWatchTime(accumulatedTimeRef.current);
                    console.log(`[updateWatchTime] Accumulated watch time: ${accumulatedTimeRef.current.toFixed(2)}s`);
                }
                lastTimestampRef.current = now; // Store the current timestamp
            }
        };

        if (playing) {
            console.log('[useEffect] Video is playing. Starting watch time tracking.');
            lastTimestampRef.current = Date.now(); // Initialize the timestamp when playback starts
            interval = setInterval(updateWatchTime, 1000); // Update every second
        } else {
            if (interval) clearInterval(interval);
            console.log('[useEffect] Video is paused or stopped. Clearing watch time interval.');
            lastTimestampRef.current = 0;
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [playing]);

    // Handle the onEnded event to log final watch time
    const handleVideoEnd = () => {
        console.log(`[onEnded] Video ended. Total Watch Time: ${watchTime.toFixed(2)} seconds`);
    };

    const onProviderChange = (
        provider: MediaProviderAdapter | null,
        nativeEvent: MediaProviderChangeEvent,
    ) => {
        if (isHLSProvider(provider)) {
            provider.config = {};
            console.log('[onProviderChange] HLS provider configured.');
        }
    };

    const smallVideoLayoutQuery = useCallback(({ width, height }: { width: number, height: number }) => {
        return width < 576 || height < 380;
    }, []);

    return (
        <PlayerContainer>
            <StyledPlayer
                ref={player}
                title="Sprite Fight"
                src={path}
                playsInline
                crossOrigin
                aspectRatio="16/9"
                googleCast={{
                    language: 'en-US',
                }}
                poster={thumbnail}
                onProviderChange={onProviderChange}
                onEnded={handleVideoEnd}
                onPlay={() => console.log('[onPlay] Video started playing.')}
                onPause={() => console.log(`[onPause] Video paused. Watch time so far: ${watchTime.toFixed(2)} seconds`)}
            >
                <StyledMediaProvider>
                    <Poster className="vds-poster" />
                    <ChapterTitle className="vds-chapter-title" />
                </StyledMediaProvider>
                <DefaultVideoLayout
                    smallLayoutWhen={smallVideoLayoutQuery}
                    colorScheme="dark"
                    thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
                    icons={defaultLayoutIcons}
                />
            </StyledPlayer>
            <p style={{position: "absolute"}}>Total Watch Time: {watchTime.toFixed(2)} seconds</p>
        </PlayerContainer>
    );
}
