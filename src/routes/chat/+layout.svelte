<script>
    // Your selected Skeleton theme:
    import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
  
    // This contains the bulk of Skeletons required styles:
    import '@skeletonlabs/skeleton/styles/skeleton.css';
  
    // Finally, your application's global stylesheet (sometimes labeled 'app.css')
    import '../../app.postcss';		
    import { AppShell } from '@skeletonlabs/skeleton';
    import UserList from '../../components/UserList.svelte';
</script>
  
<AppShell>
    <svelte:fragment slot="sidebarLeft">
        <div class="h-full grid grid-rows-[auto_1fr_auto] gap-1">
            <UserList />
        </div>
    </svelte:fragment>	
    <slot />
</AppShell>