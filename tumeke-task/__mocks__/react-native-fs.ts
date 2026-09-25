// One frame of 25 joints with all coordinates set to 0 (200 zero bytes)
const ONE_FRAME_BASE64 = 'A'.repeat(268);

export default {
  MainBundlePath: '/bundle',
  readFile: jest.fn(async () => ONE_FRAME_BASE64),
  readFileAssets: jest.fn(async () => ONE_FRAME_BASE64),
};
