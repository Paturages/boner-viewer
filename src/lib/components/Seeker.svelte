<script lang="ts">
  import type { Chart } from "../types";
  import { getLength } from '../utils/metadata';

  export let offset: number = 0;
  export let chart: Chart;
  export let onSeek: (position: number) => void = () => {};
  let seekerElt: Element;

  const updateSeeker = (clientX: number) => {
    if (clientX < 95) return onSeek(-2);
    const progress = Math.min(1, (clientX - 95) / (seekerElt.clientWidth - 95));
    onSeek(progress * chart.endpoint);
  }

  const onMousemove = ($event: MouseEvent) => {
    $event.preventDefault();
    const { clientX } = $event;
    window.requestAnimationFrame(() => updateSeeker(clientX));
  }

  const onMousedown = ($event: MouseEvent) => {
    const { clientX } = $event;
    updateSeeker(clientX);
    window.addEventListener('mousemove', onMousemove);
    window.addEventListener('mouseup', onMouseup);
  }

  const onMouseup = () => {
    window.removeEventListener('mousemove', onMousemove);
    window.removeEventListener('mouseup', onMouseup);
  }

  const getBeatlinesArray = () => {
    const lines: Record<number, { offset: number, width: string, color: string; }> = {};
    // Generate a small beatline every 10 measures
    for (let i = 0; i < chart.endpoint; i += chart.timesig * 10) {
      lines[i] = { offset: i, width: '1px', color: '#fff3' };
    }
    // Generate a big beatline every 100 measures
    for (let i = 0; i < chart.endpoint; i += chart.timesig * 100) {
      lines[i] = { offset: i, width: '2px', color: '#fff6' };
    }
    return Object.values(lines).sort((a, b) => a.offset - b.offset);
  }
</script>

<div class="seeker-container" on:mousedown={onMousedown} bind:this={seekerElt}>
  <div class="info">
    <div>{Math.max(0, offset).toFixed(2)}/{chart.endpoint}</div>
    <div>{getLength(chart.tempo, offset, true)}</div>
  </div>
  <div class="seeker">
    {#each getBeatlinesArray() as { width, color }}
      <div class="beatline" style:border-width={width} style:border-color={color} />
    {/each}
    <div class="position" style:left={`${100 * Math.max(0, offset) / chart.endpoint}%`} style:width={`${Math.max(3, 20000 / chart.endpoint)}px`} />
  </div>
</div>

<style>
  .seeker-container {
    user-select: none;
    z-index: 10;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30px;
    background: #555;
    border-top: 1px solid #777;
  }
  .info {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 85px;
    text-align: right;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    font-size: 12px;
  }
  .seeker {
    position: absolute;
    bottom: 0;
    left: 90px;
    right: 20px;
    height: 30px;
    background: #555;
    border-top: 1px solid #777;
    display: flex;
    justify-content: space-between;
  }
  .beatline {
    height: 100%;
    border-style: solid;
  }
  .position {
    position: absolute;
    bottom: 0;
    top: 0;
    margin-top: 1px;
    margin-bottom: 1px;
    background: #fff;
    border: 2px solid #222;
    border-radius: 5px;
  }
</style>