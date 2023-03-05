<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let dialogRef: HTMLDialogElement;

	export function open() {
		dialogRef.showModal();
	}

	onMount(() => {
		dialogRef.showModal();
	});
	export function close() {
		dialogRef.close();
	}
</script>

<dialog
	bind:this={dialogRef}
	class="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-slate-900 text-white"
>
	<div class="flex justify-between bg-slate-700 p-4">
		<slot name="header" />
		<button on:click={close} class="ml-auto block"
			><iconify-icon icon="akar-icons:cross" class="text-lg" /></button
		>
	</div>
	<slot name="main" />
</dialog>

<style>
	dialog {
		box-shadow: 0 0 40px rgba(255, 255, 255, 0.095);
	}
</style>
