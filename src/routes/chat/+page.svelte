<script>
	import Items from "../../components/Items.svelte";
	import Prompt from "../../components/Prompt.svelte";

</script>

<div class="h-full">
	<section class="p-4 overflow-y-auto space-y-4 h-5/6">
    <Items />
  </section>
  <section class="border-t border-surface-500/30 p-4 h-1/6">
    <Prompt />
  </section>
</div>