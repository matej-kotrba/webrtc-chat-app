<script lang="ts">
	import Video from './Video.svelte';
	import CallControls from './CallControls.svelte';
	import JoinRoom from './JoinRoom.svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import type { DevicesState } from './video';

	let pcStore: Writable<RTCPeerConnection> = getContext('peerConnection');
	let isInCall: Writable<boolean> = getContext('isInCall');

	console.log('Component:' + $isInCall);

	const availableDevices: Record<string, boolean> = {
		audio: false,
		video: false
	};

	onMount(() => {
		navigator.mediaDevices.enumerateDevices().then((devices) => {
			devices.forEach((device) => {
				if (device.kind === 'audioinput') availableDevices.audio = true;
				else if (device.kind === 'videoinput') availableDevices.video = true;
			});
		});
	});

	let localStream = null;
	let remoteStream: MediaStream | null = null;

	async function onCallJoin() {
		try {
			if (!availableDevices.audio) {
				console.log('You need microphone to enter video chat :(');
				return;
			}

			localStream = await navigator.mediaDevices.getUserMedia({
				audio: availableDevices.audio,
				video: availableDevices.video
			});

			remoteStream = new MediaStream();

			console.log(localStream);

			localStream.getTracks().forEach((track) => {
				console.log(track);
				$pcStore.addTrack(track);
			});

			$pcStore.ontrack = (event) => {
				console.log(event);
				remoteStream?.addTrack(event.track);
			};
		} catch (err) {
			console.error(err);
		}
	}

	let devicesState: DevicesState = {
		isCameraOn: false,
		isMicOn: false
	};
</script>

<div class="video-chat">
	<JoinRoom onJoin={onCallJoin} />
	<Video />
	<Video />
	<CallControls {devicesState} />
</div>
