<script>
  export let type = "button";
  export let href = null;
  export let mode = null;
  export let color = null;
  export let disabled = false;
</script>

<style>
  button,
  a {
    font: inherit;
    border: 1px solid hsl(335, 100%, 41%);
    background: hsl(335, 100%, 41%);
    padding: 0.5rem 1rem;
    color: white;
    border-radius: 5px;
    box-shadow: 1px 1px 3px hsla(0, 0%, 0%, 0.26);
    cursor: pointer;
    text-decoration: none;
  }

  button:focus {
    outline: none;
  }

  button:hover,
  button:active,
  a:hover,
  a:active {
    background: hsl(335, 94%, 46%);
    border-color: hsl(335, 94%, 46%);
    box-shadow: 1px 1px 8px hsla(0, 20%, 25%, 0.26);
  }

  button:disabled,
  button:disabled:hover,
  button:disabled:active {
    background: hsl(0, 0%, 80%);
    border-color: hsl(0, 0%, 80%);
    color: hsl(0, 0%, 58%);
    box-shadow: none;
    cursor: not-allowed;
  }

  .success {
    background: hsl(135, 99%, 32%);
    border-color: hsl(135, 99%, 32%);
  }

  .success:hover,
  .success:active {
    background: hsl(135, 77%, 44%);
    border-color: hsl(135, 77%, 44%);
  }

  .outline {
    background: transparent;
    color: hsl(335, 100%, 41%);
    box-shadow: none;
  }

  .outline:hover,
  .outline:active {
    background: hsl(335, 100%, 89%);
    box-shadow: none;
  }

  .outline:disabled,
  .outline:disabled:hover,
  .outline:disabled:active {
    background: transparent;
    color: hsl(0, 0%, 80%);
  }

  .outline.success {
    border-color: hsl(135, 99%, 32%);
    color: hsl(135, 99%, 32%);
  }

  .outline.success:hover,
  .outline.success:active {
    background: hsl(135, 100%, 88%);
  }
</style>

{#if href}
  <a {href}>
    <slot />
  </a>
{:else}
  <button class="{mode} {color}" {type} on:click {disabled}>
    <slot />
  </button>
{/if}
