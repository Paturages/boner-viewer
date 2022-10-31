<script lang="ts">
  import type { Chart } from "../types";
  import HorizontalGrid from "./HorizontalGrid.svelte";

  export let zoom: number = 150;
  export let offset: number = 0;
  export let chart: Chart;

  const PITCH_MULT = 2.4;
  const DELTA_MULT = PITCH_MULT / 2;

  const getX = (position: number) => position * zoom;
  const getY = (pitch: number) => 500 - (pitch * PITCH_MULT);
  const getLength = (length: number) => length * zoom;
  const getPath = (position: number, length: number, pitchStart: number, pitchDelta: number, pitchEnd: number) => {
    const startingPoint = `M${getX(position)},${getY(pitchStart)}`;
    const curve1 = `s${getLength(length) / 4},0 ${getLength(length) / 2},${-pitchDelta * DELTA_MULT}`;
    const curve2 = `s${getLength(length) / 2},${-pitchDelta * DELTA_MULT} ${getLength(length) / 2},${-pitchDelta * DELTA_MULT}`
    return `${startingPoint} ${curve1} ${curve2}`;
  }
</script>

<svg
  class="note-container"
  viewBox={`${offset * zoom} 0 3000 1000`}
>
  <defs>
    <marker
      id="note-start"
      refX={50}
      refY={50}
      markerHeight={2}
      markerWidth={2}
      viewBox="0 0 100 100"
    >
      <circle cx={50} cy={50} r={45} stroke="#fff" stroke-width={10} fill="#5566aa" />
    </marker>
    <marker
      id="note-mid"
      refX={50}
      refY={50}
      markerHeight={2}
      markerWidth={2}
      viewBox="0 0 100 100"
    >
      <circle cx={50} cy={50} r={10} stroke="#fff" stroke-width={5} fill="#5566aa" />
    </marker>
  </defs>
  <HorizontalGrid zoom={zoom} chart={chart} />
  {#each chart.notes as [position, length, pitchStart, pitchDelta, pitchEnd], i}
    {#if !chart.notes[i+1] || position + length < chart.notes[i+1][0]}
      <line
        x1={getX(position + length) - 3}
        x2={getX(position + length)}
        y1={getY(pitchEnd)}
        y2={getY(pitchEnd)}
        stroke="#fff"
        stroke-width={25}
        stroke-linecap="round"
      />
    {/if}
    <path
      fill="none"
      stroke="#fff"
      stroke-width={25}
      stroke-linecap="butt"
      d={pitchDelta ?
        getPath(position, length, pitchStart, pitchDelta, pitchEnd) :
        `M${getX(position)},${getY(pitchStart)} l${getLength(length)},0`}
    />
  {/each}
  {#each chart.notes as [position, length, pitchStart, pitchDelta, pitchEnd], i}
    <path
      fill="none"
      marker-start={chart.notes[i-1] && chart.notes[i-1][0] + chart.notes[i-1][1] >= position ? 'url(#note-mid)' : 'url(#note-start)'}
      stroke="#5566aa"
      stroke-width={20}
      stroke-linecap="round"
      d={pitchDelta ?
        getPath(position, length, pitchStart, pitchDelta, pitchEnd) :
        `M${getX(position)},${getY(pitchStart)} l${getLength(length)},0`}
    />
  {/each}
</svg>

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