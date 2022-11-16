<script lang="ts">
  import type { Chart } from "../types";
  import { debounce } from "../utils/misc";

  export let chart: Chart;
  export let onChartChange: (chart: Chart, property: string) => void;

  let elt: HTMLTextAreaElement;
  let textValue = '';
  // getLyricsText() gets triggered twice on textarea update:
  // once on the debounce resolve, and once if the value changes
  // as a result. This flag is here to short-circuit the second trigger.
  let isUpdating = false;

  const onInput = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    textValue = target.value;
    debounce(() => {
      const input = target.value.split('|');
      const newLyrics = chart.lyrics.map((lyric, index) => {
        const text = input[index] ? input[index].trim() : '';
        return { bar: lyric.bar, text };
      });
      onChartChange({ ...chart, lyrics: newLyrics }, 'lyrics');
    }, 750);
  }

  // Don't propagate keys or scroll to the global editor controls
  const stopPropagation = ($event: Event) => $event.stopPropagation();

  // This should only update the textarea value when `chart` gets updated
  const getLyricsText = (chart: Chart) => {
    if (!chart) return '';
    if (isUpdating) return textValue;
    // We want to preserve whitespace in the lyrics text for organization purposes
    // e.g. line breaks to organize lyrics into phrases, paragraphs for verses...
    const input = textValue.split('|');
    const overflow = input.slice(chart.lyrics.length).join('|');
    const newValue = chart.lyrics.map((lyric, index) => {
      if (!input[index] || !lyric.text) return `${index ? ' ' : ''}${lyric.text} `;
      const whitespaceParts = input[index].split(/[^\s]+/);
      const leadingWhitespace = whitespaceParts[0];
      const trailingWhitespace = whitespaceParts[whitespaceParts.length - 1];
      return `${leadingWhitespace}${lyric.text}${trailingWhitespace}`;
    }).join('|') + (overflow ? `|${overflow}` : '');
    // If the value is going to change, the textarea selection/position resets by default.
    // We want to preserve the position for quick iteration.
    if (newValue !== textValue && elt) {
      const start = elt.selectionStart;
      const end = elt.selectionEnd;
      isUpdating = true;
      setTimeout(() => {
        isUpdating = false;
        elt.setSelectionRange(start, end);
      }, 10);
    }
    textValue = newValue;
    return newValue;
  }
</script>

<textarea
  class="lyrics"
  value={getLyricsText(chart)}
  on:input={onInput}
  on:keydown={stopPropagation}
  on:wheel={stopPropagation}
  bind:this={elt}
/>

<style>
  .lyrics {
    z-index: 1;
    position: fixed;
    top: 196px;
    right: 0;
    width: 500px;
    height: 300px;
  }
</style>