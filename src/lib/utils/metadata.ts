export const getLength = (tempo: number, position: number, showMilliseconds: boolean = false) => {
  const mult = 60 / tempo;
  const total = mult * Math.max(0, position);
  const minutes = String(Math.floor(total / 60));
  const seconds = String(Math.floor(total % 60)).padStart(2, "0");
  if (!showMilliseconds) return `${minutes}:${seconds}`;
  const milliseconds = String(Math.floor((total % 1) * 1000)).padStart(3, "0");
  return `${minutes}:${seconds}.${milliseconds}`;
};
