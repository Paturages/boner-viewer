<script lang="ts">
  // "peakInfo" contains the amplitude information of the audio grouped by blocks
  // A waveform is basically a very long "line graph" (i.e. path) that represents
  // those values.

  export let offset: number;
  export let noteSpacing: number;
  export let audioEndpoint: number;
  export let peakInfo: { index: number; value: number; }[];

  // Due to the high amount of values to render (dozens of thousands),
  // we have to virtualize rendering for performance sake, i.e. only render
  // the visible range of the waveform at a time.
  const getVisiblePeakSlice = (peakInfo: { index: number; value: number; }[], offset: number) => {
    // startIndex = the peakInfo index which translates to x = -102
    const startIndex = Math.floor(peakInfo.length * ((offset * noteSpacing) - 102) / (audioEndpoint * noteSpacing));
    // endIndex = the peakInfo index which translates to x = 3000
    const endIndex = Math.floor(peakInfo.length * ((offset * noteSpacing) + 3000) / (audioEndpoint * noteSpacing));
    return peakInfo.slice(Math.max(0, startIndex), endIndex);
  }
</script>

{#if peakInfo && peakInfo.length}
<svg viewBox="-102 0 3000 1000">
  <path
    fill="none"
    stroke="#666"
    stroke-width={2}
    d={`M0,500 ${getVisiblePeakSlice(peakInfo, offset).reduce((str, item) => {
      const x = (item.index / peakInfo.length) * (audioEndpoint * noteSpacing) - (offset * noteSpacing);
      const y = 500 + (item.value * 1000);
      // We floor the values because less values = less parsing,
      // and I think non decimal values perform better?
      str += ` L${Math.floor(x)},${Math.floor(y)}`;
      return str;
    }, '')}`}
  />
</svg>
{/if}

<style>
  svg {
    user-select: none;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>