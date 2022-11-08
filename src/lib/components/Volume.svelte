<script lang="ts">
  export let value = 100;
  export let onChange: (value: number) => void = () => {};
  export let icon: string;
  export let title: string;

  const handleChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    onChange(Number(target.value));
  }
</script>

<div class="volume" title={title}>
  <div class="label">{icon}</div>
  <input type="range" bind:value on:input={handleChange} step={1} min={0} max={100} />
  <div class="value">{value}%</div>
</div>

<style>
  .volume {
    padding: 5px 0;
    display: flex;
    align-items: center;
  }
  .value {
    width: 40px;
  }
</style>