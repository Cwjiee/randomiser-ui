<script>
  import { onMount } from 'svelte';

  let items = []

  const url = 'http://localhost:3000/messages';
  onMount( async () => {
    const res = await fetch(url);
    items = await res.json();
  })
</script>

<h1>Messages</h1>

{#each items as item}
    <h3>user : {item.user_id}</h3>
    <h3>item : {item.content}</h3>
{/each}