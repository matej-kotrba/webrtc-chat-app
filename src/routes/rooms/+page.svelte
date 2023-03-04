<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData & { error: string | undefined };
</script>

<div class="perspective-container isolate mb-24">
	<form
		action="?/redirectToRoom"
		method="POST"
		use:enhance
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
			{form ? form.error || '' : 'Placeholder'}
		</p>
	</form>
</div>
<!-- {#if form?.body.rooms}
	<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
		{#each form?.body.rooms as { title }}
		<a href="/rooms/{title}">{title}</a>
		{/each}
	</div>
	{/if} -->
<p class="text-center my-2 text-xl">
	Found: <span class="font-extrabold text-blue-400"
		>{form?.room?.length || 0}</span
	> result(s)
</p>
<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 mx-2 xl:mx-24">
	{#each Array(10) as _}
		<a
			href="/rooms/roomName"
			class="bg-transparent border-4 border-solid border-indigo-500 p-2 rounded-md shadow-xl shadow-[#4338ca4f]"
		>
			<span class="font-extrabold">Room name:</span> Tady je text
		</a>
	{/each}
</div>

<style>
	.perspective-container > form {
		perspective: 100px;
	}

	.perspective-container div {
		transform-style: preserve-3d;
		transform: rotateX(4deg) rotateY(2deg);
	}
</style>
