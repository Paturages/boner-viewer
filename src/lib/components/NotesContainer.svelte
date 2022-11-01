<script lang="ts">
  import * as Tone from 'tone';
  import type { Chart } from "../types";
  import HorizontalGrid from "./HorizontalGrid.svelte";
  import { pitchToHertz, JOIN_ERROR_MARGIN } from '../utils/pitch';

  export let noteSpacing: number = 150;
  export let offset: number = 0;
  export let chart: Chart;
  
  const toot = new Tone.AMOscillator({ type: "sawtooth8", modulationType: "square4" }).toDestination();
  toot.volume.value = -10;

  const PITCH_MULT = 2.4;
  const DELTA_MULT = PITCH_MULT / 2;

  const getX = (position: number, noteSpacing: number) => position * noteSpacing;
  const getY = (pitch: number) => 500 - (pitch * PITCH_MULT);
  const getLength = (length: number, noteSpacing: number) => length * noteSpacing;
  const getPath = (position: number, length: number, pitchStart: number, pitchDelta: number, pitchEnd: number) => {
    const startingPoint = `M${getX(position, noteSpacing)},${getY(pitchStart)}`;
    const curve1 = `s${getLength(length, noteSpacing) / 4},0 ${getLength(length, noteSpacing) / 2},${-pitchDelta * DELTA_MULT}`;
    const curve2 = `s${getLength(length, noteSpacing) / 2},${-pitchDelta * DELTA_MULT} ${getLength(length, noteSpacing) / 2},${-pitchDelta * DELTA_MULT}`
    return `${startingPoint} ${curve1} ${curve2}`;
  }
  const onNoteMousedown = (pitchStart: number, pitchEnd: number, length: number) => {
    const seconds = length * 60 / chart.tempo;
    toot.frequency.value = pitchToHertz(pitchStart);
    toot.frequency.rampTo(pitchToHertz(pitchEnd), seconds, '+' + seconds/2);
    const onNoteMouseup = () => {
      toot.stop();
      window.removeEventListener('mouseup', onNoteMouseup);
    }
    toot.start();
    window.addEventListener('mouseup', onNoteMouseup);
  }
</script>

<svg
  class="note-container"
  viewBox={`${getX(offset, noteSpacing) - 102} 0 3000 1000`}
>
  <!--
    The markers are used for note beginning (big circle, "note-start")
    and for slider checkpoints (tiny circle pin, "note-mid")
  -->
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
  <!--
    The horizontal grid is embedded within the notes SVG container
    because scrolling is handled through the SVG viewbox property,
    and the horizontal grid has to scroll too so...
  -->
  <HorizontalGrid noteSpacing={noteSpacing} chart={chart} />
  <!--
    Loop 1: Paint the backing white paths for the note outlines
  -->
  {#each chart.notes as [position, length, pitchStart, pitchDelta, pitchEnd], i}
    {#if !chart.notes[i+1] || (position + length + JOIN_ERROR_MARGIN) < chart.notes[i+1][0]}
      <line
        x1={getX(position + length, noteSpacing) - 3}
        x2={getX(position + length, noteSpacing)}
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
        `M${getX(position, noteSpacing)},${getY(pitchStart)} l${getLength(length, noteSpacing)},0`}
    />
  {/each}
  <!--
    Loop 2: Paint the actual notes
  -->
  {#each chart.notes as [position, length, pitchStart, pitchDelta, pitchEnd], i}
    <path
      on:mousedown={() => onNoteMousedown(pitchStart, pitchEnd, length)}
      fill="none"
      marker-start={chart.notes[i-1] && (chart.notes[i-1][0] + chart.notes[i-1][1] + JOIN_ERROR_MARGIN) >= position ? 'url(#note-mid)' : 'url(#note-start)'}
      stroke="#5566aa"
      stroke-width={20}
      stroke-linecap="round"
      d={pitchDelta ?
        getPath(position, length, pitchStart, pitchDelta, pitchEnd) :
        `M${getX(position, noteSpacing)},${getY(pitchStart)} l${getLength(length, noteSpacing)},0`}
    />
  {/each}
  <!--
    Add lyrics at the bottom
  -->
  {#if chart.lyrics}
    {#each chart.lyrics as lyric}
      <text class="lyric" x={getX(lyric.bar, noteSpacing)} y={930}>{lyric.text}</text>
    {/each}
  {/if}
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
  .lyric {
    fill: #fff;
    font-size: 1.25em;
  }
</style>