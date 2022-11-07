<script lang="ts">
  export let value = 100;
  export let onChange: (value: number) => void = () => {};

  const handleChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    onChange(Number(target.value));
  }
</script>

<div class="playback-rate" title="Playback rate">
  <div class="label">⏲️</div>
  <input type="range" bind:value on:input={handleChange} step={5} min={25} max={200} />
  <div class="value">{value}%</div>
</div>

<style>
  .playback-rate {
    padding: 5px 0;
    display: flex;
    align-items: center;
  }
  .value {
    width: 40px;
  }
</style>