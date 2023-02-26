<script lang="ts">
	import { enhance } from '$app/forms';
	import VideoCall from '../components/VideoCall.svelte';
	import { user } from '../stores/user';
	import type { ActionData } from './$types';

	export let form: ActionData & { error: string | undefined };
</script>

{#if $user === null}
	<div class="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_4px_1fr]">
		<div
			class="webrtc flex flex-col text-center leading-[1.1] text-[3rem] font-extrabold sm:text-right sm:text-[4rem] md:text-[4.5rem] lg:text-[6rem]"
		>
			<span>WebRTC</span>
			<span>Chat</span>
			<span>App</span>
		</div>
		<div class="bg-white rounded-lg separator" />
		<div
			class="flex flex-col leading-[1.2] justify-center text-center text-[1.5rem] font-extrabold sm:text-left sm:text-[2.5rem] md:text-[3rem] lg:text-[4rem]"
		>
			<span>A place where</span>
			<span>you can <span class="text-indigo-500">chat</span></span>
			<span>about <span class="text-indigo-500">anything</span></span>
		</div>
	</div>
	<div class="my-6" />
	<div class="p-6 text-2xl bg-indigo-600 rounded-md">
		Start chatting today, all you need is a Google account!
	</div>
{:else}
	<div class="perspective-container isolate">
		<form
		action="?/redirectToRoom"
		method="POST"
		use:enhance
		class="relative flex flex-col items-center max-w-2xl gap-2 p-8 py-12 mx-auto"
		>
	<div class="z-[-10] pointer-events-none absolute w-full h-full border-8 border-indigo-800 border-solid rounded-md left-1 top-1" />
	<div class="z-[-8] pointer-events-none shadow-xl shadow-indigo-800 absolute top-0 left-0 w-full h-full border-8 border-indigo-600 border-solid rounded-md overflow-hidden">
		<img src="wave2.png" alt="Decorative wave" class="absolute right-[100%] w-full h-full animate-transformRight">
		<img src="wave2.png" alt="Decorative wave" class="absolute w-full h-full animate-transformRight left-[-2px] top-[1.2px]">
	</div>

		<label for="roomName" class="text-2xl font-extrabold">Name of the room you want to <span class="text-blue-400">join</span></label>
		<input
		name="roomName"
		type="text"
		class="flex p-2 duration-150 bg-indigo-900 border-collapse rounded-lg shadow-xl outline-none focus:shadow-indigo-600 shadow-transparent color-white focus:bg-indigo-500 focus:outline-none"
		/>
		<p class="text-lg text-red-500 {form && form.error ? "opacity-100 duration-150" : "opacity-0"}">{form ? form.error || "" : "Placeholder"}</p>
	</form>
</div>
{/if}

<style>
	.webrtc {
		background: linear-gradient(90deg, #ff008e 0%, #ffcd1e 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.perspective-container > form {
		perspective: 100px;

	}

	.perspective-container div {
		transform-style: preserve-3d;
		transform: rotateX(4deg) rotateY(2deg);
	}
</style>
