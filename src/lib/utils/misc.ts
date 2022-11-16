// This allows for some margin of error for slider joining
// as well as calculations involving fractional offsets,
// mainly because of JavaScript's funny float sum handling
// (I hope no one's gonna be that anal about precision)
export const FLOAT_ERROR_MARGIN = 0.000001;

// Debounce: Fire it x times in delayMs milliseconds,
// only call the callback once. A good practice to throttle
// e.g. lyrics processing while typing.
let debounceTimeoutId: string;
export const debounce = (callback: Function, delayMs: number) => {
  if (debounceTimeoutId) clearTimeout(debounceTimeoutId);
  setTimeout(callback, delayMs);
};

export const download = (fileName: string, content: string) => {
  const blob = URL.createObjectURL(
    new Blob([content], { type: "application/tmb" })
  );
  const link = document.createElement('a');
  link.href = blob;
  link.download = fileName;
  link.click();
};
