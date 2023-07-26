<script>
  import { onMount } from "svelte";
  import { connectMessage } from "../lib/stores";
  import store from "../lib/stores";  
  import { Avatar } from "@skeletonlabs/skeleton";
  import Users from "./Users.svelte";

  let items = [];

  onMount( async () => {
    const res = await fetch('http://localhost:3000/messages');
    items = await res.json();
    connectMessage();
    store.subscribeMessage((currentMessage) => {
      if (currentMessage.content !== undefined) {
        items = [...items, currentMessage];
      }
    });
  })

</script>

<!-- <div class="grid grid-rows-[auto_1fr] gap-2">
  <ul class="list">
    {#each users as user}
      {#each items as item}
        {#if user.id === item.user_id}
          <li>
            <span class="flex-auto">{item.content}</span>
          </li>
        {/if}
      {/each}
    {/each}
  </ul>
</div> -->

{#each items as item}
  {#if item}
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
  {/if}
{/each}


