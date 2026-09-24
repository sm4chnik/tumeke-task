import React from 'react';
import './App.css';
// import { JOINTS, BONE_PAIRS, POINTS_IN_PERSON } from './constants';

/* Use this uri to access video and joints files. Max width of video is always 640px
const maxWidth = 640;
const videoUri = '/assets/videos/video1.mp4';
const jointsUri = '/assets/videos/video1.bin';
*/

function App() {
  return (
    <div className="App">
      <header className="App-header">Video Skeleton App</header>
      <div className="App-video-container" />
    </div>
  );
}

export default App;
