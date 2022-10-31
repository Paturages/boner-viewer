<script lang="ts">
  export let value = 100;
  export let onChange: (value: number) => void = () => {};

  const handleChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    onChange(Number(target.value));
  }
</script>

<div class="zoomer">
  <div class="label">🔍</div>
  <input type="range" bind:value on:change={handleChange} step={5} min={10} max={200} />
  <div class="value">{value}%</div>
</div>

<style>
  .zoomer {
    position: absolute;
    bottom: 80px;
    right: 0;
    padding: 5px;
    background: #444;
    display: flex;
    align-items: center;
  }
  .value {
    width: 40px;
  }
</style>