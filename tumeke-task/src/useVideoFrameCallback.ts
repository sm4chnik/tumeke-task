import { RefObject, useEffect, useRef } from 'react';

// Calls `onFrame` with the media time of every presented video frame.
// Falls back to requestAnimationFrame + currentTime where
// requestVideoFrameCallback is not supported.
export function useVideoFrameCallback(
  videoRef: RefObject<HTMLVideoElement>,
  onFrame: (mediaTime: number) => void,
  enabled: boolean,
): void {
  const onFrameRef = useRef(onFrame);
  onFrameRef.current = onFrame;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !enabled) {
      return undefined;
    }

    if (typeof video.requestVideoFrameCallback === 'function') {
      let handle = 0;
      const tick: VideoFrameRequestCallback = (_now, metadata) => {
        onFrameRef.current(metadata.mediaTime);
        handle = video.requestVideoFrameCallback(tick);
      };
      onFrameRef.current(video.currentTime);
      handle = video.requestVideoFrameCallback(tick);
      return () => video.cancelVideoFrameCallback(handle);
    }

    let handle = 0;
    const tick = () => {
      onFrameRef.current(video.currentTime);
      handle = window.requestAnimationFrame(tick);
    };
    handle = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(handle);
  }, [videoRef, enabled]);
}
