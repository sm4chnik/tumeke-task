import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import { JOINTS } from '../constants';
import { BONES, Skeleton, getJoint } from './skeleton';

type Props = {
  skeleton: Skeleton;
  frame: number;
  videoWidth: number;
  videoHeight: number;
  displayWidth: number;
};

const BONE_COLOR = '#0a0';
const JOINT_COLOR = '#f00';

const SkeletonOverlay = ({
  skeleton,
  frame,
  videoWidth,
  videoHeight,
  displayWidth,
}: Props) => {
  // viewBox is in video pixels, so keep on-screen stroke widths constant
  const scale = videoWidth / displayWidth;

  return (
    <Svg
      style={StyleSheet.absoluteFill}
      viewBox={`0 0 ${videoWidth} ${videoHeight}`}
      pointerEvents="none">
      {BONES.map(([from, to]) => {
        const start = getJoint(skeleton, frame, from);
        const end = getJoint(skeleton, frame, to);
        if (!start || !end) {
          return null;
        }
        return (
          <Line
            key={`${JOINTS[from]}-${JOINTS[to]}`}
            x1={start.x * videoWidth}
            y1={start.y * videoHeight}
            x2={end.x * videoWidth}
            y2={end.y * videoHeight}
            stroke={BONE_COLOR}
            strokeWidth={3 * scale}
            strokeLinecap="round"
          />
        );
      })}
      {JOINTS.map((name, index) => {
        const joint = getJoint(skeleton, frame, index);
        if (!joint) {
          return null;
        }
        return (
          <Circle
            key={name}
            cx={joint.x * videoWidth}
            cy={joint.y * videoHeight}
            r={4 * scale}
            fill="none"
            stroke={JOINT_COLOR}
            strokeWidth={2 * scale}
          />
        );
      })}
    </Svg>
  );
};

export default memo(SkeletonOverlay);
