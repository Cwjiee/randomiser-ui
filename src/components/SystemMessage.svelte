<script>
  import { ConicGradient } from "@skeletonlabs/skeleton";
	import { afterUpdate, onMount } from "svelte";
  import { systemMessageSent } from "../lib/stores";

  export let message;
  let loading;
  
  const conicStops = [
    { color: 'transparent', start: 0, end: 25 },
    { color: 'rgb(var(--color-primary-500))', start: 75, end: 100 }
  ];

  onMount(async () => {
    loading = true;
    setTimeout(() => {
      loading = false;
      $systemMessageSent = true;
    }, 1000);
  })

</script>

{#if loading}
  <ConicGradient stops={conicStops} spin>Loading</ConicGradient>
{:else}
  <div class="card p-4 variant-soft space-y-2">
    <header class="flex justify-between items-center">
      <p class="font-bold">System result</p>
    </header>
    {#each message.content as content}
      <p>{content}</p>
    {/each}
  </div>
{/if}