<script lang="ts">
	import { user } from '../../stores/user';

	import { auth, firestore } from '../../config/firebase';
	import {
		collection,
		getDocs,
		doc,
		getDoc,
		query,
		where,
		deleteDoc
	} from 'firebase/firestore';
	import Tooltip from '../../components/Tooltip.svelte';
	import { onAuthStateChanged } from 'firebase/auth';

	type Room = { title: string; id: string };
	type User = { id: string; name: string; icon: string };

	let friends: User | null = null;
	let rooms: Room[] = [];

	async function getData(user: any) {
		try {
			//TODO: place this on server
			rooms = [];
			const usersCollection = collection(firestore, 'users');
			const q = query(usersCollection, where('id', '==', user.uid));
			const data = await getDocs(q);
			const idsArray = data.docs[0].data().rooms;
			idsArray.forEach(async (id: string) => {
				const room = await getDoc(doc(firestore, 'rooms', id));
				rooms = [...rooms, { ...room.data(), id: room.id }] as Room[];
			});
			// friends = data.docs[0].data().friends.forEach(() => {

			// })
		} catch (e) {
			console.log(e);
		}
	}

	async function deleteRoom(id: Room['id']) {
		try {
			const rooms = collection(firestore, 'rooms');
			const room = doc(rooms, id);
			const roomData = await getDoc(room);
			if (roomData.exists() && $user && roomData.data().owner === $user.uid) {
				await deleteDoc(room);
			} else {
				throw new Error('Access Denied');
			}
		} catch (e) {
			console.log(e);
		}
	}

	const removeObserver = onAuthStateChanged(auth, async (newUser) => {
		if (newUser !== null) {
			await getData(newUser);
			removeObserver();
		}
	});
</script>

<h2 class="text-4xl">
	Hello <span class="user_name font-extrabold">{$user?.displayName || ''}</span>
</h2>

<div class="mt-20">
	<h3 class="text-xl">Your rooms:</h3>
	<div class="flex gap-3 my-4">
		{#each rooms as room}
			<a
				class="p-3 bg-indigo-600 rounded-md flex gap-3 items-center"
				href="/rooms/{room.id}"
			>
				<h4>{room.title}</h4>
				<Tooltip text={'Delete room'}>
					<button on:click|stopPropagation={() => deleteRoom(room.id)}>
						<iconify-icon icon="fa6-solid:trash-can" />
					</button>
				</Tooltip>
			</a>
		{/each}
		{#if friends && rooms.length !== 0}
			<!-- {#each friends as friend}
		<p>{friend}</p>
		{/each} -->
			<p>You have no rooms</p>
		{/if}
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
