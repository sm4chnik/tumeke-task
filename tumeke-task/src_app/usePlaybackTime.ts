import { useCallback, useEffect, useRef } from 'react';

type Sample = {
  mediaTime: number;
  receivedAt: number;
};

// react-native-video reports progress only every `progressUpdateInterval`,
// so between reports the media time is extrapolated on every animation frame.
export function usePlaybackTime(
  isPlaying: boolean,
  duration: number,
  onTime: (mediaTime: number) => void,
): (mediaTime: number) => void {
  const sampleRef = useRef<Sample>({ mediaTime: 0, receivedAt: Date.now() });
  const onTimeRef = useRef(onTime);
  onTimeRef.current = onTime;

  const report = useCallback((mediaTime: number) => {
    sampleRef.current = { mediaTime, receivedAt: Date.now() };
    onTimeRef.current(mediaTime);
  }, []);

  useEffect(() => {
    if (!isPlaying || duration <= 0) {
      return undefined;
    }
    sampleRef.current = { ...sampleRef.current, receivedAt: Date.now() };

    let handle = 0;
    const tick = () => {
      const { mediaTime, receivedAt } = sampleRef.current;
      const elapsed = (Date.now() - receivedAt) / 1000;
      // Modulo keeps the estimate valid across the loop boundary
      onTimeRef.current((mediaTime + elapsed) % duration);
      handle = window.requestAnimationFrame(tick);
    };
    handle = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(handle);
  }, [isPlaying, duration]);

  return report;
}
