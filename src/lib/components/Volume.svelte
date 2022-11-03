<script lang="ts">
  export let tootValue = 100;
  export let musicValue = 100;
  export let onTootChange: (value: number) => void = () => {};
  export let onMusicChange: (value: number) => void = () => {};

  const handleTootChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    onTootChange(Number(target.value));
  }
  const handleMusicChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    onMusicChange(Number(target.value));
  }
</script>

<div class="volume">
  <div class="toot-volume" title="Trombone volume">
    <div class="label">📯</div>
    <input type="range" bind:value={tootValue} on:input={handleTootChange} step={1} min={0} max={100} />
    <div class="value">{tootValue}%</div>
  </div>
  <div class="music-volume" title="Music volume">
    <div class="label">🎵</div>
    <input type="range" bind:value={musicValue} on:input={handleMusicChange} step={1} min={0} max={100} />
    <div class="value">{musicValue}%</div>
  </div>
</div>

<style>
  .toot-volume, .music-volume {
    padding: 5px;
    background: #444;
    display: flex;
    align-items: center;
  }
  .value {
    width: 40px;
  }
</style>