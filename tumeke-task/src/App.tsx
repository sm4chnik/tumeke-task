import React from 'react';
import './App.css';
import VideoSkeletonPlayer from './VideoSkeletonPlayer';

const videoUri = '/assets/videos/video1.mp4';
const jointsUri = '/assets/videos/video1.bin';

function App() {
  return (
    <div className="App">
      <header className="App-header">Video Skeleton App</header>
      <VideoSkeletonPlayer videoUri={videoUri} jointsUri={jointsUri} />
    </div>
  );
}

export default App;
