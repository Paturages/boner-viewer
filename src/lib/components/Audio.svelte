<script lang="ts">
  import type { Player } from 'tone';
  import { toHumanTime } from '../utils/metadata';

  export let player: Player;
  export let onFileInput: ($event: Event) => void;

  let fileName: string;

  const handleFileInput = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    fileName = target.files[0].name;
    onFileInput($event);
  }

  const getLengthFromPlayer = (player: Player) => {
    return toHumanTime(player.buffer.length / player.buffer.sampleRate);
  }
</script>

{#if player}
  <label class="audio-info" for="audio-input" title="Click to change audio or chart">
    {fileName}<br />
    {getLengthFromPlayer(player)}
    <input id="audio-input" type="file" on:change={handleFileInput} />
  </label>
{:else}
  <label class="audio-info" for="audio-input">
    No music<br />
    Click to upload
    <input id="audio-input" type="file" on:change={handleFileInput} />
  </label>
{/if}

<style>
  .audio-info {
    cursor: pointer;
    user-select: none;
    position: relative;
    background: #444;
    border-left: 1px solid #fff3;
    border-right: 1px solid #fff3;
    padding: 5px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .audio-info:hover {
    background: #666;
  }

  #audio-input {
    position: absolute;
    left: 0;
    opacity: 0;
    font-size: 0;
    z-index: -1;
  }
</style>