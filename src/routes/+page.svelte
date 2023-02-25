<script lang="ts">
	import VideoCall from '../components/VideCall.svelte';
	import { user } from '../stores/user';
</script>

{#if $user === null}
	<div class="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_4px_1fr]">
		<div
			class="webrtc flex flex-col text-[3rem] sm:text-[4rem] md:text-[4.5rem] lg:text-[6rem] text-center sm:text-right font-extrabold"
		>
			<span>WebRTC</span>
			<span>Chat</span>
			<span>App</span>
		</div>
		<div class="bg-white rounded-lg separator" />
		<div
			class="flex flex-col justify-center text-[1.5rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[4rem] text-center sm:text-left font-extrabold"
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
	<VideoCall />
{/if}

<style>
	.webrtc {
		background: linear-gradient(90deg, #ff008e 0%, #ffcd1e 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
