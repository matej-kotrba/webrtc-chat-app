<script lang="ts">
	import { signInWithPopup } from 'firebase/auth';
	import { auth, googleAuthProvider } from '../config/firebase';
	import { signOut, onAuthStateChanged } from 'firebase/auth';
	import { user } from '../stores/user';
	import { onMount } from 'svelte';

	let isDropDownOpen = false;

	async function signInWithGoogle() {
		try {
			await signInWithPopup(auth, googleAuthProvider);
		} catch (err) {
			console.log(err);
		}
	}

	async function logOutFunc() {
		try {
			await signOut(auth);
		} catch (err) {
			console.log(err);
		}
	}

	onMount(async () => {
		onAuthStateChanged(auth, (newUser) => {
			$user = newUser;
		});
	});
</script>

{#if $user === null}
	<button
		on:click={signInWithGoogle}
		class="p-2 bg-gray-700 rounded-md aspect-square text-md hover:bg-slate-500"
	>
		<iconify-icon icon="logos:google-icon" class="text-3xl"></iconify-icon>
	</button>
{:else}
	<div
		class="relative z-10 flex items-center bg-gray-700 rounded-md text-md"
		on:mouseleave={() => (isDropDownOpen = false)}
	>
		<button
			on:click={() => (isDropDownOpen = !isDropDownOpen)}
			class="z-10 p-2 rounded-md aspect-square hover:bg-slate-500"
		>
			<iconify-icon icon="mdi:user" class="text-3xl" />
		</button>
		{#if isDropDownOpen}
			<div
				class="absolute bg-gray-700 rounded-md p-2 top-[90%] right-0 w-52 flex flex-col
			animate-dropDownAppear gap-1"
			>
				<div class="flex items-center gap-2">
					<img
						src={$user.photoURL}
						alt="User profile"
						class="w-[40px] aspect-square rounded-full"
					/>
					<span class="overflow-hidden text-ellipsis whitespace-nowrap"
						><abbr title={$user.displayName} class="no-underline">{$user.displayName}</abbr></span
					>
				</div>
				<button
					on:click={logOutFunc}
					class="p-2 text-left bg-gray-700 rounded-md text-md hover:bg-slate-500"
				>
					Log out
				</button>
				<div class="flex items-center gap-2 justify-left">
					<button
						class="p-2 text-left bg-gray-700 rounded-md text-md hover:bg-slate-500 aspect-square"
					>
						<iconify-icon icon="fa6-solid:gear" />
					</button>
					<button
						class="p-2 text-left bg-gray-700 rounded-md text-md hover:bg-slate-500 aspect-square"
					>
						<iconify-icon icon="ic:baseline-color-lens" />
					</button>
				</div>
			</div>
		{/if}
	</div>
{/if}
