// Playing around with https://tonejs.github.io/examples/oscillator
// (expliciting typing to make typescript happy idk)
export const oscillatorSettings: {
  type: 'custom';
  partials: number[];
} = {
  type: "custom",
  partials: [
    1, 1, 1, 1, 1, 0.8434636622299385, 0.25173912519290115, 0.19753086419753094,
    0.08608519000771608, 0.019775390625, 0.030140817901234556,
    0.030140817901234556, 0.012345679012345684, 0.012345679012345684,
    0.007236810378086415, 0.007236810378086415, 0.007236810378086415,
    0.00390625, 0.00390625, 0.00390625, 0.00390625, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0,
  ],
};

// In Trombone Champ, pitch = 0 is C4 (center)
// and one semitone = 13.75.
// Since hertzes are logarithmic (A4 = 440, A3 = 220, A2 = 110...),
// funny conversions have to happen between one to another...
// As a reference, A4 = 440 Hz = pitch 123.75, A3 = 220 Hz = pitch -41.25
export const pitchToHertz = (pitch: number) => {
  // Take A4 as the hertz reference and calculate the semitone gap
  // between the target note and A4
  const semitones = (pitch - 123.75) / 13.75;
  // Get the frequency ratio between A4 and the target note
  const ratio = Math.exp(semitones * Math.log(2) / 12);

  return 440 * ratio;
}

// By default, 192 ticks = 1 quarter note (4n)
// Trombone Champ chart position/index unit is a quarter note
export const positionToTicks = (position: number) => Math.floor(position * 192);

// This allows for some margin of error for slider joining,
// but for the sake of strictness, this is disabled
export const JOIN_ERROR_MARGIN = 0;
// export const JOIN_ERROR_MARGIN = 0.001;
