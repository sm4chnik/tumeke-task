import { BONE_PAIRS, JOINTS, POINTS_IN_PERSON } from '../constants';
import { decodeBase64 } from './base64';

const BYTES_PER_FRAME = POINTS_IN_PERSON * Float32Array.BYTES_PER_ELEMENT;

export type Skeleton = {
  points: Float32Array;
  frameCount: number;
};

export type Point = {
  x: number;
  y: number;
};

export const BONES: ReadonlyArray<readonly [number, number]> = BONE_PAIRS.map(
  ([from, to]) => [JOINTS.indexOf(from), JOINTS.indexOf(to)] as const,
);

export function parseSkeleton(base64: string): Skeleton {
  const bytes = decodeBase64(base64);
  if (bytes.byteLength === 0 || bytes.byteLength % BYTES_PER_FRAME !== 0) {
    throw new Error(
      `Skeleton file size ${bytes.byteLength} is not a multiple of ${BYTES_PER_FRAME} bytes`,
    );
  }
  return {
    points: new Float32Array(bytes.buffer),
    frameCount: bytes.byteLength / BYTES_PER_FRAME,
  };
}

// Missing joints are encoded as negative coordinates (-1)
export function getJoint(
  skeleton: Skeleton,
  frame: number,
  joint: number,
): Point | null {
  const offset = frame * POINTS_IN_PERSON + joint * 2;
  const x = skeleton.points[offset];
  const y = skeleton.points[offset + 1];
  if (x < 0 || y < 0) {
    return null;
  }
  return { x, y };
}

export function getFrameIndex(
  skeleton: Skeleton,
  mediaTime: number,
  duration: number,
): number {
  const fps = skeleton.frameCount / duration;
  // Small epsilon keeps exact frame timestamps from flooring to the previous frame
  const frame = Math.floor(mediaTime * fps + 0.01);
  return Math.min(Math.max(frame, 0), skeleton.frameCount - 1);
}
