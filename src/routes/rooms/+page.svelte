<script lang="ts">
	import { enhance } from '$app/forms';
	import Dialog from '../../components/Dialog.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData & { error: string | undefined };

	let isLoading = false;

	function onSearch() {
		isLoading = true;
	}

	$: (isLoading = false), form;

	let createRoomDialog: Dialog;
</script>

<Dialog bind:this={createRoomDialog}>
	<svelte:fragment slot="header">
		<h2 class="font-extrabold text-2xl flex items-center">
			<iconify-icon icon="material-symbols:meeting-room-outline-rounded" />New
			Room
		</h2>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<form>
			<div class="my-8">
				<p class="font-extrabold text-lg text-center my-2">
					Create your new <span class="text-indigo-400">place</span> to
					<span class="text-indigo-400">talk</span> !
				</p>
				<div class="p-2 my-2">
					<label for="roomName">Room name: </label>
					<input
						name="roomName"
						type="text"
						placeholder="Awesome room"
						class="rounded-xl bg-transparent p-2 text-white border-solid border-2 border-purple-600"
					/>
				</div>
			</div>
			<div class="flex gap-2 bg-slate-700 p-4">
				<button
					type="submit"
					class="inline-block mr-auto border-2 border-solid border-indigo-500 px-2 py-1 rounded-lg"
					>Clear</button
				>
				<button
					type="submit"
					class="inline-block border-2 border-solid border-indigo-500 px-2 py-1 rounded-lg"
					>Cancel</button
				>
				<button
					type="submit"
					class="inline-block border-2 border-solid border-indigo-500 px-2 py-1 rounded-lg"
					>Create</button
				>
			</div>
		</form>
	</svelte:fragment>
</Dialog>
<div class="flex justify-end">
	<button
		class="bg-indigo-500 rounded-lg p-3"
		on:click={() => createRoomDialog.open()}>Create you own room!</button
	>
</div>
<div class="perspective-container isolate mb-24">
	<form
		action="?/redirectToRoom"
		method="POST"
		use:enhance
		on:submit={onSearch}
		class="relative flex flex-col items-center max-w-2xl gap-2 p-8 py-12 mx-auto"
	>
		<div
			class="z-[-10] pointer-events-none absolute w-full h-full border-8 border-indigo-800 border-solid rounded-md left-1 top-1"
		/>
		<div
			class="z-[-8] pointer-events-none shadow-xl shadow-indigo-800 absolute top-0 left-0 w-full h-full border-8 border-indigo-600 border-solid rounded-md overflow-hidden"
		>
			<img
				src="wave2.png"
				alt="Decorative wave"
				class="absolute right-[100%] w-full h-full animate-transformRight"
			/>
			<img
				src="wave2.png"
				alt="Decorative wave"
				class="absolute w-full h-full animate-transformRight left-[-2px] top-[1.2px]"
			/>
		</div>

		<label for="roomName" class="text-2xl font-extrabold"
			>Name of the room you want to <span class="text-blue-400">join</span
			></label
		>
		<input
			name="roomName"
			type="text"
			class="flex p-2 duration-150 bg-indigo-900 border-collapse rounded-lg shadow-xl outline-none focus:shadow-indigo-600 shadow-transparent color-white focus:bg-indigo-500 focus:outline-none"
		/>
		<p
			class="text-lg text-red-500 {form && form.error
				? 'opacity-100 duration-150'
				: 'opacity-0'}"
		>
			{form ? form.error || 'Placeholder' : 'Placeholder'}
		</p>
	</form>
</div>

{#if isLoading}
	<div class="flex justify-center">
		<iconify-icon
			icon="mdi:loading"
			class="animate-spin text-[4rem] text-blue-400"
		/>
	</div>
{/if}

{#if form?.body?.rooms}
	<p class="text-center my-2 text-xl">
		Found: <span class="font-extrabold text-blue-400"
			>{form?.body.rooms.length || 0}</span
		> result(s)
	</p>
	<div
		class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mx-2 xl:mx-24"
	>
		{#each form?.body?.rooms as { title }}
			<a
				href="/rooms/{title}"
				class="link-to-room bg-transparent border-4 border-solid border-indigo-500 relative isolate
				p-2 rounded-md shadow-xl shadow-[#4338ca4f] group flex items-center justify-between"
			>
				<p>Room name: <span class="font-extrabold">{title}</span></p>
				<iconify-icon
					icon="system-uicons:enter"
					class="opacity-0 group-hover:opacity-100 duration-150 text-2xl"
				/>
			</a>
		{/each}
	</div>
{/if}

<style>
	.perspective-container > form {
		perspective: 100px;
	}

	.perspective-container div {
		transform-style: preserve-3d;
		transform: rotateX(4deg) rotateY(2deg);
	}

	.link-to-room:hover::before {
		opacity: 1;
	}

	.link-to-room::before {
		content: '';
		position: absolute;
		inset: 0;
		opacity: 0;
		z-index: -99;
		background-image: radial-gradient(circle at right, #4338ca, #4338ca00 60%);
		transition: 0.2s ease-in-out;
	}
</style>
