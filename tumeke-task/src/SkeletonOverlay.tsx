import React, { RefObject, useCallback, useRef } from 'react';
import { JOINTS } from './constants';
import { BONES, Skeleton, getFrameIndex, getJoint } from './skeleton';
import { useVideoFrameCallback } from './useVideoFrameCallback';

type Props = {
  skeleton: Skeleton;
  videoRef: RefObject<HTMLVideoElement>;
  videoWidth: number;
  videoHeight: number;
};

const BONE_COLOR = '#0a0';
const JOINT_COLOR = '#f00';

const SkeletonOverlay = ({
  skeleton,
  videoRef,
  videoWidth,
  videoHeight,
}: Props) => {
  const boneRefs = useRef<(SVGLineElement | null)[]>([]);
  const jointRefs = useRef<(SVGCircleElement | null)[]>([]);
  const lastFrameRef = useRef(-1);

  // Positions are written straight to the DOM to avoid a React render per frame
  const drawFrame = useCallback(
    (mediaTime: number) => {
      const video = videoRef.current;
      if (!video || !Number.isFinite(video.duration)) {
        return;
      }
      const frame = getFrameIndex(skeleton, mediaTime, video.duration);
      if (frame === lastFrameRef.current) {
        return;
      }
      lastFrameRef.current = frame;

      BONES.forEach(([from, to], index) => {
        const line = boneRefs.current[index];
        if (!line) {
          return;
        }
        const start = getJoint(skeleton, frame, from);
        const end = getJoint(skeleton, frame, to);
        if (!start || !end) {
          line.setAttribute('visibility', 'hidden');
          return;
        }
        line.setAttribute('x1', String(start.x * videoWidth));
        line.setAttribute('y1', String(start.y * videoHeight));
        line.setAttribute('x2', String(end.x * videoWidth));
        line.setAttribute('y2', String(end.y * videoHeight));
        line.setAttribute('visibility', 'visible');
      });

      JOINTS.forEach((_name, index) => {
        const circle = jointRefs.current[index];
        if (!circle) {
          return;
        }
        const joint = getJoint(skeleton, frame, index);
        if (!joint) {
          circle.setAttribute('visibility', 'hidden');
          return;
        }
        circle.setAttribute('cx', String(joint.x * videoWidth));
        circle.setAttribute('cy', String(joint.y * videoHeight));
        circle.setAttribute('visibility', 'visible');
      });
    },
    [skeleton, videoRef, videoWidth, videoHeight],
  );

  useVideoFrameCallback(videoRef, drawFrame, true);

  const scale = videoWidth / 640;

  return (
    <svg
      className="App-skeleton"
      viewBox={`0 0 ${videoWidth} ${videoHeight}`}
      aria-hidden>
      {BONES.map(([from, to], index) => (
        <line
          key={`${JOINTS[from]}-${JOINTS[to]}`}
          ref={(element) => {
            boneRefs.current[index] = element;
          }}
          visibility="hidden"
          stroke={BONE_COLOR}
          strokeWidth={2 * scale}
          strokeLinecap="round"
        />
      ))}
      {JOINTS.map((name, index) => (
        <circle
          key={name}
          ref={(element) => {
            jointRefs.current[index] = element;
          }}
          visibility="hidden"
          r={3 * scale}
          fill="none"
          stroke={JOINT_COLOR}
          strokeWidth={1.5 * scale}
        />
      ))}
    </svg>
  );
};

export default SkeletonOverlay;
