<script lang="ts">
	import { fade } from 'svelte/transition';

	let isOpen = false;

	export function open() {
		isOpen = true;
	}

	export function close() {
		isOpen = false;
	}
</script>

{#if isOpen}
	<div
		transition:fade
		class="left-[50vw] top-[50vh] translate-x-[-50%] translate-y-[-50%] p-3 rounded-xl"
	>
		<button on:click={close} class="ml-auto block"
			><iconify-icon icon="akar-icons:cross" class="text-lg" /></button
		>
		<slot />
	</div>
{/if}
