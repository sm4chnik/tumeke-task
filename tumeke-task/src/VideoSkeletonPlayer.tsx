import React, { useEffect, useRef, useState } from 'react';
import SkeletonOverlay from './SkeletonOverlay';
import { Skeleton, loadSkeleton } from './skeleton';

type Props = {
  videoUri: string;
  jointsUri: string;
};

type VideoSize = {
  width: number;
  height: number;
};

const VideoSkeletonPlayer = ({ videoUri, jointsUri }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [skeleton, setSkeleton] = useState<Skeleton | null>(null);
  const [videoSize, setVideoSize] = useState<VideoSize | null>(null);
  const [canPlay, setCanPlay] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setSkeleton(null);
    loadSkeleton(jointsUri)
      .then((loaded) => {
        if (!cancelled) {
          setSkeleton(loaded);
        }
      })
      .catch((loadError: Error) => {
        if (!cancelled) {
          setError(loadError.message);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [jointsUri]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !skeleton || !canPlay) {
      return;
    }
    video.play().catch(() => setAutoplayBlocked(true));
  }, [skeleton, canPlay]);

  if (error) {
    return <div className="App-error">{error}</div>;
  }

  return (
    <div className="App-video-container">
      <video
        ref={videoRef}
        className="App-video"
        src={videoUri}
        preload="auto"
        muted
        playsInline
        loop
        controls={autoplayBlocked}
        onLoadedMetadata={(event) =>
          setVideoSize({
            width: event.currentTarget.videoWidth,
            height: event.currentTarget.videoHeight,
          })
        }
        onCanPlay={() => setCanPlay(true)}
        onError={() => setError('Failed to load video')}
      />
      {skeleton && videoSize && (
        <SkeletonOverlay
          skeleton={skeleton}
          videoRef={videoRef}
          videoWidth={videoSize.width}
          videoHeight={videoSize.height}
        />
      )}
    </div>
  );
};

export default VideoSkeletonPlayer;
