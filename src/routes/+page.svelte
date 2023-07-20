<script>
  import { onMount } from 'svelte';
  import { Avatar } from '@skeletonlabs/skeleton';

  let items = [];
  let users = '';

  const url = 'http://localhost:3000/messages';
  onMount( async () => {
    const res = await fetch(url);
    items = await res.json();
  })

  onMount( async () => {
    const res = await fetch('http://localhost:3000/users');
    users = await res.json();
  })

</script>

<div class="h-full grid grid-rows-[1fr_auto] gap-1">
	<section class="max-h-[500px] p-4 overflow-y-auto space-y-4">
    {#each items as item}
      <div class="grid grid-cols-[auto_1fr] gap-2">
        <Avatar src="" initials="WJ" width="w-12" />
        <div class="card p-4 variant-soft rounded-tl-none space-y-2">
          <header class="flex justify-between items-center">
            {#each users as user}
              {#if user.id === item.user_id}
                <p class="font-bold">{user.username}</p>
              {/if}
            {/each}
            <small class="opacity-50">{item.created_at}</small>
          </header>
          <p>{item.content}</p>
        </div>
      </div>
    {/each}
  </section>
</div>