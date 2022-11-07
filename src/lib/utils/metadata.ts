export const getLength = (tempo: number, position: number, showMilliseconds: boolean = false) => {
  const mult = 60 / tempo;
  const totalSeconds = mult * Math.max(0, position);
  return toHumanTime(totalSeconds, showMilliseconds);
};

export const toHumanTime = (totalSeconds: number, showMilliseconds: boolean = false) => {
  const minutes = String(Math.floor(totalSeconds / 60));
  const seconds = String(Math.floor(totalSeconds % 60)).padStart(2, "0");
  if (!showMilliseconds) return `${minutes}:${seconds}`;
  const milliseconds = String(Math.floor((totalSeconds % 1) * 1000)).padStart(3, "0");
  return `${minutes}:${seconds}.${milliseconds}`;
}
