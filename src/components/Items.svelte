<script>
  import { onMount } from "svelte";
  import { Avatar } from "@skeletonlabs/skeleton";
	import Users from "./Users.svelte";

  let items = [];

  onMount( async () => {
    const res = await fetch('http://localhost:3000/messages');
    items = await res.json();
  })
</script>

{#each items as item}
  <div class="grid grid-cols-[auto_1fr] gap-2">
    <Avatar src="" initials="WJ" width="w-12" />
    <div class="card p-4 variant-soft rounded-tl-none space-y-2">
      <header class="flex justify-between items-center">
        <Users {item}/>
        <small class="opacity-50">{item.created_at}</small>
      </header>
      <p>{item.content}</p>
    </div>
  </div>
{/each}