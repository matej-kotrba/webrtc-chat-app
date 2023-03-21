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
	import { goto } from '$app/navigation';
	import { firestore } from '../config/firebase';
	import {
		addDoc,
		collection,
		getDocs,
		query,
		where
	} from 'firebase/firestore';

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

	// Checking if user is logged in
	onMount(async () => {
		const listener = onAuthStateChanged(auth, async (newUser) => {
			$user = newUser;
			fetch('/api/userLoginState', {
				method: 'POST',
				body: JSON.stringify({ id: newUser?.uid }),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (!newUser) {
				goto('/');
				return;
			}
			// Here we create user in firestore if it doesn't exist so we can store rooms he owns
			const users = collection(firestore, 'users');
			const data = query(users, where('id', '==', newUser!.uid));
			const docUser = await getDocs(data);

			if (docUser.docs.length === 0) {
				console.log('aaaaa');
				addDoc(users, {
					id: newUser!.uid,
					rooms: []
				});
			}
		});

		return listener();
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
