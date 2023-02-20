<script lang="ts">
	import type { DevicesState } from './video';

	export let devicesState: DevicesState;
	export let onEnableCamera: () => void = () => {};
	export let onEnableMic: () => void = () => {};
	export let onCallLeave: () => void = () => {};
</script>

<!-- Call controls -->
<div class="flex gap-2.5">
	<button
		on:click={onCallLeave}
		class="text-[3rem] rounded-full bg-red-500 p-2 text-white
	aspect-square grid content-center"
	>
		<iconify-icon icon="ic:round-local-phone" />
	</button>
	{#if !devicesState.isCameraOn}
		<button
			on:click={onEnableCamera}
			class="text-[3rem] rounded-full bg-slate-600 p-2 text-white
		aspect-square grid content-center"
		>
			<iconify-icon icon="humbleicons:camera-video" />
		</button>
	{:else}
		<button
			class="text-[3rem] rounded-full bg-white p-2 text-slate-800
		aspect-square grid content-center"
		>
			<iconify-icon icon="humbleicons:camera-video-off" />
		</button>
	{/if}
</div>
