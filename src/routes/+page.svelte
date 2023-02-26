<script lang="ts">
	import { enhance } from '$app/forms';
	import VideCall from '../components/VideCall.svelte';
	import VideoCall from '../components/VideCall.svelte';
	import { user } from '../stores/user';
</script>

{#if $user === null}
	<div class="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_4px_1fr]">
		<div
			class="webrtc flex flex-col text-center text-[3rem] font-extrabold sm:text-right sm:text-[4rem] md:text-[4.5rem] lg:text-[6rem]"
		>
			<span>WebRTC</span>
			<span>Chat</span>
			<span>App</span>
		</div>
		<div class="separator rounded-lg bg-white" />
		<div
			class="flex flex-col justify-center text-center text-[1.5rem] font-extrabold sm:text-left sm:text-[2.5rem] md:text-[3rem] lg:text-[4rem]"
		>
			<span>A place where</span>
			<span>you can <span class="text-indigo-500">chat</span></span>
			<span>about <span class="text-indigo-500">anything</span></span>
		</div>
	</div>
	<div class="my-6" />
	<div class="rounded-md bg-indigo-600 p-6 text-2xl">
		Start chatting today, all you need is a Google account!
	</div>
{:else}
	<form
		action="?/redirectToRoom"
		method="POST"
		use:enhance
		class="flex flex-col items-center gap-2 rounded-lg bg-indigo-700 
		p-8 shadow-md focus-within:shadow-xl focus-within:shadow-indigo-900
		 shadow-indigo-900 duration-100 ease-linear"
	>
		<label for="roomName" class="text-2xl">Room you want join</label>
		<input
			name="roomName"
			type="text"
			class="color-white flex border-collapse rounded-lg bg-indigo-900 p-2 focus:bg-indigo-500 focus:outline-none"
		/>
	</form>
{/if}

<style>
	.webrtc {
		background: linear-gradient(90deg, #ff008e 0%, #ffcd1e 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
