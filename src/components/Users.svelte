<script>
  import { onMount } from "svelte";
  let users = [];
  export let item;
  onMount( async () => {
    const res = await fetch('http://localhost:3000/users');
    users = await res.json();
  })
</script>

{#each users as user}
  {#if user.id === item.user_id}
    <p class="font-bold">{user.username}</p>
  {/if}
{/each}