// The order of joints in a binary file
export const JOINTS = [
  'RANKLE',
  'RKNEE',
  'RHIP',
  'LHIP',
  'LKNEE',
  'LANKLE',
  'PELV',
  'THRX',
  'NECK',
  'HEAD',
  'RWRIST',
  'RELBOW',
  'RSHOULDER',
  'LSHOULDER',
  'LELBOW',
  'LWRIST',
  'NOSE',
  'REYE',
  'REAR',
  'LEYE',
  'LEAR',
  'RTOE',
  'LTOE',
  'RHEEL',
  'LHEEL',
];

// A pair of joints to display the skeleton bone
export const BONE_PAIRS = [
  ['RANKLE', 'RKNEE'],
  ['RKNEE', 'RHIP'],
  ['LANKLE', 'LKNEE'],
  ['LKNEE', 'LHIP'],
  ['RHIP', 'LHIP'],
  ['RHIP', 'RSHOULDER'],
  ['LHIP', 'LSHOULDER'],
  ['RSHOULDER', 'LSHOULDER'],
  ['LSHOULDER', 'LELBOW'],
  ['LELBOW', 'LWRIST'],
  ['RSHOULDER', 'RELBOW'],
  ['RELBOW', 'RWRIST'],
  ['LANKLE', 'LTOE'],
  ['RANKLE', 'RTOE'],
  ['LANKLE', 'LHEEL'],
  ['RANKLE', 'RHEEL'],
  ['NECK', 'HEAD'],
];

// Total number of skeleton points (x and y) per frame
export const POINTS_IN_PERSON = JOINTS.length * 2;
