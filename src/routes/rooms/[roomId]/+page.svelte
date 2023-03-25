<script lang="ts">
	import Tooltip from '../../../components/Tooltip.svelte';
	import CopyToClipboard from '../../../components/CopyToClipboard.svelte';
	import type { PageData } from '../[roomId]/$types';
	import { browser } from '$app/environment';
	import VideoCall from '../../../components/VideoCall.svelte';
	import { PUBLIC_AGORA_APP_ID } from '$env/static/public';
	import { user } from '../../../stores/user';

	import AgoraRTC from 'agora-rtc-sdk-ng';

	export let data: PageData;

	$: if (browser && $user) {
		console.log('adsasdasdasd');
		let token: any = null;

		let client;

		let localTracks = [];
		let remoteUsers = {};

		async function joinRoomInit() {
			client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
			await client.join(PUBLIC_AGORA_APP_ID, data.roomId, token, $user!.uid);

			joinStream();
		}

		async function joinStream() {}

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

<!-- <VideoCall roomName={data.roomName} /> -->
