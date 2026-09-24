import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
// import RNFS from 'react-native-fs';
// import { JOINTS, BONE_PAIRS, POINTS_IN_PERSON } from '../constants';

/* Use this uri to access video and joints files
const videoUri =
  Platform.OS === 'android'
    ? 'asset:///custom/video1.mp4'
    : `file://${RNFS.MainBundlePath}/video1.mp4`;

const jointsUri =
  Platform.OS === 'android'
    ? 'custom/video1.bin'
    : `file://${RNFS.MainBundlePath}/video1.bin`;
*/

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Video Skeleton App</Text>
      </View>
      <View style={styles.flex} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  flex: {
    flex: 1,
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
