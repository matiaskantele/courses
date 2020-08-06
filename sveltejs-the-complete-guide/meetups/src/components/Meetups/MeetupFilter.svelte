<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let filtered = false;
</script>

<style>
  div {
    font-size: 0px;
  }

  button {
    background: hsl(0, 0%, 67%);
    font: inherit;
    font-size: 1rem;
    cursor: pointer;
    border: 1px solid hsl(0, 0%, 67%);
    padding: 0.5rem 1rem;
  }

  button:focus {
    outline: none;
  }

  button:first-of-type {
    border-radius: 5px 0 0 5px;
  }

  button:last-of-type {
    border-radius: 0 5px 5px 0;
  }

  button:hover,
  button:active,
  .active {
    background: hsl(335, 100%, 41%);
    border-color: hsl(335, 100%, 41%);
    color: white;
  }
</style>

<div>
  <button
    type="button"
    class:active={!filtered}
    on:click={() => {
      filtered = false;
      dispatch('select', false);
    }}>
    All
  </button>
  <button
    type="button"
    class:active={filtered}
    on:click={() => {
      filtered = true;
      dispatch('select', true);
    }}>
    Favorites
  </button>
</div>
