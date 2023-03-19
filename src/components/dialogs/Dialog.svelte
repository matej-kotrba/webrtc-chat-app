<script lang="ts">
	import { fly, fade } from 'svelte/transition';

	let dialogRef: HTMLDivElement;
	let isOpen: boolean = false;

	export function open() {
		isOpen = true;
	}

	export function close() {
		isOpen = false;
	}
</script>

{#if isOpen}
	<div
		class="absolute left-0 top-0 w-[100vw] h-[100vh] bg-black z-[10000] bg-opacity-20"
		transition:fade|local
	>
		<div
			in:fly|local={{ y: -200 }}
			out:fly|local={{ y: 200 }}
			bind:this={dialogRef}
			class="dialog-box min-w-[90%] sm:min-w-[25rem] md:min-w-[30rem] xl:min-w-[40rem] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl overflow-hidden bg-slate-900 text-white "
		>
			<div class="flex justify-between bg-slate-700 p-4">
				<slot name="header" />
				<button on:click={close} class="ml-auto block"
					><iconify-icon icon="akar-icons:cross" class="text-lg" /></button
				>
			</div>
			<slot name="main" />
		</div>
	</div>
{/if}

<style>
	.dialog-box {
		box-shadow: 0 0 40px rgba(255, 255, 255, 0.095);
	}
	.dialog-box::backdrop {
		background-color: black;
		opacity: 0.35;
	}
</style>
