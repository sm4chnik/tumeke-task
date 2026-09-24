### Task:
- Hello! This task is a frontend project that's a boiled down version of one the key components of our frontend stack. In this project, you'll be working on developing a video player that draws a 2D skeleton on top of the person that is present in the footage. You're given the video file and the joint data, and are expected to put together the rest of the components that create the dynamic rendering. Ideally, for each frame of the video, the corresponding skeleton should be displayed. The final implementation should look like the screenshots at the bottom of the README. (skeleton colors and bone widths may not match)

### Implementation:
- For displaying the video (`public/assets/videos/video1.mp4`) use any video component
- For displaying the skeleton (`public/assets/videos/video1.bin`) use the svg component (for react-native, it is also possible to use the Skia component)
- Video playback should start immediately after loading the video and loading the skeleton
- When scaling the page (changing the orientation of the device), the skeleton should also scale on the video
- Displaying the skeleton over the video should be as smooth as possible
- The app should work on any other videos with the correct set of joints

### Description of the structure of the joint file (`public/assets/videos/video1.bin`):
- The binary file is a set of float32 points (4 bytes) following each other
- Each frame contains 25 joints (50 `x/y` points ) or 200 bytes (50 * 4). Total 708 frames (same as in the video)
- The name, order of joints and pairs for bones are described in the `constants.ts` file
- Joint coordinates (`x/y`) are relative (from `0` to `1`)

### Additional requirements:
- The code must be written in TypeScript and the maximum possible typing must be used (avoid `any` and `unknown`)
- The code must be written in compliance with all `eslint` rules and pass the `yarn lint` check (adding new rules and disabling existing ones is not welcome)
- Don't overload your app with unnecessary components. Try to use only the essential components (video, svg/skia, fs, decoder)
- [Web] The maximum width for video is always `640px`
- [RN] The video should be displayed in full screen width.
- [RN] The app must run on both iOS and Android (but iOS has priority)

### Application template (Web)
- The application template is located in the `src` folder. All additional files should be created in this folder.
- The application is launched by the command `yarn start`

### Application template (RN)
- The application template is located in the `src_app` folder. All additional files should be created in this folder.
- After installing Pods for iOS, run the command `yarn linking` to link assets. `video1.mp4` and `video1.bin` will be added to application assets

### Expected result
#### Web
![Web](https://github.com/tumeke-tech/tumeke-task/raw/refs/heads/main/web.jpg)
#### React-Native
![App](https://github.com/tumeke-tech/tumeke-task/raw/refs/heads/main/app.jpg)
