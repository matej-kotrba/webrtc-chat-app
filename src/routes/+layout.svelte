<script lang="ts">
	import '../styles/globals.css';
	import 'iconify-icon';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { browser } from '$app/environment';
	import Navbar from '../components/Navbar.svelte';

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
		setContext('isInCall', writable(false));
	}
</script>

<Navbar />
<main class="container mx-auto p-3">
	<slot />
</main>
