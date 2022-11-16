<script lang="ts">
  import * as Tone from 'tone';
  import type { Chart, Lyric } from "../types";
  import { oscillatorSettings, pitchToHertz } from '../utils/tone';
  import { FLOAT_ERROR_MARGIN } from '../utils/misc';
  
  import HorizontalGrid from "./HorizontalGrid.svelte";

  export let noteSpacing: number = 150;
  export let offset: number = 0;
  export let snap: number;
  export let chart: Chart;
  export let enableLyricsEditor: boolean;
  export let onChartChange: (chart: Chart, property: string) => void;

  let selectedLyric: Lyric;
  let lyricsInputX: number;
  let lyricElement: HTMLInputElement;
  
  const toot = new Tone.Oscillator(oscillatorSettings).toDestination();
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
  const onLyricClick = ($event: MouseEvent, offset: number) => {
    // Spawn a text input for the lyric at its current position
    // Having the input scroll away on navigation would be weird,
    // so it's fine having it positioned outside of the SVG, with
    // fixed positioning despite chart scroll.
    // ...and also embedding an <input> inside of an <svg> doesn't work.
    const target = $event.target as HTMLElement;
    lyricsInputX = target.getBoundingClientRect().left;
    selectedLyric = chart.lyrics.find(lyric => lyric.bar === offset) || { bar: offset, text: '?' };
    setTimeout(() => {
      lyricElement.focus();
      lyricElement.select();
    });
  }
  const onLyricAuxClick = ($event: MouseEvent, lyricToDelete: Lyric) => {
    if ($event.button === 1) {
      onChartChange({ ...chart, lyrics: chart.lyrics.filter(lyric => lyric !== lyricToDelete) }, 'lyrics');
    }
  }
  const onLyricChange = () => {
    if (!lyricElement.value) return;
    const newLyrics = [];
    let isLyricInserted = false;
    chart.lyrics.forEach(lyric => {
      if (lyric.bar === selectedLyric.bar) {
        newLyrics.push({ ...lyric, text: lyricElement.value });
        isLyricInserted = true;
      } else if (!isLyricInserted && lyric.bar > selectedLyric.bar) {
        newLyrics.push({ ...selectedLyric, text: lyricElement.value });
        newLyrics.push(lyric);
        isLyricInserted = true;
      } else {
        newLyrics.push(lyric);
      }
    });
    if (!isLyricInserted) {
      newLyrics.push({ ...selectedLyric, text: lyricElement.value });
    }
    selectedLyric = null;
    onChartChange({ ...chart, lyrics: newLyrics }, 'lyrics');
  }
  const stopPropagation = ($event: Event) => $event.stopPropagation();
</script>

{#if selectedLyric}
  <form on:submit={onLyricChange}>
    <input
      class="lyric-input"
      style:left={lyricsInputX + 'px'}
      bind:this={lyricElement}
      type="text"
      value={selectedLyric.text}
      on:blur={onLyricChange}
      on:input={stopPropagation}
    />
  </form>
{/if}
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
  <HorizontalGrid
    offset={offset}
    noteSpacing={noteSpacing}
    snap={snap}
    chart={chart}
    onLyricAdd={onLyricClick}
    enableLyricsEditor={enableLyricsEditor}
  />
  <!--
    Loop 1: Paint the backing white paths for the note outlines
  -->
  {#each chart.notes as [position, length, pitchStart, pitchDelta, pitchEnd], i}
    {#if !chart.notes[i+1] || (position + length + FLOAT_ERROR_MARGIN) < chart.notes[i+1][0]}
      <line
        class="note-outline"
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
      class="note-outline"
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
      class="note"
      on:mousedown={() => onNoteMousedown(pitchStart, pitchEnd, length)}
      fill="none"
      marker-start={chart.notes[i-1] && (chart.notes[i-1][0] + chart.notes[i-1][1] + FLOAT_ERROR_MARGIN) >= position ? 'url(#note-mid)' : 'url(#note-start)'}
      stroke="#5566aa"
      stroke-width={20}
      stroke-linecap="round"
      d={pitchDelta ?
        getPath(position, length, pitchStart, pitchDelta, pitchEnd) :
        `M${getX(position, noteSpacing)},${getY(pitchStart)} l${getLength(length, noteSpacing)},0`}
    />
  {/each}
  <!-- Add lyrics at the bottom -->
  {#if chart.lyrics}
    {#each chart.lyrics as lyric}
      <text
        class="lyric"
        class:lyrics-editor-enabled={enableLyricsEditor}
        x={getX(lyric.bar, noteSpacing)}
        y={930}
        on:click={$event => onLyricClick($event, lyric.bar)}
        on:auxclick={$event => onLyricAuxClick($event, lyric)}
      >
        {selectedLyric === lyric.bar ? '<editing...>' : (lyric.text || '<empty>')}
      </text>
    {/each}
  {/if}
</svg>

<style>
  svg {
    z-index: 1;
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
  .lyrics-editor-enabled {
    cursor: pointer;
  }
  .lyric-input {
    z-index: 9;
    position: fixed;
    bottom: 100px;
    font-size: 1.25em;
    font-family: 'Courier New', Courier, monospace;
  }
  .note:hover {
    stroke-width: 22;
  }
</style>