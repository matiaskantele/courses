<script context="module">
  export function preload(page) {
    return this.fetch("https://meetups-svelte.firebaseio.com/meetups.json")
      .then(res => {
        if (!res.ok) {
          throw new Error("Fetching meetups failed. Please try again later.");
        }
        return res.json();
      })
      .then(data => {
        const loadedMeetups = [];
        for (const key in data) {
          loadedMeetups.push({
            ...data[key],
            id: key
          });
        }
        return { fetchedMeetups: loadedMeetups.reverse() };
      })
      .catch(err => {
        error = err;
        console.log(err);
        text.error(500, "Could not fetch meetups.");
      });
  }
</script>

<script>
  import { createEventDispatcher, onMount, onDestroy } from "svelte";
  import { scale } from "svelte/transition";
  import { flip } from "svelte/animate";

  import meetups from "../store/meetups-store.js";
  import Button from "../components/UI/Button.svelte";
  import Spinner from "../components/UI/Spinner.svelte";
  import MeetupItem from "../components/Meetups/MeetupItem.svelte";
  import MeetupFilter from "../components/Meetups/MeetupFilter.svelte";
  import EditMeetup from "../components/Meetups/EditMeetup.svelte";

  export let fetchedMeetups;

  let loadedMeetups = [];
  let editMode;
  let editedId;
  let isLoading;
  let unsubscribe;

  const dispatch = createEventDispatcher();

  let favsOnly = false;

  $: filteredMeetups = favsOnly
    ? loadedMeetups.filter(m => m.isFavorite)
    : loadedMeetups;

  onMount(() => {
    unsubscribe = meetups.subscribe(items => {
      loadedMeetups = items;
    });
    meetups.setMeetups(fetchedMeetups);
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  function setFilter(event) {
    favsOnly = event.detail;
  }

  function startEdit(event) {
    editMode = "edit";
    editedId = event.detail;
  }

  function startAdd() {
    editMode = "edit";
  }
</script>

<style>
  #meetups {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  #meetup-controls {
    margin: 1rem;
    display: flex;
    justify-content: space-between;
  }

  #no-meetups {
    margin: 1rem;
  }

  @media (min-width: 768px) {
    #meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

<svelte:head>
  <title>All Meetups</title>
</svelte:head>

{#if editMode === 'edit'}
  <EditMeetup
    id={editedId}
    on:done={() => {
      editMode = null;
      editedId = null;
    }} />
{/if}
{#if isLoading}
  <Spinner />
{:else}
  <section id="meetup-controls">
    <MeetupFilter on:select={setFilter} />
    <Button on:click={startAdd}>New Meetup</Button>
  </section>
  {#if filteredMeetups.length === 0}
    <p id="no-meetups">No meetups yet. You can start adding some!</p>
  {/if}
  <section id="meetups">
    {#each filteredMeetups as meetup (meetup.id)}
      <div transition:scale animate:flip={{ duration: 300 }}>
        <MeetupItem
          id={meetup.id}
          title={meetup.title}
          subtitle={meetup.subtitle}
          imageUrl={meetup.imageUrl}
          description={meetup.description}
          address={meetup.address}
          email={meetup.contactEmail}
          isFav={meetup.isFavorite}
          on:edit={startEdit} />
      </div>
    {/each}
  </section>
{/if}
