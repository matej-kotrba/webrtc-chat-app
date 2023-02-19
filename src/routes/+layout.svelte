<script lang="ts">
	import '../styles/globals.css';
	import 'iconify-icon';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	const servers = {
		iceServers: [
			{
				urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] // free stun server
			}
		],
		iceCandidatePoolSize: 10
	};

	setContext('iceServers', servers);

	if (browser) {
		setContext('peerConnection', writable(new RTCPeerConnection(servers)));
	}
</script>

<main class="container mx-auto">
	<slot />
</main>
