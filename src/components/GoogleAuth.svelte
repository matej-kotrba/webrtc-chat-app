<script lang="ts">
	import { signInWithPopup } from 'firebase/auth';
	import { auth, googleAuthProvider } from '../config/firebase';
	import { signOut } from 'firebase/auth';
	import { user } from '../stores/user';
	import { fly } from 'svelte/transition';

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
</script>

<div class="absolute bottom-0 left-0 w-full">
	{#if $user === null}
		<button
			on:click={signInWithGoogle}
			class="p-2 bg-gray-700 text-md hover:bg-slate-500 items-center w-full flex gap-2 justify-center"
		>
			<iconify-icon icon="logos:google-icon" class="text-3xl" />
		</button>
	{:else}
		<div class="relative">
			<button
				class="p-2 bg-gray-700 text-md hover:bg-slate-500 items-center w-full flex gap-2 justify-center z-10 relative"
				on:click={() => (isDropDownOpen = !isDropDownOpen)}
			>
				<iconify-icon icon="mdi:user" class="text-3xl" />
			</button>
			{#if isDropDownOpen}
				<div
					transition:fly={{ x: -100, duration: 500 }}
					class="absolute left-[100%] bottom-0 p-2 pb-14 bg-slate-900 whitespace-nowrap flex flex-col gap-3 rounded-tr-lg -z-50"
				>
					<button class="text-lg flex items-center gap-1 px-4"
						>Log out <iconify-icon icon="ic:baseline-log-out" /></button
					>
				</div>
			{/if}
		</div>
		<!-- <div
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
							><abbr title={$user.displayName} class="no-underline"
								>{$user.displayName}</abbr
							></span
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
		</div> -->
	{/if}
</div>
