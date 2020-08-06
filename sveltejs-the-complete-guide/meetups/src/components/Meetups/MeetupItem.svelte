<script>
  import { createEventDispatcher } from "svelte";

  import meetups from "../../store/meetups-store.js";
  import Button from "../UI/Button.svelte";
  import Badge from "../UI/Badge.svelte";
  import Spinner from "../UI/Spinner.svelte";

  export let id;
  export let title;
  export let subtitle;
  export let address;
  export let imageUrl;
  export let description;
  export let email;
  export let isFav;

  let isLoading = false;

  const dispatch = createEventDispatcher();

  function togglefavorite() {
    isLoading = true;
    fetch(`https://meetups-svelte.firebaseio.com/meetups/${id}.json`, {
      method: "PATCH",
      body: JSON.stringify({ isFavorite: !isFav }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("An error occurred, please try again!");
        }
        isLoading = false;
        meetups.toggleFavorite(id);
      })
      .catch(err => {
        isLoading = false;
        console.log(err);
      });
  }
</script>

<style>
  article {
    box-shadow: 0 2px 8px hsla(0, 0%, 0%, 0.26);
    border-radius: 5px;
    background: white;
    margin: 1rem;
  }

  header,
  .content,
  footer {
    padding: 1rem;
  }

  .image {
    width: 100%;
    height: 14rem;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h1 {
    font-size: 1.25rem;
    margin: 0.5rem 0;
    font-family: "Roboto Slab", sans-serif;
  }

  h2 {
    font-size: 1rem;
    color: hsl(0, 0%, 50%);
    margin: 0.5rem 0;
  }

  p {
    font-size: 1.25rem;
    margin: 0;
  }

  div {
    text-align: right;
  }

  .content {
    height: 4rem;
  }
</style>

<article>
  <header>
    <h1>
       {title}
      {#if isFav}
        <Badge>FAVORITE</Badge>
      {/if}
    </h1>
    <h2>{subtitle}</h2>
    <p>{address}</p>
  </header>
  <div class="image">
    <img src={imageUrl} alt={title} />
  </div>
  <div class="content">
    <p>{description}</p>
  </div>
  <footer>
    <Button mode="outline" on:click={() => dispatch('edit', id)}>Edit</Button>
    {#if isLoading}
      <!-- <Spinner /> -->
      <span>Changing...</span>
    {:else}
      <Button
        mode="outline"
        color={isFav ? null : 'success'}
        on:click={togglefavorite}>
         {isFav ? 'Unfavorite' : 'Favorite'}
      </Button>
    {/if}
    <Button href={`/${id}`}>Show Details</Button>
  </footer>
</article>
