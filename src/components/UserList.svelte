<script>
  import { onMount } from 'svelte';
  import { currentUser, connectUsers, connectCurrentUser } from '../lib/stores';
  import store from '../lib/stores';

  let users = [];

  onMount( async () => {
    const res = await fetch('http://localhost:3000/users');
    users = await res.json();
    connectCurrentUser();
    connectUsers();

    store.subscribeUser((currentU) => {
      if(currentU.username !== undefined) {
        users = [...users, currentU];
      }
    });
  })
</script>

<dl class="list-dl">
  {#each users as user}
	<div class=" h-2/4">
    {#if user.username === $currentUser.name}
      <span class="bg-primary-500 rounded-xl w-5/6 h-full m-auto">
          <dt class="text-center h-full text-xl flex justify-center items-center">{user.username}</dt>
      </span>
    {:else}
      <span class="variant-soft rounded-xl w-5/6 h-full m-auto">
        <dt class="text-center h-full text-xl flex justify-center items-center">{user.username}</dt>
      </span>
    {/if}
	</div>
  {/each}
</dl>
