<script lang="ts">
	import { draw } from 'svelte/transition';

	export let textToCopy: string;
	export let timeForChange: number = 1000;

	let isChangedToTick = false;

	let changeTimeout: NodeJS.Timeout | null = null;

	function copyToClipboard() {
		navigator.clipboard.writeText(textToCopy);
		isChangedToTick = true;
		if (changeTimeout) clearTimeout(changeTimeout);
		changeTimeout = setTimeout(() => {
			isChangedToTick = false;
			changeTimeout = null;
		}, timeForChange);
	}
</script>

<button
	on:click={copyToClipboard}
	class="w-[50xp] aspect-square grid place-items-center"
>
	{#if isChangedToTick}
		<iconify-icon icon="charm:tick" class="text-3xl text-green-500 " />
	{:else}
		<iconify-icon
			icon="mdi:clipboard-text"
			class="text-3xl aspect-square opacity-100 group-hover:opacity-100 duration-150 "
		/>
	{/if}
</button>
