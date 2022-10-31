<script lang="ts">
  // The vertical grid should look the same all the time so it is static
  // Just some flex abuse to make it vertically scalable...
  import { sortedNotes } from '../constants';
</script>

<div class="vertical-grid">
  {#each sortedNotes as note}
    <div class="pitch" class:sharp={note.sharp} class:octave={note.octave} />
  {/each}
</div>
<div class="note-names">
  {#each sortedNotes as note}
    <div class="text">{note.name}</div>
  {/each}
</div>

<style>
  .vertical-grid {
    position: absolute;
    left: 0;
    right: 0;
    top: 10%;
    bottom: 10%;
    z-index: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .note-names {
    position: absolute;
    left: 0;
    right: 0;
    top: 10%;
    bottom: 10%;
    width: 90px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: -5px;
  }

  .pitch {
    height: 0;
    border-bottom: 3px solid #fff6;
  }

  .text {
    font-size: 14px;
    margin-top: -6px;
    margin-left: 5px;
  }

  .sharp {
    border-width: 1px;
  }

  .octave {
    border-width: 5px;
  }
</style>