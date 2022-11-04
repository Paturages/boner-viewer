<script lang="ts">
  import { onMount } from "svelte";
  import * as Tone from 'tone';
  
  import type { Chart } from "./lib/types";

  import { oscillatorSettings, pitchToHertz, positionToTicks, JOIN_ERROR_MARGIN } from "./lib/utils/pitch";
  import { readNrbf } from './lib/utils/nrbf';

  import NotesContainer from './lib/components/NotesContainer.svelte';
  import VerticalGrid from './lib/components/VerticalGrid.svelte';
  import Seeker from './lib/components/Seeker.svelte';
  import Zoomer from './lib/components/Zoomer.svelte';
  import PlaybackRate from './lib/components/PlaybackRate.svelte';
  import Volume from './lib/components/Volume.svelte';
  import Metadata from './lib/components/Metadata.svelte';

  let loading = false;
  let isTryingToDragOver = false;
  let hasError = false;
  let isPlaying = false;

  let noteSpacing = 200;
  let playbackRate = 100;
  let zoom = 100;
  let snap = 0.5;
  let offset = 0;
  let tootVolume = Number(localStorage.getItem('volume:toot') || 100);
  let musicVolume = Number(localStorage.getItem('volume:music') || 100);

  let chart: Chart = null;
  let player: Tone.Player = null;

  // https://github.com/Tonejs/Tone.js/wiki/Performance#contextlatencyhint
  // We want low values to improve focus on sync and timing precision
  // (at the expense of resources and a bit more scuffiness)
  Tone.getContext().dispose();
  const toneContext = new Tone.Context({
    latencyHint : "interactive",
    lookAhead: 0,
    updateInterval: 0.01
  });
  Tone.setContext(toneContext);

  const toot = new Tone.Oscillator(oscillatorSettings).chain(toneContext.destination);
  const pitchShift = new Tone.PitchShift(0);

  const loadFile = (file: File) => {
    loading = true;
    const reader = new FileReader();

    // .tmb files: either JSON (custom songs) or NRBF (base game)
    // Try JSON first (most common)
    if (file.name.endsWith('.tmb')) {
      reader.onload = loadEvent => {
        toot.volume.value = Math.log(tootVolume / 100) * 10;

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
        chart.tempo = Number(chart.tempo);
        // Adjust zoom according to note spacing
        noteSpacing = chart.savednotespacing * (zoom / 100) * 2.4;

        // Configure transport for playback
        toneContext.transport.cancel(0);
        toneContext.transport.bpm.value = chart.tempo;
        toneContext.transport.timeSignature = chart.timesig;
        chart.notes.forEach(([position, length, pitchStart, pitchDelta, pitchEnd], index) => {
          const previousNote = chart.notes[index - 1];
          const nextNote = chart.notes[index + 1];
          toneContext.transport.schedule(() => {
            const lengthTicks = positionToTicks(length);
            toot.frequency.value = pitchToHertz(pitchStart);
            if (pitchStart !== pitchEnd) {
              toot.frequency.rampTo(pitchToHertz(pitchEnd), lengthTicks + 'i');
            }
            // Don't start the note if the previous note is joined to the current note
            if (!previousNote || previousNote[0] + previousNote[1] + JOIN_ERROR_MARGIN < position) {
              toot.start();
            }
            // Don't stop the note if the next note is joined to the current note
            // Also add a bit of length because lookAhead=0 seems to shorten notes a fair amount
            if (!nextNote || position + length + JOIN_ERROR_MARGIN < nextNote[0]) {
              toot.stop(`+${lengthTicks + 16}i`);
            }
          }, `${positionToTicks(position)}i`);
        });
        
        console.log(chart);
        offset = -1;
        playbackRate = 100;
        pitchShift.pitch = 0;
      }
      reader.readAsArrayBuffer(file);
    } else {
      // Try to load audio file
      try {
        reader.onload = loadEvent => {
          const dataUrl = loadEvent.target.result as string;
          const newPlayer = new Tone.Player(dataUrl, () => {
            console.log('Audio loaded');
            player = newPlayer;
            player.volume.value = Math.log(musicVolume / 100) * 10;
          }).chain(pitchShift, toneContext.destination);
          newPlayer.volume.value = -10;
        };
        reader.readAsDataURL(file);
      } catch (err) {
        console.error(err);
        hasError = true;
      }
    }
    loading = false;
  }

  const unload = () => {
    if (player) player.dispose();
    chart = null;
    player = null;
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
      case ' ': isPlaying ? pause() : play();
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

  // Playback loop reference: https://developer.mozilla.org/en-US/docs/Games/Anatomy
  const playback = () => {
    if (!chart || !isPlaying) return;
    window.requestAnimationFrame(playback);
    offset = toneContext.transport.ticks / 192;
    if (offset > chart.endpoint) pause();
  }
  
  // Sidenotes on player.sync():
  // Syncing the player to the transport will work at 100% speed nicely,
  // but with different rates, the starting point needs to be recalculated accordingly
  // because 1s in the player at a non-100% playback rate is not 1s anymore...
  // and the duration also needs to be recalculated...
  // (and you can't predict how long it's gonna play because rate can be changed during playback)
  // Therefore, let's just not sync the player to the transport, it's probably easier that way
  const play = async () => {
    if (!chart) return;
    // Start toot engine
    await Tone.start();
    await toneContext.resume();
    isPlaying = true;
    const positionTicks = positionToTicks(offset);
    toneContext.transport.ticks = positionTicks;
    if (player) {
      const startTime = positionTicks < 0 ? `+${-positionTicks}i` : '+0';
      const offsetTime = positionTicks < 0 ? 0 : toneContext.transport.seconds * playbackRate / 100;
      player.start(startTime, offsetTime);
    }
    toneContext.transport.start('+0');
    playback();
  }

  const pause = () => {
    if (!chart) return;
    isPlaying = false;
    toot.stop();
    if (player) player.stop();
    toneContext.transport.stop();
  }

  const onTootVolumeChange = (percent: number) => {
    localStorage.setItem('volume:toot', String(percent));
    tootVolume = percent;
    toot.volume.value = Math.log(percent / 100) * 10;
  }
  
  const onMusicVolumeChange = (percent: number) => {
    localStorage.setItem('volume:music', String(percent));
    musicVolume = percent;
    if (player) player.volume.value = Math.log(percent / 100) * 10;
  }
  
  const onPlaybackRateChange = (percent: number) => {
    if (player) player.playbackRate = percent / 100;
    toneContext.transport.bpm.value = chart.tempo * (percent / 100);
    // By default, 50% down-pitches by one octave, 200% up-pitches by one octave
    // (hence the logarithmic scale, and one octave = 12 semi-tones)
    // We want to repitch the player in order for toots to still make sense
    pitchShift.pitch = -Math.log2(percent / 100) * 12;
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
    <div class="toolbar-top">
      <div class="toolbar-top-container">
        <Zoomer bind:value={zoom} onChange={onZoom} />
        <PlaybackRate bind:value={playbackRate} onChange={onPlaybackRateChange} />
      </div>
      <Volume bind:tootValue={tootVolume} bind:musicValue={musicVolume} onTootChange={onTootVolumeChange} onMusicChange={onMusicVolumeChange} />
    </div>
    <div class="toolbar-bottom">
      <button class="play-pause" title={isPlaying ? 'Pause' : 'Play'} on:click={isPlaying ? pause : play}>{isPlaying ? '⏸️' : '▶️'}</button>
      <label class="audio-info" for="audio-input">
        {player ? 'Music loaded' : 'No music'}<br />
        Click to upload
        <input id="audio-input" type="file" on:change={onFileInput} />
      </label>
      <Metadata chart={chart} />
      <button class="unload" title="Unload the chart" on:click={unload}>🗑️</button>
    </div>
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

  .toolbar-top, .toolbar-bottom {
    position: absolute;
    bottom: 30px;
    right: 0;
    display: flex;
  }
  .toolbar-top {
    bottom: 80px;
  }

  .audio-info {
    user-select: none;
    position: relative;
    background: #444;
    border-left: 1px solid #fff3;
    border-right: 1px solid #fff3;
    padding: 2px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #audio-input {
    position: absolute;
    left: 0;
    opacity: 0;
    font-size: 0;
    z-index: -1;
  }

  .unload, .play-pause {
    appearance: none;
    outline: none;
    border: 2px solid #fff3;
    background: #444;
    height: 50px;
    width: 50px;
    font-size: 1.5em;
  }

  .unload:hover {
    background: #666;
  }
</style>