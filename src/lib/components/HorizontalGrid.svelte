<script lang="ts">
  import type { Chart } from '../types';
  import { getLength } from '../utils/metadata';
  import { FLOAT_ERROR_MARGIN } from '../utils/misc';
  import { snapPositionBackwards } from '../utils/rhythm';

  // The horizontal grid (beatlines) are embedded inside the note container SVG
  // since they have to scroll along
  export let offset: number;
  export let noteSpacing: number = 150;
  export let snap: number;
  export let enableLyricsEditor: boolean;
  export let onLyricAdd: ($event: MouseEvent, offset: number) => void;
  export let chart: Chart;

  interface Beatline {
    width: number;
    color: string;
    offset: number;
    measure?: number;
  }

  let beatlinesArray: Beatline[] = [];

  $: {
    // We only want to render the visible portion of the beatlines
    const startPosition = offset - 1;
    const endPosition = offset + (3000 / noteSpacing);

    const lines: Record<number, Beatline> = {};
    // Generate the snap's beats
    for (
      let i = Math.max(0, snapPositionBackwards(startPosition, snap));
      i <= Math.min(chart.endpoint, endPosition);
      i += snap
    ) {
      lines[i] = { width: 1, color: '#fff2', offset: i };
    }
    // If the snap lands on half beats, emphasize the half beats
    if (0.5 % snap < FLOAT_ERROR_MARGIN) {
      for (
        let i = Math.max(0, snapPositionBackwards(startPosition, 0.5));
        i <= Math.min(chart.endpoint, endPosition);
        i += 0.5
      ) {
        lines[i] = { width: 1, color: '#fff6', offset: i };
      }
    }
    // Always generate whole beats
    for (
      let i = Math.max(0, snapPositionBackwards(startPosition, 1));
      i < Math.min(chart.endpoint, endPosition);
      i += 1
    ) {
      lines[i] = { width: 2, color: '#fff8', offset: i };
    }
    // Always generate measures
    for (
      let i = Math.max(0, snapPositionBackwards(startPosition, chart.timesig));
      i < Math.min(chart.endpoint, endPosition);
      i += chart.timesig
    ) {
      lines[i] = { width: 3, color: '#fffa', offset: i, measure: (i / chart.timesig) };
    }
    beatlinesArray = Object.values(lines).sort((a, b) => a.offset - b.offset);
  }
</script>

{#each beatlinesArray as beatline}
  <!--
    This invisible rect is for hovering and capturing purposes:
    it highlights the next <line> thanks to the CSS, and can capture
    mouse clicks for editing purposes.
  -->
  {#if enableLyricsEditor}
    <rect
      x={beatline.offset * noteSpacing}
      y={0}
      width={snap * noteSpacing}
      height={1000}
      fill="transparent"
      on:dblclick={$event => onLyricAdd($event, beatline.offset)}
    />
  {/if}
  <line
    x1={beatline.offset * noteSpacing}
    x2={beatline.offset * noteSpacing}
    y1={0}
    y2={1000}
    stroke={beatline.color}
    stroke-width={beatline.width}
  />
  {#if beatline.measure !== undefined}
    <text class="measure" x={2 + beatline.offset * noteSpacing} y={20}>{beatline.measure}</text>
  {/if}
  {#if beatline.width >= 2}
    <text class="offset" x={2 + beatline.offset * noteSpacing} y={40}>{beatline.offset}</text>
    <text class="timestamp" x={2 + beatline.offset * noteSpacing} y={60}>{getLength(chart.tempo, beatline.offset, true)}</text>
  {/if}
{/each}

<style>
  .measure, .offset {
    font-family: 'Courier New', Courier, monospace;
  }
  .measure {
    fill: #fff;
    font-size: 1.25em;
  }
  .offset {
    fill: #fff9;
  }
  .timestamp {
    fill: #fff9;
  }
  rect:hover + line {
    stroke: #eee;
    stroke-width: 4;
  }
</style>