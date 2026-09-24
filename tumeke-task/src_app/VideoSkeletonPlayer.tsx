import React, { useCallback, useEffect, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, Text, View } from 'react-native';
import Video, {
  OnLoadData,
  OnPlaybackStateChangedData,
  OnProgressData,
} from 'react-native-video';
import SkeletonOverlay from './SkeletonOverlay';
import { Skeleton, getFrameIndex } from './skeleton';
import { usePlaybackTime } from './usePlaybackTime';

type Props = {
  videoUri: string;
  loadSkeleton: () => Promise<Skeleton>;
};

type Size = {
  width: number;
  height: number;
};

type VideoInfo = Size & {
  duration: number;
};

const VideoSkeletonPlayer = ({ videoUri, loadSkeleton }: Props) => {
  const [skeleton, setSkeleton] = useState<Skeleton | null>(null);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [container, setContainer] = useState<Size | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [frame, setFrame] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadSkeleton()
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
  }, [loadSkeleton]);

  const duration = videoInfo?.duration ?? 0;

  const handleTime = useCallback(
    (mediaTime: number) => {
      if (skeleton && duration > 0) {
        setFrame(getFrameIndex(skeleton, mediaTime, duration));
      }
    },
    [skeleton, duration],
  );

  const reportTime = usePlaybackTime(isPlaying, duration, handleTime);

  const handleLoad = useCallback(
    ({ naturalSize, duration: videoDuration }: OnLoadData) => {
      setVideoInfo({
        width: naturalSize.width,
        height: naturalSize.height,
        duration: videoDuration,
      });
    },
    [],
  );

  const handleProgress = useCallback(
    ({ currentTime }: OnProgressData) => reportTime(currentTime),
    [reportTime],
  );

  const handlePlaybackStateChanged = useCallback(
    (state: OnPlaybackStateChangedData) => setIsPlaying(state.isPlaying),
    [],
  );

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setContainer({ width, height });
  }, []);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  // Full screen width; in landscape the height limit keeps the whole video visible
  const aspectRatio = videoInfo ? videoInfo.width / videoInfo.height : 16 / 9;
  const displayWidth = container
    ? Math.min(container.width, container.height * aspectRatio)
    : 0;
  const displayHeight = displayWidth / aspectRatio;

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <View style={{ width: displayWidth, height: displayHeight }}>
        <Video
          source={{ uri: videoUri }}
          style={StyleSheet.absoluteFill}
          resizeMode="contain"
          paused={!skeleton || !videoInfo}
          repeat
          progressUpdateInterval={100}
          onLoad={handleLoad}
          onProgress={handleProgress}
          onPlaybackStateChanged={handlePlaybackStateChanged}
          onError={() => setError('Failed to load video')}
        />
        {skeleton && videoInfo && displayWidth > 0 && (
          <SkeletonOverlay
            skeleton={skeleton}
            frame={frame}
            videoWidth={videoInfo.width}
            videoHeight={videoInfo.height}
            displayWidth={displayWidth}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: '#F66',
  },
});

export default VideoSkeletonPlayer;
