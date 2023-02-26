<script lang="ts">
	import Tooltip from '../../../components/Tooltip.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h2 class="group">
	<span class="text-white text-2xl font-extralight">Room: </span><span
		class="text-4xl font-extrabold"
		>{data.roomName}
	</span>
	<Tooltip text="Copy to clipboard !">
		<iconify-icon
			icon="mdi:clipboard-text"
			class="text-3xl aspect-square opacity-0 group-hover:opacity-100 duration-150"
		/>
	</Tooltip>
</h2>
