<script lang="ts">
	import Tooltip from '../../../components/Tooltip.svelte';
	import CopyToClipboard from '../../../components/CopyToClipboard.svelte';
	import type { PageData } from '../[roomId]/$types';
	import { browser } from '$app/environment';
	import VideoCall from '../../../components/VideoCall.svelte';
	import { PUBLIC_AGORA_APP_ID } from '$env/static/public';
	import { user } from '../../../stores/user';

	import AgoraRTC from 'agora-rtc-sdk-ng';
	import type {
		IAgoraRTCClient,
		IAgoraRTCRemoteUser,
		UID
	} from 'agora-rtc-sdk-ng';

	export let data: PageData;

	let videoContainer: HTMLDivElement | null = null;

	let activeVideo: HTMLDivElement | null = null;

	let localTracks = [];
	let remoteUsers: { [index: UID]: IAgoraRTCRemoteUser } = {};

	let token: any = null;

	let client: IAgoraRTCClient | null = null;

	$: if (browser && $user) {
		function crateVideoBox(boxId: string) {
			// console.log(document.getElementById(`videoBox-${boxId}`));
			if (document.getElementById(`videoBox-${boxId}`)) return;
			let div = document.createElement('div');
			div.id = `videoBox-${boxId}`;
			div.classList.add('videoBox');
			// console.log('Container', videoContainer);
			if (videoContainer) videoContainer.appendChild(div);
		}

		async function joinRoomInit() {
			if (client) return;
			console.log(client);
			client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
			await client.join(PUBLIC_AGORA_APP_ID, data.roomId, token, $user!.uid);
			client.on('user-published', handleUserPublished);
			client.on('user-left', handleUserLeft);

			joinStream();
		}

		async function joinStream() {
			const localVideo = document.getElementById('localVideo')?.children;
			if (!client || !localVideo || localVideo.length > 1) return;
			localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();
			localTracks[1].play('localVideo');
			await client.publish([localTracks[0], localTracks[1]]);
		}

		async function handleUserPublished(
			user: IAgoraRTCRemoteUser,
			mediaType: 'video'
		) {
			// console.log('aaaaaaaaa\n\n\n\n\n\n\n\n\n');
			if (!client) return;

			remoteUsers[user.uid] = user;

			await client.subscribe(user, mediaType);

			//TODO: Check if video box already exists

			// crateVideoBox(user.uid.toString());

			if (mediaType === 'video') {
				if (document.getElementById(`videoBox-${user.uid}`)!.children[0])
					return;
				user.videoTrack?.play(`videoBox-${user.uid}`);
			}
		}

		async function handleUserLeft(user: IAgoraRTCRemoteUser) {
			delete remoteUsers[user.uid];

			if (document.getElementById(`videoBox-${user.uid}`)) {
				document.getElementById(`videoBox-${user.uid}`)!.remove();
			}
		}

		joinRoomInit();
	}
</script>

<h2 class="group">
	<span class="text-white text-2xl font-extralight">Room: </span><span
		class="text-4xl font-extrabold"
		>{data.roomName}
	</span>
	{#if browser}
		<Tooltip text="Copy to clipboard !">
			<CopyToClipboard textToCopy={window.location.href} />
		</Tooltip>
	{/if}
</h2>

<div id="localVideo" class="w-[200px] h-[200px]" />

<div id="videoContainer" class="flex gap-2" bind:this={videoContainer}>
	{#each Object.keys(remoteUsers) as user}
		<div id={`videoBox-${user}`} class="videoBox" />
	{/each}
</div>

<!-- <VideoCall roomName={data.roomName} /> -->
<style>
	#videoContainer {
		height: 200px;
	}

	:global(.videoBox) {
		width: 200px;
		height: 200px;
	}
</style>
