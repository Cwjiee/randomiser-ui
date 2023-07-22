<script>
  import { onMount } from "svelte";
  import { Avatar } from "@skeletonlabs/skeleton";
	import Users from "./Users.svelte";

  let items = [];

  onMount( async () => {
    const res = await fetch('http://localhost:3000/messages');
    items = await res.json();
  })

  onMount( () => {
    const socket = new WebSocket('ws://localhost:3000/cable');
    socket.onopen = () => {
      console.log('connected');

      const message = {
        command: 'subscribe',
        identifier: JSON.stringify({
          channel: 'MessagesChannel'
        }),
      };

      if(message.type === 'ping') {
        return;
      }
      socket.send(JSON.stringify(message));
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if(message.type === "ping") {
        return;
      }

      console.log('message received : ' + message.identifier);
      if(message.content){
        items = [...items, message.content];
      }
    };

    socket.onclose = () => {
      console.log('websocket disconnected');
    };

    socket.onerror = (error) => {
      console.log('websocket error:' + error);
    }
  });
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

