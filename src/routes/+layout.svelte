<script>
  // Your selected Skeleton theme:
  import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

  // This contains the bulk of Skeletons required styles:
  import '@skeletonlabs/skeleton/styles/skeleton.css';

  // Finally, your application's global stylesheet (sometimes labeled 'app.css')
  import '../app.postcss';		
  import { AppShell, AppBar } from '@skeletonlabs/skeleton';
</script>


<AppShell>
	<svelte:fragment slot="header">
    <AppBar>
      <svelte:fragment slot="lead">
          <strong class="text-lg">Randomiser</strong>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
	<!-- Router Slot -->
	<slot />
</AppShell>