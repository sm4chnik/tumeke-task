import React from 'react';
import { Platform, SafeAreaView, StyleSheet, View, Text } from 'react-native';
import RNFS from 'react-native-fs';
import VideoSkeletonPlayer from './VideoSkeletonPlayer';
import { Skeleton, parseSkeleton } from './skeleton';

const videoUri =
  Platform.OS === 'android'
    ? 'asset:///custom/video1.mp4'
    : `file://${RNFS.MainBundlePath}/video1.mp4`;

const jointsUri =
  Platform.OS === 'android'
    ? 'custom/video1.bin'
    : `file://${RNFS.MainBundlePath}/video1.bin`;

async function loadSkeleton(): Promise<Skeleton> {
  const base64 =
    Platform.OS === 'android'
      ? await RNFS.readFileAssets(jointsUri, 'base64')
      : await RNFS.readFile(jointsUri.replace('file://', ''), 'base64');
  return parseSkeleton(base64);
}

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Video Skeleton App</Text>
      </View>
      <VideoSkeletonPlayer videoUri={videoUri} loadSkeleton={loadSkeleton} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#FFF',
  },
});

export default App;
