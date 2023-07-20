<script>
  // Your selected Skeleton theme:
  import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

  // This contains the bulk of Skeletons required styles:
  import '@skeletonlabs/skeleton/styles/skeleton.css';

  // Finally, your application's global stylesheet (sometimes labeled 'app.css')
  import '../app.postcss';		
  import { AppShell, AppBar } from '@skeletonlabs/skeleton';
  import List from '../components/List.svelte';
</script>

<AppShell>
	<svelte:fragment slot="header">
    <AppBar>
      <svelte:fragment slot="lead">
        Randomiser
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
    <div class="h-full grid grid-rows-[auto_1fr_auto] gap-1">
      <List />
    </div>
  </svelte:fragment>	
	<slot />
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter"></svelte:fragment>
	<!-- (footer) -->
</AppShell>