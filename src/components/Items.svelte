<script>
  import { onMount } from "svelte";
  import { connectCurrentUser, connectMessage } from "../lib/stores";
  import store from "../lib/stores";  
  import { Avatar } from "@skeletonlabs/skeleton";

  let items = [];
  let users = [];

  onMount( async () => {
    const resMessage = await fetch('http://localhost:3000/messages');
    items = await resMessage.json();

    const resUsers = await fetch('http://localhost:3000/users');
    users = await resUsers.json();
    console.log(users)

    connectMessage();
    connectCurrentUser();

    store.subscribeMessage((currentMessage) => {
      if (currentMessage.content !== undefined) {
        items = [...items, currentMessage];
        console.log(items)
      }
    });

    store.subscribeUser((currentU) => {
      console.log(currentU)
      if(currentU.username !== undefined) {
        users = [...users, currentU];
      }
    });
  })

</script>

{#each items as item}
    <div class="grid grid-cols-[auto_1fr] gap-2">
      {#each users as user}
        {#if user}
          {#if user.id === item.user_id}
            <Avatar src="" initials="{user.username.split(" ").map((n) => n[0]).join("")}" width="w-12" />
            <div class="card p-4 variant-soft rounded-tl-none space-y-2">
              <header class="flex justify-between items-center">
                    <p class="font-bold">{user.username}</p>
                <small class="opacity-50">{item.created_at}</small>
              </header>
              <p>{item.content}</p>
            </div>
          {/if}
        {/if}
      {/each}
    </div>
{/each}


