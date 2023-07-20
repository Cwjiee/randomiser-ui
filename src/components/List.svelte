
<script>
  import { onMount } from 'svelte';

  let users = '';
  
  onMount( async () => {
    const res = await fetch('http://localhost:3000/users');
    users = await res.json();
  })
</script>

<dl class="list-dl">
  {#each users as user}
	<div>
		<span class="badge bg-primary-500">💀</span>
		<span class="flex-auto">
			<dt>{user.username}</dt>
		</span>
	</div>
  {/each}
</dl>
