<script lang="ts">
  import type { Chart } from '../types';
  import { getLength } from '../utils/metadata';

  // The horizontal grid (beatlines) are embedded inside the note container SVG
  // since they have to scroll along
  export let noteSpacing: number = 150;
  export let chart: Chart;

  interface Beatline {
    width: number;
    color: string;
    offset: number;
    measure?: number;
  }

  let beatlinesArray: Beatline[] = [];

  $: {
    const lines: Record<number, Beatline> = {};
    // 1. Generate quarter beats
    for (let i = 0; i <= chart.endpoint; i += 0.25) {
      lines[i] = { width: 1, color: '#fff2', offset: i };
    }
    // 2. Generate half beats
    for (let i = 0; i <= chart.endpoint; i += 0.5) {
      lines[i] = { width: 1, color: '#fff6', offset: i };
    }
    // 3. Generate whole beats
    for (let i = 0; i < chart.endpoint; i += 1) {
      lines[i] = { width: 2, color: '#fff8', offset: i };
    }
    // 4. Generate measures
    for (let i = 0; i < chart.endpoint; i += chart.timesig) {
      lines[i] = { width: 3, color: '#fffa', offset: i, measure: 1 + (i / chart.timesig) };
    }
    beatlinesArray = Object.values(lines).sort((a, b) => a.offset - b.offset);
  }
</script>

{#each beatlinesArray as beatline}
  <line
    x1={beatline.offset * noteSpacing}
    x2={beatline.offset * noteSpacing}
    y1={0}
    y2={1000}
    stroke={beatline.color}
    stroke-width={beatline.width}
  />
  {#if beatline.measure}
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
</style>