<script lang="ts">
	import { loading } from '../lib/loading';
</script>

{#if $loading}
	<div
		class="absolute left-[50%] top-[50%] w-[150px] aspect-square rounded-full bg-red-600 z-10"
	/>
{/if}
