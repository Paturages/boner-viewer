<script lang="ts">
  import type { Chart } from "../types";
  import { getLength } from '../utils/metadata';
  export let chart: Chart;

  let showDetails = false;

  const toggleDetails = () => {
    showDetails = !showDetails;
  }
</script>

{#if showDetails}
  <div class="metadata-details">
    <ul class="metadata-list">
      <li>
        <div class="metadata-label">author</div>
        <div class="metadata-value">{chart.author}</div>
      </li>
      <li>
        <div class="metadata-label">name</div>
        <div class="metadata-value">{chart.name}</div>
      </li>
      <li>
        <div class="metadata-label">description</div>
        <div class="metadata-value">{chart.description}</div>
      </li>
      <li>shortName = {chart.shortName}</li>
      <li>trackRef = {chart.trackRef}</li>
      <li>genre = {chart.genre}</li>
      <li>year = {chart.year}</li>
      <li>difficulty = {chart.difficulty}</li>
      <li>savednotespacing = {chart.savednotespacing}</li>
      <li>tempo = {chart.tempo}</li>
      <li>timesig = {chart.timesig}</li>
      <li>endpoint = {chart.endpoint}</li>
      <li>UNK1 = {chart.UNK1}</li>
      <li><br /><a href="javascript:void(0)" on:click={toggleDetails}>Hide details</a></li>
    </ul>
  </div>
{:else}
  <div class="metadata">
    <div class="title">{chart.author} - {chart.name}</div>
    <div class="tempo">♩ = {chart.tempo} | {chart.timesig}/4 | {getLength(chart.tempo, chart.endpoint)} | <a href="javascript:void(0)" on:click={toggleDetails}>See more</a></div>
  </div>
{/if}

<style>
  .metadata {
    text-align: right;
    position: absolute;
    bottom: 30px;
    right: 50px;
    padding: 5px;
    background: #444;
  }

  .metadata-details {
    z-index: 10;
    position: absolute;
    bottom: 30px;
    right: 0;
    max-width: 500px;
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
</style>