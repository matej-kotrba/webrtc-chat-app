<script lang="ts">
	import Tooltip from '../../../components/Tooltip.svelte';
	import CopyToClipboard from '../../../components/CopyToClipboard.svelte';

	import type { PageData } from '../[roomId]/$types';
	import { browser } from '$app/environment';
	import VideoCall from '../../../components/VideoCall.svelte';

	export let data: PageData;
</script>

<h2 class="group">
	<span class="text-white text-2xl font-extralight">Room: </span><span
		class="text-4xl font-extrabold"
		>{data.roomName}
	</span>
	{#if browser}
		<Tooltip text="Copy to clipboard !">
			<CopyToClipboard textToCopy={window.location.href} />
		</Tooltip>
	{/if}
</h2>

<VideoCall roomName={data.roomName} />
