<script>
  import { focusTrap } from '@skeletonlabs/skeleton';
  import { currentUser } from '../lib/stores.js'

  let name = '';
  let id = 0;

  const updateName = () => {
    id++;
    currentUser.set({id, name});
  }

  let isFocused = true;
</script>

<div class="w-full h-full flex justify-center items-center">
  <form class="w-2/5 m-auto card p-4 text-token" use:focusTrap={isFocused}>
  <label class="label">
    <span>Name</span>
    <input class="input" type="text" bind:value={name} />
  </label>
  <div class="text-right mt-2"> 
    {#if name}
      <a href="/chat" on:click={updateName} class="btn variant-filled">Join</a>
    {:else}
      <button class="btn variant-filled" disabled>Join</button>
    {/if}
  </div>
</form>
</div>

