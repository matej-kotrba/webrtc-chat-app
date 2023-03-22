<script lang="ts">
	import { user } from '../../stores/user';

	import { auth, firestore } from '../../config/firebase';
	import {
		collection,
		getDocs,
		doc,
		getDoc,
		query,
		where
	} from 'firebase/firestore';
	import BasicForm from '../../components/forms/BasicForm.svelte';
	import { onAuthStateChanged } from 'firebase/auth';

	let rooms: any[] = [];

	async function getRooms(user: any) {
		try {
			rooms = [];
			const usersCollection = collection(firestore, 'users');
			const q = query(usersCollection, where('id', '==', user.uid));
			const roomsDocs = await getDocs(q);
			const idsArray = roomsDocs.docs[0].data().rooms;
			idsArray.forEach(async (id: string) => {
				const room = await getDoc(doc(firestore, 'rooms', id));
				rooms = [...rooms, room.data()];
			});
			console.log(rooms);
		} catch (e) {
			console.log(e);
		}
	}

	const removeObserver = onAuthStateChanged(auth, async (newUser) => {
		if (newUser !== null) {
			await getRooms(newUser);
			removeObserver();
		}
	});
</script>

<h2 class="text-4xl">
	Hello <span class="user_name font-extrabold">{$user?.displayName || ''}</span>
</h2>

<div class="mt-20">
	<h3 class="text-xl">Your rooms:</h3>
	<div>
		{#each rooms as room}
			<div>{JSON.stringify(room)}</div>
		{/each}
	</div>
</div>

<style>
	.user_name {
		background-image: linear-gradient(
			to left top,
			theme('colors.indigo.700'),
			theme('colors.blue.200')
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		color: transparent;
	}
</style>
