const ALPHABET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

const LOOKUP = new Uint8Array(128);
for (let i = 0; i < ALPHABET.length; i++) {
  LOOKUP[ALPHABET.charCodeAt(i)] = i;
}

// Arithmetic instead of bit shifts: airbnb config forbids bitwise operators
export function decodeBase64(input: string): Uint8Array {
  const clean = input.replace(/[^A-Za-z0-9+/]/g, '');
  const bytes = new Uint8Array(Math.floor((clean.length * 3) / 4));
  let byteIndex = 0;

  for (let i = 0; i < clean.length; i += 4) {
    const a = LOOKUP[clean.charCodeAt(i)];
    const b = LOOKUP[clean.charCodeAt(i + 1)];
    const c = LOOKUP[clean.charCodeAt(i + 2)];
    const d = LOOKUP[clean.charCodeAt(i + 3)];

    bytes[byteIndex] = a * 4 + Math.floor(b / 16);
    if (i + 2 < clean.length) {
      bytes[byteIndex + 1] = (b % 16) * 16 + Math.floor(c / 4);
    }
    if (i + 3 < clean.length) {
      bytes[byteIndex + 2] = (c % 4) * 64 + d;
    }
    byteIndex += 3;
  }

  return bytes;
}
