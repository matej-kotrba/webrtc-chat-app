<script lang="ts">
	import '../styles/globals.css';
	import 'iconify-icon';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { browser } from '$app/environment';
	import Sidebar from '../components/Sidebar.svelte';
	import { loading } from '../lib/loading';
	import { navigating } from '$app/stores';
	import Loader from '../components/Loader.svelte';
	import { user } from '../stores/user';
	import { onMount } from 'svelte';
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth } from '../config/firebase';

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

	onMount(async () => {
		onAuthStateChanged(auth, (newUser) => {
			$user = newUser;
			fetch('/api/userLoginState', {
				method: 'POST',
				body: JSON.stringify({ id: newUser?.uid }),
				headers: {
					'Content-Type': 'application/json'
				}
			});
		});
	});
</script>

<Loader />
<div class="layout">
	<Sidebar />
	<main class="container min-h-screen p-3 mx-auto">
		<div class="h-10 separator" />
		<slot />
	</main>
</div>

<style>
	.layout {
		display: grid;
		grid-template-columns: 180px 1fr;
	}
</style>
