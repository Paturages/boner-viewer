import { FLOAT_ERROR_MARGIN } from "./misc";

// Denominator = the lower number in 1/4, 1/6, 1/12, etc...
// Snap = the fraction of chart offset that is being travelled
// on each scroll or left/right arrow key
export const denominatorToSnap = (denominator: number) => 4 / denominator;

// Snap the provided position backwards according to the temporal grid snap
export const snapPositionBackwards = (position: number, snap: number) => {
  const unsnapSurplus = position % snap;
  return position - (unsnapSurplus > FLOAT_ERROR_MARGIN ? unsnapSurplus : snap);
}

// Snap the provided position forwards according to the temporal grid snap
export const snapPositionForwards = (position: number, snap: number) => {
  const unsnapSurplus = position % snap;
  return position + (Math.abs(unsnapSurplus - snap) > FLOAT_ERROR_MARGIN ? snap - unsnapSurplus : snap);
}
