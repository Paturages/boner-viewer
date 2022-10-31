<script lang="ts">
  import { onMount } from "svelte";
  
  import type { Chart } from "./lib/types";

  import { readNrbf } from './lib/utils/nrbf';

  import NotesContainer from './lib/components/NotesContainer.svelte';
  import VerticalGrid from './lib/components/VerticalGrid.svelte';
  import Seeker from './lib/components/Seeker.svelte';
  import Zoomer from './lib/components/Zoomer.svelte';
  import Metadata from './lib/components/Metadata.svelte';

  let loading = false;
  let isTryingToDragOver = false;
  let hasError = false;

  let noteSpacing = 200;
  let zoom = 100;
  let snap = 0.5;
  let offset = 0;

  let chart: Chart = null;
  let audio = null;
  let background = null;

  const loadFile = (file: File) => {
    loading = true;
    const reader = new FileReader();

    // .tmb files: either JSON (custom songs) or NRBF (base game)
    // Try JSON first (most common)
    if (file.name.endsWith('.tmb')) {
      reader.onload = loadEvent => {
        const buffer = loadEvent.target.result as ArrayBuffer;
        const view = new Uint8Array(buffer);
        if (String.fromCharCode(view[0]) == '{') {
          chart = JSON.parse(String.fromCharCode(...view));
        } else {
          const nrbf: any = readNrbf(view);
          if (nrbf.failed) {
            hasError = true;
            loading = false;
            throw new Error('File is not a JSON, and NRBF parsing failed');
          }
          chart = {
            author: 'Trombone Champ',
            name: file.name.split('.')[0],
            description: 'Base game .tmb (not a JSON)',
            shortName: file.name.split('.')[0],
            trackRef: file.name.split('.')[0],
            genre: '?',
            year: '?',
            difficulty: -1,
            savednotespacing: nrbf.data.savednotespacing,
            tempo: nrbf.data.tempo,
            timesig: nrbf.data.timesig,
            endpoint: nrbf.data.endpoint,
            UNK1: 0,
            notes: nrbf.data.savedleveldata._items.filter(x => x),
            lyrics: nrbf.data.lyricspos._items.map(
              (arr, index) => arr ? ({
                bar: arr[0],
                text: nrbf.data.lyricstxt._items[index]
              }) : null
            ).filter(x => x)
          }
        }

        // Force some stuff to be the right type for cleaner logic
        chart.timesig = Number(chart.timesig);
        // Adjust zoom according to note spacing
        noteSpacing = chart.savednotespacing * (zoom / 100) * 2.4;
        
        console.log(chart);
        offset = -1;
      }
      reader.readAsArrayBuffer(file);
    } else {
      hasError = true;
    }
    loading = false;
  }

  const unload = () => {
    chart = null;
    audio = null;
    background = null;
    hasError = false;
    loading = false;
  }

  const onFileInput = $event => {
    if (!$event.target.files || !$event.target.files.length) return;
    for (const file of $event.target.files) {
      loadFile(file);
    }
  }

  const onFileDrop = ($event: DragEvent) => {
    $event.preventDefault();
    isTryingToDragOver = false;
    if (!$event.dataTransfer.items || !$event.dataTransfer.items.length) return;
    for (const item of $event.dataTransfer.items) {
      loadFile(item.getAsFile());
    }
  }

  const clampBackwards = () => {
    const unsnapSurplus = offset % snap;
    offset = Math.max(-1, offset - (unsnapSurplus || snap));
  }

  const clampForwards = () => {
    const unsnapSurplus = offset % snap;
    offset = Math.min(chart.endpoint - 1, offset + (unsnapSurplus ? (snap - unsnapSurplus) : snap));
  }

  const onWheel = ($event: WheelEvent) => {
    $event.preventDefault();
    if (!chart) return;
    // Positive = downwards
    if ($event.deltaY > 0) {
      clampForwards();
    } else {
      clampBackwards();
    }
  }

  const onKeydown = ($event: KeyboardEvent) => {
    switch ($event.key) {
      case 'ArrowRight': clampForwards();
      break;
      case 'ArrowLeft': clampBackwards();
      break;
    }
  }

  const onSeek = (position: number) => {
    if (!chart) return;
    offset = position;
  }

  const onZoom = (zoomValue: number) => {
    noteSpacing = chart.savednotespacing * (zoomValue / 100) * 2.4;
  }

  onMount(() => window.addEventListener('keydown', onKeydown));
</script>

<main on:dragover={$event => {
  $event.preventDefault();
  isTryingToDragOver = true;
}} on:drop={onFileDrop} on:wheel={onWheel}>
  {#if isTryingToDragOver}
    <div class="dragover-overlay"></div>
  {/if}
  <VerticalGrid />
  <div class="strikeline"></div>
  {#if chart}
    <Seeker offset={offset} chart={chart} onSeek={onSeek} />
    <NotesContainer noteSpacing={noteSpacing} offset={offset} chart={chart} />
    <Metadata chart={chart} />
    <Zoomer bind:value={zoom} onChange={onZoom} />
    <button class="unload" title="Unload the chart" on:click={unload}>🗑️</button>
  {:else}
    <label class="instructions" for="file-input">
      {#if loading}
        <p>Loading...</p>
      {:else if hasError}
        <p>Loading failed! Are you sure this is a valid .tmb file?</p>
      {:else}
        <p>Drag a .tmb file here or click to upload</p>
      {/if}
      <input id="file-input" type="file" on:change={onFileInput} />
    </label>
  {/if}
</main>

<style>
  main {
    font-family: 'Courier New', Courier, monospace;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #222;
    color: #fff;
  }

  .strikeline {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 87px;
    width: 5px;
    border-left: 3px solid #000;
    border-right: 3px solid #000;
    background: #fff;
  }

  .dragover-overlay {
    z-index: 10;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 20px;
    background: #fff3;
    border-radius: 10px;
    border: 3px dashed #fff6;
  }

  .instructions {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 150px;
    display: flex;
    border-radius: 10px;
    border: 3px dashed #fff6;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .unload {
    appearance: none;
    outline: none;
    border: 2px solid #fff3;
    background: #444;
    position: absolute;
    bottom: 30px;
    right: 0;
    height: 50px;
    width: 50px;
    font-size: 1.5em;
  }

  .unload:hover {
    background: #666;
  }
</style>