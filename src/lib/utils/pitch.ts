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