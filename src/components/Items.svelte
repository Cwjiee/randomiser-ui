<script>
  import { onMount } from "svelte";
  import { connectMessage } from "../lib/stores";
  import store from "../lib/stores";  

  let items = [];
  let users = []

  onMount( async () => {
    const res = await fetch('http://localhost:3000/messages');
    items = await res.json();
    connectMessage();
    store.subscribeMessage((currentMessage) => {
      items = [...items, currentMessage]
    });
  })

</script>

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

<!-- {#if items}
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
{/if} -->


