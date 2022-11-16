<script lang="ts">
  import type { Chart } from "../types";
  import { getLength, toHumanTime } from '../utils/metadata';
  export let chart: Chart;
  export let audioEndpoint: number;
  export let audioLength: number;
  export let onChange: (chart: Chart, property: string) => void;

  let difficulty: number;
  let savednotespacing: number;
  let endpoint: number;
  let showDetails = false;

  const handleChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    onChange({ ...chart, [target.dataset.property]: target.value }, target.dataset.property);
  };

  const toggleDetails = () => {
    showDetails = !showDetails;
  }

  // Don't propagate keys or scroll to the global editor controls
  const stopPropagation = ($event: Event) => $event.stopPropagation();

  $: {
    if (chart) {
      if (!difficulty) ({ difficulty } = chart);
      if (!savednotespacing) ({ savednotespacing } = chart);
      if (!endpoint) ({ endpoint } = chart);
    } else {
      if (difficulty) difficulty = null;
      if (savednotespacing) savednotespacing = null;
      if (endpoint) endpoint = null;
    }
  }
</script>

{#if showDetails}
  <div class="metadata-details">
    <ul class="metadata-list">
      <li>
        <div class="metadata-label">author</div>
        <div class="metadata-value">
          <input type="text" data-property="author" value={chart.author} on:change={handleChange} on:keydown={stopPropagation} />
        </div>
      </li>
      <li>
        <div class="metadata-label">name</div>
        <div class="metadata-value">
          <input type="text" data-property="name" value={chart.name} on:change={handleChange} on:keydown={stopPropagation} />
        </div>
      </li>
      <li>
        <div class="metadata-label">description</div>
        <div class="metadata-value">
          <textarea data-property="description" value={chart.description} on:change={handleChange} on:keydown={stopPropagation} />
        </div>
      </li>
      <li>
        <div class="metadata-label">shortName</div>
        <div class="metadata-value">
          <input type="text" data-property="shortName" value={chart.shortName} on:change={handleChange} on:keydown={stopPropagation} />
        </div>
      </li>
      <li>
        <div class="metadata-label">genre</div>
        <div class="metadata-value">
          <input type="text" data-property="genre" value={chart.genre} on:change={handleChange} on:keydown={stopPropagation} />
        </div>
      </li>
      <li>
        <div class="metadata-label">trackRef</div>
        <div class="metadata-value">
          <input type="text" data-property="trackRef" value={chart.trackRef} on:change={handleChange} on:keydown={stopPropagation} />
        </div>
      </li>
      <li>
        <div class="metadata-label">year</div>
        <div class="metadata-value">
          <input type="text" data-property="year" value={chart.year} on:change={handleChange} on:keydown={stopPropagation} />
        </div>
      </li>
      <li>
        <div class="metadata-label">difficulty</div>
        <div class="metadata-value">
          <input type="range" data-property="difficulty" bind:value={difficulty} on:change={handleChange} on:keydown={stopPropagation} min={1} max={10} step={1} /> {difficulty}
        </div>
      </li>
      <li>
        <div class="metadata-label">savednotespacing</div>
        <div class="metadata-value">
          <input
            type="range"
            data-property="savednotespacing"
            bind:value={savednotespacing}
            on:change={handleChange}
            on:keydown={stopPropagation}
            min={10}
            max={1000}
            step={5}
          /> {savednotespacing}
        </div>
      </li>
      <li>
        <div class="metadata-label">tempo</div>
        <div class="metadata-value">
          <input type="number" data-property="tempo" value={chart.tempo} min={1} on:change={handleChange} on:keydown={stopPropagation} />
        </div>
      </li>
      <li>
        <div class="metadata-label">timesig</div>
        <div class="metadata-value">
          <input type="number" data-property="timesig" value={chart.timesig} min={1} on:change={handleChange} on:keydown={stopPropagation} /> / 4
        </div>
      </li>
      <li>
        <div class="metadata-label">endpoint</div>
        <div class="metadata-value endpoint">
          {#if audioEndpoint}
            <input
              type="range"
              data-property="endpoint"
              bind:value={endpoint}
              on:change={handleChange}
              on:keydown={stopPropagation}
              min={0}
              max={audioEndpoint}
              step={1}
            /> {getLength(chart.tempo, endpoint)}/{toHumanTime(audioLength)} ({endpoint})
          {:else}
            <input type="number" data-property="endpoint" value={chart.endpoint} on:change={handleChange} on:keydown={stopPropagation} />
          {/if}
        </div>
      </li>
      <li>
        <div class="metadata-label">UNK1</div>
        <div class="metadata-value">
          <input type="number" data-property="UNK1" value={chart.UNK1} on:change={handleChange} on:keydown={stopPropagation} />
        </div>
      </li>
      <li><br /><a href="javascript:void(0)" on:click={toggleDetails}>Hide details</a></li>
    </ul>
  </div>
{/if}
<div class="metadata">
  {#if chart.author.length + chart.name.length > 50}
    <div class="title ellipsis" title={chart.author + ' - ' + chart.name}>{chart.name}</div>
  {:else}
    <div class="title">{chart.author} - {chart.name}</div>
  {/if}
  <div class="tempo">♩ = {chart.tempo} | {chart.timesig}/4 | {getLength(chart.tempo, chart.endpoint)} | <a href="javascript:void(0)" on:click={toggleDetails}>See more</a></div>
</div>

<style>
  .metadata {
    text-align: right;
    padding: 5px;
    background: #444;
  }

  .ellipsis {
    max-width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .metadata-details {
    z-index: 10;
    position: fixed;
    bottom: 80px;
    right: 0;
    width: 500px;
    padding-right: 20px;
    background: #444;
  }

  ul {
    list-style: none;
  }

  li {
    margin-bottom: 2px;
  }

  a {
    color: #7788cc;
  }

  .metadata-value {
    margin-left: 20px;
  }

  .metadata-value > * {
    width: 100%;
  }
  .metadata-value > input[type="range"] {
    width: calc(100% - 100px);
  }
  .metadata-value > input[data-property="timesig"] {
    width: 60px;
  }
  .metadata-value > input[data-property="endpoint"] {
    width: calc(100% - 180px);
  }

  input, textarea {
    font-size: 1em;
    font-family: 'Courier New', Courier, monospace;
  }
</style>