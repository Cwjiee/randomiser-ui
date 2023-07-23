<script>
	import { onMount } from "svelte";
	import { connectCurrentUser, currentUser } from "../lib/stores";

  let currentMessage = '';
  let users = [];

  onMount( async () => {
    const res = await fetch('http://localhost:3000/users');
    users = await res.json();
  })

  async function addMessage(e){
    connectCurrentUser();
    const uid = users.find(user => user.username === $currentUser.name).id

    e.preventDefault();
    await fetch(`http://localhost:3000/users/${uid}/add_message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: $currentUser.id,
        message: currentMessage,
      })
    });

    currentMessage = '';
	}

  function onPromptKeyDown(e) {
    if (e.key === 'Enter') {
      addMessage(e);
    }
  }
</script>

<div class="input-group input-group-divider grid-cols-[1fr_auto] rounded-container-token">
  <textarea
    bind:value={currentMessage}
    class="bg-transparent border-0 ring-0"
    name="prompt"
    id="prompt"
    placeholder="Write a message..."
    rows="1"
    on:keydown={onPromptKeyDown}
  />
  <button class={currentMessage ? 'variant-filled-primary' : 'input-group-shim'} on:click={addMessage}>
    Submit
  </button>
</div>
