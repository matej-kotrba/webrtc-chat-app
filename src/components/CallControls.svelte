<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	const pcStore: Writable<RTCPeerConnection> = getContext('peerConnection');

	let localStream = null;
	let remoteStream = null;

	async function onEnableCamera() {
		try {
			localStream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: true
			});

			remoteStream = new MediaStream();

			console.log(localStream);

			localStream.getTracks().forEach((track) => {
				console.log(track);
				$pcStore.addTrack(track);
			});
		} catch (err) {
			console.error(err);
		}
	}

	type DevicesState = {
		isCameraOn: boolean;
	};

	let devicesState: DevicesState = {
		isCameraOn: false
	};
</script>

<!-- Call controls -->
<div class="flex gap-2.5">
	<button
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
