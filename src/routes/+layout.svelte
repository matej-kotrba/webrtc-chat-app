<script lang="ts">
	import '../styles/globals.css';
	import 'iconify-icon';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { browser } from '$app/environment';
	import Navbar from '../components/Navbar.svelte';
	import { loading } from '../lib/loading';
	import { navigating } from '$app/stores';
	import Loader from '../components/Loader.svelte';

	$: $loading = !!$navigating;

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
<Loader />
<div class="h-10 separator" />
<main class="container min-h-screen p-3 mx-auto">
	<slot />
</main>
