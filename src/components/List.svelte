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
    // store.subscribeUser((currentUsers) => {
    //   users = [...users, currentUsers]
    // });
    console.log(users)
    console.log($currentUser.name)
  })
</script>

<dl class="list-dl">
  {#each users as user}
	<div>
		<span class="flex-auto">
      {#if user.username === $currentUser.name}
        <!-- {currentUser.update(user)} -->
			  <dt class="bg-primary-500 rounded-xl text-center">{user.username}</dt>
      {:else}
        <dt>{user.username}</dt>
      {/if}
		</span>
	</div>
  {/each}
</dl>
