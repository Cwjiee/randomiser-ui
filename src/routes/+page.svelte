<script>
  import { focusTrap } from '@skeletonlabs/skeleton';

  let name = '';

  async function addUser(e){
    localStorage.setItem("currentUser", JSON.stringify({name: name}));
    e.preventDefault();
    await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: name,
      })
    });
    name = '';

    location.href = '/chat';
  }

  function onPromptKeyDown(e) {
    if (e.key === 'Enter') {
      addUser(e);
    }
  }

  let isFocused = true;
</script>

<div class="w-full h-full flex justify-center items-center">
  <form class="w-2/5 m-auto card p-4 text-token" use:focusTrap={isFocused}>
  <label class="label">
    <span>Name</span>
    <input class="input" type="text" bind:value={name} on:keydown={onPromptKeyDown} />
  </label>
  <div class="text-right mt-2"> 
    {#if name}
      <a href="/chat" on:click={addUser} class="btn variant-filled">Join</a>
    {:else}
      <button class="btn variant-filled" disabled>Join</button>
    {/if}
  </div>
</form>
</div>

